
# Job Board Platform

Plataforma de bolsa de trabajo diseñada para instituciones educativas como escuelas secundarias y universidades. Desarrollada para gestionar anuncios de trabajo, aplicaciones de estudiantes y administración de usuarios. La aplicación incluye roles específicos: administrador, profesor, alumno y empresa.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express, Sequelize, MySQL
- **Frontend**: EJS, Bootstrap, Vue.js (integrado en vistas EJS)
- **Autenticación**: JSON Web Tokens (JWT), manejo de roles
- **Seguridad**: Google reCAPTCHA, middleware de autenticación y control de acceso basado en roles

## Estructura de la Aplicación

- **Panel de Administración**: Gestión completa de usuarios, empresas, anuncios, y configuración de la institución.
- **Panel de Profesor**: Gestión de alumnos y revisión de aplicaciones a anuncios.
- **Panel de Alumno**: Aplicación a anuncios, actualización de perfil, y visualización de anuncios disponibles.
- **Panel de Empresa**: Creación y gestión de anuncios, revisión de perfiles de estudiantes.

## Instalación y Configuración

### Requisitos Previos

- **Node.js** y **npm** instalados
- **MySQL** (configurado y corriendo)
- **Git**

### Pasos de Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/onesistemas/job-board-platform.git
   ```
2. Entra al directorio del proyecto:
   ```bash
   cd job-board-platform
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:

     ```plaintext
     JWT_SECRET=tu_clave_secreta
     DB_HOST=localhost
     DB_USER=tu_usuario
     DB_PASSWORD=tu_contraseña
     DB_NAME=nombre_de_base_de_datos
     RECAPTCHA_SECRET=tu_recaptcha_secret
     ```
   
5. Inicializa la base de datos MySQL:
   - Asegúrate de que el archivo `config/database.js` esté configurado correctamente con tus credenciales de base de datos.
   - Ejecuta el siguiente comando para sincronizar el esquema de la base de datos:
     ```bash
     npm run db:sync
     ```

6. Inicia el servidor:
   ```bash
   npm start
   ```

   El servidor estará disponible en `http://localhost:3000`.

## Estructura del Código

- **app.js**: Configuración del servidor y middlewares principales.
- **/controllers**: Lógica de controladores para cada entidad de usuario.
- **/routes**: Define rutas protegidas y públicas para cada rol.
- **/views**: Vistas EJS que utilizan Bootstrap y Vue.js para interactividad.
- **/public**: Archivos públicos como CSS y JavaScript.

## Descripción de la Base de Datos

La estructura de la base de datos incluye tablas relacionadas para gestionar los usuarios, anuncios, aplicaciones, empresas e institución. Aquí se describen las tablas principales:

1. **Users**: Almacena información de todos los usuarios registrados, incluyendo roles (`admin`, `profesor`, `alumno`, `empresa`).
2. **Institucion**: Configuración y detalles de la institución.
3. **Anuncios**: Publicaciones de empleo creadas por empresas.
4. **Aplicacion**: Relación entre alumnos y anuncios a los que aplicaron.
5. **Empresas**: Empresas registradas en la plataforma que publican anuncios.

### Ejemplo de Estructura de la Tabla `Institucion`

| Campo         | Tipo       | Descripción                                              |
|---------------|------------|----------------------------------------------------------|
| id            | INT        | Identificador único de la institución                    |
| nombre        | VARCHAR    | Nombre de la institución                                 |
| tipo          | ENUM       | Tipo de institución (`Secundaria`, `Universidad`, etc.)  |
| publico       | ENUM       | Tipo de gestión (`Público`, `Mixto`, `Privado`)          |
| direccion     | VARCHAR    | Dirección física de la institución                       |
| oficina       | VARCHAR    | Oficina o unidad dentro de la institución                |
| contacto      | VARCHAR    | Información de contacto de la institución                |
| email         | VARCHAR    | Correo electrónico institucional                         |
| codigo_postal | VARCHAR    | Código postal                                            |
| telefono      | VARCHAR    | Número de teléfono de la institución                     |
| ciudad        | VARCHAR    | Ciudad donde se encuentra la institución                 |
| pais          | VARCHAR    | País de la institución                                   |
| idioma        | ENUM       | Idioma (`Español`, `Inglés`, `Francés`, `Portugués`)     |

## Endpoints Principales

| Método | Ruta                    | Descripción                                      |
|--------|--------------------------|--------------------------------------------------|
| POST   | `/auth/register`         | Registro de nuevos usuarios                      |
| POST   | `/auth/login`            | Inicio de sesión de usuario                      |
| GET    | `/admin/dashboard`       | Panel del administrador                          |
| GET    | `/profesor/dashboard`    | Panel del profesor                               |
| GET    | `/alumno/dashboard`      | Panel del alumno                                 |
| GET    | `/empresa/dashboard`     | Panel de la empresa                              |

### Endpoints de API

Para operaciones CRUD específicas, el administrador puede acceder a los siguientes endpoints:

- **Usuarios**
  - `POST /admin/usuarios` - Crear usuario
  - `DELETE /admin/usuarios/:id` - Eliminar usuario
  - `GET /admin/usuarios` - Listar usuarios

- **Anuncios**
  - `POST /admin/anuncios` - Crear anuncio
  - `DELETE /admin/anuncios/:id` - Eliminar anuncio
  - `GET /admin/anuncios` - Listar anuncios

- **Empresas**
  - `POST /admin/empresas` - Crear empresa
  - `DELETE /admin/empresas/:id` - Eliminar empresa
  - `GET /admin/empresas` - Listar empresas

## Funcionalidades de Cada Rol

### Administrador
- Gestión de la configuración de la institución.
- Gestión de usuarios, empresas, anuncios y estadísticas.

### Profesor
- Gestión de alumnos y revisión de aplicaciones a anuncios.

### Alumno
- Actualización de perfil y aplicación a anuncios.

### Empresa
- Creación de anuncios de trabajo y revisión de perfiles de estudiantes.

## Autenticación y Seguridad

- **JWT**: Implementado para proteger rutas y verificar roles de usuario.
- **CORS**: Configurado para permitir solicitudes desde el frontend.
- **Google reCAPTCHA**: Integrado en el inicio de sesión para mayor seguridad.

## Instalación del Frontend con Vue.js (Integrado)

Vue.js se ha integrado directamente en las vistas EJS, permitiendo interactividad sin la necesidad de un frontend separado. Las vistas utilizan Vue para funcionalidades como formularios y paneles interactivos.

## Configuración Inicial y Primer Uso

Al iniciar por primera vez la aplicación, se muestra una pantalla de configuración inicial para crear el primer usuario administrador y configurar los datos básicos de la institución. Una vez completada la configuración inicial, el acceso a esta pantalla queda deshabilitado y el administrador debe iniciar sesión para realizar cambios adicionales.

## Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

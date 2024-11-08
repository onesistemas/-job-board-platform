
# Job Board Platform

Plataforma de bolsa de trabajo para escuelas secundarias y universidades, desarrollada para gestionar anuncios de trabajo y aplicaciones de estudiantes. Esta aplicación incluye roles para administrador, profesor, alumno y empresa.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express, MySQL
- **Frontend**: EJS, Bootstrap, Vue.js (integrado en vistas EJS)
- **Autenticación**: JSON Web Tokens (JWT)
- **Seguridad**: Google reCAPTCHA, manejo de roles y autenticación de usuarios

## Estructura de la Aplicación

- **Panel de Administración**: Gestiona usuarios y permisos.
- **Panel de Profesor**: Gestiona alumnos y revisa aplicaciones a anuncios.
- **Panel de Alumno**: Permite a los alumnos aplicar a anuncios y actualizar su perfil.
- **Panel de Empresa**: Permite a las empresas crear anuncios y revisar perfiles de estudiantes.

## Instalación y Configuración

### Requisitos Previos

- Node.js y npm
- MySQL
- Git

### Pasos de Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/onesistemas/job-board-platform.git
   ```
2. Instala las dependencias en el directorio del proyecto:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:

     ```plaintext
     JWT_SECRET=tu_clave_secreta
     DB_HOST=localhost
     DB_USER=tu_usuario
     DB_PASSWORD=tu_contraseña
     DB_NAME=nombre_de_base_de_datos
     ```

4. Inicializa la base de datos MySQL:
   - Asegúrate de que el archivo `config/database.js` esté configurado correctamente con tus credenciales de base de datos.

5. Inicia el servidor:
   ```bash
   npm start
   ```

   El servidor estará disponible en `http://localhost:3000`.

## Estructura del Código

- **app.js**: Archivo principal que configura el servidor y los middlewares.
- **/controllers**: Lógica de controladores para cada entidad de usuario.
- **/routes**: Define rutas para administrador, profesor, alumno y empresa.
- **/views**: Vistas EJS que usan Bootstrap y Vue.js para mejorar la interactividad.
- **/public**: Archivos públicos como CSS y JavaScript.

## Endpoints Principales

| Método | Ruta                    | Descripción                                      |
|--------|--------------------------|--------------------------------------------------|
| POST   | `/auth/register`         | Registro de nuevos usuarios                      |
| POST   | `/auth/login`            | Inicio de sesión de usuario                      |
| GET    | `/admin/dashboard`       | Panel del administrador                          |
| GET    | `/profesor/dashboard`    | Panel del profesor                               |
| GET    | `/alumno/dashboard`      | Panel del alumno                                 |
| GET    | `/empresa/dashboard`     | Panel de la empresa                              |

## Funcionalidades de Cada Rol

### Administrador
- Puede gestionar todos los usuarios y asignar roles.

### Profesor
- Puede crear y gestionar alumnos.
- Revisa anuncios y aplicaciones de sus alumnos.

### Alumno
- Puede actualizar su perfil y aplicar a anuncios.
- Revisa los anuncios disponibles.

### Empresa
- Puede crear anuncios de trabajo y marcar alumnos como favoritos.

## Autenticación y Seguridad

- **JWT**: Implementado para proteger las rutas.
- **CORS**: Configurado para permitir solicitudes desde el frontend.
- **reCAPTCHA**: Integrado en la vista de inicio de sesión para seguridad adicional.

## Instalación del Frontend con Vue (Integrado)

Vue se ha integrado directamente en las vistas EJS, permitiendo interactividad sin necesidad de un frontend separado.

## Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

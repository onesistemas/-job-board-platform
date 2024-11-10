require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Configura CORS
app.use(cors({
    origin: 'http://localhost:3000', // Cambia esto si es necesario
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

// Importar el middleware de autenticación y rutas
const authMiddleware = require('./middlewares/authMiddleware');
const adminRoutes = require('./routes/adminRoutes');
const profesorRoutes = require('./routes/profesorRoutes');
const alumnoRoutes = require('./routes/alumnoRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const authRoutes = require('./routes/authRoutes');
const configuracionRoutes = require('./routes/configuracionRoutes');

// Modelos y conexión a la base de datos
const sequelize = require('./config/database');
const User = require('./models/User');
const Anuncio = require('./models/Anuncio');
const Aplicacion = require('./models/Aplicacion');
const Institucion = require('./models/Institucion');

// Middleware para datos JSON y formularios
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Relaciones entre modelos
User.hasMany(Anuncio, { foreignKey: 'empresaId', as: 'anuncios' });
Anuncio.belongsTo(User, { foreignKey: 'empresaId', as: 'empresa' });
User.hasMany(Aplicacion, { foreignKey: 'alumnoId', as: 'aplicaciones' });
Aplicacion.belongsTo(User, { foreignKey: 'alumnoId', as: 'alumno' });
Anuncio.hasMany(Aplicacion, { foreignKey: 'anuncioId', as: 'aplicaciones' });
Aplicacion.belongsTo(Anuncio, { foreignKey: 'anuncioId', as: 'anuncio' });

// Rutas siempre accesibles
app.use('/auth', authRoutes);
app.use('/configuracion', configuracionRoutes);

// Verificar si existe un administrador y redirigir adecuadamente en la ruta `/configuracion`
app.get('/configuracion', async (req, res, next) => {
    try {
        const adminExistente = await User.findOne({ where: { role: 'admin' } });
        
        if (adminExistente) {
            // Renderizar una vista que diga "Configuración completada"
            return res.render('configuracion-completada', { message: "Configuración inicial completada. Por favor, inicie sesión." });
        } else {
            // Pasar al controlador de configuración que renderiza el formulario
            next();
        }
    } catch (error) {
        console.error("Error al verificar el administrador:", error);
        res.status(500).send("Error en el servidor");
    }
});

// Rutas protegidas (con autenticación)
app.use('/admin', authMiddleware, adminRoutes);
app.use('/profesor', authMiddleware, profesorRoutes);
app.use('/alumno', authMiddleware, alumnoRoutes);
app.use('/empresa', authMiddleware, empresaRoutes);

// Ruta para la página de bienvenida
app.get('/', (req, res) => {
    res.render('index');  // Renderiza la vista index.ejs
});

// Conectar a la base de datos y sincronizar modelos
sequelize.authenticate()
    .then(() => console.log('Conexión a MySQL exitosa'))
    .catch(err => console.error('Error al conectar con MySQL:', err));

sequelize.sync()
    .then(() => console.log('Modelos sincronizados con la base de datos'))
    .catch(err => console.error('Error al sincronizar los modelos:', err));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser'); // Importa cookie-parser
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Configura CORS
app.use(cors({
    origin: 'http://localhost:3000', // Cambia esto a la URL del frontend si es diferente
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

// Importar rutas
const adminRoutes = require('./routes/adminRoutes');
const profesorRoutes = require('./routes/profesorRoutes');
const alumnoRoutes = require('./routes/alumnoRoutes');
const empresaRoutes = require('./routes/empresaRoutes');
const authRoutes = require('./routes/authRoutes');

// Importar el middleware de autenticación
const authMiddleware = require('./middlewares/authMiddleware');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Usa cookie-parser para manejar cookies


// Rutas públicas (sin autenticación)
app.use('/auth', authRoutes);

// Rutas protegidas (con autenticación)
app.use('/admin', authMiddleware, adminRoutes);
app.use('/profesor', authMiddleware, profesorRoutes);
app.use('/alumno', authMiddleware, alumnoRoutes);
app.use('/empresa', authMiddleware, empresaRoutes);

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta básica de prueba
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando!');
});

// Conexión a la base de datos
const sequelize = require('./config/database');

// Modelos
const User = require('./models/User');
const Anuncio = require('./models/Anuncio');
const Aplicacion = require('./models/Aplicacion');

// Relaciones entre modelos
User.hasMany(Anuncio, { foreignKey: 'empresaId', as: 'anuncios' });
Anuncio.belongsTo(User, { foreignKey: 'empresaId', as: 'empresa' });
User.hasMany(Aplicacion, { foreignKey: 'alumnoId', as: 'aplicaciones' });
Aplicacion.belongsTo(User, { foreignKey: 'alumnoId', as: 'alumno' });
Anuncio.hasMany(Aplicacion, { foreignKey: 'anuncioId', as: 'aplicaciones' });
Aplicacion.belongsTo(Anuncio, { foreignKey: 'anuncioId', as: 'anuncio' });

// Probar la conexión y sincronizar los modelos con la base de datos
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


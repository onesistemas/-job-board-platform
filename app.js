const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Importar rutas
const adminRoutes = require('./routes/adminRoutes');
const profesorRoutes = require('./routes/profesorRoutes');
const alumnoRoutes = require('./routes/alumnoRoutes');
const empresaRoutes = require('./routes/empresaRoutes');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/admin', adminRoutes);
app.use('/profesor', profesorRoutes);
app.use('/alumno', alumnoRoutes);
app.use('/empresa', empresaRoutes);

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
User.hasMany(Anuncio, { foreignKey: 'empresaId', as: 'anuncios' }); // Una empresa tiene muchos anuncios
Anuncio.belongsTo(User, { foreignKey: 'empresaId', as: 'empresa' }); // Un anuncio pertenece a una empresa

User.hasMany(Aplicacion, { foreignKey: 'alumnoId', as: 'aplicaciones' }); // Un alumno tiene muchas aplicaciones
Aplicacion.belongsTo(User, { foreignKey: 'alumnoId', as: 'alumno' }); // Una aplicación pertenece a un alumno

Anuncio.hasMany(Aplicacion, { foreignKey: 'anuncioId', as: 'aplicaciones' }); // Un anuncio tiene muchas aplicaciones
Aplicacion.belongsTo(Anuncio, { foreignKey: 'anuncioId', as: 'anuncio' }); // Una aplicación pertenece a un anuncio

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

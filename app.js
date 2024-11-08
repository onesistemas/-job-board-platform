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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const sequelize = require('./config/database');

sequelize.authenticate()
    .then(() => console.log('Conexión a MySQL exitosa'))
    .catch(err => console.error('Error al conectar con MySQL:', err));
	
const User = require('./models/User');

sequelize.sync()
    .then(() => console.log('Modelo sincronizado con la base de datos'))
    .catch(err => console.error('Error al sincronizar el modelo:', err));

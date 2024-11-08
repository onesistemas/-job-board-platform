const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const sequelize = require('./config/database');

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Middleware para manejar datos JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta básica de prueba
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

sequelize.authenticate()
    .then(() => console.log('Conexión a MySQL exitosa'))
    .catch(err => console.error('Error al conectar con MySQL:', err));
	
const User = require('./models/User');

sequelize.sync()
    .then(() => console.log('Modelo sincronizado con la base de datos'))
    .catch(err => console.error('Error al sincronizar el modelo:', err));

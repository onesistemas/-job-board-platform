const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const sequelize = require('./config/database');

app.get('/', (req, res) => {
    res.send('¡Servidor funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

sequelize.authenticate()
    .then(() => console.log('Conexión a MySQL exitosa'))
    .catch(err => console.error('Error al conectar con MySQL:', err));

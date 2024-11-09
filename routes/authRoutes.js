const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Ruta para renderizar la página de inicio de sesión
router.get('/login', (req, res) => {
    res.render('auth/login'); // Asegúrate de que la vista esté en `views/auth/login.ejs`
});

// Ruta para el inicio de sesión POST
router.post('/login', AuthController.login);

module.exports = router;

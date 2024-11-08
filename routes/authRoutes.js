const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Ruta para registro de usuarios
router.post('/register', AuthController.register);

// Ruta para inicio de sesión
router.post('/login', AuthController.login);

router.get('/login', (req, res) => {
    res.render('auth/login');
});

module.exports = router;
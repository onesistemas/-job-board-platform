const express = require('express');
const router = express.Router();
const configuracionController = require('../controllers/configuracionController');

// Verificar si existe un administrador y mostrar el mensaje adecuado
router.get('/', configuracionController.checkAdminExists);

// Ruta para crear el administrador e institución
router.post('/crear-admin', configuracionController.crearAdmin);

module.exports = router;

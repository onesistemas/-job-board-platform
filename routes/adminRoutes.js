const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

router.post('/crear-usuario', AdminController.crearUsuario);
router.get('/gestionar-usuarios', AdminController.gestionarUsuarios);

module.exports = router;

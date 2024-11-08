const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

router.post('/crear-usuario', AdminController.crearUsuario);
router.get('/gestionar-usuarios', AdminController.gestionarUsuarios);
router.delete('/eliminar-usuario/:id', AdminController.eliminarUsuario); // Nueva ruta

module.exports = router;

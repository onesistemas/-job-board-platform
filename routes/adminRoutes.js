const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/crear-usuario', AdminController.crearUsuario);
router.get('/gestionar-usuarios', AdminController.gestionarUsuarios);
router.delete('/eliminar-usuario/:id', AdminController.eliminarUsuario); // Nueva ruta

router.get('/dashboard', authMiddleware, (req, res) => {
    res.render('admin/dashboard');
});

module.exports = router;

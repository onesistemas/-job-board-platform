const express = require('express');
const router = express.Router();
const EmpresaController = require('../controllers/EmpresaController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/crear-anuncio', EmpresaController.crearAnuncio);
router.get('/ver-alumnos', EmpresaController.verAlumnos);
router.get('/dashboard', authMiddleware, (req, res) => {
    res.render('empresa/dashboard');
});

module.exports = router;

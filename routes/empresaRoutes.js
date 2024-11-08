const express = require('express');
const router = express.Router();
const EmpresaController = require('../controllers/EmpresaController');

router.post('/crear-anuncio', EmpresaController.crearAnuncio);
router.get('/ver-alumnos', EmpresaController.verAlumnos);

module.exports = router;

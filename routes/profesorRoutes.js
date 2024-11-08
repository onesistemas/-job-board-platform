const express = require('express');
const router = express.Router();
const ProfesorController = require('../controllers/ProfesorController');

router.post('/crear-alumno', ProfesorController.crearAlumno);
router.get('/ver-anuncios', ProfesorController.verAnuncios);

module.exports = router;

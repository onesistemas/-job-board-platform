const express = require('express');
const router = express.Router();
const AlumnoController = require('../controllers/AlumnoController');

router.put('/actualizar-perfil', AlumnoController.actualizarPerfil);
router.post('/aplicar-anuncio', AlumnoController.aplicarAnuncio);

module.exports = router;

const express = require('express');
const router = express.Router();
const AlumnoController = require('../controllers/AlumnoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);
router.get('/anuncios', AlumnoController.getAnuncios);
router.get('/perfil', AlumnoController.getPerfil);
router.put('/actualizar-perfil', AlumnoController.actualizarPerfil);
router.post('/aplicar-anuncio', AlumnoController.aplicarAnuncio);
router.get('/dashboard', authMiddleware, (req, res) => {
    res.render('alumno/dashboard');
});

module.exports = router;

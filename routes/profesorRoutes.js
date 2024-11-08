const express = require('express');
const router = express.Router();
const ProfesorController = require('../controllers/ProfesorController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/crear-alumno', ProfesorController.crearAlumno);
router.get('/ver-anuncios', ProfesorController.verAnuncios);

router.get('/dashboard', authMiddleware, (req, res) => {
    res.render('profesor/dashboard');
});


module.exports = router;

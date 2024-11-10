const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para renderizar la vista del dashboard de administrador
router.get('/dashboard', authMiddleware, (req, res) => {
    res.render('admin/dashboard');
});

// Rutas para renderizar otras vistas de administrador
router.get('/anuncios', authMiddleware, (req, res) => {
    res.render('admin/anuncios');
});

router.get('/empresas', authMiddleware, (req, res) => {
    res.render('admin/empresas');
});

router.get('/alumnos', authMiddleware, (req, res) => {
    res.render('admin/alumnos');
});

router.get('/institucion', authMiddleware, (req, res) => {
    res.render('admin/institucion');
});

router.get('/estadisticas', authMiddleware, (req, res) => {
    res.render('admin/estadisticas');
});

router.get('/configuracionInstitucion', authMiddleware, (req, res) => {
    res.render('admin/configuracionInstitucion');
});


// Rutas API para obtener datos
router.get('/api/anuncios', authMiddleware, AdminController.obtenerAnuncios);
router.get('/api/empresas', authMiddleware, AdminController.obtenerEmpresas);
router.post('/api/empresas', AdminController.crearEmpresa);
router.put('/api/empresas/:id', AdminController.actualizarEmpresa);
router.get('/api/alumnos', authMiddleware, AdminController.obtenerAlumnos);
router.get('/api/institucion', authMiddleware, AdminController.obtenerInstitucion);
router.get('/api/estadisticas', authMiddleware, AdminController.obtenerEstadisticas);

// Rutas API para acciones específicas
router.delete('/api/anuncios/:id', authMiddleware, AdminController.eliminarAnuncio);
router.delete('/api/empresas/:id', authMiddleware, AdminController.eliminarEmpresa);
router.delete('/api/alumnos/:id', authMiddleware, AdminController.eliminarAlumno);
router.put('/api/institucion', authMiddleware, AdminController.actualizarInstitucion);

module.exports = router;

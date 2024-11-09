// controllers/adminController.js
const Institucion = require('../models/Institucion');
const Anuncio = require('../models/Anuncio');
const User = require('../models/User');
const Empresa = require('../models/Empresa'); // Suponiendo que tengas este modelo

const AdminController = {
    crearUsuario: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;
            const nuevoUsuario = await User.create({ name, email, password, role });
            res.status(201).json({ message: "Usuario creado", usuario: nuevoUsuario });
        } catch (error) {
            res.status(500).json({ message: "Error al crear usuario", error });
        }
    },
    gestionarUsuarios: async (req, res) => {
        try {
            const usuarios = await User.findAll();
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener usuarios", error });
        }
    },
    eliminarUsuario: async (req, res) => {
        try {
            const { id } = req.params;
            await User.destroy({ where: { id } });
            res.status(200).json({ message: "Usuario eliminado" });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar usuario", error });
        }
    },
    obtenerEstadisticas: async (req, res) => {
        try {
            const totalUsuarios = await User.count();
            const totalAnuncios = await Anuncio.count();
            res.json({ totalUsuarios, totalAnuncios });
        } catch (error) {
            res.status(500).json({ message: "Error al obtener estadísticas", error });
        }
    },
    obtenerInstitucion: async (req, res) => {
        try {
            const institucion = await Institucion.findOne();
            res.json(institucion);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener institución", error });
        }
    },
    actualizarInstitucion: async (req, res) => {
        try {
            const { nombre, direccion, contacto } = req.body;
            const institucion = await Institucion.update(
                { nombre, direccion, contacto },
                { where: { id: 1 } } // Suponiendo un único registro de institución
            );
            res.json(institucion);
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar institución", error });
        }
    },
    obtenerAnuncios: async (req, res) => {
        try {
            const anuncios = await Anuncio.findAll();
            res.json(anuncios);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener anuncios", error });
        }
    },
    eliminarAnuncio: async (req, res) => {
        try {
            const { id } = req.params;
            await Anuncio.destroy({ where: { id } });
            res.json({ message: 'Anuncio eliminado' });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar anuncio", error });
        }
    },
    obtenerEmpresas: async (req, res) => {
        try {
            const empresas = await Empresa.findAll();
            res.json(empresas);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener empresas", error });
        }
    },
    eliminarEmpresa: async (req, res) => {
        try {
            const { id } = req.params;
            await Empresa.destroy({ where: { id } });
            res.json({ message: 'Empresa eliminada' });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar empresa", error });
        }
    },
    obtenerAlumnos: async (req, res) => {
        try {
            const alumnos = await User.findAll({ where: { role: 'alumno' } });
            res.json(alumnos);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener alumnos", error });
        }
    },
    eliminarAlumno: async (req, res) => {
        try {
            const { id } = req.params;
            await User.destroy({ where: { id, role: 'alumno' } });
            res.json({ message: 'Alumno eliminado' });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar alumno", error });
        }
    }
};

module.exports = AdminController;

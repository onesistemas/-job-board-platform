// controllers/adminController.js
const Institucion = require('../models/Institucion');
const Anuncio = require('../models/Anuncio');
const User = require('../models/User');
const Empresa = require('../models/Empresa');
const Aplicacion = require('../models/Aplicacion');
const { Op } = require('sequelize');


// Función para generar un array de fechas de los últimos 30 días
function getLast30Days() {
    const dates = [];
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
}

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
            const today = new Date();
            const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(today.getDate() - 29);
            const dates = getLast30Days();

            // Conteos totales
            const totalUsuarios = await User.count();
            const totalAnuncios = await Anuncio.count();
            const totalAplicaciones = await Aplicacion.count();
            const totalEmpresas = await Empresa.count();

            // Conteos de hoy
            const usuariosRegistradosHoy = await User.count({
                where: {
                    createdAt: {
                        [Op.gte]: startOfToday
                    }
                }
            });
            const anunciosCreadosHoy = await Anuncio.count({
                where: {
                    createdAt: {
                        [Op.gte]: startOfToday
                    }
                }
            });
            const aplicacionesCreadasHoy = await Aplicacion.count({
                where: {
                    createdAt: {
                        [Op.gte]: startOfToday
                    }
                }
            });
            const empresasRegistradasHoy = await Empresa.count({
                where: {
                    createdAt: {
                        [Op.gte]: startOfToday
                    }
                }
            });

            // Conteos de los últimos 30 días
            const usuariosRegistradosUltimos30Dias = await User.count({
                where: {
                    createdAt: {
                        [Op.gte]: thirtyDaysAgo
                    }
                }
            });
            const anunciosCreadosUltimos30Dias = await Anuncio.count({
                where: {
                    createdAt: {
                        [Op.gte]: thirtyDaysAgo
                    }
                }
            });
            const aplicacionesCreadasUltimos30Dias = await Aplicacion.count({
                where: {
                    createdAt: {
                        [Op.gte]: thirtyDaysAgo
                    }
                }
            });
            const empresasRegistradasUltimos30Dias = await Empresa.count({
                where: {
                    createdAt: {
                        [Op.gte]: thirtyDaysAgo
                    }
                }
            });

            // Datos para los gráficos
            const usuariosPorDia = [];
            const aplicacionesPorDia = [];

            for (let date of dates) {
                const startDate = new Date(date);
                const endDate = new Date(date);
                endDate.setDate(endDate.getDate() + 1);

                const usuariosCount = await User.count({
                    where: {
                        createdAt: {
                            [Op.gte]: startDate,
                            [Op.lt]: endDate
                        }
                    }
                });
                usuariosPorDia.push(usuariosCount);

                const aplicacionesCount = await Aplicacion.count({
                    where: {
                        createdAt: {
                            [Op.gte]: startDate,
                            [Op.lt]: endDate
                        }
                    }
                });
                aplicacionesPorDia.push(aplicacionesCount);
            }

            res.json({
                totalUsuarios,
                usuariosRegistradosHoy,
                usuariosRegistradosUltimos30Dias,
                totalAnuncios,
                anunciosCreadosHoy,
                anunciosCreadosUltimos30Dias,
                totalAplicaciones,
                aplicacionesCreadasHoy,
                aplicacionesCreadasUltimos30Dias,
                totalEmpresas,
                empresasRegistradasHoy,
                empresasRegistradasUltimos30Dias,
                usuariosPorDia,
                aplicacionesPorDia,
                labelsUltimos30Dias: dates.map(date => {
                    const d = new Date(date);
                    return `${d.getDate()}-${d.getMonth() + 1}`;
                })
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener las estadísticas' });
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
    crearEmpresa: async (req, res) => {
        try {
            const { nombre, ubicacion, contacto, telefono, web_url, linkedin_url, usuarioEmpresa } = req.body;

            // Crear la empresa en la base de datos
            const nuevaEmpresa = await Empresa.create({
                nombre,
                ubicacion,
                contacto,
                telefono,
                web_url,
                linkedin_url
            });

            // Crear el usuario con rol empresa, si es necesario
            if (usuarioEmpresa) {
                await User.create({
                    name: usuarioEmpresa.name,
                    email: usuarioEmpresa.email,
                    password: usuarioEmpresa.password,
                    role: 'empresa'
                });
            }

            res.status(201).json({ message: "Empresa creada exitosamente", empresa: nuevaEmpresa });
        } catch (error) {
            console.error("Error al crear la empresa:", error);
            res.status(500).json({ message: "Error al crear la empresa", error });
        }
    },
    actualizarEmpresa: async (req, res) => {
        try {
            const { id } = req.params;
            await Empresa.update(req.body, { where: { id } });
            res.json({ message: 'Empresa actualizada' });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar empresa", error });
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

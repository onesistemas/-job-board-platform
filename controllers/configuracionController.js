const User = require('../models/User');
const Institucion = require('../models/Institucion');
const bcrypt = require('bcryptjs');

const configuracionController = {
    // Verificar si existe un administrador y responder con el mensaje adecuado
    checkAdminExists: async (req, res) => {
        try {
            const adminExistente = await User.findOne({ where: { role: 'admin' } });
            if (adminExistente) {
                // Si ya existe un administrador, envía un mensaje de que la configuración está completa
                res.render('configuracion-completada'); // Vista que muestra que la configuración está completa
            } else {
                // Si no existe un administrador, renderiza el formulario de configuración inicial
                res.render('configuracion'); // Vista del formulario de configuración
            }
        } catch (error) {
            console.error("Error al verificar administrador:", error);
            res.status(500).json({ message: 'Error al verificar administrador', error });
        }
    },

    // Crear el administrador e institución
    crearAdmin: async (req, res) => {
        try {
            const { nombre, email, password, institucionData } = req.body;

            const adminExistente = await User.findOne({ where: { role: 'admin' } });
            if (adminExistente) {
                return res.status(400).json({ message: 'Ya existe un administrador configurado.' });
            }

            const institucion = await Institucion.create(institucionData);
            const hashedPassword = await bcrypt.hash(password, 10);

            const admin = await User.create({
                name: nombre,
                email,
                password: hashedPassword,
                role: 'admin',
                institucionId: institucion.id
            });

            res.status(201).json({ message: 'Administrador e institución creados exitosamente.', admin });
        } catch (error) {
            console.error("Error en la configuración inicial:", error);
            res.status(500).json({ message: 'Error en la configuración inicial', error });
        }
    }
};

module.exports = configuracionController;

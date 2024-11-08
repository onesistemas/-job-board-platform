const User = require('../models/User'); // Importa el modelo User
const Aplicacion = require('../models/Aplicacion'); // Importa el modelo Aplicacion

const AlumnoController = {
    actualizarPerfil: async (req, res) => {
        try {
            const { id } = req.user; // Asegúrate de obtener el id del usuario autenticado
            const { name, email, telefono, cv, github, linkedin, carrera, curso, anioEgreso } = req.body;
            const alumnoActualizado = await User.update(
                { name, email, telefono, cv, github, linkedin, carrera, curso, anioEgreso },
                { where: { id, role: 'alumno' } }
            );
            res.status(200).json({ message: "Perfil actualizado", alumno: alumnoActualizado });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar perfil", error });
        }
    },

    aplicarAnuncio: async (req, res) => {
        try {
            const { anuncioId } = req.body;
            const { id: alumnoId } = req.user; // Obtener el id del alumno autenticado
            const nuevaAplicacion = await Aplicacion.create({ anuncioId, alumnoId });
            res.status(201).json({ message: "Aplicación enviada", aplicacion: nuevaAplicacion });
        } catch (error) {
            res.status(500).json({ message: "Error al aplicar a anuncio", error });
        }
    },

    getAnuncios: (req, res) => {
        const anuncios = [
            { id: 1, titulo: 'Anuncio 1', descripcion: 'Descripción del anuncio 1' },
            { id: 2, titulo: 'Anuncio 2', descripcion: 'Descripción del anuncio 2' }
        ];
        res.json(anuncios);
    },

    getPerfil: (req, res) => {
        const perfil = {
            name: 'Juan Perez',
            carrera: 'Ingeniería',
            curso: '3er Año'
        };
        res.json(perfil);
    }
};

module.exports = AlumnoController;

const Anuncio = require('../models/Anuncio'); // Importa el modelo Anuncio
const User = require('../models/User'); // Importa el modelo User

const EmpresaController = {
    crearAnuncio: async (req, res) => {
        try {
            const { titulo, descripcion, fechaInicio, fechaFin } = req.body;
            const nuevoAnuncio = await Anuncio.create({ titulo, descripcion, fechaInicio, fechaFin });
            res.status(201).json({ message: "Anuncio creado", anuncio: nuevoAnuncio });
        } catch (error) {
            res.status(500).json({ message: "Error al crear anuncio", error });
        }
    },
    verAlumnos: async (req, res) => {
        try {
            const alumnosPublicos = await User.findAll({ where: { role: 'alumno', isPublic: true } });
            res.status(200).json(alumnosPublicos);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener alumnos", error });
        }
    }
};

module.exports = EmpresaController;

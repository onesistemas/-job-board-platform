const User = require('../models/User'); // Importa el modelo User
const Anuncio = require('../models/Anuncio'); // Importa el modelo Anuncio

const ProfesorController = {
    crearAlumno: async (req, res) => {
        try {
            const { name, email, password, carrera, curso, anioEgreso } = req.body;
            const nuevoAlumno = await User.create({ 
                name, email, password, role: 'alumno', carrera, curso, anioEgreso 
            });
            res.status(201).json({ message: "Alumno creado", alumno: nuevoAlumno });
        } catch (error) {
            res.status(500).json({ message: "Error al crear alumno", error });
        }
    },
    verAnuncios: async (req, res) => {
        try {
            const anuncios = await Anuncio.findAll({ where: { vigente: true } });
            res.status(200).json(anuncios);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener anuncios", error });
        }
    }
};

module.exports = ProfesorController;

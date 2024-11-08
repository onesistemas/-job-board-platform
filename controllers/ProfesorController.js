const ProfesorController = {
    crearAlumno: (req, res) => {
        // Lógica para crear un alumno
        res.send("Alumno creado por el profesor");
    },
    verAnuncios: (req, res) => {
        // Lógica para ver anuncios vigentes
        res.send("Anuncios visibles para el profesor");
    }
};

module.exports = ProfesorController;

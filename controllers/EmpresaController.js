const EmpresaController = {
    crearAnuncio: (req, res) => {
        // Lógica para crear un anuncio
        res.send("Anuncio creado por la empresa");
    },
    verAlumnos: (req, res) => {
        // Lógica para ver perfiles de alumnos
        res.send("Perfiles de alumnos visibles para la empresa");
    }
};

module.exports = EmpresaController;

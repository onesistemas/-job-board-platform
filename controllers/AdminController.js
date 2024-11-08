const AdminController = {
    crearUsuario: (req, res) => {
        // Lógica para crear un usuario (profesor, alumno, empresa)
        res.send("Usuario creado por el administrador");
    },
    gestionarUsuarios: (req, res) => {
        // Lógica para gestionar usuarios
        res.send("Usuarios gestionados por el administrador");
    }
};

module.exports = AdminController;

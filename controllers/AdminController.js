const User = require('../models/User'); // Importa el modelo User

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
    }
};

module.exports = AdminController;

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AuthController = {
    // Registro de usuario
    register: async (req, res) => {
        try {
            const { name, email, role } = req.body;

            // Verificar si el usuario ya existe
            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                return res.status(400).json({ message: "El usuario ya existe" });
            }

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el nuevo usuario
            const newUser = await User.create({ name, email, password: hashedPassword, role });
            const { password, ...userWithoutPassword } = newUser.toJSON();
			res.status(201).json({ message: "Usuario registrado", user: userWithoutPassword });
        } catch (error) {
            res.status(500).json({ message: "Error en el registro", error });
        }
    },

    // Inicio de sesión
login: async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log("Usuario no encontrado");
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Contraseña incorrecta");
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        console.error("Error en el inicio de sesión:", error); // Mostrar el error en la consola del servidor
        res.status(500).json({ message: "Error en el inicio de sesión", error: error.message }); // Mostrar el mensaje de error en la respuesta
    }
}

};

module.exports = AuthController;

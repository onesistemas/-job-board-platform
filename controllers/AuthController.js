// AuthController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AuthController = {
    // Registro de usuario
    register: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;

            // Verificar si el usuario ya existe
            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                return res.status(400).json({ message: "El usuario ya existe" });
            }

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el nuevo usuario
            const newUser = await User.create({ name, email, password: hashedPassword, role });
            res.status(201).json({ message: "Usuario registrado exitosamente" });
        } catch (error) {
            console.error("Error en el registro:", error);
            res.status(500).json({ message: "Error en el registro", error: error.message });
        }
    },

    // Inicio de sesión
    login: async (req, res) => {
		console.log("Datos recibidos en el body:", req.body); // Verifica si los datos están en el body
        try {
            const { email, password } = req.body;

            // Verificar si el usuario existe
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            // Comparar la contraseña
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Contraseña incorrecta" });
            }

            // Generar un token JWT
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Enviar el token como cookie segura
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 3600000
            });

            // Enviar el rol del usuario en la respuesta JSON
            res.status(200).json({ message: "Inicio de sesión exitoso", role: user.role });
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            res.status(500).json({ message: "Error en el inicio de sesión", error: error.message });
        }
    },

    // Cierre de sesión
    logout: (req, res) => {
        res.clearCookie('token');
        res.status(200).json({ message: "Cierre de sesión exitoso" });
    }
};

module.exports = AuthController;

// authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;  // Obtiene el token de la cookie

    if (!token) {
        console.error("Token no proporcionado en la cookie");
        return res.status(403).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error("Token inválido o expirado:", err.message);
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.user = user;
        console.log("Token verificado, usuario autenticado:", user);
        next();
    });
};

module.exports = authMiddleware;

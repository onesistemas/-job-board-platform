// models/Empresa.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Empresa extends Model {}

Empresa.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: true // Cambiado a true si la ubicación es opcional
    },
    contacto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true // Opcional
    },
    web_url: {
        type: DataTypes.STRING,
        allowNull: true, // Opcional
    },
    linkedin_url: {
        type: DataTypes.STRING,
        allowNull: true, // Opcional
    }
}, {
    sequelize,
    modelName: 'Empresa',
    tableName: 'Empresas', // Asegúrate de que coincida con el nombre en la base de datos
    timestamps: true // Sequelize manejará createdAt y updatedAt automáticamente
});

module.exports = Empresa;

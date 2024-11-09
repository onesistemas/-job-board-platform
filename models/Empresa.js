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
        allowNull: false
    },
    contacto: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Empresa',
    tableName: 'Empresas', // Asegúrate de que coincida con el nombre en la base de datos
    timestamps: true // Sequelize manejará createdAt y updatedAt automáticamente
});

module.exports = Empresa;

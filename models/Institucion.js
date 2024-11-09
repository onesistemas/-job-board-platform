const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Institucion = sequelize.define('Institucion', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.ENUM('Secundaria', 'Secundaria Tecnica', 'Secundaria Comercial', 'Terciario', 'Universidad'),
        allowNull: false
    },
    publico: {
        type: DataTypes.ENUM('Publico', 'Mixto', 'Privado'),
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING
    },
    oficina: {
        type: DataTypes.STRING
    },
    contacto: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    codigo_postal: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    ciudad: {
        type: DataTypes.STRING
    },
    pais: {
        type: DataTypes.STRING
    },
    idioma: {
        type: DataTypes.ENUM('Español', 'Ingles', 'Frances', 'Portugues'),
        allowNull: false
    }
});

module.exports = Institucion;

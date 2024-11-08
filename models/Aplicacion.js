const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Anuncio = require('./Anuncio');

const Aplicacion = sequelize.define('Aplicacion', {
    anuncioId: {
        type: DataTypes.INTEGER,
        references: {
            model: Anuncio,
            key: 'id'
        }
    },
    alumnoId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'revisado', 'seleccionado', 'rechazado'),
        defaultValue: 'pendiente'
    }
});

module.exports = Aplicacion;

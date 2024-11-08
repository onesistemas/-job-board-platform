const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('job_board', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;

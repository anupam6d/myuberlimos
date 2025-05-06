const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('myuberlimos', 'myuberlimos', 'myuberlimos123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;

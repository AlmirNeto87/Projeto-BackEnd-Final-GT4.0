const { Sequelize } = require('sequelize');
const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
});



const connection = new Sequelize({
  database:process.env.BD_NAME, 
  username:process.env.BD_USER, 
  password:process.env.BD_PASSWORD,
  host: process.env.BD_HOST,
  dialect: "mysql",
  port: Number(process.env.BD_PORT),
  logging: false

});



module.exports = connection;
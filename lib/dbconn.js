var Sequelize = require('sequelize');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var userName = 'sa';
var password = 'Quocviet@1993';
var hostName = 'localhost';
var sampleDbName = 'DataNodejs';
var sql = require('mssql');
var port1 = 1433;
var port2 = 1035;

// Initialize Sequelize to connect to sample DB
var connection = new Sequelize(sampleDbName, userName, password, {
    dialect: 'mssql',
    host: hostName,
    port: port2, // Default port
    logging: false, // disable logging; default: console.log

    dialectOptions: {
        requestTimeout: 30000 // timeout = 30 seconds
    },
      define: {
      freezeTableName: true
    }
});
connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  var request = new sql.Request([connection]);
  module.exports = connection;

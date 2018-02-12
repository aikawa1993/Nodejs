var Sequelize = require('sequelize');
var userName = 'sa';
var password = 'Quocviet@1993';
var hostName = 'localhost';
var sampleDbName = 'DataNodejs';

// Initialize Sequelize to connect to sample DB
var connection = new Sequelize(sampleDbName, userName, password, {
    dialect: 'mssql',
    host: hostName,
    port: 1433, // Default port
    logging: false, // disable logging; default: console.log

    dialectOptions: {
        requestTimeout: 30000 // timeout = 30 seconds
    }
});


module.exports = connection;
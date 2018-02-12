var Sequelize = require('sequelize');
var userName = 'sa';
var password = '123456';
var hostName = 'localhost';
var sampleDbName = 'Cellphone';

// Initialize Sequelize to connect to sample DB
var connection = new Sequelize(sampleDbName, userName, password, {
    dialect: 'mssql',
    host: hostName,
    port: 1433, // Default port
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
module.exports = connection;
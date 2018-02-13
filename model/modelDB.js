var database = require('/WebNodejs/lib/dbconn');
var Sequelize = require('sequelize');

var User = database.define('user', {
    Username: Sequelize.STRING,
    Password: Sequelize.STRING
});


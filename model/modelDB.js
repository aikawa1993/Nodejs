// var database = require('/WebNodejs/lib/dbconn');
// var Sequelize = require('sequelize');

// var User = database.define('user', {
//     Username: Sequelize.STRING,
//     Password: Sequelize.STRING
// });

// module.exports = {
//    User: User
// };

var DB = require('/WebNodejs/lib/dbconn').DB;

var sql = require('sql');

var User = sql.define({
   name: 'Users',
   columns: ['id', 'username', 'password', 'createdAt', 'updatedAt']
});
module.exports = {
   User: User
};


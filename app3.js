const Sequelize = require('sequelize');
var userName = 'sa';
var password = 'Quocviet@1993';
var hostName = 'localhost';
var sampleDbName = 'DataNodejs';
var port1 = 1433;
var port2 = 1035;
var sequelize = new Sequelize(sampleDbName, userName, password, {
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


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const User = sequelize.define('Customer', {
    Firstname: Sequelize.STRING,
    Lastname: Sequelize.STRING
  });
  // const Task = sequelize.define('aikawa', {
  //   title: Sequelize.STRING,
  //   dueDate: Sequelize.STRING,
  //   isComplete: Sequelize.STRING,
  //   open: Sequelize.STRING,
  // });

// create 
// sequelize.sync()
//   .then(() => User.create({
//     Firstname: 'Việt',
//     Lastname: "Trần",
//   }))
//   .then(user => {
//     console.log(user.toJSON());
//   });

// read
// User.findAll({
//     where: { Firstname: 'Việt'}
// }).then(users => {
//     console.log(users)
// })

// update 
// User.findById(1)
// .then(function(user) {
//   console.log('\nUpdating task:',
//   user.Firstname + ' ' + user.Lastname);
//   user.update({
//     Firstname: "Trâm",
//     Lastname: 'Phạm'
//   })
// })

// remove
User.destroy({
  where: { id: {$lte: 1}}
})
.then(function() {
  User.findAll()
  .then(function(User) {
      console.log('User in database after delete:',
JSON.stringify(User));
      console.log('\nAll done!');
  })
})
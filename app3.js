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
sequelize.sync()
  .then(() => User.create({
    Firstname: 'Việt',
    Lastname: "Trần",
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });
// User.findAll({
//     where: { firstName: 'viet'}
// }).then(users => {
//     console.log(users)
// })

// update 
// Task.findById(1)
// .then(function(task) {
//   console.log('\nUpdating task:',
// task.title + ' ' + task.dueDate);
//   task.update({
//       dueDate: "29/01/2018"
//   })
// })

// remove
// Task.destroy({
//   where: { dueDate: {$lte: new Date(2016,12,31)}}
// })
// .then(function() {
//   Task.findAll()
//   .then(function(tasks) {
//       console.log('Tasks in database after delete:',
// JSON.stringify(tasks));
//       console.log('\nAll done!');
//   })
// })
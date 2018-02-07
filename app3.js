const Sequelize = require('sequelize');
var userName = 'sa';
var password = '123456'; // update me
var hostName = 'localhost';
var sampleDbName = 'CellPhone';
const sequelize = new Sequelize(sampleDbName, userName, password, {
  host: 'VIET-PC',
  dialect: 'mssql',

  define: {
    freezeTableName: true
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
//   // SQLite only
//   storage: 'path/to/database.sqlite',

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

// const User = sequelize.define('task', {
//   firstName: Sequelize.STRING,
//   lastName: Sequelize.STRING
// });
const Task = sequelize.define('aikawa', {
  title: Sequelize.STRING,
  dueDate: Sequelize.STRING,
  isComplete: Sequelize.STRING,
  open: Sequelize.STRING,
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
sequelize.sync()
  .then(() => Task.create({
    title: 'Tram',
    dueDate: "25/04/1993",
    isComplete: true,
    open: '123'
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });
// User.findAll({
//     where: { firstName: 'viet'}
// }).then(users => {
//     console.log(users)
// })
//
// update 
Task.findById(1)
.then(function(task) {
  console.log('\nUpdating task:',
task.title + ' ' + task.dueDate);
  task.update({
      dueDate: "29/01/2018"
  })
})
// remove
Task.destroy({
  where: { dueDate: {$lte: new Date(2016,12,31)}}
})
.then(function() {
  Task.findAll()
  .then(function(tasks) {
      console.log('Tasks in database after delete:',
JSON.stringify(tasks));
      console.log('\nAll done!');
  })
})
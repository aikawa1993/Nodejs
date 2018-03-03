var Connection = require('tedious').Connection;
// Create connection to database
var config = {
  userName: 'sa', // update me
  password: '123456', // update me
  server: 'localhost',
  options: {
      database: 'CellPhone'
  }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');
  }
});

module.exports = connection;
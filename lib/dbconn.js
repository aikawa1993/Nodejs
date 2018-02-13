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
  module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(username, done) {
        done(null, username.userId);
    });

    // used to deserialize the user
    passport.deserializeUser(function(userId, done) {

        request.query("select * from Users where Id='" + userId + "'",function(err,rows){

                done(err, rows[0]);
        });
    });

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form

                request.query("select * from Users where username='" + username +  "'",function(err,rows){

                    if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!( rows[0].password == password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
                console.log('loged');
            });
        }));
    }

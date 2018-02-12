var express = require("express");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var path = require("path");
var passport = require("passport");
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var morgan = require('morgan');
var connection   = require('./lib/dbconn');
var LocalStrategy = require('passport-local').Strategy;
var apiController = require("./controller/apiController");
var homeController = require("./controller/homeController");

var app = express();
app.use(cookieParser());
var port = 3000;
// app.use(session({secret: 'ssshhhhh'}));
app.set("view engine", "ejs");
app.use(express({secret:'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(passport.initialize()); // persistent login sessions
app.use(passport.session()); // use connect-flash for flash messages stored in session

// allow use css & bootstrap
app.use("/assets",express.static(__dirname + "/public"));
app.use("/allow",express.static(__dirname + "/css"));
app.use("/bs",express.static(__dirname + "/bootstrap/css"));
app.use("/hinh",express.static(__dirname + "/img"));

app.set("view engine","ejs");

passport.use('local', new LocalStrategy({

    usernameField: 'username',
  
    passwordField: 'password',
  
    passReqToCallback: true //passback entire req to call back
  } , function (req, username, password, done){
  
        if(!username || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
  
        var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
  
        connection.query("select * from Admin where username = ?", [username], function(err, rows){
  
            console.log(err); console.log(rows);
  
          if (err) return done(req.flash('message',err));
  
          if(!rows.length){ return done(null, false, req.flash('message','Invalid username or password.')); }
  
          salt = salt + '' + password;
  
          var encPassword = crypto.createHash('sha1').update(salt).digest('hex');

          var dbPassword  = rows[0].password;
  
          if(!(dbPassword == encPassword)){ 
              return done(null, false, req.flash('message','Invalid username or password.')); 
           }
  
          return done(null, rows[0]);  
        });
    
      }
      
  ));

  app.post('/signup', passport.authenticate('local', {
    successRedirect : '/user', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));
  
apiController(app);
homeController(app);

app.listen(port, function(){
    console.log("Sever is listening on PORT", port);
});






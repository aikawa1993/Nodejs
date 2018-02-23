var LocalStrategy = require('passport-local').Strategy;
var Model = require('./model/modelDB');
module.exports = function(app, passport, connection) {
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
                console.log('Query Success');
                done(err, rows[0]);
        });
    });

    passport.use('local-login',new LocalStrategy(
        function(req, username, password, done) {
            Model.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
          });
        }
      ));
    // used to serialize the user for the session
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/user', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

    // app.post('/login', function(req, res){
    //     console.log(passport.authenticate('local-login'));
    //     res.render('user.ejs');
    // })

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    // app.get('/signup', function(req, res) {
    //     // render the page and pass in any flash data if it exists
    //     res.render('signup.ejs', { message: req.flash('signupMessage') });
    // });

    // // process the signup form
    // app.post('/signup', passport.authenticate('local-signup', {
    //     successRedirect : '/profile', // redirect to the secure profile section
    //     failureRedirect : '/signup', // redirect back to the signup page if there is an error
    //     failureFlash : true // allow flash messages
    // }));

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/user', isLoggedIn, function(req, res) {
        res.render('user.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");

// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
    app.use("/", function(req, res, next){
        console.log("Request URL:", req.url);
        req.requestTime = new Date();
        next();
    });
    // Get Method
    app.get("/",function(req, res){
        res.render("info");
    });

    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.get('/user', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('user.ejs', { message: req.flash('loginMessage') });
    });

    app.get('/register', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('register.ejs', { message: req.flash('loginMessage') });
    });

    app.get('/listAdmin', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('listAdmin.ejs', { message: req.flash('loginMessage') });
    });

    app.get('/listAdmin', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('listAdmin.ejs', { message: req.flash('loginMessage') });
    });
    
    // /user/123 | /users
    // res.render(tên page,{tham số})

    // app.post("/listAdminJson", jsonParser, function(req, res){
    //     // page success after login
    //     return(jsonParser);
    // });
   
    // app.get("/user", function(req, res){
    //     console.log(sess.username);
    //     res.render("user", { ID: sess.username });
    // });
    // Post Method
    
    // app.post("/login", urlencodedParser,function(req, res){
    //     // res.send("Welcome," + req.body.username);
    //     console.log(req.body.lg_username);
    //     console.log(req.body.lg_password);
    //     if(req.body.lg_username == "viet" && req.body.lg_password == "123")  { 
    //         // sess = req.session;
    //         // Save session username
    //         // sess.username = req.body.lg_username;
    //         //res.end('done');    
    //         return res.redirect('/user');
    //     }
    //     else {
    //         return res.redirect('/login');
    //     }
    // });

    app.post("/loginjson", jsonParser, function(req, res){
        // page success after login
        console.log(req.body.username);
        console.log(req.body.password);
        // return res.redirect("/user");      
    });
}
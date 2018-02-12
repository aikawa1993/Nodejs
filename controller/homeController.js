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
        // console.log("Cookies:",req.cookies);
        // res.send(     
        //     <link href="/assets/style.css" rel="stylesheet" type="text/css"/>
        //     <h1>Hello Express!</h1>
        //     <p>Request time : ${req.requestTime}</p>
        //     <p>Name : ${req.cookies.username}</p>     
        // );
        res.render("info");
    });

    app.get("/user",function(req, res){
        res.render("user");
    });

    app.get("/login",function(req, res){
        res.render("login");
    })
    // /user/123 | /users
    // res.render(tên page,{tham số})
    app.get("/index/:id", function(req,res){
        // res.cookie("username", req.params.id);
        // res.send(`<h1> User: ${sess.username}<\h1>`)
        res.render("index", {ID: req.params.id, queryString: req.query.qstr});
    });
    app.get("/user", function(req, res){
        console.log(sess.username);
        res.render("user", { ID: sess.username });
    });
    // Post Method
    
    app.post("/login", urlencodedParser,function(req, res){
        // res.send("Welcome," + req.body.username);
        console.log(req.body.lg_username);
        console.log(req.body.lg_password);
        if(req.body.lg_username == "viet" && req.body.lg_password == "123")  { 
            // sess = req.session;
            // Save session username
            // sess.username = req.body.lg_username;
            //res.end('done');    
            return res.redirect('/user');
        }
        else {
            return res.redirect('/login');
        }
    });

    app.post("/loginjson", jsonParser, function(req, res){
        // page success after login
        console.log(req.body.username);
        console.log(req.body.password);
        // return res.redirect("/user");      
    });
}
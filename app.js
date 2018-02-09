var express = require("express");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var apiController = require("./controller/apiController");
var homeController = require("./controller/homeController");
var app = express();
app.use(cookieParser());
var port = 3000;
// app.use(session({secret: 'ssshhhhh'}));
app.set("view engine", "ejs");
var sess;

// allow use css & bootstrap
app.use("/assets",express.static(__dirname + "/public"));
app.use("/allow",express.static(__dirname + "/css"));
app.use("/bs",express.static(__dirname + "/bootstrap/css"));
app.use("/hinh",express.static(__dirname + "/img"));

app.set("view engine","ejs");

apiController(app);
homeController(app);

app.listen(port, function(){
    console.log("Sever is listening on PORT", port);
});






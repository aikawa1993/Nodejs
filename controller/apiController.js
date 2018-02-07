var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
// create application/json parser
var jsonParser = bodyParser.json()
module.exports = function (app) {
    app.get("/api",function(req, res){
        res.json({
            firstName:sess.username,
            lastName:"Tran"
        })
    });
    app.post("/api/user/:id", jsonParser, function(req, res){
    // create new and save to the database
    });

    app.put("/api/user", jsonParser, function(req, res){
    // update user and save to the database
    });

    app.delete("/api/user/:id", jsonParser, function(req, res){
    // delete user formd data base
    });

}

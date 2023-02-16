//jshint eversion:6


const express = require("express");
const bodyparser = require("body-parser");
const upload = require('express-fileupload')
const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(upload())
app.set('view engine','ejs');
app.get("/",function(req,res){
    res.render("index");
});
app.get("/login",function(req,res){
    res.render("\login");
});
app.get("/readtest",function(req,res){
    res.render("readtest");
});
app.post("/",function(req,res){
    if(req.files){
        console.log(req.files)
        var file = req.files.file
        var filename=file.name
        var typename=req.files.typename
        console.log(filename)
        file.mv('./uploads/'+filename,function(err)
        {
            if(err)
            {
                res.send(err)
            }
            else{
                res.redirect("/")
            }
        })
    }
});

let port = process.env.PORT;
if(port == null || port == "")
{
    port=3000;
}

app.listen(port,function(){
  console.log("Server started on port successfully");
});

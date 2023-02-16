//jshint eversion:6

const fs = require('fs');
const express = require("express");
const bodyparser = require("body-parser");
const upload = require('express-fileupload')
const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(upload())
app.set('view engine','ejs');
app.get("/",function(req,res){
    res.render("login");
});
app.get("/admin",function(req,res){
    res.render("\admin");
});
app.get("/adminform",function(req,res){
    res.render("adminform");
});
var filename1="";
app.post("/",function(req,res){
    if(req.files){
        console.log(req.files)
        var file = req.files.file
        var filename1=file.name
        var typename=req.files.typename
        console.log(filename1)
        file.mv('./uploads/'+filename1,function(err)
        {
            if(err)
            {
                res.send(err)
            }
            else{
                res.render("adminform")
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


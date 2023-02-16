//jshint eversion:6


const express = require("express");
const bodyparser = require("body-parser");
const upload = require('express-fileupload')


const { spawn } = require('child_process')
const fs = require('fs')
// const users = require("./list.json")
const app = express()

// let encodeUrl = parseUrl.urlencoded({ extended: false })



app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(upload())
app.set('view engine', 'ejs');
app.get("/", function (req, res) {
    res.render("index");
});
app.get("/login", function (req, res) {
    res.render("\login");
});
app.get("/readtest", function (req, res) {
    res.render("readtest");
});
app.post("/", function (req, res) {
    if (req.files) {
        console.log(req.files)
        var file = req.files.file
        var filename = file.name
        var typename = req.files.typename
        console.log(filename)
        file.mv('./uploads/' + filename, function (err) {
            if (err) {
                res.send(err)
            }
            else {
                res.redirect("/")
            }
        })

        // python code
        let largeDataSet = []
        const f_python = spawn('python', ['Reading_word.py'])

        // collect data from script
        f_python.stdout.on('data', function (data) {
            console.log('Pipe data from python script ...')
            //dataToSend =  data;
            largeDataSet.push(data)
            console.log(largeDataSet.join(''))
        })

        // in close event we are sure that stream is from child process is closed
        f_python.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`)
            // send data to browser
            // console.log(largeDataSet.join(''))
            
        })
    }
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log("Server started on port successfully");
});

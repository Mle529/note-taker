// Dependencies
var express = require("express");
var path = require("path");
const fs = require("fs");

// Starts up the express server
var app = express();
var PORT = 8080;

// Sets up the express app to handle the data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// displays notes
app.get("/api/notes", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        console.log(data);
        res.json(JSON.parse(data));
    });
});


app.get("/api/notes", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        let temp = JSON.parse(data);
        console.log(temp);
        temp.push(req.body)
        fs.writeFile('./db/db.json', JSON.stringify(temp), (err) => {
            if (err) {
                throw err;
            }
            res.json('The file has been saved')
        })
    });
});


// Starts the server and begins to listen on port: 8080
app.listen(PORT, () => {
    console.log("App listening on port " + PORT);
});
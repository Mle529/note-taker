// Dependencies
var express = require("express");
var path = require("path");
const fs = require("fs");

// Starts up the express server
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the express app to handle the data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname, + "/public"));

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/assets/js/index.js", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/assets/js/index.js"));
});

app.get("/assets/css/styles.css", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/assets/css/styles.css"));
});

// API Routes
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});


app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;

        let noteDB = JSON.parse(data);

        noteDB.push(newNote);

        let newId = 1
        for (let i = 0; i < noteDB.length; i++) {
            noteDB[i].id = newId++;
        }

        fs.writeFile("./db/db.json", JSON.stringify(noteDB), function (err) {
            if (err) throw err;

            return res.status(200).send("New note added");
        })
    });
});

app.delete("/api/notes/:id", (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let noteDB = JSON.parse(data);
        var uniqueId = parseInt(req.params.id);

        const updateDB = noteDB.filter(obj => obj.id !== uniqueId);

        fs.writeFile("./db/db.json", JSON.stringify(updateDB), function (err) {
            if (err) throw err;

            return res.status(200).send("Note Deleted");
        })
    });
});


// Starts the server and begins to listen on port: 8080
app.listen(PORT, () => {
    console.log("App listening on port " + PORT);
});
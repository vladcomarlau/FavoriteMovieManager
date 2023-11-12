const express = require('express');
const app = express();
const path = require("path");
const sqlite3 = require('sqlite3').verbose();
require("dotenv").config();
var movie = require('./movie.js');
var tvShow = require('./tvShow.js');

let db = new sqlite3.Database('./db/appDb.db', (err) => {
    if (err) {
      console.error(err.message);
    }else{
        console.log('Connected to the database.');
    }
});

app.use("/static",express.static(path.join(__dirname, "static")));

app.get('/', function (req, res) {
    film1 = new movie(1,"vlad");
    serial1 = new tvShow(1,"vladdddd");
    res.send(film1.name + " " + serial1.name);
})
app.listen(process.env.PORT);


//am ramas sa fac ORM (prin care nu mai e nevoie sa 
//interactionez cu SQLite ca sa salvez obiecte in el)
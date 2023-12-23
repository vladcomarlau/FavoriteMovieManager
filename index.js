const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors());

require("dotenv").config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: 'database/database.sqlite',
    logging: false
});

//sincronizare modele   parametru {force:true} pt resetare
sequelize.sync().then(() => {
    console.log('Models successfully (re)created');
}).catch((err) => {
    console.warn('Error creating models');
    console.warn(err);
});
module.exports = {
    sequelize
};
 
const bodyParser = require('body-parser');
const list = require('./database/models/list');
const movie = require('./database/models/movie');

//  many to many relationship
//  a list has multiple movies
//  a movie is part of a list
list.hasMany(movie,{as: 'movies' });
movie.belongsTo(list,{ foreignKey: 'ListId', as: 'movie' });

app.use(bodyParser.json());

//routes
const listRoutes = require('./routes/listRoutes');
const singleListRoutes = require('./routes/singleListRoutes');

const movieRoutes = require('./routes/movieRoutes');
app.use('/lists', listRoutes);
app.use('/list', singleListRoutes);
app.use('/addlist', singleListRoutes);
app.use('/movies', movieRoutes);

app.listen(process.env.PORT);

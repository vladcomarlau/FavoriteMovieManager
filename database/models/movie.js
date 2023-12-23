const { Sequelize } = require("sequelize");
const {sequelize} = require("../../index.js");
const Movie = sequelize.define("Movie", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        notNull: true,
        notEmpty: true
    },
    releaseDate: Sequelize.DATEONLY,
    rating: Sequelize.INTEGER,
    description: Sequelize.STRING,
    posterPath: Sequelize.STRING
},
{ timestamps: false });
module.exports = Movie;

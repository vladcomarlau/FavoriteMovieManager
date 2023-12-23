const { Sequelize } = require("sequelize");
const {sequelize} = require("../../index.js");
const Favorite = sequelize.define("Favorite", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    MovieId: Sequelize.STRING,
    ListId: Sequelize.STRING
},{timestamps: false});
module.exports = Favorite;

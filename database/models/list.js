const { Sequelize } = require("sequelize");
const {sequelize} = require("../../index.js");
const List = sequelize.define("List", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        notNull: true,
        notEmpty: true
    },
    description: Sequelize.STRING,
    owner: {
        type: Sequelize.STRING,
        notNull: true,
        notEmpty: true
    }
},
{ timestamps: false });
module.exports = List;

/*
created by Toby Cantello
created on 10/4/23
updated on 10/4/23
*/

const { Sequelize, db } = require('../db/connection');

let DVD = db.define('dvd', {
    title: Sequelize.STRING,
    director : Sequelize.STRING,
    year: Sequelize.INTEGER
});

module.exports = DVD;
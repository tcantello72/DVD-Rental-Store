/*
created by Toby Cantello
created on 10/25/23
updated on 10/25/23
*/

const { Sequelize, db } = require('../db/connection');

let USER = db.define('user', {
    username : Sequelize.STRING,
    password : Sequelize.STRING,
});

module.exports = USER;
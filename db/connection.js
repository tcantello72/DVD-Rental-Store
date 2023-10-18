/*
created by Toby Cantello
created on 10/4/23
updated on 10/4/23
*/

const path = require('path');
const { Sequelize, Model } = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db.sqlite'),
    logging: false
});

module.exports = {
    db,
    Sequelize
};
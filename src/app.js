/*
created by Toby Cantello
created on 10/4/23
updated on 10/24/23
*/

require('dotenv').config()

const express = require("express");
const app = express();

const dvdRouter = require('../routes/dvd');
const userRouter = require('../routes/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/dvds', dvdRouter)
app.use('/users', userRouter)


module.exports = app;
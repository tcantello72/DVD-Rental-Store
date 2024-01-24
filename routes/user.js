/*
created by Toby Cantello
created on 10/25/23
updated on 11/7/23
*/

const express = require ('express');
const {check, validationResult} = require("express-validator");
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");
const db = require('../db/connection');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const authUser = require('../midWare/authLogin.js');
const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN_SECRET} = process.env;
const USER = require('../models/USER.js');
global.loggedIn = 0;

// GET Route to get all users
router.get("/", authUser, async (req, res, next) => {
    try 
        {
            if (loggedIn == 1)
                {
                    let userList = [];
                    const users = await USER.findAll();
                    for (i=0; i<users.length; i++)
                        {
                            const {id, username, createdAt, updatedAt} = users[i].dataValues;
                            userList.push({id, username, createdAt, updatedAt});
                        }
                    res.send(userList);
                }
            else
                {
                    res.send({message: "Please login to see this information"})
                }
        }
    catch (error)
        {
            next(error);
        }
});

// GET route to get the user in the database with the matching ID
router.get("/:id", authUser, async (req, res, next) => {
    try
        {
            if (loggedIn == 1)
                {
                    const user = await USER.findOne({where: {id: req.params.id}});
                    const {id, username, createdAt, updatedAt} = user
                    res.send({id, username, createdAt, updatedAt});
                }
            else
                {
                    res.send({message: "Please login to see this information"})
                }
        }
    catch (error)
        {
            next((error));
        }
})

// POST route to login a user in 
router.post('/login', authUser, async (req, res) => {
    try 
        {
            const {username, password} = req.body;
            const user = await USER.findOne({where: {username: username}});
            const correctPassword = await bcrypt.compare(password, user.password);

            if(correctPassword) 
                {
                    const {id, username} = user;
                    const token = jwt.sign({id: id, username: username}, ACCESS_TOKEN_SECRET);
                    res.send({message: "Successful Login", token});
                    return global.loggedIn = 1;
                }
                else 
                {
                    res.json("invalid Password")
                }
        }   
    catch (error)
        {
        console.log(error);
        res.status(500).send('something broke')
        }
});

// POST route to create a new user in the database
router.post('/register', async (req, res) => {
    try 
        {
            const {username, password} = req.body;
            const hash = await bcrypt.hash(password, 10);
            const user = await USER.create({username: username, password: hash});
            const token = jwt.sign({id: user.id, username: user.username}, ACCESS_TOKEN_SECRET);
            res.send({message: "Registered Successfully", token});
        }   
    catch (error)
        {
        next((error));
        }
});

module.exports = router;
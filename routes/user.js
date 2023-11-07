/*
created by Toby Cantello
created on 10/25/23
updated on 10/25/23
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
const jwt = require('jsonwebtoken')
const {ACCESS_TOKEN_SECRET} = process.env;

const USER = require('../models/USER.js');

// GET Route to get all users
router.get("/", authUser, async (req, res, next) => {
    try 
        {
            const users = await USER.findAll();
            res.send(users);
        }
    catch (error)
        {
            next(error);
        }
});

// GET route to get the user in the database with the matching ID
router.get("/:id", async (req, res, next) => {
    try
        {
            const user = await USER.findOne({where: {id: req.params.id}});
            res.send(user);
        }
    catch (error)

        {
            next((error));
        }
})

// POST route to create a dvd in the database
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

// POST route to create a dvd in the database
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
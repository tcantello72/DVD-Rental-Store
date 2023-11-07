/*
created by Toby Cantello
created on 10/25/23
updated on 10/25/23
*/

const express = require ('express');
const {check, validationResult} = require("express-validator");
const bodyParser = require('body-parser')
const bcrypt = require("bcryptjs")
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const USER = require('../models/USER.js');

// GET Route to get all users
router.get("/", async (req, res, next) => {
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
router.post('/register', [check("username").not().isEmpty().trim(), check("password").not().isEmpty().trim()], async (req, res, next) => {
    try 
        {
            const errors = validationResult(req);

            if(!errors.isEmpty())
                {
                    res.json({ error: errors.array() })
                }
            else 
                {
                    const user = await USER.create(username, password);
                    res.send(user);
                } 
        }
    catch (error)
        {
            next((error));
        }
});

module.exports = router;
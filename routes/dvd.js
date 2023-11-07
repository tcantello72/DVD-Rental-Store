/*
created by Toby Cantello
created on 10/4/23
updated on 10/25/23
*/

const express = require ('express');
const {check, validationResult} = require("express-validator");
const authUser = require('../midWare/authLogin.js');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const DVD = require('../models/DVD.js');

// GET Route to get all dvds
router.get("/", authUser, async (req, res, next) => {
    try 
        {
            const dvds = await DVD.findAll();
            res.send(dvds);
        }
    catch (error)
        {
            next(error);
        }
});

// GET route to get the dvds in the database with the matching ID
router.get("/:id", async (req, res, next) => {
    try
        {
            const dvds = await DVD.findOne({where: {id: req.params.id}});
            res.send(dvds);
        }
    catch (error)

        {
            next((error));
        }
})

// GET route to get the dvds in the database with the matching ID
router.get("/titles/:title", async (req, res, next) => {
    try
        {
            const dvds = await DVD.findAll({where: {title: req.params.title}});
            res.send(dvds);
        }
    catch (error)

        {
            next((error));
        }
})

// GET route to get the dvds in the database with the matching year
router.get("/years/:year", async (req, res, next) => {
    try
        {
            const dvds = await DVD.findAll({where: {year: req.params.year}});
            res.send(dvds);
        }
    catch (error)

        {
            next((error));
        }
})

// POST route to create a dvd in the database
router.post('/', [check("title").not().isEmpty().trim(), check("director").not().isEmpty().trim(), check("year").not().isEmpty().trim()], async (req, res, next) => {
    try 
        {
            const errors = validationResult(req);

            if(!errors.isEmpty())
                {
                    res.json({ error: errors.array() })
                }
            else 
                {
                    const dvds = await DVD.create(req.body);
                    res.send(dvds);
                } 
        }
    catch (error)
        {
            next((error));
        }
});

// PUT route to update a dvd in the database
router.put('/:id', async (req, res, next) => {
    try
        {
            const dvd = await DVD.update(req.body, {where: {id: req.params.id}});
            res.sendStatus(200);
        }
    catch (error)
        {
            next((error));
        }
});

// DELETE route to delete dvd with matching ID
router.delete('/:id', async (req, res, next) => {
    try 
        {
            const dvd = await DVD.destroy({where: {id: req.params.id}});
            if (dvd === 0) 
                {
                    throw new Error("No DVD to deleted");
                }
            else
                {
                    res.sendStatus(200);
                }   
        } 
    catch (error) {
        next(error);
    }
  });

module.exports = router;
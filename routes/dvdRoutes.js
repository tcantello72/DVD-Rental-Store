/*
created by Toby Cantello
created on 10/4/23
updated on 10/4/23
*/

const express = require ('express');
const {check, validationResult} = require("express-validator");

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const Dvd = require('../models/DVD.js');

// GET Route to get all dvds
router.get("/", async (req, res, next) => {
    try 
        {
            const dvds = await Dvd.findAll();
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
            const dvds = await Dvd.findOne({where: {id: req.params.id}});
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
            const dvds = await Dvd.findAll({where: {title: req.params.title}});
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
            const dvds = await Dvd.findAll({where: {year: req.params.year}});
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
                    const snippet = await Snippet.create(req.body);
                    res.send(snippet);
                } 
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
            const dvd = await Dvd.destroy({where: {id: req.params.id}});
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
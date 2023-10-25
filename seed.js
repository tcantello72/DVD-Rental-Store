/*
created by Toby Cantello
created on 10/4/23
updated on 10/4/23
*/

const Dvd = require("./models/DVD")
const { db } = require("./db/connection");
const { seedDVD } = require("./seedData");

const syncSeed = async () => {
    await db.sync({force: true});
    seedDVD && seedDVD.map(dvd => Dvd.create(dvd));
}

syncSeed();
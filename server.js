/*
created by Toby Cantello
created on 10/4/23
updated on 10/4/23
*/

require("dotenv").config();

const app = require("./src/app");
const { db } = require("./db/connection")

const {PORT} = process.env;

app.listen(PORT, () => {
    db.sync();
    console.log(`Listening at http://localhost:${PORT}/`)
})
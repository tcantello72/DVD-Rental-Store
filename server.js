/*
created by Toby Cantello
created on 10/4/23
updated on 10/4/23
*/

const app = require("./src/app");
const { db } = require("./db/connection")
const port = 3000;

app.listen(port, () => {
    db.sync();
    console.log(`Listening at http://localhost:${port}/`)
})
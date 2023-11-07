const jwt = require('jsonwebtoken')
const {ACCESS_TOKEN_SECRET} = process.env;

function authLogin (req, res, next) {
    const auth = req.header('Authorization');
    if(!auth)
        {
            console.log("You are not authorized!");
            next();
        }
    else
        {
            const [, token] = auth.split(" ");
            const user = jwt.verify(token, ACCESS_TOKEN_SECRET);
            console.log("You are authorized!")
            req.user = user;
            next();
        }
}

module.exports = authLogin
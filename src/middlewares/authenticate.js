const jwt = require("jsonwebtoken");
const { JWT_KEY } = require('../../config/config');

exports.verify = (req, res, next) => {
    const token = req.headers.authorization;
    console.log("autho", token, JWT_KEY);

    if (!token) {
        return res.status(401).end()
    }

    let payload
    try {
        console.log(`token: ${token} y key: ${JWT_KEY}`);
        payload = jwt.verify(token, JWT_KEY)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            //Unauthorized
            console.log("catch ", e);
            return res.status(401).end()
        }
        return res.status(400).end()
    }
    console.log("Username ", payload.username);
    next();
}
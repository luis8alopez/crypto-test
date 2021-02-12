const jwt = require("jsonwebtoken");
const { JWT_KEY } = require('../../config/config');

exports.verify = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).end()
    }

    let payload
    try {
        payload = jwt.verify(token, JWT_KEY)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end()
        }
        return res.status(400).end()
    }
    req.user = payload.username;
    req.coin = payload.coin;
    next();
}
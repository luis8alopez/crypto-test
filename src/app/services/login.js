const jwt = require("jsonwebtoken");
const { JWT_KEY, JWT_TTL } = require('../../../config/config')

exports.signIn = (req, res) => {
    const { username, password } = req.body
    //Petición a mongo
    if (!username || !password) {
        // return 401 error is username or password doesn't exist, or if password does
        return res.status(401).end()
    }

    // Create a new token with the username in the payload
    const token = jwt.sign({ username }, JWT_KEY, {
        algorithm: "HS256",
        expiresIn: JWT_TTL,
    })
    console.log("token:", token)
    res.status(200).send({ token: token })
    res.end()
}
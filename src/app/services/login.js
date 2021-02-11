const jwt = require("jsonwebtoken");
const { JWT_KEY, JWT_TTL } = require('../../../config/config');
const User = require('../users/model');

exports.signIn = async (body) => {
    const { username, password } = body
    const user = await User.findOne({ username: username, password: password });
    if (!user) {
        // return 401 error is username or password doesn't exist, or if password does
        return;
    }

    // Create a new token with the username in the payload
    const token = jwt.sign({ username, coin: user.preferredCoin }, JWT_KEY, {
        algorithm: "HS256",
        expiresIn: JWT_TTL,
    })
    console.log("token:", token)
    return token;
}
const jwt = require("jsonwebtoken");
const { JWT_KEY, JWT_TTL } = require('../../../config/config');
const User = require('../users/model');

exports.signIn = async (body) => {
    const { username, password } = body
    const user = await User.findOne({ username: username, password: password });
    if (!user) {
        return;
    }

    const token = jwt.sign({ username, coin: user.preferredCoin }, JWT_KEY, {
        algorithm: "HS256",
        expiresIn: JWT_TTL,
    })
    return token;
}
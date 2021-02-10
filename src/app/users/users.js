const User = require('./model');

exports.createUser = async (payload) => {
    // const { name, lastname, username, password, preferredCoin } = payload;
    const user = await User.findOne({ username: payload.username });
    if (user == null) {
        const newUser = new User(payload);
        return await newUser.save();
    } else {
        return;
    }
}
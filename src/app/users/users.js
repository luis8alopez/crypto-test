const User = require('./model');

exports.createUser = async (payload) => {
    let user;
    try {
        user = await User.findOne({ username: payload.username });
    } catch (error) {
        throw new Error("Error: Accesing the database");
    }

    if (user == null) {
        try {
            const newUser = new User(payload);
            return await newUser.save();
        } catch (error) {
            throw new Error("Error: saving to database - password should be 8 characters long and alphanumeric");
        }
    } else {
        return;
    }
}
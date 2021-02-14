const { errorHandler } = require('../../middlewares/errorHandler');
const User = require('./model');

exports.createUser = async (payload) => {
    try {
        const user = await User.findOne({ username: payload.username });

        if (!user) {
            try {
                const newUser = new User(payload);
                return await newUser.save();
            } catch (error) {
                throw errorHandler("database");
            }
        } else {
            throw errorHandler("user")
        }
    } catch (error) {
        throw error;
    }
}
const httpStatus = require('http-status');
const usersDB = require('./users');

exports.createUser = async (req, res) => {
    try {
        const response = await usersDB.createUser(req.body);

        if (!response) return res.status(httpStatus.NOT_FOUND).send({ message: 'Not able to create user or user already exists' })

        return res.status(httpStatus.OK).send({ message: "User created successfully" })

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Internal server error", error: error })
    }
}
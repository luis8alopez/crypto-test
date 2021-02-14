const httpStatus = require('http-status');
const User = require('./users');
const { signIn } = require('../services/login');

exports.createUser = async (req, res) => {
    try {
        const response = await User.createUser(req.body);

        if (!response) return res.status(httpStatus.NOT_FOUND).send({ message: 'Not able to create user or user already exists' })

        return res.status(httpStatus.OK).send({ message: "User created successfully" })

    } catch (error) {
        return res.status(error.code).send({ message: error.message })
    }
}

exports.signIn = async (req, res) => {
    try {
        const response = await signIn(req.body);

        if (!response) return res.status(httpStatus.NOT_FOUND).send({ message: 'Unable to log in' })

        return res.status(httpStatus.OK).send({ message: "Log successful", token: response })

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Internal server error", error: error.message })
    }
}
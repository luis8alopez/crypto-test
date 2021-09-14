const httpStatus = require('http-status');
const cryptoPerUser = require('./criptoperuser');
const { errorHandler } = require("../../middlewares/errorHandler");

exports.addCoinForFollowUp = async (req, res) => {
    try {
        if (req.user != req.params.username) {
            throw errorHandler("notAllowed")
        }
        const response = await cryptoPerUser.addCoinForFollowUp(req.params.username, req.body.coin);

        if (!response) return res.status(httpStatus.NOT_FOUND).send({ message: 'Unable to add coin for follow up' })

        return res.status(httpStatus.OK).send({ message: "Coin added" })
    } catch (error) {
        return res.status(error.code).send({ message: error.message, error: error.message })
    }
}

exports.getTopCrypto = async (req, res) => {
    try {
        if (req.user != req.params.username) {
            throw errorHandler("notAllowed")
        }
        query = req.query.top;
        const response = await cryptoPerUser.topCryptos(req.user, req.query.limit);

        if (!response) return res.status(httpStatus.NOT_FOUND).send({ message: 'Unable to get your top crypto coins' })

        return res.status(httpStatus.OK).send({ message: "Your top crypto", data: response })
    } catch (error) {
        return res.status(error.code).send({ message: error.message, error: error.message })
    }

}

exports.getAllCoins = async (req, res) => {
    try {
        const response = await cryptoPerUser.getAllCoins(req.user, req.coin);

        if (!response) return res.status(httpStatus.NOT_FOUND).send({ message: 'Unable to get all coins' })

        return res.status(httpStatus.OK).send({ message: "allCoins", data: response })
    } catch (error) {
        return res.status(error.code).send({ message: error.message, error: error.message })
    }
}

exports.meliController = async (req,res) => {
    console.log('Body: ', req.body);
    console.log('Params: ', req.params);

    return res.status(200).send({message:'ok'});
}

exports.meliAuth = async (req, res) => {
    console.log('Body meliAuth: ', req.body);
    console.log('Params meliAuth: ', req.params);

    return res.status(200).send({message:'token'});
}
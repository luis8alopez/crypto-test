const httpStatus = require('http-status');
const cryptoPerUser = require('./criptoperuser');

exports.addCoinForFollowUp = async (req, res) => {
    try {
        const response = await cryptoPerUser.addCoinForFollowUp(req.user, req.body.coin);

        if (!response) return res.status(httpStatus.NOT_FOUND).send({ message: 'Not able to add coin for follow up' })

        return res.status(httpStatus.OK).send({ message: "Coin added" })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Internal server error", error: error })
    }
}

exports.getTopCrypto = async (req, res) => {
    try {
        const response = await cryptoPerUser.topCryptos(req.user);

        if (!response) return res.status(httpStatus.NOT_FOUND).send({ message: 'Not able to get your top crypto coins' })

        return res.status(httpStatus.OK).send({ message: "You top crypto", data: response })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Internal server error", error: error })
    }

}

exports.getAllCoins = async (req, res) => {
    try {
        const response = await cryptoPerUser.getAllCoins(req.user, req.coin);

        if (!response) return res.status(httpStatus.NOT_FOUND).send({ message: 'Unable to get all coins' })

        return res.status(httpStatus.OK).send({ message: "allCoins", data: response })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Internal server error", error: error })
    }

}
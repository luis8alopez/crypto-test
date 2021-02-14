const cryptoPerUser = require('./model');
// const httpStatus = require('http-status');
const User = require('../users/model');
const { API_URL } = require('../../../config/config');
const axios = require('axios');
const { errorHandler } = require("../../middlewares/errorHandler");

exports.addCoinForFollowUp = async (username, coin) => {

    try {
        const response = await axios.get(`${API_URL}/coins/${coin}`);
        if (!response.data) {
            throw errorHandler("database")
        }
        const user = await User.findOne({ username: username });
        if (!user) {
            throw errorHandler("database")
        }
        const cryptoUser = await cryptoPerUser.findOne({ User: user._id });
        if (!cryptoUser) {
            const newcryptoPerUser = new cryptoPerUser({ User: user._id, idCrypto: coin });
            return await newcryptoPerUser.save();
        } else {
            const res = await cryptoUser.updateOne({ $addToSet: { idCrypto: coin } })
            if (res.nModified === 0) {
                throw errorHandler("followCoin")
            }
            return res;
        }
    } catch (error) {
        if (!error.code) {
            throw errorHandler("database")
        }
        throw error;
    }
}

exports.topCryptos = async (username, limit) => {

    try {
        const user = await User.findOne({ username: username });
        const cryptoUser = await cryptoPerUser.findOne({ User: user._id });

        if (!cryptoUser) {
            throw errorHandler("database")
        }

        if (limit > 25) {
            throw errorHandler("limit");
        }

        const coinInfo = await Promise.all(cryptoUser.idCrypto.map(async (element) => {
            const response = await axios.get(`${API_URL}/coins/${element}`, {
                params: {
                    tickers: false,
                    market_data: true,
                    community_data: false,
                    developer_data: false,
                    sparkline: false
                }
            });
            const {
                name, symbol, image: { thumb }, market_data: { current_price }, last_updated
            } = response.data;
            const { ars, eur, usd } = current_price;
            return { name, symbol, thumb, ars, eur, usd, last_updated }
        }));
        return coinInfo.sort((a, b) => (a.ars > b.ars) ? -1 : 1);
    } catch (error) {
        if (!error.code) {
            throw errorHandler("api");
        }
        throw error
    }
}

exports.getAllCoins = async (username, coin) => {

    try {
        const response = await axios.get(`${API_URL}/coins/markets`, {
            params: {
                vs_currency: coin,
                order: "market_cap_desc",
                per_page: 100,
                sparkline: false
            }
        });

        return response.data.map(element => {
            const { name, symbol, image, current_price, last_updated } = element;
            return { name, symbol, image, current_price, last_updated };
        });
    } catch (error) {
        throw errorHandler("api");
    }
}
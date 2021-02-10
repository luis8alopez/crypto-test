const cryptoPerUser = require('./model');
const userDb = require('../users/model');
const axios = require('axios')

exports.addCoinForFollowUp = async (username, coin) => {

    try {
        const user = await userDb.findOne({ username: username });
        if (user) {
            const cryptoUser = await cryptoPerUser.findOne({ User: user._id });
            if (cryptoUser == null) {
                const newcryptoPerUser = new cryptoPerUser({ User: user._id, idCrypto: coin });
                return await newcryptoPerUser.save();
            } else {
                return await cryptoUser.updateOne({ $addToSet: { idCrypto: coin } })
            }
        } else {
            return;
        }
    } catch (error) {
        console.log("error ", error);
        return;
    }
}

exports.topCryptos = async (username) => {
    try {
        const user = await userDb.findOne({ username: username });
        if (user) {
            const cryptoUser = await cryptoPerUser.findOne({ User: user._id });
            if (cryptoUser == null) {
                return;
            } else {
                console.log("Acá llega el objeto ", cryptoUser);
                const coinInfo = [];
                for (const element of cryptoUser.idCrypto) {
                    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${element}`, {
                        params: {
                            tickers: false,
                            market_data: true,
                            community_data: false,
                            developer_data: false,
                            sparkline: false
                        }
                    });
                    const { name, symbol, image: { thumb }, market_data: { current_price }, last_updated } = response.data;
                    const { ars, eur, usd } = current_price;
                    coinInfo.push({ name, symbol, thumb, ars, eur, usd, last_updated });
                }
                return coinInfo
            }
        } else {
            return;
        }
    } catch (error) {
        console.log("error ", error);
        return;
    }
}
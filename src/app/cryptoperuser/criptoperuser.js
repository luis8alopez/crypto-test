const cryptoPerUser = require('./model');
const User = require('../users/model');
const axios = require('axios')

exports.addCoinForFollowUp = async (username, coin) => {

    try {
        const user = await User.findOne({ username: username });
        if (user) {
            const cryptoUser = await cryptoPerUser.findOne({ User: user._id });
            if (cryptoUser == null) {
                const newcryptoPerUser = new cryptoPerUser({ User: user._id, idCrypto: coin });
                return await newcryptoPerUser.save();
            } else {
                const res = await cryptoUser.updateOne({ $addToSet: { idCrypto: coin } })
                if (res.nModified == 0) {
                    return;
                }
                return res;
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
        const user = await User.findOne({ username: username });
        if (user) {
            const cryptoUser = await cryptoPerUser.findOne({ User: user._id });
            if (cryptoUser == null) {
                return;
            } else {
                const coinInfo = [];
                for (const [index, element] of cryptoUser.idCrypto) {
                    if (index <= 25) {
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
                    } else {
                        console.log("Maximux amount of coins, sorry");
                    }
                }
                coinInfo.sort((a, b) => (a.ars > b.ars) ? -1 : 1);
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

exports.getAllCoins = async (username, coin) => {
    const allCoins = [];
    const preferredCoin = coin;
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
        params: {
            vs_currency: preferredCoin,
            order: "market_cap_desc",
            per_page: 100,
            sparkline: false
        }
    });
    for (const [index, element] of Object.entries(response.data)) {
        const { symbol, name, image, current_price, last_updated } = element;
        allCoins.push({ symbol, name, image, current_price, last_updated })
    }
    return allCoins;
}
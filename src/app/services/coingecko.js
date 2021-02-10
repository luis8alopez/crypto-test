const axios = require('axios');

exports.getAllCoins = async (req, res) => {
    const allCoins = [];
    const ars = "ars" //Users choice
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
        params: {
            vs_currency: ars,
            order: "market_cap_desc",
            per_page: 100,
            sparkline: false
        }
    });
    for (const [index, element] of Object.entries(response.data)) {
        console.log("Procesando ", element.id);
        const { symbol, name, image, current_price, last_updated } = element;
        allCoins.push({ symbol, name, image, current_price, last_updated })
    }
    res.status(200).send(allCoins);
}
const axios = require('axios');
const { API_URL } = require('../../../config/config');

exports.coingecko = async (endpoint, params, query) => {
    let url = "/coins/"
    if (!endpoint) {
        url = url.concat(query);
        const res = await axios.get(`${API_URL}${url}`, {
            params: params
        });
        return res
    }

    url = url.concat(endpoint);
    return await axios.get(`${API_URL}${url}`, {
        params: params
    });
}



const Router = require('express').Router;
const { verify } = require('../../middlewares/authenticate');
const { signIn } = require('../services/login');
const { getAllCoins } = require('../services/coingecko');

const router = new Router();

router.route('/login')
    .post((req, res) => {
        signIn(req, res);
    });

router.route('/coins')
    .get(verify, (req, res) => {
        getAllCoins(req, res);
    })

module.exports = router;
const { Router } = require('express');
const controller = require('./controller');
const { verify } = require('../../middlewares/authenticate');

const router = new Router();

router.route('/addCoin').post(verify, (req, res) => controller.addCoinForFollowUp(req, res))
router.route('/getTop').get(verify, (req, res) => controller.getTopCrypto(req, res))

module.exports = router;
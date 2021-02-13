const { Router } = require('express');
const controller = require('./controller');
const { verify } = require('../../middlewares/authenticate');

const router = new Router();

router.route('/:username/coins').post(verify, (req, res) => controller.addCoinForFollowUp(req, res))
router.route('/:username/coins').get(verify, (req, res) => controller.getTopCrypto(req, res))
router.route('/coins').get(verify, (req, res) => controller.getAllCoins(req, res))

module.exports = router;
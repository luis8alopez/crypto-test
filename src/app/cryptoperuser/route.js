const { Router } = require('express');
const controller = require('./controller');
const { verify } = require('../../middlewares/authenticate');

const router = new Router();

router.route('/:username/coins').post(verify, (req, res) => controller.addCoinForFollowUp(req, res))
router.route('/:username/coins').get(verify, (req, res) => controller.getTopCrypto(req, res))
router.route('/coins').get(verify, (req, res) => controller.getAllCoins(req, res))
router.route('/melibot').post((req,res) => controller.meliController(req,res));
router.route('/meli-auth').get((req,res) => controller.meliAuth(req,res));

module.exports = router;
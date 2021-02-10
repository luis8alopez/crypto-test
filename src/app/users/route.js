const { Router } = require('express');
const controller = require('./controller');
const { verify } = require('../../middlewares/authenticate');

const router = new Router();

router.route('/createUser').post(verify, (req, res) => controller.createUser(req, res))

module.exports = router;
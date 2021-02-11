const { Router } = require('express');
const controller = require('./controller');
const { verify } = require('../../middlewares/authenticate');
const { signIn } = require('../services/login');
const router = new Router();

router.route('/createUser').post(verify, (req, res) => controller.createUser(req, res));
router.route('/login').post((req, res) => { signIn(req, res) });

module.exports = router;
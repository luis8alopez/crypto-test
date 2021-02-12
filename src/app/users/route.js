const { Router } = require('express');
const controller = require('./controller');
const router = new Router();

router.route('/createUser').post((req, res) => controller.createUser(req, res));
router.route('/login').post((req, res) => { controller.signIn(req, res) });

module.exports = router;
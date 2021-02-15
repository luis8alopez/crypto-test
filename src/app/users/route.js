const { Router } = require('express');
const controller = require('./controller');
const { verify } = require('../../middlewares/authenticate');
const router = new Router();

router.route('/').post((req, res) => controller.createUser(req, res));
router.route('/login').post((req, res) => { controller.signIn(req, res) });
router.route('/:username').delete(verify, (req, res) => { controller.deleteUser(req, res) })

module.exports = router;
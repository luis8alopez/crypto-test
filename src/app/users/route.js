const { Router } = require('express');
const controller = require('./controller');
const router = new Router();

//Buscar sobre verbos rest para rutas
router.route('/').post((req, res) => controller.createUser(req, res));
router.route('/login').post((req, res) => { controller.signIn(req, res) });

module.exports = router;
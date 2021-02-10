const { Router } = require('express');
const cryptoRouter = require('./crypto/route');

let router = new Router();


router.use('/', cryptoRouter)
//router.use('/api/v1', cryptoRouter);

//Login
//Create User
//List Crypto Currencies
//Add crypto for follow up
//Top 25 or least of my fav crypto

module.exports = router;
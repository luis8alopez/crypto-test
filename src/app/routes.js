const { Router } = require('express');
const cryptoRouter = require('./crypto/route');
const userRouter = require('./users/route');
const cryptoRouter2 = require('./cryptoxuser/route')

let router = new Router();


router.use('/', cryptoRouter)
router.use('/users', userRouter);
router.use('/crypto', cryptoRouter2);


//Login
//Create User
//List Crypto Currencies
//Add crypto for follow up
//Top 25 or least of my fav crypto

module.exports = router;
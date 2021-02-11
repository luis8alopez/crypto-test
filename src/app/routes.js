const { Router } = require('express');
const userRouter = require('./users/route');
const cryptoRouter = require('./cryptoperuser/route')

let router = new Router();


router.use('/users', userRouter);
router.use('/crypto', cryptoRouter);


//Login
//Create User
//List Crypto Currencies
//Add crypto for follow up
//Top 25 or least of my fav crypto

module.exports = router;
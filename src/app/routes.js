const { Router } = require('express');
const userRouter = require('./users/route');
const cryptoRouter = require('./cryptoperuser/route')

let router = new Router();

router.use('/users', userRouter);
router.use('/crypto', cryptoRouter);

module.exports = router;
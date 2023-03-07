const router = require('express').Router();
const customerRouter = require('./customer');
const adminRouter = require('./admin');
const userRouter = require('./user');

router.use('/customer', customerRouter);
router.use('/admin', adminRouter);
router.use('/user', userRouter);

module.exports = router;
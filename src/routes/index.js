const router = require('express').Router();
const customerRouter = require('./customer');
const adminRouter = require('./admin');

router.use('/customer', customerRouter);
router.use('/admin', adminRouter);

module.exports = router;
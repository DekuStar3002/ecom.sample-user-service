const router = require('express').Router();

const { customerController } = require('../controllers');

router.route('/create')
.post(customerController.createCustomer);

router.route('/login')
.post(customerController.loginCustomer);

module.exports = router;
const router = require('express').Router();

const { customerController } = require('../controllers');

router.route('/create')
.post(customerController.createCustomer);

router.route('/login')
.post(customerController.loginCustomer);

router.route('/validate')
.get(customerController.validateCustomer);

module.exports = router;
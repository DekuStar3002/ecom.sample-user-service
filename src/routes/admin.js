const router = require('express').Router();

const { adminController } = require('../controllers');

router.route('/create')
.post(adminController.createAdmin);

router.route('/login')
.post(adminController.loginAdmin);

module.exports = router;
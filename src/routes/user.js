const router = require('express').Router();
const { userController } = require('../controllers');

router.route('/validate')
.get(userController.validateUser);

module.exports = router;
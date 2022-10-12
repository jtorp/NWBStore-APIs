const router = require('express').Router();
const {authenticateUser, authUserAndCheckPermissions, authorizeAdminPermissions} = require("../middleware/authentication")
const {stripePayment} = require("../controllers/stripeController")
// stripe
router.route('/').post(authenticateUser,stripePayment)

module.exports = router;
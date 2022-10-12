const router = require('express').Router();
const {login, logout, register} = require("../controllers/authController")

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/logout').get(logout)


module.exports = router;
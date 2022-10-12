const router = require('express').Router();
const {authenticateUser, authUserAndCheckPermissions, authorizeAdminPermissions} = require("../middleware/authentication")

const {createCart, updateCart, deleteCart, getAllCarts, getUserCart} = require("../controllers/cartController")

router.route('/').post(authenticateUser,createCart)


router.route('/:id')
.put(authenticateUser,authUserAndCheckPermissions, updateCart)
.delete(authenticateUser, deleteCart)

router.route('/').get(authenticateUser, authorizeAdminPermissions, getAllCarts)
router.route('/find/:id').get(authenticateUser, authUserAndCheckPermissions, getUserCart)


module.exports = router;
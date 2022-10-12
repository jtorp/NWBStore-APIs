const router = require('express').Router();
const {authenticateUser, authUserAndCheckPermissions, authorizeAdminPermissions} = require("../middleware/authentication")
const {createOrder, updateOrder, deleteOrder, getUserOrder, getIncomeStats,getAllOrders} = require("../controllers/orderController")

router.route('/').post(authenticateUser, createOrder)
router.route('/:id')
.put(authenticateUser,authorizeAdminPermissions, updateOrder)
.delete(authenticateUser, authorizeAdminPermissions, deleteOrder)

//get user orders
router.route('/find/:id').get(authenticateUser, authUserAndCheckPermissions, getUserOrder)
//admin lookup all orders
router.route('/').get(authenticateUser, authorizeAdminPermissions, getAllOrders)

router.route('/income').get(authenticateUser, authorizeAdminPermissions, getIncomeStats)
module.exports = router;
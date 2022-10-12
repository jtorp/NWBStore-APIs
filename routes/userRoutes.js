const router = require('express').Router();
const { authenticateUser, authorizeAdminPermissions, authUserAndCheckPermissions } = require("../middleware/authentication")

const { getAllUsers, getSingleUser, getUserStats, deleteUser, updateUser, updateUserPassword } = require("../controllers/userController")
//admin routes
router.route('/').get(authenticateUser, authorizeAdminPermissions, getAllUsers);
router.route('/find/:id').get(authenticateUser, authorizeAdminPermissions, getSingleUser)
router.route('/stats').get(authenticateUser, authorizeAdminPermissions, getUserStats)
//user routes
router.route('/:id/profile').put(authenticateUser, authUserAndCheckPermissions, updateUser)
router.route('/:id/updatePassword').patch(authenticateUser, updateUserPassword)
router.route('/:id/profile').delete(authenticateUser, authUserAndCheckPermissions, deleteUser)


module.exports = router;
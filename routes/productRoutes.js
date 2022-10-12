const router = require('express').Router();
const {authenticateUser, authorizeAdminPermissions} = require("../middleware/authentication")

const {getAllProducts, createProduct, getSingleProduct, updateProduct, deleteProduct} = require("../controllers/productController")

router.route('/').get(getAllProducts)
router.route('/find/:id').get(getSingleProduct)
//admin duty routes: create, update, delete 
router.route('/').post(authenticateUser, authorizeAdminPermissions, createProduct)

router
.route('/:id')
.patch(authenticateUser, authorizeAdminPermissions, updateProduct)
.delete(authenticateUser, authorizeAdminPermissions, deleteProduct);

module.exports = router;
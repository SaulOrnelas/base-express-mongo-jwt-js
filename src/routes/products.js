const { Router } = require('express')
const { check } = require('express-validator')

const { validateJWT, validateFields, isAdminRole } = require('../middlewares')

const {
  createProduct,
  fetchProducts,
  fetchProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/products')

const {
  categoryExistsById,
  productExistsById,
} = require('../helpers/db-validators')

const router = Router()

/**
 * {{url}}/api/products
 */

//  Fetch all products - Token not required
router.get('/', fetchProducts)

// Fetch product by id - Token required
router.get(
  '/:id',
  [
    check('id', 'MongoId invalid').isMongoId(),
    check('id').custom(productExistsById),
    validateFields,
  ],
  fetchProductById
)

// Create product - Token required
router.post(
  '/',
  [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'MongoId invalid').isMongoId(),
    check('category').custom(categoryExistsById),
    validateFields,
  ],
  createProduct
)

// Update product - Token required
router.put(
  '/:id',
  [
    validateJWT,
    check('category', 'MongoId invalid').isMongoId(),
    check('id').custom(productExistsById),
    validateFields,
  ],
  updateProduct
)

// Delete product - Token required (Only Admin)
router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'MongoId invalid').isMongoId(),
    check('id').custom(productExistsById),
    validateFields,
  ],
  deleteProduct
)

module.exports = router

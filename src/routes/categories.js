const { Router } = require('express')
const { check } = require('express-validator')

const { validateJWT, validateFields, isAdminRole } = require('../middlewares')

const {
  createCategory,
  fetchCategories,
  fetchCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories')
const { categoryExistsById } = require('../helpers/db-validators')

const router = Router()

/**
 * {{url}}/api/categories
 */

//  Fetch all categories - Token not required
router.get('/', fetchCategories)

// Fetch category by id - Token not required
router.get(
  '/:id',
  [
    check('id', 'Invalid MongoId').isMongoId(),
    check('id').custom(categoryExistsById),
    validateFields,
  ],
  fetchCategoryById
)

// Create category - Token required
router.post(
  '/',
  [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields,
  ],
  createCategory
)

// Update category - Token required
router.put(
  '/:id',
  [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('id').custom(categoryExistsById),
    validateFields,
  ],
  updateCategory
)

// Update category - Token required (Only Admin)
router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'Invalid MongoId').isMongoId(),
    check('id').custom(categoryExistsById),
    validateFields,
  ],
  deleteCategory
)

module.exports = router

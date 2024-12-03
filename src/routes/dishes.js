const { Router } = require('express')
const { check } = require('express-validator')

const { validateJWT, validateFields, isAdminRole } = require('../middlewares')

const {
  createDish,
  fetchDishes,
  fetchDishById,
  updateDish,
  deleteDish,
} = require('../controllers/dishes')

const {
  categoryExistsById,
  dishExistsById,
} = require('../helpers/db-validators')

const router = Router()

/**
 * {{url}}/api/dishes
 */

//  Fetch all dishes - Token not required
router.get('/', fetchDishes)

// Fetch dish by id - Token required
router.get(
  '/:id',
  [
    check('id', 'MongoId invalid').isMongoId(),
    check('id').custom(dishExistsById),
    validateFields,
  ],
  fetchDishById
)

// Create dish - Token required
router.post(
  '/',
  [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'MongoId invalid').isMongoId(),
    check('category').custom(categoryExistsById),
    validateFields,
  ],
  createDish
)

// Update dish - Token required
router.put(
  '/:id',
  [
    validateJWT,
    check('category', 'MongoId invalid').isMongoId(),
    check('id').custom(dishExistsById),
    validateFields,
  ],
  updateDish
)

// Delete dish - Token required (Only Admin)
router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'MongoId invalid').isMongoId(),
    check('id').custom(dishExistsById),
    validateFields,
  ],
  deleteDish
)

module.exports = router

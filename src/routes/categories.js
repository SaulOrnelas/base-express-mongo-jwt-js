import { Router } from 'express';
import { check } from 'express-validator';
import middlewares from '../middlewares/index.js';
import {
  createCategory,
  fetchCategories,
  fetchCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categories.js'
import { categoryExistsById } from '../helpers/db-validators.js';

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
    middlewares.validateFields,
  ],
  fetchCategoryById
)

// Create category - Token required
router.post(
  '/',
  [
    middlewares.validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    middlewares.validateFields,
  ],
  createCategory
)

// Update category - Token required
router.put(
  '/:id',
  [
    middlewares.validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('id').custom(categoryExistsById),
    middlewares.validateFields,
  ],
  updateCategory
)

// Update category - Token required (Only Admin)
router.delete(
  '/:id',
  [
    middlewares.validateJWT,
    middlewares.isAdminRole,
    check('id', 'Invalid MongoId').isMongoId(),
    check('id').custom(categoryExistsById),
    middlewares.validateFields,
  ],
  deleteCategory
)

export default router

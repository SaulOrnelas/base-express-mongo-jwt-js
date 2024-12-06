import { Router } from "express";
import { check } from "express-validator";
import middlewares from "../middlewares/index.js";

import {
  createDish,
  fetchDishes,
  fetchDishById,
  updateDish,
  deleteDish,
} from '../controllers/dishes.js'

import { categoryExistsById, dishExistsById } from "../helpers/db-validators.js";

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
    middlewares.validateFields,
  ],
  fetchDishById
)

// Create dish - Token required
router.post(
  '/',
  [
    middlewares.validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'MongoId invalid').isMongoId(),
    check('category').custom(categoryExistsById),
    middlewares.validateFields,
  ],
  createDish
)

// Update dish - Token required
router.put(
  '/:id',
  [
    middlewares.validateJWT,
    check('category', 'MongoId invalid').isMongoId(),
    check('id').custom(dishExistsById),
    middlewares.validateFields,
  ],
  updateDish
)

// Delete dish - Token required (Only Admin)
router.delete(
  '/:id',
  [
    middlewares.validateJWT,
    middlewares.isAdminRole,
    check('id', 'MongoId invalid').isMongoId(),
    check('id').custom(dishExistsById),
    middlewares.validateFields,
  ],
  deleteDish
)

export default router

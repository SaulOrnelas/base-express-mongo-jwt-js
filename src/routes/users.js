import { Router } from "express";
import { check } from "express-validator";
import middlewares from "../middlewares/index.js";

import {
  isValidRole,
  existsEmail,
  userExistsById,
} from "../helpers/db-validators.js";

import {
  fetchUsers,
  updateUser,
  createUser,
  deleteUser,
} from "../controllers/users.js";

const router = Router()

//  Fetch all users - Token not required
router.get('/', fetchUsers)

//  Create user - Token not required
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be at least 8 characters').isLength({
      min: 8,
    }),
    check('email', 'Invalid email').isEmail(),
    check('email').custom(existsEmail),
    // check('role', 'Role is not valid').isIn(['ADMIN','USER']),
    check('role').custom(isValidRole),
    middlewares.validateFields,
  ],
  createUser
)

//  Update user - Token not required
router.put(
  '/:id',
  [
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(isValidRole),
    middlewares.validateFields,
  ],
  updateUser
)

//  Delete user - Token not required
router.delete(
  '/:id',
  [
    middlewares.validateJWT,
    // isAdminRole,
    middlewares.hasRole('ADMIN', 'WAITER', 'CLIENT', 'OTHER'),
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(userExistsById),
    middlewares.validateFields,
  ],
  deleteUser
)

export default router

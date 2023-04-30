const { Router } = require('express')
const { check } = require('express-validator')

const {
  validateFields,
  validateJWT,
  //isAdminRole,
  hasRole,
} = require('../middlewares')

const {
  isValidRole,
  existsEmail,
  userExistsById,
} = require('../helpers/db-validators')

const {
  fetchUsers,
  updateUser,
  createUser,
  deleteUser,
} = require('../controllers/users')

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
    validateFields,
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
    validateFields,
  ],
  updateUser
)

//  Delete user - Token not required
router.delete(
  '/:id',
  [
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN', 'SALES', 'OTHER'),
    check('id', 'Not a valid ID').isMongoId(),
    check('id').custom(userExistsById),
    validateFields,
  ],
  deleteUser
)

module.exports = router

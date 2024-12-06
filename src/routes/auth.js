import { Router } from 'express';
import { check } from 'express-validator';

import middlewares from '../middlewares/index.js';
import { login } from '../controllers/auth.js';

const router = Router()

router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    middlewares.validateFields,
  ],
  login
)

export default router;

import * as validateFields from './validate-fields.js';
import * as validateJWT from './validate-jwt.js';
import * as validateRoles from './validate-roles.js'

export default {
  ...validateFields,
  ...validateJWT,
  ...validateRoles,
}

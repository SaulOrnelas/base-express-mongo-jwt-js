const validateFields = require('./validate-fields')
const validateJWT = require('./validate-jwt')
const validaRoles = require('./validate-roles')

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validaRoles,
}

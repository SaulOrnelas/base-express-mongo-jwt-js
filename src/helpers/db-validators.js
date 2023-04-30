const Role = require('../models/role')
const { User, Category, Product } = require('../models')

const isValidRole = async (role = '') => {
  const roleExists = await Role.findOne({ role })
  if (!roleExists) {
    throw new Error(`Role ${role} isn't in database`)
  }
}

const existsEmail = async (correo = '') => {
  // Check if email exists
  const user = await User.findOne({ correo })
  if (user) {
    throw new Error(`The email ${correo}, is currently registred`)
  }
}

const userExistsById = async (id) => {
  // Check if user exists
  const userExists = await User.findById(id)
  if (!userExists) {
    throw new Error(`Id ${id} doesn't exists`)
  }
}

const categoryExistsById = async (id) => {
  // check if category exists
  const category = await Category.findById(id)
  if (!category) {
    throw new Error(`Id ${id} doesn't exists`)
  }
}

const productExistsById = async (id) => {
  // Check if product exists
  const product = await Product.findById(id)
  if (!product) {
    throw new Error(`Id ${id} doesn't exists`)
  }
}

/**
 * Validar colecciones permitidas
 */
const allowedCollections = (collection = '', collections = []) => {
  const collectionExists = collections.includes(collection)
  if (!collectionExists) {
    throw new Error(`Collection ${collection} isn't allowed, ${collections}`)
  }
  return true
}

module.exports = {
  isValidRole,
  existsEmail,
  userExistsById,
  categoryExistsById,
  productExistsById,
  allowedCollections,
}

import { Category, Dish, Role, User} from '../models/index.js'

export const isValidRole = async (role = '') => {
  const roleExists = await Role.findOne({ role })
  if (!roleExists) {
    throw new Error(`Role ${role} isn't in database`)
  }
}

export const existsEmail = async (correo = '') => {
  // Check if email exists
  const user = await User.findOne({ correo })
  if (user) {
    throw new Error(`The email ${correo}, is currently registred`)
  }
}

export const userExistsById = async (id) => {
  // Check if user exists
  const userExists = await User.findById(id)
  if (!userExists) {
    throw new Error(`Id ${id} doesn't exists`)
  }
}

export const categoryExistsById = async (id) => {
  // check if category exists
  const category = await Category.findById(id)
  if (!category) {
    throw new Error(`Id ${id} doesn't exists`)
  }
}

export const dishExistsById = async (id) => {
  // Check if dish exists
  const dish = await Dish.findById(id)
  if (!dish) {
    throw new Error(`Id ${id} doesn't exists`)
  }
}

/**
 * Validar colecciones permitidas
 */
export const allowedCollections = (collection = '', collections = []) => {
  const collectionExists = collections.includes(collection)
  if (!collectionExists) {
    throw new Error(`Collection ${collection} isn't allowed, ${collections}`)
  }
  return true
}
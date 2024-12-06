import { response } from "express";
import { Category } from "../models/index.js";

export const fetchCategories = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query
  const query = { state: true }

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate('user', 'name')
      .skip(Number(from))
      .limit(Number(limit)),
  ])

  res.json({
    total,
    categories,
  })
}

export const fetchCategoryById = async (req, res = response) => {
  const { id } = req.params
  const category = await Category.findById(id).populate('user', 'name')

  res.json(category)
}

export const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase()

  const categoryDB = await Category.findOne({ name })

  if (categoryDB) {
    return res.status(400).json({
      msg: `Category ${categoryDB.name}, already exists`,
    })
  }

  const data = {
    name,
    user: req.user._id,
  }

  const category = new Category(data)

  await category.save()

  res.status(201).json(category)
}

export const updateCategory = async (req, res = response) => {
  const { id } = req.params
  const { state, user, ...data } = req.body

  data.name = data.name.toUpperCase()
  data.user = req.user._id

  const category = await Category.findByIdAndUpdate(id, data, { new: true })

  res.json(category)
}

export const deleteCategory = async (req, res = response) => {
  const { id } = req.params
  const deletedCategory = await Category.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  )

  res.json(deletedCategory)
}
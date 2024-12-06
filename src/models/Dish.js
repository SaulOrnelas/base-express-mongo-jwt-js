import { Schema, model } from "mongoose";

const DishSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  description: { type: String },
  available: { type: Boolean, defult: true },
  img: { type: String },
})

DishSchema.methods.toJSON = function () {
  const { __v, state, ...data } = this.toObject()
  return data
}

export default model('Dish', DishSchema)

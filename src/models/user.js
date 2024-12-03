const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: 'CLIENT',
    emun: ['ADMIN', 'SALES', 'CLIENT', 'OTHER'],
  },
  state: {
    type: Boolean,
    default: true,
  },
})

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject()
  //const { __v, password, _id, ...user } = this.toObject()
  //user.uid = _id
  return user
}

module.exports = model('User', UserSchema)

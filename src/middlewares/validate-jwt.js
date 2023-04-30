const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      msg: 'token is required',
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY)

    // Search user by id
    const user = await User.findById(uid)

    if (!user) {
      return res.status(401).json({
        msg: "Invalid token - user doesn't DB",
      })
    }

    // Check uid
    if (!user.state) {
      return res.status(401).json({
        msg: 'Invalid token - user deleted',
      })
    }

    req.user = user
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({
      msg: 'Invalid User',
    })
  }
}

module.exports = {
  validateJWT,
}

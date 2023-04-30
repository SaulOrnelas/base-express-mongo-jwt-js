const { response } = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')

const { generateJWT } = require('../helpers/generate-jwt')

const login = async (req, res = response) => {
  const { email, password } = req.body

  try {
    // Check if email exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        msg: 'Invalid user or password',
      })
    }

    // Is user active?
    if (!user.state) {
      return res.status(400).json({
        msg: "User isn't active",
      })
    }

    // Validate password
    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Invalid user or password',
      })
    }

    // Generate JWT
    const token = await generateJWT(user.id)

    res.json({
      user,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Comunicate with administrator',
    })
  }
}

module.exports = {
  login,
}

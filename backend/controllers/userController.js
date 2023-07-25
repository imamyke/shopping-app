const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')

const userController = {
  authUser: asyncHandler (async (req, res) => {
    const { phone } = req.body
    const user = await User.findOne({ phone })
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        phone: user.phone,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      })
    } else {
      res.status(401)
      throw new Error('无效的手机号')
    }
  }),
  getUserProfile: asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        phone: user.phone,
        isAdmin: user.isAdmin
      })
    } else {
      res.status(404)
      throw new Error('此手机号还未注册')
    }
  }),
  signupUser: asyncHandler (async (req, res) => {
    const { name, phone } = req.body
    const userExist = await User.findOne({ phone })

    if (userExist) {
      res.status(400)
      throw new Error('此手機號已經被註冊')
    }
    const user = await User.create({ name, phone })
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        phone: user.phone,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })
}

module.exports = userController
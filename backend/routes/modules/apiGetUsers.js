const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const { authMiddleware } = require('../../middlewares/authMiddleware')

router.post('/login', userController.authUser)
router.post('/signup', userController.signupUser)
router.get('/profile', authMiddleware, userController.getUserProfile)

module.exports = router

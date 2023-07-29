const express = require('express')
const router = express.Router()
const orderController = require('../../controllers/orderController')
const { authMiddleware } = require('../../middlewares/authMiddleware')

router.post('/', authMiddleware, orderController.addOrderItems)

module.exports = router

const express = require('express')
const router = express.Router()
const orderController = require('../../controllers/orderController')
const { authMiddleware } = require('../../middlewares/authMiddleware')

router.post('/', authMiddleware, orderController.addOrderItems)
router.get('/:id', authMiddleware, orderController.addOrderItemById)
router.put('/:id/pay', authMiddleware, orderController.updateOrderToPay) // 待寫
router.get('/myorders', authMiddleware, orderController.getMyOrders)

module.exports = router

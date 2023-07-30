const Order = require('../models/order')
const asyncHandler = require('express-async-handler')

const orderController = {
  addOrderItems: asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice
    } = req.body
  
    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items')
    } else {
      const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice
      })
      const createdOrder = await order.save()
      res.status(201).json(createdOrder)
    }
  }),
  addOrderItemById: asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name phone')
    if (order) {
      res.json(order)
    } else {
      res.status(404)
      throw new Error('Order not Found')
    }
  })
  
}

module.exports = orderController
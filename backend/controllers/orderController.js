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
  })
  
}

module.exports = orderController
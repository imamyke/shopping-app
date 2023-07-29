const Order = require('../models/order')
const asyncHandler = require('express-async-handler')

const orderController = {
  addOrderItems: asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      totalPrice
    } = req.body
  
    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order items')
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        totalPrice
      })
      const createdOrder = await order.save()
      res.status(201).json(createdOrder)
    }
  })
  
}

module.exports = orderController
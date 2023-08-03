const express = require('express')
const router = express.Router()
const apiGetUsers = require('./modules/apiGetUsers')
const apiGetProducts = require('./modules/apiGetProducts')
const apiGetOrders = require('./modules/apiGetOrders')
const uploadRoutes = require('./modules/uploadRoutes')

router.use('/api/users', apiGetUsers)
router.use('/api/products', apiGetProducts)
router.use('/api/orders', apiGetOrders)

// upload image
router.use('/api/upload', uploadRoutes)

module.exports = router
const express = require('express')
const router = express.Router()
const apiGetUsers = require('./modules/apiGetUsers')
const apiGetProducts = require('./modules/apiGetProducts')

const upload = require('./modules/uploadRoutes')
const path = require('path')

router.use('/api/users', apiGetUsers)
router.use('/api/products', apiGetProducts)
router.use('/api/upload', upload)

// const __dirname = path.resolve()
// console.log(__dirname);
// router.use('/uploads', express.static(path.join(__dirname, '/uploads')))

module.exports = router
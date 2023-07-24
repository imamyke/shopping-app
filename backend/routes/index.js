const express = require('express')
const router = express.Router()
const apiGetUsers =require('./modules/apiGetUsers')

router.use('/api/users', apiGetUsers)

module.exports = router
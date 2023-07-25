const express = require('express')
const app = express()
const routers = require('./routes')
const cors = require('cors')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// Mongoose(資料庫)連線
require('./config/db')

// 傳遞給前端的錯誤訊息
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('API is running...')
})
app.use(cors())
app.use(routers)
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT} in ${process.env.NODE_ENV}`);
})
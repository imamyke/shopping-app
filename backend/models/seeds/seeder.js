const mongoose = require('mongoose')
const users = require('../../data/users')
const User = require('../user')

// 建立連線
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const connectDB = require('../../config/db')
connectDB()

const importData = async () => {
  try {
    await User.deleteMany(users)
    await User.insertMany(users)

    console.log('Data Imported!');
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()

    console.log('Data Destroyed!');
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
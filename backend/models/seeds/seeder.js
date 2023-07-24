const mongoose = require('mongoose')
const data = require('../../data/users')
const User = require('../user')

// 建立連線
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const connectDB = require('../../config/db')
connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await User.insertMany(users)

    console.log('Data Imported!'.green.inverse);
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()

    console.log('Data Destroyed!'.green.inverse);
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
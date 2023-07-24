const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true })

userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
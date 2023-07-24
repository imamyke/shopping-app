const bcrypt = require('bcryptjs')

const users = [
  { name: 'Admin User', email: 'admin@example.com.tw', password: bcrypt.hashSync('123456', 10), isAdmin: true },
  { name: 'Amy Ke', email: 'amyke@example.com.tw', password: bcrypt.hashSync('123456', 10) },
  { name: 'The8', email: 'the8@example.com.tw', password: bcrypt.hashSync('123456', 10) }
]

module.exports = users
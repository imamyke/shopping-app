const db = require('../../config/db')
const users = require('../../data/users')
const User = require('../user')

db.once('open', () => {
  for (let user of users) {
    User.create({ 
      name: user.name, 
      accountName: user.name === 'Admin' ? 'imamyke' : 'account_name',
      phone: user.phone, 
      isAdmin: user.name === 'Admin' && true  })
  }
  console.log('done.')
})

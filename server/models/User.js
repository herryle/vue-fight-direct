const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    set(val) {
      return require('bcryptjs').hashSync(val, 10)
    }
  }
})

module.exports = mongoose.model('User', schema)

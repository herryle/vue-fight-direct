module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://122.51.172.167:27018/vue-fight-direct', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}

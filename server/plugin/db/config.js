module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://localhost/vue-fight-direct', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}

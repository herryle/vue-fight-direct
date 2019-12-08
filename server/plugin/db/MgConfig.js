module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://loclhost:27018/vue-fight-direct', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}

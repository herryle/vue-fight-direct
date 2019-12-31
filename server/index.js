const express = require('express')
const logger = require('morgan')
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(require('cors')())

app.use('/uploads', express.static(__dirname + '/uploads'))

app.use('/json', express.static(__dirname + '/plugin/json'))


require('./plugin/db/config')(app)
require('./routes/fightinfo')(app)
require('./routes/user')(app)


app.use(async (err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    message: err.message
  })
})

app.listen(3001, () => {
  console.log('http://127.0.0.1:3001/')
})

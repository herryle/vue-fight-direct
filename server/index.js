const express = require('express')
const app = express()

app.use(express.json())
app.use(require('cors')())

//下面代码坑了  慎重！！！！！！  jquery post  获取不到数据！！！
// app.use(express.urlencoded({ extended: true }))

require('./plugin/db/MgConfig')(app)
require('./routes/fightinfo')(app)

app.listen(3001, () => {
  console.log('http://localhost:3001/')
})

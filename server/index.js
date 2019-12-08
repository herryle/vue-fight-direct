const express = require('express')
const app = express()

app.use(express.json())
app.use(require('cors')())

app.use('/uploads', express.static(__dirname + '/uploads'))

//下面代码坑了  慎重！！！！！！  jquery post  获取不到数据！！！
// app.use(express.urlencoded({ extended: true }))

require('./plugin/db/MgConfig')(app)
require('./routes/fightinfo')(app)
require('./routes/user')(app)

//express错误处理中间件函数 错误处理函数  一定要在执行函数的后面
app.use(async (err, req, res, next) => {
  // 如果没有statusCode 则500
  res.status(err.statusCode || 500).send({
    message: err.message
  })
})
app.listen(3001, () => {
  console.log('http://localhost:3001/')
})

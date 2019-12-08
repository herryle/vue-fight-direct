module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const jwt = require('jsonwebtoken')
  const bcryptjs = require('bcryptjs')
  const User = require('../../models/User')

  app.set('secret', 'ashjhdjhasjdidh')
  //路由前面一定要加斜号/
  router.post('/login', async (req, res) => {
    const { username, password } = req.body
    //判断用户是否存在
    const user = await User.findOne({ username })
    if (!user) {
      return res.send({
        status: 422,
        message: '用户不存在'
      })
    }
    //判断密码是否正确
    const isValid = bcryptjs.compareSync(password, user.password)
    if (!isValid) {
      return res.send({
        status: 422,
        message: '密码错误'
      })
    }
    //发送token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    //如果属性和参数是一样的名称可以简写成一个
    //res.send{token:token}
    res.send({ token: token, message: '登陆成功' })
  })

  router.post('/register', async (req, res) => {
    const model = await User.create(req.body)
    res.send(model)
  })

  app.use('/api/rest/user', router)
}

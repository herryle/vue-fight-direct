module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const jwt = require('jsonwebtoken')
  const bcryptjs = require('bcryptjs')
  const User = require('../../models/User')

  app.set('secret', 'ashjhdjhasjdidh')
  router.post('/login', async (req, res) => {
    const { username, password } = req.body
    //判断用户是否存在
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(422).send({
        message: '用户不存在'
      })
    }
    //判断密码是否正确
    const isValid = bcryptjs.compareSync(password, user.password)
    if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    }
    //发送token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token: token, message: '登陆成功' })
  })

  router.post('/register', async (req, res) => {
    const model = await User.create(req.body)
    res.send(model)
  })

  app.use('/api/rest/user', router)
}

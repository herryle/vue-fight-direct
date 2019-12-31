module.exports = options => {
  return async (req, res, next) => {
    const jwt = require('jsonwebtoken')
    //前端ajsx请求头参数都在req.headers里面,注意 前端设置的Authorization(授权书)是大写，这边是小写。
    const token = String(req.headers.authorization || '').split(' ').pop()

    if (token === 'undefined') {
      return res.send({
        status: 401,
        message: '无效的token'
      })
    }
    const userid = jwt.verify(token, req.app.get('secret')).id
    if (!userid) {
      return res.send({
        status: 401,
        message: '用户不存在'
      })
    }
    next()
  }
}

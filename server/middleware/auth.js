module.exports = options => {
  return async (req, res, next) => {
    const jwt = require('jsonwebtoken')
    const token = String(req.headers.authorization || '').split(' ').pop()
    if (!token) {
      return res.status(401).send({
        message: '无效的token'
      })
    }
    const userid = jwt.verify(token, req.app.get('secret')).id
    if (!userid) {
      return res.status(401).send({
        message: '用户不存在'
      })
    }
    next()
  }
}

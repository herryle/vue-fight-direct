module.exports = app => {
  const express = require('express')
  const multer = require('multer')
  const FightInfo = require('../../models/FightInfo')
  const router = express.Router({
    mergeParams: true
  })

  //上传目录
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
  const upload = multer({
    storage: storage
  })

  //用户验证中间件
  const authMiddleWare = require('../../middleware/auth')

  //添加表单
  router.post('/', authMiddleWare(), async (req, res) => {
    await FightInfo.create(req.body)
    res.send({ message: '表单成功添加' })
  })

  //修改表单信息
  router.put('/:id', authMiddleWare(), async (req, res) => {
    await FightInfo.findByIdAndUpdate(req.params.id, req.body)
    res.send({ message: '保存成功' })
  })

  //获取单个表单
  router.get('/:id', async (req, res) => {
    const items = await FightInfo.findById(req.params.id)
    res.send(items)
  })

  //获取所有表单
  router.get('/', async (req, res) => {
    const items = await FightInfo.find().sort({ date: -1 })
    res.send(items)
  })

  //文件上传
  app.post('/api/rest/upload', upload.single('file'), async (req, res) => {
    req.file.url = `http://localhost:3001/uploads/${req.file.filename}`
    await res.send(req.file)
  })

  app.use('/api/rest/fightinfo', router)
}

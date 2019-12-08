module.exports = app => {
  const express = require('express')
  const multer = require('multer')

  const FightInfo = require('../../models/FightInfo')
  const router = express.Router({
    mergeParams: true
  })

  const storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: (req, file, cb) => {
      cb(null, './uploads')
    },
    //给上传文件重命名，获取添加后缀名
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
  //添加配置文件到muler对象。
  const upload = multer({
    storage: storage
  })

  const authMiddleWare = require('../../middleware/auth')

  router.post('/', authMiddleWare(), async (req, res) => {
    const model = await FightInfo.create(req.body)
    res.send({ message: '表单成功添加' })
  })

  router.put('/:id', authMiddleWare(), async (req, res) => {
    const model = await FightInfo.findByIdAndUpdate(req.params.id, req.body)
    res.send({ message: '保存成功' })
  })

  router.get('/:id', async (req, res) => {
    const items = await FightInfo.findById(req.params.id)
    res.send(items)
  })

  router.get('/', async (req, res) => {
    const items = await FightInfo.find()
    res.send(items)
  })

  app.post('/api/rest/upload', upload.single('file'), async (req, res) => {
    req.file.url = `http://122.51.172.167:3001/uploads/${req.file.filename}`
    await res.send(req.file)
  })

  app.use('/api/rest/fightinfo', router)
}

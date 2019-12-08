module.exports = app => {
  const express = require('express')
  const multer = require('multer')

  const FightInfo = require('../../models/FightInfo')
  const router = express.Router({
    //mergeParams 保存父路由params  默认false  本例中可以从子路由中读取req.params.resource的参数
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
  var upload = multer({
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
    //req.params 获取前台url传来的参数
    const items = await FightInfo.findById(req.params.id)
    res.send(items)
  })

  router.get('/', async (req, res) => {
    //req.params 获取前台url传来的参数
    const items = await FightInfo.find()
    res.send(items)
  })

  app.post(
    '/api/rest/upload',
    authMiddleWare(),
    upload.single('file'),
    async (req, res) => {
      const file = req.file
      const name = file.filename
      file.url = `http://localhost:3001/uploads/${name}`
      await res.send(file)
    }
  )

  app.use('/api/rest/fightinfo', router)
}

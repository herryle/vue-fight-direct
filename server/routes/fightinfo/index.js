module.exports = app => {
  const express = require('express')
  const FightInfo = require('../../models/FightInfo')
  const router = express.Router({
    //mergeParams 保存父路由params  默认false  本例中可以从子路由中读取req.params.resource的参数
    mergeParams: true
  })

  router.post('/fightinfo', async (req, res) => {
    const model = await FightInfo.create(req.body)
    res.send(model)
  })

  router.put('/fightinfo/:id', async (req, res) => {
    const model = await FightInfo.findByIdAndUpdate(req.params.id, req.body)
    res.send('更新成功')
  })

  router.get('/fightinfo/:id', async (req, res) => {
    //req.params 获取前台url传来的参数
    const items = await FightInfo.findById(req.params.id)
    res.send(items)
  })

  router.get('/fightinfo', async (req, res) => {
    //req.params 获取前台url传来的参数
    const items = await FightInfo.find()
    res.send(items)
  })
  app.use('/api/rest/', router)
}

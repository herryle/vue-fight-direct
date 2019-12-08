const mongoose = require('mongoose')

//创建模型
const schema = new mongoose.Schema({
  date: { type: Date },
  iteminfo: [
    {
      road_name: { type: String },
      road_lat: { type: Number },
      road_lng: { type: Number },
      ys_state: { type: String },
      ws_state: { type: String },
      issus_list: { type: String },
      list_before_url: [{ name: { type: String }, url: { type: String } }],
      list_after_url: [{ name: { type: String }, url: { type: String } }],
      remark: { type: String },
      ispublic: false
    }
  ]
})

//导出模型
module.exports = mongoose.model('FightInfo', schema)

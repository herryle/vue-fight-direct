const mongoose = require('mongoose')

//创建模型
const schema = new mongoose.Schema({
  name: { type: String },
  date: { type: Date },
  iteminfo: [
    {
      road_name: { type: String },
      road_lat: { type: Number },
      road_lng: { type: Number },
      ys_state: { type: String },
      ws_state: { type: String },
      issus_list: { type: String },
      correct_list_before: { type: String },
      correct_list_after: { type: String },
      remark: { type: String },
      ispublic: false
    }
  ]
})

//导出模型
module.exports = mongoose.model('FightInfo', schema)

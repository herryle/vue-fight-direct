<template>
  <div class="page-main">
    <div class="header">
      <div class="header-item">
        <el-select v-model="value" @change="changeValue">
          <el-option v-for="item in options" :key="item._id" :label="item.date" :value="item._id"></el-option>
        </el-select>
        <el-button @click="addForm">新增表单</el-button>
        <el-button @click="addItem">新增作战对象</el-button>
        <el-button @click="update">保存</el-button>
        <el-button @click="login">登陆</el-button>
      </div>
    </div>
    <div class="table">
      <table class="table table-bordered" id="table">
        <thead>
          <tr class="tr-header">
            <td style="width: 5rem;">序号</td>
            <td colspan="2" style="width: 20rem;">作战对象</td>
            <td style="width: 25rem;">管道情况</td>
            <td colspan="2">问题清单</td>
            <td>整改前报告</td>
            <td>整改后报告</td>
            <td colspan="2">备注</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody v-for="(item,index)  in  model.iteminfo" :key="index">
          <tr>
            <td rowspan="5">
              <span class="num" style="font-weight: 900;  line-height: 300px;">{{index+1}}</span>
            </td>
            <td rowspan="5">
              <div class="roadname">
                <span>{{item.road_name}}</span>
              </div>
            </td>
            <td>
              <span class="ysgx">雨水管线</span>
            </td>
            <td>
              <textarea class="ysstate" v-model="item.ys_state" placeholder="请填写相关内容"></textarea>
            </td>
            <td rowspan="5" colspan="2">
              <textarea class="issuslist" v-model="item.issus_list" placeholder="请填写相关内容"></textarea>
            </td>
            <td rowspan="5" class="correct_list_before">
              <el-form @submit.native.prevent>
                <el-upload
                  class="upload-demo"
                  action="http://localhost:3001/api/rest/upload"
                  :show-file-list="false"
                  :on-success="res=>item.list_before_url.push({
                      name: res.filename,
                      url: res.url
                    })"
                  multiple
                >
                  <el-button size="small" native-type="submit">点击上传</el-button>
                </el-upload>
                <ul>
                  <li v-for="i in item.list_before_url" :key="i">
                    <a :href="i.url">
                      <span>{{i.name}}</span>
                    </a>
                  </li>
                </ul>
              </el-form>
            </td>
            <td rowspan="5" class="list_after_url">
              <el-form @submit.native.prevent>
                <el-upload
                  class="upload-demo"
                  :show-file-list="false"
                  action="http://localhost:3001/api/rest/upload"
                  :on-success="res=>item.list_after_url.push({
                      name: res.filename,
                      url: res.url
                    })"
                  multiple
                >
                  <el-button size="small" native-type="submit">点击上传</el-button>
                </el-upload>
                <ul>
                  <li v-for="i in item.list_after_url" :key="i">
                    <a :href="i.url">
                      <span>{{i.name}}</span>
                    </a>
                  </li>
                </ul>
              </el-form>
            </td>
            <td data-role="remark" rowspan="5" colspan="2">
              <textarea class="remark" v-model="item.remark" placeholder="请填写相关内容"></textarea>
            </td>
            <td rowspan="5">
              <el-button @click.native.prevent="deleteRow(index)" type="text">移除</el-button>
            </td>
          </tr>
          <tr index="${i}">
            <td rowspan="5">
              <span class="wsgx">污水管线</span>
            </td>
            <td rowspan="5">
              <textarea class="wsstate" v-model="item.ws_state" placeholder="请填写相关内容"></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="login">
      <el-dialog title="请先登录" :visible.sync="dialogFormVisible" width="20rem">
        <el-form :model="form">
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitLogin">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>


<script>
import dayjs from 'dayjs'
export default {
  data() {
    return {
      model: {
        date: '',
        iteminfo: []
      },
      item: {},
      id: '',
      value: '',
      options: [],
      dialogFormVisible: false,
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`fightinfo`)
      this.options = res.data
      for (let i = 0; i < this.options.length; i++) {
        this.options[i].date = dayjs(this.options[i].date).format(
          'YYYY-MM-DD HH:mm:ss'
        )
      }
      this.value = dayjs(this.options[0].date).format('YYYY-MM-DD HH:mm:ss')
      this.id = this.options[0]._id
      this.fetchItems(this.id)
    },
    async fetchItems(id) {
      const res = await this.$http.get(`fightinfo/${id}`)
      this.model = res.data
    },
    async addForm() {
      const res = await this.$http.get(
        `http://localhost:3001/json/fightinfo.json`
      )
      this.item = res.data
      this.item.date = new Date()
      await this.$http.post(`fightinfo`, this.item)
      this.fetch()
    },
    async login() {
      this.dialogFormVisible = true
    },
    async update() {
      const res = await this.$http.put(`fightinfo/${this.id}`, this.model)
      this.$message({
        type: 'success',
        message: res.data.message
      })
    },
    async addItem() {
      this.model.iteminfo.push({})
      this.$message({
        type: 'success',
        message: '作战对象成功添加'
      })
    },
    async changeValue(id) {
      this.id = id
      this.fetchItems(id)
    },
    async submitLogin() {
      const res = await this.$http.post(`user/login`, this.form)
      this.dialogFormVisible = false
      sessionStorage.token = res.data.token
      this.$message({
        type: 'success',
        message: res.data.message
      })
    },
    async deleteRow(index) {
      this.model.iteminfo.splice(index, 1)
    }
  },
  created() {
    this.fetch()
  }
}
</script>
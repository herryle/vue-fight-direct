<template>
  <div>
    <div class="header">
      <div class="header-item">
        <!-- 这里是@change 不是:change -->
        <el-select v-model="value" @change="changeValue">
          <el-option v-for="item in options" :key="item._id" :label="item.date" :value="item._id"></el-option>
        </el-select>
        <el-button @click="addItem" v-show="isShow">新增作战对象</el-button>
        <el-button @click="update" v-show="isShow">保存</el-button>
        <el-button @click="publish" v-show="isShow">发布</el-button>
        <el-button @click="login" v-show="loginisShow">保存</el-button>
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
          </tr>
        </thead>
        <tbody v-for="(item,index)  in  model.iteminfo" :key="index">
          <tr>
            <td rowspan="5">
              <span class="num" style="font-weight: 900;  line-height: 300px;">{{1}}</span>
            </td>
            <td rowspan="5">
              <div class="roadname">
                <span>{{item.road_name}}</span>
              </div>
              <!-- <textarea v-model="item.road_name">
              </textarea>-->
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
              <!-- .native 表示对一个组件绑定系统原生事件
              .prevent 表示提交以后不刷新页面-->
              <el-form @submit.native.prevent>
                <el-upload
                  class="upload-demo"
                  action="http://122.51.172.167:3001/api/rest/upload"
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
                    <!-- 在vue中动态绑定一定要加上冒号 ： 一定！！！！ 绑定的就不需要加大双括号 -->
                    <a :href="i.url">
                      <span>{{i.name}}</span>
                    </a>
                  </li>
                </ul>
              </el-form>
            </td>
            <td rowspan="5" class="list_after_url">
              <!-- @submit.native.prevent 组织默认表单提交刷新-->
              <el-form @submit.native.prevent>
                <el-upload
                  class="upload-demo"
                  :show-file-list="false"
                  action="http://122.51.172.167:3001/api/rest/upload"
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
                    <!-- 在vue中动态绑定一定要加上冒号 ： 一定！！！！ 绑定的就不需要加大双括号-->
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
      isShow: false,
      loginisShow: true,
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
        this.options[i].date = dayjs(this.options[i].date).format('YYYY-MM-DD HH:mm:ss')
        if (this.options[i].ispublic == true) {
          this.options[i].ispublic = '已发布'
        } else {
          this.options[i].ispublic = '已保存'
        }
      }
      this.value = dayjs(this.options[0].date).format('YYYY-MM-DD HH:mm:ss')

      this.id = this.options[0]._id
      // pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度!!!
      //this.fetchItems(this.options.pop()._id)
      this.fetchItems(this.id)
    },
    async fetchItems(id) {
      const res = await this.$http.get(`fightinfo/${id}`)
      this.model = res.data
    }
  },
  created() {
    this.fetch()
  }
}
</script>
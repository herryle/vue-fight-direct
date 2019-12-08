const vm = new Vue({
  el: '#app',
  data() {
    return {
      model: {
        date: '',
        iteminfo: []
      },
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
      const res = await axios.get(
        `http://122.51.172.167:3001/api/rest/fightinfo`
      )
      this.options = res.data
      this.value = dayjs(this.options[this.options.length - 1].date).format(
        'YYYY-MM-DD HH:mm:ss'
      )
      this.id = this.options[this.options.length - 1]._id
      // pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度!!!
      //this.fetchItems(this.options.pop()._id)
      this.fetchItems(this.id)
    },
    async fetchItems(id) {
      const res = await axios.get(
        `http://122.51.172.167:3001/api/rest/fightinfo/${id}`
      )
      this.model = res.data
    },
    async update() {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + sessionStorage.token || ''
      const res = await axios.put(
        `http://122.51.172.167:3001/api/rest/fightinfo/${this.id}`,
        this.model
      )
      if (res.data.status == 401) {
        this.dialogFormVisible = true
      } else {
        this.$message({
          type: 'success',
          message: res.data.message
        })
      }
    },
    async add() {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + sessionStorage.token || ''
      fetch('http://122.51.172.167:89/lib/fightinfo.json')
        .then(res => {
          return res.json()
        })
        .then(async data => {
          data.date = new Date()
          const res = await axios.post(
            `http://122.51.172.167:3001/api/rest/fightinfo`,
            data
          )
          if (res.data.status == 401) {
            this.dialogFormVisible = true
          } else {
            this.$message({
              type: 'success',
              message: res.data.message
            })
          }
          this.fetch()
        })
    },
    async changeValue(id) {
      this.id = id
      this.fetchItems(id)
    },
    async login() {
      const res = await axios.post(
        `http://122.51.172.167:3001/api/rest/user/login`,
        this.form
      )
      if (res.data.hasOwnProperty('token')) {
        this.dialogFormVisible = false
        sessionStorage.token = res.data.token
        this.$message({
          type: 'success',
          message: res.data.message
        })
      } else {
        this.$message({
          type: 'error',
          message: res.data.message
        })
      }
    },
    async addItem() {
      this.model.iteminfo.push({})
      this.$message({
        type: 'success',
        message: '作战对象成功添加'
      })
    }
  },
  created() {
    this.fetch()
  }
})

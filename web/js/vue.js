const vm = new Vue({
  el: '#app',
  data: {
    model: {
      itemname: '',
      date: '',
      iteminfo: []
    },
    id: '',
    options: []
  },
  methods: {
    async fetch() {
      const res = await axios.get(`http://localhost:3001/api/rest/fightinfo`)
      this.options = res.data
    },
    async fetchItems(id) {
      const res = await axios.get(
        `http://localhost:3001/api/rest/fightinfo/${id}`
      )
      this.model = res.data
      console.log(this.model)
    },
    async update() {
      const res = await axios.put(
        `http://localhost:3001/api/rest/fightinfo/${this.id}`,
        this.model
      )
    },
    async save() {
      this.model.date = new Date()
      const res = await axios.post(
        `http://localhost:3001/api/rest/fightinfo/${this.id}`,
        this.model
      )
    },
    async changeValue() {
      this.fetchItems(this.id)
    },
    async publish() {}
  },
  created() {
    this.fetch()
  }
})

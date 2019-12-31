import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import 'bootstrap/dist/css/bootstrap.css'
import './style.scss'
import axios from 'axios'


Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  // baseURL: process.env.VUE_APP_API_URL || '/web/api'
  baseURL: 'http://localhost:3001/api/rest/'
})

new Vue({
  render: h => h(App),
}).$mount('#app')

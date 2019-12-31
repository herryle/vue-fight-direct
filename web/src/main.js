import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import 'bootstrap/dist/css/bootstrap.css'
import './style.scss'
import http from './http'


Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  render: h => h(App),
}).$mount('#app')

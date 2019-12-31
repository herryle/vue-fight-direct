import axios from 'axios'
import Vue from 'vue'


const http = axios.create({
  // baseURL: process.env.VUE_APP_API_URL || '/api/rest/'
  baseURL: 'http://localhost:3001/api/rest/'
})

http.interceptors.request.use(
  config => {
    if (sessionStorage.token) {
      config.headers.Authorization = 'Bearer ' + sessionStorage.token
    }
    return config
  },
  err => {
    // Do something with request error
    return Promise.reject(err)
  }
)

//axios状态拦截器
http.interceptors.response.use(
  //状态码200
  res => {
    return res
  },
  err => {
    //状态码为其他
    if (err.response.data.message) {
      Vue.prototype.$message({
        message: err.response.data.message
      })
    }

    if (err.response.status === 401) {
      Vue.prototype.$message({
        message: '请先登陆'
      })
    }
    return Promise.reject(err)
  }
)

export default http

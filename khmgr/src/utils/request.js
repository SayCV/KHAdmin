import Vue from 'vue'
import axios from 'axios'
import store from '@/store'

import { VueAxios } from './axios'
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例 开发域名
const service = axios.create({
  // baseURL: 'http://172.31.231.91/khsrv/',
  baseURL: 'http://keephealth.hznu.edu.cn/khsrv/',
  timeout: 6000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// 创建 axios 实例 公网域名
// const service = axios.create({
//   baseURL: 'http://172.31.231.100/khsrv/',
//   timeout: 6000, // 请求超时时间
//   headers: {
//     'Content-Type': 'application/json; charset=utf-8'
//   }
// })

// axios.defaults.timeout = 6000

const err = error => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)

    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
    // if (error.response.status === 500) {
    //   notification.error({
    //     message: 'Internal Server Error',
    //     description: data.message
    //   })
    // }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['Authorization'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use(response => {
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export { installer as VueAxios, service as axios }

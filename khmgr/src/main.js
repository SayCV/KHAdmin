// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import { VueAxios } from './utils/request'
// import with mavonEditor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// mock
import './mock'

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'
import axios from 'axios'

// use mavonEditor
Vue.use(mavonEditor)

Vue.config.productionTip = false
// 配置默认根路径
axios.defaults.baseURL = 'http://172.31.214.104/khmsrv'
axios.defaults.headers.common['Authorization'] = Vue.ls.get(ACCESS_TOKEN)
// // 配置Vue原型 (在任何组件中都可以正常使用axios)
Vue.prototype.http = axios
// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  router,
  store,
  created () {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')

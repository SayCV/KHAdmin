// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import i18n from './lang'
import { VueAxios } from './utils/request'
// import with mavonEditor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// mock
import './mock'

import bootstrap from './core/bootstrap'
import './core/use'
// permission control
// import './permission'
import './utils/filter' // global filter

// use mavonEditor
Vue.use(mavonEditor)

Vue.config.productionTip = false

Vue.use(VueAxios)

new Vue({
  router,
  store,
  i18n,
  created () {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')

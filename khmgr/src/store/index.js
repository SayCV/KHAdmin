import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  state: {},
  mutations: {},
  actions: {},
  getters,
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      reducer (val) {
        return {
          // 只储存state中的user
          user: val.user
        }
      }
    })
  ]
})

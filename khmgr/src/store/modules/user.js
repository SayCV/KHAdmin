import Vue from 'vue'
import { login } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import { loadLanguageAsync } from '@/lang'

const user = {
  state: {
    token: '',
    name: '',
    userId: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    lang: 'en-US'
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_LANG: (state, lang) => {
      state.lang = lang
    }
  },
  actions: {
    // 登录
    // selfAPI
    Login ({ commit, dispatch }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            const result = response
            // const result = response
            console.log('login get userinfo', response)

            Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            commit('SET_USERID', result.userInfo.userId)
            commit('SET_NAME', {
              name: result.userInfo.nickName,
              welcome: welcome()
            })
            commit('SET_ROLES', result.token)
            commit('SET_INFO', result.userInfo)
            // commit('SET_AVATAR', result.userInfo.avatar)
            commit('SET_AVATAR', result.userInfo.avatar)
            // 设置界面语言
            dispatch('SetLang', result.lang)
            // resolve()
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    // Logout({ commit, state }) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', '')
    //     commit('SET_ROLES', [])
    //     Vue.ls.remove(ACCESS_TOKEN)

    //     logout(state.token)
    //       .then(() => {
    //         resolve()
    //       })
    //       .catch(() => {
    //         resolve()
    //       })
    //   })
    // },
    // 登出
    Logout ({ commit }) {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      Vue.ls.remove(ACCESS_TOKEN)
    },

    // 设置界面语言
    SetLang ({ commit }, lang) {
      return new Promise(resolve => {
        commit('SET_LANG', lang)
        loadLanguageAsync(lang)
        resolve()
      })
    }
  }
}

export default user

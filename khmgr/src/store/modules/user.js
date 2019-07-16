import Vue from 'vue'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    userId: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
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
    }
  },
  actions: {
    // 登录
    // selfAPI
    Login ({ commit }, userInfo) {
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
            // resolve()
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // Fake
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(response => {
            const result = response.result
            console.log('get userinfo', response)
            if (result.role && result.role.permissions.length > 0) {
              const role = result.role
              role.permissions = result.role.permissions
              role.permissionList = role.permissions.map(permission => {
                return permission.permissionId
              })
              commit('SET_ROLES', result.role)
            } else {
              reject(new Error('getInfo: roles must be a non-null array !'))
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 登出
    Logout ({ commit, state }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        Vue.ls.remove(ACCESS_TOKEN)

        logout(state.token)
          .then(() => {
            resolve()
          })
          .catch(() => {
            resolve()
          })
      })
    }
  }
}

export default user

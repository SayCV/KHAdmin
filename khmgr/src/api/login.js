import api from './index'

import {
  axios
} from '@/utils/request'
// import { Base64 } from 'js-base64'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return axios({
    // url: '/auth/login',
    url: '/api/account/login',
    method: 'post',
    headers: {
      'AppKey': '2bwcNhl0Bfw4BoQddO2hlx2L',
      'Secret': 'bc4FEwDfwHExFIbmGbb2Lh1lOsHb6ur2'
    },
    data: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return axios({
    // url: '/user/info',
    url: 'http://localhost:8001/userinfo/getUserInfo.json',
    method: 'get',
    headers: {
      'Authorization': ''
    }
  })
}

// export function getInfo () {
//   return axios({
//     url: '/user/info',
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
// }

export function logout () {
  return axios({
    // url: '/auth/logout',
    url: '/api/account/logout',
    method: 'delete',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}

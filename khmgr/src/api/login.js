import api from './index'

import { axios } from '@/utils/request'
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
      AppKey: '2bwcNhl0Bfw4BoQddO2hlx2L',
      Secret: 'bc4FEwDfwHExFIbmGbb2Lh1lOsHb6ur2'
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

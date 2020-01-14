// import { axios } from '@/utils/request'
import Axios from 'axios'
/**
 * get weather
 * @param parameter
 * @returns {promise}
 */

export function getWeather () {
  return Axios({
    url: 'https://www.tianqiapi.com/api/',
    method: 'get',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    withCredentials: true,
    params: {
      appid: '75128491',
      appsecret: 'kvwZbm3A',
      version: 'v6',
      vue: 1
    }
  })
}

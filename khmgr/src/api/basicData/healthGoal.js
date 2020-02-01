import { axios } from '@/utils/request'

export function getHealthGoalList (params) {
  return axios({
    url: '/api/aims',
    method: 'get',
    params: { ...params }
  })
}

export function getHealthGoalInfo (params) {
  return axios({
    url: `/api/aims/info`,
    method: 'get',
    params: { ...params }
  })
}

export function editHealthGoalItem (data) {
  return axios({
    url: `/api/admin/customers/`,
    method: 'post',
    data: data
  })
}

import { axios } from '@/utils/request'

export function getHealthBitList (params) {
  console.log('healthBit list params =>', params)
  return axios({
    url: '/api/admin/news/',
    method: 'get',
    params: { ...params }
  })
}

export function getHealthBitInfo (newsId) {
  return axios({
    url: `/api/admin/news/${newsId}`,
    method: 'get'
  })
}

export function createHealthBit (formData) {
  return axios({
    url: '/api/admin/news',
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'application/json' }
  })
}

export function updateHealthBit (formData, newsId) {
  return axios({
    url: `/api/admin/news/${newsId}`,
    method: 'put',
    data: formData,
    headers: { 'Content-Type': 'application/json' }
  })
}

export function editHealthGoalItem (data) {
  return axios({
    url: `/api/admin/customers/`,
    method: 'post',
    data: data
  })
}

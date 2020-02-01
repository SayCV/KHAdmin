import { axios } from '@/utils/request'

export function getAPPDripList (params) {
  return axios({
    url: `/api/admin/news/?pageSize=${this.pageSize}&pageNum=${this.current}`,
    method: 'get',
    params: { ...params }
  })
}

export function getAPPDripInfo (newsId) {
  return axios({
    url: `/api/admin/news/${newsId}`,
    method: 'get'
  })
}

export function createAPPDrip (formData) {
  return axios({
    url: '/api/admin/news',
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'application/json' }
  })
}

export function updateAPPDrip (formData, newsId) {
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

import { axios } from '@/utils/request'

export function getWeeklySummaryList (params) {
  return axios({
    url: '/api/admin/customers',
    method: 'get',
    params: { ...params }
  })
}

export function getWeeklySummaryInfo (id) {
  return axios({
    url: `/api/admin/news/${id}`,
    method: 'get'
  })
}

export function createWeeklySummary (formData) {
  return axios({
    url: '/api/admin/news',
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'application/json' }
  })
}

export function updateWeeklySummaryInfo (formData, newsId) {
  return axios({
    url: `/api/admin/news/${newsId}`,
    method: 'put',
    data: formData,
    headers: { 'Content-Type': 'application/json' }
  })
}

export function editWeeklySummaryInfo (data) {
  return axios({
    url: `/api/admin/customers/`,
    method: 'post',
    data: data
  })
}

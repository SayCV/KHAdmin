import { axios } from '@/utils/request'

export function uploadResources (data) {
  return axios({
    url: '/api/resources',
    method: 'post',
    data: data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

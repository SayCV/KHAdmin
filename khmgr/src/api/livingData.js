
import { axios } from '@/utils/request'

export function getUserList (parameter) {
  return axios({
    url: '/api/admin/customers',
    method: 'get',
    params: { ...parameter }
  })
}

export function getPersonList (params) {
  return axios({
    url: `/api/admin/customers/${params}`,
    method: 'get'
  })
}

import { axios } from '@/utils/request'

export function getCustomerList (params) {
  console.log('params =>', { ...params })
  return axios({
    url: '/api/admin/customers',
    method: 'get',
    params: { ...params }
  })
}

export function getCustomerDetailInfo (userId) {
  return axios({
    url: `/api/admin/customers/${userId}`,
    method: 'get'
  })
}

export function updateCustomerInfo (data) {
  return axios({
    url: '/api/admin/customers/{accountId}',
    method: 'put',
    data: { ...data }
  })
}

export function findCustomer (userNo) {
  return axios({
    url: `/api/admin/customers/summary/${userNo}`,
    methods: 'get'
  })
}

export function createCustomer (data) {
  return axios({
    url: `/api/admin/customers/create`,
    methods: 'post',
    data: { ...data }
  })
}

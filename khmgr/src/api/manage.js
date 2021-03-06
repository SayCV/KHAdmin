import { axios } from '@/utils/request'

// baseUrl = http://yapi.sagaii.cn/mock/11
const api = {
  user: '/user', // basedata-客户管理
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree',
  customerlist: '/api/admin/customers',
  customerdetailinfo: '/api/admin/customers/'
}

export default api

export function getCustomerList (parameter) {
  return axios({
    url: api.customerlist,
    method: 'get',
    params: { ...parameter }
  })
}

export function getCustomerDetailInfo (parameter) {
  return axios({
    url: api.customerdetailinfo + `${parameter}`,
    method: 'get',
    params: parameter
  })
}

export function getUserList (parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList (parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions (parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return axios({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService (parameter) {
  return axios({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}

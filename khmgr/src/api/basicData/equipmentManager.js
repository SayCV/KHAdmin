import { axios } from '@/utils/request'

export function getEquipmentList (params) {
  // local mock data
  return axios({
    url: '/api/basedata/equipmentlist',
    method: 'get',
    params: { ...params }
  })
}

export function getEquipmentItem (params) {
  return axios({
    url: `/api/equipmentlistItem/item`,
    method: 'get',
    params: { ...params }
  })
}

export function getEquipmentItemByYapi (params) {
  return axios({
    url: `http://yapi.sagaii.cn/mock/11/api/equipment/detail`,
    method: 'get',
    params: { ...params }
  })
}

export function editEquipmentItemById (data) {
  return axios({
    url: `/api/equipmentlistItem/item`,
    method: 'post',
    data: { ...data }
  })
}

export function deleteEquipmentItemById (data) {
  return axios({
    url: `/api/equipmentlistItem/item`,
    method: 'delete',
    data: { ...data }
  })
}

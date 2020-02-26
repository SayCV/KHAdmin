import { axios } from '@/utils/request'

export function uploadResources (data) {
  return axios({
    url: '/api/resources',
    method: 'post',
    data: data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// upLoad 资源上传地址
export const upLoadAddress = 'http://keephealth.hznu.edu.cn/khsrv/api/resources/'

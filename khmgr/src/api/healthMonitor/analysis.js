import { axios } from '@/utils/request'

export function getAnalysisData (params) {
  console.log('params =>', { ...params })
  return axios({
    url: 'http://yapi.sagaii.cn/mock/11/api/analysis',
    method: 'get',
    params: { ...params }
  })
}

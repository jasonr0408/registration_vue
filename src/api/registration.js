import request from '@/utils/request'

export function newClass(data) {
  return request({
    url: '/class',
    method: 'post',
    data,
    baseURL: '/go-registration'
  })
}


import request from '@/utils/request'

export function newClass(data) {
  return request({
    url: '/class',
    method: 'post',
    data,
    baseURL: '/go-registration'
  })
}

export function getClassList() {
  return request({
    url: '/class/all',
    method: 'get',
    baseURL: '/go-registration'
  })
}

export function importStudentList(classID, data) {
  return request({
    url: '/student/import',
    method: 'post',
    params: { classID: classID },
    data,
    baseURL: '/go-registration'
  })
}

export function checkIn(classID, data) {
  return request({
    url: '/student/check-in',
    method: 'put',
    params: { classID: classID },
    data,
    baseURL: '/go-registration'
  })
}

export function getStudentList(classID) {
  return request({
    url: '/class/status',
    method: 'get',
    params: { classID: classID },
    baseURL: '/go-registration'
  })
}

import request from '@/utils/request'

const addUser = (data) =>
  request({
    url: '/api/user',
    method: 'post',
    data
  })

const getList = (data) =>
  request({
    url: '/api/user',
    method: 'get',
    params: data
  })

const updateUser = (data) =>
  request({
    url: `/api/user/${data.id}`,
    method: 'patch',
    data
  })

const delUser = (id: string) =>
  request({
    url: `/api/user/${id}`,
    method: 'delete'
  })

const addTags = (data) =>
  request({
    url: '/api/user/add/tags',
    method: 'post',
    data
  })

export { addUser, delUser, updateUser, getList, addTags }

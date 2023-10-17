import request from '@/utils/request'
import type { IQueryParams, IUser } from './types'

export const getUserAll = (params: IQueryParams): Promise<PageResult<IUser[]>> =>
  request.get('/user', {
    params
  })

export const addUser = (params: IUser): Promise<IUser> => request.post(`/user`, params)

export const updateUser = (
  id: IUser['id'],
  params: Omit<IUser, 'id'>
): Promise<Pick<IUser, 'username'>> =>
  request.patch(`/user/${id}`, params, {
    headers: {
      Authorization: id
    }
  })

export const deleteUser = (id: IUser['id']): Promise<IUser> => request.delete(`/user/${id}`)

import type { ComputedRef } from 'vue'

export enum EGender {
  'woman' = 0,
  'man' = 1
}

export interface IQueryParams {
  page: number | ComputedRef<number>
  limit?: number
  username?: string
  role?: number[]
  gender?: EGender
}

export interface IProfile {
  id?: number
  address: string
  gender: number
  photo: string
}

export interface IRole {
  id?: number
  name: string
}

export interface IUser {
  id?: number
  username: string
  password?: string
  profile: IProfile
  roles: IRole[] | number[]
}

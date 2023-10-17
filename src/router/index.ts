import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import indexView from '../views/Index/index.vue'

export const routes = [
  {
    path: '/',
    name: 'Index',
    component: indexView
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('@/views/Signin/index.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/layouts/default.vue'),
    redirect: () => {
      return { name: 'Dashboard' }
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard/index.vue'),
        meta: {
          title: '仪表盘',
          icon: 'gauge',
          hidden: false
        }
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/Users/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'user',
          hidden: false
        }
      },
      {
        path: 'roles',
        name: 'Roles',
        component: () => import('@/views/Roles/index.vue'),
        meta: {
          title: '权限管理',
          icon: 'fingerprint',
          hidden: false
        }
      },
      {
        path: 'menus',
        name: 'Menus',
        component: () => import('@/views/Menus/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'bars',
          hidden: false
        }
      }
    ]
  }
] as RouteRecordRaw[]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

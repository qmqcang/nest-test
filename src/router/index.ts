import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/loginView.vue')
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('@/views/Signin/signinView.vue')
  },
  {
    path: '/transfer',
    name: 'transfer',
    component: () => import('@/views/TransferView.vue')
  },
  {
    path: '/crud',
    name: 'crud',
    component: () => import('@/views/CRUDView.vue')
  }
] as RouteRecordRaw[]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

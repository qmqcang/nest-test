import { defineStore } from 'pinia'
import { routes } from '@/router'

export const useMenuStore = defineStore('Menu', () => {
  const getUserMenu = () => {
    const menus = routes
      .find((route) => route.path === '/home')
      ?.children?.filter((route) => !route.meta?.hidden)

    return menus
  }

  return {
    getUserMenu
  }
})

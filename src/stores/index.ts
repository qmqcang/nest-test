import { createPinia } from 'pinia'
import type { App } from 'vue'

const store = createPinia()

export const setupStore = (app: App<Element>) => {
  app.use(store)
}

export { store }

export * from './menus'

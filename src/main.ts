import { createApp } from 'vue'
import App from './App.vue'

import { setupStore } from './stores'
import { setupRouter } from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'bootstrap/dist/js/bootstrap.min'
import './styles/main.scss'

function bootstrap() {
  const app = createApp(App)

  setupStore(app)

  setupRouter(app)

  app.use(ElementPlus)

  app.mount('#app')
}

bootstrap()

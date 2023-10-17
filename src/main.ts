import { createApp } from 'vue'
import App from './App.vue'

import { setupStore } from './stores'
import { setupRouter } from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'bootstrap/dist/js/bootstrap.min'
import './styles/main.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, fab, far)

function bootstrap() {
  const app = createApp(App)

  setupStore(app)

  setupRouter(app)

  app.component('font-awesome-icon', FontAwesomeIcon)

  app.use(ElementPlus)

  app.mount('#app')
}

bootstrap()

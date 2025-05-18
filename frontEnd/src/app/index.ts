import './styles/base.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
// import router from './router'
// app.use(router)
// app.mount('#app')

//export const app = createApp(App).use(createPinia())
export const pinia = createPinia()

export const application = createApp(App).use(pinia);
import './assets/main.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { piniaLoggerPlugin } from './plugins/piniaLoggerPlugin'
import { piniaPersistPlugin } from './plugins/piniaPersistPlugin'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaLoggerPlugin)
pinia.use(piniaPersistPlugin)
app.use(pinia)
app.mount('#app')

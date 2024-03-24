import { createApp } from 'vue'
import Vue3Toastify, { toast }from 'vue3-toastify'

import router from './router'
import App from './App.vue'

import './index.css'
import 'vue3-toastify/dist/index.css';

const app = createApp(App)

app.use(router)
app.use(Vue3Toastify, {
  position: toast.POSITION.BOTTOM_CENTER,
  theme: toast.THEME.COLORED,
  timeout: 3000,    
  icon: false
})
app.mount('#app')

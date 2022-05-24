import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store/index'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

import './network/demo'

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')

console.log(process.env.VUE_APP_BASE_URL)
console.log(process.env.VUE_APP_BASE_NAME)

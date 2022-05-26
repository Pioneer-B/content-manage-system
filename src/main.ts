import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store/index'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

import Request from './network/index'
// import './network/demo'

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')

// 同一个实例的部分请求的拦截
// Request.request({
//   url: '/api/hy66/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptors: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptors: (res) => {
//       console.log('单独响应的config')
//       return res
//     }
//   }
// })
interface DateType {
  data: any
  returnCode: string
  success: boolean
}

// Request.request<DateType>({
//   url: '/api/hy66/home/multidata',
//   method: 'GET'
//   // showLoading: false
// }).then((res) => {
//   console.log(res)
// })

Request.get<DateType>({
  url: '/api/hy66/home/multidata'
  // showLoading: false
}).then((res) => {
  console.log(res)
})

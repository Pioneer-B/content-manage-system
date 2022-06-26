import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store/index'
import { setupStore } from './store/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcon from '@element-plus/icons-vue'

// import Request from './network/index'

import 'normalize.css'
import './assets/css/index.css'
import { globalRegister } from './global'

const app = createApp(App)

for (const iconName in ElIcon) {
  app.component(iconName, (ElIcon as any)[iconName])
}

app.use(store)
// 注：27.28行不能交换位置，不然刷新会匹配到notFound页面
// 原因：执行router时，还没有动态注入路径，所以main/system/user匹配到的routes是notFound；导航守卫是回调，这时候还不会执行
// 执行setupStore，动态注入路径，等同步代码执行完，会执行导航守卫；to在之前就确定了，是notFound
setupStore() // 把本地数据拷贝到state并注入router路径
app.use(router)
app.use(globalRegister)
app.use(ElementPlus).mount('#app')

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
// interface DateType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// Request.request<DateType>({
//   url: '/api/hy66/home/multidata',
//   method: 'GET'
//   // showLoading: false
// }).then((res) => {
//   console.log(res)
// })

// Request.get<DateType>({
//   url: '/api/hy66/home/multidata'
//   // showLoading: false
// }).then((res) => {
//   console.log(res)
// })

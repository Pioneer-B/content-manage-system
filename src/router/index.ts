import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// vue是ts写的，也就是routes在内部已经定义好了类型
// 点进createRouter函数可以看到routes和history的类型
const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   redirect: '/login'
  // },
  {
    path: '/login',
    component: () => import('../view/login/Login.vue')
  },
  {
    path: '/main',
    component: () => import('../view/main/Main.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router

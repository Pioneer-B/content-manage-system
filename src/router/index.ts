import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import cache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

// vue是ts写的，也就是routes在内部已经定义好了类型
// 点进createRouter函数可以看到routes和history的类型
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login/Login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/view/main/Main.vue')
    // children: [] 根据userMenu来决定children
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/view/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  // 为什么写createWebHistory就不能刷新页面？
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = cache.getCache('token')
    // console.log(token)

    if (!token) {
      return '/login'
    }
  }
  // console.log(router.getRoutes())
  // console.log(to, from)

  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
// "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImNvZGVyd2h5Iiwicm9sZSI6eyJpZCI6MSwibmFtZSI6Iui2hee6p-euoeeQhuWRmCJ9LCJpYXQiOjE2NTY5MjA5MzAsImV4cCI6MTY1OTUxMjkzMH0.dhwq5PoWZGFQDGLkcUoLoSDMWWV_TUAgh2fCxyGZMVTwiTNdYDjR5eN6mEo2IIbCTqFZbkS3m3IPn3KvCgNQH4qY9Vyej1vzeL9jT_DKcCsxcsIkD1Xpl1AOsAfJcQWuptvsj1NPmm_Ltwb5LYMGrW7MqHUs3ImKsXqAVkHGEUE"

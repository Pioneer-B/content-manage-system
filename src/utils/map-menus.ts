import { RouteRecordRaw } from 'vue-router'

export default function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.先去加载默认的所有的routes
  /**
   * require.context是webpack内置的一个方法，routeFiles是所有文件相对于main的路径
   * 第一个参数：要查找的文件夹
   * 第二个参数：目标文件夹下面的子文件夹是否需要递归查找
   * 第三个参数：查找什么类型的文件
   */
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((item) => {
    const route = require('../router/main' + item.split('.')[1])
    // 将main文件下的所有的模块放到routes数组里面
    allRoutes.push(route.default)
  })
  // console.log(allRoutes)

  // 2.根据userMenus菜单获取需要添加的route
  // type=1:下面还有子菜单；type=2：下面没有子菜单
  const _recurseGetRoute = (userMenus: any[]) => {
    userMenus.forEach((menu) => {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    })
  }

  _recurseGetRoute(userMenus)
  return routes
}

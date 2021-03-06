import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

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
        if (!firstMenu) firstMenu = menu
      } else {
        _recurseGetRoute(menu.children)
      }
    })
  }

  _recurseGetRoute(userMenus)
  return routes
}

// pathMapToBreadcrumbs和 pathMapToMenu存在大量重复代码，可以进行合并
export function pathMapToBreadcrumbs(userMenus: any[], currentPath: string): any {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  // 注：不能使用forEach，因为return在forEach里无效
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      // 将Menu返回
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function mapMenusToPermission(menus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermissions = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermissions(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermissions(menus)
  return permissions
}

export function menuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)

  return leftKeys
}
export { firstMenu }

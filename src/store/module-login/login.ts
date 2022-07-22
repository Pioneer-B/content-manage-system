import { Module } from 'vuex'
import router from '@/router'
import { LoginState } from './login-type'
import { RootState } from '../index-type'

import cache from '@/utils/cache'
import mapMenusToRoutes, { mapMenusToPermission } from '@/utils/map-menus'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/network/network-login/login'
import { delatePageDate } from '@/network/main/network-system/network-system'
import type { IAccountType } from '@/network/network-login/login-type'

const loginModule: Module<LoginState, RootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenu: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenu(state, userMenu: any) {
      state.userMenu = userMenu
      // 将该账号权限能看到的菜单动态添加到main的子路由下
      const routes = mapMenusToRoutes(userMenu)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      // 获取用户的按钮权限
      const permissions = mapMenusToPermission(userMenu)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccountType) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      console.log(token)

      commit('changeToken', token)
      cache.setCache('token', token)

      // 发送初始化的请求(完整的role/department)
      dispatch('getInitialDataAction', null, { root: true })

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      cache.setCache('userInfo', userInfo)

      // 3.请求用户的菜单
      const userMenuResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenu = userMenuResult.data
      commit('changeUserMenu', userMenu)
      cache.setCache('userMenu', userMenu)

      // 4.跳转到首页
      router.push({
        name: 'main'
      })
    },
    loadCacheData({ commit, dispatch }) {
      const token = cache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 发送初始化的请求(完整的role/department)
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = cache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenu = cache.getCache('userMenu')
      if (userMenu) {
        commit('changeUserMenu', userMenu)
      }
    }
  }
}

export default loginModule

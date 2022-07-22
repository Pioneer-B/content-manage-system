import { createStore, Store, useStore } from 'vuex'
import { RootState, IStoreType } from './index-type'

import moduleSystem from './main/module-system/system'
import loginModule from './module-login/login'
import dashboard from './main/analysis/dashboard'

import { getPageListData } from '@/network/main/network-system/network-system'

const store = createStore<RootState>({
  state() {
    return {
      counter: 100,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data

      // 2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    loginModule,
    moduleSystem,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('loginModule/loadCacheData')
  // store.dispatch('getInitialDataAction')
}

/**
 *IStoreType是将rootState和loginModuleState的交叉类型
 *这样做的原因：
 *vuex对ts支持不是很好，store.state.子module，是没有类型检测的
 */
export function myUseStore(): Store<IStoreType> {
  return useStore()
}

export default store

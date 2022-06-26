import { createStore, Store, useStore } from 'vuex'
import { RootState, IStoreType } from './index-type'
import moduleSystem from './main/module-system/system'

import loginModule from './module-login/login'

const store = createStore<RootState>({
  state() {
    return {
      counter: 100
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    loginModule,
    moduleSystem
  }
})

export function setupStore() {
  store.dispatch('loginModule/loadCacheData')
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

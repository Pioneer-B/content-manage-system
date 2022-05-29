import { createStore } from 'vuex'
import { RootState } from './index-type'

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
  modules: { loginModule }
})

export function setupStore() {
  store.dispatch('loginModule/loadCacheData')
}

export default store

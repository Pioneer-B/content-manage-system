import { getPageListData } from '@/network/main/network-system/network-system'
import { RootState } from '@/store/index-type'
import { Module } from 'vuex'
import { ISystemState } from './system-type'

const moduleSystem: Module<ISystemState, RootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0
    }
  },
  mutations: {
    changeUserList(state, list: any[]) {
      state.userList = list
    },
    changeUserTotalcount(state, totalCount: number) {
      state.userCount = totalCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1. 对页面发送请求
      const pageResult = await getPageListData(payload.pageUrl, payload.data)

      const { list, totalCount } = pageResult.data
      commit('changeUserList', list)
      commit('changeUserTotalcount', totalCount)
    }
  }
}

export default moduleSystem

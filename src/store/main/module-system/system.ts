import { getPageListData } from '@/network/main/network-system/network-system'
import { RootState } from '@/store/index-type'
import { Module } from 'vuex'
import { ISystemState } from './system-type'

const moduleSystem: Module<ISystemState, RootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        // 如果不将state转为any，则会报如下错误,原因`${pageName}List`是个变量，可能ISystemState里没有这个类型
        // err:元素隐式具有 "any" 类型，因为类型为 ""$[pageName]List"" 的表达式不能用于索引类型 "ISystemState"
        return (state as any)[`${pageName}List`]
        //   switch (pageName) {
        //     case 'users':
        //       return state.usersList
        //       break
        //     case 'role':
        //       return state.roleList
        //       break
        //   }
      }
    }
  },
  mutations: {
    changeUsersList(state, list: any[]) {
      state.usersList = list
    },
    changeUsersTotalcount(state, totalCount: number) {
      state.usersCount = totalCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleTotalcount(state, totalCount: number) {
      state.roleCount = totalCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.根据传入的pageName来决定请求的路径
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      // swich方式虽然原始，但是可读性强
      // switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      // }
      // 2. 对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.data)

      // 3.将数据存储到state中
      const { list, totalCount } = pageResult.data
      const handerPageName = (pageName.slice(0, 1) as string).toUpperCase() + pageName.slice(1)
      commit(`change${handerPageName}List`, list)
      commit(`change${handerPageName}Totalcount`, totalCount)

      // switch (pageName) {
      //   case 'users':
      //     commit('changeUsersList', list)
      //     commit('changeUsersTotalcount', totalCount)
      //     break
      //   case 'role':
      //     commit('changeRoleList', list)
      //     commit('changeRoleTotalcount', totalCount)
      //     break
      // }
    }
  }
}

export default moduleSystem

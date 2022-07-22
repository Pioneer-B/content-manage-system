import {
  getPageListData,
  delatePageDate,
  createPageData,
  editPageData
} from '@/network/main/network-system/network-system'
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
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
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
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
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
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsTotalcount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuTotalcount(state, menuCount: number) {
      state.menuCount = menuCount
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
    },
    async deletePageDataAction({ dispatch }, payload: any) {
      // 1.获取pageName和id
      // pageName -> /users
      // id -> /users/id
      const { pageName, id } = payload

      // 2.调用删除网络请求
      await delatePageDate(`${pageName}/${id}`)

      // 3.重新请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        data: {
          offset: 0,
          size: 10
        }
      })
    },
    async createPageDataAction({ dispatch }, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData, id } = payload
      console.log(editData)
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)

      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default moduleSystem

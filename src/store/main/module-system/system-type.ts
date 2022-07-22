export interface ISystemState {
  usersList: any[]
  usersCount: number
  roleList: any[]
  roleCount: number
  goodsList: any[]
  goodsCount: number
  menuList: any[]
  menuCount: number
}

// 返回数据的类型
export interface IDataType<T = any> {
  code: number
  data: T
}

// 返回数据的data
export interface ILoginResult {
  list: []
  totalCount: number
}

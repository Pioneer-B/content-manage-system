export interface ISystemState {
  userList: any[]
  userCount: number
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

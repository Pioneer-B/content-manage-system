export interface IAccountType {
  name: string
  password: string
}

// 返回数据的类型
export interface IDataType<T = any> {
  code: number
  data: T
}

// 返回数据的data
export interface ILoginResult {
  id: number
  name: string
  token: string
}

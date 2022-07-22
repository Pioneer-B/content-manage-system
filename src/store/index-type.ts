import { ISystemState } from './main/module-system/system-type'
import { LoginState } from './module-login/login-type'
import { IDashboardState } from './main/analysis/types'

export interface RootState {
  counter: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  loginModule: LoginState
  moduleSystem: ISystemState
  dashboard: IDashboardState
}

// IStoreType类型：既有IRootWithModule类型 又有 RootState类型
export type IStoreType = IRootWithModule & RootState

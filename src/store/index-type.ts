import { LoginState } from './module-login/login-type'

export interface RootState {
  counter: number
}

export interface IRootWithModule {
  loginModule: LoginState
}

// IStoreType类型：既有IRootWithModule类型 又有 RootState类型
export type IStoreType = IRootWithModule & RootState

// network统一出口

import RequestClass from './request'
import { BASE_URL, TIME_OUT } from './request/config'

import { HeadType } from './request/type'

const Request = new RequestClass({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // showLoading: false,

  // 同一个实例的所有请求的拦截
  interceptors: {
    requestInterceptors: (config: HeadType) => {
      // 携带token的拦截
      const token = ''
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      console.log(`实例请求成功`)
      return config
    },
    requestInterceptorsCatch: (err) => {
      console.log(`实例请求失败`)
      return err
    },
    responseInterceptors: (config) => {
      console.log(`实例响应成功`)
      return config
    },
    responseInterceptorsCatch: (err) => {
      console.log(`实例响应失败`)
      return err
    }
  }
})

export default Request

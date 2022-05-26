import axios from 'axios'
import type { AxiosInstance } from 'axios'

import type { RequestConfig, RequestInterceptors } from './type'

import { ElLoading } from 'element-plus'
// let loadingInstance: any

const DEFAULT_LOADING = true //showLoading的默认值

class Request {
  instance: AxiosInstance // 创建的axios的实例
  interceptors?: RequestInterceptors // 拦截器函数
  showLoading?: boolean // 是否显示Loading
  loadingInstance?: any // ShowLoading的返回值，用于关闭showLoading

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 从config中取出对应实例的拦截器
    // 这个拦截器不是每个实例都有，因为他是可选的，你传入了拦截器这个实例才会有
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )

    // 添加所有实例都有的拦截器，目的：如进行Loading操作
    this.instance.interceptors.request.use(
      (config) => {
        console.log(`所有的实例拦截器请求 成功` + this.showLoading)

        if (this.showLoading) {
          this.loadingInstance = ElLoading.service({
            lock: true,
            text: `正在加载中~~~`,
            background: 'rgba(0,0,0,.5)'
          })
        }

        return config
      },
      (err) => {
        console.log(`所有的实例拦截器请求 失败`)
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log(`所有的实例拦截器响应 成功`)

        // 将loading移除
        this.loadingInstance?.close()

        if (res.data.returnCode === '-1001') {
          console.log(`请求失败`)
        } else {
          return res.data
        }
      },
      (err) => {
        console.log(`所有的实例拦截器响应 失败`)

        // 将loading移除
        this.loadingInstance?.close()

        // 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log(`404的错误`)
        }
        return err
      }
    )
  }

  // 对request做一次封装，然后暴露出去
  // 目的：禁止别人直接使用this.instance.request来操作网络请求
  request<T>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求的拦截处理
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      } else if (config.showLoading === true) {
        this.showLoading = config.showLoading
      }

      this.instance
        //这里要给request泛型传入两个类型，不传的话默认推到出res是AxiosResponse类型，
        // 所以要传入一个类型来替换AxiosResponse类型
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          // console.log(res)
          // 2.将showLoading设置为true，这样才不会影响下一个请求
          resolve(res)
          this.showLoading = DEFAULT_LOADING
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  dedlete<T>(config: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: RequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default Request

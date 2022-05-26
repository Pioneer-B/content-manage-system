/**
 * 需求：我们想要在实例化Request时自己决定要传入哪些拦截函数
 * 问题：constructor(config: RequestConfig)之前config的类型是AxiosRequestConfig，这里面没有对拦截函数的声明，
 * 解决办法：
 *  1.实现RequestInterceptors接口，RequestInterceptors继承AxiosRequestConfig
 *  2.把RequestInterceptors作为config的类型注解
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// 声明拦截 接口
export interface RequestInterceptors {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any
  responseInterceptors?: (config: any) => any
  responseInterceptorsCatch?: (error: any) => any
}

// 对原来config的类型做拓展，使用Request类时自定义传入哪些拦截函数
export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors
  showLoading?: boolean
}
/**
 *需求：携带token；
 *实现思路：拦截请求，把token加在headers的Authorization里
 *问题：config：RequestConfig extends AxiosRequestConfig的headers的类型是AxiosRequestHeaders，没有Authorization：string的类型声明
 *解决办法：
 * 1.HeadType extends RequestConfig，声明headers的类型是any
 */
export interface HeadType extends RequestConfig {
  headers?: any
}

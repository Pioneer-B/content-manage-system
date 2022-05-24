//导入的axios是一个实例过的对象，可以直接调用他内部的方法
import axios, { AxiosResponse } from 'axios'
// 152.136.185.210:7878/api/hy66/home/multidata

axios
  .get('http://152.136.185.210:7878/api/hy66/home/multidata')
  .then((res: AxiosResponse<any, any>) => {
    console.log(res.data)
  })

axios
  .get('http://httpbin.org/get', { params: { name: 'why', age: 18 } })
  .then((res: AxiosResponse<any, any>) => {
    console.log(res.data)
  })

axios
  .post('http://httpbin.org/post', { data: { name: 'why', age: 18 } })
  .then((res: AxiosResponse<any, any>) => {
    console.log(res.data)
  })

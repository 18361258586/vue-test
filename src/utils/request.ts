import axios from 'axios'
import router from '@/router'

class Http {
  private service: any = null
  constructor () {

    this.service = axios.create({
      // baseURL: 'http://139.196.137.208:3000/',
      baseURL: 'http://localhost:3000/',
      timeout: 5000000
    })

        // 添加请求拦截器
    this.service.interceptors.request.use(function (config) {
        // 发送请求之前
        // 确认每个接口默认token
      config.headers['authorization'] = localStorage.getItem('token')
      
      return config
    }, function (error) {
      // 请求错误
      return Promise.reject(error)
    })

        // 添加响应拦截器
    this.service.interceptors.response.use((response) => {
        // 响应数据
        // 如果code码为404，则是登陆过期
      if (response.data.code === '404') {
        // 进行重新登陆
        localStorage.removeItem('token')
        router.replace({ path: '/login' });
      } else {
        return response.data
      }
    }, function (error) {
        // 响应错误
      return Promise.reject(error)
    })
  }
  public get (url:any, params = {}) {
    return this.service.get(`${url}`, { params })
  }
  public post (url:any, data = {}, config = {}) {
    return this.service.post(`${url}`, data, config)
  }
}

export default new Http()

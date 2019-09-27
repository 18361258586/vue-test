import axios from 'axios'

class Http {
  private service: any = null
  constructor () {

    this.service = axios.create({
      baseURL: 'http://139.196.137.208:3000/',
      // baseURL: 'http://localhost:3001/',
      timeout: 5000000
    })

        // 添加请求拦截器
    this.service.interceptors.request.use(function (config) {
        // 发送请求之前
        // 确认每个接口默认token
    //   config.headers['XToken'] = localStorage.getItem('Promising_token')
    //   if (config.data) {
    //     config.data.user_id = localStorage.getItem('Promising_user_id')
    //   } else if (config.params) {
    //     config.params.user_id = localStorage.getItem('Promising_user_id')
    //   }

      return config
    }, function (error) {
      // 请求错误
      return Promise.reject(error)
    })

        // 添加响应拦截器
    this.service.interceptors.response.use((response) => {
        // 响应数据
        // 如果code码为404，则是登陆过期,405 非法请求  ， 406 票据缺失
      if (response.data.code === '404' || response.data.code === '405' || response.data.code === '406') {
        // 进行重新登陆
        localStorage.removeItem('Promising_token')
            // RouterJump.$router.replace({ path: '/' });
      } else {
        return response.data
      }
    }, function (error) {
        // 响应错误
      return Promise.reject(error)
    })
  }
  public get (url, params = {}) {
    return this.service.get(`${url}`, { params })
  }
  public post (url, data = {}, config = {}) {
    return this.service.post(`${url}`, data, config)
  }
}

export default new Http()

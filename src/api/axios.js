import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
//   Headers: {
//     Authorization: 'Bearer ' +
//         JSON.parse(window.sessionStorage.getItem('hm-toutiao')).token
//   }
})

// 添加请求拦截器
instance.interceptors.request.use(config => {
  // config请求配置对象
  // 修改config
  const user = window.sessionStorage.getItem('hm-toutiao')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  // 创建promise对象的方式 new Promise() 结果可能成功可能失败
  // Promises.resolve() 创建一个成功的promise
  // Promise.reject()创建一个失败的promise
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => {
  return response
}, (error) => {
  // 做自己的事情 错误的时候
  // 如果响应状态码是401 拦截到登录页面
  // error.response.status  状态码
  if (error.response.status === 401) {
    // hash是location提供的操作 地址栏的#后的地址的属性
    location.hash = '#/login'
  }
  return Promise.reject(error)
})

export default instance

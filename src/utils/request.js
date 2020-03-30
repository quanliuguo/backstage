import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 300000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  config.baseURL = store.getters.baseApi || config.baseURL
  openLoading()
  config.headers.token = getToken() || ''
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    console.log('响应头-->', response)
    closeLoading()
    const data = response.data
    if (!data) {
      return Promise.reject('Network error.')
    } else if (response.headers['content-type'] === 'application/octet-stream') {
      return data
    } else if (data.returncode !== 1000000) {
      if (data.returncode === 1000003) {
        store.dispatch('imlogout')
        // 登录超时
        Message({
          message: '登录超时，请重新登录',
          type: 'error',
          duration: 2 * 1000,
          onClose: function () {
            router.push('login')
          }
        })
      } else {
        msg(data)
        return Promise.reject(data.message)
      }
    } else {
      return data
    }
  },
  error => {
    closeLoading()
    console.log('err' + error)
    msg(error)
    return Promise.reject(error)
  })

function msg (data) {
  const code = data.returncode || '0000000'
  const str = '错误代码：' + code + '，  错误信息：' + data.message
  Message({
    message: str,
    type: 'error',
    showClose: true,
    duration: 5 * 1000
  })
}
function openLoading () {
  store.dispatch('openLoading')
}
function closeLoading () {
  store.dispatch('closeLoading')
}

export default service

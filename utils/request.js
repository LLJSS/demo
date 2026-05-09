import { BASE_URL } from './config.js'
import { getToken, clearAuth } from './auth.js'

/**
 * @param {Object} options
 * @param {string} options.url 以 / 开头的路径，如 /api/customer/login
 * @param {string} [options.method]
 * @param {Object} [options.data]
 * @param {Object} [options.header]
 * @param {boolean} [options.needAuth=true] 是否自动附带 token 请求头
 */
export function request(options) {
  const needAuth = options.needAuth !== false
  const header = Object.assign(
    {
      'Content-Type': 'application/json'
    },
    options.header || {}
  )
  if (needAuth && getToken()) {
    header.token = getToken()
  }

  const base = (options.baseUrl !== undefined ? options.baseUrl : BASE_URL) || ''
  const path = options.url.startsWith('/') ? options.url : '/' + options.url
  const url = base ? base.replace(/\/$/, '') + path : path

  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method: options.method || 'GET',
      data: options.data,
      header,
      success(res) {
        if (res.statusCode === 401) {
          clearAuth()
          uni.showToast({ title: '登录已过期', icon: 'none' })
          uni.reLaunch({ url: '/pages/login/login' })
          reject(new Error('unauthorized'))
          return
        }
        resolve(res.data)
      },
      fail(err) {
        uni.showToast({
          title: err.errMsg || '网络异常',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}

export function post(url, data, opts = {}) {
  return request(Object.assign({ url, method: 'POST', data }, opts))
}

export function put(url, data, opts = {}) {
  return request(Object.assign({ url, method: 'PUT', data }, opts))
}

export function get(url, data, opts = {}) {
  return request(Object.assign({ url, method: 'GET', data }, opts))
}

const TOKEN_KEY = 'customer_token'
const USER_INFO_KEY = 'customer_user_info'
const REMEMBER_KEY = 'login_remember_credentials'
const REMEMBER_PHONE = 'login_remember_phone'
const REMEMBER_PASSWORD = 'login_remember_password'

export function getToken() {
  return uni.getStorageSync(TOKEN_KEY) || ''
}

export function setToken(token) {
  if (token) {
    uni.setStorageSync(TOKEN_KEY, token)
  } else {
    uni.removeStorageSync(TOKEN_KEY)
  }
}

export function clearAuth() {
  uni.removeStorageSync(TOKEN_KEY)
  uni.removeStorageSync(USER_INFO_KEY)
}

export function hasToken() {
  return !!getToken()
}

export function setUserInfo(data) {
  if (data) {
    uni.setStorageSync(USER_INFO_KEY, JSON.stringify(data))
  } else {
    uni.removeStorageSync(USER_INFO_KEY)
  }
}

export function getUserInfo() {
  try {
    const raw = uni.getStorageSync(USER_INFO_KEY)
    if (!raw) return {}
    return typeof raw === 'string' ? JSON.parse(raw) : raw
  } catch (e) {
    return {}
  }
}

export function saveRememberCredentials(phone, password) {
  uni.setStorageSync(REMEMBER_KEY, '1')
  uni.setStorageSync(REMEMBER_PHONE, phone || '')
  uni.setStorageSync(REMEMBER_PASSWORD, password || '')
}

export function clearRememberCredentials() {
  uni.removeStorageSync(REMEMBER_KEY)
  uni.removeStorageSync(REMEMBER_PHONE)
  uni.removeStorageSync(REMEMBER_PASSWORD)
}

export function loadRememberCredentials() {
  if (uni.getStorageSync(REMEMBER_KEY) !== '1') {
    return { phone: '', password: '' }
  }
  return {
    phone: uni.getStorageSync(REMEMBER_PHONE) || '',
    password: uni.getStorageSync(REMEMBER_PASSWORD) || ''
  }
}

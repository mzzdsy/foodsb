// 获取token
export const getToken = () => {
  return uni.getStorageSync('token')
}

// 设置token
export const setToken = (token) => {
  uni.setStorageSync('token', token)
}

// 移除token
export const removeToken = () => {
  uni.removeStorageSync('token')
}

// 检查是否已登录
export const isLoggedIn = () => {
  return !!getToken()
}

// 检查登录状态
export const checkLogin = () => {
  const token = uni.getStorageSync('token')
  const userInfo = uni.getStorageSync('userInfo')
  
  if (!token || !userInfo?.isLogin) {
    uni.reLaunch({
      url: '/pages/login/index'
    })
    return false
  }
  return true
}

// 获取用户信息
export const getUserInfo = () => {
  return uni.getStorageSync('userInfo')
}

// 退出登录
export const logout = () => {
  uni.removeStorageSync('token')
  uni.removeStorageSync('userInfo')
  uni.reLaunch({
    url: '/pages/login/index'
  })
} 
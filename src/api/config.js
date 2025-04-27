import { getToken } from '@/utils/auth'

export const BASE_URL = 'https://mcragtiiddbt.sealoshzh.site'

// 创建请求头
export const createHeaders = (isMultipart = false) => {
  const headers = {}
  
  const token = getToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  if (!isMultipart) {
    headers['Content-Type'] = 'application/json'
  }
  
  return headers
}

// 处理响应
export const handleResponse = (response) => {
  if (!response) {
    throw new Error('网络请求失败')
  }

  const { statusCode, data } = response
  
  if (statusCode >= 200 && statusCode < 300) {
    return data
  }
  
  // 处理错误
  const error = new Error(data?.message || '请求失败')
  error.code = statusCode
  throw error
}

// 处理错误
export const handleError = (error) => {
  // 处理401未授权错误
  if (error.code === 401) {
    // 清除token并跳转到登录页
    uni.removeStorageSync('token')
    uni.reLaunch({
      url: '/pages/login/index'
    })
  }
  
  // 显示错误提示
  uni.showToast({
    title: error.message || '请求失败',
    icon: 'none'
  })
  
  throw error
} 
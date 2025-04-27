import { BASE_URL, createHeaders, handleResponse, handleError } from './config'

// 用户注册
export const register = async (userData) => {
  try {
    const response = await uni.request({
      url: `${BASE_URL}/auth/register`,
      method: 'POST',
      header: createHeaders(),
      data: userData
    })
    return handleResponse(response[1])
  } catch (error) {
    return handleError(error)
  }
}

// 用户登录
export const login = async (credentials) => {
  try {
    const response = await uni.request({
      url: `${BASE_URL}/auth/login`,
      method: 'POST',
      header: createHeaders(),
      data: credentials
    })
    const data = await handleResponse(response[1])
    
    // 保存token
    if (data.data.token) {
      uni.setStorageSync('token', data.data.token)
    }
    
    return data
  } catch (error) {
    return handleError(error)
  }
} 
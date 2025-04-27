import { BASE_URL, createHeaders, handleResponse, handleError } from './config'

// 获取用户信息
export const getUserInfo = async () => {
  try {
    const response = await uni.request({
      url: `${BASE_URL}/user/`,
      method: 'GET',
      header: createHeaders()
    })
    return handleResponse(response)
  } catch (error) {
    return handleError(error)
  }
}

// 更新用户信息
export const updateUserInfo = async (userInfo) => {
  try {
    const response = await uni.request({
      url: `${BASE_URL}/user/`,
      method: 'PUT',
      header: createHeaders(),
      data: userInfo
    })
    return handleResponse(response)
  } catch (error) {
    return handleError(error)
  }
}

// 上传用户头像
export const uploadAvatar = async (filePath) => {
  try {
    const response = await uni.uploadFile({
      url: `${BASE_URL}/user/avatar/`,
      filePath: filePath,
      name: 'avatar',
      header: createHeaders(true)
    })
    return handleResponse(response)
  } catch (error) {
    return handleError(error)
  }
} 
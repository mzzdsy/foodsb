import { BASE_URL, createHeaders, handleResponse, handleError } from './config'

// 食物图片识别
export const recognizeFood = async (filePath) => {
  try {
    const response = await uni.uploadFile({
      url: `${BASE_URL}/food/recognize/`,
      filePath: filePath,
      name: 'image',
      header: createHeaders(true)
    })
    return handleResponse(response)
  } catch (error) {
    return handleError(error)
  }
}

// 获取食物营养信息
export const getFoodAnalysis = async (foodName) => {
  try {
    const response = await uni.request({
      url: `${BASE_URL}/food/analysis/`,
      method: 'GET',
      header: createHeaders(),
      data: { foodName }
    })
    return handleResponse(response)
  } catch (error) {
    return handleError(error)
  }
}

// 获取食物推荐列表
export const getFoodRecommendations = async (params = {}) => {
  try {
    const response = await uni.request({
      url: `${BASE_URL}/food/`,
      method: 'GET',
      header: createHeaders(),
      data: params
    })
    return handleResponse(response)
  } catch (error) {
    return handleError(error)
  }
}

// 获取食物分类
export const getFoodCategories = async () => {
  try {
    const response = await uni.request({
      url: `${BASE_URL}/recommendations/categories/`,
      method: 'GET',
      header: createHeaders()
    })
    return handleResponse(response)
  } catch (error) {
    return handleError(error)
  }
} 
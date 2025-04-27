import { BASE_URL, createHeaders, handleResponse, handleError } from './config'

// 发送消息到AI助手
export const sendMessage = async (message, context = []) => {
  try {
    const response = await uni.request({
      url: `${BASE_URL}/ai/chat/`,
      method: 'POST',
      header: createHeaders(),
      data: {
        message,
        context
      }
    })
    return handleResponse(response)
  } catch (error) {
    return handleError(error)
  }
} 
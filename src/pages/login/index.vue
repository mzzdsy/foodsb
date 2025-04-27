<template>
  <view class="login-container">
    <view class="login-card">
      <view class="header">
        <view class="welcome-text">欢迎回来</view>
        <view class="sub-title">请登录您的账号</view>
      </view>
      
      <view class="form-group">
        <view class="input-group">
          <input 
            type="text"
            v-model="formData.username"
            placeholder="请输入账号"
            class="input"
          />
          <uni-icons type="person" size="20" color="#999"></uni-icons>
        </view>
        
        <view class="input-group">
          <input 
            :type="showPassword ? 'text' : 'password'"
            v-model="formData.password"
            placeholder="请输入密码"
            class="input"
          />
          <uni-icons 
            :type="showPassword ? 'eye' : 'eye-slash'"
            size="20"
            color="#999"
            @click="togglePassword"
          ></uni-icons>
        </view>

        <view class="password-options">
          <label class="remember-password">
            <checkbox :checked="rememberPassword" @tap="toggleRememberPassword" color="#9b6bff" />
            <text>记住密码</text>
          </label>
          <text class="forget-password" @click="onForgetPassword">忘记密码？</text>
        </view>
      </view>
      
      <view class="button-group">
        <button class="submit-btn" @click="handleLogin" :disabled="isSubmitting">
          <text>登录</text>
        </button>
        <view class="register-link">
          还没有账号？<text class="link-text" @click="goToRegister">立即注册</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const showPassword = ref(false)
const isSubmitting = ref(false)
const rememberPassword = ref(false)

const formData = reactive({
  username: '',
  password: ''
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleRememberPassword = () => {
  rememberPassword.value = !rememberPassword.value
}

const onForgetPassword = () => {
  uni.showToast({
    title: '忘记密码功能开发中',
    icon: 'none'
  })
}

const handleLogin = () => {
  if (!formData.username) {
    uni.showToast({ title: '请输入用户名', icon: 'none' })
    return
  }
  if (!formData.password) {
    uni.showToast({ title: '请输入密码', icon: 'none' })
    return
  }

  isSubmitting.value = true
  
  // 模拟登录过程
  setTimeout(() => {
    isSubmitting.value = false
    
    // 保存登录状态和token
    uni.setStorageSync('token', 'mock_token_' + Date.now())
    uni.setStorageSync('userInfo', {
      username: formData.username,
      avatar: '',
      isLogin: true
    })

    if (rememberPassword.value) {
      uni.setStorageSync('rememberedUser', {
        username: formData.username,
        password: formData.password
      })
    }

    uni.showToast({
      title: '登录成功',
      icon: 'success'
    })
    
    setTimeout(() => {
      uni.reLaunch({
        url: '/pages/food-recognition/index'
      })
    }, 1500)
  }, 1000)
}

// 检查是否有记住的用户信息
const checkRememberedUser = () => {
  const rememberedUser = uni.getStorageSync('rememberedUser')
  if (rememberedUser) {
    formData.username = rememberedUser.username
    formData.password = rememberedUser.password
    rememberPassword.value = true
  }
}

// 检查是否已登录
const checkLoginStatus = () => {
  const token = uni.getStorageSync('token')
  const userInfo = uni.getStorageSync('userInfo')
  
  if (token && userInfo?.isLogin) {
    uni.reLaunch({
      url: '/pages/food-recognition/index'
    })
  }
}

onMounted(() => {
  checkLoginStatus()
  checkRememberedUser()
})

const goToRegister = () => {
  uni.navigateTo({
    url: '/pages/register/index'
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #9b6bff 0%, #6b4fff 100%);
  padding: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: 100%;
  max-width: 650rpx;
  background: #fff;
  border-radius: 24rpx;
  padding: 60rpx 40rpx;
  box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.1);
}

.header {
  text-align: center;
  margin-bottom: 60rpx;
  
  .welcome-text {
    font-size: 48rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 16rpx;
  }
  
  .sub-title {
    font-size: 28rpx;
    color: #666;
  }
}

.form-group {
  margin-bottom: 40rpx;
}

.input-group {
  position: relative;
  margin-bottom: 30rpx;
  
  .input {
    width: 80%;
    height: 90rpx;
    background: #f8f8f8;
    border: none;
    border-radius: 12rpx;
    padding: 0 88rpx 0 32rpx;
    font-size: 28rpx;
    color: #333;
    
    &:focus {
      background: #f0f0f0;
    }
    
    &::placeholder {
      color: #999;
    }
  }
  
  .uni-icons {
    position: absolute;
    right: 32rpx;
    top: 50%;
    transform: translateY(-50%);
  }
}

.password-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10rpx;
  
  .remember-password {
    display: flex;
    align-items: center;
    font-size: 26rpx;
    color: #666;
    
    text {
      margin-left: 8rpx;
    }
  }
  
  .forget-password {
    font-size: 26rpx;
    color: #9b6bff;
  }
}

.button-group {
  margin-top: 60rpx;

  .submit-btn {
    width: 100%;
    height: 90rpx;
    background: #9b6bff;
    border-radius: 12rpx;
    color: #fff;
    font-size: 32rpx;
    font-weight: 600;
    border: none;
    margin-bottom: 30rpx;
    
    &:active {
      opacity: 0.9;
    }
    
    &:disabled {
      opacity: 0.7;
      background: #ccc;
    }
  }
}

.register-link {
  text-align: center;
  font-size: 26rpx;
  color: #666;
  
  .link-text {
    color: #9b6bff;
    margin-left: 4rpx;
  }
}
</style> 
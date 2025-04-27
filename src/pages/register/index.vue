<template>
  <view class="register-container">
    <view class="register-card">
      <view class="header">
        <view class="title">账号注册</view>
        <view class="sub-title">创建一个新账号</view>
      </view>
      
      <view class="form-group">
        <view class="input-group">
          <input 
            type="text"
            v-model="formData.username"
            placeholder="请输入账号"
            class="input"
          />
          <uni-icons type="person" size="20" color="#666"></uni-icons>
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
            color="#666"
            @click="togglePassword"
          ></uni-icons>
        </view>

        <view class="input-group">
          <input 
            :type="showConfirmPassword ? 'text' : 'password'"
            v-model="formData.confirmPassword"
            placeholder="请确认密码"
            class="input"
          />
          <uni-icons 
            :type="showConfirmPassword ? 'eye' : 'eye-slash'"
            size="20"
            color="#666"
            @click="toggleConfirmPassword"
          ></uni-icons>
        </view>

        <view class="input-group">
          <input 
            type="text"
            v-model="formData.captcha"
            placeholder="请输入验证码"
            class="input"
          />
          <text class="captcha-text">ruhr</text>
        </view>
      </view>
      
      <view class="button-group">
        <button class="submit-btn" @click="handleRegister" :disabled="isSubmitting">
          注册
        </button>
      </view>

      <view class="login-link">
        已有账号？<text class="link-text" @click="goToLogin">立即登录</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isSubmitting = ref(false)
const captchaUrl = ref('https://picsum.photos/120/50') // 临时使用随机图片作为验证码示例

const formData = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  captcha: ''
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const refreshCaptcha = () => {
  // 模拟刷新验证码
  captchaUrl.value = `https://picsum.photos/120/50?t=${Date.now()}`
}

const handleRegister = () => {
  if (!formData.username) {
    uni.showToast({ title: '请输入用户名', icon: 'none' })
    return
  }
  if (!formData.password) {
    uni.showToast({ title: '请输入密码', icon: 'none' })
    return
  }
  if (!formData.confirmPassword) {
    uni.showToast({ title: '请确认密码', icon: 'none' })
    return
  }
  if (formData.password !== formData.confirmPassword) {
    uni.showToast({ title: '两次输入的密码不一致', icon: 'none' })
    return
  }
  if (!formData.captcha) {
    uni.showToast({ title: '请输入验证码', icon: 'none' })
    return
  }

  isSubmitting.value = true
  
  // 模拟注册过程
  setTimeout(() => {
    isSubmitting.value = false
    uni.showToast({
      title: '注册成功',
      icon: 'success'
    })
    
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }, 1000)
}

const goToLogin = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.register-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #9b6bff 0%, #6b4fff 100%);
  padding: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register-card {
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
  
  .title {
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
  display: flex;
  justify-content: center;
  align-items: center;
  
  .input {
    width: 80%;
    height: 90rpx;
    background: #f8f8f8;
    border: none;
    border-radius: 12rpx;
    padding: 0 120rpx 0 32rpx;
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
    right: 15%;
    top: 50%;
    transform: translateY(-50%);
  }

  .captcha-text {
    position: absolute;
    right: calc(15% + 32rpx);
    font-size: 28rpx;
    color: #666;
    font-family: monospace;
    letter-spacing: 2rpx;
  }
}

.button-group {
  margin-top: 60rpx;

  .submit-btn {
    width: 80%;
    height: 90rpx;
    background: #9b6bff;
    border-radius: 12rpx;
    color: #fff;
    font-size: 32rpx;
    font-weight: 600;
    border: none;
    margin: 0 auto;
    
    &:active {
      opacity: 0.9;
    }
    
    &:disabled {
      opacity: 0.7;
      background: #ccc;
    }
  }
}

.login-link {
  margin-top: 30rpx;
  text-align: center;
  font-size: 26rpx;
  color: #666;
  
  .link-text {
    color: #9b6bff;
    margin-left: 4rpx;
  }
}
</style> 
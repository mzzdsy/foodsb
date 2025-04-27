<template>
  <view class="userinfo-container">
    <view class="userinfo-card">
      <view class="welcome-text">填写用户信息</view>
      <view class="sub-title">请完善您的个人信息</view>

      <view class="avatar-section">
        <view class="avatar-wrapper" @click="chooseAvatar">
          <image 
            v-if="formData.avatar" 
            :src="formData.avatar" 
            class="avatar-image"
            mode="aspectFill"
          />
          <view v-else class="avatar-placeholder">
            <uni-icons type="person" size="40" color="#999"></uni-icons>
          </view>
          <view class="avatar-text">点击上传头像</view>
        </view>
      </view>
      
      <view class="form-group">
        <view class="form-item">
          <text class="label">用户名：</text>
          <input 
            type="text" 
            v-model="formData.username" 
            placeholder="请输入用户名"
            class="input"
          />
        </view>

        <view class="form-item">
          <text class="label">性别：</text>
          <view class="radio-group">
            <label class="radio-item">
              <radio 
                value="male" 
                :checked="formData.gender === 'male'"
                @click="formData.gender = 'male'"
                color="#9b6bff"
              />
              <text>男</text>
            </label>
            <label class="radio-item">
              <radio 
                value="female" 
                :checked="formData.gender === 'female'"
                @click="formData.gender = 'female'"
                color="#9b6bff"
              />
              <text>女</text>
            </label>
          </view>
        </view>

        <view class="form-item">
          <text class="label">年龄：</text>
          <input 
            type="number" 
            v-model="formData.age" 
            placeholder="请输入年龄"
            class="input"
            maxlength="3"
          />
        </view>

        <view class="form-item">
          <text class="label">身高(cm)：</text>
          <input 
            type="digit" 
            v-model="formData.height" 
            placeholder="请输入身高"
            class="input"
            maxlength="5"
          />
        </view>

        <view class="form-item">
          <text class="label">体重(kg)：</text>
          <input 
            type="digit" 
            v-model="formData.weight" 
            placeholder="请输入体重"
            class="input"
            maxlength="5"
          />
        </view>

        <view class="form-item">
          <text class="label">BMI：</text>
          <text v-if="bmi" class="bmi-value" @click="showBMIDetail">{{ bmi }} ({{ bmiCategory.label }})</text>
          <text v-else class="bmi-placeholder">请输入身高和体重</text>
          <button v-if="bmi" class="bmi-detail-btn" @click="showBMIDetail">查看详情</button>
        </view>

        <view class="form-item">
          <text class="label">过敏源：</text>
          <input 
            type="text" 
            v-model="formData.allergies" 
            placeholder="请输入过敏食物（选填）"
            class="input"
          />
        </view>
      </view>

      <view class="button-group">
        <button class="submit-btn" @click="submitForm">
          填写完成
        </button>
        <button class="back-btn" @click="goBack">
          返回登录
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const formData = ref({
  avatar: '',
  username: '',
  gender: '男',
  age: '',
  height: '',
  weight: '',
  allergies: []
})

const bmi = computed(() => {
  if (!formData.value.height || !formData.value.weight) return null
  const heightInMeters = formData.value.height / 100
  return Number((formData.value.weight / (heightInMeters * heightInMeters)).toFixed(1))
})

const bmiCategory = computed(() => {
  if (!bmi.value) return { label: '', className: '' }
  
  if (bmi.value < 18.5) {
    return { label: '偏瘦', className: 'underweight' }
  } else if (bmi.value < 24.9) {
    return { label: '正常', className: 'normal' }
  } else if (bmi.value < 29.9) {
    return { label: '偏胖', className: 'overweight' }
  } else {
    return { label: '肥胖', className: 'obese' }
  }
})

// 选择头像
const chooseAvatar = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      formData.value.avatar = res.tempFilePaths[0]
    }
  })
}

// 查看BMI详情
const showBMIDetail = () => {
  if (!bmi.value) return
  uni.navigateTo({
    url: `/pages/bmi-detail/index?bmi=${bmi.value}&category=${bmiCategory.value.className}`
  })
}

// 返回登录页面
const goBack = () => {
  uni.navigateBack()
}

// 提交表单
const submitForm = () => {
  // 表单验证
  if (!formData.value.username) {
    uni.showToast({
      title: '请输入用户名',
      icon: 'none'
    })
    return
  }
  if (!formData.value.age) {
    uni.showToast({
      title: '请输入年龄',
      icon: 'none'
    })
    return
  }
  if (!formData.value.height) {
    uni.showToast({
      title: '请输入身高',
      icon: 'none'
    })
    return
  }
  if (!formData.value.weight) {
    uni.showToast({
      title: '请输入体重',
      icon: 'none'
    })
    return
  }

  // 模拟提交
  uni.showLoading({
    title: '保存中...'
  })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({
      title: '保存成功',
      icon: 'success'
    })
    // 返回上一页
    uni.navigateBack()
  }, 1000)
}
</script>

<style lang="scss" scoped>
.userinfo-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #9b6bff 0%, #6b4fff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
}

.userinfo-card {
  width: 100%;
  max-width: 600rpx;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 32rpx;
  padding: 40rpx 30rpx;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  margin: 20rpx;
}

.welcome-text {
  font-size: 40rpx;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 16rpx;
}

.sub-title {
  font-size: 26rpx;
  color: #666;
  text-align: center;
  margin-bottom: 40rpx;
}

.avatar-section {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  .avatar-wrapper {
    width: 160rpx;
    text-align: center;
    
    .avatar-image {
      width: 160rpx;
      height: 160rpx;
      border-radius: 80rpx;
      background: #f8f8f8;
      margin-bottom: 10rpx;
    }
    
    .avatar-placeholder {
      width: 160rpx;
      height: 160rpx;
      border-radius: 80rpx;
      background: #f8f8f8;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10rpx;
    }
    
    .avatar-text {
      font-size: 24rpx;
      color: #999;
    }
  }
}

.form-group {
  margin-bottom: 30px;
}

.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
  
  .label {
    width: 140rpx;
    font-size: 26rpx;
    color: #333;
  }
  
  .input {
    flex: 1;
    height: 72rpx;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 36rpx;
    padding: 0 30rpx;
    font-size: 26rpx;
    
    &:focus {
      border-color: #9b6bff;
      background: #fff;
    }
  }

  .bmi-value {
    flex: 1;
    height: 80rpx;
    line-height: 80rpx;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 0 20rpx;
    font-size: 28rpx;
    color: #9b6bff;
    font-weight: bold;
    cursor: pointer;
    margin-right: 20rpx;

    &:active {
      background: #f0f0f0;
    }
  }

  .bmi-placeholder {
    flex: 1;
    height: 80rpx;
    line-height: 80rpx;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 0 20rpx;
    font-size: 28rpx;
    color: #999;
  }
  
  .radio-group {
    flex: 1;
    display: flex;
    gap: 40rpx;
    
    .radio-item {
      display: flex;
      align-items: center;
      font-size: 28rpx;
      color: #333;
      
      radio {
        transform: scale(0.8);
        margin-right: 4rpx;
      }
    }
  }
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.submit-btn {
  width: 100%;
  height: 80rpx;
  background: linear-gradient(135deg, #9b6bff 0%, #6b4fff 100%);
  border-radius: 40rpx;
  color: #fff;
  font-size: 28rpx;
  border: none;
  margin-top: 20rpx;
  
  &:active {
    opacity: 0.9;
  }
}

.back-btn {
  width: 100%;
  height: 80rpx;
  background: #f8f8f8;
  border-radius: 40rpx;
  color: #666;
  font-size: 28rpx;
  border: 1px solid #eee;
  margin-top: 20rpx;
  
  &:active {
    background: #f0f0f0;
  }
}

.bmi-detail-btn {
  width: 180rpx;
  height: 80rpx;
  background: #9b6bff;
  border-radius: 8px;
  color: #fff;
  font-size: 28rpx;
  border: none;
  
  &:active {
    opacity: 0.9;
  }
}
</style> 
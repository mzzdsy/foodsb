<template>
  <view class="food-container">
    <view class="food-card">
      <view class="welcome-text">美食识别</view>
      <view class="sub-title">拍照或上传图片识别美食</view>

      <view class="upload-section">
        <view class="preview-area" @click="chooseImage" v-if="!imageUrl">
          <uni-icons type="camera-filled" size="40" color="#999"></uni-icons>
          <text class="upload-text">点击拍照</text>
        </view>
        <image 
          v-else 
          :src="imageUrl" 
          mode="aspectFill" 
          class="preview-image"
          @click="previewImage"
        ></image>
      </view>

      <view class="button-group">
        <button 
          class="action-btn camera-btn" 
          @click="takePhoto"
        >
          <uni-icons type="camera" size="18"></uni-icons>
          拍照识别
        </button>
        <button 
          class="action-btn upload-btn" 
          @click="chooseImage"
        >
          <uni-icons type="upload" size="18"></uni-icons>
          上传图片
        </button>
      </view>

      <view class="result-section" v-if="recognitionResult">
        <view class="result-title">识别结果</view>
        <view class="result-content">
          <view 
            class="result-item" 
            v-for="(item, index) in recognitionResult" 
            :key="index"
            @click="goToAnalysis(item)"
          >
            <text class="food-name">{{item.name}}</text>
            <view class="right-section">
              <text class="confidence">{{(item.confidence * 100).toFixed(1)}}%</text>
              <uni-icons type="right" size="16" color="#9b6bff"></uni-icons>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { checkLogin } from '@/utils/auth'

const imageUrl = ref('')
const recognitionResult = ref(null)
const isLoading = ref(false)

// 选择图片
const chooseImage = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      imageUrl.value = res.tempFilePaths[0]
      // 选择图片后自动开始识别
      startRecognition()
    }
  })
}

// 拍照
const takePhoto = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['camera'],
    success: (res) => {
      imageUrl.value = res.tempFilePaths[0]
      // 拍照后自动开始识别
      startRecognition()
    }
  })
}

// 预览图片
const previewImage = () => {
  if (imageUrl.value) {
    uni.previewImage({
      urls: [imageUrl.value]
    })
  }
}

// 开始识别
const startRecognition = () => {
  isLoading.value = true
  
  // 模拟识别过程
  setTimeout(() => {
    recognitionResult.value = [
      { name: '红烧肉', confidence: 0.95, image: imageUrl.value },
      { name: '糖醋排骨', confidence: 0.85, image: imageUrl.value },
      { name: '清炒青菜', confidence: 0.75, image: imageUrl.value }
    ]
    isLoading.value = false
  }, 1000)
}

// 跳转到分析页面
const goToAnalysis = (item) => {
  uni.navigateTo({
    url: `/pages/food-analysis/index?name=${item.name}&image=${encodeURIComponent(imageUrl.value)}`
  })
}

// 页面加载时检查登录状态
onMounted(() => {
  checkLogin()
})
</script>

<style lang="scss" scoped>
.food-container {
  min-height: calc(100vh - 10vh);
  background: linear-gradient(135deg, #9b6bff 0%, #6b4fff 100%);
  padding: 5vh 5vw;
  padding-bottom: calc(5vh + 10vh);
  display: flex;
  align-items: center;
  justify-content: center;
}

.food-card {
  width: 100%;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 3vw;
  padding: 5vh 4vw;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

.welcome-text {
  font-size: clamp(18px, 5vw, 28px);
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 2vh;
}

.sub-title {
  font-size: clamp(14px, 3vw, 16px);
  color: #666;
  text-align: center;
  margin-bottom: 5vh;
}

.upload-section {
  margin-bottom: 4vh;
  
  .preview-area {
    width: 100%;
    height: 40vh;
    max-height: 400px;
    background: #f8f8f8;
    border: 2px dashed #ddd;
    border-radius: 3vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .upload-text {
      margin-top: 2vh;
      font-size: clamp(14px, 3vw, 16px);
      color: #999;
    }
  }

  .preview-image {
    width: 100%;
    height: 40vh;
    max-height: 400px;
    border-radius: 3vw;
    object-fit: cover;
  }
}

.button-group {
  display: flex;
  gap: 2vw;
  margin-bottom: 4vh;

  .action-btn {
    flex: 1;
    height: 44px;
    border-radius: 22px;
    font-size: clamp(14px, 3vw, 16px);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1vw;
    border: none;
    color: #fff;

    &.camera-btn {
      background: linear-gradient(135deg, #9b6bff 0%, #6b4fff 100%);
    }

    &.upload-btn {
      background: linear-gradient(135deg, #6b4fff 0%, #4b2fff 100%);
    }

    &:active {
      opacity: 0.9;
    }
  }
}

.result-section {
  background: #f8f8f8;
  border-radius: 3vw;
  padding: 3vh 4vw;

  .result-title {
    font-size: clamp(16px, 3.5vw, 20px);
    font-weight: 600;
    color: #333;
    margin-bottom: 2vh;
  }

  .result-content {
    .result-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2vh;
      border-bottom: 1px solid #eee;
      cursor: pointer;

      &:last-child {
        border-bottom: none;
      }

      &:active {
        background: #f0f0f0;
      }

      .food-name {
        font-size: clamp(14px, 3vw, 16px);
        color: #333;
      }

      .right-section {
        display: flex;
        align-items: center;
        gap: 1vw;

        .confidence {
          font-size: clamp(12px, 2.8vw, 14px);
          color: #666;
        }
      }
    }
  }
}
</style> 
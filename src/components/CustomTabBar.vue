<template>
  <view class="custom-tab-bar">
    <view 
      v-for="(item, index) in tabs" 
      :key="index"
      class="tab-item"
      :class="{ active: currentPath === item.pagePath }"
      @click="switchTab(item.pagePath)"
    >
      <uni-icons
        :type="currentPath === item.pagePath ? item.selectedIcon : item.icon"
        :color="currentPath === item.pagePath ? '#9b6bff' : '#999999'"
        size="24"
      ></uni-icons>
      <text class="tab-text">{{ item.text }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentPath = ref('')
const tabs = [
  {
    pagePath: '/pages/food-recognition/index',
    text: '美食识别',
    icon: 'camera',
    selectedIcon: 'camera-filled'
  },
  {
    pagePath: '/pages/ai-assistant/index',
    text: 'AI助手',
    icon: 'chat',
    selectedIcon: 'chat-filled'
  },
  {
    pagePath: '/pages/recommendations/index',
    text: '推荐',
    icon: 'star',
    selectedIcon: 'star-filled'
  },
  {
    pagePath: '/pages/profile/index',
    text: '我的',
    icon: 'person',
    selectedIcon: 'person-filled'
  }
]

const switchTab = (path) => {
  uni.switchTab({
    url: path
  })
}

onMounted(() => {
  const pages = getCurrentPages()
  if (pages.length > 0) {
    const currentPage = pages[pages.length - 1]
    currentPath.value = '/' + currentPage.route
  }
})
</script>

<style lang="scss" scoped>
.custom-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background: #ffffff;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10rpx 0;
  
  .tab-text {
    font-size: 24rpx;
    color: #999999;
    margin-top: 4rpx;
  }
  
  &.active {
    .tab-text {
      color: #9b6bff;
    }
  }
}
</style> 
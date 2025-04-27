<template>
  <view class="tab-bar">
    <view 
      v-for="(item, index) in tabItems" 
      :key="index"
      class="tab-item"
      :class="{ active: currentTab === index }"
      @click="switchTab(index)"
    >
      <uni-icons 
        :type="currentTab === index ? item.selectedIcon : item.icon"
        size="24"
        :color="currentTab === index ? '#9b6bff' : '#999'"
      />
      <text class="tab-text" :class="{ active: currentTab === index }">{{ item.text }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentTab = ref(0);

const tabItems = [
  {
    text: '美食识别',
    icon: 'camera',
    selectedIcon: 'camera-filled',
    path: '/pages/food-recognition/index'
  },
  {
    text: 'AI助手',
    icon: 'chat',
    selectedIcon: 'chat-filled',
    path: '/pages/ai-assistant/index'
  },
  {
    text: '推荐',
    icon: 'star',
    selectedIcon: 'star-filled',
    path: '/pages/recommendations/index'
  },
  {
    text: '我的',
    icon: 'person',
    selectedIcon: 'person-filled',
    path: '/pages/profile/index'
  }
];

const switchTab = (index) => {
  if (currentTab.value === index) return;
  currentTab.value = index;
  uni.switchTab({
    url: tabItems[index].path
  });
};

// 根据当前页面路径设置选中状态
const initCurrentTab = () => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const currentPath = '/' + currentPage.route;
  
  const index = tabItems.findIndex(item => item.path === currentPath);
  if (index !== -1) {
    currentTab.value = index;
  }
};

onMounted(() => {
  initCurrentTab();
});
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background: rgba(255, 255, 255, 0.98);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10rpx 0;
  transition: all 0.3s ease;
  
  &.active {
    transform: translateY(-4rpx);
  }
}

.tab-text {
  font-size: 24rpx;
  color: #999;
  margin-top: 4rpx;
  
  &.active {
    color: #9b6bff;
  }
}
</style> 
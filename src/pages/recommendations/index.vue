<template>
  <view class="recommendations-container">
    <!-- 顶部标题栏 -->
    <view class="header">
      <text class="title">推荐</text>
    </view>

    <!-- 搜索栏 -->
    <view class="search-bar">
      <uni-icons type="search" size="20" color="#666"></uni-icons>
      <input 
        type="text" 
        class="search-input"
        v-model="searchText"
        placeholder="搜索食物或健康建议"
      />
    </view>

    <!-- 内容区域 -->
    <scroll-view class="content-container" scroll-y="true">
      <!-- 分类标签 -->
      <view class="category-tabs">
        <view 
          v-for="(tab, index) in categories" 
          :key="index"
          :class="['category-tab', { active: currentCategory === tab.id }]"
          @click="currentCategory = tab.id"
        >
          {{ tab.name }}
        </view>
      </view>

      <!-- 推荐列表 -->
      <view class="recommendation-list">
        <view 
          v-for="(item, index) in filteredRecommendations" 
          :key="index"
          class="recommendation-card"
          @click="showDetail(item)"
        >
          <image :src="item.image" mode="aspectFill" class="card-image" />
          <view class="card-content">
            <text class="card-title">{{ item.title }}</text>
            <text class="card-desc">{{ item.description }}</text>
            <view class="card-footer">
              <text class="card-tag">{{ item.category }}</text>
              <text class="card-calories">{{ item.calories }}卡路里</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { checkLogin } from '@/utils/auth';

const searchText = ref('');
const currentCategory = ref('all');

const categories = [
  { id: 'all', name: '全部' },
  { id: 'breakfast', name: '早餐' },
  { id: 'lunch', name: '午餐' },
  { id: 'dinner', name: '晚餐' },
  { id: 'snacks', name: '小食' }
];

const recommendations = [
  {
    id: 1,
    title: '健康早餐套餐',
    description: '营养均衡的早餐搭配，为一天提供充足能量',
    image: '/static/food1.jpg',
    category: '早餐',
    calories: 350
  },
  {
    id: 2,
    title: '轻食沙拉',
    description: '新鲜蔬菜配以健康的蛋白质，低脂美味',
    image: '/static/food2.jpg',
    category: '午餐',
    calories: 280
  },
  // 更多推荐项...
];

const filteredRecommendations = computed(() => {
  let filtered = recommendations;
  
  // 分类筛选
  if (currentCategory.value !== 'all') {
    filtered = filtered.filter(item => {
      const categoryMap = {
        breakfast: '早餐',
        lunch: '午餐',
        dinner: '晚餐',
        snacks: '小食'
      };
      return item.category === categoryMap[currentCategory.value];
    });
  }
  
  // 搜索筛选
  if (searchText.value) {
    const searchLower = searchText.value.toLowerCase();
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower)
    );
  }
  
  return filtered;
});

const showDetail = (item) => {
  uni.navigateTo({
    url: `/pages/food-detail/index?id=${item.id}`
  });
};

// 页面加载时检查登录状态
onMounted(() => {
  checkLogin()
})
</script>

<style lang="scss" scoped>
.recommendations-container {
  min-height: calc(100vh - 100rpx);
  background: #f5f5f5;
  padding-bottom: 100rpx;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, #9b6bff 0%, #6b4fff 100%);
  padding: 40rpx 32rpx;
  margin: 0;
  text-align: center;

  .title {
    color: #fff;
    font-size: 36rpx;
    font-weight: 500;
    margin-top: 20rpx;
  }
}

.search-bar {
  margin: -20rpx 20rpx 20rpx;
  padding: 0 30rpx;
  height: 80rpx;
  background: #fff;
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  z-index: 1;
  position: relative;
}

.category-tabs {
  padding: 20rpx;
  display: flex;
  overflow-x: auto;
  white-space: nowrap;

  .category-tab {
    padding: 12rpx 32rpx;
    margin-right: 16rpx;
    background: #fff;
    border-radius: 32rpx;
    font-size: 28rpx;
    color: #666;
    
    &.active {
      background: #9b6bff;
      color: #fff;
    }
  }
}

.recommendation-list {
  padding: 20rpx;
}

.recommendation-card {
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .card-image {
    width: 100%;
    height: 300rpx;
  }

  .card-content {
    padding: 20rpx;

    .card-title {
      font-size: 32rpx;
      font-weight: 500;
      color: #333;
      margin-bottom: 8rpx;
    }

    .card-desc {
      font-size: 26rpx;
      color: #666;
      margin-bottom: 16rpx;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .card-tag {
        font-size: 24rpx;
        color: #9b6bff;
        background: rgba(155, 107, 255, 0.1);
        padding: 4rpx 16rpx;
        border-radius: 20rpx;
      }

      .card-calories {
        font-size: 24rpx;
        color: #999;
      }
    }
  }
}
</style> 
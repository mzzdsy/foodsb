<template>
  <view class="analysis-container">
    <view class="analysis-card">
      <!-- 顶部标题 -->
      <view class="header">
        <view @click="goBack" class="back-btn">
          <uni-icons type="left" size="20" color="#666"></uni-icons>
          <text>返回</text>
        </view>
        <text class="title">营养成分表</text>
      </view>

      <!-- 食物基本信息 -->
      <view class="food-info">
        <image class="food-image" :src="foodData.image" mode="aspectFill"></image>
        <text class="food-name">{{ foodData.name }}</text>
      </view>

      <!-- 营养成分表格 -->
      <view class="nutrition-table">
        <view class="table-header">
          <text class="th">营养成分</text>
          <text class="th">含量</text>
          <text class="th">每100克</text>
          <text class="th">热量(千卡)</text>
        </view>
        <view 
          v-for="(item, index) in foodData.nutrition" 
          :key="index"
          class="table-row"
        >
          <text class="td">{{ item.name }}</text>
          <text class="td">{{ item.amount }}{{ item.unit }}</text>
          <text class="td">{{ item.per100g }}</text>
          <text class="td">{{ item.calories }}</text>
        </view>
        <view class="table-footer">
          <text class="total-label">总热量</text>
          <text class="total-value">{{ foodData.totalCalories }}千卡</text>
        </view>
      </view>

      <!-- 健康建议 -->
      <view class="health-advice">
        <view class="advice-header">
          <uni-icons type="info" size="20" color="#9b6bff"></uni-icons>
          <text>健康建议</text>
        </view>
        <view class="advice-content">
          <text class="advice-text">{{ foodData.healthAdvice }}</text>
          <view v-if="foodData.bmiWarning" class="bmi-warning">
            <uni-icons type="warning" size="16" color="#ff4d4f"></uni-icons>
            <text>{{ foodData.bmiWarning }}</text>
          </view>
        </view>
      </view>

      <!-- 返回首页按钮 -->
      <button class="home-btn" @click="goToHome">
        <uni-icons type="home" size="16" color="#fff"></uni-icons>
        <text>返回首页</text>
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 模拟食物数据
const foodData = ref({
  name: '红烧肉',
  image: '/static/food-sample.jpg',
  nutrition: [
    { name: '五花肉', amount: '300', unit: 'g', per100g: '327', calories: '1704' },
    { name: '糖', amount: '30', unit: 'g', per100g: '0', calories: '120' },
    { name: '水发海带', amount: '100', unit: 'g', per100g: '0', calories: '8' },
    { name: '百叶结', amount: '50', unit: 'g', per100g: '0', calories: '130' },
    { name: '香鲍菇', amount: '50', unit: 'g', per100g: '0', calories: '12' }
  ],
  totalCalories: 1824,
  healthAdvice: '这道菜的热量较高，主要来自于五花肉的脂肪含量。建议搭配蔬菜食用，控制食用量。',
  bmiWarning: '您的BMI过高，不适合食用此类高热量食物'
});

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};

// 返回首页
const goToHome = () => {
  uni.switchTab({
    url: '/pages/food-recognition/index'
  });
};
</script>

<style lang="scss" scoped>
.analysis-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #9b6bff 0%, #6b4fff 100%);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.analysis-card {
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  position: relative;

  .back-btn {
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    font-size: 28rpx;
    color: #666;
    padding: 4px 8px;
    border-radius: 4px;

    &:active {
      background: #f0f0f0;
    }
  }

  .title {
    flex: 1;
    text-align: center;
    font-size: 36rpx;
    font-weight: 600;
    color: #333;
  }
}

.food-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;

  .food-image {
    width: 200rpx;
    height: 200rpx;
    border-radius: 100rpx;
    margin-bottom: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .food-name {
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
  }
}

.nutrition-table {
  background: #f8f8f8;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;

  .table-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 8px;
    padding-bottom: 12px;
    border-bottom: 1px solid #eee;

    .th {
      font-size: 24rpx;
      color: #666;
      font-weight: 500;
    }
  }

  .table-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 8px;
    padding: 12px 0;
    border-bottom: 1px solid #eee;

    .td {
      font-size: 26rpx;
      color: #333;
    }
  }

  .table-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;

    .total-label {
      font-size: 28rpx;
      font-weight: 500;
      color: #333;
    }

    .total-value {
      font-size: 32rpx;
      font-weight: 600;
      color: #9b6bff;
    }
  }
}

.health-advice {
  background: #f8f8f8;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;

  .advice-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    font-size: 28rpx;
    font-weight: 500;
    color: #333;
  }

  .advice-content {
    .advice-text {
      font-size: 26rpx;
      color: #666;
      line-height: 1.5;
    }

    .bmi-warning {
      margin-top: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: #fff2f0;
      border-radius: 6px;

      text {
        font-size: 24rpx;
        color: #ff4d4f;
      }
    }
  }
}

.home-btn {
  width: 100%;
  height: 88rpx;
  background: linear-gradient(135deg, #9b6bff 0%, #6b4fff 100%);
  border-radius: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #fff;
  font-size: 28rpx;
  border: none;

  &:active {
    opacity: 0.9;
  }
}
</style> 
<template>
  <view class="bmi-detail-container">
    <view class="bmi-card">
      <view class="bmi-title">BMI 详情</view>
      
      <view class="bmi-value-section">
        <view class="bmi-number">{{ bmi.toFixed(1) }}</view>
        <view class="bmi-category" :class="bmiCategory.className">
          {{ bmiCategory.label }}
        </view>
      </view>

      <view class="bmi-scale">
        <view class="scale-bar">
          <view 
            class="scale-indicator" 
            :style="{ left: `${getIndicatorPosition()}%` }"
          ></view>
        </view>
        <view class="scale-labels">
          <text>偏瘦</text>
          <text>正常</text>
          <text>偏胖</text>
          <text>肥胖</text>
        </view>
      </view>

      <view class="bmi-info">
        <view class="info-title">健康建议</view>
        <view class="info-content">
          {{ healthAdvice }}
        </view>
      </view>

      <view class="reference-section">
        <view class="reference-title">BMI 参考范围</view>
        <view class="reference-list">
          <view class="reference-item">
            <text>偏瘦：</text>
            <text>< 18.5</text>
          </view>
          <view class="reference-item">
            <text>正常：</text>
            <text>18.5 - 24.9</text>
          </view>
          <view class="reference-item">
            <text>偏胖：</text>
            <text>25.0 - 29.9</text>
          </view>
          <view class="reference-item">
            <text>肥胖：</text>
            <text>≥ 30.0</text>
          </view>
        </view>
      </view>

      <button class="back-btn" @click="goBack">返回</button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const bmi = ref(0)
const category = ref('')

// 获取路由参数中的BMI值和分类
onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const { bmi: routeBmi, category: routeCategory } = currentPage.$page.options
  bmi.value = Number(routeBmi)
  category.value = routeCategory
})

// 计算BMI分类
const bmiCategory = computed(() => {
  if (!category.value) return { label: '', className: '' }
  
  switch (category.value) {
    case 'underweight':
      return { label: '偏瘦', className: 'underweight' }
    case 'normal':
      return { label: '正常', className: 'normal' }
    case 'overweight':
      return { label: '偏胖', className: 'overweight' }
    case 'obese':
      return { label: '肥胖', className: 'obese' }
    default:
      return { label: '', className: '' }
  }
})

// 计算指示器位置（0-100）
const getIndicatorPosition = () => {
  const value = bmi.value
  if (value < 18.5) {
    return (value / 18.5) * 25
  } else if (value < 25) {
    return 25 + ((value - 18.5) / 6.5) * 25
  } else if (value < 30) {
    return 50 + ((value - 25) / 5) * 25
  } else {
    return Math.min(100, 75 + ((value - 30) / 5) * 25)
  }
}

// 健康建议
const healthAdvice = computed(() => {
  const category = bmiCategory.value.label
  switch (category) {
    case '偏瘦':
      return '建议：\n1. 适当增加饮食摄入量\n2. 注意营养均衡\n3. 进行适度的力量训练\n4. 保持规律作息'
    case '正常':
      return '建议：\n1. 保持当前的健康生活方式\n2. 坚持规律运动\n3. 维持均衡饮食\n4. 定期体检'
    case '偏胖':
      return '建议：\n1. 控制饮食摄入量\n2. 增加有氧运动\n3. 避免高热量食物\n4. 保持作息规律'
    case '肥胖':
      return '建议：\n1. 严格控制饮食\n2. 增加运动强度\n3. 制定减重计划\n4. 必要时寻求专业医生建议'
    default:
      return '暂无建议'
  }
})

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.bmi-detail-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #9b6bff 0%, #6b4fff 100%);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bmi-card {
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.bmi-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 24px;
}

.bmi-value-section {
  text-align: center;
  margin-bottom: 32px;
}

.bmi-number {
  font-size: 48px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.bmi-category {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;

  &.underweight {
    background: #ffd700;
    color: #856404;
  }

  &.normal {
    background: #90EE90;
    color: #155724;
  }

  &.overweight {
    background: #FFA500;
    color: #856404;
  }

  &.obese {
    background: #FF6B6B;
    color: #721c24;
  }
}

.bmi-scale {
  margin-bottom: 32px;
}

.scale-bar {
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  position: relative;
  margin-bottom: 8px;
}

.scale-indicator {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: #9b6bff;
  border-radius: 50%;
  transition: left 0.3s ease;
}

.scale-labels {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}

.bmi-info {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
}

.info-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.info-content {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  white-space: pre-line;
}

.reference-section {
  margin-bottom: 24px;
}

.reference-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.reference-list {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
}

.reference-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
}

.back-btn {
  width: 100%;
  height: 44px;
  background: #9b6bff;
  color: #fff;
  border: none;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 500;

  &:active {
    background: #8a5ae6;
  }
}
</style> 
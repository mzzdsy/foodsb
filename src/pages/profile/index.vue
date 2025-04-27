<template>
  <view class="profile-container">
    <!-- 顶部用户信息卡片 -->
    <view class="user-card">
      <view class="user-info">
        <image class="avatar" :src="userInfo.avatar || '/static/default-avatar.png'" mode="aspectFill" />
        <view class="user-details">
          <text class="user-name">{{ userInfo.username || '未登录' }}</text>
          <view class="edit-profile" @click="goToUserInfo">
            <text class="edit-text">编辑个人资料</text>
            <uni-icons type="right" size="14" color="#fff"></uni-icons>
          </view>
        </view>
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="feature-list">
      <view class="feature-item" @click="navigateTo('/pages/injury-records/index')">
        <view class="feature-left">
          <uni-icons type="image" size="22" color="#9b6bff"></uni-icons>
          <text class="feature-text">修改背景</text>
        </view>
        <uni-icons type="right" size="16" color="#999"></uni-icons>
      </view>
      <view class="feature-item" @click="navigateTo('/pages/search-history/index')">
        <view class="feature-left">
          <uni-icons type="search" size="22" color="#9b6bff"></uni-icons>
          <text class="feature-text">搜索记录</text>
        </view>
        <uni-icons type="right" size="16" color="#999"></uni-icons>
      </view>
      <view class="feature-item" @click="navigateTo('/pages/help-center/index')">
        <view class="feature-left">
          <uni-icons type="help" size="22" color="#9b6bff"></uni-icons>
          <text class="feature-text">帮助中心</text>
        </view>
        <uni-icons type="right" size="16" color="#999"></uni-icons>
      </view>
      <view class="feature-item" @click="navigateTo('/pages/feedback/index')">
        <view class="feature-left">
          <uni-icons type="chat" size="22" color="#9b6bff"></uni-icons>
          <text class="feature-text">意见反馈</text>
        </view>
        <uni-icons type="right" size="16" color="#999"></uni-icons>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <button class="logout-btn" @click="handleLogout">退出登录</button>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { checkLogin, getUserInfo, logout } from '@/utils/auth';

const userInfo = ref({
  avatar: '',
  username: ''
});

onMounted(() => {
  checkLogin()
  const info = getUserInfo()
  if (info) {
    userInfo.value = info
  }
})

const navigateTo = (url) => {
  uni.navigateTo({ url });
};

const goToUserInfo = () => {
  uni.navigateTo({
    url: '/pages/user-info/index'
  });
};

const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        logout()
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.profile-container {
  min-height: 100vh;
  background: #f8f9fc;
  padding-bottom: 15vh;
  max-width: 1200px;
  margin: 0 auto;
}

.user-card {
  background: linear-gradient(135deg, #9b6bff 0%, #6b4fff 100%);
  padding: 15vh 5vw 8vh;
  color: #fff;
  border-bottom-left-radius: 4vw;
  border-bottom-right-radius: 4vw;
  box-shadow: 0 0.4vw 2vw rgba(155, 107, 255, 0.2);

  .user-info {
    display: flex;
    align-items: center;

    .avatar {
      width: 15vw;
      height: 15vw;
      max-width: 120px;
      max-height: 120px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.3);
      margin-right: 4vw;
      box-shadow: 0 0.4vw 1.2vw rgba(0, 0, 0, 0.1);
    }

    .user-details {
      flex: 1;

      .user-name {
        font-size: clamp(16px, 4vw, 24px);
        font-weight: 600;
        margin-bottom: 2vh;
      }

      .edit-profile {
        display: inline-flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.2);
        padding: 1vh 2vw;
        border-radius: 3vw;
        
        .edit-text {
          font-size: clamp(12px, 3vw, 16px);
          margin-right: 1vw;
        }
      }
    }
  }
}

.feature-list {
  margin: 4vh 4vw;
  background: #fff;
  border-radius: 2vw;
  padding: 1vh 0;
  box-shadow: 0 0.4vw 1.6vw rgba(0, 0, 0, 0.05);
}

.feature-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2vh 4vw;
  
  .feature-left {
    display: flex;
    align-items: center;
    
    .feature-text {
      font-size: clamp(14px, 3.5vw, 18px);
      color: #333;
      margin-left: 3vw;
    }
  }

  &:active {
    background: #f8f9fc;
  }
}

.logout-btn {
  width: 90%;
  max-width: 400px;
  height: 44px;
  line-height: 44px;
  background: #fff;
  color: #ff4d4f;
  font-size: clamp(14px, 3.5vw, 18px);
  margin: 6vh auto;
  border-radius: 22px;
  border: none;
  box-shadow: 0 0.4vw 1.6vw rgba(0, 0, 0, 0.05);

  &:active {
    background: #f8f8f8;
    transform: translateY(2px);
  }
}
</style> 
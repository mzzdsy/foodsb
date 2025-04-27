<template>
  <view class="ai-assistant-container">
    <!-- 顶部标题栏 -->
    <view class="header">
      <text class="title">AI 助手</text>
    </view>

    <!-- 聊天内容区域 -->
    <scroll-view 
      class="chat-container" 
      scroll-y="true" 
      :scroll-top="scrollTop"
      :scroll-with-animation="true"
    >
      <view class="chat-list">
        <!-- 欢迎消息 -->
        <view class="message assistant">
          <view class="avatar">AI</view>
          <view class="content">
            <text>你好！我是你的饮食健康助手，有什么我可以帮你的吗？</text>
          </view>
        </view>

        <!-- 消息列表 -->
        <view 
          v-for="(msg, index) in messages" 
          :key="index"
          :class="['message', msg.type]"
        >
          <view class="avatar">{{ msg.type === 'user' ? '我' : 'AI' }}</view>
          <view class="content">
            <text>{{ msg.content }}</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 底部输入区域 -->
    <view class="input-container">
      <input 
        type="text" 
        class="input"
        v-model="inputMessage"
        placeholder="输入你的问题..."
        @confirm="sendMessage"
      />
      <button 
        class="send-btn"
        :disabled="!inputMessage.trim()"
        @click="sendMessage"
      >发送</button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { checkLogin } from '@/utils/auth';

const inputMessage = ref('');
const messages = ref([]);
const scrollTop = ref(0);

// 页面加载时检查登录状态
onMounted(() => {
  checkLogin()
})

const sendMessage = () => {
  if (!inputMessage.value.trim()) return;

  // 添加用户消息
  messages.value.push({
    type: 'user',
    content: inputMessage.value
  });

  // 模拟AI回复
  setTimeout(() => {
    messages.value.push({
      type: 'assistant',
      content: '我理解你的问题，让我来帮你分析一下...'
    });
    
    // 滚动到底部
    scrollToBottom();
  }, 500);

  inputMessage.value = '';
};

const scrollToBottom = () => {
  setTimeout(() => {
    scrollTop.value = 9999999;
  }, 100);
};
</script>

<style lang="scss" scoped>
.ai-assistant-container {
  min-height: calc(100vh - 10vh);
  background: #f5f5f5;
  padding-bottom: calc(10vh + 10vh);
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, #9b6bff 0%, #6b4fff 100%);
  padding: clamp(20px, 5vh, 40px) clamp(16px, 4vw, 32px);
  margin: 0;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .title {
    color: #fff;
    font-size: clamp(18px, 4.5vw, 24px);
    font-weight: 500;
    margin-top: clamp(10px, 2.5vh, 20px);
  }
}

.chat-container {
  flex: 1;
  padding: clamp(10px, 2.5vh, 20px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
  }
}

.chat-list {
  padding-bottom: clamp(10px, 2.5vh, 20px);
}

.message {
  display: flex;
  margin-bottom: clamp(10px, 2.5vh, 20px);
  
  .avatar {
    width: clamp(40px, 10vw, 60px);
    height: clamp(40px, 10vw, 60px);
    border-radius: 50%;
    background: #9b6bff;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(14px, 3.5vw, 18px);
    flex-shrink: 0;
  }

  .content {
    max-width: 70%;
    margin: 0 clamp(10px, 2.5vw, 20px);
    padding: clamp(10px, 2.5vh, 20px);
    border-radius: clamp(6px, 1.5vw, 12px);
    font-size: clamp(14px, 3.5vw, 16px);
    line-height: 1.5;
  }

  &.user {
    flex-direction: row-reverse;

    .avatar {
      background: #6b4fff;
    }

    .content {
      background: #9b6bff;
      color: #fff;
    }
  }

  &.assistant {
    .content {
      background: #fff;
      color: #333;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
  }
}

.input-container {
  position: fixed;
  bottom: 10vh;
  left: 0;
  right: 0;
  padding: clamp(10px, 2.5vh, 20px);
  background: #fff;
  display: flex;
  align-items: center;
  gap: clamp(10px, 2.5vw, 20px);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);

  .input {
    flex: 1;
    height: clamp(40px, 10vh, 50px);
    background: #f5f5f5;
    border-radius: clamp(20px, 5vw, 25px);
    padding: 0 clamp(15px, 3.75vw, 30px);
    font-size: clamp(14px, 3.5vw, 16px);
    border: none;

    &:focus {
      outline: none;
      background: #f0f0f0;
    }
  }

  .send-btn {
    width: clamp(80px, 20vw, 120px);
    height: clamp(40px, 10vh, 50px);
    background: #9b6bff;
    color: #fff;
    border-radius: clamp(20px, 5vw, 25px);
    font-size: clamp(14px, 3.5vw, 16px);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;

    &:active {
      background: #8a5ae6;
    }

    &[disabled] {
      background: #ccc;
      cursor: not-allowed;
    }
  }
}
</style> 
<template>
  <view class="feedback-container">
    <view class="header">
      <image class="header-image" src="@/static/feed.png" mode="widthFix"></image> 
    </view>
    <view class="faq-section">
      <text class="section-title">常见问题</text>
      <view class="question-list">
        <view class="question-item" @click="navigateTo('add - location - card')">
          <text>如何把地点卡片重新加入到其他出行天数里？</text>
        </view>
        <view class="question-item" @click="navigateTo('pack - luggage')">
          <text>如何整理行李清单？</text>
        </view>
        <view class="question-item" @click="navigateTo('report-content')">
          <text>内容举报说明</text>
        </view>
      </view>
      <view class="divider"></view>
    </view>
    <view class="submit-btn-container">
      <button class="submit-btn" @click="navigateToDetail">提交反馈</button>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    navigateToDetail() {
      uni.navigateTo({
        url: '/pages/feedback-detail/feedback-detail'
      });
    },
    navigateTo(pageName) {
      uni.navigateTo({
        url: `/pages/${pageName}/${pageName}`
      });
    }
  }
};
</script>

<style lang="scss">
.feedback-container {
  padding: 40rpx;
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rpx 0;
 .header-image {
    width: 100%;
    max-height: 300rpx; 
    margin-bottom: 10rpx;
  }
 .title {
    font-size: 44rpx;
    font-weight: bold;
    color: #333;
  }
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-title {
  font-size: 36rpx;
  font-weight: 500;
  color: #333;
  display: block;
  margin: 30rpx 0;
}

.subtitle {
  color: #666;
  font-size: 28rpx;
  margin-bottom: 40rpx;
}

.faq-section {
  background: white;
  border-radius: 20rpx;
  padding: 20rpx;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
 .section-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 15rpx;
  }
 .question-list {
    display: flex;
    flex-direction: column;
   .question-item {
      padding: 12rpx 0;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      align-items: center;
      text {
        font-size: 26rpx;
        color: #333;
      }
      &:last-child {
        border-bottom: none;
      }
      &::before {
        content: "";
        width: 20px;
        height: 20px;
        background: url('@/static/207问题.png') no-repeat center;
        background-size: contain;
        margin-right: 15rpx;
      }
    }
  }
 .divider {
    height: 1px;
    background: #e0e0e0;
    margin: 20rpx -20rpx;
  }
}

.submit-btn-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: auto; 
  margin-bottom: 20rpx; 
}

.submit-btn {
  background: linear-gradient(135deg, #6c9aff, #3f51b5);
  color: white;
  border: none;
  border-radius: 50rpx;
  padding: 15rpx 40rpx;
  font-size: 28rpx;
  width: 80%;
  max-width: 300rpx;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #3f51b5, #6c9aff);
}
</style>
<template>
  <view class="report-content-container">
    <view class="report-header">
      <text class="report-title">内容举报说明</text>
    </view>
    <view class="report-main">
      <view class="report-text-section">
        <text class="report-text">　　为了共同营造一个温馨、和谐且健康的网络家园，lotus旅记依据相关法规与政策，已经建立了完善的内容审核与整改机制。</text>
      </view>
      <view class="report-text-section">
        <text class="report-text">　　我们深知每一位用户都希望在这里找到有价值的内容和友好的交流环境，因此，我们特别欢迎并感谢大家积极举报涉及藏色情低俗、暴力恐怖、违禁物品、广告泛滥以及违法违规交流。</text>
      </view>
      <view class="report-text-section">
        <text class="report-text">　　我们特别欢迎并感谢大家积极举报涉及政治敏等不当内容。</text>
      </view>
      <view class="report-contact-section">
        <text class="report-contact">　　你可以点击【提交】按钮进行留言举报。</text>
      </view>
    </view>
    <view class="image-container">
      <image src="@/static/举报.png" mode="widthFix"></image> 
    </view>
  </view>
</template>

<script>
export default {
  // 此处目前无特殊逻辑，可后续按需添加
};
</script>

<style lang="scss">
.report-content-container {
  padding: 20rpx;
  background: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.report-header {
  background-color: #f0f0f0;
  padding: 5rpx; 
  border-bottom: 1px solid #e0e0e0;
}

.report-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
}

.report-main {
  background-color: white;
  padding: 20rpx;
  border-radius: 10rpx;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20rpx;
}

.report-text-section {
  margin-bottom: 10rpx;
}

.report-text {
  font-size: 22rpx;
  line-height: 1.6;
  color: #333;
}

.report-contact-section {
  margin-top: 10rpx;
}

.report-contact {
  font-size: 22rpx;
  line-height: 1.6;
  color: #333;
}

.image-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20rpx; 
  /* 移除 overflow: hidden */
  padding: 20rpx; /* 添加内边距确保图片周围有空间 */
}

image {
  width: 80%; /* 固定宽度或使用具体数值 */
  height: auto; /* 确保高度自适应 */
}
</style>
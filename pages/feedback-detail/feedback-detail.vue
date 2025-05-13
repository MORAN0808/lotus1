<template>
  <view class="feedback-detail-container">
    <view class="form-section">
      <view class="form-item">
        <text class="label">问题描述(必填)</text>
        <input v-model="problemDescription" class="input-field" type="text" placeholder="请填写5字以上描述，以便我们更好地为您提供帮助" />
      </view>
      <view class="form-item">
        <text class="label">联系方式</text>
        <view class="contact-options">
          <view class="option" @click="selectContact('phone')">
            <radio :checked="contact === 'phone'" />
            <text>手机号</text>
          </view>
          <view class="option" @click="selectContact('wechat')">
            <radio :checked="contact === 'wechat'" />
            <text>微信</text>
          </view>
          <view class="option" @click="selectContact('qq')">
            <radio :checked="contact === 'qq'" />
            <text>QQ</text>
          </view>
          <view class="option" @click="selectContact('email')">
            <radio :checked="contact === 'email'" />
            <text>邮箱</text>
          </view>
        </view>
        <input v-if="contact === 'phone'" v-model="contactInfo" class="input-field" type="text" placeholder="请输入手机号" />
        <input v-if="contact === 'wechat'" v-model="contactInfo" class="input-field" type="text" placeholder="请输入微信号" />
        <input v-if="contact === 'qq'" v-model="contactInfo" class="input-field" type="text" placeholder="请输入QQ号" />
        <input v-if="contact === 'email'" v-model="contactInfo" class="input-field" type="text" placeholder="请输入邮箱地址" />
      </view>
    </view>
    <button class="submit-btn" @click="submitFeedback">提交</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      contact: 'phone',
      problemDescription: '',
      contactInfo: ''
    };
  },
  methods: {
    selectContact(type) {
      this.contact = type;
    },
    submitFeedback() {
      if (!this.problemDescription.trim()) {
        uni.showToast({
          title: '内容不能为空！',
          icon: 'none'
        });
        return;
      }
      uni.showModal({
        title: '确认提交',
        content: '是否确认提交反馈？',
        success: (res) => {
          if (res.confirm) {
            // 这里可以添加实际的提交逻辑，比如调用接口
            uni.showToast({
              title: '提交成功',
              icon:'success'
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
.feedback-detail-container {
  padding: 30rpx;
  background: #f5f5f5;
  min-height: 100vh;
}

.form-section {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30rpx;
}

.form-item {
  margin-bottom: 30rpx;
}

.label {
  font-size: 28rpx; // 适当减小字体大小，防止显示不全
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 15rpx;
}

.input-field {
  width: 100%;
  padding: 15rpx; // 调整内边距，让输入框内容显示更合理
  border: 1px solid #e0e0e0;
  border-radius: 8rpx;
  font-size: 24rpx; // 适当减小字体大小
}

.contact-options {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20rpx;
}

.option {
  display: flex;
  align-items: center;
  margin-right: 30rpx;
  margin-bottom: 10rpx;
  font-size: 24rpx; // 调整联系方式选项字体大小
}

.submit-btn {
  background: linear-gradient(135deg, #6c9aff, #3f51b5);
  color: white;
  border: none;
  border-radius: 50rpx;
  padding: 20rpx 40rpx;
  font-size: 32rpx;
  width: 100%;
  text-align: center;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #3f51b5, #6c9aff);
}
</style>
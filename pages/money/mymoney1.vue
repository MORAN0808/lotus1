<template>
  <view class="container">
    <view class="form-card">
      <view class="form-item">
        <text class="label">花费类型</text>
        <input v-model="form.type" placeholder="请输入消费类型" placeholder-class="placeholder" />
        <input v-model="form.amount" placeholder="请输入金额" placeholder-class="placeholder" type="number" />
      </view>

      <view class="form-item">
        <text class="label">付款地点</text>
        <picker mode="region" @change="handleLocationChange">
          <view class="picker">
            {{ form.location || '请选择付款地点' }}
            <uni-icons type="arrowright" size="18" color="#999" />
          </view>
        </picker>
      </view>

      <view class="form-item">
        <text class="label">花销日期</text>
        <picker mode="date" :value="form.date" @change="handleDate">
          <view class="picker">
            {{ form.date || '请选择消费日期' }}
            <uni-icons type="calendar" size="18" color="#999" />
          </view>
        </picker>
      </view>
    </view>

    <button class="confirm-btn" :class="{ disabled: !formValid }" @click="handleConfirm">
      删除账单
    </button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          type: '',
          amount: '',
          location: '',
          date: ''
        }
      };
    },
    computed: {
      formValid() {
        return (
          this.form.type &&
          this.form.amount &&
          this.form.location &&
          this.form.date
        );
      }
    },
    methods: {
      handleLocationChange(e) {
        this.form.location = e.detail.value.join('');
      },
      handleDate(e) {
        this.form.date = e.detail.value;
      },
      handleConfirm() {
        if (!this.formValid) return;

        uni.navigateTo({
          url: '/pages/money/money2'
        });
      }
    }
  };
</script>

<style lang="scss">
  /* 保持原有样式不变 */
  .container {
    padding: 40rpx;
    min-height: 100vh;
    background: #ffffff;
  }

  .form-card {
    background: white;
    border-radius: 24rpx;
    padding: 0 30rpx;
  }

  .form-item {
    padding: 30rpx 0;
    border-bottom: 1rpx solid #ffffff;

    .label {
      font-size: 28rpx;
      color: #666;
      margin-bottom: 15rpx;
      display: block;
    }

    input,
    .picker {
      font-size: 34rpx;
      height: 80rpx;
      color: #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .placeholder {
      color: #ccc;
    }
  }

  .confirm-btn {
    margin-top: 60rpx;
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    background: #1e6eba;
    color: white;
    border-radius: 45rpx;
    font-size: 34rpx;

    &.disabled {
      background: #ccc;
      opacity: 0.6;
    }
  }
</style>
<template>
  <view class="container">
    <view class="form-card">
      <!-- 行程名称 -->
      <view class="form-item">
        <text class="label">行程名称</text>
        <input 
          v-model="form.name" 
          placeholder="请输入行程名称"
          placeholder-class="placeholder"
        />
      </view>

      <!-- 城市选择 -->
      <view class="form-item">
        <text class="label">目的地</text>
        <picker 
          mode="region" 
          @change="handleCityChange"
		  level="city"
        >
          <view class="picker">
            {{ form.city || '请选择城市' }}
            <uni-icons type="arrowright" size="18" color="#999" />
          </view>
        </picker>
      </view>

      <!-- 日期选择 -->
      <view class="form-item">
        <text class="label">出发日期</text>
        <picker 
          mode="date" 
          :value="form.startDate" 
          @change="handleStartDate"
        >
          <view class="picker">
            {{ form.startDate || '请选择开始日期' }}
            <uni-icons type="calendar" size="18" color="#999" />
          </view>
        </picker>
      </view>

      <view class="form-item">
        <text class="label">结束日期</text>
        <picker 
          mode="date" 
          :value="form.endDate" 
          :start="form.startDate"
          @change="handleEndDate"
        >
          <view class="picker">
            {{ form.endDate || '请选择结束日期' }}
            <uni-icons type="calendar" size="18" color="#999" />
          </view>
        </picker>
      </view>
    </view>

    <button 
      class="confirm-btn" 
      :class="{ disabled: !formValid }" 
      @click="handleConfirm"
    >
      创建详细行程
    </button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        city: '',
        startDate: '',
        endDate: ''
      }
    };
  },
  computed: {
    formValid() {
      return (
        this.form.name &&
        this.form.city &&
        this.form.startDate &&
        this.form.endDate
      );
    },
    daysCount() {
      if (!this.form.startDate || !this.form.endDate) return 0;
      const start = new Date(this.form.startDate);
      const end = new Date(this.form.endDate);
      return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    }
  },
  methods: {
    handleCityChange(e) {
      const [province, city] = e.detail.value
      // 处理直辖市逻辑（北京、上海、天津、重庆）
      const municipalities = ['北京市', '上海市', '天津市', '重庆市']
      if (municipalities.includes(province)) {
        this.form.city = province // 直辖市直接显示名称
      } else {
        this.form.city = province + city // 普通省市拼接
      }
    },
    handleStartDate(e) {
      this.form.startDate = e.detail.value;
      if (new Date(this.form.endDate) < new Date(e.detail.value)) {
        this.form.endDate = '';
      }
    },
    handleEndDate(e) {
      this.form.endDate = e.detail.value;
    },
    handleConfirm() {
      if (!this.formValid) return;

      const newTrip = {
        id: Date.now(),
        ...this.form,
        days: Array(this.daysCount).fill().map((_, i) => ({
          day: i + 1,
          attractions: []
        }))
      };
      // 保存到本地
      const trips = uni.getStorageSync('trips') || [];
      trips.push(newTrip);
      uni.setStorageSync('trips', trips);

      // 跳转到详情页
      uni.navigateTo({
        url: `/pages/travel/detail-trip?id=${newTrip.id}`
      });
    }
  }
};
</script>

<style lang="scss">
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

  input, .picker {
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
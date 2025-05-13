<template>
  <view class="container">
    <!-- 行程标题 -->
    <view class="trip-header">
      <text class="trip-title">上海五天四晚旅行</text>
      <text class="trip-date">2025-05-15~2025-05-19</text>
    </view>

    <!-- 天数选项卡 -->
    <view class="days-tabs">
      <view
        class="day-tab"
        :class="{ active: activeDayIndex === 0 }"
        @tap="switchDay(0)"
      >
        第一天
        <view class="indicator"></view>
      </view>
      <view
        class="day-tab"
        :class="{ active: activeDayIndex === 1 }"
        @tap="switchDay(1)"
      >
        第二天
        <view class="indicator"></view>
      </view>
      <view
        class="day-tab"
        :class="{ active: activeDayIndex === 2 }"
        @tap="switchDay(2)"
      >
        第三天
        <view class="indicator"></view>
      </view>
      <view
        class="day-tab"
        :class="{ active: activeDayIndex === 3 }"
        @tap="switchDay(3)"
      >
        第四天
        <view class="indicator"></view>
      </view>
      <view
        class="day-tab"
        :class="{ active: activeDayIndex === 4 }"
        @tap="switchDay(4)"
      >
        第五天
        <view class="indicator"></view>
      </view>
    </view>

    <!-- 行程内容 -->
    <view class="day-content">
      <!-- 第一天行程 -->
      <view v-if="activeDayIndex === 0" class="attraction-container">
        <view class="attraction-item" v-for="(item, index) in day1Attractions" :key="index" @tap="navigateToDetail('write21' + (index + 1))">
          <view class="attraction-content">
            <view class="attraction-card">
              <view class="attraction-name">{{ item.name }}</view>
              <view class="attraction-time">{{ item.time }}</view>
            </view>
            <button class="navigate-btn" @tap.stop="navigateToMap(item.name)">去导航</button>
          </view>
          <view class="arrow-divider" v-if="index < day1Attractions.length - 1">
            <view class="arrow-icon">↓</view>
          </view>
        </view>
      </view>

      <!-- 第二天行程 -->
      <view v-if="activeDayIndex === 1" class="attraction-container">
        <view class="attraction-item" v-for="(item, index) in day2Attractions" :key="index" @tap="navigateToDetail('write22' + (index + 1))">
          <view class="attraction-content">
            <view class="attraction-card">
              <view class="attraction-name">{{ item.name }}</view>
              <view class="attraction-time">{{ item.time }}</view>
            </view>
            <button class="navigate-btn" @tap.stop="navigateToMap(item.name)">去导航</button>
          </view>
          <view class="arrow-divider" v-if="index < day2Attractions.length - 1">
            <view class="arrow-icon">↓</view>
          </view>
        </view>
      </view>

      <!-- 第三天行程 -->
      <view v-if="activeDayIndex === 2" class="attraction-container">
        <view class="attraction-item" v-for="(item, index) in day3Attractions" :key="index" @tap="navigateToDetail('write23' + (index + 1))">
          <view class="attraction-content">
            <view class="attraction-card">
              <view class="attraction-name">{{ item.name }}</view>
              <view class="attraction-time">{{ item.time }}</view>
            </view>
            <button class="navigate-btn" @tap.stop="navigateToMap(item.name)">去导航</button>
          </view>
          <view class="arrow-divider" v-if="index < day3Attractions.length - 1">
            <view class="arrow-icon">↓</view>
          </view>
        </view>
      </view>

      <!-- 第四天行程 -->
      <view v-if="activeDayIndex === 3" class="attraction-container">
        <view class="attraction-item" v-for="(item, index) in day4Attractions" :key="index" @tap="navigateToDetail('write24' + (index + 1))">
          <view class="attraction-content">
            <view class="attraction-card">
              <view class="attraction-name">{{ item.name }}</view>
              <view class="attraction-time">{{ item.time }}</view>
            </view>
            <button class="navigate-btn" @tap.stop="navigateToMap(item.name)">去导航</button>
          </view>
          <view class="arrow-divider" v-if="index < day4Attractions.length - 1">
            <view class="arrow-icon">↓</view>
          </view>
        </view>
      </view>

      <!-- 第五天行程 -->
      <view v-if="activeDayIndex === 4" class="attraction-container">
        <view class="attraction-item" @tap="navigateToDetail('write251')">
          <view class="attraction-content">
            <view class="attraction-card">
              <view class="attraction-name">{{ day5Attractions[0].name }}</view>
              <view class="attraction-time">{{ day5Attractions[0].time }}</view>
            </view>
            <button class="navigate-btn" @tap.stop="navigateToMap(day5Attractions[0].name)">去导航</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activeDayIndex: 0,
      day1Attractions: [
        { name: '豫园', time: '9:00-11:00' },
        { name: '南京路步行街', time: '14:00-16:30' },
        { name: '东方明珠', time: '17:00-17:30' },
        { name: '外滩', time: '19:00-21:00' }
      ],
      day2Attractions: [
        { name: '武康路', time: '9:00-11:00' },
        { name: '安福路', time: '14:00-15:30' },
        { name: '同济大学', time: '16:15-17:30' },
        { name: '上海交大', time: '18:00-19:00' },
        { name: '陆家嘴', time: '20:00-21:00' }
      ],
      day3Attractions: [
        { name: '静安寺', time: '10:00-11:00' },
        { name: '城隍庙', time: '12:40-15:30' },
        { name: '人民广场', time: '15:30-17:30' }
      ],
      day4Attractions: [
        { name: '鲁迅公园', time: '9:00-11:00' },
        { name: '多伦路', time: '14:20-16:30' },
        { name: '1933老场坊', time: '17:30-19:00' }
      ],
      day5Attractions: [
        { name: '迪士尼', time: '7:00-22:00' }
      ]
    };
  },
  methods: {
    switchDay(index) {
      this.activeDayIndex = index;
    },
    navigateToMap(placeName) {
      uni.showToast({
        title: `导航到${placeName}`,
        icon: 'none'
      });
      // 实际项目中这里可以调用地图API进行导航
    },
    navigateToDetail(pageName) {
      uni.navigateTo({
        url: `/pages/travel/${pageName}`
      });
    }
  }
};
</script>

<style lang="scss">
.container {
  padding: 30rpx;
  min-height: 100vh;
  background-color: #f5f7fa;
}

/* 行程标题样式 */
.trip-header {
  margin-bottom: 40rpx;
  text-align: center;
}
.trip-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  display: block;
}
.trip-date {
  font-size: 28rpx;
  color: #666;
  margin-top: 10rpx;
  display: block;
}

/* 天数选项卡样式 */
.days-tabs {
  display: flex;
  margin-bottom: 30rpx;
  background: #ffffff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  overflow-x: auto;
  white-space: nowrap;
}
.day-tab {
  flex: 1;
  min-width: 20%;
  text-align: center;
  padding: 20rpx 0;
  font-size: 28rpx;
  color: #666;
  position: relative;
  transition: all 0.3s;
}
.day-tab.active {
  color: #1e6eba;
  font-weight: bold;
}
.indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 4rpx;
  background: #1e6eba;
  transition: all 0.3s;
}
.day-tab.active .indicator {
  width: 80rpx;
}

/* 行程内容样式 */
.day-content {
  margin-bottom: 30rpx;
}

.attraction-container {
  margin-bottom: 10rpx;
}

.attraction-item {
  margin-bottom: 10rpx;
}

.attraction-content {
  display: flex;
  align-items: center;
}

.attraction-card {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  flex: 1;
  margin-right: 20rpx;
}

.attraction-name {
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 15rpx;
}
.attraction-time {
  font-size: 28rpx;
  color: #666;
}

/* 导航按钮样式 */
.navigate-btn {
  background-color: #6294ba;
  color: white;
  border-radius: 100rpx;
  font-size: 25rpx;
  padding: 10rpx 30rpx;
  border: none;
  white-space: nowrap;
}
.navigate-btn::after {
  border: none;
}

/* 箭头分隔符样式 */
.arrow-divider {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40rpx;
  margin: 10rpx 0;
}

.arrow-icon {
  color: #6294ba;
  font-size: 36rpx;
  width: 40rpx;
  height: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  border-radius: 50%;
}
</style>
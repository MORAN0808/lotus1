<template>
  <view class="container">
    <!-- 行程标题 -->
    <view class="trip-header">
      <text class="trip-title">武汉两天一晚旅行</text>
      <text class="trip-date">2025-05-11~2025-05-12</text>
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
    </view>

    <!-- 行程内容 -->
    <view class="day-content">
      <!-- 第一天行程 -->
      <view v-if="activeDayIndex === 0" class="attraction-container">
        <view
          class="attraction-item"
          v-for="(item, index) in day1Attractions"
          :key="index"
        >
          <view class="attraction-content" @tap="navigateToDetail(0, index)">
            <view class="attraction-card">
              <view class="attraction-name">{{ item.name }}</view>
              <view class="attraction-time">{{ item.time }}</view>
            </view>
            <button class="navigate-btn" @tap.stop="navigateToMap(item.name)">去导航</button>
          </view>
          <!-- 添加箭头分隔符 -->
          <view class="arrow-divider" v-if="index < day1Attractions.length - 1">
            <view class="arrow-icon">↓</view>
          </view>
        </view>
      </view>

      <!-- 第二天行程 -->
      <view v-if="activeDayIndex === 1" class="attraction-container">
        <view
          class="attraction-item"
          v-for="(item, index) in day2Attractions"
          :key="index"
        >
          <view class="attraction-content" @tap="navigateToDetail(1, index)">
            <view class="attraction-card">
              <view class="attraction-name">{{ item.name }}</view>
              <view class="attraction-time">{{ item.time }}</view>
            </view>
            <button class="navigate-btn" @tap.stop="navigateToMap(item.name)">去导航</button>
          </view>
          <!-- 添加箭头分隔符 -->
          <view class="arrow-divider" v-if="index < day2Attractions.length - 1">
            <view class="arrow-icon">↓</view>
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
        { name: '汉口江滩', time: '6:30-7:30' },
        { name: '江汉路', time: '8:30-12:00' },
        { name: '武汉大学', time: '14:00-15:30' },
        { name: '光谷', time: '16:00-19:30' },
        { name: '财大小吃街', time: '20:00-22:00' }
      ],
      day2Attractions: [
        { name: '东湖', time: '6:30-7:30' },
        { name: '昙华林', time: '8:30-12:00' },
        { name: '楚河韩姐', time: '14:00-15:30' },
        { name: '黄鹤楼', time: '16:00-19:30' },
        { name: '武汉站', time: '20:00-22:00' }
      ]
    };
  },
  methods: {
    switchDay(index) {
      this.activeDayIndex = index;
    },
    navigateToMap(placeName) {
      const that = this;
      wx.getLocation({
        type: 'gcj02',
        success(res) {
          const { latitude, longitude } = res;
          
          // 构建符合网页版要求的参数
          const params = {
            'from[name]': '我的位置',
            'from[id]': 'dirmyloc',           // 固定标识当前位置
            'from[lnglat]': `${longitude},${latitude}`,
            'to[name]': placeName,
            'to[lnglat]': '',                 // 留空由高德自动解析
            'type': 'car',                    // 交通方式
            'policy': '1'                     // 路线策略
          };
    
          // 生成符合要求的URL
          const queryString = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');
          
          const mapUrl = `https://ditu.amap.com/dir?${queryString}`;
    
          // 复制到剪贴板
          wx.setClipboardData({
            data: mapUrl,
            success() {
              wx.showToast({
                title: '导航链接已复制，请复制到浏览器或者高德地图打开',
                icon: 'none'
              });
            }
          });
        },
        fail(err) {
          console.error('获取位置失败', err);
          wx.showToast({
            title: '获取位置失败，请检查定位权限',
            icon: 'none'
          });
        }
      });
    },
    navigateToDetail(dayIndex, attractionIndex) {
      // 根据天数和景点索引跳转到不同页面
      const pageNumber = attractionIndex + 1;
      const pagePath = `/pages/write${dayIndex+1}${pageNumber}/write${dayIndex+1}${pageNumber}`;
      
      uni.navigateTo({
        url: pagePath,
        fail: () => {
          uni.showToast({
            title: '页面跳转失败',
            icon: 'none'
          });
        }
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
}
.day-tab {
  flex: 1;
  text-align: center;
  padding: 20rpx 0;
  font-size: 32rpx;
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
  margin-bottom: 30rpx;
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
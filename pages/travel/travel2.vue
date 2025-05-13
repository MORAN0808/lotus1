<template>
  <!-- 轮播图 -->
  <swiper class="banner" indicator-dots circular :autoplay="false">
    <swiper-item v-for="item in pictures" :key="item.id">
      <image @tap="onPreviewImage(item.url)" :src="item.url"></image>
    </swiper-item>
  </swiper>

  <!-- 状态选项卡 -->
  <view class="status-tabs">
    <view
      class="status-tab"
      :class="{ 'active': activeTab === 'pending' }"
      @tap="switchTab('pending')"
    >
      待出发
      <view class="indicator"></view>
    </view>
    <view
      class="status-tab"
      :class="{ 'active': activeTab === 'finished' }"
      @tap="switchTab('finished')"
    >
      已结束
      <view class="indicator"></view>
    </view>
  </view>

  <!-- 待出发行程列表 -->
  <view class="trip-list" v-if="activeTab === 'pending'">
    <button class="trip-card" @tap="navigateToLookLook('wuhan')">
      <view class="trip-name">武汉两天一晚旅行</view>
      <view class="trip-date">2025-05-11~2025-05-12</view>
    </button>
    <button class="trip-card" style="margin-top: 20rpx;" @tap="navigateToLookLook('shanghai')">
      <view class="trip-name">上海五天四晚旅行</view>
      <view class="trip-date">2025-05-15~2025-05-19</view>
    </button>
  </view>

  <!-- 已结束行程列表 -->
  <view class="finished-trip-list" v-if="activeTab === 'finished'">
    <button class="finished-trip-card">
      <view class="trip-name">沈阳四天三晚旅行</view>
      <view class="trip-date">2025-05-01~2025-05-04</view>
    </button>
  </view>

  <!-- 新建行程按钮 -->
  <view class="add-trip-button" v-if="activeTab === 'pending'">
    <button class="custom-button" @tap="navigateToCreateTrip">新建行程</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
      activeTab: 'pending',
      pictures: [
        {
          id: '1',
          url: 'https://img2.baidu.com/it/u=3058240186,2670977521&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800',
        },
        {
          id: '2',
          url: 'https://wx2.sinaimg.cn/mw690/008ughm4ly1hj7auni8jhj31rn1rzk5z.jpg',
        },
        {
          id: '3',
          url: 'http://img0.baidu.com/it/u=1866569503,1645288747&fm=253&app=138&f=JPEG?w=800&h=800',
        },
      ],
    };
  },
  methods: {
    onPreviewImage(url) {
      uni.previewImage({
        urls: this.pictures.map((v) => v.url),
        current: url,
      });
    },
    switchTab(tab) {
      this.activeTab = tab;
    },
    navigateToCreateTrip() {
      uni.navigateTo({
        url: '/pages/travel/name-trip',
      });
    },
    navigateToLookLook(type) {
      if (type === 'wuhan') {
        uni.navigateTo({
          url: '/pages/travel/looklook'
        });
      } else if (type === 'shanghai') {
        uni.navigateTo({
          url: '/pages/travel/looklook2'
        });
      }
    }
  },
};
</script>

<style>
/* 轮播图样式 */
.banner {
  width: 100%;
  height: 500rpx;
}
.banner image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 状态选项卡样式 */
.status-tabs {
  display: flex;
  height: 100rpx;
  background: #ffffff;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}
.status-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #999;
  position: relative;
  transition: all 0.3s;
}
.status-tab.active {
  color: #1e6eba;
  font-weight: 500;
}
.indicator {
  position: absolute;
  bottom: 0;
  width: 0;
  height: 4rpx;
  background: #1e6eba;
  transition: all 0.3s;
}
.status-tab.active .indicator {
  width: 80rpx;
}

/* 待出发行程卡片样式 */
.trip-list {
  padding: 30rpx;
}

.trip-card {
  background-color: #8ab6d6;
  border-radius: 20rpx;
  padding: 30rpx;
  color: white;
  box-shadow: 0 4rpx 12rpx rgba(138, 182, 214, 0.3);
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  line-height: normal;
}
.trip-card::after {
  border: none; /* 去除按钮默认边框 */
}

/* 已结束行程卡片样式 */
.finished-trip-list {
  padding: 30rpx;
}

.finished-trip-card {
  background-color: #a0a0a0;
  border-radius: 20rpx;
  padding: 30rpx;
  color: white;
  box-shadow: 0 4rpx 12rpx rgba(160, 160, 160, 0.3);
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  line-height: normal;
}
.finished-trip-card::after {
  border: none; /* 去除按钮默认边框 */
}

/* 共用行程信息样式 */
.trip-name {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 15rpx;
}

.trip-date {
  font-size: 28rpx;
  opacity: 0.9;
}

/* 新建行程按钮样式 */
.add-trip-button {
  position: fixed;
  bottom: 100rpx;
  width: 100%;
  padding: 0 30rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

.custom-button {
  width: 80%;
  background-color: #e6f3ff !important;
  color: #007aff !important;
  border-radius: 50rpx;
  font-size: 34rpx;
  border: none;
  box-shadow: 0 4rpx 16rpx rgba(0, 122, 255, 0.2);
  transition: all 0.2s;
}

.custom-button:active {
  background-color: #d4e7ff !important;
  transform: scale(0.98);
}
</style>
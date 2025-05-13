<template>
  <view class="container">
    <!-- 头部 -->
    <view class="header">
      <text class="title">提醒事项</text>
      <text class="subtitle">添加行程提醒事项，例如：出行抢票、景点预约等</text>
    </view>

    <!-- 添加按钮 -->
    <view class="add-btn">
      <button @click="gotoAddPage">+ 添加提醒事项</button>
    </view>

    <!-- 事项列表 -->
    <scroll-view class="list" scroll-y>
      <view v-for="item in displayList" :key="item.id" class="item">
        <view class="item-left">
          <uni-icons 
            :type="item.checked ? 'checkbox-filled' : 'checkbox'"
            :color="item.checked ? '#1e6eba' : '#ddd'"
            @click="toggleCheck(item.id)"
          />
        </view>
        <view class="item-main">
          <text class="title">{{ item.text }}</text>
          <view class="time">
            <uni-icons type="calendar" size="14" color="#999" />
            <text>{{ formatTime(item.time) }}</text>
          </view>
        </view>
        <view class="item-right">
          <uni-icons 
            type="trash" 
            color="#FF5A5F"
            @click="deleteItem(item.id)"
          />
        </view>
      </view>

      <!-- 空状态 -->
      <view v-if="!displayList.length" class="empty">
        <text class="empty-text">暂时没有提醒事项</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
const PAGE_SIZE = 10;
export default {
  data() {
    return {
      fullList: [],
      displayList: [],
      page: 1
    }
  },
  async onLoad() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const { data } = await uni.getStorage({ key: 'reminders' });
        this.fullList = data || [];
        this.page = 1;
        this.updateDisplay();
      } catch (e) {
        if (e.errMsg.includes('data not found')) {
          // 若数据不存在，将 fullList 设为空数组
          this.fullList = [];
          this.page = 1;
          this.updateDisplay();
        } else {
          uni.showToast({ title: '加载失败', icon: 'none' });
        }
      }
    },
    updateDisplay() {
      this.displayList = this.fullList.slice(0, this.page * PAGE_SIZE);
    },
    gotoAddPage() {
      uni.navigateTo({
        url: '/pages/add-reminder/add-reminder',
        success: () => console.log('跳转成功'),
        fail: (err) => {
          console.error('跳转失败:', err);
          uni.reLaunch({
            url: '/pages/add-reminder/add-reminder',
            success: () => console.log('reLaunch跳转成功'),
            fail: (err) => {
              console.error('reLaunch失败:', err);
              uni.showToast({ title: '跳转失败', icon: 'none' });
            }
          });
        }
      });
    },
    formatTime(timestamp) {
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    },
    async toggleCheck(id) {
      const item = this.fullList.find(v => v.id === id);
      if (item) item.checked = !item.checked;
      await this.saveData();
    },
    async deleteItem(id) {
      this.fullList = this.fullList.filter(v => v.id !== id);
      await this.saveData();
      this.updateDisplay();
    },
    async saveData() {
      try {
        await uni.setStorage({ key: 'reminders', data: this.fullList });
      } catch (e) {
        uni.showToast({ title: '保存失败', icon: 'none' });
      }
    }
  }
}
</script>

<style lang="scss">
.container {
  padding: 24rpx;
  background: #f8f9fa;
  min-height: 100vh;
}

.header {
  padding: 32rpx 0;
  .title {
    font-size: 44rpx;
    color: #333;
    font-weight: 600;
    display: block;
    margin-bottom: 16rpx;
  }
  .subtitle {
    font-size: 26rpx;
    color: #666;
  }
}

.add-btn {
  margin: 24rpx 0;
  button {
    background: #1e6eba;
    color: white;
    border-radius: 12rpx;
    font-size: 32rpx;
    height: 88rpx;
    line-height: 88rpx;
    &::after { border: none; }
  }
}

.list {
  height: calc(100vh - 300rpx);
  
  .item {
    background: white;
    border-radius: 12rpx;
    padding: 28rpx;
    margin-bottom: 24rpx;
    display: flex;
    align-items: center;
    box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.04);

    .item-left {
      padding-right: 24rpx;
      uni-icons {
        font-size: 40rpx;
      }
    }

    .item-main {
      flex: 1;
      .title {
        font-size: 32rpx;
        color: #333;
        line-height: 1.4;
      }
      .time {
        margin-top: 16rpx;
        display: flex;
        align-items: center;
        font-size: 24rpx;
        color: #999;
        uni-icons {
          margin-right: 8rpx;
        }
      }
    }

    .item-right {
      padding-left: 24rpx;
      uni-icons {
        font-size: 36rpx;
        padding: 12rpx;
        &:active {
          background: rgba(255,90,95,0.1);
          border-radius: 50%;
        }
      }
    }
  }
}

.empty {
  text-align: center;
  padding: 100rpx 0;
  .empty-img {
    width: 280rpx;
    height: 280rpx;
    opacity: 0.4;
  }
  .empty-text {
    display: block;
    font-size: 28rpx;
    color: #999;
    margin-top: 24rpx;
  }
}
</style>    
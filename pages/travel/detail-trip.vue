<template>
  <view class="container">
    <!-- 行程标题 -->
    <view class="trip-header">
      <text class="trip-title">{{ trip.name || '未命名行程' }}</text>
    </view>

    <!-- 日期选择选项卡 -->
    <view class="date-tabs">
      <view class="date-tab">
        <text>开始日期</text>
        <picker mode="date" :value="trip.startDate" @change="startDateChange">
          <view class="date-display">{{ trip.startDate || '选择日期' }}</view>
        </picker>
      </view>
      <view class="date-tab">
        <text>结束日期</text>
        <picker mode="date" :value="trip.endDate" @change="endDateChange">
          <view class="date-display">{{ trip.endDate || '选择日期' }}</view>
        </picker>
      </view>
    </view>

    <!-- 天数选项卡 -->
    <view class="days-tabs">
      <view
        class="day-tab"
        v-for="(day, index) in trip.days"
        :key="index"
        :class="{ active: activeDayIndex === index }"
        @tap="switchDay(index)"
      >
        第{{ day?.day ?? index + 1 }}天
        <view class="indicator"></view>
      </view>
    </view>

    <!-- 当前选中的天数内容 -->
    <view class="day-content">
      <view v-if="activeDay">
        <view class="day-header">
          <text class="day-title">第{{ activeDay.day }}天行程</text>
          <button class="add-attraction-btn" @tap="addAttraction(activeDayIndex)">+ 添加景点</button>
        </view>

        <view v-for="(attraction, attractionIndex) in activeDay.attractions" :key="attractionIndex" class="attraction-item">
          <view class="attraction-inputs">
            <input v-model="attraction.name" placeholder="景点名称" class="attraction-name-input" />
            <view class="time-inputs">
              <picker mode="time" :value="attraction.startTime" @change="timeChange(activeDayIndex, attractionIndex, 'startTime', $event)">
                <view class="time-tab">{{ attraction.startTime || '选择到达时间' }}</view>
              </picker>
              <picker mode="time" :value="attraction.endTime" @change="timeChange(activeDayIndex, attractionIndex, 'endTime', $event)">
                <view class="time-tab">{{ attraction.endTime || '选择结束时间' }}</view>
              </picker>
            </view>
          </view>
          <button class="remove-attraction-btn" @tap="removeAttraction(activeDayIndex, attractionIndex)">删除</button>
        </view>
      </view>

      <view v-else class="empty-day">
        <text>暂无行程安排，请点击上方添加天数</text>
      </view>
    </view>

    <view class="days-operations">
      <button class="add-day-btn" @tap="addDay">+ 添加一天</button>
    </view>

    <!-- 保存按钮 -->
    <button class="save-btn" @tap="saveTrip">保存行程</button>
  </view>
</template>

<script>
export default {
  data() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    return {
      trip: {
        id: null,
        name: '',
        city: '',
        startDate: this.formatDate(today),
        endDate: this.formatDate(tomorrow),
        days: []
      },
      activeDayIndex: 0
    };
  },
  onLoad(options) {
    try {
      const trips = uni.getStorageSync('trips') || [];
      const tripId = options.id;
      
      if (tripId) {
        const foundTrip = trips.find(trip => trip.id == tripId);
        if (foundTrip) {
          // 确保数据结构完整
          this.trip = {
            ...this.trip,
            ...foundTrip,
            days: foundTrip.days?.map(day => ({
              day: day.day,
              attractions: day.attractions || []
            })) || []
          };
        }
      }
      
      // 确保至少有一天的行程
      if (this.trip.days.length === 0) {
        this.addDay();
      }
    } catch (e) {
      console.error('加载行程数据失败:', e);
      this.addDay(); // 出错时也确保至少有一天
    }
  },
  computed: {
    activeDay() {
      if (this.activeDayIndex == null || 
          !Array.isArray(this.trip.days) || 
          this.activeDayIndex < 0 || 
          this.activeDayIndex >= this.trip.days.length) {
        return null;
      }
      return this.trip.days[this.activeDayIndex];
    }
  },
  methods: {
    formatDate(date) {
      if (!(date instanceof Date)) {
        date = new Date();
      }
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    switchDay(index) {
      if (index >= 0 && index < this.trip.days.length) {
        this.activeDayIndex = index;
      }
    },
    startDateChange(e) {
      if (e.detail.value) {
        this.trip.startDate = e.detail.value;
        if (new Date(this.trip.startDate) > new Date(this.trip.endDate)) {
          this.trip.endDate = this.trip.startDate;
        }
        this.adjustDays();
      }
    },
    endDateChange(e) {
      if (e.detail.value) {
        this.trip.endDate = e.detail.value;
        if (new Date(this.trip.endDate) < new Date(this.trip.startDate)) {
          this.trip.startDate = this.trip.endDate;
        }
        this.adjustDays();
      }
    },
    adjustDays() {
      try {
        const startDate = new Date(this.trip.startDate);
        const endDate = new Date(this.trip.endDate);
        const daysBetween = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        
        // 确保days数组存在
        if (!Array.isArray(this.trip.days)) {
          this.trip.days = [];
        }
        
        // 调整天数
        while (this.trip.days.length < daysBetween) {
          this.addDay();
        }
        
        while (this.trip.days.length > daysBetween) {
          this.trip.days.pop();
        }
        
        // 更新天数编号
        this.trip.days.forEach((day, index) => {
          if (day) {
            day.day = index + 1;
          }
        });
        
        // 确保activeDayIndex有效
        if (this.activeDayIndex >= this.trip.days.length) {
          this.activeDayIndex = Math.max(0, this.trip.days.length - 1);
        }
      } catch (e) {
        console.error('调整天数失败:', e);
      }
    },
    addDay() {
      if (!Array.isArray(this.trip.days)) {
        this.trip.days = [];
      }
      
      const newDay = {
        day: this.trip.days.length + 1,
        attractions: []
      };
      this.trip.days.push(newDay);
      this.activeDayIndex = this.trip.days.length - 1;
      
      // 更新结束日期
      try {
        const startDate = new Date(this.trip.startDate);
        const newEndDate = new Date(startDate);
        newEndDate.setDate(startDate.getDate() + this.trip.days.length - 1);
        this.trip.endDate = this.formatDate(newEndDate);
      } catch (e) {
        console.error('更新结束日期失败:', e);
      }
    },
    addAttraction(dayIndex) {
      if (dayIndex >= 0 && dayIndex < this.trip.days.length) {
        if (!Array.isArray(this.trip.days[dayIndex].attractions)) {
          this.trip.days[dayIndex].attractions = [];
        }
        this.trip.days[dayIndex].attractions.push({
          name: '',
          startTime: '',
          endTime: ''
        });
      }
    },
    removeAttraction(dayIndex, attractionIndex) {
      if (dayIndex >= 0 && dayIndex < this.trip.days.length && 
          attractionIndex >= 0 && attractionIndex < this.trip.days[dayIndex].attractions?.length) {
        this.trip.days[dayIndex].attractions.splice(attractionIndex, 1);
      }
    },
    timeChange(dayIndex, attractionIndex, type, e) {
      if (dayIndex >= 0 && dayIndex < this.trip.days.length && 
          attractionIndex >= 0 && attractionIndex < this.trip.days[dayIndex].attractions?.length && 
          e.detail.value) {
        if (type === 'startTime') {
          this.trip.days[dayIndex].attractions[attractionIndex].startTime = e.detail.value;
        } else {
          this.trip.days[dayIndex].attractions[attractionIndex].endTime = e.detail.value;
        }
      }
    },
    async saveTrip() {
      try {
        const trips = uni.getStorageSync('trips') || [];
        const tripIndex = trips.findIndex(trip => trip.id == this.trip.id);
        
        // 确保数据结构完整
        const tripToSave = {
          ...this.trip,
          days: this.trip.days.map(day => ({
            day: day.day,
            attractions: day.attractions || []
          }))
        };
        
        if (tripIndex !== -1) {
          trips[tripIndex] = tripToSave;
        } else {
          tripToSave.id = tripToSave.id || Date.now();
          trips.push(tripToSave);
        }
        
        await uni.setStorageSync('trips', trips);
        uni.showToast({
          title: '保存成功',
          icon: 'success'
        });
        
        setTimeout(() => {
          uni.redirectTo({
            url: '/pages/travel/travel2'
          });
        }, 2000);
      } catch (e) {
        console.error('保存行程失败:', e);
        uni.showToast({
          title: '保存失败',
          icon: 'error'
        });
      }
    }
  }
};
</script>

<style lang="scss">
/* 保持原有样式不变 */
.container {
  padding: 40rpx;
  min-height: 100vh;
  background: #c9ecfa;
}

/* 行程标题区域 */
.trip-header {
  margin-bottom: 40rpx;
}
.trip-title {
  font-size: 50rpx;
  font-weight: bold;
  color: #333;
}
.trip-dates {
  font-size: 28rpx;
  color: #304c66;
  margin-top: 10rpx;
}

/* 日期选择选项卡 */
.date-tabs {
  display: flex;
  justify-content: space-between;
  background: #fff9f6;
  border-radius: 16rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}
.date-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.date-display {
  font-size: 28rpx;
  color: #1e6eba;
  margin-top: 10rpx;
}

/* 天数选项卡 */
.days-tabs {
  display: flex;
  overflow-x: auto;
  margin-bottom: 20rpx;
  padding: 20rpx 0;
  background: white;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}
.day-tab {
  padding: 16rpx 32rpx;
  margin-right: 20rpx;
  font-size: 28rpx;
  color: #4d5866;
  position: relative;
  white-space: nowrap;
  border-radius: 8rpx;
  transition: all 0.3s;
}
.day-tab.active {
  color: #1e6eba;
  font-weight: bold;
  background: #f7fffa;
}
.day-tab.active .indicator {
  width: 80rpx;
}
.indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 4rpx;
  background: #1e6eba;
  border-radius: 2rpx;
  transition: all 0.3s;
}
.day-tab.active .indicator {
  width: 80rpx;
}

/* 当前天数内容 */
.day-content {
  background: #f7fffa;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}
.day-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}
.day-title {
  font-size: 32rpx;
  font-weight: 800;
  color: #333;
}
.add-attraction-btn {
  font-size: 24rpx;
  color: #1e6eba;
  background: none;
  border: none;
}
.attraction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  padding-bottom: 20rpx;
  border-bottom: 2rpx solid #000000;
}
.attraction-inputs {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.attraction-name-input {
  font-size: 30rpx;
  margin-bottom: 15rpx;
  padding: 10rpx 0;
  border-bottom: 1rpx solid #4a62ee;
}
.time-inputs {
  display: flex;
  justify-content: space-between;
}
.time-tab {
  flex: 1;
  padding: 10rpx;
  margin-right: 20rpx;
  font-size: 28rpx;
  color: #666;
  background: #b1cafa;
  border-radius: 8rpx;
  text-align: center;
}
.remove-attraction-btn {
  font-size: 24rpx;
  color: #ff5a5f;
  background: none;
  border: none;
  margin-left: 20rpx;
}

/* 天数操作区域 */
.days-operations {
  margin: 30rpx 0;
}
.add-day-btn {
  width: 100%;
  padding: 10rpx;
  background: #f0f7ff;
  color: #1e6eba;
  border: 1rpx solid #1e6eba;
  border-radius: 12rpx;
  font-size: 28rpx;
}

/* 保存按钮 */
.save-btn {
  width: 100%;
  padding: 10rpx;
  background: #1e6eba;
  color: white;
  border: none;
  border-radius: 12rpx;
  font-size: 32rpx;
  margin-top: 40rpx;
  box-shadow: 0 4rpx 16rpx rgba(30, 110, 186, 0.2);
}

/* 空天数提示 */
.empty-day {
  padding: 40rpx;
  text-align: center;
  color: #999;
  font-size: 28rpx;
}
</style>
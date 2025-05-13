<template>
  <view class="container">
    <view class="form">
      <!-- 时间选择器 -->
      <view class="form-item time-picker-box">
        <text class="section-title">选择提醒时间</text>
        <!-- 时间显示区域（点击展开选择器） -->
        <view 
          class="time-display" 
          @click="showTimePicker = true"
        >
          {{ formattedTime || '请选择提醒时间' }}
          <uni-icons type="arrowright" size="18" color="#999" />
        </view>

        <!-- 时间选择器弹出层 -->
        <view class="time-picker-popup" v-if="showTimePicker">
          <view class="picker-header">
            <button class="cancel-btn" @click="showTimePicker = false">取消</button>
            <button class="confirm-btn" @click="confirmTime">确定</button>
          </view>
          <picker-view 
            class="time-picker" 
            :value="pickerValue" 
            @change="handleTimeChange"
            indicator-class="picker-indicator"
          >
            <!-- 年 -->
            <picker-view-column class="picker-column">
              <view 
                v-for="(year, index) in years" 
                :key="index" 
                class="picker-item"
              >{{ year }}年</view>
            </picker-view-column>
            <!-- 月 -->
            <picker-view-column class="picker-column">
              <view 
                v-for="(month, index) in months" 
                :key="index" 
                class="picker-item"
              >{{ formatNumber(month) }}月</view>
            </picker-view-column>
            <!-- 日 -->
            <picker-view-column class="picker-column">
              <view 
                v-for="(day, index) in days" 
                :key="index" 
                class="picker-item"
              >{{ formatNumber(day) }}日</view>
            </picker-view-column>
            <!-- 时 -->
            <picker-view-column class="picker-column">
              <view 
                v-for="(hour, index) in hours" 
                :key="index" 
                class="picker-item"
              >{{ formatNumber(hour) }}</view>
            </picker-view-column>
            <!-- 分 -->
            <picker-view-column class="picker-column">
              <view 
                v-for="(minute, index) in minutes" 
                :key="index" 
                class="picker-item"
              >{{ formatNumber(minute) }}</view>
            </picker-view-column>
          </picker-view>
        </view>
      </view>
      
      <!-- 提醒内容 -->
      <view class="form-item content-box">
        <text class="section-title">提醒内容</text>
        <view class="input-container">
          <input 
            type="text" 
            v-model="reminderText" 
            placeholder="请输入提醒事项（例如：抢购五一车票）" 
            maxlength="40" 
            class="input-box"
          />
          <text class="word-count">{{ reminderText.length }}/40</text>
        </view>
      </view>
      
      <button class="save-btn" @click="saveReminder">保存提醒事项</button>
    </view>
  </view>
</template>

<script>
const START_YEAR = new Date().getFullYear() - 1;
const END_YEAR = START_YEAR + 8;

export default {
  data() {
    const now = new Date();
    return {
      years: [],
      months: Array.from({ length: 12 }, (_, i) => i + 1),
      days: [],
      hours: Array.from({ length: 24 }, (_, i) => i),
      minutes: Array.from({ length: 60 }, (_, i) => i),

      selectedYear: now.getFullYear(),
      selectedMonth: now.getMonth() + 1,
      selectedDay: now.getDate(),
      selectedHour: now.getHours(),
      selectedMinute: now.getMinutes(),

      pickerValue: [0, 0, 0, 0, 0], // 初始选中索引（年/月/日/时/分）
      reminderText: '',
      formattedTime: this.formatDate(now),
      showTimePicker: false // 控制时间选择器显示状态
    };
  },

  computed: {
    currentDays() {
      // 计算当前月份的天数
      return new Date(this.selectedYear, this.selectedMonth, 0).getDate();
    }
  },

  created() {
    // 初始化可选年份（当前年份前1年到后8年）
    this.initYears();
    // 初始化当前月份的天数
    this.updateDays();
    // 设置选择器初始选中值
    this.setInitialPickerValue();
  },

  methods: {
    // 数字补零（如01, 02）
    formatNumber(n) {
      return n < 10 ? `0${n}` : n.toString();
    },

    // 格式化日期为显示字符串（YYYY-MM-DD HH:mm）
    formatDate(date) {
      return `${date.getFullYear()}-${this.formatNumber(date.getMonth() + 1)}-${this.formatNumber(date.getDate())} ${this.formatNumber(date.getHours())}:${this.formatNumber(date.getMinutes())}`;
    },

    // 初始化年份数组
    initYears() {
      this.years = Array.from(
        { length: END_YEAR - START_YEAR + 1 },
        (_, i) => START_YEAR + i
      );
    },

    // 更新月份对应的天数
    updateDays() {
      const daysInMonth = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
      this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    },

    // 设置选择器初始选中值（根据当前时间计算索引）
    setInitialPickerValue() {
      this.pickerValue = [
        this.years.indexOf(this.selectedYear), // 年份索引
        this.selectedMonth - 1, // 月份索引（从0开始）
        this.selectedDay - 1, // 日期索引（从0开始）
        this.selectedHour, // 小时索引
        this.selectedMinute // 分钟索引
      ];
    },

    // 处理选择器滑动变化事件
    handleTimeChange(e) {
      const [yearIdx, monthIdx, dayIdx, hourIdx, minuteIdx] = e.detail.value;
      
      // 更新选中的时间值
      this.selectedYear = this.years[yearIdx];
      this.selectedMonth = this.months[monthIdx];
      this.selectedDay = this.days[dayIdx];
      this.selectedHour = this.hours[hourIdx];
      this.selectedMinute = this.minutes[minuteIdx];

      // 当年/月变化时，重新计算天数并更新日期选择范围
      if (yearIdx !== this.pickerValue[0] || monthIdx !== this.pickerValue[1]) {
        this.updateDays();
        this.setInitialPickerValue(); // 重新设置日期索引（避免月份变化导致的天数越界）
      }
    },

    // 确认时间选择并关闭选择器
    confirmTime() {
      // 更新显示的时间
      this.formattedTime = this.formatDate(new Date(
        this.selectedYear,
        this.selectedMonth - 1, // 月份在Date中从0开始
        this.selectedDay,
        this.selectedHour,
        this.selectedMinute
      ));
      // 关闭选择器
      this.showTimePicker = false;
    },

    // 保存提醒事项
    async saveReminder() {
      // 检查提醒内容是否为空
      if (!this.reminderText.trim()) {
        uni.showToast({ title: '请输入提醒内容', icon: 'none' });
        return;
      }

      // 计算提醒时间戳
      const timestamp = new Date(
        this.selectedYear,
        this.selectedMonth - 1, // 月份在Date中从0开始
        this.selectedDay,
        this.selectedHour,
        this.selectedMinute
      ).getTime();

      try {
        let reminders = [];
        try {
          const { data } = await uni.getStorage({ key: 'reminders' });
          reminders = data;
        } catch (e) {
          if (e.errMsg.includes('data not found')) {
            // 若数据不存在，将 reminders 设为空数组
            reminders = [];
          } else {
            throw e;
          }
        }
        
        // 添加新提醒
        reminders.push({
          id: Date.now(),
          text: this.reminderText,
          time: timestamp,
          checked: false
        });

        // 保存到本地存储
        await uni.setStorage({ key: 'reminders', data: reminders });
        
        // 提示保存成功并返回
        uni.showToast({ title: '保存成功', icon: 'success' });
        setTimeout(() => uni.navigateBack(), 1500);
      } catch (error) {
        uni.showToast({ title: '保存失败', icon: 'none' });
      }
    }
  }
}
</script>

<style lang="scss">
/* 基础样式变量 */
$primary-color: #1e6eba; /* 主色 */
$secondary-color: #F0F9EB; /* 辅助背景色 */
$border-color: #E5E7EB; /* 边框色 */
$text-color: #333; /* 主文字色 */
$sub-text-color: #666; /* 次文字色 */

.container {
  padding: 24rpx;
  background: #F8F9FB;
  min-height: 100vh;
}

.form {
  .form-item {
    margin-bottom: 24rpx;
    background: #FFFFFF;
    border-radius: 20rpx;
    box-shadow: 0 6rpx 18rpx rgba(0, 0, 0, 0.03);
    overflow: hidden;

    &.time-picker-box {
      .time-display {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 24rpx 16rpx;
        font-size: 30rpx;
        color: $sub-text-color;
        cursor: pointer;
      }

      .time-picker-popup {
        padding: 24rpx;
        background: #FFFFFF;
        
        .picker-header {
          display: flex;
          justify-content: flex-end;
          padding-bottom: 16rpx;
          
          .cancel-btn, .confirm-btn {
            padding: 0 16rpx;
            height: 60rpx;
            line-height: 60rpx;
            font-size: 28rpx;
          }

          .cancel-btn {
            color: $sub-text-color;
          }

          .confirm-btn {
            color: $primary-color;
            font-weight: 600;
          }
        }

        .time-picker {
          height: 400rpx; /* 固定选择器高度 */
          
          .picker-view {
            height: 100%;
            
            .picker-column {
              align-items: center; /* 内容居中 */
              
              .picker-item {
                height: 72rpx;
                line-height: 72rpx;
                font-size: 30rpx;
                color: $text-color;
              }
            }

            .picker-indicator {
              height: 72rpx;
              border-color: $primary-color;
              background: linear-gradient(180deg, rgba($primary-color, 0.1) 0%, rgba($primary-color, 0.05) 100%);
            }
          }
        }
      }
    }

    &.content-box {
      padding: 24rpx;
      border: 2rpx solid $border-color;
    }

    .section-title {
      font-size: 32rpx;
      color: $text-color;
      font-weight: 600;
      padding: 0 0 16rpx 24rpx;
      background: $secondary-color;
    }

    .input-container {
      position: relative;
      
      .input-box {
        width: 100%;
        height: 100rpx;
        padding: 0 32rpx;
        font-size: 30rpx;
        border: none;
        border-radius: 16rpx;
        background: #F8F9FB;
        box-sizing: border-box;
        
        &::placeholder {
          color: #999;
          line-height: 1.2;
        }
      }

      .word-count {
        position: absolute;
        right: 24rpx;
        bottom: 24rpx;
        font-size: 24rpx;
        color: #999;
      }
    }
  }

  .save-btn {
    width: 100%;
    height: 96rpx;
    line-height: 96rpx;
    font-size: 34rpx;
    color: white;
    background: linear-gradient(135deg, $primary-color, #1e6eba);
    border-radius: 48rpx;
    box-shadow: 0 8rpx 24rpx rgba(39, 186, 152, 0.3);
    transition: all 0.3s;
    
    &:active {
      transform: scale(0.98);
      opacity: 0.9;
    }
  }
} 
</style>
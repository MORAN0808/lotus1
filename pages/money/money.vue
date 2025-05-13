<template>
  <view class="container">
    <!-- 统计头部 -->
    <scroll-view class="stats-bar" scroll-x>
      <view class="stat-card">
        <text class="stat-title">全部类型</text>
        <text class="stat-amount">88</text>
      </view>
      <view class="stat-card">
        <text class="stat-title">2025年</text>
        <view class="stat-row">
          <text class="expense">支出 359</text>
          <text class="income">收入 450</text>
        </view>
      </view>
      <view class="stat-card">
        <text class="stat-title">5月~</text>
        <text class="expense">359</text>
      </view>
    </scroll-view>

    <!-- 账单列表 -->
    <view class="bill-list">
      <view v-for="(group, date) in groupedBills" :key="date" class="bill-group">
        <view class="bill-date">{{ formatDate(date) }}</view>
        <view v-for="bill in group" :key="bill.id" class="bill-item">
          <view class="bill-left">
            <text class="bill-type">{{ bill.category }}</text>
            <text class="bill-category">{{ bill.subCategory }}</text>
          </view>
          <text :class="['bill-amount', bill.type]">
            {{ bill.type === 'income' ? '+' : '-' }}{{ bill.amount }}
          </text>
        </view>
      </view>
    </view>

    <!-- 记一笔按钮 -->
    <view class="add-btn" @click="navigateToMoney">
      <text class="add-icon">+</text>
      <text class="add-text">记一笔</text>
    </view>

    <!-- 底部导航 -->
    <view class="tab-bar">
      <view v-for="tab in tabs" :key="tab" :class="['tab-item', { active: activeTab === tab }]"
        @click="activeTab = tab">
        {{ tab }}
      </view>
    </view>
  </view>
</template>

<script setup>
  import {
    ref,
    computed
  } from 'vue';
  // 响应式数据
  const activeTab = ref('明细');
  const bills = ref([
    /*{
      id: 1,
      date: '2025-05-05',
      type: 'expense',
      category: '餐饮',
      subCategory: '',
      amount: 41
    },*/
    {
      id: 2,
      date: '2025-05-04',
      type: 'income',
      category: '其它收入',
      subCategory: '',
      amount: 300
    },
    {
      id: 3,
      date: '2025-05-03',
      type: 'expense',
      category: '购物',
      subCategory: '',
      amount: 100
    },
    {
      id: 4,
      date: '2025-05-02',
      type: 'income',
      category: '其它收入',
      subCategory: '转账',
      amount: 150
    },
    {
      id: 5,
      date: '2025-05-01',
      type: 'expense',
      category: '娱乐',
      subCategory: '',
      amount: 50
    },

    {
      id: 6,
      date: '2025-05-01',
      type: 'expense',
      category: '餐饮',
      subCategory: '水果',
      amount: 20
    },

  ]);

  // 计算属性
  const groupedBills = computed(() => {
    return bills.value.reduce((groups, bill) => {
      const date = bill.date;
      if (!groups[date]) groups[date] = [];
      groups[date].push(bill);
      return groups;
    }, {});
  });

  // 方法
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long'
    };
    return date.toLocaleDateString('zh-CN', options).replace(/\//g, '-');
  };

  const navigateToMoney = () => {
    uni.navigateTo({
      url: '/pages/money/mymoney' // 确保路径正确且页面存在
    });
  };
</script>

<style scoped>
  .container {
    padding-bottom: 100rpx;
  }

  /* 统计栏样式 */
  .stats-bar {
    white-space: nowrap;
    padding: 20rpx;
    background: #fff;
  }

  .stat-card {
    display: inline-block;
    width: 250rpx;
    padding: 20rpx;
    margin-right: 20rpx;
    background: #f5f5f5;
    border-radius: 10rpx;
  }

  .stat-title {
    display: block;
    color: #666;
    font-size: 28rpx;
  }

  .stat-amount {
    font-size: 36rpx;
    font-weight: bold;
  }

  .stat-row {
    display: flex;
    justify-content: space-between;
    margin-top: 10rpx;
  }

  .expense {
    color: #ff6b6b;
  }

  .income {
    color: #4cd964;
  }

  /* 账单列表样式 */
  .bill-list {
    padding: 0 20rpx;
  }

  .bill-group {
    margin-bottom: 30rpx;
  }

  .bill-date {
    color: #999;
    font-size: 26rpx;
    padding: 15rpx 0;
  }

  .bill-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25rpx;
    margin-bottom: 15rpx;
    background: #fff;
    border-radius: 10rpx;
  }

  .bill-left {
    flex: 1;
  }

  .bill-type {
    display: block;
    font-size: 32rpx;
    color: #333;
  }

  .bill-category {
    font-size: 24rpx;
    color: #999;
  }

  .bill-amount {
    font-size: 34rpx;
    font-weight: 500;
  }

  .bill-amount.income {
    color: #4cd964;
  }

  .bill-amount.expense {
    color: #ff6b6b;
  }

  /* 记一笔按钮 */
  .add-btn {
    position: fixed;
    bottom: 120rpx;
    right: 30rpx;
    display: flex;
    align-items: center;
    padding: 15rpx 30rpx;
    background: #1e6eba;
    border-radius: 50rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  }

  .add-icon {
    color: #fff;
    font-size: 40rpx;
    margin-right: 10rpx;
  }

  .add-text {
    color: #fff;
    font-size: 28rpx;
  }

  /* 底部导航 */
  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 100rpx;
    background: #fff;
    box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.05);
  }

  .tab-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    color: #666;
  }

  .tab-item.active {
    color: #1e6eba;
    font-weight: bold;
  }
</style>
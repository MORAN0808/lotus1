<template>
    <view class="my-userinfo-container">
        <view class="top-box">
            <image :src="userInfo.avatarUrl || '/static/default-avatar.png'" class="avatar"></image>
            <view class="nickname">{{ userInfo.nickName || '未登录用户' }}</view>
        </view>

        <!-- 数据统计面板 -->
        <view class="data-panel">
            <view class="panel-item">
                <text class="num">0次</text>
                <text class="label">次数</text>
            </view>
            <view class="panel-item">
                <text class="num">0.0KM</text>
                <text class="label">总里程</text>
            </view>
            <view class="panel-item">
                <text class="num">0天</text>
                <text class="label">天数</text>
            </view>
            <view class="panel-item">
                <text class="num">0元</text>
                <text class="label">总花费</text>
            </view>
        </view>

        <!-- 功能列表 -->
        <view class="menu-list">
            <view 
                class="menu-item" 
                v-for="(item, index) in menuItems" 
                :key="index"
                @click="handleMenuItemClick(index)"
            >
                <view class="item-left">
                    <uni-icons :type="item.checked ? 'checkbox-filled' : 'checkbox'" size="18" color="#666"></uni-icons>
                    <text>{{ item.label }}</text>
                </view>
                <uni-icons type="arrowright" size="15" color="#999"></uni-icons>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    // 接收父组件传递的用户信息
    props: ['userInfo'], 
    data() {
        return {
            stats: {
                count: 12,
                distance: 36.5,
                days: 7,
                cost: 258
            },
            menuItems: [
                { label: '行程提醒', checked: false },
                { label: '加入行程', checked: false },
                { label: '用户反馈', checked: false },
                { label: '退出登录', checked: false }
            ]
        };
    },
    methods: {
        handleMenuItemClick(index) {
            switch(index) {
                case 0:
                    this.$emit('navigate', '/pages/reminder/reminder');
                    break;
                case 3:
                    this.$emit('logout');
                    break;
            }
        }
    }
};
</script>

<style lang="scss">
.my-userinfo-container {
    min-height: 100vh;
    background-color: #f4f4f4;
    padding-bottom: 40rpx;

    .top-box {
        height: 280rpx;
        background-color: #27ba98;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 40rpx;

        .avatar {
            width: 160rpx;
            height: 160rpx;
            border-radius: 50%;
            border: 4rpx solid #fff;
            box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
            margin-bottom: 20rpx;
        }

        .nickname {
            font-size: 36rpx;
            color: #fff;
            font-weight: 500;
        }
    }

    .data-panel {
        display: flex;
        justify-content: space-around;
        background: #fff;
        margin: 20rpx;
        border-radius: 16rpx;
        padding: 30rpx 0;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

        .panel-item {
            display: flex;
            flex-direction: column;
            align-items: center;

            .num {
                font-size: 32rpx;
                color: #333;
                margin-bottom: 8rpx;
            }

            .label {
                font-size: 24rpx;
                color: #666;
            }
        }
    }

    .menu-list {
        background: #fff;
        margin: 20rpx;
        border-radius: 16rpx;

        .menu-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 28rpx 32rpx;
            border-bottom: 1rpx solid #eee;
            transition: all 0.2s;

            &:active {
                background-color: #f8f8f8;
            }

            &:last-child {
                border-bottom: none;
            }

            .item-left {
                display: flex;
                align-items: center;

                text {
                    margin-left: 20rpx;
                    font-size: 28rpx;
                    color: #333;
                }
            }
        }
    }
    .my-userinfo-container {
        .top-box {
            .avatar {
                background-color: #fff;
            }
        }

        .menu-item {
            &:active {
                transform: scale(0.98);
            }
        }
    }
}
</style>
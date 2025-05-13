<template>
    <view class="login-container">
        <view class="login-card">
            <image class="logo" src="/static/logo.png" mode="aspectFit"></image>
            <text class="title">欢迎使用</text>
            <button class="login-btn" type="primary" open-type="getUserInfo" @getuserinfo="wechatLogin">
                <uni-icons type="weixin" size="18" color="#fff"></uni-icons>
                微信一键登录
            </button>
        </view>
    </view>
</template>

<script>
export default {
    methods: {
        wechatLogin(e) {
            if (e.detail.userInfo) {
                uni.showLoading({ title: '登录中...', mask: true });
                uni.login({
                    provider: 'weixin',
                    success: (loginRes) => {
                        console.log('登录凭证:', loginRes.authResult);
                        uni.setStorageSync('loginToken', loginRes.authResult);
                        // 将用户信息传递给父组件
                        this.$emit('login-success', e.detail.userInfo); 
                        uni.hideLoading();
                        uni.showToast({ title: '登录成功', icon: 'success' });
                    },
                    fail: (err) => {
                        console.error('登录失败:', err);
                        uni.showToast({ title: '登录失败，请重试', icon: 'none' });
                    }
                });
            } else {
                uni.showToast({ title: '登录已取消', icon: 'none' });
            }
        }
    }
};
</script>

<style lang="scss">
.login-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #27ba98, #1a937b);

    .login-card {
        background: #fff;
        padding: 60rpx 50rpx;
        border-radius: 30rpx;
        width: 80%;
        box-shadow: 0 10rpx 30rpx rgba(0,0,0,0.1);
        text-align: center;

        .logo {
            width: 180rpx;
            height: 180rpx;
            margin-bottom: 40rpx;
        }

        .title {
            display: block;
            font-size: 40rpx;
            color: #333;
            margin-bottom: 60rpx;
            font-weight: 500;
        }

        .login-btn {
            height: 90rpx;
            line-height: 90rpx;
            border-radius: 45rpx;
            font-size: 32rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #07c160;

            uni-icons {
                margin-right: 15rpx;
            }
        }
    }
}
</style>
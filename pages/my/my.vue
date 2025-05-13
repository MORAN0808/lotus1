<template>
    <view class="my-container">
        <my-userinfo v-if="isLogin" :userInfo="userInfo" @navigate="handleNavigate" @logout="handleLogout"></my-userinfo> 
        <my-login v-else @login-success="handleLoginSuccess"></my-login>
    </view>
</template>

<script>
import myUserinfo from '@/uni_modules/my-userinfo/components/my-userinfo/my-userinfo.vue';
import myLogin from '@/uni_modules/my-login/components/my-login/my-login.vue';

export default {
    components: { myUserinfo, myLogin },
    data() {
        return {
            isLogin: false,
            userInfo: {}
        };
    },
    created() {
        this.checkLoginStatus();
    },
    methods: {
        checkLoginStatus() {
            const token = uni.getStorageSync('loginToken');
            this.isLogin = !!token;
        },
        handleNavigate(url) {
            uni.navigateTo({
                url: url,
                success: () => console.log('跳转成功'),
                fail: (err) => {
                    console.error('跳转失败:', err);
                    uni.reLaunch({
                        url: url,
                        success: () => console.log('reLaunch跳转成功'),
                        fail: (err) => {
                            console.error('reLaunch失败:', err);
                            uni.showToast({ title: '跳转失败，请重试', icon: 'none' });
                        }
                    });
                }
            });
        },
        handleLoginSuccess(userInfo) {
            this.isLogin = true;
            this.userInfo = userInfo;
        },
        handleLogout() {
            uni.removeStorageSync('loginToken');
            this.isLogin = false;
            this.userInfo = {};
            uni.showToast({ title: '已退出登录', icon: 'success' });
        }
    },
	
};
</script>

<style lang="scss">
page, .my-container {
    height: 100%;
}
</style>
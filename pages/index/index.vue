<template>
    <view class="home-page">
        <!-- 用户信息卡片 -->
        <view class="user-card">
            <image class="avatar" src="/static/logo.png" mode="aspectFill"></image>
            
            <view class="user-info">
                <view class="name-level">
                    <text class="username">编程小天才</text>
                    <view class="level-tag">
                        <text class="level-text">Lv.4</text>
                    </view>
                </view>

                <!-- 经验条 -->
                <view class="exp-wrapper">
                    <view class="exp-bar-bg">
                        <view class="exp-bar" :style="{ width: expPercent + '%' }"></view>
                    </view>
                    <text class="exp-num">{{ currentExp }}/{{ totalExp }}</text>
                </view>

                <text class="study-days">已学习 28 天</text>
            </view>

            <!-- 积分卡片 -->
            <view class="score-card">
                <text class="score-icon">💰</text>
                <text class="score-text">{{ userScore }}</text>
            </view>
        </view>

        <!-- 学伴机器人 -->
        <view class="robot-container">
            <view class="robot-box">
                <image v-if="hasBoundRobot" class="robot-ip" src="/static/robot.png" mode="aspectFill"></image>
                <view v-else class="robot-dash" @click="openSnModal">
                    <text class="bind-text">绑定学伴</text>
                </view>
            </view>
        </view>

        <!-- 开始学习按钮 -->
        <view class="start-btn-wrapper">
            <view class="start-btn">
                <text class="start-text">开始学习</text>
            </view>
        </view>

        <!-- SN激活弹窗 -->
        <view v-if="showSnModal" class="modal-overlay" @click="closeSnModal">
            <view class="modal-content" @click.stop>
                <view class="modal-header">
                    <view class="key-icon">🔑</view>
                    <text class="modal-title">激活机器人</text>
                    <text class="modal-subtitle">请输入您的SN激活码，解锁机器人</text>
                </view>

                <view class="input-group">
                    <text class="input-label">请输入SN码</text>
                    <view class="input-box">
                        <text class="input-icon">🔒</text>
                        <input 
                            class="sn-input" 
                            v-model="snCode" 
                            placeholder="请输入SN激活码"
                            type="text"
                        />
                    </view>
                </view>

                <view class="tip-box">
                    <text class="tip-icon">ℹ️</text>
                    <text class="tip-text">SN码区分大小写，请确保输入完全一致。激活后将绑定当前账号。</text>
                </view>

                <view class="modal-btns">
                    <view class="btn-primary" @click="activateRobot">
                        <text class="btn-text">立即激活</text>
                    </view>
                    <view class="btn-secondary" @click="closeSnModal">
                        <text class="btn-text">稍后激活</text>
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
            hasBoundRobot: false,
            userScore: 1688,
            currentExp: 280,
            totalExp: 500,
            expPercent: 56,
            showSnModal: false,
            snCode: ''
        }
    },
    methods: {
        openSnModal() {
            this.showSnModal = true
            this.snCode = ''
        },
        closeSnModal() {
            this.showSnModal = false
        },
        activateRobot() {
            // 去掉长度限制，只判断是否为空
            if (!this.snCode || this.snCode.trim() === '') {
                uni.showToast({
                    title: 'SN无效',
                    icon: 'none',
                    duration: 2000
                })
                return
            }

            // 绑定成功：关闭弹窗 + 提示成功
            this.hasBoundRobot = true
            this.closeSnModal()
            uni.showToast({
                title: '绑定成功',
                icon: 'success'
            })
        }
    }
}
</script>

<style>
/* 页面一屏布局 */
.home-page {
    height: 100vh;
    background: linear-gradient(180deg, #ff8c42, #ff6b35);
    padding: 50rpx 30rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
}

/* 用户卡片 */
.user-card {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 24rpx;
    padding: 30rpx;
    display: flex;
    align-items: center;
    gap: 24rpx;
    backdrop-filter: blur(10rpx);
}

/* 头像 */
.avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    flex-shrink: 0;
}

/* 用户信息区 */
.user-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12rpx;
}

/* 名字 + 等级 */
.name-level {
    display: flex;
    align-items: center;
    gap: 16rpx;
}
.username {
    font-size: 34rpx;
    color: #fff;
    font-weight: bold;
}
.level-tag {
    background: #ffd700;
    padding: 6rpx 14rpx;
    border-radius: 50rpx;
}
.level-text {
    font-size: 22rpx;
    color: #333;
    font-weight: bold;
}

/* 经验条 */
.exp-wrapper {
    display: flex;
    align-items: center;
    gap: 16rpx;
}
.exp-bar-bg {
    flex: 1;
    height: 14rpx;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 7rpx;
    overflow: hidden;
}
.exp-bar {
    height: 100%;
    background: #ffd700;
    border-radius: 7rpx;
    transition: 0.3s;
}
.exp-num {
    font-size: 22rpx;
    color: rgba(255, 255, 255, 0.9);
    white-space: nowrap;
}

.study-days {
    font-size: 24rpx;
    color: rgba(255, 255, 255, 0.85);
}

/* 积分卡片 */
.score-card {
    background: rgba(255, 255, 255, 0.25);
    padding: 20rpx 26rpx;
    border-radius: 50rpx;
    display: flex;
    align-items: center;
    gap: 8rpx;
    flex-shrink: 0;
}
.score-icon {
    font-size: 28rpx;
}
.score-text {
    font-size: 26rpx;
    color: #fff;
    font-weight: bold;
}

/* 机器人区域 */
.robot-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.robot-box {
    width: 480rpx;
    height: 520rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.robot-ip {
    width: 100%;
    height: 100%;
    border-radius: 24rpx;
    object-fit: cover;
}
.robot-dash {
    width: 100%;
    height: 100%;
    border: 2rpx dashed rgba(255, 255, 255, 0.6);
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}
.bind-text {
    font-size: 28rpx;
    color: #fff;
}

/* 开始学习按钮 */
.start-btn-wrapper {
    display: flex;
    justify-content: center;
}
.start-btn {
    background: linear-gradient(135deg, #ffdf5f, #ffc800);
    border-radius: 100rpx;
    padding: 28rpx 80rpx;
    box-shadow: 0 12rpx 30rpx rgba(0, 0, 0, 0.15);
}
.start-text {
    font-size: 38rpx;
    font-weight: bold;
    color: #333;
}

/* 弹窗样式 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 30rpx;
}

.modal-content {
    width: 100%;
    max-width: 680rpx;
    background: #fff;
    border-radius: 32rpx;
    padding: 50rpx 40rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 30rpx;
}

.modal-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16rpx;
}

.key-icon {
    width: 120rpx;
    height: 120rpx;
    background: rgba(255, 140, 66, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50rpx;
}

.modal-title {
    font-size: 40rpx;
    font-weight: bold;
    color: #333;
}

.modal-subtitle {
    font-size: 28rpx;
    color: #666;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 16rpx;
}

.input-label {
    font-size: 30rpx;
    color: #333;
    font-weight: 500;
}

.input-box {
    display: flex;
    align-items: center;
    gap: 16rpx;
    border: 2rpx solid #f0f0f0;
    border-radius: 24rpx;
    padding: 28rpx 30rpx;
    background: #fafafa;
}

.input-icon {
    font-size: 32rpx;
    color: #999;
}

.sn-input {
    flex: 1;
    font-size: 30rpx;
    color: #333;
    background: transparent;
}
.sn-input::placeholder {
    color: #ccc;
}

.tip-box {
    background: #fff9e6;
    border-radius: 16rpx;
    padding: 24rpx;
    display: flex;
    align-items: flex-start;
    gap: 12rpx;
}

.tip-icon {
    font-size: 32rpx;
    color: #ff9800;
    flex-shrink: 0;
}

.tip-text {
    font-size: 26rpx;
    color: #b45309;
    line-height: 1.5;
}

.modal-btns {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
}

.btn-primary {
    background: linear-gradient(135deg, #ff8c42, #ff6b35);
    border-radius: 50rpx;
    padding: 28rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-secondary {
    background: #f5f5f5;
    border-radius: 50rpx;
    padding: 28rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-text {
    font-size: 32rpx;
    font-weight: bold;
}
.btn-primary .btn-text {
    color: #fff;
}
.btn-secondary .btn-text {
    color: #666;
}
</style>
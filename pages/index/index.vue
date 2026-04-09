<template>
    <view class="home-page">
        <!-- 用户信息卡片 -->
        <view class="user-card">
            <image class="avatar" src="/static/logo.png" mode="aspectFill"></image>
            
            <view class="user-info">
                <view class="name-level">
                    <text class="username">编程小天才</text>
                    <text class="level-text">Lv.4</text>
                </view>

                <!-- 经验条 + 右侧数值 -->
                <view class="exp-wrapper">
                    <view class="exp-bar-bg">
                        <view class="exp-bar" :style="{ width: expPercent + '%' }"></view>
                    </view>
                    <text class="exp-num">{{ currentExp }}/{{ totalExp }}</text>
                </view>

                <!-- 学习天数 + 积分 同一行 -->
                <view class="bottom-row">
                    <text class="study-days">已学习 28 天</text>
                    <view class="score-card">
                        <image class="score-icon-image" src="/static/icon/integral.png"></image>
						<text class="score-icon-text">积分:</text>
                        <text class="score-text">{{ userScore }}</text>
                    </view>
                </view>
            </view>
        </view>

        <!-- 学伴机器人 -->
        <view class="robot-container">
            <view class="robot-box">
                <!-- 纯CSS学伴机器人IP -->
                <view v-if="hasBoundRobot" class="robot-ip css-robot">
                    <view class="robot-body-wrap">
                        <view class="robot-antenna">
                            <view class="antenna-light"></view>
                        </view>
                        <view class="robot-head">
                            <view class="robot-eyes">
                                <view class="eye left"></view>
                                <view class="eye right"></view>
                            </view>
                            <view class="robot-mouth"></view>
                        </view>
                        <view class="robot-body">
                            <view class="robot-screen"></view>
                        </view>
                    </view>
                </view>

                <!-- 未绑定：虚线框 -->
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
                    <view class="key-icon"><image class="modal-img robot-img" src="/static/icon/robot.png"></image></view>
                    <text class="modal-title">激活机器人</text>
                    <text class="modal-subtitle">请输入您的SN激活码，解锁机器人</text>
                </view>

                <view class="input-group">
                    <text class="input-label">请输入SN码</text>
                    <view class="input-box">
                        <text class="input-icon"><image class="modal-img sn-img" src="/static/icon/SN.png"></image></text>
                        <input 
                            class="sn-input" 
                            v-model="snCode" 
                            placeholder="请输入SN激活码"
                            type="text"
                        />
                    </view>
                </view>

                <view class="tip-box">
                    <view class="tip-icon"><image class="modal-img tip-img" src="/static/icon/tip.png"></image></view>
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
            if (!this.snCode || this.snCode.trim() === '') {
                uni.showToast({
                    title: 'SN无效',
                    icon: 'none',
                    duration: 2000
                })
                return
            }
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
/* 页面高度 = 全屏 - 底部导航栏100rpx（可自己改高度） */
.home-page {
    height: calc(100vh - 100rpx);
    max-height: calc(100vh - 100rpx);
    overflow: hidden;
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
    gap: 16rpx;
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
/* 等级黄色字体 */
.level-text {
    font-size: 24rpx;
    color: #ffd700;
    font-weight: bold;
}

/* 经验条 + 右侧数值 */
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

/* 学习天数 + 积分 同一行 */
.bottom-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.study-days {
    font-size: 24rpx;
    color: rgba(255, 255, 255, 0.85);
}

/* 积分卡片 */
.score-card {
    padding: 10rpx 16rpx;
    border-radius: 50rpx;
    display: flex;
    align-items: center;
    gap: 8rpx;
    flex-shrink: 0;
}
/* 积分图标大小控制 */
.score-icon-image{
	width: 30rpx;
	height: 30rpx;
    object-fit: contain;
}
.score-icon-text{
	font-size: 26rpx;
	color: #fff;
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

/* 绑定后机器人容器 */
.robot-ip {
    width: 100%;
    height: 100%;
    border-radius: 24rpx;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 未绑定虚线框 */
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

/* ===================== 纯CSS学伴机器人IP形象 ===================== */
.css-robot {
    display: flex;
    align-items: center;
    justify-content: center;
}
.robot-body-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* 天线 */
.robot-antenna {
    width: 6rpx;
    height: 50rpx;
    background: #fff;
    position: relative;
    border-radius: 4rpx;
    margin-bottom: -8rpx;
}
.antenna-light {
    width: 20rpx;
    height: 20rpx;
    background: #ffd700;
    border-radius: 50%;
    position: absolute;
    top: -10rpx;
    left: -7rpx;
    animation: lightFlash 2s infinite;
}

/* 头部 */
.robot-head {
    width: 200rpx;
    height: 180rpx;
    background: #ffffff;
    border-radius: 50% 50% 45% 45%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    box-shadow: 0 8rpx 0 rgba(0,0,0,0.1);
}

/* 眼睛 */
.robot-eyes {
    display: flex;
    gap: 50rpx;
    margin-top: 60rpx;
}
.eye {
    width: 36rpx;
    height: 36rpx;
    background: #333;
    border-radius: 50%;
    position: relative;
    animation: blink 4s infinite;
}
.eye::after {
    content: '';
    width: 12rpx;
    height: 12rpx;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    top: 6rpx;
    right: 6rpx;
}

/* 嘴巴 */
.robot-mouth {
    width: 50rpx;
    height: 25rpx;
    border-bottom: 6rpx solid #333;
    border-radius: 0 0 50% 50%;
    margin-top: 24rpx;
}

/* 身体 */
.robot-body {
    width: 240rpx;
    height: 160rpx;
    background: #ff6b35;
    border-radius: 40rpx;
    margin-top: -20rpx;
    box-shadow: 0 10rpx 0 rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 胸口屏幕 */
.robot-screen {
    width: 120rpx;
    height: 70rpx;
    background: #fff;
    border-radius: 20rpx;
}

/* 眨眼动画 */
@keyframes blink {
    0%,90%,100% { height: 36rpx; }
    95% { height: 6rpx; }
}

/* 天线灯闪烁 */
@keyframes lightFlash {
    0%,100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.9); }
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
    align-items: center;
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

/* ========== 弹窗图片大小统一适配 ========== */
.modal-img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
/* 弹窗顶部机器人图标 */
.robot-img{
    width: 60rpx !important;
    height: 60rpx !important;
}
/* SN输入框图标 */
.sn-img{
    width: 28rpx !important;
    height: 28rpx !important;
}
/* 提示框图标 */
.tip-img{
    width: 32rpx !important;
    height: 32rpx !important;
}
</style>
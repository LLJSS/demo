<template>
    <view class="container">
        <!-- 顶部项目信息卡片 -->
        <view class="project-header">
            <view class="header-top">
                <view class="title-section">
                    <text class="project-title">电商项目</text>
                    <view class="tags">
                        <text class="tag">初级难度</text>
                        <text class="tag">预计2小时</text>
                        <text class="tag">可获得50积分</text>
                    </view>
                </view>
                <view class="icon-box">
                    <text class="icon">📊</text>
                </view>
            </view>
            
            <!-- 进度条 -->
            <view class="progress-section">
                <view class="progress-bar">
                    <view class="progress-fill" :style="{width: progress + '%'}"></view>
                </view>
                <view class="progress-info">
                    <text class="progress-text">已完成{{progress}}%</text>
                    <text class="steps-text">还需完成{{totalSteps - completedSteps}}步</text>
                </view>
            </view>
        </view>
        
        <!-- 项目介绍卡片 -->
        <view class="intro-card">
            <view class="card-header">
                <view class="header-icon">
                    <text class="icon-num">1</text>
                </view>
                <text class="header-title">项目介绍</text>
            </view>
            <text class="intro-text">
                在这个项目中，你将使用Java语言开发一个功能完整的计算器程序，实现加减乘除等基本运算功能。通过这个项目巩固你所学的Java基础语法知识，锻炼实际编程能力。
            </text>
            <view class="tech-tags">
                <text class="tech-tag java">Java</text>
                <text class="tech-tag mysql">MySQL</text>
                <text class="tech-tag nacos">nacos</text>
                <text class="tech-tag springboot">Spring Boot</text>
            </view>
        </view>
        
        <!-- 项目关卡卡片 -->
        <view class="levels-card">
            <view class="card-title">项目关卡</view>
            <view class="levels-grid">
                <view class="level-item completed" v-for="item in completedLevels" :key="item">
                    <view class="star completed-star">
                        <text class="star-num">{{item}}</text>
                    </view>
                </view>
                <view class="level-item locked" v-for="item in lockedLevels" :key="item">
                    <view class="star locked-star">
                        <text class="star-num">{{item}}</text>
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
            progress: 30,
            completedSteps: 2,
            totalSteps: 7,
            completedLevels: [1, 2, 3],
            lockedLevels: [4, 5, 6]
        }
    }
}
</script>

<style scoped>
.container {
    background-color: #f5f5f5;
    min-height: 100vh;
    padding: 20rpx;
}

/* 顶部项目信息 */
.project-header {
    background: linear-gradient(135deg, #ff9a56 0%, #ff6b35 100%);
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    color: #fff;
}

.header-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 30rpx;
}

.title-section {
    flex: 1;
}

.project-title {
    font-size: 40rpx;
    font-weight: bold;
    display: block;
    margin-bottom: 20rpx;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10rpx;
}

.tag {
    background-color: rgba(255, 255, 255, 0.25);
    padding: 8rpx 16rpx;
    border-radius: 20rpx;
    font-size: 22rpx;
}

.icon-box {
    width: 100rpx;
    height: 100rpx;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon {
    font-size: 50rpx;
}

/* 进度条 */
.progress-section {
    margin-top: 20rpx;
}

.progress-bar {
    height: 12rpx;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 6rpx;
    overflow: hidden;
    margin-bottom: 15rpx;
}

.progress-fill {
    height: 100%;
    background-color: #fff;
    border-radius: 6rpx;
    transition: width 0.3s;
}

.progress-info {
    display: flex;
    justify-content: space-between;
    font-size: 24rpx;
}

/* 项目介绍卡片 */
.intro-card {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
}

.card-header {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
}

.header-icon {
    width: 40rpx;
    height: 40rpx;
    background-color: #ff9a56;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15rpx;
}

.icon-num {
    color: #fff;
    font-size: 24rpx;
    font-weight: bold;
}

.header-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
}

.intro-text {
    font-size: 26rpx;
    color: #666;
    line-height: 1.8;
    margin-bottom: 25rpx;
}

.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 15rpx;
}

.tech-tag {
    padding: 10rpx 25rpx;
    border-radius: 30rpx;
    font-size: 24rpx;
}

.tech-tag.java {
    background-color: #fff3e0;
    color: #ff9800;
}

.tech-tag.mysql {
    background-color: #e3f2fd;
    color: #2196f3;
}

.tech-tag.nacos {
    background-color: #e8f5e9;
    color: #4caf50;
}

.tech-tag.springboot {
    background-color: #f3e5f5;
    color: #9c27b0;
}

/* 项目关卡卡片 */
.levels-card {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
}

.card-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 30rpx;
}

.levels-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30rpx;
}

.level-item {
    display: flex;
    justify-content: center;
}

.star {
    width: 100rpx;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.completed-star {
    background-color: #ffd700;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

.locked-star {
    background-color: #e0e0e0;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

.star-num {
    font-size: 32rpx;
    font-weight: bold;
    z-index: 1;
}

.completed-star .star-num {
    color: #fff;
}

.locked-star .star-num {
    color: #999;
}
</style>
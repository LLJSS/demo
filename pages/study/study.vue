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
                    <text class="steps-text">还需完成{{totalSteps - completedSteps}}关</text>
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

        <!-- 项目关卡卡片 - 默认显示 -->
        <view class="levels-card" v-if="!showStepDetail">
            <view class="card-title">项目关卡</view>
            <view class="levels-grid">
                <view class="level-item"
                      :class="{completed: item.isCompleted}"
                      v-for="item in levels" :key="item.levelNum"
                      @click="goToStep(item.levelNum)">
                    <view class="level-box" :class="{completed: item.isCompleted}">
                        <text class="level-text">{{item.levelNum}}</text>
                    </view>
                    <!-- 仅已完成显示分数 -->
                    <view class="level-score" v-if="item.isCompleted">
                        <text class="score-text">{{item.score}}分</text>
                    </view>
                </view>
            </view>
        </view>

        <!-- 项目步骤卡片 - 点击关卡后显示 -->
        <view class="step-detail-card" v-else>
            <view class="step-header">
                <view class="back-text" @click="backToLevel">
                    <text class="back-icon">←</text>
                    <text class="back-text-title">返回关卡</text>
                </view>
                <text class="header-title">第{{currentLevel}}关 · 需求分析</text>
            </view>
            
            <!-- 关卡具体功能 -->
            <view class="step-title">关卡具体功能</view>

            <!-- 步骤列表（最后一步为作业） -->
            <view class="step-list">
                <view class="step-item"
                      :class="{done: item.done, current: item.current}"
                      v-for="(item, index) in currentStepList" :key="index">
                    <view class="step-index">{{index + 1}}</view>
                    <view class="step-info">
                        <text class="step-name">{{item.name}}</text>
                        <text class="step-desc" v-if="item.desc">{{item.desc}}</text>
                        
                        <!-- 课程交流折叠 -->
                        <view class="chat-section" v-if="item.chatRecords && item.chatRecords.length > 0">
                            <view class="chat-header" @click="toggleChat(index)">
                                <text class="chat-title">课程交流</text>
                                <text class="chat-toggle" :class="{rotate: item.isChatOpen}">▼</text>
                            </view>
                            <view class="chat-content" v-if="item.isChatOpen">
                                <view class="chat-bubble.server" v-for="(msg, msgIndex) in item.chatRecords" :key="msgIndex">
                                    <view class="avatar">💬</view>
                                    <view class="message">
                                        <text class="msg-content">{{msg.content}}</text>
                                        <text class="msg-time">{{msg.time}}</text>
                                    </view>
                                </view>
                                <view class="chat-bubble.user" v-for="(msg, msgIndex) in item.userChatRecords" :key="msgIndex">
                                    <view class="message">
                                        <text class="msg-content">{{msg.content}}</text>
                                        <text class="msg-time">{{msg.time}}</text>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 关卡评价 -->
            <view class="robot-eval-section">
                <view class="robot-header">
                    <text class="robot-title">关卡评价</text>
                </view>
                <view class="robot-content">
                    <text class="eval-text">{{robotEval}}</text>
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
            levels: [
                { levelNum: 1, isCompleted: true, score: 85 },
                { levelNum: 2, isCompleted: true, score: 92 },
                { levelNum: 3, isCompleted: true, score: 88 },
                { levelNum: 4, isCompleted: false, score: 0 },
                { levelNum: 5, isCompleted: false, score: 0 },
                { levelNum: 6, isCompleted: false, score: 0 }
            ],
            showStepDetail: false,
            currentLevel: 1,
            currentStepList: [],
            // 学伴机器人评价内容
            robotEval: "本关卡主要练习项目初始化与数据库基础配置，重点掌握 Spring Boot 工程结构和 MyBatis 映射规范。完成作业后建议自测接口连通性，确保环境可正常运行。遇到配置错误可以先检查 yml 格式和依赖引入。"
        }
    },
    onLoad() {
        this.goToStep(1);
    },
    methods: {
        goToStep(level) {
            this.currentLevel = level;
            this.showStepDetail = true;
            this.currentStepList = [
                {
                    name: "创建项目工程",
                    desc: "使用Spring Initializr创建Maven项目",
                    done: true,
                    isChatOpen: false,
                    chatRecords: [
                        { content: "你好呀！今天准备学习什么Java知识呢？我可以帮你解答编程问题，讲解知识点哦！", time: "10:30" }
                    ],
                    userChatRecords: [
                        { content: "我想知道Java里的if语句怎么用？", time: "10:32" }
                    ]
                },
                {
                    name: "配置数据库连接",
                    desc: "配置application.yml，连接MySQL",
                    done: true,
                    isChatOpen: false,
                    chatRecords: [
                        { content: "你好！接下来我们配置数据库连接，你有什么具体问题吗？", time: "11:00" }
                    ],
                    userChatRecords: []
                },
                {
                    name: "编写实体类与Mapper",
                    desc: "创建User、Order实体类，实现MyBatis-Plus CRUD",
                    current: true,
                    isChatOpen: false,
                    chatRecords: [
                        { content: "实体类是数据库表映射的核心，你需要注意属性名与字段的对应关系...", time: "14:20" }
                    ],
                    userChatRecords: []
                },
                {
                    name: "完成本章作业",
                    desc: "完成项目搭建、配置文件编写与实体类开发",
                    done: false,
                    isChatOpen: false,
                    chatRecords: [],
                    userChatRecords: []
                }
            ];
        },
        backToLevel() {
            this.showStepDetail = false;
        },
        toggleChat(index) {
            this.currentStepList[index].isChatOpen = !this.currentStepList[index].isChatOpen;
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
.progress-section {
    margin-top: 20rpx;
}
.progress-bar {
    height: 12rpx;
    background-color: #ffffff;
    border-radius: 6rpx;
    overflow: hidden;
    margin-bottom: 15rpx;
}
.progress-fill {
    height: 100%;
    background-color: #4cd964;
    border-radius: 6rpx;
    transition: width 0.3s;
}
.progress-info {
    display: flex;
    justify-content: space-between;
    font-size: 24rpx;
}
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
    flex-direction: column;
    align-items: center;
    padding: 20rpx;
    border-radius: 16rpx;
    cursor: pointer;
}
.level-item.completed {
    background-color: #fafafa;
}
.level-box {
    width: 100rpx;
    height: 100rpx;
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15rpx;
    transition: all 0.3s;
}
.level-box.completed {
    background-color: #ff9a56;
}
.level-box:not(.completed) {
    background-color: #e0e0e0;
}
.level-text {
    font-size: 36rpx;
    font-weight: bold;
    color: #fff;
}
.level-score {
    background-color: #fff3e0;
    padding: 6rpx 16rpx;
    border-radius: 20rpx;
}
.score-text {
    font-size: 24rpx;
    color: #ff9a56;
    font-weight: bold;
}
.step-detail-card {
    background-color: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10rpx); }
    to { opacity: 1; transform: translateY(0); }
}
.step-header {
    position: relative;
    margin-bottom: 30rpx;
    text-align: center;
}
.back-text {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    color: #666;
    font-size: 26rpx;
}
.back-icon {
    margin-right: 6rpx;
    font-size: 28rpx;
}
.back-text-title {
    font-size: 26rpx;
}
.step-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 25rpx;
}
.step-list {
    padding-left: 10rpx;
    margin-bottom: 40rpx;
}
.step-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 30rpx;
    position: relative;
    padding-bottom: 15rpx;
    border-bottom: 1rpx solid #f0f0f0;
}
.step-item:last-child {
    border-bottom: none;
}
.step-index {
    width: 44rpx;
    height: 44rpx;
    border-radius: 50%;
    background-color: #eee;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    font-weight: bold;
    margin-right: 20rpx;
    flex-shrink: 0;
}
.step-info {
    flex: 1;
}
.step-name {
    font-size: 28rpx;
    font-weight: 500;
    color: #333;
    display: block;
    margin-bottom: 6rpx;
}
.step-desc {
    font-size: 24rpx;
    color: #888;
    line-height: 1.6;
    display: block;
    margin-bottom: 15rpx;
}
.step-item.done .step-index {
    background-color: #4cd964;
    color: #fff;
}
.step-item.current .step-index {
    background-color: #ff9a56;
    color: #fff;
}
.chat-section {
    margin-top: 15rpx;
    border-top: 1rpx solid #f5f5f5;
    padding-top: 15rpx;
}
.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10rpx 0;
    cursor: pointer;
}
.chat-title {
    font-size: 24rpx;
    color: #666;
    font-weight: 500;
}
.chat-toggle {
    font-size: 20rpx;
    color: #999;
    transition: transform 0.3s;
}
.chat-toggle.rotate {
    transform: rotate(180deg);
}
.chat-content {
    margin-top: 15rpx;
}
.chat-bubble {
    display: flex;
    margin-bottom: 15rpx;
    max-width: 85%;
}
.chat-bubble.server {
    flex-direction: row;
}
.chat-bubble.user {
    flex-direction: row-reverse;
    margin-left: auto;
}
.avatar {
    width: 40rpx;
    height: 40rpx;
    background: #f5f5f5;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10rpx;
    flex-shrink: 0;
}
.message {
    background: #f8f9fa;
    border-radius: 12rpx;
    padding: 15rpx 20rpx;
    position: relative;
}
.chat-bubble.user .message {
    background: #e0f7fa;
}
.msg-content {
    font-size: 24rpx;
    color: #333;
    line-height: 1.5;
    display: block;
}
.msg-time {
    font-size: 20rpx;
    color: #999;
    display: block;
    margin-top: 5rpx;
    text-align: right;
}
.robot-eval-section {
    margin-top: 30rpx;
    padding: 25rpx;
    background-color: #fefbf5;
    border: 1rpx solid #ffe4c4;
    border-radius: 16rpx;
}
.robot-header {
    margin-bottom: 15rpx;
}
.robot-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #ff6b35;
}
.robot-content {
    line-height: 1.7;
}
.eval-text {
    font-size: 24rpx;
    color: #333;
}
</style>
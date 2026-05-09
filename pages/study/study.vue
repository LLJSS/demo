<template>
    <view class="container">
        <view v-if="loading" class="loading-box">
            <text class="loading-text">正在加载学习中心...</text>
        </view>

        <view v-else-if="errorMessage" class="error-box">
            <text class="error-text">{{ errorMessage }}</text>
            <view class="retry-btn" @click="loadProjectDetail">
                <text class="retry-text">重新加载</text>
            </view>
        </view>

        <view v-else>
            <view class="project-header">
                <view class="header-top">
                    <view class="title-section">
                        <text class="project-title">{{ projectTitle }}</text>
                        <view class="tags">
                            <text class="tag">{{ difficultyText }}</text>
                            <text class="tag">预计{{ estimatedHoursText }}</text>
                            <text class="tag">可获得{{ totalPointsText }}积分</text>
                        </view>
                    </view>
                    <view class="icon-box">
                        <image :src="coverImage" class="top-logo" mode="aspectFill"></image>
                    </view>
                </view>

                <view class="progress-section">
                    <view class="progress-bar">
                        <view class="progress-fill" :style="{width: progress + '%'}"></view>
                    </view>
                    <view class="progress-info">
                        <text class="progress-text">已完成{{ progress }}%</text>
                        <text class="steps-text">还需完成{{ remainingLevels }}关</text>
                    </view>
                </view>
            </view>

            <view class="intro-card">
                <view class="card-header">
                    <view class="header-icon">
                        <image src="/static/icon/introduction.png" class="intro-icon"></image>
                    </view>
                    <text class="header-title">项目介绍</text>
                </view>
                <text class="intro-text">{{ projectIntro }}</text>
            </view>

            <view class="levels-card" v-if="!showStepDetail">
                <view class="card-title">项目关卡</view>
                <view class="levels-grid">
                    <view class="level-item"
                          :class="{completed: item.isCompleted}"
                          v-for="item in levels" :key="item.levelId"
                          @click="goToStep(item)">
                        <view class="level-box" :class="{completed: item.isCompleted}">
                            <text class="level-text">{{ item.levelNum }}</text>
                        </view>
                        <view class="level-score" v-if="item.isCompleted">
                            <text class="score-text">{{ item.score }}分</text>
                        </view>
                    </view>
                </view>
            </view>

            <view class="step-detail-card" v-else>
                <view class="step-header">
                    <view class="back-text" @click="backToLevel">
                        <text class="back-icon">←</text>
                        <text class="back-text-title">返回关卡</text>
                    </view>
                    <text class="header-title step-title-ellipsis">第{{ currentLevelNum }}关 · {{ currentLevelTitle }}</text>
                </view>

                <view class="step-title">关卡步骤</view>

                <view class="step-list">
                    <view class="step-item"
                          :class="{done: item.done, current: item.current}"
                          v-for="(item, index) in currentStepList" :key="item.stepsId || index">
                        <view class="step-index">{{ index + 1 }}</view>
                        <view class="step-info">
                            <text class="step-name">{{ item.name }}</text>
                            <text class="step-desc" v-if="item.desc">{{ item.desc }}</text>

                            <view class="chat-section" v-if="item.chatRecords && item.chatRecords.length > 0">
                                <view class="chat-header" @click="toggleChat(index)">
                                    <text class="chat-title">课程交流</text>
                                    <view class="chat-header-right">
                                        <text class="chat-count">{{ item.chatRecords.length }}条</text>
                                        <text class="chat-toggle" :class="{rotate: item.isChatOpen}">▼</text>
                                    </view>
                                </view>
                                <transition name="chat-fade">
                                    <view class="chat-content" v-if="item.isChatOpen">
                                        <view class="chat-bubble"
                                              :class="message.senderType === 1 ? 'user' : 'robot'"
                                              v-for="(message, msgIndex) in item.chatRecords"
                                              :key="message.chatMessagesId || msgIndex">
                                            <image :src="message.senderType === 1 ? '/static/icon/communication_user.png' : '/static/icon/communication_robot.png'" class="chat-avatar"></image>
                                            <view class="message">
                                                <text class="msg-content">{{ message.content }}</text>
                                                <text class="msg-time">{{ formatChatTime(message.messageTime) }}</text>
                                            </view>
                                        </view>
                                    </view>
                                </transition>
                            </view>
                        </view>
                    </view>
                </view>

                <view class="robot-eval-section">
                    <view class="robot-header">
                        <text class="robot-title">关卡评价</text>
                    </view>
                    <view class="robot-content">
                        <text class="eval-text">{{ robotEval }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { get } from '../../utils/request.js'
import { getToken, getUserInfo } from '../../utils/auth.js'
import { BASE_URL } from '../../utils/config.js'

export default {
    data() {
        return {
            loading: false,
            errorMessage: '',
            showStepDetail: false,
            currentLevelNum: 0,
            currentLevelTitle: '',
            currentStepList: [],
            projectDetail: null,
            projectTitle: '学习中心',
            projectIntro: '正在加载项目介绍...',
            coverImage: '/static/logo.png',
            progress: 0,
            remainingLevels: 0,
            robotEval: '本关卡的学习内容和作业交流记录会在这里展示。',
            levels: []
        }
    },
    computed: {
        difficultyText() {
            const value = Number(this.projectDetail && this.projectDetail.difficultyLevel) || 0
            if (value === 1) return '初级难度'
            if (value === 2) return '中级难度'
            if (value === 3) return '高级难度'
            return '难度未知'
        },
        estimatedHoursText() {
            const value = Number(this.projectDetail && this.projectDetail.estimatedHours) || 0
            return value > 0 ? `${value}小时` : '未设置'
        },
        totalPointsText() {
            return Number(this.projectDetail && this.projectDetail.totalPointsReward) || 0
        }
    },
    onLoad() {
        this.loadProjectDetail()
    },
    onShow() {
        if (!getToken()) {
            uni.reLaunch({ url: '/pages/login/login' })
        }
    },
    methods: {
        resolveAvatarUrl(url) {
            if (!url) return '/static/logo.png'
            if (url.startsWith('http://') || url.startsWith('https://')) return url
            const base = (BASE_URL || '').replace(/\/$/, '')
            return base ? base + url : url
        },
        formatChatTime(time) {
            if (!time) return ''
            const value = String(time)
            return value.length >= 16 ? value.slice(11, 16) : value
        },
        normalizeProjectDetail(data) {
            this.projectDetail = data || null
            this.projectTitle = (data && data.title) || '学习中心'
            this.projectIntro = (data && data.description) || '暂无项目介绍'
            this.coverImage = this.resolveAvatarUrl(data && data.coverImage)

            const levels = ((data && data.levels) || []).slice().sort((a, b) => Number(a.levelNum || 0) - Number(b.levelNum || 0))
            const totalLevels = Number(data && data.totalLevel) || levels.length || 0
            const currentLevelId = Number(data && data.currentLevelId) || 0
            const currentProjectStatus = Number(data && data.projectStatus) || 0
            const completedLevels = currentProjectStatus === 2 ? totalLevels : (currentLevelId > 0 ? Math.min(currentLevelId, totalLevels) : 0)
            this.progress = totalLevels > 0 ? Math.round((completedLevels / totalLevels) * 100) : 0
            this.remainingLevels = Math.max(0, totalLevels - completedLevels)

            this.levels = levels.map((level) => {
                return {
                    levelId: level.levelId,
                    levelNum: level.levelNum,
                    title: level.title,
                    description: level.description,
                    points: level.points,
                    estimatedHours: level.estimatedHours,
                    score: Number(level.score) || 0,
                    isCompleted: Number(level.levelStatus) === 2 || Number(level.score) > 0 || Number(level.levelId) <= currentLevelId,
                    currentStepId: level.currentStepId,
                    steps: (level.steps || []).slice().sort((a, b) => Number(a.stepNum || 0) - Number(b.stepNum || 0))
                }
            })

            if (!this.levels.length) {
                this.showStepDetail = false
                this.currentStepList = []
                return
            }

            const matched = this.levels.find(item => item.levelId === currentLevelId) || this.levels[0]
            this.goToStep(matched, true)
        },
        async loadProjectDetail() {
            this.loading = true
            this.errorMessage = ''
            try {
                const info = getUserInfo() || {}
                const projectId = info.currentProjectId
                if (!projectId) {
                    this.errorMessage = '当前未绑定项目，请先在个人中心切换课程'
                    return
                }
                const res = await get('/api/project/customerDetail', { projectId }, { needAuth: true })
                if (res.code === 200 && res.data) {
                    this.normalizeProjectDetail(res.data)
                } else if (res.code === 200 && !res.data) {
                    this.errorMessage = '当前用户还没有绑定项目'
                } else {
                    this.errorMessage = res.message || '获取项目详情失败'
                }
            } catch (e) {
                if (e && e.message === 'unauthorized') return
                this.errorMessage = '获取项目详情失败，请稍后重试'
            } finally {
                this.loading = false
            }
        },
        goToStep(level, keepCurrent = false) {
            const matched = typeof level === 'object' ? level : this.levels.find(item => item.levelNum === level)
            if (!matched) return
            this.currentLevelNum = matched.levelNum
            this.currentLevelTitle = matched.title || `第${matched.levelNum}关`
            this.showStepDetail = true
            this.currentStepList = (matched.steps || []).map((step, index) => ({
                stepsId: step.stepsId,
                name: step.name,
                desc: step.content,
                done: Number(step.stepStatus) === 2,
                current: Number(step.stepStatus) === 1 || (index === 0 && !keepCurrent),
                isChatOpen: false,
                chatLoaded: false,
                chatRecords: (step.chatRecords || []).slice().sort((a, b) => {
                    const ta = a.messageTime ? new Date(a.messageTime).getTime() : 0
                    const tb = b.messageTime ? new Date(b.messageTime).getTime() : 0
                    return ta - tb
                })
            }))
            this.robotEval = matched.description || '该关卡暂无评价内容'
        },
        backToLevel() {
            this.showStepDetail = false
        },
        toggleChat(index) {
            this.currentStepList[index].isChatOpen = !this.currentStepList[index].isChatOpen
            this.currentStepList = this.currentStepList.slice()
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
.loading-box, .error-box {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.loading-text, .error-text {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 20rpx;
}
.retry-btn {
    padding: 20rpx 36rpx;
    background: #ff6b35;
    border-radius: 999rpx;
}
.retry-text { color: #fff; }
.project-header {
    background: linear-gradient(135deg, #ff9a56 0%, #ff6b35 100%);
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    color: #fff;
}
.header-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30rpx; }
.title-section { flex: 1; }
.project-title { font-size: 40rpx; font-weight: bold; display: block; margin-bottom: 20rpx; }
.tags { display: flex; flex-wrap: wrap; gap: 10rpx; }
.tag { background-color: rgba(255,255,255,0.25); padding: 8rpx 16rpx; border-radius: 20rpx; font-size: 22rpx; }
.icon-box { width: 100rpx; height: 100rpx; background-color: rgba(255,255,255,0.2); border-radius: 20rpx; display: flex; align-items: center; justify-content: center; }
.top-logo { width: 60rpx; height: 60rpx; object-fit: contain; }
.progress-section { margin-top: 20rpx; }
.progress-bar { height: 12rpx; background-color: #ffffff; border-radius: 6rpx; overflow: hidden; margin-bottom: 15rpx; }
.progress-fill { height: 100%; background-color: #4cd964; border-radius: 6rpx; transition: width 0.3s; }
.progress-info { display: flex; justify-content: space-between; font-size: 24rpx; }
.intro-card { background-color: #fff; border-radius: 20rpx; padding: 30rpx; margin-bottom: 20rpx; }
.card-header { display: flex; align-items: center; margin-bottom: 20rpx; }
.header-icon { width: 40rpx; height: 40rpx; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15rpx; }
.intro-icon { width: 35rpx; height: 35rpx; object-fit: contain; }
.header-title { font-size: 32rpx; font-weight: bold; color: #333; }
.intro-text { display: block; font-size: 26rpx; color: #666; line-height: 1.8; }
.levels-card { background-color: #fff; border-radius: 20rpx; padding: 30rpx; }
.card-title { font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 30rpx; }
.levels-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30rpx; }
.level-item { display: flex; flex-direction: column; align-items: center; padding: 20rpx; border-radius: 16rpx; }
.level-item.completed { background-color: #fafafa; }
.level-box { width: 100rpx; height: 100rpx; border-radius: 24rpx; display: flex; align-items: center; justify-content: center; margin-bottom: 15rpx; }
.level-box.completed { background-color: #ff9a56; }
.level-box:not(.completed) { background-color: #e0e0e0; }
.level-text { font-size: 36rpx; font-weight: bold; color: #fff; }
.level-score { background-color: #fff3e0; padding: 6rpx 16rpx; border-radius: 20rpx; }
.score-text { font-size: 24rpx; color: #ff9a56; font-weight: bold; }
.step-detail-card { background-color: #fff; border-radius: 20rpx; padding: 30rpx; animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10rpx); } to { opacity: 1; transform: translateY(0); } }
.step-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 30rpx; gap: 20rpx; }
.back-text { display: flex; align-items: center; color: #666; font-size: 26rpx; flex-shrink: 0; }
.back-icon { margin-right: 6rpx; font-size: 28rpx; }
.back-text-title { font-size: 26rpx; }
.step-header .header-title { flex: 1; text-align: right; font-size: 28rpx; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.step-title { font-size: 28rpx; font-weight: bold; color: #333; margin-bottom: 25rpx; }
.step-list { padding-left: 10rpx; margin-bottom: 40rpx; }
.step-item { display: flex; align-items: flex-start; margin-bottom: 30rpx; position: relative; padding-bottom: 15rpx; border-bottom: 1rpx solid #f0f0f0; }
.step-item:last-child { border-bottom: none; }
.step-index { width: 44rpx; height: 44rpx; border-radius: 50%; background-color: #eee; color: #666; display: flex; align-items: center; justify-content: center; font-size: 24rpx; font-weight: bold; margin-right: 20rpx; flex-shrink: 0; }
.step-info { flex: 1; }
.step-name { font-size: 28rpx; font-weight: 500; color: #333; display: block; margin-bottom: 6rpx; }
.step-desc { font-size: 24rpx; color: #888; line-height: 1.6; display: block; margin-bottom: 15rpx; }
.step-item.done .step-index { background-color: #4cd964; color: #fff; }
.step-item.current .step-index { background-color: #ff9a56; color: #fff; }
.chat-section { margin-top: 15rpx; border-top: 1rpx solid #f5f5f5; padding-top: 15rpx; }
.chat-header { display: flex; justify-content: space-between; align-items: center; padding: 10rpx 0; }
.chat-title { font-size: 24rpx; color: #666; font-weight: 500; }
.chat-header-right { display: flex; align-items: center; gap: 12rpx; }
.chat-count { font-size: 22rpx; color: #999; }
.chat-toggle { font-size: 20rpx; color: #999; transition: transform 0.3s; }
.chat-toggle.rotate { transform: rotate(180deg); }
.chat-content { margin-top: 15rpx; overflow: hidden; }
.chat-fade-enter-active, .chat-fade-leave-active { transition: all 0.22s ease; }
.chat-fade-enter, .chat-fade-leave-to { opacity: 0; transform: translateY(-8rpx); max-height: 0; }
.chat-fade-enter-to, .chat-fade-leave { opacity: 1; transform: translateY(0); max-height: 2000rpx; }
.chat-bubble { display: flex; align-items: flex-start; margin-bottom: 20rpx; width: 100%; box-sizing: border-box; }
.chat-bubble.robot { flex-direction: row; justify-content: flex-start; }
.chat-bubble.user { flex-direction: row-reverse; justify-content: flex-start; }
.chat-avatar { width: 40rpx; height: 40rpx; border-radius: 50%; flex-shrink: 0; margin: 0 8rpx; object-fit: cover; }
.message { padding: 18rpx 20rpx; border-radius: 16rpx; font-size: 26rpx; line-height: 1.5; position: relative; max-width: 520rpx; min-width: 0; box-sizing: border-box; overflow-wrap: anywhere; word-break: break-word; }
.chat-bubble.robot .message { background-color: #f1f1f1; color: #333; }
.chat-bubble.user .message { background-color: #d1e7ff; color: #333; margin-left: auto; }
.msg-content { display: block; white-space: normal; }
.msg-time { font-size: 20rpx; color: #999; display: block; margin-top: 6rpx; text-align: right; }
.robot-eval-section { margin-top: 30rpx; padding: 25rpx; background-color: #fefbf5; border: 1rpx solid #ffe4c4; border-radius: 16rpx; }
.robot-header { margin-bottom: 15rpx; }
.robot-title { font-size: 28rpx; font-weight: bold; color: #ff6b35; }
.robot-content { line-height: 1.7; }
.eval-text { font-size: 24rpx; color: #333; }
</style>

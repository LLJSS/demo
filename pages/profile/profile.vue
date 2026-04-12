<template>
	<view class="page">
		<!-- 顶部用户信息 -->
		<view class="header">
			<image class="avatar" src="/static/avatar.png"></image>
			<text class="username">编程小天才</text>
			<view class="level-badge">
				<text class="level-text">青铜程序员 Lv.3</text>
			</view>
		</view>

		<!-- 数据统计卡片 -->
		<view class="stats-card">
			<view class="stat-item">
				<text class="stat-value">42</text>
				<text class="stat-label">学习天数</text>
			</view>
			<view class="stat-item">
				<text class="stat-value">1280</text>
				<text class="stat-label">累积积分</text>
			</view>
			<view class="stat-item">
				<text class="stat-value">36</text>
				<text class="stat-label">获得勋章</text>
			</view>
		</view>

		<!-- 功能列表 -->
		<view class="menu-section">
			<view class="menu-item">
				<view class="menu-left">
					<image class="menu-icon-img green" src="/static/icon/medal.png"></image>
					<text class="menu-text">我的勋章</text>
				</view>
				<text class="arrow">›</text>
			</view>
			<view class="menu-item" @click="goToCourseSwitch">
				<view class="menu-left">
					<image class="menu-icon-img purple" src="/static/icon/switch.png"></image>
					<text class="menu-text">切换课程</text>
				</view>
				<text class="arrow">›</text>
			</view>
		</view>

		<!-- 学习数据图表 -->
		<view class="chart-section">
			<view class="section-header">
				<view class="header-left">
					<image class="chart-icon-img" src="/static/icon/data.png"></image>
					<text class="section-title">学习数据</text>
				</view>
				<text class="total-time">总时长：12.5小时</text>
			</view>
			<text class="chart-subtitle">近7天学习时长</text>
			
			<!-- 柱状图 -->
			<view class="bar-chart">
				<view class="bar-item">
					<view class="bar" style="height: 60rpx;"></view>
					<text class="bar-label">周一</text>
				</view>
				<view class="bar-item">
					<view class="bar" style="height: 40rpx;"></view>
					<text class="bar-label">周二</text>
				</view>
				<view class="bar-item">
					<view class="bar" style="height: 30rpx;"></view>
					<text class="bar-label">周三</text>
				</view>
				<view class="bar-item">
					<view class="bar" style="height: 80rpx;"></view>
					<text class="bar-label">周四</text>
				</view>
				<view class="bar-item">
					<view class="bar" style="height: 70rpx;"></view>
					<text class="bar-label">周五</text>
				</view>
				<view class="bar-item">
					<view class="bar" style="height: 50rpx;"></view>
					<text class="bar-label">周六</text>
				</view>
				<view class="bar-item">
					<view class="bar active" style="height: 100rpx;"></view>
					<text class="bar-label active">周日</text>
				</view>
			</view>
		</view>

		<!-- 已完成成就 -->
		<view class="achievements-section">
			<text class="section-title-small">已完成成就</text>
			<view class="achievement-list">
				<view class="achievement-item yellow">
					<text class="achievement-text">连续学习7天</text>
				</view>
				<view class="achievement-item blue">
					<text class="achievement-text">完成10门课程</text>
				</view>
				<view class="achievement-item pink">
					<text class="achievement-text">编写1000行代码</text>
				</view>
				<view class="achievement-item green">
					<text class="achievement-text">编程竞赛三等奖</text>
				</view>
			</view>
		</view>

		<!-- 设置列表 -->
		<view class="menu-section">
			<view class="menu-item" @click="goToSettings">
				<view class="menu-left">
					<image class="menu-icon-img gray" src="/static/icon/setting.png"></image>
					<text class="menu-text">设置</text>
				</view>
				<text class="arrow">›</text>
			</view>
			<view class="menu-item" @click="goToHelpFeedback">
				<view class="menu-left">
					<image class="menu-icon-img gray" src="/static/icon/help.png"></image>
					<text class="menu-text">帮助与反馈</text>
				</view>
				<text class="arrow">›</text>
			</view>
			<view class="menu-item">
				<view class="menu-left">
					<image class="menu-icon-img red" src="/static/icon/login_out.png"></image>
					<text class="menu-text danger">退出登录</text>
				</view>
				<text class="arrow">›</text>
			</view>
		</view>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            goToSettings() {
                uni.navigateTo({
                    url: '/pages/settings/settings'
                })
            },
            goToHelpFeedback() {
                uni.navigateTo({
                    url: '/pages/help-feedback/help-feedback'
                })
            },
            goToCourseSwitch() {
                uni.navigateTo({
                    url: '/pages/course-switch/course-switch'
                })
            }
        }
    }
</script>

<style>
	.page {
		min-height: 100vh;
		background: #f5f5f5;
		padding-bottom: 30rpx;
	}

	/* 顶部用户信息 */
	.header {
		background: linear-gradient(to bottom, #ff6b35, #ff8c42);
		padding: 60rpx 30rpx 80rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.avatar {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		border: 6rpx solid #ffffff;
		margin-bottom: 20rpx;
	}

	.username {
		font-size: 36rpx;
		font-weight: bold;
		color: #ffffff;
		margin-bottom: 15rpx;
	}

	.level-badge {
		background: rgba(255, 255, 255, 0.3);
		padding: 8rpx 24rpx;
		border-radius: 20rpx;
	}

	.level-text {
		font-size: 24rpx;
		color: #ffffff;
	}

	/* 数据统计卡片 */
	.stats-card {
		background: #ffffff;
		margin: -40rpx 30rpx 30rpx;
		border-radius: 20rpx;
		padding: 40rpx 20rpx;
		display: flex;
		justify-content: space-around;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.stat-value {
		font-size: 48rpx;
		font-weight: bold;
		color: #ff6b35;
		margin-bottom: 10rpx;
	}

	.stat-label {
		font-size: 24rpx;
		color: #999999;
	}

	/* 功能列表 */
	.menu-section {
		background: #ffffff;
		margin: 0 30rpx 30rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.menu-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		border-bottom: 2rpx solid #f0f0f0;
	}

	.menu-item:last-child {
		border-bottom: none;
	}

	.menu-left {
		display: flex;
		align-items: center;
	}

	/* 功能菜单图标大小 */
	.menu-icon-img {
		width: 36rpx;
		height: 36rpx;
		margin-right: 20rpx;
	}

	.menu-text {
		font-size: 30rpx;
		color: #333333;
	}


	.arrow {
		font-size: 48rpx;
		color: #cccccc;
	}

	/* 学习数据图表 */
	.chart-section {
		background: #ffffff;
		margin: 0 30rpx 30rpx;
		border-radius: 20rpx;
		padding: 30rpx;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.header-left {
		display: flex;
		align-items: center;
	}

	/* 图表标题图标大小 */
	.chart-icon-img {
		width: 38rpx;
		height: 38rpx;
		margin-right: 10rpx;
	}

	.section-title {
		display: contents;
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
	}

	.total-time {
		font-size: 24rpx;
		color: #999999;
	}

	.chart-subtitle {
		font-size: 24rpx;
		color: #999999;
		display: block;
		margin-bottom: 30rpx;
	}

	/* 柱状图 */
	.bar-chart {
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
		height: 200rpx;
		padding-top: 20rpx;
	}

	.bar-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
	}

	.bar {
		width: 40rpx;
		background: linear-gradient(to top, #4cd964, #2ecc71);
		border-radius: 8rpx 8rpx 0 0;
		margin-bottom: 10rpx;
		transition: all 0.3s;
	}

	.bar.active {
		background: linear-gradient(to top, #ff6b35, #ff8c42);
	}

	.bar-label {
		font-size: 20rpx;
		color: #999999;
	}

	.bar-label.active {
		color: #ff6b35;
		font-weight: bold;
	}

	/* 成就部分 */
	.achievements-section {
		background: #ffffff;
		margin: 0 30rpx 30rpx;
		border-radius: 20rpx;
		padding: 30rpx;
	}

	.section-title-small {
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		display: block;
		margin-bottom: 20rpx;
	}

	.achievement-list {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
	}

	.achievement-item {
		padding: 15rpx 25rpx;
		border-radius: 30rpx;
	}

	.achievement-item.yellow {
		background: #fff9e6;
	}

	.achievement-item.blue {
		background: #e6f3ff;
	}

	.achievement-item.pink {
		background: #ffe6f0;
	}

	.achievement-item.green {
		background: #e6fff0;
	}

	.achievement-text {
		font-size: 24rpx;
		color: #333333;
	}
</style>
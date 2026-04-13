<template>
	<view class="page">
		<!-- 用户信息卡片 -->
		<view class="user-card" @click="goToProfileEdit">
			<image class="user-avatar" src="/static/avatar.png"></image>
			<view class="user-info">
				<text class="user-name">编程小天才</text>
				<text class="user-id">ID: 12345678</text>
			</view>
			<text class="arrow">›</text>
		</view>

		<!-- 设置列表 -->
		<view class="menu-section">
			<view class="menu-item">
				<view class="menu-left">
					<image class="menu-img" src="/static/icon/tip.png"></image>
					<text class="menu-text">消息通知</text>
				</view>
				<switch :checked="true" color="#52c41a" />
			</view>
			<view class="menu-item">
				<view class="menu-left">
					<image class="menu-img" src="/static/icon/password.png"></image>
					<text class="menu-text">账号安全</text>
				</view>
				<text class="arrow">›</text>
			</view>
			<view class="menu-item">
				<view class="menu-left">
					<image class="menu-img" src="/static/icon/theme.png"></image>
					<text class="menu-text">主题设置</text>
				</view>
				<view class="menu-right">
					<text class="menu-value">默认主题</text>
					<text class="arrow">›</text>
				</view>
			</view>
		</view>

		<!-- 帮助与协议 -->
		<view class="menu-section">
			<view class="menu-item">
				<view class="menu-left">
					<image class="menu-img" src="/static/icon/help.png"></image>
					<text class="menu-text">帮助与反馈</text>
				</view>
				<text class="arrow">›</text>
			</view>
			<view class="menu-item">
				<view class="menu-left">
					<image class="menu-img" src="/static/icon/user_ agreement.png"></image>
					<text class="menu-text">用户协议</text>
				</view>
				<text class="arrow">›</text>
			</view>
			<view class="menu-item">
				<view class="menu-left">
					<image class="menu-img" src="/static/icon/privacy_ policy.png"></image>
					<text class="menu-text">隐私政策</text>
				</view>
				<text class="arrow">›</text>
			</view>
		</view>

		<!-- 版本信息 -->
		<view class="version-info">
			<text class="version-text">当前版本 v1.0.0</text>
			<text class="copyright-text">© 2026 编程少年 版权所有</text>
		</view>

		<!-- 退出登录按钮 -->
		<view class="logout-btn">
			<text class="logout-text">退出登录</text>
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
			goToProfileEdit() {
				uni.navigateTo({
					url: '/pages/profile-edit/profile-edit'
				})
			}
		}
	}
</script>

<style>
	.page {
		min-height: 100vh;
		background: #f5f5f5;
		padding: 20rpx 30rpx;
	}

	/* 用户信息卡片 */
	.user-card {
		background: #ffffff;
		border-radius: 20rpx;
		padding: 30rpx;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.user-avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.user-info {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.user-name {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
		margin-bottom: 10rpx;
	}

	.user-id {
		font-size: 24rpx;
		color: #999999;
	}

	.arrow {
		font-size: 48rpx;
		color: #cccccc;
	}

	/* 菜单列表 */
	.menu-section {
		background: #ffffff;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
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
		flex: 1;
	}

	.menu-right {
		display: flex;
		align-items: center;
	}

	/* 菜单图标统一尺寸 */
	.menu-img {
		width: 36rpx;
		height: 36rpx;
		object-fit: contain;
		margin-right: 20rpx;
		flex-shrink: 0;
	}

	.menu-text {
		font-size: 30rpx;
		color: #333333;
	}

	.menu-value {
		font-size: 26rpx;
		color: #999999;
		margin-right: 10rpx;
	}

	/* 版本信息 */
	.version-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30rpx 0;
	}

	.version-text {
		font-size: 24rpx;
		color: #999999;
		margin-bottom: 10rpx;
	}

	.copyright-text {
		font-size: 22rpx;
		color: #cccccc;
	}

	/* 退出登录按钮 */
	.logout-btn {
		background: #ffffff;
		border-radius: 50rpx;
		padding: 25rpx;
		text-align: center;
		margin: 30rpx 0;
	}

	.logout-text {
		font-size: 30rpx;
		color: #ff4757;
		font-weight: bold;
	}
</style>

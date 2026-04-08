<template>
	<view class="page">
		<!-- 头像区域 -->
		<view class="avatar-section">
			<view class="avatar-wrapper">
				<image class="avatar" src="/static/avatar.png"></image>
				<view class="edit-badge">✎</view>
			</view>
			<text class="change-avatar">点击更换头像</text>
		</view>

		<!-- 基本信息列表 -->
		<view class="info-list">
			<view class="info-item" @click="selectPicker('nickname')">
				<text class="info-label">昵称</text>
				<view class="info-right">
					<text class="info-value">{{userInfo.nickname}}</text>
					<text class="arrow">›</text>
				</view>
			</view>
			<view class="info-item" @click="selectPicker('grade')">
				<text class="info-label">年级</text>
				<view class="info-right">
					<text class="info-value">{{userInfo.grade}}</text>
					<text class="arrow">›</text>
				</view>
			</view>
			<view class="info-item" @click="selectPicker('gender')">
				<text class="info-label">性别</text>
				<view class="info-right">
					<text class="info-value">{{userInfo.gender}}</text>
					<text class="arrow">›</text>
				</view>
			</view>
			<view class="info-item" @click="selectPicker('birthday')">
				<text class="info-label">出生日期</text>
				<view class="info-right">
					<text class="info-value">{{userInfo.birthday}}</text>
					<text class="arrow">›</text>
				</view>
			</view>
			<view class="info-item" @click="selectPicker('signature')">
				<text class="info-label">个性签名</text>
				<view class="info-right">
					<text class="info-value">{{userInfo.signature}}</text>
					<text class="arrow">›</text>
				</view>
			</view>
		</view>

		<!-- 账号绑定 -->
		<view class="bind-section">
			<text class="section-title">账号绑定</text>
			<view class="bind-list">
				<view class="bind-item">
					<view class="bind-left">
						<text class="bind-icon green">💬</text>
						<text class="bind-name">微信</text>
					</view>
					<text class="bind-status bound">已绑定</text>
				</view>
				<view class="bind-item">
					<view class="bind-left">
						<text class="bind-icon blue">🐧</text>
						<text class="bind-name">QQ</text>
					</view>
					<text class="bind-status unbound">去绑定</text>
				</view>
				<view class="bind-item" @click="editPhone">
					<view class="bind-left">
						<text class="bind-icon red">📱</text>
						<text class="bind-name">手机号</text>
					</view>
					<view class="bind-right">
						<text class="bind-phone">{{userInfo.phone}}</text>
						<text class="arrow">›</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 选择器弹窗 -->
		<picker mode="selector" :range="pickerData.range" :value="pickerData.currentIndex" @change="onPickerChange" v-if="pickerData.show">
			<view></view>
		</picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					nickname: '编程小天才',
					grade: '五年级',
					gender: '男',
					birthday: '2015-08-15',
					signature: '努力成为编程大神！',
					phone: '138****5678'
				},
				pickerData: {
					show: false,
					type: '',
					range: [],
					currentIndex: 0
				},
				gradeOptions: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三'],
				genderOptions: ['男', '女']
			}
		},
		methods: {
			selectPicker(type) {
				this.pickerData.type = type;
				
				switch(type) {
					case 'grade':
						this.pickerData.range = this.gradeOptions;
						this.pickerData.currentIndex = this.gradeOptions.indexOf(this.userInfo.grade);
						break;
					case 'gender':
						this.pickerData.range = this.genderOptions;
						this.pickerData.currentIndex = this.genderOptions.indexOf(this.userInfo.gender);
						break;
				}
				
				this.pickerData.show = true;
			},
			onPickerChange(e) {
				const index = e.detail.value;
				const selectedValue = this.pickerData.range[index];
				
				switch(this.pickerData.type) {
					case 'grade':
						this.userInfo.grade = selectedValue;
						break;
					case 'gender':
						this.userInfo.gender = selectedValue;
						break;
				}
				
				this.pickerData.show = false;
			},
			editPhone() {
				uni.showToast({
					title: '修改手机号功能',
					icon: 'none'
				});
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

	/* 头像区域 */
	.avatar-section {
		background: #ffffff;
		padding: 40rpx 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.avatar-wrapper {
		position: relative;
		margin-bottom: 20rpx;
	}

	.avatar {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
	}

	.edit-badge {
		position: absolute;
		bottom: 10rpx;
		right: 10rpx;
		width: 50rpx;
		height: 50rpx;
		background: #409eff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		font-size: 28rpx;
		border: 4rpx solid #ffffff;
	}

	.change-avatar {
		font-size: 26rpx;
		color: #409eff;
	}

	/* 信息列表 */
	.info-list {
		background: #ffffff;
		border-radius: 20rpx;
		margin: 0 30rpx 20rpx;
		overflow: hidden;
	}

	.info-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		border-bottom: 2rpx solid #f0f0f0;
	}

	.info-item:last-child {
		border-bottom: none;
	}

	.info-label {
		font-size: 30rpx;
		color: #333333;
	}

	.info-right {
		display: flex;
		align-items: center;
	}

	.info-value {
		font-size: 28rpx;
		color: #999999;
		margin-right: 10rpx;
	}

	.arrow {
		font-size: 48rpx;
		color: #cccccc;
	}

	/* 账号绑定 */
	.bind-section {
		background: #ffffff;
		border-radius: 20rpx;
		margin: 0 30rpx 20rpx;
		padding: 30rpx;
	}

	.section-title {
		font-size: 26rpx;
		color: #999999;
		display: block;
		margin-bottom: 20rpx;
	}

	.bind-list {
		overflow: hidden;
	}

	.bind-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 2rpx solid #f0f0f0;
	}

	.bind-item:last-child {
		border-bottom: none;
	}

	.bind-left {
		display: flex;
		align-items: center;
	}

	.bind-right {
		display: flex;
		align-items: center;
	}

	.bind-icon {
		width: 60rpx;
		height: 60rpx;
		border-radius: 12rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		margin-right: 20rpx;
	}

	.bind-icon.green {
		background: #e6fff0;
	}

	.bind-icon.blue {
		background: #e6f3ff;
	}

	.bind-icon.red {
		background: #ffe6e6;
	}

	.bind-name {
		font-size: 30rpx;
		color: #333333;
	}

	.bind-status {
		font-size: 26rpx;
	}

	.bind-status.bound {
		color: #52c41a;
	}

	.bind-status.unbound {
		color: #409eff;
	}

	.bind-phone {
		font-size: 26rpx;
		color: #999999;
		margin-right: 10rpx;
	}
</style>

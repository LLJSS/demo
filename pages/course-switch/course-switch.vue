<template>
	<view class="page">
		<!-- 当前学习课程 -->
		<view class="current-section">
			<text class="section-title">当前学习课程</text>
			<view class="current-course" :class="{ active: currentCourse.id === selectedCourseId }">
				<image class="course-image" src="/static/course-python.jpg"></image>
				<view class="course-info">
					<text class="course-name">{{currentCourse.name}}</text>
					<text class="course-progress">{{currentCourse.progressText}}</text>
					<view class="progress-bar-bg">
						<view class="progress-bar-fill" :style="{ width: currentCourse.progress + '%' }"></view>
					</view>
					<view class="course-stats">
						<image class="stat-icon" src="/static/icon/totle_time.png"></image>
						<text class="stat-item">已学习 {{currentCourse.studyTime}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 全部课程 -->
		<view class="all-section">
			<text class="section-title">全部课程（可切换）</text>
			<view class="course-list">
				<view class="course-card" v-for="(course, index) in courseList" :key="index" :class="{ active: selectedCourseId === course.id }">
					<image class="course-image" :src="course.image"></image>
					<view class="course-content">
						<view class="course-header">
							<text class="course-name">{{course.name}}</text>
							<text class="course-status">{{course.statusText}}</text>
						</view>
						<view class="course-detail">
							<view class="course-detail-view">
								<image class="stat-icon" src="/static/icon/totle_time.png"></image>
								<text class="detail-item"> 总时长 {{course.totalTime}}</text>
							</view>
							<view class="switch-btn" @click.stop="switchCourse(course)" v-if="course.id !== currentCourse.id">
								<text class="switch-text">切换至此课程</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 提示信息 -->
		<view class="tip-section">
			<view class="tip-card">
				<image class="tip-icon-img" src="/static/icon/tip.png"></image>
				<text class="tip-text">切换课程后，之前的学习进度会自动保存，随时可以切换回来继续学习。</text>
			</view>
		</view>

		<!-- 切换课程确认弹窗 -->
		<view class="modal-mask" v-if="showConfirmModal" @click="closeConfirmModal">
			<view class="modal-content" @click.stop>
				<view class="modal-header">
					<view class="icon-circle orange">
						<text class="icon-text">?</text>
					</view>
					<text class="modal-title">确认切换课程？</text>
				</view>
				<text class="modal-desc">当前课程「{{currentCourse.name}}」的学习进度将会自动保存，你可以随时切换回来继续学习。</text>
				
				<view class="course-preview">
					<image class="preview-image" :src="targetCourse.image"></image>
					<view class="preview-info">
						<text class="preview-name">{{targetCourse.name}}</text>
						<text class="preview-progress">已完成 {{targetCourse.progress}}%，继续学习</text>
					</view>
				</view>

				<view class="modal-buttons">
					<view class="modal-btn cancel" @click="closeConfirmModal">
						<text class="btn-text cancel-text">取消</text>
					</view>
					<view class="modal-btn confirm" @click="confirmSwitch">
						<text class="btn-text confirm-text">确认切换</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 切换成功提示弹窗 -->
		<view class="modal-mask" v-if="showSuccessModal" @click="closeSuccessModal">
			<view class="modal-content success-modal" @click.stop>
				<view class="success-icon">
					<text class="check-icon">✓</text>
				</view>
				<text class="success-title">切换成功！</text>
				<text class="success-desc">你已成功切换到「{{successCourse.name}}」课程</text>
				<text class="success-desc">将从上次学习的位置继续学习</text>
				
				<view class="course-info-card">
					<text class="info-name">{{successCourse.name}}</text>
					<text class="info-detail">上次学习：{{successCourse.lastLesson}} | {{successCourse.progress}}%</text>
				</view>

				<view class="modal-buttons single">
					<view class="modal-btn primary" @click="startLearning">
						<text class="btn-text primary-text">立即开始学习</text>
					</view>
				</view>
				<view class="back-home" @click="backToHome">
					<text class="back-text">返回首页</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentCourse: {
					id: 1,
					name: 'Python 全栈开发工程师',
					progress: 78,
					progressText: '已完成 78%',
					studyTime: '124小时',
					image: '/static/course-python.jpg'
				},
				selectedCourseId: 1,
				showConfirmModal: false,
				showSuccessModal: false,
				targetCourse: {},
				successCourse: {},
				courseList: [
					{
						id: 2,
						name: 'Web 前端高级工程师',
						statusText: '学习中 32%',
						totalTime: '80小时',
						progress: 32,
						lastLesson: '第3章 响应式布局',
						image: '/static/course-frontend.jpg'
					},
					{
						id: 3,
						name: '数据分析实战班',
						statusText: '未开始',
						totalTime: '80小时',
						progress: 0,
						lastLesson: '第1章 数据分析基础',
						image: '/static/course-data.jpg'
					},
					{
						id: 4,
						name: 'Java 进阶课程',
						statusText: '已学习 45%',
						totalTime: '120小时',
						progress: 45,
						lastLesson: '第5章 并发编程',
						image: '/static/course-java.jpg'
					}
				]
			}
		},
		methods: {
			switchCourse(course) {
				this.targetCourse = course;
				this.showConfirmModal = true;
			},
			closeConfirmModal() {
				this.showConfirmModal = false;
			},
			confirmSwitch() {
				this.showConfirmModal = false;
				this.successCourse = this.targetCourse;
				this.selectedCourseId = this.targetCourse.id;
				this.showSuccessModal = true;
			},
			closeSuccessModal() {
				this.showSuccessModal = false;
			},
			startLearning() {
				uni.showToast({
					title: '开始学习',
					icon: 'success'
				});
				this.showSuccessModal = false;
			},
			backToHome() {
				this.showSuccessModal = false;
				uni.switchTab({
					url: '/pages/index/index'
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

	/* 当前课程部分 */
	.current-section {
		margin: 0 30rpx 30rpx;
	}

	.section-title {
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		display: block;
		margin-bottom: 20rpx;
	}

	.current-course {
		background: #ffffff;
		border-radius: 20rpx;
		padding: 30rpx;
		border: 3rpx solid transparent;
		transition: all 0.3s;
	}

	.current-course.active {
		border-color: #409eff;
		box-shadow: 0 4rpx 20rpx rgba(64, 158, 255, 0.2);
	}

	.course-image {
		width: 100%;
		height: 240rpx;
		border-radius: 15rpx;
		margin-bottom: 20rpx;
		object-fit: cover;
	}

	.course-info {
		display: flex;
		flex-direction: column;
	}

	.course-name {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
		margin-bottom: 10rpx;
	}

	.course-progress {
		font-size: 26rpx;
		color: #333333;
		margin-bottom: 15rpx;
		font-weight: 500;
	}

	.progress-bar-bg {
		background: #f0f0f0;
		border-radius: 20rpx;
		height: 16rpx;
		overflow: hidden;
		margin-bottom: 15rpx;
	}

	.progress-bar-fill {
		background: #4CD964;
		height: 100%;
		border-radius: 20rpx;
		transition: width 0.3s;
	}

	.course-stats {
		display: flex;
		align-items: center;
	}

	.stat-item {
		font-size: 24rpx;
		color: #999999;
		line-height: 1;
	}
	
	/* 小图标统一尺寸 + 垂直居中 */
	.stat-icon {
		width: 26rpx;
		height: 26rpx;
		margin-right: 8rpx;
		object-fit: contain;
	}

	/* 全部课程部分 */
	.all-section {
		margin: 0 30rpx 30rpx;
	}

	.course-list {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.course-card {
		background: #ffffff;
		border-radius: 20rpx;
		padding: 25rpx;
		display: flex;
		border: 3rpx solid transparent;
		transition: all 0.3s;
	}

	.course-card.active {
		border-color: #409eff;
	}

	.course-card .course-image {
		width: 160rpx;
		height: 160rpx;
		border-radius: 15rpx;
		margin-right: 20rpx;
		margin-bottom: 0;
		flex-shrink: 0;
		object-fit: cover;
	}

	.course-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.course-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
	}

	.course-content .course-name {
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		margin-bottom: 0;
	}

	.course-status {
		font-size: 24rpx;
		color: #999999;
		padding: 4rpx 16rpx;
		background: #f5f5f5;
		border-radius: 20rpx;
	}

	.course-detail {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.course-detail-view{
		display: flex;
		align-items: center;
	}

	.detail-item {
		font-size: 24rpx;
		color: #999999;
		line-height: 1;
	}

	/* 切换至此课程按钮 - 渐变 #F97316 -> #EF4444 */
	.switch-btn {
		background: linear-gradient(to right, #F97316, #EF4444);
		padding: 12rpx 25rpx;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 60rpx;
		box-sizing: border-box;
	}

	.switch-text {
		font-size: 24rpx;
		color: #ffffff;
		font-weight: bold;
		line-height: 1;
	}

	/* 提示信息 */
	.tip-section {
		margin: 0 30rpx;
	}

	.tip-card {
		background: #fff9e6;
		border-radius: 15rpx;
		padding: 25rpx;
		display: flex;
		align-items: center;
	}

	/* 提示图标统一大小 */
	.tip-icon-img {
		width: 32rpx;
		height: 32rpx;
		margin-right: 15rpx;
		flex-shrink: 0;
		object-fit: contain;
	}

	.tip-text {
		flex: 1;
		font-size: 24rpx;
		color: #999999;
		line-height: 1.6;
	}

	/* 弹窗蒙层 */
	.modal-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}

	.modal-content {
		width: 600rpx;
		background: #ffffff;
		border-radius: 30rpx;
		padding: 50rpx 40rpx;
		animation: slideUp 0.3s ease-out;
	}

	@keyframes slideUp {
		from {
			transform: translateY(50rpx);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.modal-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.icon-circle {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20rpx;
	}

	.icon-circle.orange {
		background: #fff0e6;
	}

	.icon-text {
		font-size: 60rpx;
		color: #ff6b35;
		font-weight: bold;
	}

	.modal-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
	}

	.modal-desc {
		font-size: 26rpx;
		color: #999999;
		text-align: center;
		line-height: 1.6;
		margin-bottom: 30rpx;
	}

	.course-preview {
		background: #f5f5f5;
		border-radius: 20rpx;
		padding: 25rpx;
		margin-bottom: 40rpx;
		display: flex;
		align-items: center;
	}

	.preview-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 15rpx;
		margin-right: 20rpx;
		object-fit: cover;
	}

	.preview-info {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.preview-name {
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		margin-bottom: 10rpx;
	}

	.preview-progress {
		font-size: 24rpx;
		color: #4CD964;
	}

	.modal-buttons {
		display: flex;
		gap: 20rpx;
	}

	.modal-buttons.single {
		flex-direction: column;
		margin-bottom: 20rpx;
	}

	.modal-btn {
		flex: 1;
		padding: 25rpx;
		border-radius: 50rpx;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-btn.cancel {
		background: #f5f5f5;
	}

	/* 确认切换按钮 - 渐变 #F97316 -> #EF4444 */
	.modal-btn.confirm {
		background: linear-gradient(to right, #F97316, #EF4444);
	}

	/* 立即开始学习按钮 - 渐变 #F97316 -> #EF4444 */
	.modal-btn.primary {
		background: linear-gradient(to right, #F97316, #EF4444);
	}

	.btn-text {
		font-size: 30rpx;
		font-weight: bold;
		line-height: 1;
	}

	.cancel-text {
		color: #666666;
	}

	.confirm-text,
	.primary-text {
		color: #ffffff;
	}

	/* 成功弹窗样式 */
	.success-modal {
		padding: 50rpx 40rpx 30rpx;
	}

	.success-icon {
		width: 120rpx;
		height: 120rpx;
		background: #e6fff0;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 30rpx;
	}

	.check-icon {
		font-size: 80rpx;
		color: #52c41a;
	}

	.success-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
		display: block;
		text-align: center;
		margin-bottom: 20rpx;
	}

	.success-desc {
		font-size: 26rpx;
		color: #999999;
		display: block;
		text-align: center;
		margin-bottom: 10rpx;
	}

	.course-info-card {
		background: #f5f5f5;
		border-radius: 20rpx;
		padding: 30rpx;
		margin: 30rpx 0;
		display: flex;
		flex-direction: column;
	}

	.info-name {
		font-size: 28rpx;
		font-weight: bold;
		color: #333333;
		margin-bottom: 15rpx;
	}

	.info-detail {
		font-size: 24rpx;
		color: #999999;
	}

	.back-home {
		text-align: center;
		padding: 20rpx;
	}

	.back-text {
		font-size: 26rpx;
		color: #999999;
	}
</style>

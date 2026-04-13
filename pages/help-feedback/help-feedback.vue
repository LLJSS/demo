<template>
	<view class="page">
		<!-- 搜索栏 -->
		<view class="search-section">
			<view class="search-box">
				<image class="search-img" src="/static/icon/search.png"></image>
				<input class="search-input" placeholder="搜索常见问题" v-model="searchText" />
			</view>
		</view>

		<!-- 常见问题 -->
		<view class="faq-section">
			<text class="section-title">常见问题</text>
			<view class="faq-list">
				<view class="faq-item" @click="showAnswer(index)" v-for="(item, index) in faqList" :key="index">
					<text class="faq-text">{{item.question}}</text>
					<text class="arrow">›</text>
				</view>
			</view>
		</view>

		<!-- 联系我们 -->
		<view class="contact-section">
			<text class="section-title">联系我们</text>
			<view class="contact-card">
				<view class="contact-item">
					<image class="contact-img" src="/static/icon/customer_ service.png"></image>
					<view class="contact-info">
						<text class="contact-name">在线客服</text>
						<text class="contact-time">工作日 9:00-21:00</text>
					</view>
					<view class="contact-btn gradient-btn">
						<text class="btn-text">咨询</text>
					</view>
				</view>
				<view class="contact-item">
					<image class="contact-img" src="/static/icon/public_ account.png"></image>
					<view class="contact-info">
						<text class="contact-name">官方公众号</text>
						<text class="contact-time">微信搜索：编程少年</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 意见反馈 -->
		<view class="feedback-section">
			<text class="section-title">意见反馈</text>
			<view class="feedback-card">
				<textarea 
					class="feedback-textarea" 
					placeholder="请描述您遇到的问题或建议..." 
					v-model="feedbackText"
					maxlength="500"
				></textarea>
				<view class="image-upload">
					<view class="upload-btn">
						<text class="upload-icon">+</text>
					</view>
					<text class="upload-hint">添加图片（可选）</text>
				</view>
				<view class="submit-btn gradient-btn" @click="submitFeedback">
					<text class="submit-text">提交反馈</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchText: '',
				faqList: [
					{ question: '如何下载课程离线观看？', answer: '进入课程详情页，点击下载按钮即可离线缓存。' },
					{ question: '学习积分有什么用？', answer: '积分可用于兑换课程、礼品或参与抽奖活动。' },
					{ question: '如何提交项目作业？', answer: '在学习中心的课程页面找到作业提交入口，上传您的代码文件。' },
					{ question: '忘记密码怎么办？', answer: '在登录页面点击"忘记密码"，通过手机号或邮箱找回密码。' },
					{ question: '如何更换绑定手机号？', answer: '进入个人信息页面，点击手机号进行更换。' }
				],
				feedbackText: ''
			}
		},
		methods: {
			showAnswer(index) {
				const item = this.faqList[index];
				uni.showModal({
					title: item.question,
					content: item.answer,
					showCancel: false,
					confirmText: '知道了'
				});
			},
			submitFeedback() {
				if (!this.feedbackText.trim()) {
					uni.showToast({
						title: '请输入反馈内容',
						icon: 'none'
					});
					return;
				}
				
				uni.showModal({
					title: '提示',
					content: '感谢您的反馈，我们会尽快处理！',
					showCancel: false,
					success: () => {
						this.feedbackText = '';
					}
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

	/* 搜索栏 */
	.search-section {
		background: #ffffff;
		padding: 20rpx 30rpx;
		margin-bottom: 20rpx;
	}

	.search-box {
		background: #f5f5f5;
		border-radius: 40rpx;
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
	}

	.search-img {
		width: 32rpx;
		height: 32rpx;
		object-fit: contain;
		margin-right: 15rpx;
	}

	.search-input {
		flex: 1;
		font-size: 28rpx;
	}

	/* 常见问题 */
	.faq-section {
		background: #ffffff;
		margin: 0 30rpx 20rpx;
		border-radius: 20rpx;
		padding: 30rpx;
	}

	.section-title {
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		display: block;
		margin-bottom: 20rpx;
	}

	.faq-list {
		overflow: hidden;
	}

	.faq-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 25rpx 0;
		border-bottom: 2rpx solid #f0f0f0;
	}

	.faq-item:last-child {
		border-bottom: none;
	}

	.faq-text {
		flex: 1;
		font-size: 28rpx;
		color: #333333;
	}

	.arrow {
		font-size: 48rpx;
		color: #cccccc;
		margin-left: 20rpx;
	}

	/* 联系我们 */
	.contact-section {
		margin: 0 30rpx 20rpx;
	}

	.contact-card {
		background: #ffffff;
		border-radius: 20rpx;
		padding: 20rpx;
	}

	.contact-item {
		display: flex;
		align-items: center;
		padding: 20rpx;
		border-bottom: 2rpx solid #f0f0f0;
	}

	.contact-item:last-child {
		border-bottom: none;
	}

	.contact-img {
		width: 40rpx;
		height: 40rpx;
		object-fit: contain;
		margin-right: 20rpx;
		flex-shrink: 0;
	}

	.contact-info {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.contact-name {
		font-size: 30rpx;
		font-weight: bold;
		color: #333333;
		margin-bottom: 8rpx;
	}

	.contact-time {
		font-size: 24rpx;
		color: #999999;
	}

	/* 渐变按钮 */
	.gradient-btn {
		background: linear-gradient(90deg, #F97316, #EF4444);
	}

	.contact-btn {
		padding: 12rpx 30rpx;
		border-radius: 30rpx;
	}

	.btn-text {
		font-size: 26rpx;
		color: #ffffff;
	}

	/* 意见反馈 */
	.feedback-section {
		margin: 0 30rpx 20rpx;
	}

	.feedback-card {
		background: #ffffff;
		border-radius: 20rpx;
		padding: 30rpx;
	}

	/* 修复：意见反馈宽度缩短 */
	.feedback-textarea {
		width: calc(100% - 40rpx);
		min-height: 200rpx;
		padding: 20rpx;
		background: #f5f5f5;
		border-radius: 15rpx;
		font-size: 28rpx;
		margin: 0 auto 30rpx;
		box-sizing: border-box;
	}

	.image-upload {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.upload-btn {
		width: 80rpx;
		height: 80rpx;
		background: #f5f5f5;
		border-radius: 15rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 15rpx;
	}

	.upload-icon {
		font-size: 50rpx;
		color: #cccccc;
	}

	.upload-hint {
		font-size: 24rpx;
		color: #999999;
	}

	.submit-btn {
		border-radius: 50rpx;
		padding: 25rpx;
		text-align: center;
	}

	.submit-text {
		font-size: 30rpx;
		color: #ffffff;
		font-weight: bold;
	}
</style>

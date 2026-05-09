<template>
	<view class="page">
		<!-- 头像 -->
		<view class="avatar-section">
			<view class="avatar-wrapper" @click="chooseAvatar">
				<image class="avatar" :src="avatarDisplay" mode="aspectFill"></image>
				<view class="edit-badge">✎</view>
			</view>
			<text class="change-avatar" @click="chooseAvatar">点击更换头像</text>
		</view>

		<view class="info-list">
			<view class="info-item" @click="openTextEdit('nickname')">
				<text class="info-label">昵称</text>
				<view class="info-right">
					<text class="info-value">{{ userInfo.nickname }}</text>
					<text class="arrow">›</text>
				</view>
			</view>

			<picker mode="selector" :range="gradeOptions" :value="gradeIndex" @change="onGradeChange">
				<view class="info-item">
					<text class="info-label">年级</text>
					<view class="info-right">
						<text class="info-value">{{ userInfo.grade }}</text>
						<text class="arrow">›</text>
					</view>
				</view>
			</picker>

			<picker mode="selector" :range="genderOptions" :value="genderIndex" @change="onGenderChange">
				<view class="info-item">
					<text class="info-label">性别</text>
					<view class="info-right">
						<text class="info-value">{{ userInfo.gender }}</text>
						<text class="arrow">›</text>
					</view>
				</view>
			</picker>

			<picker mode="date" :value="userInfo.birthday" @change="onBirthdayChange">
				<view class="info-item">
					<text class="info-label">出生日期</text>
					<view class="info-right">
						<text class="info-value">{{ userInfo.birthday }}</text>
						<text class="arrow">›</text>
					</view>
				</view>
			</picker>

			<view class="info-item" @click="openTextEdit('signature')">
				<text class="info-label">个性签名</text>
				<view class="info-right">
					<text class="info-value text-ellipsis">{{ userInfo.signature }}</text>
					<text class="arrow">›</text>
				</view>
			</view>
		</view>

		<view class="bind-section">
			<text class="section-title">账号绑定</text>
			<view class="bind-list">
				<view class="bind-item">
					<view class="bind-left">
						<image class="bind-img" src="/static/icon/weixin.png"></image>
						<text class="bind-name">微信</text>
					</view>
					<text class="bind-status unbound">未对接</text>
				</view>
				<view class="bind-item">
					<view class="bind-left">
						<image class="bind-img" src="/static/icon/QQ.png"></image>
						<text class="bind-name">QQ</text>
					</view>
					<text class="bind-status unbound">未对接</text>
				</view>
				<view class="bind-item" @click="editPhone">
					<view class="bind-left">
						<image class="bind-img" src="/static/icon/phone.png"></image>
						<text class="bind-name">手机号</text>
					</view>
					<view class="bind-right">
						<text class="bind-phone">{{ userInfo.phone }}</text>
						<text class="arrow">›</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 昵称 / 签名 -->
		<view class="mask" v-if="textEdit.show" @click="closeTextEdit">
			<view class="dialog" @click.stop>
				<text class="dialog-title">{{ textEdit.title }}</text>
				<input class="dialog-input" v-model="textEdit.value" :maxlength="textEdit.field === 'signature' ? 120 : 50" />
				<view class="dialog-btns">
					<button class="btn-cancel" size="mini" @click="closeTextEdit">取消</button>
					<button class="btn-ok" size="mini" type="primary" @click="confirmTextEdit">保存</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { get, put } from '../../utils/request.js'
import { getToken, getUserInfo, setUserInfo } from '../../utils/auth.js'
import { BASE_URL } from '../../utils/config.js'

export default {
	data() {
		return {
			userInfo: {
				nickname: '',
				grade: '',
				gender: '未设置',
				birthday: '',
				signature: '',
				phone: ''
			},
			avatarPath: '',
			gradeOptions: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三'],
			genderOptions: ['未设置', '男', '女'],
			textEdit: {
				show: false,
				field: '',
				title: '',
				value: ''
			}
		}
	},
	computed: {
		gradeIndex() {
			const i = this.gradeOptions.indexOf(this.userInfo.grade)
			return i >= 0 ? i : 0
		},
		genderIndex() {
			const i = this.genderOptions.indexOf(this.userInfo.gender)
			return i >= 0 ? i : 0
		},
		avatarDisplay() {
			return this.resolveAvatarUrl(this.avatarPath)
		}
	},
	onShow() {
		if (!getToken()) {
			uni.reLaunch({ url: '/pages/login/login' })
			return
		}
		this.syncFromServer()
	},
	methods: {
		genderFromApi(code) {
			const n = Number(code)
			if (n === 2) return '女'
			if (n === 1) return '男'
			return '未设置'
		},
		genderToApi(label) {
			if (label === '女') return 2
			if (label === '男') return 1
			return 0
		},
		formatBirthday(v) {
			if (v == null || v === '') return ''
			if (typeof v === 'string') {
				return v.length >= 10 ? v.slice(0, 10) : v
			}
			if (Array.isArray(v) && v.length >= 3) {
				const y = v[0]
				const m = String(v[1]).padStart(2, '0')
				const d = String(v[2]).padStart(2, '0')
				return `${y}-${m}-${d}`
			}
			return ''
		},
		async saveProfileToServer(partial) {
			try {
				const res = await put('/api/customer/update', partial, { needAuth: true })
				if (res.code === 200) {
					setUserInfo(Object.assign({}, getUserInfo(), partial))
					uni.showToast({ title: '已保存', icon: 'success' })
					return true
				}
				uni.showToast({ title: res.message || '保存失败', icon: 'none' })
				return false
			} catch (e) {
				if (e && e.message === 'unauthorized') {
					return false
				}
				return false
			}
		},
		maskPhone(tel) {
			if (!tel || tel.length < 7) return tel || ''
			return tel.slice(0, 3) + '****' + tel.slice(-4)
		},
		resolveAvatarUrl(avatar) {
			if (!avatar || typeof avatar !== 'string') {
				return '/static/avatar.png'
			}
			if (avatar.startsWith('http://') || avatar.startsWith('https://')) {
				return avatar
			}
			if (avatar.startsWith('/')) {
				const base = (BASE_URL || '').replace(/\/$/, '')
				return base ? base + avatar : avatar
			}
			return '/static/avatar.png'
		},
		applyServerData(d) {
			if (!d) return
			if (d.customerName) {
				this.userInfo.nickname = d.customerName
			}
			if (d.telephone) {
				this.userInfo.phone = this.maskPhone(d.telephone)
			}
			if (d.avatar) {
				this.avatarPath = d.avatar
			}
			if (d.grade != null && d.grade !== '') {
				this.userInfo.grade = d.grade
			}
			if (d.gender != null) {
				this.userInfo.gender = this.genderFromApi(d.gender)
			}
			const b = this.formatBirthday(d.birthday)
			if (b) {
				this.userInfo.birthday = b
			}
			if (d.signature != null) {
				this.userInfo.signature = d.signature
			}
			setUserInfo(Object.assign({}, getUserInfo(), d))
		},
		async syncFromServer() {
			try {
				const res = await get('/api/customer/info', {}, { needAuth: true })
				if (res.code === 200 && res.data) {
					this.applyServerData(res.data)
				}
			} catch (e) {
				if (e && e.message === 'unauthorized') return
				const cache = getUserInfo()
				if (cache && cache.customerName) {
					this.userInfo.nickname = cache.customerName
					this.userInfo.phone = this.maskPhone(cache.telephone || '')
					this.avatarPath = cache.avatar || ''
				}
			}
		},
		async saveNicknameToServer(name) {
			const ok = await this.saveProfileToServer({ customerName: name })
			if (ok) {
				this.userInfo.nickname = name
			}
			return ok
		},
		openTextEdit(field) {
			if (field === 'nickname') {
				this.textEdit = {
					show: true,
					field: 'nickname',
					title: '修改昵称',
					value: this.userInfo.nickname
				}
			} else if (field === 'signature') {
				this.textEdit = {
					show: true,
					field: 'signature',
					title: '修改个性签名',
					value: this.userInfo.signature
				}
			}
		},
		closeTextEdit() {
			this.textEdit.show = false
		},
		async confirmTextEdit() {
			const v = (this.textEdit.value || '').trim()
			if (this.textEdit.field === 'nickname') {
				if (!v) {
					uni.showToast({ title: '昵称不能为空', icon: 'none' })
					return
				}
				if (v.length > 50) {
					uni.showToast({ title: '昵称过长', icon: 'none' })
					return
				}
				await this.saveNicknameToServer(v)
			} else if (this.textEdit.field === 'signature') {
				const ok = await this.saveProfileToServer({ signature: v })
				if (ok) {
					this.userInfo.signature = v
				}
			}
			this.closeTextEdit()
		},
		onGradeChange(e) {
			const i = Number(e.detail.value)
			const val = this.gradeOptions[i]
			if (!val) return
			this.userInfo.grade = val
			this.saveProfileToServer({ grade: val })
		},
		onGenderChange(e) {
			const i = Number(e.detail.value)
			const label = this.genderOptions[i]
			if (!label) return
			this.userInfo.gender = label
			this.saveProfileToServer({ gender: this.genderToApi(label) })
		},
		onBirthdayChange(e) {
			const val = e.detail.value
			this.userInfo.birthday = val
			this.saveProfileToServer({ birthday: val })
		},
		chooseAvatar() {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					const path = res.tempFilePaths[0]
					this.uploadAvatarFile(path)
				}
			})
		},
		uploadAvatarFile(filePath) {
			const token = getToken()
			const info = getUserInfo()
			const customerId = info && info.customerId ? String(info.customerId) : ''
			if (!token || !customerId) {
				uni.reLaunch({ url: '/pages/login/login' })
				return
			}
			const url = (BASE_URL || '').replace(/\/$/, '') + '/api/customer/avatar/upload'
			uni.showLoading({ title: '上传中', mask: true })
			uni.uploadFile({
				url,
				filePath,
				name: 'file',
				header: { token, 'X-Customer-Id': customerId },
				success: (res) => {
					uni.hideLoading()
					try {
						const body = typeof res.data === 'string' ? JSON.parse(res.data) : res.data
						if (body.code === 200 && body.data && body.data.avatar) {
							this.avatarPath = body.data.avatar
							setUserInfo(Object.assign({}, getUserInfo(), { avatar: body.data.avatar }))
							uni.showToast({ title: '头像已更新', icon: 'success' })
						} else if (body.code === 401 || body.code === 403) {
							uni.showToast({ title: body.message || '未授权', icon: 'none' })
						} else {
							uni.showToast({ title: (body && body.message) || '上传失败', icon: 'none' })
						}
					} catch (err) {
						uni.showToast({ title: '解析响应失败', icon: 'none' })
					}
				},
				fail: () => {
					uni.hideLoading()
					uni.showToast({ title: '上传失败', icon: 'none' })
				}
			})
		},
		editPhone() {
			uni.showToast({
				title: '改手机号需短信验证，当前接口未提供',
				icon: 'none'
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
		max-width: 420rpx;
	}

	.info-value {
		font-size: 28rpx;
		color: #999999;
		margin-right: 10rpx;
	}

	.text-ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.arrow {
		font-size: 48rpx;
		color: #cccccc;
	}

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

	.bind-img {
		width: 40rpx;
		height: 40rpx;
		object-fit: contain;
		margin-right: 20rpx;
		flex-shrink: 0;
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
		color: #999999;
	}

	.bind-phone {
		font-size: 26rpx;
		color: #999999;
		margin-right: 10rpx;
	}

	.hint-box {
		margin: 0 40rpx 30rpx;
	}

	.hint-text {
		font-size: 22rpx;
		color: #bbbbbb;
		line-height: 1.5;
	}

	.mask {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.45);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;
	}

	.dialog {
		width: 600rpx;
		background: #fff;
		border-radius: 16rpx;
		padding: 40rpx;
	}

	.dialog-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		display: block;
		margin-bottom: 24rpx;
	}

	.dialog-input {
		border: 2rpx solid #e8e8e8;
		border-radius: 12rpx;
		padding: 20rpx;
		font-size: 28rpx;
		margin-bottom: 30rpx;
	}

	.dialog-btns {
		display: flex;
		justify-content: flex-end;
		gap: 20rpx;
	}

	.btn-cancel {
		margin: 0;
	}

	.btn-ok {
		margin: 0;
	}
</style>

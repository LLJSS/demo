<template>
    <view class="login-page">
        <!-- 顶部Logo区域 -->
        <view class="header-section">
            <view class="logo-box">
                <text class="logo-icon">&lt;/&gt;</text>
            </view>
            <text class="app-title">Java编程乐园</text>
            <text class="app-subtitle">在快乐中学习编程，在实践中提升能力</text>
        </view>

        <!-- 白色卡片区域 -->
        <view class="card-box">
            <!-- 登录/注册切换标签 -->
            <view class="tab-header">
                <view class="tab-item" :class="{ active: currentTab === 'login' }" @click="switchTab('login')">
                    <text class="tab-text">登录</text>
                    <view class="tab-line" v-if="currentTab === 'login'"></view>
                </view>
                <view class="tab-item" :class="{ active: currentTab === 'register' }" @click="switchTab('register')">
                    <text class="tab-text">注册</text>
                    <view class="tab-line" v-if="currentTab === 'register'"></view>
                </view>
            </view>

            <!-- 登录表单 -->
            <view v-if="currentTab === 'login'" class="form-section">
                <!-- 手机号输入 -->
                <view class="input-group">
                    <text class="input-label">手机号</text>
                    <view class="input-box">
                        <image class="input-img" src="/static/icon/phone.png"></image>
                        <input 
                            class="form-input" 
                            v-model="loginForm.phone" 
                            placeholder="请输入手机号"
                            type="number"
                            maxlength="11"
                        />
                    </view>
                </view>

                <!-- 验证码登录模式 -->
                <view v-if="loginType === 'code'">
                    <view class="input-group">
                        <text class="input-label">验证码</text>
                        <view class="code-input-wrapper">
                            <view class="input-box code-input-box">
                                <image class="input-img" src="/static/icon/verification_ code.png"></image>
                                <input 
                                    class="form-input" 
                                    v-model="loginForm.code" 
                                    placeholder="请输入验证码"
                                    type="number"
                                    maxlength="6"
                                />
                            </view>
                            <view class="get-code-btn" :class="{ disabled: codeCountdown > 0 }" @click="getCode">
                                <text class="get-code-text">{{ codeCountdown > 0 ? codeCountdown + 's' : '获取验证码' }}</text>
                            </view>
                        </view>
                    </view>
                    
                    <view class="switch-type" @click="loginType = 'password'">
                        <text class="switch-text">使用密码登录</text>
                    </view>
                </view>

                <!-- 密码登录模式 -->
                <view v-if="loginType === 'password'">
                    <view class="input-group">
                        <text class="input-label">密码</text>
                        <view class="input-box">
                            <image class="input-img" src="/static/icon/password.png"></image>
                            <input 
                                class="form-input" 
                                v-model="loginForm.password" 
                                placeholder="请输入密码"
                                :password="!showPassword"
                            />
                            <!-- 显示/隐藏密码 图片切换 -->
                            <image 
                                class="eye-img" 
                                @click="showPassword = !showPassword"
                                :src="showPassword ? '/static/icon/show_password.png' : '/static/icon/display_password.png'"
                            ></image>
                        </view>
                    </view>
                    
                    <view class="password-options">
                        <view class="remember-pwd">
                            <checkbox :checked="rememberPwd" @click="rememberPwd = !rememberPwd" />
                            <text class="remember-text">记住密码</text>
                        </view>
                        <text class="forgot-pwd" @click="handleForgotPwd">忘记密码?</text>
                    </view>

                    <view class="switch-type" @click="loginType = 'code'">
                        <text class="switch-text">使用验证码登录</text>
                    </view>
                </view>

                <!-- 登录按钮 -->
                <view class="submit-btn" @click="handleLogin">
                    <text class="submit-text">登录</text>
                </view>

                <!-- 协议 -->
                <view class="agreement">
                    <text class="agreement-text">登录即表示您同意</text>
                    <text class="agreement-link" @click="openProtocol('user')">《用户协议》</text>
                    <text class="agreement-text">和</text>
                    <text class="agreement-link" @click="openProtocol('privacy')">《隐私政策》</text>
                </view>

                <!-- 其他登录方式 -->
                <view class="other-login">
                    <view class="divider">
                        <view class="divider-line"></view>
                        <text class="divider-text">其他登录方式</text>
                        <view class="divider-line"></view>
                    </view>
                    <view class="social-btns">
                        <view class="social-btn wechat">
                            <image class="social-img" src="/static/icon/weixin.png"></image>
                        </view>
                        <view class="social-btn qq">
                            <image class="social-img" src="/static/icon/QQ.png"></image>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 注册表单 -->
            <view v-if="currentTab === 'register'" class="form-section">
                <!-- 手机号输入 -->
                <view class="input-group">
                    <text class="input-label">手机号</text>
                    <view class="input-box">
                        <image class="input-img" src="/static/icon/phone.png"></image>
                        <input 
                            class="form-input" 
                            v-model="registerForm.phone" 
                            placeholder="请输入手机号"
                            type="number"
                            maxlength="11"
                        />
                    </view>
                </view>

                <!-- 验证码 -->
                <view class="input-group">
                    <text class="input-label">验证码</text>
                    <view class="code-input-wrapper">
                        <view class="input-box code-input-box">
                            <image class="input-img" src="/static/icon/verification_ code.png"></image>
                            <input 
                                class="form-input" 
                                v-model="registerForm.code" 
                                placeholder="请输入验证码"
                                type="number"
                                maxlength="6"
                            />
                        </view>
                        <view class="get-code-btn" :class="{ disabled: codeCountdown > 0 }" @click="getCode">
                            <text class="get-code-text">{{ codeCountdown > 0 ? codeCountdown + 's' : '获取验证码' }}</text>
                        </view>
                    </view>
                </view>

                <!-- 设置密码 -->
                <view class="input-group">
                    <text class="input-label">设置密码</text>
                    <view class="input-box">
                        <image class="input-img" src="/static/icon/password.png"></image>
                        <input 
                            class="form-input" 
                            v-model="registerForm.password" 
                            placeholder="请设置8-16位密码"
                            :password="!showRegPassword"
                            maxlength="16"
                        />
                        <image 
                            class="eye-img" 
                            @click="showRegPassword = !showRegPassword"
                            :src="showRegPassword ? '/static/icon/show_password.png' : '/static/icon/display_password.png'"
                        ></image>
                    </view>
                </view>

                <!-- 确认密码 -->
                <view class="input-group">
                    <text class="input-label">确认密码</text>
                    <view class="input-box">
                        <image class="input-img" src="/static/icon/password.png"></image>
                        <input 
                            class="form-input" 
                            v-model="registerForm.confirmPassword" 
                            placeholder="请再次输入密码"
                            :password="!showConfirmPassword"
                            maxlength="16"
                        />
                        <image 
                            class="eye-img" 
                            @click="showConfirmPassword = !showConfirmPassword"
                            :src="showConfirmPassword ? '/static/icon/show_password.png' : '/static/icon/display_password.png'"
                        ></image>
                    </view>
                </view>

                <!-- 注册按钮 -->
                <view class="submit-btn" @click="handleRegister">
                    <text class="submit-text">立即注册</text>
                </view>

                <!-- 已有账号 -->
                <view class="switch-register">
                    <text class="switch-register-text">已有账号?</text>
                    <text class="switch-register-link" @click="switchTab('login')">立即登录</text>
                </view>

                <!-- 协议 -->
                <view class="agreement">
                    <text class="agreement-text">注册即表示您同意</text>
                    <text class="agreement-link" @click="openProtocol('user')">《用户协议》</text>
                    <text class="agreement-text">和</text>
                    <text class="agreement-link" @click="openProtocol('privacy')">《隐私政策》</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            currentTab: 'login', // login | register
            loginType: 'code', // code | password
            codeCountdown: 0,
            timer: null,
            
            // 登录表单
            loginForm: {
                phone: '',
                code: '',
                password: ''
            },
            rememberPwd: false,
            showPassword: false,
            
            // 注册表单
            registerForm: {
                phone: '',
                code: '',
                password: '',
                confirmPassword: ''
            },
            showRegPassword: false,
            showConfirmPassword: false
        }
    },
    methods: {
        // 切换登录/注册
        switchTab(tab) {
            this.currentTab = tab
        },
        
        // 获取验证码
        getCode() {
            if (this.codeCountdown > 0) return
            
            const phone = this.currentTab === 'login' ? this.loginForm.phone : this.registerForm.phone
            
            if (!phone || phone.length !== 11) {
                uni.showToast({
                    title: '请输入正确的手机号',
                    icon: 'none'
                })
                return
            }
            
            // 模拟发送验证码
            uni.showToast({
                title: '验证码已发送',
                icon: 'success'
            })
            
            // 开始倒计时
            this.codeCountdown = 60
            this.timer = setInterval(() => {
                this.codeCountdown--
                if (this.codeCountdown <= 0) {
                    clearInterval(this.timer)
                }
            }, 1000)
        },
        
        // 登录
        handleLogin() {
            if (!this.loginForm.phone) {
                uni.showToast({
                    title: '请输入手机号',
                    icon: 'none'
                })
                return
            }
            
            if (this.loginType === 'code') {
                if (!this.loginForm.code) {
                    uni.showToast({
                        title: '请输入验证码',
                        icon: 'none'
                    })
                    return
                }
            } else {
                if (!this.loginForm.password) {
                    uni.showToast({
                        title: '请输入密码',
                        icon: 'none'
                    })
                    return
                }
            }
            
            // 模拟登录
            uni.showToast({
                title: '登录成功',
                icon: 'success'
            })
            
            setTimeout(() => {
                // 跳转到首页
                uni.switchTab({
                    url: '/pages/index/index'
                })
            }, 1500)
        },
        
        // 注册
        handleRegister() {
            if (!this.registerForm.phone || this.registerForm.phone.length !== 11) {
                uni.showToast({
                    title: '请输入正确的手机号',
                    icon: 'none'
                })
                return
            }
            
            if (!this.registerForm.code) {
                uni.showToast({
                    title: '请输入验证码',
                    icon: 'none'
                })
                return
            }
            
            if (!this.registerForm.password || this.registerForm.password.length < 8) {
                uni.showToast({
                    title: '密码长度至少8位',
                    icon: 'none'
                })
                return
            }
            
            if (this.registerForm.password !== this.registerForm.confirmPassword) {
                uni.showToast({
                    title: '两次密码不一致',
                    icon: 'none'
                })
                return
            }
            
            // 模拟注册
            uni.showToast({
                title: '注册成功',
                icon: 'success'
            })
            
            setTimeout(() => {
                this.switchTab('login')
            }, 1500)
        },
        
        // 忘记密码
        handleForgotPwd() {
            uni.showToast({
                title: '跳转到找回密码',
                icon: 'none'
            })
        },
        
        // 打开协议
        openProtocol(type) {
            uni.showToast({
                title: type === 'user' ? '用户协议' : '隐私政策',
                icon: 'none'
            })
        }
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer)
        }
    }
}
</script>

<style>
.login-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #ff8c42 0%, #ff6b35 50%, #ff5722 100%);
    padding: 80rpx 40rpx 40rpx;
    box-sizing: border-box;
}

/* 顶部区域 */
.header-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 60rpx;
}

.logo-box {
    width: 160rpx;
    height: 160rpx;
    background: #fff;
    border-radius: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30rpx;
    box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.15);
}

.logo-icon {
    font-size: 60rpx;
    color: #4a90e2;
    font-weight: bold;
}

.app-title {
    font-size: 48rpx;
    color: #fff;
    font-weight: bold;
    margin-bottom: 16rpx;
}

.app-subtitle {
    font-size: 26rpx;
    color: rgba(255, 255, 255, 0.9);
}

/* 白色卡片 */
.card-box {
    background: #fff;
    border-radius: 32rpx;
    padding: 50rpx 40rpx;
    box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.1);
}

/* 标签切换 */
.tab-header {
    display: flex;
    justify-content: center;
    gap: 120rpx;
    margin-bottom: 50rpx;
}

.tab-item {
    position: relative;
    padding-bottom: 20rpx;
}

.tab-text {
    font-size: 32rpx;
    color: #999;
    font-weight: 500;
}

.tab-item.active .tab-text {
    color: #F97316;
    font-weight: bold;
}

.tab-line {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60rpx;
    height: 6rpx;
    background: linear-gradient(90deg, #F97316, #EF4444);
    border-radius: 3rpx;
}

/* 表单区域 */
.form-section {
    display: flex;
    flex-direction: column;
    gap: 30rpx;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 16rpx;
}

.input-label {
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
}

.input-box {
    display: flex;
    align-items: center;
    gap: 16rpx;
    border: 2rpx solid #e8e8e8;
    border-radius: 16rpx;
    padding: 24rpx 30rpx;
    background: #fafafa;
}

/* 所有输入框图标统一大小 */
.input-img {
    width: 32rpx;
    height: 32rpx;
    object-fit: contain;
    flex-shrink: 0;
}

/* 眼睛图标大小 */
.eye-img {
    width: 32rpx;
    height: 32rpx;
    object-fit: contain;
    flex-shrink: 0;
}

.form-input {
    flex: 1;
    font-size: 28rpx;
    color: #333;
    background: transparent;
}

.form-input::placeholder {
    color: #ccc;
}

/* 验证码输入 */
.code-input-wrapper {
    display: flex;
    gap: 20rpx;
}

.code-input-box {
    flex: 1;
}

/* 获取验证码按钮：渐变 + 透明度降低 */
.get-code-btn {
    background: linear-gradient(90deg, #F97316, #EF4444);
    opacity: 0.85;
    border-radius: 16rpx;
    padding: 24rpx 32rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.get-code-btn.disabled {
    opacity: 0.45;
}

.get-code-text {
    font-size: 26rpx;
    color: #fff;
    font-weight: 500;
    white-space: nowrap;
}

/* 切换登录方式 */
.switch-type {
    text-align: right;
    margin-top: 10rpx;
}

.switch-text {
    font-size: 26rpx;
    color: #F97316;
}

/* 密码选项 */
.password-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.remember-pwd {
    display: flex;
    align-items: center;
    gap: 10rpx;
}

.remember-text {
    font-size: 24rpx;
    color: #666;
}

.forgot-pwd {
    font-size: 24rpx;
    color: #F97316;
}

/* 登录/注册按钮：主渐变按钮 */
.submit-btn {
    background: linear-gradient(135deg, #F97316, #EF4444);
    border-radius: 50rpx;
    padding: 28rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20rpx;
    box-shadow: 0 10rpx 30rpx rgba(249, 115, 22, 0.3);
}

.submit-text {
    font-size: 32rpx;
    color: #fff;
    font-weight: bold;
}

/* 协议 */
.agreement {
    text-align: center;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 4rpx;
}

.agreement-text {
    font-size: 24rpx;
    color: #999;
}

.agreement-link {
    font-size: 24rpx;
    color: #F97316;
}

/* 其他登录方式 */
.other-login {
    margin-top: 20rpx;
}

.divider {
    display: flex;
    align-items: center;
    gap: 20rpx;
    margin-bottom: 30rpx;
}

.divider-line {
    flex: 1;
    height: 2rpx;
    background: #e8e8e8;
}

.divider-text {
    font-size: 24rpx;
    color: #999;
    white-space: nowrap;
}

.social-btns {
    display: flex;
    justify-content: center;
    gap: 60rpx;
}

.social-btn {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.social-btn.wechat {
    background: #e8f5e9;
}

.social-btn.qq {
    background: #e3f2fd;
}

/* 社交图标大小 */
.social-img {
    width: 42rpx;
    height: 42rpx;
    object-fit: contain;
}

/* 注册切换 */
.switch-register {
    text-align: center;
    display: flex;
    justify-content: center;
    gap: 10rpx;
}

.switch-register-text {
    font-size: 26rpx;
    color: #666;
}

.switch-register-link {
    font-size: 26rpx;
    color: #F97316;
    font-weight: 500;
}
</style>
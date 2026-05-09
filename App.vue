<script>
	import { hasToken } from './utils/auth.js'

	export default {
		onLaunch() {
			if (hasToken()) {
				uni.switchTab({ url: '/pages/index/index' })
			}
		},
		onShow() {
			const pages = getCurrentPages()
			const cur = pages[pages.length - 1]
			const route = cur ? cur.route : ''
			const needLoginTabs = ['pages/index/index', 'pages/study/study', 'pages/profile/profile']
			if (!hasToken() && needLoginTabs.indexOf(route) !== -1) {
				uni.reLaunch({ url: '/pages/login/login' })
			}
		},
		onHide() {}
	}
</script>

<style>
	/*每个页面公共css */
</style>

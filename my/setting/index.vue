<template>
	<view class="padding-lr bg">
		<view class="flex  padding-tb" @click="goNav('/my/setting/xieyi')">
			<view class="flex-sub text-df" style="line-height: 50upx;">用户协议</view>
			<u-icon name="arrow-right"></u-icon>
			
		</view>
		<view class="flex  padding-tb" @click="goNav('/my/setting/mimi')">
			<view class="flex-sub text-df" style="line-height: 50upx;">隐私政策</view>
			<u-icon name="arrow-right"></u-icon>
		</view>
		<view class="flex  padding-tb" @click="goNav('/my/setting/about')">
			<view class="flex-sub text-df" style="line-height: 50upx;">关于我们</view>
			<u-icon name="arrow-right"></u-icon>
		</view>
		<view class="flex  padding-tb" @click="goNav('/my/setting/logOff')">
			<view class="flex-sub text-df" style="line-height: 50upx;">注销帐号</view>
			<u-icon name="arrow-right"></u-icon>
		</view>
		<view class="flex  padding-tb" @click="TuiLogin()">
			<view class="flex-sub text-df" style="line-height: 50upx;">退出登录</view>
			<u-icon name="arrow-right"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			goNav(e) {
				uni.navigateTo({
					url: e
				})
			},
			//退出登录
			TuiLogin() {
				let that = this
				if (uni.getStorageSync('token')) {
					uni.showModal({
						title: '提示',
						content: '确定退出登录吗？',
						success: function(res) {
							if (res.confirm) {
								uni.removeStorageSync('token')
								uni.removeStorageSync('userId')
								uni.showToast({
									title: '退出成功！',
									icon: 'none'
								})
								uni.switchTab({
									url:'/pages/my/index'
								})
								// uni.reLaunch({
								// 	url:'/pages/my/index'
								// })
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
			},
		}

	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	.btn {
		width: 100%;
		height: 80upx;
		background: #005dff;
		border-radius: 6upx;
		text-align: center;
		line-height: 80upx;
		margin-top: 40upx;
		font-size: 34upx;
		color: #fff;
	}
</style>

<template>
	<view class="container">
		<view class="bulebg"></view>
		<view @click="navBack()">
			<image src="../../static/images/zf/back.png" class="bg-back"
				:style="{top:searchBarTop + searchBarHeight - 20 + 'px'}"></image>
		</view>
		<view class="wrapper">
			<view style="margin-left: 36upx;color: #333333;font-size: 42upx;font-weight: 500;padding-top:200rpx;">
				<view style="">您好！ </view>
				<view style="margin-top: 20upx;">欢迎来到码兄租房</view>
			</view>
			<view style="margin:104upx 26upx 0;">

				<wInput :icon="iconphone" v-model="phone" type="number" maxlength="11" placeholder="请输入手机号"></wInput>

				<wInput :icon="iconmsg" v-model="password" type="password" maxlength="20" placeholder="请输入账号密码" :isReturn="true" @toLogin="toLogin">
				</wInput>

			</view>

			<view class="flex justify-between" style="margin: 0 26upx;">
				<view class="" style="color: #999999;font-size: 26rpx;" @click="register()"> 快速注册</view>
				<view class="" style="color: #999999;font-size: 26rpx;" @click="forget()"> 忘记密码？</view>
				<view class="" style="color: #999999;font-size: 26rpx;" @click="goPhone()"> 验证码登录</view>
			</view>








			<!-- <view class="input-content">
				<view class="cu-form-group"
					style="border: 2upx solid whitesmoke;margin-bottom: 20px;border-radius: 30px">
					<view class="title text-black">账号</view>
					<input type="number" :value="phone" placeholder="请输入手机号" maxlength="11" data-key="phone"
						@input="inputChange" />
				</view>
				<view class="cu-form-group" style="border: 2upx solid whitesmoke;border-radius: 30px">
					<view class="title text-black">密码</view>
					<input type="password" placeholder="请输入密码" maxlength="20" :value="password" data-key="password"
						@input="inputChange" @confirm="toLogin" />
					<text class="send-msg" @click="forget">忘记密码</text>
				</view>
			</view> -->
			<button class="confirm-btn" @click="toLogin">登录</button>
			<view class="footer">
				<image v-if="showAgree" @tap="isShowAgree"
					src="https://api.shengqianxiong.com.cn/img/20201112/669aa8946cfb4ebdb459d57193c0ebca.png"
					style="width: 24upx;height: 24upx;"></image>
				<image v-else @tap="isShowAgree"
					src="https://api.shengqianxiong.com.cn/img/20201112/1e9102fc891f4d86a13c7b2ba6921cba.png"
					style="width: 24upx;height: 24upx;"></image>
				<text style="margin-left: 10upx;">登录/注册代表你同意</text>
				<navigator url="/my/setting/mimi" open-type="navigate"><text style="color: #4B74FF;">《隐私政策》</text>
				</navigator>及
				<navigator url="/my/setting/xieyi" open-type="navigate"><text style="color: #4B74FF;">《用户服务协议》</text>
				</navigator>
			</view>
			<!-- 	<view style="margin-top: 32px;text-align: center">
				<view><text style="color: #999999;font-size: 28upx;">没有账号？</text>
					<text style="color: #fd6416" @click="register()">立即注册</text>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {
		loginApp
	} from '@/apis/login.js'
	import {
		queryInsert
	} from '@/apis/my.js'
	import wInput from '@/components/watch-login/watch-input.vue' //input
	export default {
		components: {
			wInput
		},
		data() {
			return {
				iconphone: '/static/images/zf/sjh.png',
				iconmsg: '/static/images/zf/msg.png',

				phone: '',
				password: '',
				banners: [],
				invitation: '',
				loginName: '',
				sending: false,
				sendTime: '获取验证码',
				count: 60,
				showAgree: false, //协议是否选择
				searchBarTop: 60, //搜索栏的外边框高度，单位px
				searchBarHeight: 0, //搜索栏的高度，单位px
			}
		},
		onLoad() {
			// #ifdef MP-WEIXIN
			let topHeight = uni.getSystemInfoSync().statusBarHeight
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.searchBarTop = topHeight;
			this.searchBarHeight = menuButtonInfo.height;
			// #endif
		},
		methods: {
			// 是否选择协议
			isShowAgree() {
				this.showAgree = !this.showAgree
			},
			//短信验证码登录
			goPhone() {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			// 返回
			navBack() {
				uni.navigateBack()
			},
			getUserInforz() { //获取认证信息
				queryInsert().then(res => {
					if (res.code == 0 && res.data) {
						//认证类型 1:个人 2:企业
						uni.setStorageSync('statusType', res.data.userType)
						//认证状态 0:审核中 1:通过 2:拒绝
						uni.setStorageSync('statusStauts', res.data.status)
					} else {
						uni.removeStorageSync('statusType')
						uni.removeStorageSync('statusStauts')
					}
				})
			},
			forget() {
				uni.navigateTo({
					url: '/pages/public/forgetPwd'
				});
			},
			register() {
				uni.navigateTo({
					url: '/pages/public/register'
				});
			},
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},

			toLogin() {
				this.$queue.loginClear();
				let openid = this.$queue.getData("openid");
				const {
					phone,
					password
				} = this;
				if (!phone) {
					this.$queue.showToast("请输入手机号");
				} else if (phone.length != 11) {
					this.$queue.showToast("请输入正确的手机号");
				} else if (!password) {
					this.$queue.showToast("请输入密码");
				} else {
					if (this.showAgree != true) {
						uni.showToast({
							title: '请同意《隐私政策》和《用户服务协议》',
							icon: 'none'
						})
						return
					}
					this.$queue.showLoading("正在登录中...");
					let data = {
						password: password,
						phone: phone,
						// openId: this.$queue.getData('openid')
					}
					loginApp(data).then(res => {
						uni.hideLoading()
						if (res.code == 0) {
							uni.setStorageSync('token', res.token)
							uni.setStorageSync('userInfo', res.user)
							uni.setStorageSync('userId', res.user.userId)
							this.getUserInforz()
							uni.switchTab({
								url: '/pages/my/index'
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					})
				}
			},
		},

	}
</script>

<style lang='scss'>
	page {
		height: 100%;
		background: #FFF;
	}

	.bulebg {
		width: 100%;
		height: 600rpx;
		background-image: url('/static/images/zf/loginbg.png');
		background-size: 100% 100%;
		// background: linear-gradient(to bottom, #eaeeff, #FFFFFF);
		position: fixed;
		top: 0rpx;
		left: 0;
		right: 0;
	}

	.bg-back {
		position: flex;
		/* // top: 80rpx; */
		left: 30rpx;
		width: 30rpx;
		height: 30rpx;

		z-index: 999;
	}

	.send-msg {
		border-radius: 30px;
		color: black;
		background: white;
		height: 30px;
		font-size: 14px;
		line-height: 30px;
	}

	.container {
		top: 0;
		padding-top: 32upx;
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		padding-bottom: 32upx;
	}


	.input-content {
		/* margin-top: 300upx; */
		/* padding-top: 300upx; */
		padding: 32upx 80upx;

	}


	.confirm-btn {
		width: 686rpx;
		height: 88upx;
		line-height: 88upx;
		border-radius: 60upx;
		margin-top: 120upx;
		background: #4B74FF;
		color: #fff;
		font-size: 32upx;

		&:after {
			border-radius: 60px;
		}
	}

	.footer {
		margin-top: 32upx;
		font-size: 24upx;
		color: #999999;
		// text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
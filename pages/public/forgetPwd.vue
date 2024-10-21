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

				<wInput :icon="iconphone" v-model="phone" type="number" maxlength="11" placeholder="请输入手机号" isShowCode
					ref="runCode" @setCode="sendMsgs()"></wInput>
				<!-- <wInput v-model="passData" type="number" maxlength="6" placeholder="请输入密码"></wInput> -->
				<wInput :icon="iconmsg" v-model="code" type="number" maxlength="6" placeholder="请输入手机验证码"></wInput>

				<wInput :icon="iconmsg" v-model="password" type="password" maxlength="20" placeholder="请输入账号密码">
				</wInput>
			</view>
			<view class="flex justify-between" style="margin: 0 26upx;">
				<view class="" style="color: #999999;font-size: 26rpx;" @click="register()"> 快速注册</view>
				<view class="" style="color: #999999;font-size: 26rpx;" @click="loginPhone()"> 账号密码登录</view>
			</view>


		<!-- 	<view class="input-content">
				<view class="cu-form-group"
					style="border: 2upx solid whitesmoke;margin-bottom: 20px;border-radius: 30px">
					<view class="title text-black">手机号</view>
					<input type="number" :value="phone" placeholder="请输入手机号" maxlength="11" data-key="phone"
						@input="inputChange" />
				</view>
				<view class="cu-form-group"
					style="border: 2upx solid whitesmoke;margin-bottom: 20px;border-radius: 30px">
					<text class="title text-black">验证码</text>
					<input type="number" :value="code" placeholder="请输入验证码" maxlength="6" data-key="code"
						@input="inputChange" @confirm="toLogin" />
					<button class="send-msg" @click="sendMsgs" :disabled="sending">{{sendTime}}</button>
				</view>
				<view class="cu-form-group"
					style="border: 2upx solid whitesmoke;margin-bottom: 20px;border-radius: 30px">
					<text class="title text-black">设置密码</text>
					<input type="password" :value="password" placeholder="请设置新密码" placeholder-class="input-empty"
						maxlength="20" minlength="6" data-key="password" @input="inputChange" @confirm="toLogin" />
				</view>
			</view> -->
			<button class="confirm-btn" @click="toLogin">立即找回</button>
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
		</view>
	</view>
</template>

<script>
	import {
		sendMsg,
		forgetPwd
	} from '@/apis/login.js'
	import wInput from '@/components/watch-login/watch-input.vue' //input
	export default {
		components: {
			wInput
		},
		data() {
			return {
				iconphone: '/static/images/zf/sjh.png',
				iconmsg: '/static/images/zf/yzm.png',


				code: '',
				phone: '',
				password: '',
				sending: false,
				sendTime: '获取验证码',
				count: 60,
				logining: false,
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
			// 账号密码登录
			loginPhone() {
				uni.navigateTo({
					url: '/pages/public/loginphone'
				})
			},
			// 跳转注册
			register() {
				uni.navigateTo({
					url: '/pages/public/register'
				});
			},
			sendMsgs() {
				const {
					phone
				} = this;
				if (!phone) {
					this.$queue.showToast("请输入手机号");
				} else if (phone.length !== 11) {
					this.$queue.showToast("请输入正确的手机号");
				} else {
					this.$queue.showLoading("正在发送验证码...");
					let data = {
						phone: phone
					}
					sendMsg(data).then(res => {
						console.log(res)
						if (res.code === 0) {
							this.sending = true;
							this.$queue.showToast('验证码发送成功请注意查收');
							this.countDown();
							uni.hideLoading();
						} else {
							uni.hideLoading();
							uni.showModal({
								showCancel: false,
								title: '短信发送失败',
								content: res.msg ? res.msg : '请一分钟后再获取验证码'
							});
						}
					})
				}
			},
			countDown() {
				const {
					count
				} = this;
				if (count === 1) {
					this.count = 60;
					this.sending = false;
					this.sendTime = '获取验证码'
				} else {
					this.count = count - 1;
					this.sending = true;
					this.sendTime = count - 1 + '秒后重新获取';
					setTimeout(this.countDown.bind(this), 1000);
				}
			},
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack() {
				uni.navigateBack();
			},


			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			toLogin() {
				const {
					phone,
					password,
					code
				} = this;
				if (!phone) {
					this.$queue.showToast("请输入手机号");
				} else if (!password) {
					this.$queue.showToast("请设置密码");
				} else if (password.length < 6) {
					this.$queue.showToast("密码位数必须大于六位");
				} else {
					if (this.showAgree != true) {
						uni.showToast({
							title: '请同意《隐私政策》和《用户服务协议》',
							icon: 'none'
						})
						return
					}
					this.logining = true;
					this.$queue.showLoading("正在修改密码中...");
					let data = {
						pwd: password,
						phone: phone,
						msg: code
					}
					forgetPwd(data).then(res => {
						if (res.code == 0) {
							// uni.navigateBack()
							uni.navigateTo({
								url:'/pages/public/loginphone'
							})
						} else {
							uni.showModal({
								showCancel: false,
								title: '密码找回失败',
								content: res.msg,
							});
						}
					})
					// this.$Request.post("/app/Login/forgetPwd", {
					// 	pwd: password,
					// 	phone: phone,
					// 	msg: code
					// }).then(res => {
					// 	uni.hideLoading();
					// 	if (res.code === 0) {
					// 		uni.navigateTo({
					// 			url: '/pages/public/loginphone'
					// 		});
					// 	} else {

					// 		uni.showModal({
					// 			showCancel: false,
					// 			title: '密码找回失败',
					// 			content: res.msg,
					// 		});
					// 	}
					// });
				}
			},
		},

	}
</script>

<style lang='scss'>
	page {
		height: 100%;
		background: #fff;
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
		color: white;
		height: 30px;
		font-size: 14px;
		line-height: 30px;
		background: #fd6416;
	}

	.container {
		padding-top: 32upx;
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		padding-bottom: 20px;
	}


	.input-content {
		padding: 32upx 80upx;
	}


	.confirm-btn {
		width: 686rpx;
		height: 88upx;
		line-height: 88upx;
		border-radius: 60upx;
		margin-top: 160upx;
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
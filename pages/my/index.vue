<template>
	<view class="feadtop">
		<view class="bgImg">
			<image src="/static/images/my/bg.png" style="width: 100%;height: 100%;"></image>
		</view>
		<view style="position: relative;z-index: 99;top: 70rpx;">
			<view class="padding-lr ">
				<view class="flex align-center">
					<view class="u-m-r-10">
						<image :src="userInfo.avatar?userInfo.avatar:avatar"
							style="width: 100rpx;height: 100rpx;border-radius: 100rpx;" @click="goUserInfo"></image>
					</view>
					<view class="u-flex-1 u-m-l-10" v-if="!isLogin">
						<view class="u-font-18 margin-left-sm text-bold flex">
							{{userInfo.userName}}
							<view class="renz" @click="gofabu">
								<text v-if="statusStauts==-1">未认证</text>
								<text v-else-if="statusStauts==0">待审核</text>
								<text v-else-if="statusStauts==1">已认证</text>
								<text v-else-if="statusStauts==2">已拒绝</text>

							</view>
						</view>
						<view v-if="isVip==0" class=" margin-left-sm  text-sm">暂未开通会员</view>
						<view v-else class=" margin-left-sm  text-sm " style="margin-top:6rpx">会员用户</view>
					</view>
					<view v-else class="text-xl u-p-l-20 text-bold" @click="goLogin('/pages/public/login')">
						登录
					</view>
				</view>

				<view class="flex align-center justify-between margin-top padding-lr" v-if="XCXIsSelect!='否'">
					<view class="text-center " @click="goNav('/my/feedback/shouCang')">
						<image src="../../static/images/my/shoucang.png" style="width: 52rpx;height: 52rpx;"></image>
						<view class="margin-top-xs">我的收藏</view>
					</view>

					<view class="text-center" style="width: 33%;" @click="goNav('/my/feedback/zuji')">
						<image src="../../static/images/my/liulan.png" style="width: 52rpx;height: 52rpx;"></image>
						<view class="margin-top-xs">浏览记录</view>
					</view>
					<view class="text-center" @click="changekefu">
						<image src="../../static/images/my/kefu.png" style="width: 52rpx;height: 52rpx;"></image>
						<view class="margin-top-xs">客服中心</view>
					</view>
				</view>


				<view class="vipbox" style="position: relative;" v-if="XCXIsSelect!='否'">
					<!-- <image src="../../static/images/my/vipbg.png" style="width: 100%;height: 90rpx;" mode=""></image> -->
					<view class="flex align-center ">
						<view class="flex align-center justify-end">
							<view class="vptiitl">开通会员</view>
							<image src="/static/images/my/iconvip.png" style="width: 24rpx;height: 22rpx;"></image>
						</view>
						<view class="viptit">用户专享:无忧发布等权益</view>
					</view>
					<view v-if="isVip==0" class="btn-bg" @click="goNav('/my/vip/index')">立即开通 </view>
					<view v-else class="btn-bg" @click="goNav('/my/vip/index')">已开通</view>
				</view>
			</view>

			<view class="bg margin-lr margin-tb-sm padding-lr-sm padding-tb" v-if="XCXIsSelect!='否'"
				style="border-radius: 24rpx;">
				<view class="text-lg text-bold ">房屋出租</view>
				<view class="flex justify-between text-center margin-top">
					<!-- 我要租赁 -->
					<view class="zulin" @click="goNav('/my/publish/Housing',1)">
						<!-- <view class="tit">我要租赁</view>
						<view class="btns">我要租赁</view> -->
						<image src="../../static/images/my/zulin.png" style="width: 100%;hieght:100%"></image>
					</view>

					<!-- 房屋管理 -->
					<view class="fwgl" @click="goNav('/my/store/hourse',2)">
						<!-- <view class="tit">房屋管理</view> -->
						<!-- <view class="btns">房屋管理</view> -->
						<image src="../../static/images/my/fwgl.png" style="width: 100%;hieght:100%"></image>
					</view>
				</view>
			</view>

			<view class="margin-lr margin-tb-sm" style="position: relative;" @click="goNav('/pages/my/invitationUser')">
				<image src="/static/images/my/myyabg.png" style="width: 100%;height: 126rpx;"></image>
				<view class="yqbtn">立即邀请</view>
			</view>

			<view class="bg margin-lr margin-tb-sm" style="border-radius: 24rpx;">
				<view class="text-lg text-bold padding">常用工具</view>
				<view style="width: 100%;height: 1rpx;background: #f4f4f4;"></view>
				<view class="flex text-center flex-wrap ">
					<!-- 联系客服 -->
					<!-- <view @click="changekefu" style="width: 25%;padding:35rpx 0;" v-if="XCXIsSelect!='否'">
						<image src="../../static/images/my/kefu.png" style="width: 46upx;height: 46upx;" mode="">
						</image>
						<view class="text-sm" style="line-height: 50upx;">客服中心</view>
					</view> -->

					<!-- 我的优惠券 -->
					<!-- <view style="width: 25%;padding:35rpx 0;" v-if="XCXIsSelect!='否'">
						<image src="../../static/images/my/youhuijuan.png" style="width: 46upx;height: 46upx;" mode="">
						</image>
						<view class="text-sm" style="line-height: 50upx;">我的优惠券</view>
					</view> -->
					<!-- 举报中心 -->
					<view @click="goNav('/my/feedback/myTousu')" style="width: 25%;padding:35rpx 0;"
						v-if="XCXIsSelect!='否'">
						<image src="../../static/images/my/tousu.png" style="width: 46upx;height: 46upx;" mode="">
						</image>
						<view class="text-sm" style="line-height: 50upx;">举报中心</view>
					</view>
					<!-- 邀请好友 -->
					<view class="padding-bottom" @click="goNav('/pages/my/invitationUser')"
						style="width: 25%;padding:35rpx 0;" v-if="XCXIsSelect!='否'">
						<image src="../../static/images/my/team.png" style="width: 46upx;height: 46upx;" mode="">
						</image>
						<view class="text-sm" style="line-height: 50upx;">邀请好友</view>
					</view>
					<!-- 我的分销 -->
					<view class="" @click="goNav('/my/team/team')" style="width: 25%;padding:35rpx 0;" v-if="zhiRate>0">
						<image src="../../static/images/my/fenxiao.png" style="width: 46upx;height: 46upx;" mode="">
						</image>
						<view class="text-sm" style="line-height: 50upx;">我的分销</view>
					</view>
					<!-- 帮助中心 -->
					<view class="padding-bottom" @click="goNav('/my/setting/help')" style="width: 25%;padding:35rpx 0;">
						<image src="../../static/images/my/help.png" style="width: 46upx;height: 46upx;" mode="">
						</image>
						<view class="text-sm" style="line-height: 50upx;">帮助中心</view>
					</view>
					<!-- 意见反馈 -->
					<view class="padding-bottom" @click="goNav('/my/feedback/index')" style="width: 25%;"
						v-if="XCXIsSelect!='否'" :style="isLogin?'padding:35rpx 0;':''">
						<image src="../../static/images/my/yijian.png" style="width: 46upx;height: 46upx;" mode="">
						</image>
						<view class="text-sm" style="line-height: 50upx;">意见反馈</view>
					</view>
					<!-- 设置中心 -->
					<view class="padding-bottom" v-if="token" @click="goNav('/my/setting/index')" style="width: 25%;">
						<image src="../../static/images/my/login.png" style="width: 46upx;height: 46upx;" mode="">
						</image>
						<view class="text-sm" style="line-height: 50upx;">设置中心</view>
					</view>


					<!-- 我的认证 -->
					<!-- <view class="padding-bottom-sm" v-if="XCXIsSelect!='否'"
						@click="statusType==''?goNav('/my/renzheng/check'):(statusType==1?goNav('/my/renzheng/index'):goNav('/my/renzheng/company'))"
						style="width: 25%;">
						<image src="../../static/images/my/renzheng.png" style="width: 55upx;height: 55upx;" mode="">
						</image>
						<view class="text-df" style="line-height: 50upx;">我的认证</view>
					</view> -->
					<!-- 会员中心 -->
					<!-- <view class="padding-bottom-sm" @click="goNav('/my/vip/index')" style="width: 25%;"
						v-if="XCXIsSelect!='否'">
						<image src="../../static/images/my/vip.png" style="width: 55upx;height: 55upx;" mode=""></image>
						<view class="text-df" style="line-height: 50upx;">会员中心</view>
					</view> -->
				</view>
			</view>
			<!-- <u-tabbar :list="tabbarList" :mid-button="true" bg-color="#FFFFFF" active-color="#FF6800"
			inactive-color="#CCCCCC">
		</u-tabbar> -->
		</view>
	</view>
</template>

<script>
	import {
		userInfo
	} from '@/apis/login.js'
	import {
		selectAmount,
		queryInsert
	} from '@/apis/my.js'
	export default {
		data() {
			return {
				tabbarList: this.$store.state.list,
				avatar: '../../static/logo.png',
				isLogin: true,
				userName: '匿名',
				token: '',
				invitationCode: '', //邀请码
				renzheng: 0,
				userId: '',
				userInfo: {},

				statusType: '',
				statusStauts: -1,
				isVip: 0, //未开通
				XCXIsSelect: '否',
				zhiRate: 0,
				isSubmit: 0,
				maxfabu: 0
			}
		},
		onLoad() {

		},
		onShow() {
			this.maxfabu = this.$queue.getData('maxfabu')
			this.XCXIsSelect = this.$queue.getData('XCXIsSelect')
			this.token = uni.getStorageSync('token')
			this.userId = uni.getStorageSync('userId')
			console.log(this.userId)
			if (this.userId) {
				this.getUserInforz()
				this.isLogin = false
				this.getUserInfo()

				//获取认证信息
				// this.getQueryInsert()
				if (uni.getStorageSync('statusType')) {
					this.statusType = uni.getStorageSync('statusType')
				}
				if (uni.getStorageSync('statusStauts')) {
					this.statusStauts = uni.getStorageSync('statusStauts')
				}

			} else {
				this.userInfo = {}
				this.isLogin = true
				this.userName = '匿名'

				this.avatar = '../../static/logo.png'
			}

		},
		methods: {
			gofabu() {
				if (this.userId) {
					if (uni.getStorageSync('statusType')) {
						console.log(uni.getStorageSync('statusType'))
						if (uni.getStorageSync('statusType') == 1) { //用户
							if (uni.getStorageSync('statusStauts') == 2) {
								uni.showModal({
									title: '提示',
									content: '认证未通过，请重新认证',
									complete(ret) {
										if (ret.confirm) {
											uni.navigateTo({
												url: '/my/renzheng/index'
											})
										}
									}
								})

							} else if (uni.getStorageSync('statusStauts') == 0) {
								uni.showToast({
									title: '认证审核中，请等待审核通过',
									icon: 'none',
									duration: 1200
								})
							}

						} else if (uni.getStorageSync('statusType') == 2) { //2 企业
							if (uni.getStorageSync('statusStauts') == 2) {
								// if (this.isSubmit == 0) {
								// 	uni.showModal({
								// 		title: '提示',
								// 		content: '认证未通过，请重新认证',
								// 		complete(ret) {
								// 			if (ret.confirm) {
								// 				uni.navigateTo({
								// 					url: '/my/renzheng/company'
								// 				})
								// 			}
								// 		}
								// 	})
								// } else {
								// 	uni.navigateTo({
								// 		url: '/my/renzheng/check'
								// 	})

								// }
								uni.showModal({
									title: '提示',
									content: '认证未通过，请重新认证',
									complete(ret) {
										if (ret.confirm) {
											uni.navigateTo({
												url: '/my/renzheng/company'
											})
										}
									}
								})
							} else if (uni.getStorageSync('statusStauts') == 0) {
								uni.showToast({
									title: '认证审核中，请等待审核通过',
									icon: 'none',
									duration: 1200
								})
							}

						}

					} else {
						uni.showModal({
							title: '提示',
							content: '请先进行认证',
							complete(ret) {
								if (ret.confirm) {
									uni.navigateTo({
										url: '/my/renzheng/check'
									})

								}
							}
						})
					}

				} else {
					uni.showModal({
						title: '提示',
						content: '您还未登录,请先登录',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({
									url: '/pages/public/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
			},
			getUserInforz() { //获取认证信息
				queryInsert().then(res => {
					if (res.code == 0 && res.data) {
						//认证类型 1:个人 2:企业
						uni.setStorageSync('statusType', res.data.userType)
						//认证状态 0:审核中 1:通过 2:拒绝
						uni.setStorageSync('statusStauts', res.data.status)
						this.statusStauts = res.data.status
						this.isSubmit = res.data.isSubmit
					} else {
						uni.removeStorageSync('statusType')
						uni.removeStorageSync('statusStauts')
						this.statusStauts = -1
					}
				})
			},
			//联系客服
			changekefu() {
				let kefu = this.$queue.getData('kefu'); // 用户端联系方式 1 手机号 2企业微信 
				let kefuPhone = this.$queue.getData('kefuPhone');
				if (kefu == 1) {
					uni.makePhoneCall({
						phoneNumber: kefuPhone //仅为示例
					});
				} else if (kefu == 2) {
					// #ifdef MP-WEIXIN
					let that = this
					try {
						wx.openCustomerServiceChat({
							extInfo: {
								url: that.$queue.getData('kefuUrl')
							},
							corpId: that.$queue.getData('kefuAppId'),
							success(res) {},
							fail(res) {
								console.error(res)
							}
						})
					} catch (error) {
						console.error("catchcatch" + error)
						uni.showToast({
							title: '请更新至微信最新版本'
						});
					}
					// #endif
					// #ifndef MP-WEIXIN
					let url = this.$queue.getData('kefuUrl');
					if (url.indexOf('/pages/') !== -1 || url.indexOf('/my/') !== -1) {
						uni.navigateTo({
							url
						});
					} else {
						//#ifndef H5
						uni.navigateTo({
							url: '/pages/index/webView?url=' + url
						});
						//#endif
						//#ifdef H5
						window.location.href = url;
						//#endif
					}
					// #endif
				} else if (kefu == 3) {
					uni.navigateTo({
						url: '/my/kefu/kefu'
					});
				}
			},
			goUserInfo() {
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '/my/userInfo/userInfo'
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '您还未登录,请先登录',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({
									url: '/pages/public/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
			},
			//获取用户认证信息查询
			getQueryInsert() {
				queryInsert().then(res => {
					if (res.code == 0 && res.data) {
						this.statusType = res.data.userType
						// uni.setStorageSync('userType',res.data.userType)
					} else {
						this.statusType = ''
					}
				})
			},

			goNav(e, type) {
				console.log(e)
				let that = this
				if (that.userId) {
					if (type == 1) {
						if (that.statusStauts != 1) {
							this.gofabu()
							return
						}
						if (this.isVip == 0) {
							this.$Request.getT('/app/zfRoomType/getZfInfo').then(res => {
								if (res.code == 0 && res.data) {
									if (res.data.allCount < this.maxfabu) {
										uni.navigateTo({
											url: e
										})
									} else {
										uni.showModal({
											title: '提示',
											content: '您的免费发布次数已达上线,开通会员可享受更多特权',
											success: function(res) {
												if (res.confirm) {
													console.log('用户点击确定');
													uni.navigateTo({
														url: '/my/vip/index'
													})
												} else if (res.cancel) {
													console.log('用户点击取消');
												}
											}
										})
									}
								}
							});
						} else {
							uni.navigateTo({
								url: e
							})
						}

					} else if (type == 2) {
						if (that.statusStauts != 1) {
							this.gofabu()
							return
						}

						uni.navigateTo({
							url: e
						})
					} else {
						uni.navigateTo({
							url: e
						})
					}


				} else {
					uni.showModal({
						title: '提示',
						content: '您还未登录,请先登录',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								uni.navigateTo({
									url: '/pages/public/login'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
			},
			goLogin(e) {
				uni.navigateTo({
					url: e
				})
			},
			//获取用户信息
			getUserInfo() {
				let data = {
					userId: this.userId
				}
				userInfo(data).then(res => {
					if (res.code == 0) {
						this.userInfo = res.data
						this.zhiRate = res.data.zhiRate ? res.data.zhiRate : '0'
						this.isVip = res.data.isVip
						this.invitationCode = res.data.invitationCode
						uni.setStorageSync('invitationCode', res.data.invitationCode)
						uni.setStorageSync('userName', res.data.userName)
						uni.setStorageSync('avatar', res.data.avatar)
						uni.setStorageSync('userInfo', res.data)
						// uni.setStorageSync('userType',res.data.userType)
					} else if (res.code == 401) {
						uni.clearStorageSync();
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F7FF;
	}

	.bg {
		background: #FFFFFF;
	}

	.feadtop {
		/* #ifdef APP */
		padding-top: 100rpx;
		/* #endif */
	}

	.bgImg {
		width: 100%;
		height: 643rpx;
		// background-image: url('/static/images/my/bg.png');
		// background-size: 100% 100%;
		position: fixed;
		top: 0rpx;
		z-index: 0;
	}


	.gobtn {
		width: 120upx;
		height: 48upx;
		background: #ffffff;
		border-radius: 24upx;
		font-size: 23upx;
		color: #333333;
		text-align: center;
		line-height: 48upx;
	}

	.renz {
		// width: 79rpx;
		height: 45rpx;
		line-height: 45rpx;
		border: 1px solid #999999;
		color: #999999;
		font-size: 24rpx;
		font-weight: 400;
		padding: 0rpx 8rpx;
		margin-left: 15rpx;

	}

	// 会员样式
	.vipbox {
		width: 686rpx;
		height: 84rpx;
		background: #333333;
		border-radius: 16rpx;
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 27rpx;
	}

	.vptiitl {
		width: 110rpx;
		height: 30rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFF0E5;
		line-height: 32rpx;

		background: linear-gradient(0deg, #D9C7A7 0%, #F1DEC3 44.921875%, #C8A076 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.viptit {
		width: 247rpx;
		height: 22rpx;
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #A59974;
		line-height: 22rpx;
		margin-left: 15rpx;
	}

	.btn-bg {
		width: 119rpx;
		height: 45rpx;
		background: linear-gradient(0deg, #FBE2B7 0%, #FCC573 100%);
		box-shadow: 0rpx -3rpx 9rpx 0rpx rgba(255, 255, 255, 0.46);
		border-radius: 23rpx;
		// width: 87rpx;
		// height: 21rpx;
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #9B5605;
		line-height: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.zulin {
		width: 318rpx;
		height: 116rpx;

		image {
			width: 318rpx;
			height: 116rpx;
		}

		// background: url('/static/images/my/zulin.png');
		// background-size: 100% 100%;
		// display: flex;
		// align-items: center;
		// justify-content: space-between;

		// .tit {
		// 	font-size: 28rpx;
		// 	font-family: PingFang SC;
		// 	font-weight: bold;
		// 	color: #10035B;
		// 	margin-left: 25rpx;
		// }

		// .btns {
		// 	width: 124rpx;
		// 	height: 46rpx;
		// 	background: linear-gradient(-90deg, #B5C1FF 0%, #CED7FE 100%);
		// 	border-radius: 23rpx;
		// 	font-size: 24rpx;
		// 	font-family: PingFang SC;
		// 	font-weight: bold;
		// 	color: #2B2372;
		// 	display: flex;
		// 	align-items: center;
		// 	justify-content: center;
		// 	margin-right: 22rpx;
		// }
	}

	.fwgl {
		width: 318rpx;
		height: 116rpx;

		// background: url('/static/images/my/fwgl.png');
		// background-size: 100% 100%;
		// display: flex;
		// align-items: center;
		// justify-content: space-between;
		image {
			width: 318rpx;
			height: 116rpx;
		}

		// .tit {
		// 	font-size: 28rpx;
		// 	font-family: PingFang SC;
		// 	font-weight: bold;
		// 	color: #0B5059;
		// 	margin-left: 25rpx;
		// }

		// .btns {
		// 	width: 124rpx;
		// 	height: 46rpx;
		// 	background: linear-gradient(-90deg, #73D8DC 0%, #ABEEE1 100%);
		// 	border-radius: 23rpx;
		// 	font-size: 24rpx;
		// 	font-family: PingFang SC;
		// 	font-weight: bold;
		// 	color: #0B5059;
		// 	display: flex;
		// 	align-items: center;
		// 	justify-content: center;
		// 	margin-right: 22rpx;
		// }
	}

	.yqbtn {
		width: 156rpx;
		height: 55rpx;
		background: #FFFFFF;
		border-radius: 28rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #4B74FF;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 38rpx;
		right: 44rpx;
		z-index: 9''
	}
</style>
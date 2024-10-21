<template>
	<view class="u-skeleton" style="padding-bottom:150upx;">
		<view class=" bg-white u-skeleton-fillet">
			<swiper class="swiper" :autoplay="true" interval="2000" duration="500" :circular="true"
				style="width: 100%;height:460rpx;">
				<swiper-item @click="priveImgs(index,info.imgOrVideoUrl)" v-for="(item,index) in info.imgOrVideoUrl"
					:key='index'>
					<image :src="item" mode="aspectFill" style="width: 100%;height: 460rpx;">
					</image>
				</swiper-item>
			</swiper>
		</view>
		<view class=" bg-white u-skeleton-fillet" style="padding: 30rpx 30rpx 20rpx 30rpx;">
			<view class="text-lg text-bold text-black">{{info.title}}</view>
			<view class="flex  justify-between margin-top-sm">
				<view class="flex align-center ">
					<view class="price">{{info.money}}<text>元/月</text></view>
					<view class="tit margin-left-xs margin-top-xs">{{info.payWay}}</view>
				</view>
				<view class="flex align-center tit" style="margin-top: 4rpx;" v-if="info.containCost"
					@click="show = true">
					<view>费用详情</view>
					<u-icon name="arrow-right" color="#949494" size="22"></u-icon>
				</view>
			</view>

			<view style="width: 100%;height: 1rpx;background: #E6E6E6;margin: 20rpx 0;"></view>
			<view class="flex align-center">
				<view class=" text-center ">
					<view class="fiy">{{info.bedroomCount}}室{{info.livingRoomCount}}厅{{info.toiletCount}}卫</view>
					<view class="tits">房型</view>
				</view>
				<view class="flex-sub text-center padding-left">
					<view class="fiy">{{info.roomArea}}m²</view>
					<view class="tits">面积</view>
				</view>
				<view class="flex-sub text-center padding-left">
					<view class="fiy">{{info.maxFloor}}层/{{info.floor}}层</view>
					<view class="tits">楼层</view>
				</view>
				<view class=" text-center " style="padding-left:70rpx">
					<view class="fiy">{{info.toward}}</view>
					<view class="tits">朝向</view>
				</view>

			</view>
		</view>


		<view class="padding bg-white u-skeleton-fillet margin-top-xs flex align-center justify-between"
			@click="gotoMap()">
			<view class="flex align-center ">
				<image src="../../../static/images/index/address.png"
					style="width: 30rpx;height: 30rpx;margin-right:15rpx;"></image>
				{{info.address}}
			</view>
			<u-icon name="arrow-right" color="#666666" size="25"></u-icon>
		</view>

		<view class="padding bg-white u-skeleton-fillet margin-top-xs ">
			<view class="  flex align-center">
				<view>附近地铁：</view>
				<view class="" style="color: #333333;">{{info.metro}}</view>
			</view>
			<view class="margin-tb-sm  flex align-center">
				<view>所在街道：</view>
				<view class="" style="color: #333333;">{{info.street}}</view>
			</view>
			<view class="margin-tb-sm  flex align-center">
				<view>看房时间：</view>
				<view class="" style="color: #333333;">{{info.checkRoomTime}}</view>
			</view>
			<view class="margin-top-sm  flex align-center">
				<view>入住时间：</view>
				<view class="" style="color: #333333;">{{info.checkTime}}</view>
			</view>
		</view>
		<view class="padding-lr padding-tb-sm bg-white margin-top-xs u-skeleton-fillet">
			<view class="info">
				房屋介绍
			</view>
			<view v-html="info.zfDescribe" style="line-height: 40rpx;"></view>
			<view class="flex align-center margin-top-xl">
				<view class="text-center" style="width: 70rpx;">
					<image src="../../../static/images/index/woshi.png" style="width: 52rpx;height: 52rpx;"></image>
					<view style="color: #333333;font-size: 26rpx;">配套设施</view>
				</view>
				<view class="margin-left flex flex-wrap ">
					<view class="sheshi" v-for="(item,index) in roomlist" :key="index">

						<view class="flex align-center">
							<view class="" v-if="item.checked">
								<u-icon name="checkmark" color="#333333" size="25"></u-icon>
							</view>
							<view v-else>
								<u-icon name="close" color="#999999" size="22"></u-icon>
							</view>
							<view class="margin-left-xs" :style="item.checked?'color:#333333;':'color:#999999'">
								{{item.value}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view style="width: 100%;height: 1rpx;background: #E6E6E6;margin: 20rpx 0;"></view>
			<view class="flex align-center margin-top-sm">
				<view class="text-center" style="width: 70rpx;">
					<image src="../../../static/images/index/gg.png" style="width: 52rpx;height: 52rpx;"></image>
					<view style="color: #333333;font-size: 26rpx;">公共设施</view>
				</view>
				<view class="margin-left flex flex-wrap ">
					<view class="sheshi" v-for="(item,index) in gglist" :key="index">
						<view class="flex align-center">
							<view class="" v-if="item.checked">
								<u-icon name="checkmark" color="#333333" size="25"></u-icon>
							</view>
							<view v-else>
								<u-icon name="close" color="#999999" size="22"></u-icon>
							</view>
							<view class="margin-left-xs" :style="item.checked?'color:#333333;':'color:#999999'">
								{{item.value}}
							</view>
						</view>
					</view>
				</view>
			</view> -->
		</view>


		<view
			class="padding-lr padding-tb-sm bg-white margin-top-sm u-skeleton-fillet flex align-center justify-between">
			<view class="flex align-center" @click="gotouser">
				<image :src="info.avatar?info.avatar:'../../../static/logo.png'"
					style="width: 88rpx;height: 88rpx;border-radius: 50%;"></image>
				<view class="margin-left-sm">
					<view class="flex">
						<view>{{info.userName}}</view>
						<view class="rz">已认证</view>
					</view>
					<view class="text-cut text-sm " style="width: 410rpx;color: #999999;margin-top:8rpx;"
						v-if="info.userType==2">
						{{info.enterpriseName}}
					</view>
					<view class="text-cut text-sm " style="width: 410rpx;color: #999999;margin-top:8rpx;"
						v-if="info.userType==1">
						平台已认证，让您租房更安心
					</view>
				</view>
			</view>
			<view class="flex align-center justify-between">
				<view @click="goChat()">
					<image src="../../../static/images/index/xioxi.png" style="width: 48rpx;height: 48rpx;"></image>
				</view>
				<view style="width: 1rpx;height: 72rpx;background: #E5E5E5;margin: 0 30rpx;"></view>
				<view @click="callPhone(info.phone)">
					<image src="../../../static/images/index/dianhua.png" style="width: 48rpx;height: 48rpx;"></image>
				</view>
			</view>
		</view>

		<view class="tabber u-skeleton-fillet padding-lr">
			<view class="flex align-center justify-between" style="width: 40%;">

				<!-- #ifdef H5 -->
				<view @tap="showModal()" style="width: 80rpx;" class="flex flex-wrap justify-center">
					<!-- <u-icon name="share" color="#666" size="45"></u-icon> -->
					<image src="../../../static/share/fx.png" style="width: 42rpx;height: 40rpx;"></image>
					<view>分享</view>
				</view>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<view @tap="showModal()" style="width: 80rpx;" class="flex flex-wrap justify-center">
					<!-- <u-icon name="share" color="#666" size="45"></u-icon> -->
					<image src="../../../static/share/fx.png" style="width: 42rpx;height: 40rpx;"></image>
					<view>分享</view>
				</view>
				<!-- #endif -->

				<!-- #ifdef MP-WEIXIN -->
				<button open-type="share">
					<view style="width: 80rpx;" class="flex flex-wrap justify-center">
						<!-- <u-icon name="share" color="#666" size="45"></u-icon> -->
						<image src="../../../static/share/fx.png" style="width: 42rpx;height: 40rpx;"></image>
						<view>分享</view>
					</view>
				</button>
				<!-- #endif -->


				<view @click="myServer()" v-if="info.isFollow!=1" style="width:90rpx;"
					class="flex flex-wrap justify-center">
					<u-icon name="heart" color="#666" size="45"></u-icon>
					<view>收藏</view>
				</view>
				<view @click="myServer()" v-else style="width: 90rpx;" class="flex flex-wrap justify-center">
					<u-icon name="heart-fill" color="#fd8630" size="45"></u-icon>
					<view>已收藏</view>
				</view>

				<view @click="gotiJubao()" style="width: 90rpx;" class="flex flex-wrap justify-center ">
					<u-icon name="warning" color="#666" size="45"></u-icon>
					<view>举报</view>
				</view>
			</view>
			<view @click="goChat()" class="flex  align-center text-white phoneBtn">
				<text>在线联系</text>
			</view>
			<view @click="callPhone(info.phone)" class="flex margin-lr-sm align-center text-white phoneBtns">

				<text>联系TA</text>
			</view>
		</view>

		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF" style="height: 150vh;"></u-skeleton>

		<!-- #ifndef MP-WEIXIN -->
		<tki-qrcode ref="qrcode" :val="url" :size="200" background="#fff" foreground="#000" pdground="#000"
			:onval="true" :loadMake="true" @result="qrR" :show="false"></tki-qrcode>
		<view class="cu-modal" :class="modalName == 'Image' ? 'show' : ''" @tap="hideModal">
			<view class="cu-dialog" v-if="backgroundImage && erweimapath && haibaoShow" @tap="hideModal">
				<view class="bg-img">
					<wm-poster @success="posterSuccess" :imgSrc="backgroundImage" Referrer="" :QrSrc="erweimapath"
						:Title="tuiguang" :LineType="false"></wm-poster>
				</view>
			</view>
		</view>
		<!-- #endif -->
		<u-popup v-model="show" mode="bottom" border-radius="24" :closeable="true" close-icon="close-circle-fill"
			close-icon-size="48">
			<view class="padding">
				<view class=" text-lg text-bold">费用包含</view>
				<!-- <view class="margin-top-sm">费用包含</view> -->
				<view class="margin-top flex flex-wrap">
					<view class="feibox" v-for="(item,index) in info.containCost" :key="index">
						{{item}}
					</view>
				</view>
				<view style="width: 100%;height: 1rpx;background: #f2f2f2;margin:20rpx 0;"></view>
				<view class="fybtn" @click="goChat()">在线联系</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import {
		getDataById
	} from '@/apis/fabu.js'
	import {
		updateFollow
	} from '../../../apis/index.js'
	import {
		insertChatConversation
	} from '../../../apis/shop.js'
	import {
		typeList
	} from '../../../apis/pages.js'
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
	import appShare from '@/utils/share.js';
	import wmPoster from '@/components/wm-poster/wm-posterorders.vue';
	import uQRCode from "../../../js_sdk/Sansnn-uQRCode/uqrcode.js"
	import _app from '../../../js_sdk/QuShe-SharerPoster/QS-SharePoster/app.js';
	import config from '../../../config.js'
	export default {
		components: {
			tkiQrcode,
			wmPoster,
		},
		data() {
			return {
				loading: true, // 是否显示骨架屏组件
				BannerList: [{
						img: 'https://zufang.xianmxkj.com/file/uploadPath/2023/07/11/3ed2b0bd4c2bc86a1a4693aae8c883f1.png'
					},
					{
						img: 'https://zufang.xianmxkj.com/file/uploadPath/2023/07/11/3ed2b0bd4c2bc86a1a4693aae8c883f1.png'
					},
					{
						img: 'https://zufang.xianmxkj.com/file/uploadPath/2023/07/11/3ed2b0bd4c2bc86a1a4693aae8c883f1.png'
					}
				],
				tablist: [{
					title: '详情'
				}],
				count: 0,
				typeId: '',
				info: {},
				backgroundImage: '', //推广图片
				tuiguang: '', //推广文字
				invitationCode: '',
				roomlist: [],
				gglist: [],



				haibaoImg: null,
				haibaoShow: false,
				modalName: '',
				url: '',
				erweimapath: '',
				show: false
			}
		},
		onShareAppMessage(res) {
			return {
				path: '/pages/index/classify/detail?invitation=' + this
					.invitationCode + '&typeId=' + this.typeId, //这是为了传参   onload(data){let id=data.id;} 
				title: this.tuiguang,
				imageUrl: this.backgroundImage
			}
		},
		onShareTimeline(res) {
			return {
				path: '/pages/index/classify/detail?invitation=' + this
					.invitationCode + '&typeId=' + this.typeId, //这是为了传参   onload(data){let id=data.id;} 
				title: this.tuiguang,
				imageUrl: this.backgroundImage
			}
		},
		onLoad(option) {
			// 分享
			// 获取邀请码保存到本地
			if (option.invitation) {
				this.$queue.setData('inviterCode', option.invitation);
			}
			// #ifdef MP-WEIXIN
			if (option.scene) {
				const scene = decodeURIComponent(option.scene);
				this.$queue.setData('inviterCode', scene.split(',')[0]);
			}
			// #endif

			if (option.typeId) {
				this.typeId = option.typeId
				uni.showLoading({
					title: '加载中'
				})
			}

			// #ifndef H5
			typeList('25').then(res => {
				if (res.code == 0) {
					if (res.data && res.data.value) {
						this.url = res.data.value;
					}
				}
			})
			//#endif
			// #ifdef H5
			typeList('141').then(res => {
				if (res.code == 0) {
					if (res.data && res.data.value && res.data.value == '是') {
						typeList('25').then(ress => {
							if (ress.code === 0) {
								if (ress.data && ress.data.value) {
									this.url = ress.data.value;
								}
							}
						})
					} else {
						// this.url = this.$queue.publicYuMing() + '/?invitation=' + this.invitationCode;
						this.url = this.$queue.publicYuMing() + '/?invitation=' + this.invitationCode;
					}
				}
			})
			//#endif

		},
		onShow() {
			this.invitationCode = uni.getStorageSync('invitationCode') ? uni.getStorageSync('invitationCode') : '';
			if (this.typeId) {
				this.getInfo();
			}

		},
		methods: {
			//导航
			gotoMap() {
				let that = this

				uni.openLocation({
					latitude: Number(that.info.lat - 0), //要去的纬度-地址       
					longitude: Number(that.info.lng - 0), //要去的经度-地址
					name: that.info.address, //地址名称
					address: that.info.address, //详细地址名称
					success: function() {
						console.log('导航成功');
					},
					fail: function(error) {
						console.log(error)
					}
				});

			},
			gotouser() {
				uni.navigateTo({
					url: '/my/renzheng/userInfo?userId=' + this.info.userId
				})
			},
			getgg() { //获取公共设施
				this.$Request.getT('/app/dict/getDictList?name=公共设施').then(res => {
					if (res.code == 0) {
						let arr = []
						let gong = res.data
						let commonFacilities = ''
						if (this.info.commonFacilities) {
							commonFacilities = this.info.commonFacilities.split(',')
						}

						for (var i = 0; i < gong.length; i++) {
							gong[i].checked = false
							for (var a = 0; a < commonFacilities.length; a++) {
								if (gong[i].value == commonFacilities[a]) {
									gong[i].checked = true

								}
							}
						}
						this.gglist = res.data
					}
				});
			},
			getroom() { //获取配套设施
				this.$Request.getT('/app/dict/getDictList?name=配套设施').then(res => {
					if (res.code == 0) {
						let arr = []
						let room = res.data
						let bedroomFacilities = ''

						if (this.info.bedroomFacilities) {
							bedroomFacilities = this.info.bedroomFacilities.split(',')
						}

						for (var i = 0; i < room.length; i++) {
							room[i].checked = false
							for (var a = 0; a < bedroomFacilities.length; a++) {
								if (room[i].value == bedroomFacilities[a]) {
									room[i].checked = true
								}
							}
						}
						this.roomlist = room

					}
				});
			},
			//预览图片
			priveImgs(index, url) {
				uni.previewImage({
					current: index,
					urls: url
				})
			},
			//去聊天
			goChat() {
				if (uni.getStorageSync('token')) {
					let data = {
						userId: uni.getStorageSync('userId'),
						focusedUserId: this.info.userId
					}
					insertChatConversation(data).then(res => {
						if (res.code == 0) {
							uni.navigateTo({
								url: '/my/setting/chat?chatConversationId=' + res.data.chatConversationId +
									'&focusedUserId=' + res.data.focusedUserId + '&typeId=' + this.typeId
							});
						}
					})
				} else {
					this.noLogin()
				}

			},
			//去举报
			gotiJubao() {
				if (uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '/my/jubao/jubao?state=4&typeId=' + this.typeId + '&byUserId=' + this.info.userId
					})
				} else {
					this.noLogin()
				}

			},
			//收藏/取消收藏
			myServer() {
				if (uni.getStorageSync('token')) {
					let data = {
						typeId: this.typeId,
						type: 1

					}
					updateFollow(data).then(res => {
						if (res.code == 0) {
							uni.showToast({
								title: res.msg
							})
							this.getInfo()
						}
					})
				} else {
					this.noLogin()
				}

			},
			noLogin() {
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
			},
			//拨打电话
			callPhone(phone) {
				if (uni.getStorageSync('token')) {
					uni.makePhoneCall({
						phoneNumber: phone
					})
				} else {
					this.noLogin()
				}
			},
			//获取服务详情
			getInfo() {
				let data = {
					typeId: this.typeId,
					userId: uni.getStorageSync('userId')
				}
				getDataById(data).then(res => {
					uni.hideLoading()
					if (res && res.code == 0) {
						this.info = res.data
						if (this.info.imgOrVideoUrl) {
							this.info.imgOrVideoUrl = this.info.imgOrVideoUrl.split(',')
						}
						if (this.info.containCost) {
							this.info.containCost = this.info.containCost.split(',')
						}
						this.backgroundImage = this.info.imgOrVideoUrl[0]
						this.tuiguang = this.info.title
						this.loading = false
						this.getroom()
						// this.getgg()
					}
				})
			},
			bindqie(index) {
				this.count = index
			},
			showModal() {
				if (!this.haibaoImg) {
					this.haibaoShow = true;
					this.$queue.showLoading('海报生成中...');
				} else {
					this.modalName = 'Image';
				}
			},
			qrR(path) {
				this.erweimapath = path;
			},
			posterSuccess(haibaoImg) {
				this.haibaoImg = haibaoImg;
				this.modalName = 'Image';
			},
			hideModal() {
				this.modalName = null;
			},
		}
	}
</script>

<style lang="less">
	page {
		background: #F5F7FF;
	}

	button::after {
		border: none;
		background-color: none;
	}

	button {

		position: relative;
		display: flex;
		align-items: center;
		margin-left: 0rpx;
		margin-right: 0rpx;
		padding-left: 0px;
		padding-right: 0px;
		box-sizing: border-box;
		text-decoration: none;
		line-height: 1.35;
		overflow: hidden;
		color: #333333;
		/* background-color: #fff; */
		background-color: rgba(255, 255, 255, 0) !important;
		font-size: 28rpx;
		// width: 100%;
		// height: 100%;
	}

	.info {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 800;
		color: #333333;
		margin-bottom: 10rpx;
	}

	.info-item {
		margin-bottom: 10rpx;
	}

	.info-item-left {
		width: 50%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
	}

	.info-item-right {
		width: 50%;
		color: #000000;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
	}

	.btn {
		padding: 4rpx 16rpx;
		color: #333333;
		background: #F2F2F2;
		border-radius: 4px;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
	}

	.phoneBtn {
		background: #02B418;
		display: flex;
		text-align: center;
		align-items: center;
		border-radius: 44px;
		width: 200rpx;
		height: 81rpx;
		justify-content: center;
	}

	.phoneBtns {
		display: flex;
		text-align: center;
		align-items: center;
		background: #4B74FF;
		border-radius: 44px;
		width: 200rpx;
		height: 81rpx;
		justify-content: center;
	}

	.tabber {
		width: 750upx;
		/* height: 98upx; */
		background: #ffffff;
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		justify-content: space-around;
		padding: 20rpx 0 30rpx 0;
	}

	.tabColor {
		color: #FF6800;
	}

	.price {
		font-size: 35rpx;
		font-family: PingFang SC;
		font-weight: 800;
		color: #FF2121;

		text {
			font-size: 26rpx;
			font-weight: 400;
		}
	}

	.tit {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
	}

	.fiy {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 800;
		color: #333333;
	}

	.tits {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
	}

	.sheshi {
		width: 180rpx;
		margin-bottom: 35rpx;
	}

	.rz {
		color: #7594FF;
		border: 1px solid #7594FF;
		font-size: 24rpx;
		padding: 2rpx 10rpx;
		margin-left: 10rpx;
	}

	.feibox {
		background: #F5F5F5;
		padding: 4rpx 15rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	}

	.fybtn {
		width: 100%;
		background: #7594FF;
		color: #FFFFFF;
		padding: 20rpx;
		text-align: center;
	}
</style>
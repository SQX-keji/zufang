<template>
	<view class="pages">
		<view class="search">
			<u-search placeholder="搜索联系人" v-model="keyword" search-icon-color="#999999" bg-color="#F5F7FF"
				border-color="#D5D5D5" :show-action="false" @search="getChatList"></u-search>
		</view>

		<view class="" style="margin-top: 140rpx;">
			<view class="flex align-center padding-tb  padding-lr-sm bg margin-lr" @click="goMsg" style="border-radius: 24rpx;">
				<view>
					<image style="width: 80rpx;height: 80rpx;border-radius: 80rpx;"
						src="../../static/images/msg/msg.png"></image>
				</view>
				<view class="flex-sub margin-left-sm">
					<view class="flex justify-between">
						<view class="text-bold">{{msgList.title?msgList.title:'系统消息'}}</view>
						<view v-if="messageCount>0"
							style="height: 32rpx;width: 32rpx;border-radius: 100rpx;background-color: red;color: #FFF;text-align: center;">
							{{messageCount}}
						</view>
					</view>
					<view>
						<view class="text-grey margin-top-xs">{{msgList.content}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="margin-top-sm" v-if="userId">
			<view class="flex align-center padding-tb  padding-lr-sm bg margin-lr" @click="changekefu" style="border-radius: 24rpx;">
				<view>
					<image style="width: 80rpx;height: 80rpx;border-radius: 80rpx;"
						src="../../static/images/msg/msgs.png"></image>
				</view>
				<view class="flex-sub margin-left-sm">
					<view class="flex justify-between">
						<view class="text-bold">在线客服</view>
					</view>
					<view>
						<view class="text-grey margin-top-xs">点击联系在线客服</view>
					</view>
				</view>
			</view>
		</view>

		<view v-if="chatList.length" class="content ">
			<view class=" padding-lr-sm bg margin-lr" style="margin-top: 20rpx;border-radius: 24rpx;"
				@click="goIM(item)" v-for="(item,index) in chatList" :key='index'>
				<view class="flex padding-tb align-center" v-if="userId == item.userId">
					<view>
						<u-image shape="circle" width='80rpx' height="80rpx" :src="item.byAvatar"></u-image>
					</view>
					<view class="flex-sub margin-left-sm">
						<view class="flex justify-between">
							<view class="text-bold">{{item.byUserName}}</view>
							<view class="text-grey">{{item.messageTime}}</view>
						</view>
						<view class="flex justify-between">
							<view class="text-grey">{{ item.messageType == 1? item.content : '[图片]'}}</view>
							<view v-if="item.contentCount"
								style="height: 32rpx;width: 32rpx;border-radius: 100rpx;background-color: red;color: #FFF;text-align: center;">
								{{item.contentCount}}
							</view>
						</view>
					</view>
				</view>
				<view class="flex padding-tb align-center" v-else>
					<view>
						<u-image shape="circle" width='80rpx' height="80rpx" :src="item.avatar"></u-image>
					</view>
					<view class="flex-sub margin-left-sm">
						<view class="flex justify-between">
							<view class="text-bold">{{item.userName}}</view>
							<view class="text-grey">{{item.messageTime}}</view>
						</view>
						<view class="flex justify-between">
							<view class="text-grey">{{ item.messageType == 1? item.content : '[图片]'}}</view>
							<view v-if="item.contentCount"
								style="height: 32rpx;width: 32rpx;border-radius: 100rpx;background-color: red;color: #FFF;text-align: center;">
								{{item.contentCount}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<empty v-if="chatList.length==0" class="margin-top-sm" content='暂无消息'></empty>

		<!-- <u-tabbar :list="tabbarList"  :mid-button="true" bg-color="#FFFFFF" active-color="#FF6800"
			inactive-color="#CCCCCC">
		</u-tabbar> -->
	</view>
</template>

<script>
	import {
		selectChatConversationPage,
		getUserMessageInfoListLimit1
	} from '../../apis/my.js'
	import empty from '@/components/empty.vue'
	export default {
		components: {
			empty
		},
		data() {
			return {
				keyword: '',

				tabbarList: this.$store.state.list,
				page: 1,
				limit: 100,
				chatList: [],
				userId: '',
				msgList: {},
				time: '',
				messageCount: 0,
				pages: 1,
				status: 'loadmore'
			};
		},
		onLoad() {},
		onShow() {
			let that = this
			that.userId = uni.getStorageSync('userId')
			if (that.userId) {
				that.getChatList()
				that.getMsgList()
				// 	that.time = setInterval(function() {
				// 		that.getChatList()
				// 		// that.getMsgList()
				that.$nextTick(function() {
					that.messageCount = uni.getStorageSync('messageCount')
				})

				// 	}, 1000)

			} else {
				that.chatList = []
				that.msgList = {}
			}
		},
		onHide() {
			clearInterval(this.time)
		},
		methods: {
			getChatList() {
				let data = {
					page: this.page,
					limit: this.limit,
					userName: this.keyword
				}
				selectChatConversationPage(data).then(res => {
					uni.stopPullDownRefresh()
					uni.hideLoading()
					if (res.code == 0) {
						this.pages = res.data.pages
						if (this.page == this.pages) {
							this.status = 'nomore'
						} else {
							this.status = 'loadmore'
						}
						// this.chatList = res.data.records
						if (this.page == 1) {
							this.chatList = res.data.records
						} else {
							this.chatList = [...this.chatList, ...res.data.records]
						}
					}
				})
			},
			getMsgList() {
				getUserMessageInfoListLimit1().then(res => {
					if (res.code == 0) {
						this.msgList = res.data
					}
				})
				// this.$Request.get("/app/message/selectMessageByUserIdLimit1").then(res => {
				// 	if (res.code == 0) {
				// 		this.msgList = res.data.list
				// 	}
				// });
			},
			goIM(e) {
				let userId = this.$queue.getData('userId');
				if (e.userId == userId) {
					userId = e.byUserId
				} else {
					userId = e.userId
				}
				uni.navigateTo({
					url: '/my/setting/chat?chatConversationId=' + e.chatConversationId + '&focusedUserId=' + userId
				});
				// uni.navigateTo({
				// 	url: '/pages/msg/im?chatConversationId=' + e.chatConversationId + '&byUserId=' + userId
				// })
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
			goMsg() {
				let userId = this.$queue.getData('userId');
				if (userId) {
					uni.navigateTo({
						url: '/pages/msg/message'
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

			}
		},
		onPullDownRefresh() {
			this.page = 1
			this.getChatList()
		},
		onReachBottom() {
			if (this.page < this.pages) {
				this.page = this.page + 1;
				this.status = 'loading'
				this.getChatList()
			} else {
				this.status = 'nomore'
			}
		},
	}
</script>

<style >
	page {
		background: #F5F7FF;
	}

	.pages {
		/* #ifdef APP */
		padding-top: 0rpx;
		/* #endif */
	}

	.bg {
		background-color: #FFFFFF;
	}

	.search {
		background: #FFFFFF;
		padding: 30rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;

	}
</style>
<!-- 菜单悬浮的原理: 通过给菜单添加position:sticky实现, 用法超简单, 仅APP端的低端机不兼容 https://caniuse.com/#feat=css-sticky -->
<template>
	<view>
		<u-tabs :list="list" :isScroll="true" :current="tabIndex" active-color="#FF6800" @change="change"></u-tabs>
		<view class="padding bg margin-top-sm margin-lr-sm radius" @click="bindDetail()">
			<view class="flex justify-between">
				<view style="color: #fd6618;">待付款</view>
				<view>2021/02/21 13:44</view>
			</view>
			<view class="flex margin-top">
				<view style="width: 100upx;height: 100upx;">
					<image src="../../static/logo.png" style="width:100%;height:100%"></image>
				</view>
				<view class="margin-left-xs text-df">
					<view class=" text-bold margin-bottom-sm">日常保洁</view>
					<view style="color:#999999;">服务地址：西安市雁塔区橙时空间</view>
				</view>
			</view>
			<view class="flex justify-between align-center margin-top-sm">
				<view>实付: ￥<text>312</text></view>
				<view class="flex justify-around" style="width: 55%;">
					<view class="btn1">取消订单</view>
					<view class="btn2">去支付</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import empty from '@/components/empty.vue'
	export default {
		components: {
			empty
		},
		data() {
			return {
				list: [{
					name: '全部订单',
					status: ''
				}, {
					name: '待付款',
					status: '0'
				}, {
					name: '待接单',
					status: '0'
				}, {
					name: '待服务',
					status: '1'
				}, {
					name: '已评价',
					status: '2'
				}, {
					name: '已完成',
					status: '3'
				}],
				tabIndex: 0, // tab下标

				page: 1,
				limit: 10,

			}
		},
		onLoad() {

		},
		onShow() {

		},
		methods: {
			change(index) {
				this.tabIndex = index;
			},
			bindDetail(){
				console.log(11111)
				uni.navigateTo({
					url:'/my/order/pay'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.bg {
		background-color: #FFFFFF;
	}

	.btn1 {
		width: 150upx;
		height: 60upx;
		border: 2upx solid #999999;
		border-radius: 32upx;
		text-align: center;
		color: #999999;
		line-height:60upx;
	}
	.btn2 {
		width: 150upx;
		height: 60upx;
		border: 2upx solid #FD6618;
		border-radius: 32upx;
		text-align: center;
		color: #FD6618;
		line-height:60upx;
	}
</style>

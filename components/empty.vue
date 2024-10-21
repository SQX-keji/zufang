<template>
	<view class="page-box" :style="{height:height}">
		<view class="centre" :style="{top:top}">
			<image src="../static/images/empty.png" mode=""></image>
			<view class="tips">
				{{content}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			content: {
				type: String,
				default: '暂无内容'
			},
			height:{
				type: String,
				default: '90vh'
			},
			top:{
				type: String,
				default: '100px'
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.page-box {
		position: relative;
		top: 0px;
		background: #FFFFFF;
	}
	.centre {
		position: absolute;
		left: 0;
		top:400rpx;
		right: 0;
		bottom: 0;
		margin: auto;
		text-align: center;
		
		font-size: 32rpx;
		image {
			width: 340rpx;
			height: 270rpx;
			margin: 0 auto 20rpx;
		}
		.tips {
			font-size: 32rpx;
			color: #2F3044;
			margin-top: 20rpx;
			font-weight: 700;
		}
		.btn {
			margin: 80rpx auto;
			width: 600rpx;
			border-radius: 32rpx;
			line-height: 90rpx;
			color: #ffffff;
			font-size: 34rpx;
			background: #5074FF;
		}
	}
</style>

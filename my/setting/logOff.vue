<template>
	<view>
		<view class="icon flex align-center justify-center">
			<u-icon name="info-circle-fill" color="#4F75FB" size="100"></u-icon>
		</view>
		<view class="title">
			注销码兄租房服务
		</view>
		<view class="shuoming">
			码兄租房帐号注销后，您将放弃以下权益且无法找回
		</view>
		<view class="list flex align-center justify-center">
			<view class="list-box">
				<view class="list-box-item">
					·<text style="margin-left: 10rpx;">您将无法通过该帐号登录、使用码兄租房平台；</text>
				</view>
				<view class="list-box-item">
					·<text style="margin-left: 10rpx;">您将无法访问帐号的个人信息（包括帐号名称、昵称、头像等）；</text>
				</view>
				<view class="list-box-item">
					·<text style="margin-left: 10rpx;">您帐号的所有权益，将视为主动放弃</text>
				</view>
			</view>
		</view>
		<view class="tishi">
			点击【确认注销】即代表您已同意<text @click="goXieOff()">《用户注销协议》</text>
		</view>
		<view class="submit flex align-center justify-center">
			<view class="submit-box flex align-center justify-center" @click="submit()">
				确认注销
			</view>
		</view>
	</view>
</template>

<script>
	import {
		insertMessage
	} from '../../apis/my.js'
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			//用户注销协议
			goXieOff(){
				uni.navigateTo({
					url:'/my/setting/offXieyi'
				})
			},
			//确认注销
			submit(){
				let that = this
				uni.showModal({
					title:'提示',
					content:'确认注销后，您将退出登录，并清除所有数据！',
					cancelText:'我再想想',
					confirmText:'确认注销',
					confirmColor:'#4F75FB',
					complete(ret) {
						if(ret.confirm){
							let data = {
								state:8,
							}
							insertMessage(data).then(res=>{
								if(res.code == 0){
									// uni.showModal({
									// 	title:'提示',
									// 	content:'注销申请已提交，等待系统确认',
									// 	showCancel:false,
									// 	confirmText:'确认',
									// 	confirmColor:'#4F75FB'
									// })
									// uni.showToast({
									// 	title:'注销申请已提交，等待系统确认',
									// 	icon:'none',
									// 	duration:2000
									// })
									uni.removeStorageSync('token')
									uni.removeStorageSync('userId')
									uni.showToast({
										title: '提交成功！',
										icon: 'none'
									})
									uni.switchTab({
										url:'/pages/my/index'
									})
								}else{
									uni.showToast({
										title:res.msg,
										icon:'none'
									})
								}
							})
						}
					}
				})
			},
		},
	}
</script>

<style lang="scss">
	page{
		background: #F5F7FF;
	}
	.icon{
		width: 100%;
		padding-top: 100rpx;
	}
	.title{
		width: 100%;
		text-align: center;
		margin-top: 20rpx;
		font-weight: bold;
		font-size: 40rpx;
	}
	.shuoming{
		font-size: 16rpx;
		color: #333333;
		margin-top: 20rpx;
		text-align: center;
	}
	.list{
		width: 100%;
		// height: 100rpx;
		margin-top: 20rpx;
		.list-box{
			padding: 20rpx;
			width: 686rpx;
			height: 100%;
			border-radius: 24rpx;
			background: #ffffff;
			.list-box-item{
				margin-top: 10rpx;
				font-size: 16rpx;
				color: #333333;
			}
		}
	}
	.tishi{
		width: 100%;
		text-align: center;
		color: #999999;
		margin-top: 40rpx;
		font-size: 18rpx;
		text{
			color: #4F75FB;
		}
	}
	.submit{
		width: 100%;
		height: 88rpx;
		margin-top: 60rpx;
		.submit-box{
			width: 686rpx;
			height: 88rpx;
			border-radius: 16rpx;
			color: #ffffff;
			background-color:#4F75FB;
		}
	}
</style>

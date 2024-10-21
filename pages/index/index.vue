<template>
	<view class="">
		<view class="headsrt padding">
			<view class=" flex justify-between align-center headsr">
				<view class="flex align-center margin-left">
					<view class="margin-right-sm text-df text-bold text-black" @tap="goNav('/my/citys/citys')">{{city}}
					</view>
					<image src="../../static/images/index/xiala.png" style="width: 20rpx;height: 12rpx;"
						class="margin-right-sm"></image>
				</view>
				<view style="width: 1rpx;height: 23rpx;background: #CCCCCC;"></view>
				<view class="flex-sub margin-right-sm" @click="goNav('/pages/index/search/index')">
					<u-search placeholder="你想住在哪里呢？" shape="square" disabled :show-action="false" :animation="true"
						bg-color="#F5F7FF" search-icon-color="#999999" border-color="#F5F7FF" height="70"></u-search>
				</view>
			</view>
		</view>
		<view class="headapp padding-bottom-sm" style="background:#FFFFFF">
			<!-- banner -->
			<view class="padding-lr  ">
				<swiper class="swiper" :autoplay="true" interval="2000" duration="500" :circular="true"
					style="width: 100%;height: 238rpx;">
					<swiper-item v-for="(item,index) in BannerList" :key='index'>
						<image :src="item.imageUrl" mode="scaleToFill" style="width: 100%;height: 238rpx;"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="margin-top-sm" style="color: #BFBFCB;">
				<view class="category" v-if="gridData.length>0">
					<view class="box">
						<swiper class="swiper" duration="300" :style="{ height: categoryHeight }">
							<swiper-item v-for="(nav, index5) in gridData" :key="index5">
								<view class="category-list">
									<view class="icon" v-for="(item,ind) in nav" :key="ind" @tap="goNav(item.url)">
										<image mode="widthFix" :src="item.imageUrl" style="height: 90upx;width: 90upx">
										</image>
										<view style="margin-top:12rpx;">{{ item.name }}</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
						<!-- <view class="dots">
							<view v-for="(page, pageindex) in gridData" :key="pageindex"
								:class="{ active: pageindex == currentPageindex }"></view>
						</view> -->
					</view>
				</view>
			</view>

		</view>

		<u-sticky :enable="enable">
			<view class="flex align-center justify-between margin-top-xs"
				style="background: #F5F7FF;position: relative;">
				<view style="color: #666666;position: absolute;left: 40rpx;z-index:996;font-size: 30rpx;"
					@click="tabIndex(0)" :style="tabind==0?'color:#4B74FF;font-weight:800;':''">推荐</view>
				<u-dropdown ref="uDropdown" @open="open" @close="close" title-size="30" menu-icon="arrow-down-fill"
					menu-icon-size="20">
					<u-dropdown-item title="区域">
						<view class="" style="background-color: #FFFFFF;">
							<view class="slot-qy ">
								<view class=""
									style="width: 200rpx;background: #F5F5F5;border-radius: 0rpx 10rpx 10rpx 0rpx;">
									<view v-for="(item,index) in listqy" :key="index" class=" padding text-center"
										:class="tabqyIndex==index?'actqy':''" @click="changeqy(index)">
										{{item.name}}
									</view>
								</view>
								<scroll-view scroll-y="true" style="height: 400rpx;width: 30%;">
									<view v-for="(item,index) in citylist" :key="index"
										:style="qyIndex==index?'color:#4B74FF':''" class=" padding-lr padding-tb-sm"
										@click="changecity(item.name,index)">
										{{item.name}}
									</view>
								</scroll-view>
								<scroll-view scroll-y="true" style="height: 400rpx;width: 60%;">
									<view v-for="(item,index) in childrenList" :key="index"
										:style="qychilderIndex==index?'color:#4B74FF':''"
										class="padding-lr padding-tb-sm" @click="changecitys(item.name,index)">
										{{item.name}}
									</view>
								</scroll-view>
							</view>
							<view class="slot-btnr">
								<view class="slotbts" @click="chongzhi">重置</view>
								<view class="slotbt" @click="closeDropdown">确定</view>
							</view>

						</view>
					</u-dropdown-item>
					<u-dropdown-item title="价格">
						<view class="slot-content" style="background-color: #FFFFFF;">
							<view class=" padding-lr padding-top">
								<scroll-view scroll-y="true" style="height: 400rpx;">
									<view v-for="(item,index) in pricelist" :key="index"
										@click="changelist(item,index)">
										<view class="text-center padding-bottom-xl"
											:style="pricendex==index?'color:#4B74FF':'color:#333333'">
											{{item.minMoney}}-{{item.maxMoney}}元
										</view>
									</view>
								</scroll-view>
								<view class="padding-tb">
									<view class="flex align-center justify-center margin-bottom-sm text-lg ">
										{{number}}元
									</view>
									<uv-slider v-model="number" :min="minNumber" :max="manNumber"></uv-slider>
								</view>

							</view>
							<view class="flex align-center padding-lr-xl justify-between padding-bottom-xl">
								<view class="slotbts" @click="chongzhiprice">重置</view>
								<view class="morbtn" @click="DropPrice">确定</view>
							</view>
						</view>
					</u-dropdown-item>
					<u-dropdown-item title="户型">
						<view class="slot-content padding-bottom" style="background-color: #FFFFFF;">
							<scroll-view scroll-y="true" style="height: 200rpx;">
								<view class="flex align-center flex-wrap padding ">
									<view class="hxbox" :class="hxIndex==index?'hxact':''"
										@click="changeTab(index,item)" v-for="(item,index) in hxlist" :key="index">
										<view v-if="item.minMoney&&item.maxMoney">
											<view v-if="item.minMoney==item.maxMoney">{{item.maxMoney}}室</view>
											<view v-else-if="item.maxMoney>item.minMoney">{{item.maxMoney}}室</view>
										</view>
										<view v-else-if="item.minMoney">{{item.minMoney}}室以下</view>
										<view v-else-if="item.maxMoney">{{item.maxMoney}}室以上</view>
									</view>
								</view>
							</scroll-view>
							<view style="width: 100%;height: 1rpx;background: #E6E6E6;margin-top:35rpx"></view>
							<view class="flex align-center padding-lr-xl justify-between ">
								<view class="slotbts" @click="chongzhihuxing">重置</view>
								<view class="morbtn " style="margin:35rpx auto;" @click="Droproom">确定</view>
							</view>
						</view>
					</u-dropdown-item>
				</u-dropdown>
			</view>
		</u-sticky>
		<view class="flowListStyle " v-if="orderlist.length!=0" style="margin-top:0rpx">
			<view class="flowListStyle-box">
				<view class="flex flex-wrap align-center justify-between">
					<view class="demo-warter" v-for="(item, index) in orderlist" :key="index"
						@click="goNav('/pages/index/classify/detail?typeId='+item.typeId)">
						<image class="demo-warter-img" :src="item.titleImg?item.titleImg:'../../static/logo.png'"
							mode="aspectFill">
						</image>
						<view class="demo-title">
							<view class="demo-title-box ">
								{{item.title}}
							</view>
						</view>
						<view class="labs">{{item.roomArea}}m² /
							{{item.bedroomCount}}室{{item.livingRoomCount}}厅/ {{item.floor}}层
						</view>
						<view class="price padding-lr-sm padding-bottom-sm">{{item.money}}元/月</view>
					</view>
				</view>
				<u-loadmore v-if="orderlist.length>0" :status="status" />
			</view>

		</view>
		<empty height="0" v-if="orderlist.length==0" />

	</view>
</template>

<script>
	import {
		getClassList,
		getClassLists,
		getDataList,
		getBannerList,
		getNoticeList,
		getSelectCity
	} from '@/apis/index.js'
	import {
		getShopList
	} from '../../apis/shop.js'
	import {
		typeList
	} from '@/apis/pages.js'
	import empty from '@/components/empty.vue'
	export default {
		components: {
			empty
		},
		data() {
			return {
				currentPageindex: 0,
				categoryHeight: '300rpx',
				tabbarList: this.$store.state.list,
				enable: true,
				gongao: [],
				city: '',
				BannerList: [],
				gridData: [],

				orderlist: [],
				leftList: [],
				rightList: [],
				page: 1,
				limit: 10,
				count: 1,
				shopList: [], //本地商家
				lng: '',
				lat: '',
				status: 'loadmore',
				showModal: true,
				arr: [],
				myId: '',
				tuiguang: '', //推广文案
				backgroundImage: '', //推广背景图
				invitationCode: '',
				tabind: -1,
				listqy: [{
					id: 1,
					name: '区域'
				}, {
					id: 2,
					name: '地铁'
				}],
				tabqyIndex: 0,
				citylist: [],

				childrenList: [],

				number: '',
				minNumber: '0',
				manNumber: '0',
				pricelist: [],
				pricendex: 0,
				priceState: false,

				hxlist: [],
				minBedroomCount: '',
				maxBedroomCount: '',
				hxIndex: -1,
				quyu: '',
				qyIndex: 0,
				qychilderIndex: -1,

				street: '',
				state: 0
			}
		},
		onShareAppMessage(res) {
			return {
				path: '/pages/index/index?invitation=' + this.invitationCode, //这是为了传参   onload(data){let id=data.id;} 
				title: this.tuiguang,
				imageUrl: this.backgroundImage
			}
		},
		onShareTimeline(res) {
			return {
				path: '/pages/index/index?invitation=' + this.invitationCode, //这是为了传参   onload(data){let id=data.id;} 
				title: this.tuiguang,
				imageUrl: this.backgroundImage
			}
		},
		onHide() {
			this.enable = false
		},
		onPullDownRefresh() {
			this.page = 1
			this.getFabuList()
		},
		onReachBottom() {
			if (this.page < this.count) {
				this.page += 1
				this.status = 'loading'
				this.getFabuList()
			} else {
				this.status = 'nomore'
			}
		},
		onLoad(e) {
			this.enable = true
			//获取筛选价格
			this.getPriceist()
			//获取分类列表
			this.getClassLists();


			//banner图
			this.getBannerImage()
			//公告列表
			// this.getGonggaoList()
			this.myId = uni.getStorageSync('userId')
			// 分享
			// 获取邀请码保存到本地
			if (e.invitation) {
				this.$queue.setData('inviterCode', e.invitation);
			}
			// #ifdef MP-WEIXIN
			if (e.scene) {
				const scene = decodeURIComponent(e.scene);
				this.$queue.setData('inviterCode', scene.split(',')[0]);
			}
			// #endif
		},
		onShow() {
			this.invitationCode = uni.getStorageSync('invitationCode') ? uni.getStorageSync('invitationCode') : '';
			//推广文案
			typeList('276').then(res => {
				if (res.code == 0) {
					if (res.data && res.data.value) {
						this.tuiguang = res.data.value;
					}
				}
			})
			//推广图片
			typeList('289').then(res => {
				if (res.code == 0) {
					if (res.data && res.data.value) {
						this.backgroundImage = res.data.value;
					}
				}
			})
			//获取城市
			let that = this
			if (uni.getStorageSync('city') && uni.getStorageSync('lat')) {
				that.lat = uni.getStorageSync('lat')
				that.lng = uni.getStorageSync('lng')
				that.city = uni.getStorageSync('city')
			} else {
				uni.getLocation({
					type: 'gcj02', //wgs84  gcj02
					success: function(res) {
						//根据定位的经纬度获取城市名称
						that.lat = res.latitude
						that.lng = res.longitude
						that.selectCity(res.longitude, res.latitude);
					},
					fail: function() {
						console.log('获取地址失败')
					}
				})
			}
			that.getFabuList();

			//获取本地商家列表
			// that.getShopArr();
			// #ifdef MP-WEIXIN
			//订阅
			if (that.myId) {
				typeList('294').then(res => {
					if (res.code == 0) {
						if (res.data && res.data.value) {
							that.arr.push(res.data.value)
						}
					}
				})
				typeList('292').then(res => {
					if (res.code == 0) {
						if (res.data && res.data.value) {
							that.arr.push(res.data.value)
						}
					}
				})
				if (that.showModal) {
					that.openMsg()
				}
			}
			// #endif
			this.gethx()
			this.getcitylist()
			this.getPriceist()
		},
		methods: {
			open(index) {
				console.log('open', index)
				this.tabind = -1
				// 展开某个下来菜单时，先关闭原来的其他菜单的高亮
				// 同时内部会自动给当前展开项进行高亮
				this.$refs.uDropdown.highlight();
			},
			close(index) {
				console.log('close', index)
				// 关闭的时候，给当前项加上高亮
				// 当然，您也可以通过监听dropdown-item的@change事件进行处理
				this.$refs.uDropdown.highlight(index);
			},

			tabIndex(index) { //选择推荐
				this.$refs.uDropdown.close();
				this.tabind = index
				this.priceState = false

				this.chongzhi()
			},
			chongzhihuxing() { //户型重置
				this.page = 1
				this.state = 0
				this.hxIndex = -1
				this.minBedroomCount = ''
				this.maxBedroomCount = ''
				this.getFabuList()
				this.$refs.uDropdown.close();
			},
			chongzhiprice() { //价格重置
				this.page = 1
				this.state = 0
				this.pricendex = 0
				this.minNumber = '0'
				this.manNumber = '0'
				this.getFabuList()
				this.$refs.uDropdown.close();
			},
			chongzhi() { //区域重置
				this.page = 1
				this.state = 0
				this.qyIndex = 0
				this.street = ''
				this.tabqyIndex = 0
				this.getcitylist()
				this.qychilderIndex = -1

				this.hxIndex = -1
				this.getFabuList()
				this.$refs.uDropdown.close();
			},
			closeDropdown() { //区域筛选
				this.page = 1
				this.state = 1

				this.quyu = this.citylist[this.qyIndex].name
				this.getFabuList()
				this.$refs.uDropdown.close();
			},
			changecity(name, index) { //区域选择区
				this.quyu = name
				this.qyIndex = index
				if (this.citylist[index].childrenList != null) {
					this.childrenList = this.citylist[index].childrenList
				} else {
					this.childrenList = []
				}

			},
			changecitys(name, index) { //区域选择街道
				this.street = name
				this.qychilderIndex = index

			},

			changeqy(index) { //区域地铁切换
				console.log(index)
				this.tabqyIndex = index
				this.qyIndex = 0
				this.qychilderIndex = -1
				this.street = ''

				this.getcitylist()
			},
			getcitylist() { //获取区域筛选接口
				let name = uni.getStorageSync('city')
				let type = this.listqy[this.tabqyIndex].id
				this.$Request.getT('/app/cityInfo/getCityInfoList?type=' + type + '&name=' + name).then(res => {
					if (res.code == 0) {
						this.citylist = res.data
						if (res.data && res.data[0]) {
							this.quyu = res.data[0].name
							this.childrenList = res.data[0].childrenList
						}
					}
				});
			},
			changeTab(index, item) { //选择户型
				this.hxIndex = index
				// console.log(item.minMoney != 0 && item.maxMoney != 0, item.minMoney, item.maxMoney, '=====')
				if (item.minMoney != 0 && item.maxMoney != 0) {
					this.minBedroomCount = item.minMoney
					this.maxBedroomCount = item.maxMoney
				} else if (item.minMoney == 0) {
					this.minBedroomCount = item.maxMoney
					this.maxBedroomCount = 0
				} else if (item.maxMoney == 0) {
					this.minBedroomCount = 0
					this.maxBedroomCount = item.minMoney
				}

			},
			Droproom() { //户型筛选
				this.quyu = ''
				// this.tabqyIndex = 0

				this.page = 1
				this.state = 1
				this.getFabuList()
				this.$refs.uDropdown.close();
			},
			gethx() { //户型
				this.$Request.get('/app/screenMoney/getScreenMoneyList?page=1&limit=1000&type=2').then(res => {
					if (res.code == 0) {
						this.hxlist = res.data.records
						// this.minBedroomCount = res.data.records[0].minMoney
						// this.maxBedroomCount = res.data.records[0].maxMoney
					}
				});
			},
			DropPrice() { //价格筛选
				this.quyu = ''
				this.page = 1
				this.state = 1
				this.priceState = true
				this.getFabuList()
				this.$refs.uDropdown.close();
			},
			// 获取价格
			changelist(item, index) {
				this.pricendex = index
				this.minNumber = item.minMoney
				this.manNumber = item.maxMoney
				this.number = item.maxMoney
			},
			// 获取筛选价格
			getPriceist() {
				this.$Request.get('/app/screenMoney/getScreenMoneyList?page=1&limit=1000&type=1').then(res => {
					if (res.code == 0) {
						this.pricelist = res.data.records
						this.minNumber = res.data.records[0].minMoney
						this.manNumber = res.data.records[0].maxMoney
						this.number = res.data.records[0].maxMoney
					}
				});
			},
			goSwitchTab(url) {
				uni.switchTab({
					url: url
				})
			},
			goNav(url) {
				if (uni.getStorageSync('token')) {
					if (url.indexOf('/pages/') !== -1 || url.indexOf('/my/') !== -1) {
						uni.navigateTo({
							url
						})
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
			//搜索页面
			gotoSearch() {
				uni.navigateTo({
					url: 'pages/index/search/index'
				})
			},
			//根据经纬度获取城市地址
			selectCity(longitude, latitude) {
				let that = this
				let data = {
					lat: latitude,
					lng: longitude
				}
				getSelectCity(data).then(res => {
					if (res.code == 0) {
						//修改当前城市
						uni.setStorageSync('lat', latitude)
						uni.setStorageSync('lng', longitude)
						uni.setStorageSync('city', res.data.city)
						// that.city = res.data
						that.city = res.data.city
						// that.getShopLists()
					}
				})
			},
			//获取公告
			getGonggaoList() {
				getNoticeList().then(res => {
					if (res.code == 0) {
						let arr = []
						res.data.records.map(item => {
							arr.push(item.content)
						})
						this.gongao = arr
					}
				})
			},
			//获取banner图
			getBannerImage() {
				let data = {
					classify: 1

				}
				getBannerList(data).then(res => {
					if (res && res.code == 0) {
						this.BannerList = res.data
					}
				})
			},
			//获取上架列表
			getShopArr() {
				let data = {
					page: 1,
					limit: 3,
					screen: 3,
					lng: this.lng,
					lat: this.lat,
					city: this.city
				}
				getShopList(data).then(res => {
					if (res.code == 0) {
						this.shopList = res.data.records
						this.$forceUpdate()
					}
				})
			},
			//获取分类列表
			getClassLists() {
				this.$Request.get('/app/banner/selectBannerList?classify=2').then(res => {
					if (res.code == 0) {
						if (res.data.length > 0) {
							var datanew = this.chunk(res.data, 10)
							this.gridData = datanew;
							if (res.data.length > 5) {
								this.categoryHeight = "300rpx"
							} else {
								this.categoryHeight = "160rpx"
							}
						} else {
							var datanew = this.chunk(this.gridData, 10)
							this.gridData = datanew;
						}
					}
				});
			},
			// 传进数组和指定个数，进行拆分
			chunk: function(array, size) {
				//获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined
				const length = array.length
				//判断不是数组，或者size没有设置，size小于1，就返回空数组
				if (!length || !size || size < 1) {
					return []
				}
				//核心部分
				let index = 0 //用来表示切割元素的范围start
				let resIndex = 0 //用来递增表示输出数组的下标

				//根据length和size算出输出数组的长度，并且创建它。
				let result = new Array(Math.ceil(length / size))
				//进行循环
				while (index < length) {
					//循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
					result[resIndex++] = array.slice(index, (index += size))
				}
				//输出新数组
				return result
			},
			//获取发布列表
			getFabuList() {
				let data = {
					page: this.page,
					limit: this.limit,
					city: this.city,
					isRecommend: this.tabind == 0 ? '1' : '', //推荐传1
					// dataType:    //1整租 2合租 3长租 4短租 5公寓
					city: uni.getStorageSync('city'), //市
					district: this.state == 1 && this.tabqyIndex == 0 ? this.quyu : '', //区
					street: this.state == 1 && this.tabqyIndex == 0 ? this.street : '', //街道
					metro: this.state == 1 && this.tabqyIndex == 1 ? this.street : '', //地铁
					minMoney: this.state == 1 && this.priceState ? this.minNumber : '', //最小金额
					maxMoney: this.state == 1 && this.priceState ? this.number : '', //最大金额
					minBedroomCount: this.state == 1 ? this.minBedroomCount : '',
					maxBedroomCount: this.state == 1 ? this.maxBedroomCount : ''
				}
				getDataList(data).then(res => {
					uni.hideLoading();
					uni.stopPullDownRefresh();
					if (res && res.code == 0) {
						this.count = res.data.pages
						if (this.page == this.count) {
							this.status = 'nomore'
						} else {
							this.status = 'loadmore'
						}
						if (this.page == 1) {
							this.orderlist = res.data.records
						} else {
							this.orderlist = [...this.orderlist, ...res.data.records]
						}
					}
				})
			},
			// tab切换
			change(index) {
				// #ifdef MP-WEIXIN
				if (uni.getStorageSync('sendMsg')) {
					console.log('授权+1')
					wx.requestSubscribeMessage({
						tmplIds: this.arr,
						success(re) {
							console.log(JSON.stringify(re), 111111111111)
							var datas = JSON.stringify(re);
							if (datas.indexOf("accept") != -1) {
								console.log(re)
							}
						},
						fail: (res) => {
							console.log(res)
						}
					})
				}
				// #endif


				uni.showLoading({
					title: '加载中'
				})
				this.orderlist = [];
				this.page = 1
				this.getFabuList();
			},
			navTo(dataId) {
				// #ifdef MP-WEIXIN
				if (uni.getStorageSync('sendMsg')) {
					console.log('授权+1')
					wx.requestSubscribeMessage({
						tmplIds: this.arr,
						success(re) {
							console.log(JSON.stringify(re), 111111111111)
							var datas = JSON.stringify(re);
							if (datas.indexOf("accept") != -1) {
								console.log(re)
							}
						},
						fail: (res) => {
							console.log(res)
						}
					})
				}
				// #endif
				uni.navigateTo({
					url: '/pages/index/classify/detail?dataId=' + dataId
				})
			},
			// 开启订阅消息
			openMsg() {
				console.log('订阅消息')
				var that = this
				uni.getSetting({
					withSubscriptions: true, //是否获取用户订阅消息的订阅状态，默认false不返回
					success(ret) {
						console.log(ret.subscriptionsSetting, '------------------')
						// if (ret.subscriptionsSetting.itemSettings && Object.keys(ret.subscriptionsSetting.itemSettings).length == 2) {
						if (ret.subscriptionsSetting.itemSettings) {
							uni.setStorageSync('sendMsg', true)
							uni.openSetting({ // 打开设置页 
								success(rea) {
									console.log(rea.authSetting)
								}
							});
						} else { // 用户没有点击“总是保持以上，不再询问”则每次都会调起订阅消息
							console.log(99999)
							uni.setStorageSync('sendMsg', false)
							uni.showModal({
								title: '提示',
								content: '为了更好的体验,请绑定消息推送',
								confirmText: '确定',
								cancelText: '取消',
								success: function(res) {
									if (res.confirm) {
										wx.requestSubscribeMessage({
											tmplIds: that.arr,
											success(re) {
												console.log(JSON.stringify(re),
													'++++++++++++++')
												var datas = JSON.stringify(re);
												if (datas.indexOf("accept") != -1) {
													console.log(re)
													// uni.setStorageSync('sendMsg', true)
												}
											},
											fail: (res) => {
												console.log(res)
											}
										})
										// uni.setStorageSync('sendMsg', true)
										console.log('确认')
										that.showModal = false
									} else if (res.cancel) {
										console.log('取消')
										// uni.setStorageSync('sendMsg', false)
										that.showModal = true
									}
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F7FF;
	}

	/deep/.u-dropdown__menu {
		padding-left: 140rpx;
	}

	.headsrt {
		background: #FFFFFF;
		position: fixed;
		top: 0rpx;
		left: 0;
		right: 0;
		z-index: 999;
		/* #ifdef APP */
		padding-top: 120rpx;
		/* #endif */
		/* #ifdef H5 */
		padding-top: 30rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 0rpx;
		/* #endif */

	}

	.headsr {
		background: #F5F7FF;
		border: 2rpx solid #333333;
		border-radius: 65rpx;
		padding: 4rpx 0;
	}

	.headapp {

		/* #ifdef APP */
		padding-top: 230rpx;
		/* #endif */
		/* #ifdef H5 */
		padding-top: 150rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 110rpx;
		/* #endif */
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-warter-img {
		width: 100%;
		height: 323rpx;
		border-radius: 18rpx 18rpx 0 0;
	}

	.demo-title {
		width: 100%;
		font-size: 30rpx;
		margin-top: 15rpx;
		color: #333333;
		font-weight: 700;
		padding-left: 16rpx;
		padding-right: 16rpx;
		display: flex;
		justify-content: center;

		.demo-title-box {
			width: 290rpx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1; //可设置显示的行数
			line-clamp: 1;
			-webkit-box-orient: vertical;
		}
	}

	.labs {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #666666;
		margin-top: 10rpx;
		padding: 0 20rpx;
	}

	.price {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FF0000;
		margin-top: 10rpx;

		text {
			font-size: 26rpx;

		}
	}

	.demo-distances {
		color: #666666;
		font-size: 24rpx;
		font-weight: 400;
		padding: 10rpx 0 16rpx 16rpx;
	}



	.demo-phone {
		width: 157rpx;
		height: 44rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FF6800;
		color: #FFFFFF;
		font-size: 24rpx;
		font-weight: bold;
		margin-top: 10rpx;
		margin-bottom: 30rpx;
		margin-left: 16rpx;
	}



	.flowListStyle {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: center;
		margin-top: 20rpx;

		.flowListStyle-box {
			width: 686rpx;
			height: 100%;


			.demo-warter {
				// margin: 0 10rpx 20rpx 10rpx;
				width: 333rpx;
				height: auto;
				border-radius: 18rpx;
				background-color: #ffffff;
				position: relative;
				margin-bottom: 20rpx;
				// float: right;
			}
		}
	}

	.btn {
		padding: 5rpx 10rpx;
		color: #666666;
		background: #f2f2f2;
		border-radius: 4px;
		margin-right: 8rpx;
	}

	.announcement {
		// background: #ffffff;
		padding: 0px 0px 0px 10px;
	}

	.announcementbox {
		width: 712upx;
		height: 64upx;
		background: #fff0e5;
		border-radius: 32upx;
		display: flex;
		align-items: center;
		padding: 0px 24upx;
	}

	.anount {
		color: #FF6800;
		font-weight: bold;
	}

	.anounts {
		width: 80%;
		height: 60rpx;
		color: #333333;
		font-size: 24upx;
	}

	.orderbox {
		width: 333upx;
		height: 100%;
		background: #ffffff;
		border-radius: 8upx;
		margin-left: 30upx;
		margin-top: 20upx;
	}

	.phoneBtn {
		width: 157upx;
		height: 44upx;
		background: #ff6800;
		border-radius: 4upx;
		color: #fff;
		line-height: 44upx;
		text-align: center;
	}

	.category {
		width: 100%;

		.box {
			width: 100%;
			border-radius: 20upx;
			// background-color: #ffffff;

			.dots {
				display: flex;
				justify-content: center;
				height: 15upx;
				width: 100%;

				view {
					width: 30upx;
					height: 5upx;
					background-color: rgba(0, 0, 0, 0.2);

					&.active {
						background-color: #ff570a;
					}
				}
			}

			.swiper {
				width: 100%;
				padding: 10upx 0;

				.uni-swiper-dot {
					width: 20upx;
				}

				.category-list {
					width: 100%;
					height: auto;
					display: flex;
					justify-content: flex-start;
					padding: 10upx 0;
					flex-flow: wrap;

					.icon {
						width: 20%;
						display: flex;
						flex-flow: wrap;
						justify-content: center;
						font-size: 26upx;
						color: #666;
						margin-bottom: 10upx;
						position: relative;

						image {
							width: 70%;
							height: 13.3vw;
						}

						view {
							width: 100%;
							display: flex;
							justify-content: center;
						}

						.remen,
						.lijian {
							width: 60upx;
							height: 30upx;
							position: absolute;
							top: 0;
							right: 0;
						}
					}
				}
			}
		}
	}

	.actve {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #4B74FF;
	}

	.morbtn {
		width: 300rpx;
		height: 88rpx;
		background: #4B74FF;
		border-radius: 12rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		// margin: 20rpx auto;
	}

	.slotbts {
		width: 300rpx;
		height: 88rpx;
		background: #EBEBEB;
		border-radius: 12rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hxbox {
		width: 215rpx;
		height: 74rpx;
		border: 1px solid #b9b9b9;
		border-radius: 10rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 15rpx;
		margin-bottom: 20rpx;
	}

	.hxact {
		background: #E3E9FF;
		border: 1px solid #4B74FF;
		border-radius: 10rpx;
		color: #4B74FF;
	}

	.slot-qy {
		display: flex;

		.actqy {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #4B74FF;
			background: #FFFFFF;
		}
	}

	.slot-btnr {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx;

		.slotbts {
			width: 300rpx;
			height: 88rpx;
			background: #EBEBEB;
			border-radius: 12rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.slotbt {
			width: 300rpx;
			height: 88rpx;
			background: #4B74FF;
			border-radius: 12rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
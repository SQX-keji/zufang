<template>
	<view>
		<view style="width: 100%;padding-bottom: 140rpx;padding-top: 120rpx;">
			<view class="tishi flex align-center justify-center">
				<view class="tishi-box">
					{{chatMgsStr}}
					<text @click="gotoJubao()" style="color: #4F75FB;">立即举报</text>
				</view>
			</view>
			<view style="display: flex;flex-direction: column;" v-for="(item,index) in ListItem" :key='index'>
				<view style="margin-top: 60rpx;width: 100%;text-align: center;font-size: 26rpx;color: #999999;">
					{{item.createTime}}
				</view>

				<view v-if="item.userId === userId" style="width: 83%;margin-left: 15%;">
					<view class="chat-listitem" style="float: right;">
						<view v-if="item.content && item.messageType === 1" @longpress="copy(item.content)"
							class="chat-listitem-text" style="margin-right: 20rpx;">{{item.content}}</view>
						<u-image width='200rpx' @tap="viewImg(item.content)" height="200rpx"
							v-if="item.content && item.messageType === 2" :src="item.content"></u-image>
						<view class="chat-listitem-texts" v-if="item.content && item.messageType == 4">
							<view class="text-lg text-bold">{{item.content.title}}</view>
							<view class="flex margin-top-xs">
								<image :src="item.content.titleImg" style="width: 109rpx;height: 108rpx;"></image>
								<view class="margin-left-xs">
									<view class="labs">{{item.content.roomArea}}m² /
										{{item.content.bedroomCount}}室{{item.content.livingRoomCount}}厅/
										{{item.content.floor}}层
									</view>
									<view class="price  ">{{item.content.money}}/月</view>
								</view>
							</view>
						</view>
						<view v-if="item.content && item.messageType === 3" class="chat-listitem-text bubble voice"
							:class="playMsgid == index?'play':''"
							style="margin-right: 20rpx;display: flex;align-items: center;"
							@tap="playVoice(item.content,index)">
							<view class="length">{{item.voiceLength ? item.voiceLength : 0}}</view>
							<image v-if="playMsgid != index" src="../../static/images/msg/labaleft.png"
								style="width: 35upx;height: 40upx;margin-left: 10rpx;"></image>
							<image v-if="playMsgid == index" src="../../static/images/msg/labaleft.png"
								style="width: 35upx;height: 40upx;margin-left: 10rpx;"></image>

						</view>
						<image class="chat-listitem-text" @tap="viewImg(item.content)"
							v-if="item.content && item.messageType === 5"
							:src="'https://xxpw.xianmxkj.com/emoji/' +item.content"
							style="height: 80rpx;width: 80rpx;margin-right: 20rpx;"></image>

						<view>
							<u-image v-if="item.avatar" shape="circle" width='75rpx' height="75rpx"
								:src="item.avatar"></u-image>
							<image v-else src="../../static/logo.png" class="chat-listitem-image"></image>
						</view>
					</view>
				</view>
				<view v-if="item.userId != userId" style="width: 83%;margin-right: 15%;">
					<view class="chat-listitem" style="float: left;margin-left: 10rpx;">
						<view>
							<u-image v-if="item.avatar" shape="circle" width='75rpx' height="75rpx"
								:src="item.avatar"></u-image>
							<!-- <image :src="item.avatar" class="chat-listitem-image"></image> -->
							<image v-else src="../../static/logo.png" class="chat-listitem-image"></image>

						</view>
						<view v-if="item.content && item.messageType === 3" class="chat-listitem-text bubble voice"
							:class="playMsgid == index?'play':''"
							style="margin-left: 20rpx;display: flex;align-items: center;"
							@tap="playVoice(item.content,index)">
							<image v-if="playMsgid != index" src="../../static/images/msg/laba.png"
								style="width: 35upx;height: 40upx;margin-right: 10rpx;"></image>
							<image v-if="playMsgid == index" src="../../static/images/msg/labagif.gif"
								style="width: 35upx;height: 40upx;margin-right: 10rpx;"></image>

							<view class="length">{{item.voiceLength ? item.voiceLength : 0}}</view>
						</view>
						<view v-if="item.content && item.messageType === 1" class="chat-listitem-text1"
							style="margin-left: 20rpx;">{{item.content}}</view>
						<image @tap="viewImg(item.content)" v-if="item.content && item.messageType === 2"
							:src="item.content" style="height: 200rpx;width: 200rpx;margin-left: 20rpx;"></image>
						<image class="chat-listitem-text" @tap="viewImg(item.content)"
							v-if="item.content && item.messageType === 5"
							:src="'https://xxpw.xianmxkj.com/emoji/' +item.content"
							style="height: 80rpx;width: 80rpx;margin-left: 20rpx;"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部聊天输入框 -->

		<!-- <view class="input-box ">
			<view class="justify-between padding-lr align-center"
				style="display: flex;width: 100%;background: #FFFFFF;">
				<image src="../static/yuyin.png" style="width: 58rpx;height: 58rpx;"></image>
				<image src="../../static/images/msg/add.png" @click="chooseImage(['album'])"
					style="width: 70rpx;height: 70rpx;margin-right: 12rpx;"></image>
				<input confirm-type="send" @confirm='setChatSave(1)' placeholder="想对他说点什么呢？" type="text"
					v-model="content"
					style="width: 72%;height: 70rpx;background: #F5F5F5;margin: 0 10rpx;border-radius: 10rpx;padding-left: 10rpx;" />
				<image src="../static/biaoqing.png" style="width: 58rpx;height: 58rpx;"></image>
				<u-icon name="plus-circle" color="#333333" size="70" @click="chooseImage(['album'])"></u-icon>
				<image src="../../static/images/msg/sendMsg.png" @tap='setChatSave(1)'
					style="width:60rpx;height: 60rpx;" mode=""></image>
			</view>
		</view> -->
		<!-- 底部输入栏 -->
		<view class="input-box " :class="popupLayerClass" @touchmove.stop.prevent="discard" :style="{bottom:bottom}"
			style="padding-right: 20rpx;">
			<!-- H5下不能录音，输入栏布局改动一下 -->
			<view class="voice">
				<view class="icon" :class="isVoice?'jianpan':'yuyin'" @tap="switchVoice"></view>
			</view>

			<view class="textbox">
				<view class="voice-mode" :class="[isVoice?'':'hidden',recording?'recording':'']"
					@touchstart="voiceBegin" @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd"
					@touchcancel="voiceCancel">{{voiceTis}}</view>
				<view class="text-mode" :class="isVoice?'hidden':''">
					<view class="box">
						<input style="color: #000000;" :auto-height="true" @confirm='setChatSave(1)' v-model="content"
							@focus="keyboardHeightChange" placeholder="请输入消息" @blur="inputBindBlur" :adjust-position="false"/>
					</view>
				</view>
			</view>
			<view @tap="chooseEmoji" class="margin-top-sm  padding-left-sm">
				<image src="../static/biaoqing.png" style="width: 58rpx;height: 58rpx;"></image>
			</view>

			<view class="more padding-right-xs" @click="chooseImage(['album'])">
				<view class="icon add"></view>
			</view>
		</view>

		<!-- 录音UI效果 -->
		<view class="record" :class="recording?'':'hidden'">
			<view class="ing" :class="willStop?'hidden':''">
				<view class="icon luyin2"></view>
			</view>
			<view class="cancel" :class="willStop?'':'hidden'">
				<view class="icon chehui"></view>
			</view>
			<view class="tis" :class="willStop?'change':''">{{recordTis}}</view>
		</view>

		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- 表情 -->
			<swiper class="emoji-swiper" indicator-active-color="#cccccc" :class="{hidden:hideEmoji}"
				indicator-dots="true" duration="150">
				<swiper-item v-for="(page1,pid) in emojiList" :key="pid">
					<view v-for="(em,eid) in page1" :key="eid" @tap="setChatSave(5,em.url)">
						<image mode="widthFix" :src="'https://xxpw.xianmxkj.com/emoji/'+em.url"></image>
					</view>
				</swiper-item>
			</swiper>
			
		</view>
	</view>
</template>

<script>
	// #ifdef H5
	var recorder; // 定义一个MediaRecorder对象
	var stream; //定义一个音频流的对象
	var chunks = []; // 定义一个用于存储音频数据片段的数组
	// #endif
	import configdata from '../../common/config.js';
	import {
		getDataById
	} from '@/apis/fabu.js'
	import config from '../../config.js'
	import {
		selectChatContent
	} from '../../apis/shop.js'
	import {
		selectUserInfoByUserId
	} from '../../apis/my.js'
	export default {
		data() {
			return {
				connected: false,
				connecting: false,
				msg: false,
				type4: [],
				listRight: {
					chat: {
						userHead: ""
					},
					content: "",
					sendType: 1,
					type: 1
				},
				content: '',
				chatId: '',
				type: 1,
				ListItem: [],
				ShopState: false,
				ShopordersId: '',
				Shopimage: '',
				Shopmoney: '',
				ShopTitle: '',
				orderState: false,
				ordersId: '',
				userId: '',
				orderimage: '',
				orderNum: '',
				teamId: '',
				hand: 1,
				index: 0,
				page: 0,
				size: 1000,
				countDown: '',
				chatConversationId: '',
				byUserId: '',
				chatMgsStr: '',
				typeId: '',

				//录音相关参数
				// #ifndef H5
				//H5不能录音
				RECORDER: uni.getRecorderManager(),
				// #endif
				isVoice: false,
				voiceTis: '按住 说话',
				recordTis: "手指上滑 取消发送",
				recording: false,
				willStop: false,
				initPoint: {
					identifier: 0,
					Y: 0
				},
				recordTimer: null,
				recordLength: 0,

				//播放语音相关参数
				AUDIO: uni.createInnerAudioContext(),
				playMsgid: false,
				VoiceTimer: null,
				// 抽屉参数
				popupLayerClass: '',
				// more参数
				hideMore: true,
				bottom: '0px',

				//表情定义
				hideEmoji: true,
				emojiList: [
					[{
						"url": "100.gif",
						alt: "[微笑]"
					}, {
						"url": "101.gif",
						alt: "[伤心]"
					}, {
						"url": "102.gif",
						alt: "[美女]"
					}, {
						"url": "103.gif",
						alt: "[发呆]"
					}, {
						"url": "104.gif",
						alt: "[墨镜]"
					}, {
						"url": "105.gif",
						alt: "[哭]"
					}, {
						"url": "106.gif",
						alt: "[羞]"
					}, {
						"url": "107.gif",
						alt: "[哑]"
					}, {
						"url": "108.gif",
						alt: "[睡]"
					}, {
						"url": "109.gif",
						alt: "[哭]"
					}, {
						"url": "110.gif",
						alt: "[囧]"
					}, {
						"url": "111.gif",
						alt: "[怒]"
					}, {
						"url": "112.gif",
						alt: "[调皮]"
					}, {
						"url": "113.gif",
						alt: "[笑]"
					}, {
						"url": "114.gif",
						alt: "[惊讶]"
					}, {
						"url": "115.gif",
						alt: "[难过]"
					}, {
						"url": "116.gif",
						alt: "[酷]"
					}, {
						"url": "117.gif",
						alt: "[汗]"
					}, {
						"url": "118.gif",
						alt: "[抓狂]"
					}, {
						"url": "119.gif",
						alt: "[吐]"
					}, {
						"url": "120.gif",
						alt: "[笑]"
					}, {
						"url": "121.gif",
						alt: "[快乐]"
					}, {
						"url": "122.gif",
						alt: "[奇]"
					}, {
						"url": "123.gif",
						alt: "[傲]"
					}],
					[{
						"url": "124.gif",
						alt: "[饿]"
					}, {
						"url": "125.gif",
						alt: "[累]"
					}, {
						"url": "126.gif",
						alt: "[吓]"
					}, {
						"url": "127.gif",
						alt: "[汗]"
					}, {
						"url": "128.gif",
						alt: "[高兴]"
					}, {
						"url": "129.gif",
						alt: "[闲]"
					}, {
						"url": "130.gif",
						alt: "[努力]"
					}, {
						"url": "131.gif",
						alt: "[骂]"
					}, {
						"url": "132.gif",
						alt: "[疑问]"
					}, {
						"url": "133.gif",
						alt: "[秘密]"
					}, {
						"url": "134.gif",
						alt: "[乱]"
					}, {
						"url": "135.gif",
						alt: "[疯]"
					}, {
						"url": "136.gif",
						alt: "[哀]"
					}, {
						"url": "137.gif",
						alt: "[鬼]"
					}, {
						"url": "138.gif",
						alt: "[打击]"
					}, {
						"url": "139.gif",
						alt: "[bye]"
					}, {
						"url": "140.gif",
						alt: "[汗]"
					}, {
						"url": "141.gif",
						alt: "[抠]"
					}, {
						"url": "142.gif",
						alt: "[鼓掌]"
					}, {
						"url": "143.gif",
						alt: "[糟糕]"
					}, {
						"url": "144.gif",
						alt: "[恶搞]"
					}, {
						"url": "145.gif",
						alt: "[什么]"
					}, {
						"url": "146.gif",
						alt: "[什么]"
					}, {
						"url": "147.gif",
						alt: "[累]"
					}],
					[{
						"url": "148.gif",
						alt: "[看]"
					}, {
						"url": "149.gif",
						alt: "[难过]"
					}, {
						"url": "150.gif",
						alt: "[难过]"
					}, {
						"url": "151.gif",
						alt: "[坏]"
					}, {
						"url": "152.gif",
						alt: "[亲]"
					}, {
						"url": "153.gif",
						alt: "[吓]"
					}, {
						"url": "154.gif",
						alt: "[可怜]"
					}, {
						"url": "155.gif",
						alt: "[刀]"
					}, {
						"url": "156.gif",
						alt: "[水果]"
					}, {
						"url": "157.gif",
						alt: "[酒]"
					}, {
						"url": "158.gif",
						alt: "[篮球]"
					}, {
						"url": "159.gif",
						alt: "[乒乓]"
					}, {
						"url": "160.gif",
						alt: "[咖啡]"
					}, {
						"url": "161.gif",
						alt: "[美食]"
					}, {
						"url": "162.gif",
						alt: "[动物]"
					}, {
						"url": "163.gif",
						alt: "[鲜花]"
					}, {
						"url": "164.gif",
						alt: "[枯]"
					}, {
						"url": "165.gif",
						alt: "[唇]"
					}, {
						"url": "166.gif",
						alt: "[爱]"
					}, {
						"url": "167.gif",
						alt: "[分手]"
					}, {
						"url": "168.gif",
						alt: "[生日]"
					}, {
						"url": "169.gif",
						alt: "[电]"
					}, {
						"url": "170.gif",
						alt: "[炸弹]"
					}, {
						"url": "171.gif",
						alt: "[刀子]"
					}],
					[{
						"url": "172.gif",
						alt: "[足球]"
					}, {
						"url": "173.gif",
						alt: "[瓢虫]"
					}, {
						"url": "174.gif",
						alt: "[翔]"
					}, {
						"url": "175.gif",
						alt: "[月亮]"
					}, {
						"url": "176.gif",
						alt: "[太阳]"
					}, {
						"url": "177.gif",
						alt: "[礼物]"
					}, {
						"url": "178.gif",
						alt: "[抱抱]"
					}, {
						"url": "179.gif",
						alt: "[拇指]"
					}, {
						"url": "180.gif",
						alt: "[贬低]"
					}, {
						"url": "181.gif",
						alt: "[握手]"
					}, {
						"url": "182.gif",
						alt: "[剪刀手]"
					}, {
						"url": "183.gif",
						alt: "[抱拳]"
					}, {
						"url": "184.gif",
						alt: "[勾引]"
					}, {
						"url": "185.gif",
						alt: "[拳头]"
					}, {
						"url": "186.gif",
						alt: "[小拇指]"
					}, {
						"url": "187.gif",
						alt: "[拇指八]"
					}, {
						"url": "188.gif",
						alt: "[食指]"
					}, {
						"url": "189.gif",
						alt: "[ok]"
					}, {
						"url": "190.gif",
						alt: "[情侣]"
					}, {
						"url": "191.gif",
						alt: "[爱心]"
					}, {
						"url": "192.gif",
						alt: "[蹦哒]"
					}, {
						"url": "193.gif",
						alt: "[颤抖]"
					}, {
						"url": "194.gif",
						alt: "[怄气]"
					}, {
						"url": "195.gif",
						alt: "[跳舞]"
					}],
					[{
						"url": "196.gif",
						alt: "[发呆]"
					}, {
						"url": "197.gif",
						alt: "[背着]"
					}, {
						"url": "198.gif",
						alt: "[伸手]"
					}, {
						"url": "199.gif",
						alt: "[耍帅]"
					}, {
						"url": "200.png",
						alt: "[微笑]"
					}, {
						"url": "201.png",
						alt: "[生病]"
					}, {
						"url": "202.png",
						alt: "[哭泣]"
					}, {
						"url": "203.png",
						alt: "[吐舌]"
					}, {
						"url": "204.png",
						alt: "[迷糊]"
					}, {
						"url": "205.png",
						alt: "[瞪眼]"
					}, {
						"url": "206.png",
						alt: "[恐怖]"
					}, {
						"url": "207.png",
						alt: "[忧愁]"
					}, {
						"url": "208.png",
						alt: "[眨眉]"
					}, {
						"url": "209.png",
						alt: "[闭眼]"
					}, {
						"url": "210.png",
						alt: "[鄙视]"
					}, {
						"url": "211.png",
						alt: "[阴暗]"
					}, {
						"url": "212.png",
						alt: "[小鬼]"
					}, {
						"url": "213.png",
						alt: "[礼物]"
					}, {
						"url": "214.png",
						alt: "[拜佛]"
					}, {
						"url": "215.png",
						alt: "[力量]"
					}, {
						"url": "216.png",
						alt: "[金钱]"
					}, {
						"url": "217.png",
						alt: "[蛋糕]"
					}, {
						"url": "218.png",
						alt: "[彩带]"
					}, {
						"url": "219.png",
						alt: "[礼物]"
					}, ]
				],
			};
		},
		computed: {
			showMsg() {
				if (this.connected) {
					if (this.msg) {
						return '收到消息：' + this.msg
					} else {
						return '等待接收消息'
					}
				} else {
					return '尚未连接'
				}
			}
		},
		onUnload() {
			uni.closeSocket()
			this.AUDIO.stop();
			this.playMsgid = null;
			uni.hideLoading()
			uni.offKeyboardHeightChange(); //取消监听键盘高度变化事件，避免内存消耗
		},
		onLoad(d) {
			this.chatMgsStr = uni.getStorageSync('chatMgsStr')
			this.userId = this.$queue.getData('userId');
			this.byUserId = d.focusedUserId
			this.getUserInfo()
			this.chatConversationId = d.chatConversationId;
			this.connect();
			this.typeId = d.typeId
			//语音自然播放结束
			this.AUDIO.onEnded((res) => {
				this.playMsgid = null;
			});
			// #ifndef H5
			//录音开始事件
			this.RECORDER.onStart((e) => {
				this.recordBegin(e);
			})
			//录音结束事件
			this.RECORDER.onStop((e) => {
				this.recordEnd(e);
			})
			// #endif
			// if (d.teamName) {
			// 	uni.setNavigationBarTitle({
			// 		title: d.teamName
			// 	});
			// }
		},
		onShow() {
			if (this.connected || this.connecting) {

			} else {
				this.connect();
			}
			// this.keyboardHeightChange()
		},
		onBackPress() {
			this.AUDIO.stop();
			this.playMsgid = null;
		},
		onHide() {
			this.AUDIO.stop();
			this.playMsgid = null;
			uni.closeSocket()
		},
		methods: {
			// 监听键盘高度事件
			keyboardHeightChange() {
				uni.onKeyboardHeightChange((res) => { //监听键盘高度变化
				console.log(res,res.height)
					// const res_keyboard = uni.getSystemInfoSync();
					// let key_height = res.height - (res_keyboard.screenHeight - res_keyboard.windowHeight +
					// 	res_keyboard.safeAreaInsets.bottom) + 10

					// this.bottom = `${res.height ?  key_height : 0 }px`;
					if (res.height !== 0) {
						this.bottom = `${res.height ?  res.height : 0 }px`;
					}
				})
			},
			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus(e) {
				// if (this.popupLayerClass == 'showLayer' && this.hideMore == false) {
				// 	this.hideDrawer();
				// }
				console.log(e)
				// this.bottom = e.detail.height
			},
			inputBindBlur() {
				this.isFocus = false
				this.bottom = 0
			},
			// 打开抽屉
			openDrawer() {
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer() {
				this.popupLayerClass = '';
				setTimeout(() => {
					this.hideMore = true;
					this.hideEmoji = true;
				}, 150);
			},
			// 选择表情
			chooseEmoji() {
				this.hideMore = true;
				if (this.hideEmoji) {
					this.hideEmoji = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			//添加表情
			addEmoji(em) {
				this.textMsg += em.alt;
			},

			//替换表情符号为图片
			replaceEmoji(str) {
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
					console.log("item: " + item);
					for (let i = 0; i < this.emojiList.length; i++) {
						let row = this.emojiList[i];
						for (let j = 0; j < row.length; j++) {
							let EM = row[j];
							if (EM.alt == item) {
								//在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径 
								//比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
								let onlinePath = 'https://s2.ax1x.com/2019/04/12/'
								let imgstr = '<img src="' + onlinePath + this.onlineEmoji[EM.url] + '">';
								console.log("imgstr: " + imgstr);
								return imgstr;
							}
						}
					}
				});
				return '<div style="display: flex;align-items: center;word-wrap:break-word;">' + replacedStr + '</div>';
			},
			// 播放语音
			playVoice(msg, index) {
				console.log('播放',msg,index)
				this.playMsgid = index;
				this.AUDIO.src = msg;
				this.$nextTick(function() {
					this.AUDIO.play();
				});
			},
			// 录音开始
			voiceBegin(e) {

				// #ifdef H5
				if (stream) {
					stream.getTracks().forEach((track) => track.stop())
					stream = null
				}
				if (recorder) {
					recorder = null
				}
				this.recordLength = 0
				this.voicePaths = '';
				this.voicePath = '';
				this.startRecord()
				// #endif

				if (e.touches.length > 1) {
					return;
				}
				this.initPoint.Y = e.touches[0].clientY;
				this.initPoint.identifier = e.touches[0].identifier;

				// #ifndef H5
				this.RECORDER.start({
					format: "mp3"
				}); //录音开始,
				// #endif

			},
			//开始录音
			startRecord: async function() {

				let _this = this
				// 获取麦克风音频数据流
				stream = await navigator.mediaDevices.getUserMedia({
					audio: true
				})


				// 初始化MediaRecorder对象
				recorder = new MediaRecorder(stream);
				console.log('asdsad___' + recorder)
				// alert('asdsad___' + recorder)
				// 将 stream 转成 blob 来存放
				recorder.ondataavailable = (blobEvent) => {
					chunks.push(blobEvent.data);
				}
				// 停止时生成预览的 blob url
				recorder.onstop = () => {
					const blob = new Blob(chunks, {
						type: 'audio/mp3'
					})
					// const mediaUrl = URL.createObjectURL(blob);
					_this.voicePaths = blob;
					_this.blobData = blob;
					// that.voicePath = mediaUrl;
					// const newbold = new File([recordPath]),{type:'audio/mp3'}
					// alert(that.voicePaths,URL.createObjectURL(blob))

				}
				recorder.start();
				_this.recordBegin()
			},
			//录音开始UI效果
			recordBegin(e) {
				this.recording = true;
				this.voiceTis = '松开 结束';
				this.recordLength = 0;
				this.recordTimer = setInterval(() => {
					this.recordLength++;
				}, 1000)
			},
			// 录音被打断
			voiceCancel() {
				this.recording = false;
				this.voiceTis = '按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.willStop = true; //不发送录音
				this.RECORDER.stop(); //录音结束
			},
			// 录音中(判断是否触发上滑取消发送)
			voiceIng(e) {


				if (!this.recording) {
					return;
				}
				let touche = e.touches[0];
				//上滑一个导航栏的高度触发上滑取消发送
				if (this.initPoint.Y - touche.clientY >= uni.upx2px(100)) {
					this.willStop = true;
					this.recordTis = '松开手指 取消发送'
				} else {
					this.willStop = false;
					this.recordTis = '手指上滑 取消发送'
				}
			},
			// 结束录音
			voiceEnd(e) {
				if (!this.recording) {
					return;
				}
				this.recording = false;
				this.voiceTis = '按住 说话';
				this.recordTis = '手指上滑 取消发送'
				//原生录音停止
				// #ifdef H5
				//停止录音

				if (recorder.state != "inactive") {
					recorder.stop();
				}
				//把音频流也停止掉
				stream.getTracks().forEach((track) => track.stop())


				this.uplodMp3(this.voicePaths);
				// #endif

				// #ifndef H5
				this.RECORDER.stop(); //录音结束
				// #endif

			},
			//录音结束(回调文件)
			recordEnd(e) {
				clearInterval(this.recordTimer);
				if (!this.willStop) {
					// this.$queue.showLoading('发送中...')
					uni.showLoading({
						title: '发送中'
					});
					console.log("e: " + JSON.stringify(e));
					let msg = {
						length: 0,
						url: e.tempFilePath
					}
					let min = parseInt(this.recordLength / 60);
					let sec = this.recordLength % 60;
					min = min < 10 ? '0' + min : min;
					sec = sec < 10 ? '0' + sec : sec;
					msg.length = min + ':' + sec;
					console.log('msg.length___:' + msg.length)
					uni.uploadFile({ // 上传接口
						url: this.config("APIHOST1") + '/alioss/upload', //真实的接口地址
						// url: 'https://wap.chumenya.com/sqx_fast/alioss/upload', //真实的接口地址

						filePath: e.tempFilePath,
						name: 'file',
						success: (uploadFileRes) => {
							uni.hideLoading();
							this.content = JSON.parse(uploadFileRes.data).data;
							this.setChatSave(3, msg.length);
						}
					});
				} else {
					console.log('取消发送录音');
				}
				this.willStop = false;
			},
			//上传mp3格式的音频
			uplodMp3(recordPath) {
				let _this = this;
				// var newbold = new File([recordPath],{type:'audio/mp3'})

				clearInterval(_this.recordTimer);
				if (!_this.willStop) {
					// that.$queue.showLoading('发送中...')
					uni.showLoading({
						title: '录音上传中...'
					})
					let msg = {
						length: 0,
						url: recordPath
					}
					let min = parseInt(_this.recordLength / 60);
					let sec = _this.recordLength % 60;
					min = min < 10 ? '0' + min : min;
					sec = sec < 10 ? '0' + sec : sec;
					if (_this.recordLength % 60 > 1) {
						msg.length = min + ':' + sec;
						// console.log('msg.length___:' + msg.length)
						setTimeout(function() {
							uni.uploadFile({ // 上传接口
								url: _this.config("APIHOST1") + '/alioss/upload', //真实的接口地址
								// url: 'https://wap.chumenya.com/sqx_fast/alioss/upload', //真实的接口地址
								file: _this.blobData,
								// file: recordPath,
								name: 'file',
								success: (uploadFileRes) => {

									uni.hideLoading();
									_this.content = JSON.parse(uploadFileRes.data).data;
									_this.setChatSave(3, msg.length);
								}
							});
						}, 1000)
					} else {
						_this.$queue.showToast('语音要大于一秒才可以发送！')
					}
				} else {
					console.log('取消发送录音');
				}
				_this.willStop = false;
			},
			// 切换语音/文字输入
			switchVoice() {
				this.hideDrawer();
				this.isVoice = this.isVoice ? false : true;
			},
			//更多功能(点击+弹出)
			showMore() {
				this.isVoice = false;
				this.hideEmoji = true;
				if (this.hideMore) {
					this.hideMore = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
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
						this.setChatSave(4, JSON.stringify(res.data)) //发送订单
					}
				})
			},
			gotoJubao() {
				uni.navigateTo({
					url: '/my/jubao/jubao?byUserId=' + this.byUserId+'&state=5'
				})
			},
			getUserInfo() {
				let data = {
					userId: this.byUserId
				}
				selectUserInfoByUserId(data).then(res => {
					if (res.code == 0) {
						uni.setNavigationBarTitle({
							title: res.data.userName
						})
					}
				})
			},
			copy(content) {
				uni.showModal({
					title: '温馨提示',
					content: '确认要复制此文字吗？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							uni.setClipboardData({
								data: content,
								success: r => {
									this.$queue.showToast('复制成功');
								}
							});
						}
					}
				});
			},
			getDateDiff(data) {
				// 传进来的data必须是日期格式，不能是时间戳
				//var str = data;
				//将字符串转换成时间格式
				var timePublish = new Date(data);
				var timeNow = new Date();
				var minute = 1000 * 60;
				var hour = minute * 60;
				var day = hour * 24;
				var month = day * 30;
				var result = "2";

				var diffValue = timeNow - timePublish;
				var diffMonth = diffValue / month;
				var diffWeek = diffValue / (7 * day);
				var diffDay = diffValue / day;
				var diffHour = diffValue / hour;
				var diffMinute = diffValue / minute;


				if (diffMonth > 3) {
					result = timePublish.getFullYear() + "-";
					result += timePublish.getMonth() + "-";
					result += timePublish.getDate();
				} else if (diffMonth > 1) { //月
					result = data.substring(0, 10);
				} else if (diffWeek > 1) { //周
					result = data.substring(0, 10);
				} else if (diffDay > 1) { //天
					result = data.substring(0, 10);
				} else if (diffHour > 1) { //小时
					result = parseInt(diffHour) + "小时前";
				} else if (diffMinute > 1) { //分钟
					result = parseInt(diffMinute) + "分钟前";
				} else {
					result = "刚刚";
				}
				return result;
			},

			connect() {
				let that = this;
				let userId = that.$queue.getData('userId');
				if (that.connected || that.connecting) {
					uni.showModal({
						content: '正在连接或者已经连接，请勿重复连接',
						showCancel: false
					})
					return false
				}
				that.connecting = true
				uni.showLoading({
					title: '连接中...'
				})
				console.log(userId, '*******************')
				uni.connectSocket({
					// url: 'ws://192.168.1.17:8881/gameTeamChat/' + userId + '_' + this.teamId,
					// url: 'wss://game.shengqianxiong.com.cn/wss/gameTeamChat/' + userId + '_' + this.teamId,
					// url: 'ws://192.168.1.17:8180/sqx_fast/chatSocket/' + userId,
					url: config.WSS + userId,
					data() {
						return {
							msg: 'Hello'
						}
					},
					header: {
						'content-type': 'application/json'
					},
					method: 'GET',
					success(res) {
						uni.hideLoading();
						that.getTimeOrListItem1();
						if (this.typeId) {
							this.getInfo();

						}
						// 这里是接口调用成功的回调，不是连接成功的回调，请注意
					},
					fail(err) {
						// 这里是接口调用失败的回调，不是连接失败的回调，请注意
						console.log("--------------" + JSON.stringify(err))
					}
				});
				uni.onSocketOpen((res) => {
					that.connecting = false
					that.connected = true
					uni.hideLoading()
					// uni.showToast({
					// 	icon: 'none',
					// 	title: '连接成功'
					// })
					console.log('onOpen', res);
				});
				uni.onSocketError((err) => {
					that.connecting = false
					that.connected = false
					uni.hideLoading()
					uni.showModal({
						content: '网络较差，请稍后再试',
						showCancel: false
					})
					console.log('onError', err);
				});
				uni.onSocketMessage(function(res) {
					console.log('收到服务器内容：' + JSON.stringify(res));

					setTimeout(() => {
						that.getTimeOrListItem1();
					}, 50);

				});
				uni.onSocketClose((res) => {
					that.connected = false
					that.startRecive = false
					that.msg = false
					console.log('onClose', res)
				});
			},
			close() {
				uni.closeSocket()
			},
			getTimeOrListItem1() {
				let data = {
					chatConversationId: this.chatConversationId,
				}
				selectChatContent(data).then(res => {
					if (res.code == 0) {
						this.ListItem = [];
						if (res.data) {
							var time = '';
							res.data.records.forEach(d => {
								d.createTime = this.getDateDiff(d.createTime);
								if (!d.avatar) {
									let avatar = this.$queue.getData('avatar');
									d.avatar = avatar
								}
								if (d.messageType == 4 && d.content) {
									let data = JSON.parse(d.content);
									d.content = data;
								}
								this.ListItem.push(d);
							});
							
							this.ListItem.reverse();
							setTimeout(() => {
								uni.pageScrollTo({
									scrollTop: 99999,
									duration: 0
								});
							}, 50);
						}
						uni.hideLoading();
					}
				})
				// this.$Request.get('/app/chat/selectChatContent?page=1&limit=1000&chatConversationId=' + this.chatConversationId).then(
				// 	res => {
				// 		this.ListItem = [];
				// 		if (res.data) {
				// 			var time = '';
				// 			res.data.list.forEach(d => {
				// 				if (!d.avatar) {
				// 					// d.chat.userHead = '../../static/logo.png';
				// 					let avatar = this.$queue.getData('avatar');
				// 					d.avatar = avatar
				// 				}
				// 				this.ListItem.push(d);
				// 			});
				// 			this.ListItem = this.ListItem.reverse();;
				// 			setTimeout(() => {
				// 				uni.pageScrollTo({
				// 					scrollTop: 99999,
				// 					duration: 0
				// 				});
				// 			}, 50);
				// 		}
				// 		uni.hideLoading();
				// 	});
			},
			getDateDiff(data) {
				// 传进来的data必须是日期格式，不能是时间戳
				//var str = data;
				//将字符串转换成时间格式
				var timePublish = new Date(data);
				var timeNow = new Date();
				var minute = 1000 * 60;
				var hour = minute * 60;
				var day = hour * 24;
				var month = day * 30;
				var result = "2";

				var diffValue = timeNow - timePublish;
				var diffMonth = diffValue / month;
				var diffWeek = diffValue / (7 * day);
				var diffDay = diffValue / day;
				var diffHour = diffValue / hour;
				var diffMinute = diffValue / minute;


				if (diffMonth > 3) {
					result = timePublish.getFullYear() + "-";
					result += timePublish.getMonth() + "-";
					result += timePublish.getDate();
				} else if (diffMonth > 1) { //月
					result = data.substring(0, 10);
				} else if (diffWeek > 1) { //周
					result = data.substring(0, 10);
				} else if (diffDay > 1) { //天
					result = data.substring(0, 10);
				} else if (diffHour > 1) { //小时
					result = parseInt(diffHour) + "小时前";
				} else if (diffMinute > 1) { //分钟
					result = parseInt(diffMinute) + "分钟前";
				} else {
					result = "刚刚";
				}
				return result;
			},
			getChatSave() {
				let userId = this.$queue.getData('userId');
				let phone = this.$queue.getData('phone');
				let userName = this.$queue.getData('userName');
				if (!phone) {
					phone = this.$queue.getData('userName');
				}
				let avatar = this.$queue.getData('avatar');
				let data = {
					userId: userId,
					userHead: avatar,
					userName: userName,
					storeId: '0',
					storeHead: '省钱兄电竞',
					storeName: ''
				}
				this.$Request.postJson('/chat/save', data).then(res => {
					if (res.status === 0) {
						this.chatId = res.data.chatId;
						uni.showLoading({
							title: '加载中...'
						});
						this.getTimeOrListItem1();
					}
				});
			},
			setChatSave(type, url) {
				//type:1文字 2图片
				if (type === 1 && this.content == '') {
					this.$queue.showToast('请输入聊天内容');
					return;
				}
				if (type === 1 && this.$queue.getChatSearchKeys(this.content)) {
					uni.showToast({
						title: "输入内容带有非法关键字请重新输入",
						mask: false,
						duration: 1500,
						icon: "none"
					});
					return;
				}
				if (type === 5) { //表情包
					this.content = url;
				}
				if (type == 4) { //房源
					this.content = url;
				}
				// if (this.chatId == '' || this.chatId == undefined) {
				// 	this.$queue.showToast('网络较差，请稍后再试');
				// 	return;
				// }
				let userId = this.$queue.getData('userId');
				let avatar = this.$queue.getData('avatar');
				let phone = this.$queue.getData('phone');
				let userName = this.$queue.getData('userName');
				if (!phone) {
					phone = this.$queue.getData('userName');
				}
				let data = {}
				if (type == 3) {
					data = {
						userId: this.byUserId,
						content: this.content,
						voiceLength: url,
						messageType: type,
						chatConversationId: this.chatConversationId,
					}
				} else {
					data = {
						userId: this.byUserId,
						content: this.content,
						messageType: type,
						chatConversationId: this.chatConversationId,
					}
				}
				// let data = {
				// 	content: this.content,
				// 	messageType: type,
				// 	userId: this.byUserId,
				// 	chatConversationId: this.chatConversationId,

				// }
				data = JSON.stringify(data);
				let that = this;
				uni.sendSocketMessage({
					data: data,
					success(res) {

						let avatar = that.$queue.getData('avatar');
						if (!avatar) {
							avatar = '../../static/logo.png';
						}
						let data = {
							chat: {
								userHead: avatar
							},
							content: that.content,
							type: type,
							userId: userId
						}
						that.ListItem.push(data);
						setTimeout(() => {
							that.getTimeOrListItem1();
						}, 50);
						console.log(that.content);
					},
					fail(err) {
						console.log(err);
					}
				})
				this.content = '';
			},
			//发送图片
			chooseImage(sourceType) {
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					success: res => {
						for (let i = 0; i < res.tempFilePaths.length; i++) {
							this.$queue.showLoading("上传中...");
							uni.uploadFile({ // 上传接口
								url: config.BASE_URL + 'alioss/upload', //真实的接口地址
								filePath: res.tempFilePaths[i],
								name: 'file',
								success: (uploadFileRes) => {
									console.log(uploadFileRes)
									this.content = JSON.parse(uploadFileRes.data).data;
									this.setChatSave(2);
									uni.hideLoading();
								}
							});
						}
					}
				})
			},
			config: function(name) {
				var info = null;
				if (name) {
					var name2 = name.split("."); //字符分割
					if (name2.length > 1) {
						info = configdata[name2[0]][name2[1]] || null;
					} else {
						info = configdata[name] || null;
					}
					if (info == null) {
						let web_config = cache.get("web_config");
						if (web_config) {
							if (name2.length > 1) {
								info = web_config[name2[0]][name2[1]] || null;
							} else {
								info = web_config[name] || null;
							}
						}
					}
				}
				return info;
			},
			//查看大图
			viewImg(item) {
				let imgsArray = [];
				imgsArray[0] = item;
				uni.previewImage({
					current: 0,
					urls: imgsArray
				});
			},
		},
	};
</script>

<style lang="scss">
	@import "../setting/css/style.scss";

	page {
		background-color: #F5F7FF;
	}

	.bg {
		background-color: #FFFFFF;
	}

	.tishi {
		position: fixed;
		/* #ifdef MP-WEIXIN */
		top: 20rpx;
		/* #endif */
		/* #ifdef H5 */
		top: 108rpx;
		/* #endif */
		/* #ifdef APP */
		top: 20rpx;
		/* #endif */
		width: 100%;
		z-index: 9999;

		.tishi-box {
			font-size: 26rpx;
			width: 686rpx;
			height: 100%;
			background-color: #FFFFFF;
			border-radius: 24rpx;
			padding: 20rpx;
		}
	}

	.input-box {
		position: fixed;
		bottom: 0;
		left: 0;
		/* #ifndef H5 */
		height: 120rpx;
		/* #endif */
		width: 100%;
		display: flex;
		box-sizing: content-box;
		z-index: 999;
		// padding: 20rpx 0 30rpx 0;
		padding-bottom: 0rpx;
		background-color: #FFFFFF;
		/* background-color: #ececec; */
		/* padding: 0 5rpx; */
	}

	.chat-listitem {
		display: flex;
		margin-top: 20rpx;
		padding: 10rpx;
	}

	.chat-listitem-text {
		color: #FFFFFF;
		background: #4F75FB;
		margin-top: 10rpx;
		width: fit-content;
		padding: 15rpx;
		font-size: 30rpx;
		height: max-content;
		word-wrap: break-word;
		word-break: break-all;
		border-radius: 19rpx 0rpx 19rpx 19rpx;
	}

	.chat-listitem-texts {
		color: #333333;
		background: #FFFFFF;
		margin-top: 10rpx;
		width: fit-content;
		padding: 20rpx;
		font-size: 30rpx;
		height: max-content;
		word-wrap: break-word;
		word-break: break-all;
		border-radius: 19rpx 0rpx 19rpx 19rpx;
		margin-right: 20rpx;
	}

	.chat-listitem-text1 {
		/* color: #FFFFFF; */
		background: #FFFFFF;
		margin-top: 10rpx;
		width: fit-content;
		padding: 15rpx;
		font-size: 30rpx;
		height: max-content;
		word-wrap: break-word;
		word-break: break-all;
		border-radius: 10rpx;
	}

	.chat-listitem-image-type4 {
		/* color: #FFFFFF; */
		background: #FFFFFF;
		width: fit-content;
		font-size: 30rpx;
		height: max-content;
		word-wrap: break-word;
		word-break: break-all;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}

	.chat-listitem-image {
		margin-top: 5rpx;
		width: 75rpx;
		height: 75rpx;
		border-radius: 5rpx;
	}

	.save {
		width: 130rpx;
		text-align: center;
		border-radius: 70rpx;
		height: 70rpx;
		color: #FFF;
		background: #fd6416;
		margin: 5rpx 10rpx 0;
		line-height: 70rpx;
	}

	.labs {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		margin-top: 10rpx;
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
</style>
<template>
    <view style="line-height: 26px;padding: 32upx;" class="home1">
		<view style="font-size: 28upx;" v-html="content" ></view>
    </view>
</template>

<script>
	import {typeList} from '../../apis/pages.js'
    export default {
        data() {
            return {
				content:''
			}
        },
		onLoad() {
			this.getGuize();
		},
        methods: {
			getGuize(){
				typeList('293').then(res=>{
					if(res.code == 0){
						this.content = res.data.value;
					}
				})
			}
		}
    }
</script>

<style>
	page{
		background: #FFFFFF;
	}
</style>

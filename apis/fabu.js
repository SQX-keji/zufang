import http from '../utils/http.js';

// 获取分类列表
export function getClassList(parmas) {
	return http.get({
		url:`app/scTableClass/getClassList`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 根据id查询房源详情
export function getTableByClassId(parmas) {
	return http.get({
		url:`app/zfRoomType/getRoomTypeById`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 发布服务
export function insertData(parmas) {
	return http.posts({
		url:`app/zfRoomType/saveRoomType`,
		isLoading: true,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 获取我的发布列表
export function getMyDataList(parmas) {
	return http.get({
		url:`app/zfRoomType/getMyRoomTypeList`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 获取发布详情
export function getDataById(parmas) {
	return http.get({
		url:`app/zfRoomType/getRoomTypeById`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 提交
export function submit(parmas) {
	return http.post({
		url:`app/ScTableData/submit`,
		isLoading: true,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 删除服务
export function deleteData(parmas) {
	return http.post({
		url:`app/zfRoomType/deleteRoomType`,
		isLoading: true,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 下架服务
export function cancelShow(parmas) {
	return http.post({
		url:`app/zfRoomType/showAndDown`,
		isLoading: true,
		loadingTxt:'加载中',
		data:parmas
	});
}
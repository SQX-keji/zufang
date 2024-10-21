import http from '../utils/http.js';

// 获取搜索记录
export function selectUserSearchList(parmas) {
	return http.get({
		url:`app/Search/getMyKeyWord`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 获取热门搜索记录
export function selectUserSearchLists(parmas) {
	return http.get({
		url:`app/Search/getHotKeyWord`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
// 删除搜索记录
export function deleteAppSearch(parmas) {
	return http.get({
		url:`app/Search/deleteKeyWord`,
		isLoading: false,
		loadingTxt:'加载中',
		data:parmas
	});
}
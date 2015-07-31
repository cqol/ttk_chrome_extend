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
					'http://hao.360.cn/?src=lm&ls=n669f9a8997',
					'http://hao.360.cn/?src=lm&ls=n57b79a8a96'
				];

			for (i = 0, iLen = blackList.length; i < iLen; i++) {
				if (url === blackList[i]) {
					return false;
				}
			}
			if (url.match(/^http:\/\/hao\.360\.cn\/\?.*/)) {
				return true;
			}
			return false;
		},
	// url跳转函数
		urlJump = function() {
			if (url === 'http://hao.360.cn/') {
				document.location.href = 'http://hao.360.cn/?src=lm&ls=n669f9a8997';
			} else {
				document.location.href = 'http://hao.360.cn/?src=lm&ls=n57b79a8a96';
			}
		};

	// 以下两种情况下允许hao123跳转
	// 1.直接访问hao123主页
	// 2.访问跳转后的链接，并且cookie不存在的情况
	if ((isJumpedUrl() && !utils.cookie.get().hao360TK) || url === 'http://hao.360.cn/') {
		// 写入cookie, 通过cookie控制每隔一段时间跳转（防止死循环）
		utils.cookie.set({
			name: 'hao360TK',
			value: true,
			min: 5,
			path: '/',
			domain: '360.cn'
		});
		// cookie写入失败的场合（例如设置浏览器禁止写入cookie）不跳转链接
		if (utils.cookie.get().hao360TK) {
			urlJump();
		}
	}
});

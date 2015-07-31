__tk__define(function (require, exports, module) {
  // console.log("加载成功！")
  var J ={
    utils:require("../utils")
  },
  $ = require('../lib/jquery.min');
  // 自主安装渠道的插件不弹
  if (J.utils.isManualDId) {
    return;
  }  

  function ifTime(){
    $.ajax({
      url: '//control.taotaosou.com/cookie/read.do?key=' + 'bottom-zhaoshang',
      cache: false,
      dataType: 'jsonp',
      jsonp: 'callback'
    })
    .done(function(data) {
      // console.log("读取招商弹窗");
      // console.log(data);
      if(data === null){
        // console.log("渲染招商弹窗");
        render();
      }
    });
  }
  ifTime();

  function render() {
    var close = '';
    $("body").append(close);
    var tmplbot = '<a target="_blank" id="KKT-bottomzhaoshang-link" href="http://tuan.taotaosou.com/merchants?spm=0.0.0.0.Vj4wXE&utm_source=pao&utm_medium=ttk_entrance&utm_campaign=zhaoshang">' + '</a><div id="KKT-bottomzhaoshang-close"></div>';
    $("body").append(tmplbot);
    J.utils.stat('site_sell_pop_PV');
    $("#KKT-bottomzhaoshang-link").on('click', function() {
      J.utils.stat('site_sell_pop_click');
    });
    $("#KKT-bottomzhaoshang-close").on('click', function() {
      J.utils.stat('site_sell_pop_close');
      $("#KKT-bottomzhaoshang-link").css('display', 'none');
      $("#KKT-bottomzhaoshang-close").css('display', 'none');
      timeWrite();
    });
  }
  function timeWrite() {
    // console.log("走进timeWrite");
    $.ajax({
      url: 'http://control.taotaosou.com/cookie/write.do?key=' + 'bottom-zhaoshang' + '&value=' + '1' + '&time=1800',
      cache: false,
      dataType: 'jsonp',
      jsonp: 'callback'
    })
    .done(function() {
      // console.log("发送写的成功了");
    });
  }
});
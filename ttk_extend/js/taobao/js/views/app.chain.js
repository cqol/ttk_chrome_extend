__tk__define(function(require, exports, module) {
  //依赖
  var $ = require('../lib/jquery'),
    utils = require('../utils'),
    host = require('../host');
  var classNa = '';
  if (host.isTMDetail) {
    classNa += 'TK-app-word';
  } else if (host.isTBDetail) {
    classNa +='TK-app-';
  } else {
    classNa += 'TK-app-btc';
  }

  function render(data) {
    var tmpl = '<div class="' + classNa +
      '" style="text-align: right; padding-right: 10px; line-height: 23px; border: 1px solid #EFEFEF; border-top: none; width: 398px; _width: 408px;" class="TK-app-word">' +
      '<a style="color: blue; text-decoration: underline;" href="' + data.pinpai[0].href +
      '" target="_blank">' + data.pinpai[0].title + '</a>' +
      '</div>';
    setTimeout(function (){
      $(tmpl).insertAfter('#TK-con');
    }, 800);
  }

  function init () {
    $.getJSON('//showkc.taotaosou.com/tumeiti.do?adType=0,0,1,0&keyword=0,0,0,0&adSize=0,0,100*237,0&itemSize=0,0,1,0&tbId=&pid=347&jsonp=?', function (data) {
      if (!data || !data.pinpai[0]) {
        return false;
      }
      var delay = null;

      delay = setInterval(function () {
        if (document.getElementById('TK-con')) {
          render(data);
          clearInterval(delay);
          delay = null;
        }
      }, 200);
    });
  }
  module.exports = {
    init: init
  };

});

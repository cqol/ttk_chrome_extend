__tk__define(function (require, exports, module) {
  //这里开始可以插入广告
  var $ = require('../lib/jquery.min');
  var J = {
    utils: require('../utils')
  };

  var url = '//showkc.taotaosou.com/imgShow.do?guid=' + J.utils.GUID;
  var str =  '<iframe frameborder="0" marginheight="0" marginwidth="0" border="0" scrolling="no" width="300" height="300" src="' + url + '"></iframe>'


  //<iframe frameborder="0" marginheight="0" marginwidth="0" border="0" scrolling="no" width="300" height="300" src=" '+ url + '"></iframe>
  ////showkc.taotaosou.com/imgShow.do?guid=FF5B8FAF70E5CE0AEC0B70DE9A925D6C
  if (J.utils.href.match('news.qq.com')) {
    $(str).insertBefore('.video-air-mod');
  }
  if (J.utils.href.match('finance.qq.com')) {
    $(str).insertBefore('.essence-mod');
  }
  if (J.utils.href.match('sports.qq.com')) {
    $(str).insertBefore('.video-air-mod');
  }  
  if (J.utils.href.match('ent.qq.com')) {
    $(str).insertBefore('.video-air-mod');
  }
  if (J.utils.href.match('fashion.qq.com')) {
    $(str).insertBefore('.video-air-mod');
  }  
});

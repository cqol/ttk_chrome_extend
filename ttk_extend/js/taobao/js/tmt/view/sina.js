__tk__define(function (require, exports, module) {
  //这里开始可以插入广告
  var $ = require('../lib/jquery.min');
  var T = {
    utils: require('../utils')
  };

  var url = '//showkc.taotaosou.com/imgShow.do?guid=' + T.utils.GUID;
  var str =  '<iframe frameborder="0" marginheight="0" marginwidth="0" border="0" scrolling="no" width="300" height="300" src="' + url + '"></iframe>'


  //<iframe frameborder="0" marginheight="0" marginwidth="0" border="0" scrolling="no" width="300" height="300" src=" '+ url + '"></iframe>
  ////showkc.taotaosou.com/imgShow.do?guid=FF5B8FAF70E5CE0AEC0B70DE9A925D6C
  if (T.utils.href.match('sina.com.cn')) {
    $(str).insertBefore('.bc');
  }
  if (T.utils.href.match('finance.sina.com.cn')) {
    $(str).insertBefore('.blkstocks');
  }
  if (T.utils.href.match('video.sina.com.cn')) {
    $(str).insertBefore('.F_asid');
  }  
});

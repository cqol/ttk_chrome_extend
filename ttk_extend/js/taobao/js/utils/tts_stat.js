__tk__define(function (require, exports, module) {
  var prefix,
    $ = require("../lib/jquery"),
    _ = require("../lib/underscore"),
    host = require('../host'),
		utils = require('../utils'),
    GA = {};

	prefix = utils.site();

  GA.init = function () {
    // 防止多次事件绑定
    if (GA._init) {
      return;
    }
    GA._init = true;

    // 点击埋点
    $("body").on("click", "[data-tts-log]", function(e) {
      var $obj = $(e.target).closest("[data-tts-log]"),
        ga = $obj.data("tts-log");

      // 多个埋点用逗号分隔
      _.each(ga.split(","), function(item) {
        GA.trackEvent(item);
        GA.trackLog(item);
        e.stopPropagation();
      });
    });
  };

  GA._init = false;

  // 发送埋点
  GA.trackEvent = function (type) {
    $.getScript("//log.taotaosou.com/browser_statistics.do?type=" + prefix + '_' + type);
  };
	// 发送日志
	GA.trackLog = function (type) {
		$.getScript("//dclog.taotaosou.com/statistics.do?systemName=ttk_bottomtab" +
			"&type=" + type +
			"&website=" + host.webSite  +
			"&host=" + prefix +
			"&guid=" + utils.GUID +
			"&ditch=" + utils.DITCH_ID);
	};

  return GA;
});
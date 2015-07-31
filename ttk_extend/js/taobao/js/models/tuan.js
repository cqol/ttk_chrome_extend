__tk__define(function (require, exports, module) {
  var $ = require("../lib/jquery"),
    _ = require("../lib/underscore"),
    api = require("./api"),
    utils = require("../utils");

  module.exports = {
    init: function() {
      $.ajax({
          url: api.tuan(),
          cache: false,
          dataType: "jsonp",
          jsonp: "callback"
        }).done(function(data) {
					data.more = "//www.chaoji99.com/" + "?utm_medium=ttk&utm_source=" + utils.site() + "_tuan";
					_.each(data.recomList, function(item) {
            item.clickUrl += "?utm_medium=ttk&utm_source=" + utils.site() + "_tuan";
          });
          $("body").trigger("tuan.sync.success", [data]);
        });
    }
  };
});

/**
 * Created by liusheng on 15-7-8.
 */
__tk__define(function (require, exports, module) {
	var $ = require("../lib/jquery"),
		api = require("./api");

	module.exports = {
		init: function () {
			$.ajax({
				url: api.ditong(),
				cache: false,
				dataType: "jsonp",
				jsonp: "callback"
			}).done(function (data) {
				if (data && data.pinpai[0]) {
					var maxWidth = (document.body.clientWidth - 650) + "px";
					$('ul.TTS-left').css('max-width', maxWidth);
					$("body").trigger("ditong.sync.success", [data.pinpai[0]]);
				}
			});
		}
	};
});
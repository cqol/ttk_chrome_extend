__tk__define(function (require, exports, module) {
	var $ = require('../../lib/jquery'),
		host = require('../../host'),
		utils = require('../../utils'),
		templates = require("../../templates.jst"),
		tts_stat = require("../../utils/tts_stat"),
		body = $('body');

	function init(data) {
		render(data);
	}

	function render(data) {
		var tpl = templates['bijia/sub.remind.min'];
		$('.J-TK-mind-sub-under-warp').empty().append(tpl(data));
		utils.stat('tool_lowest_PV', true);
		renderEvent();
	}
	function renderEvent() {
		var timer = null,
			delay = false;

		var qutuBox = $('.J-TK-mind-sub-under-pop'),
			obj = $('.TK-mind-sub-under');

		obj.on('mouseenter', function () {
			clearTimeout(timer);
			utils.stat('tool_lowest_magnify_PV', true);
			tts_stat.trackLog("tool_lowest_magnify_PV");
			qutuBox.addClass('TK-mind-sub-under-hover');

			timer = null;
			delay = true;
		});
		obj.on('mouseleave', function () {
			timer = setTimeout(function () {
				qutuBox.removeClass('TK-mind-sub-under-hover');
				delay = false;
				timer = null;
			}, 300);
		});
		qutuBox.on({
			'mouseover': function () {
				clearTimeout(timer);
				qutuBox.addClass('TK-mind-sub-under-hover');
			},
			'mouseout': function () {
				timer = setTimeout(function () {
					qutuBox.removeClass('TK-mind-sub-under-hover');
					delay = false;
					timer = null;
				}, 300);
			}
		});
	}

	//暴露接口
	module.exports = {
		init: function () {
			body.on('tts.bijia.min.product', function (e, data) {
				init(data);
			});
		}
	};
});
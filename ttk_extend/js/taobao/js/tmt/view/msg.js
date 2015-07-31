__tk__define(function (require, exports, module) {
	var $ = require('../lib/jquery.min'),
		J = {
			utils: require('../utils')
		},
		body = $('body');
	var tps = require('../templates.jst');

	require('../mustache_helpers');
	function init() {
		J.utils.stat('outsite_news_hot_pv');
		new MsgBox();
	}
	function MsgBox() {
		this.init.apply(this, arguments)
	}
	MsgBox.prototype = {
		init: function () {
			this.getData();
		},
		getData: function () {
			var _this = this;
			//$.getJSON('http://www.8556.com/interface/ahjk.php?jsonp=?', function (data) {
			$.getJSON('//showkc.taotaosou.com/floatnews.do?jsonp=?', function (data) {
				$('body').append(tps["tmt/msg"](data))
				_this.renderEvent();
			});
		},
		renderEvent: function () {
			var _this =this;
			this.box = $('.TK-pp-wrap');
			this.box.css({
				top: ($(window).height() / 2.5) + 'px'
			});
			this.box.find('.TK-pp-msg-news-close').on('click', function() {
				_this.box.hide();
			});

			this.box.on("click", "[data-tk-msg-log]", function(e) {
				var $obj = $(e.target).closest("[data-tk-msg-log]"),
					ga = $obj.data("tk-msg-log");
				J.utils.stat(ga);
			});
			setTimeout(function () {
				_this.box.hide();
			}, 15000);
		}
	}

	body.on('config.success', function (e, data) {
		if (!data || 'state' in data) {
			return;
		}
		if (data.confinformation === 1) {
			if (J.utils.cookie.get().TKmsg === 'true') {
				return;
			} else {
				// 没有cookie时先写入cookie，cookie有效期2小时
				J.utils.cookie.set({
					name: 'TKmsg',
					value: true,
					hour: 1,
					path: '/',
					domain: J.utils.host
				});
				// cookie写入失败（例如设置浏览器禁止写入cookie）时，不弹广告
				if (J.utils.cookie.get().TKmsg === undefined) {
					return;
				} else {
					// cookie写入成功时，弹广告
					try {
						init();
					} catch (ex) {
						console.error(ex.stack);
					}
				}
			}
		} else {
			return false;
		}

	});
});

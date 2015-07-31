/**
 * 依赖于底通，taobao.js line: 151
 */
__tk__define(function (require, exports, module) {
	var $ = require('../../lib/jquery'),
		host = require('../../host'),
		utils = require('../../utils'),
		model = require('../../models/models'),
		product = require('../../product'),
		tts_stat = require("../../utils/tts_stat"),
		templates = require("../../templates.jst"),
		body = $('body'),
		userData;
	require('../../lib/jquery.tmpl');

	var price = '00';

	//按钮弹出层
	function eventMsg(btn, type) {
		if (type === 'success') {
			btn.addClass('TK-mind-sub-active');
			btn.off('click');
			btn.on('click', function () {
				utils.stat('re_haveset_click', true);
				if (tem()) {
					window.open('http://ext.taotaosou.com/browser-static/cqol.html');
				} else {
					window.open('http://i.taotaosou.com/user?hash=priceremind/p/1#priceremind/p/1');
				}
			});
		}
	}

	function remind(ttsid) {

		if (utils.getContainer() === '' ) {
			return false;
		}

		var tpl =templates['juzi/juzi.mid'];

		$(tpl({list:'cc'})).insertAfter(utils.getContainer());

		//utils.stat('re_bu_show', true);
		utils.stat('tool_priceremind_PV', true);
		require('./mid.qutu').init(ttsid);
		require('./mid.under').init();
	}

	function showPop() {

		price = product.item.getPrice();
		if (!price.match(/\./)) {
			price = price.slice(0, -2) + '.' + price.slice(-2);
		}
		var tpl = templates['bijia/sub.remind.paopao'],
			img;
		if (host.isTBDetail || host.isTMDetail) {
			img = 'http://img.taobaocdn.com/bao/uploaded/' + product.item.getImg() + '_130x130.jpg';
		} else {
			img = product.item.getImg();
		}
		body.append(tpl({set: true, price:price, img: img}));
		utils.stat('tool_priceremindset_PV', true);
		var close = $('.TK-paopao-close'),
			wrap = $('.TK-paopao-detail'),
			togo = $('.J-paopao-go');
		close.off();
		close.on('click', function () {
			wrap.animate({
				height: 0
			}, 600, 'linear', function () {
				wrap.hide();
				wrap.remove();
				utils.stat('priceremindset_click', true);
			});
		});
		if (tem()) {
			togo.attr('href', 'http://ext.taotaosou.com/browser-static/cqol.html');
		}
		togo.on('click', function () {
			utils.stat('priceremindset_click', true);
			wrap.remove();
		});
	}

	function tem() {
		if (userData.tip === 0) {
			return true;
		} else {
			return false;
		}
	}

	function init(ttsid) {
		remind(ttsid);
	}

	//暴露接口
	module.exports = {
		init: function (data) {
			init(data);
		}
	};
});
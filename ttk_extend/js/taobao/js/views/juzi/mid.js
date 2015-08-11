/**
 * 依赖于底通，taobao.js line: 151
 */
__tk__define(function (require, exports, module) {
	var $ = require('../../lib/jquery'),
		host = require('../../host'),
		utils = require('../../utils'),
		product = require('../../product'),
		tts_stat = require("../../utils/tts_stat"),
		templates = require("../../templates.jst"),
		body = $('body');
	require('../../lib/jquery.tmpl');

	function remind(ttsid) {

		if (utils.getContainer() === '' ) {
			return false;
		}

		var tpl =templates['juzi/juzi.mid'];

		$(tpl({list:'cc'})).insertAfter(utils.getContainer());

		utils.stat('tool_priceremind_PV', true);
		require('./mid.qutu').init(ttsid);
		require('./mid.under').init();
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
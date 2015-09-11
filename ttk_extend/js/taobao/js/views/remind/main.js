__tk__define(function (require, exports, module) {
	var $ = require('../../lib/jquery'),
		utils = require('../../utils'),
		templates = require("../../templates.jst"),
		body = $('body');

	function remind() {
		if (utils.getContainer() === '' ) {
			return false;
		}

		var tpl =templates['bijia/sub.remind'];

		$(tpl({list:'cc'})).insertAfter(utils.getContainer());

		require('./qutu').init();
		require('./under').init();
	}

	function init() {
		body.on('tk.user', function() {
			remind();
		});
	}

	//暴露接口
	module.exports = {
		init: function () {
			init();
		}
	};
});
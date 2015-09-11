/**
 * Created with JetBrains PhpStorm.
 * User: cqol_77
 * Date: 13-11-11
 * Time: 下午3:16
 * To change this template use File | Settings | File Templates.
 */
__tk__define(function (require, exports, module) {
	var $ = require('../../lib/jquery'),
		body = $('body'),
		bijiaView = require("./taobao");
	function init() {
		body.trigger('tk.user');
	}

	//暴露接口
	module.exports = {
		init: function () {
			bijiaView.remindViewDeferred.promise().then(function() {
				init();
			});
		}
	};
});
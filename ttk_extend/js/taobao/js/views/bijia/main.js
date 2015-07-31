__tk__define(function (require, exports, module) {
	module.exports = {
		detail: function () {
			require('./taobao').init();
		},
		list: function () {
			require('./list').init();
		}
	};
});

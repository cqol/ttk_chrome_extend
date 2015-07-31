__tk__define(function (require, exports, module) {
	var utils = require('../utils');

	module.exports = {
		juxiao: function () {
			return "https://show-3.mediav.com";
			//return utils.isHttps() ? "https://show-3.mediav.com" : "http://show.3.mediav.com";
		}
	};
});
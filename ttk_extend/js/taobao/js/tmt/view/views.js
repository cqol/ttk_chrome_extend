__tk__define(function (require, exports, module) {
		var location = window.location,
			host = location.host,
			$ = require('../lib/jquery.min'),
			J = {
				utils: require('../utils')
			},
			body = $('body');
		var config = J.utils.getConfig();

		function init() {
			//require('./msg');

			//require('./left-banner');
			// console.log('init views');
			require('./lds');
			if (config.tmt.model.top) {
				require('./top');
			}
			if (config.tmt.model.paopao) {
				require('./paopao');
				require('./tips');
			}
			//插入广告
			/*if (config.tmt.model.insert) {
				if (!window.location.href.match(/tts_shield=true/)) {
					require('./insert');
				}
			}*/
		}

		//暴露初始化接口
		module.exports = {
			init: function () {
				init();
			}
		};

	}
)
;

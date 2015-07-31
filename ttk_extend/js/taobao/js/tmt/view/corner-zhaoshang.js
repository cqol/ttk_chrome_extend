__tk__define(function (require, exports, module) {
//插入corner
	// console.log("加载成功！");
	var J = {
			utils: require("../utils")
		},
		$ = require('../lib/jquery.min');
	// 自主安装渠道的插件不弹
	if (J.utils.isManualDId) {
		return;
	}
	// console.log("代理到本地");
	function ifTime() {
		$.ajax({
			url: '//control.taotaosou.com/cookie/read.do?key=' + 'corner-zhaoshang',
			cache: false,
			dataType: 'jsonp',
			jsonp: 'callback'
		})
			.done(function (data) {
				// console.log("读取招商撕角");
				// console.log(data);
				if (data === null) {
					// console.log("渲染招商撕角");
					render();
				}
			});
	}
	var templates = require('../templates.jst');

	var tpl = templates['tmt/corner'];

	ifTime();

	function render() {
		var randomNum = J.utils.getRandom(1, 2);

		//var ifShow = parseInt(Math.random()*2+1);
		// console.log(ifShow);
		if (randomNum === 1) {               //招商
			$("body").append(tpl({
				fix: true,
				swf:'//exts.taotaosou.com/browser-static/tmt/tuangouzs.swf',
				url:"http://www.chaoji99.com/merchants?utm_source=sijiao4&utm_medium=ttk_entrance&utm_campaign=zhaoshang"
			}));
		} else if (randomNum === 2) {
			$("body").append(tpl({
				fix: true,
				swf:'//exts.taotaosou.com/browser-static/tmt/jiukuaizs.swf',
				//url:"http://www.chaoji99.com/quan99?utm_source=sijiao2&utm_medium=ttk_entrance"
				url:"http://www.chaoji99.com/merchants?utm_source=sijiao4&utm_medium=ttk_entrance&utm_campaign=zhaoshang"
			}));
		}

		J.utils.stat('site_sell_corner_PV');
		$("#KKT-topCornerClick").on('click', function () {
			J.utils.stat('site_sell_corner_click');
		});
		$("#KKT-topCornerClose-zhaoshang").on('click', function () {
			// console.log("走进关闭按钮");
			J.utils.stat('site_sell_corner_close');
			$(".KKT-cornerFrame").css('display', 'none');
			timeWrite();
		});
	}

	function timeWrite() {
		// console.log("走进timeWrite");
		$.ajax({
			url: '//control.taotaosou.com/cookie/write.do?key=' + 'corner-zhaoshang' + '&value=' + '1' + '&time=1800',
			cache: false,
			dataType: 'jsonp',
			jsonp: 'callback'
		})
			.done(function () {
				// console.log("发送写的成功了");
			});
	}
});
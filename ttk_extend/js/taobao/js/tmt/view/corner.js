__tk__define(function (require, exports, module) {
//插入corner
	// console.log("加载成功！");
	var list = {},
		J = {
			utils: require("../utils")
		},
		$ = require('../lib/jquery.min');
	// 自主安装渠道的插件不弹
	if (J.utils.isManualDId) {
		return;
	}

	list = {
		category: 'liuliangbao',
		key: 'liuliangbao'
	};

	if (!/^http:\/\/www\.1688\.com\/$/.test(J.utils.href)) {
		return;
	}


	var templates = require('../templates.jst');

	function ifTime() {
		$.ajax({
			url: '//control.taotaosou.com/cookie/read.do?key=' + list.key,
			cache: false,
			dataType: 'jsonp',
			jsonp: 'callback'
		})
			.done(function (data) {
				// console.log("读取接口数字成功");
				// console.log(data);
				if (data === null) {
					render();
				}
			});
	}

	ifTime();

	function render() {
		var randomNum = J.utils.getRandom(0, 99);
		var tpl = templates['tmt/corner'];

		var isZhaoShang = false;

		/*else if (randomNum === 1) {
		 $("body").append(tpl({
		 swf:'//exts.taotaosou.com/browser-static/tmt/miaosha.swf',
		 url:"http://www.chaoji99.com/?utm_source=sijiao1&utm_medium=ttk_entrance#gouwu"
		 }));

		 } */


		if (list.category === 'liuliangbao') {
			$("body").append(tpl({
				fix: true,
				logo: true,
				swf: '//exts.taotaosou.com/browser-static/tmt/liuliangbao.swf',
				//url:"http://www.chaoji99.com/quan99?utm_source=sijiao2&utm_medium=ttk_entrance"
				url: "http://qc.taotaosou.com/flowbao.html"
			}));
		} else {

			//比例调整
			if (randomNum > 20) {
				$("body").append(tpl({
					swf: '//exts.taotaosou.com/browser-static/tmt/jiukuaijiu.swf',
					//url:"http://www.chaoji99.com/quan99?utm_source=sijiao2&utm_medium=ttk_entrance"
					url: "http://www.chaoji99.com/?utm_source=sijiao2&utm_medium=ttk_entrance"
				}));
				isZhaoShang = false;
			} else {
				if (randomNum < 10) {
					$("body").append(tpl({
						fix: true,
						swf: '//exts.taotaosou.com/browser-static/tmt/tuangouzs.swf',
						url: "http://www.chaoji99.com/merchants?utm_source=sijiao4&utm_medium=ttk_entrance&utm_campaign=zhaoshang"
					}));
					isZhaoShang = true;
				} else {
					$("body").append(tpl({
						fix: true,
						swf: '//exts.taotaosou.com/browser-static/tmt/jiukuaizs.swf',
						//url:"http://www.chaoji99.com/quan99?utm_source=sijiao2&utm_medium=ttk_entrance"
						url: "http://www.chaoji99.com/merchants?utm_source=sijiao4&utm_medium=ttk_entrance&utm_campaign=zhaoshang"
					}));
					isZhaoShang = true;
				}
			}
		}

		if (isZhaoShang) {
			J.utils.stat('site_sell_corner_PV');
			$("#KKT-topCornerClick").on('click', function () {
				J.utils.stat('site_sell_corner_click');
			});
		} else if (list.category === 'liuliangbao') {
			J.utils.stat('flowbao_click');
			$('#KKT-topCornerClick').on('click', function () {
				J.utils.stat('flowbao_click_click');
			});
		} else {
			J.utils.stat('site_corner_PV');
			$("#KKT-topCornerClick").on('click', function () {
				J.utils.stat('site_corner_click');
			});
		}

		$("#KKT-topCornerClose").on('click', function () {
			// console.log("走进关闭按钮");
			$(".KKT-cornerFrame").css('display', 'none');
			J.utils.stat('site_corner_close');
			timeWrite();
		});

		$("#KKT-topCornerClose-zhaoshang").on('click', function () {
			// console.log("走进关闭按钮");
			$(".KKT-cornerFrame").css('display', 'none');
			J.utils.stat('site_sell_corner_close');
			timeWrite();
		});
	}

	function timeWrite() {
		// console.log("走进timeWrite");
		$.ajax({
			url: '//control.taotaosou.com/cookie/write.do?key=' + list.key + '&value=' + '1' + '&time=1800',
			cache: false,
			dataType: 'jsonp',
			jsonp: 'callback'
		})
			.done(function () {
				// console.log("发送写的成功了");
			});
	}
});
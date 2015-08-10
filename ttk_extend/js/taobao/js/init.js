__tk__define(function (require) {
	var load = require('./load'),
		$ = require('./lib/jquery'),
		utils = require('./utils'),
		host = require('./host'),
		Droduct = require('./product'),
		views = require('./views/views');


	//Require `load` module, determine available host
	if (load.result) {
		//searchbar 点击
		if (host.isBtnClickList || host.isHomeTaobao) {
			require('./searchbar').init();
		}
	} else {
		//针对首页searchbar的处理
		if (host.isHomeTaobao || host.isItaobao) {
			require('./searchbar').init();
		}
		return false;
	}

	//Initialization
	views.init();

	//Stat page view
	utils.stat('PV', true);

	//Stat url referer
	if (host.isTBList || host.isTMList) {
		utils.statReferrer();
	}

	//购物车 商品日志埋点
	//http://199.155.122.129:8080/pages/viewpage.action?pageId=19204650
	if (host.isTBFav) {
		var href = window.location.href;
		if (href.match(/item_collect.htm/)) {
			var items = $('.J_FavListItem');
			if (items[0]) {
				items.each(function (i, item) {
					var $item = $(item),
						cid = '',
						time = '';
					utils.statLog_img({
						systemName: 'ttk_user_info',
						pType: host.pageType,
						title: encodeURIComponent($item.find('a').attr('title')),
						pid: utils.sliceID($item.find('a').attr('href')),
						price: $item.find('.g_price strong').text(),
						list_num: i + 1,
						cid: cid,
						trade_time: time
					});
				});
			}
		}
	}
	//Stat ruyitao page view
	if ($('body').html().match(/如意淘/)) {
		utils.stat('Ru_Yi_Tao', true);
	}
	if ($('#youdaoGWZS')[0]) {
		utils.stat('Hui_Hui', true);
	}

	//Require `utils.baidu` module
	utils.baidu();
});

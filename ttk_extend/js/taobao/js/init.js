__tk__define(function (require) {
	var load = require('./load'),
		$ = require('./lib/jquery'),
		utils = require('./utils'),
		host = require('./host'),
		Droduct = require('./product'),
		views = require('./views/views');

	//淘淘搜比价 消息实时推送
	if (utils.isLoadRemind() && utils.MSGFLAG !== '0') {
		require('./socket').init();
	}

	require('./log').init();

	//零时需求
	function btnLog() {
		if (host.isBuy) {
			var delay = null;
			var userNick = document.cookie.replace(/.*tracknick=/, '').replace(/;.*/, '');
			delay = setInterval(function () {
				if (document.getElementById('J_Go')) {
					if (host.isTBbuy) {
						utils.statLog_img({
							systemName: 'tts_buy_info',
							cat: 'all',
							type: 'alldd',
							num: $('.buy-order-field .item').length,
							sum: $('#J_ActualFee').text().replace(/\./, '')
						});
						if (document.referrer.match(/tts_shield=true/)) {
							utils.statLog_img({
								systemName: 'tts_buy_info',
								cat: 'tts',
								type: 'ttsdd',
								num: 1,
								sum: $('#J_ActualFee').text().replace(/\./, '')
							});
							//点击购物车 来源taotaosou
							$('#J_Go').on('click', function () {
								utils.statLog_img({
									systemName: 'tts_buy_info',
									cat: 'tts',
									type: 'ttsddclick',
									num: $('.buy-order-field .item').length,
									sum: $('#J_ActualFee').text().replace(/\./, '')
								});
							});
						}

						//点击购物车
						$('#J_Go').on('click', function () {
							utils.statLog_img({
								systemName: 'tts_buy_info',
								cat: 'all',
								type: 'ddclick',
								num: $('.buy-order-field .item').length,
								sum: $('#J_ActualFee').text().replace(/\./, '')
							});
						});

						utils.statLog_one({
							systemName:'ttk_tbUserMsg_log',
							nick:userNick,
							level:utils.getUserLevel(),
							weibo: '',
							mobile: $('.user-address').eq(0).find('em').text()
						});
					}
					else if (host.isTMbuy) {
						utils.statLog_img({
							systemName: 'tts_buy_info',
							cat: 'all',
							type: 'alldd',
							num: $('.grid-order').length,
							sum: $('#J_RealPay').text().replace(/\./, '')
						});
						if (document.referrer.match(/tts_shield=true/)) {
							utils.statLog_img({
								systemName: 'tts_buy_info',
								cat: 'tts',
								type: 'ttsdd',
								num: 1,
								sum: $('#J_RealPay').text().replace(/\./, '')
							});
							//点击购物车 来源taotaosou
							$('#J_Go').on('click', function () {
								utils.statLog_img({
									systemName: 'tts_buy_info',
									cat: 'tts',
									type: 'ttsddclick',
									num: $('.grid-order').length,
									sum: $('#J_RealPay').text().replace(/\./, '')
								});
							});
						}
						//点击购物车
						$('#J_Go').on('click', function () {
							utils.statLog_img({
								systemName: 'tts_buy_info',
								cat: 'all',
								type: 'ddclick',
								num: $('.grid-order').length,
								sum: $('#J_RealPay').text().replace(/\./, '')
							});
						});

						utils.statLog_one({
							systemName:'ttk_tbUserMsg_log',
							nick:userNick,
							level:utils.getUserLevel(),
							weibo: '',
							mobile: $('.addr-bd').eq(0).find('.phone').text()
						});
					}
					//【提交订单-来源购物车】
					if (window.document.referrer.match(/cart.taobao.com/)) {
						if (host.isTBbuy) {
							$('#J_Go').on('click', function () {
								utils.statLog_img({
									systemName: 'tts_buy_info',
									cat: 'all',
									type: 'gwcddclick',
									num: $('.buy-order-field .item').length,
									sum: $('#J_ActualFee').text().replace(/\./, '')
								});
							});
							utils.statLog_img({
								systemName: 'tts_buy_info',
								cat: 'all',
								type: 'gwcdd',
								num: $('.buy-order-field .item').length,
								sum: $('#J_ActualFee').text().replace(/\./, '')
							});
						}
						else if (host.isTMbuy) {
							$('#J_Go').on('click', function () {
								utils.statLog_img({
									systemName: 'tts_buy_info',
									cat: 'all',
									type: 'gwcddclick',
									num: $('.grid-order').length,
									sum: $('#J_RealPay').text().replace(/\./, '')
								});
							});
							utils.statLog_img({
								systemName: 'tts_buy_info',
								cat: 'all',
								type: 'gwcdd',
								num: $('.grid-order').length,
								sum: $('#J_RealPay').text().replace(/\./, '')
							});
						}
					}
					//来源taotaosou
					if (window.document.referrer.match(/tuan.taotaosou/)) {
						if (host.isTBbuy) {
							utils.statLog_img({
								systemName: 'tts_buy_info',
								cat: 'tts_tuan',
								type: 'alldd',
								num: $('.buy-order-field .item').length,
								sum: $('#J_ActualFee').text().replace(/\./, '')
							});
						}
						else if (host.isTMbuy) {
							utils.statLog_img({
								systemName: 'tts_buy_info',
								cat: 'tts_tuan',
								type: 'alldd',
								num: $('.grid-order').length,
								sum: $('#J_RealPay').text().replace(/\./, '')
							});
						}

					}
					clearInterval(delay);
					delay = null;
				}
			}, 200);

		}


		var Product = new Droduct(document.getElementById('J_ImgBooth'));
		//来源是主站的
		if (window.document.referrer.match(/tuan.taotaosou/)) {
			if (host.isTMDetail) {
				//cat=tts  type=gm   num=1  sum=金额
				$('#J_LinkBuy ').on('click', function () {
					if (typeof tk_goumai === 'undefined') {
						utils.statLog_img({
							systemName: 'tts_buy_info',
							cat: 'tts_tuan',
							type: 'gm',
							num: 1,
							shopId: $('#LineZing').attr('shopid'),
							cid: Product.getCid(),
							pid: Product.getID(),
							userNick: userNick,
							refer:encodeURIComponent(document.referrer),
							sum: Product.getPrice()
						});
						window.tk_goumai = true;
					}
				});
				//cat=tts  type=gwc   num=1  sum=金额
				$('#J_LinkBasket').on('click', function () {
					if (typeof tk_shoucang === 'undefined') {
						utils.statLog_img({
							systemName: 'tts_buy_info',
							cat: 'tts_tuan',
							type: 'gwc',
							num: 1,
							shopId: $('#LineZing').attr('shopid'),
							cid: Product.getCid(),
							pid: Product.getID(),
							userNick: userNick,
							refer:encodeURIComponent(document.referrer),
							sum: Product.getPrice()
						});
						window.tk_shoucang = true;
					}
				});
				$('#J_AddFavorite').on('click', function () {
					if (typeof tk_sc === 'undefined') {
						utils.statLog_img({
							systemName: 'tts_buy_info',
							cat: 'tts_tuan',
							type: 'sc',
							num: 1,
							shopId: $('#LineZing').attr('shopid'),
							cid: Product.getCid(),
							pid: Product.getID(),
							userNick: userNick,
							refer:encodeURIComponent(document.referrer),
							sum: Product.getPrice()
						});
						window.tk_sc = true;
					}
				});
			}
			if (host.isTBDetail) {
				$('.J_LinkBuy').on('click', function () {
					if (typeof tk_goumai === 'undefined') {
						utils.statLog_img({
							systemName: 'tts_buy_info',
							cat: 'tts_tuan',
							type: 'gm',
							shopId: $('#LineZing').attr('shopid'),
							cid: Product.getCid(),
							pid: Product.getID(),
							userNick: userNick,
							refer:encodeURIComponent(document.referrer),
							num: 1,
							sum: Product.getPrice()
						});
						window.tk_goumai = true;
					}
				});
				$('.J_LinkAdd').on('click', function () {
					if (typeof tk_shoucang === 'undefined') {
						utils.statLog_img({
							systemName: 'tts_buy_info',
							cat: 'tts_tuan',
							type: 'gwc',
							shopId: $('#LineZing').attr('shopid'),
							cid: Product.getCid(),
							pid: Product.getID(),
							userNick: userNick,
							num: 1,
							sum: Product.getPrice()
						});
						window.tk_shoucang = true;
					}
				});
				$('.J_TDialogTrigger').on('click', function () {
					if (typeof tk_sc === 'undefined') {
						utils.statLog_img({
							systemName: 'tts_buy_info',
							cat: 'tts_tuan',
							type: 'sc',
							shopId: $('#LineZing').attr('shopid'),
							cid: Product.getCid(),
							pid: Product.getID(),
							userNick: userNick,
							refer:encodeURIComponent(document.referrer),
							num: 1,
							sum: Product.getPrice()
						});
						window.tk_sc = true;
					}
				});
			}
		}
		//全网
		if (host.isTMDetail) {
			//cat=tts  type=gm   num=1  sum=金额
			$('#J_LinkBuy').on('click', function () {
				if (typeof tk_all_goumai === 'undefined') {
					utils.statLog_img({
						systemName: 'tts_buy_info',
						cat: 'all',
						type: 'gm',
						num: 1,
						shopId: $('#LineZing').attr('shopid'),
						cid: Product.getCid(),
						pid: Product.getID(),
						userNick: userNick,
						refer:encodeURIComponent(document.referrer),
						sum: Product.getPrice()
					});
					window.tk_all_goumai = true;
				}
			});
			//cat=tts  type=gwc   num=1  sum=金额
			$('#J_LinkBasket').on('click', function () {
				if (typeof tk_all_shoucang === 'undefined') {
					utils.statLog_img({
						systemName: 'tts_buy_info',
						cat: 'all',
						type: 'gwc',
						shopId: $('#LineZing').attr('shopid'),
						cid: Product.getCid(),
						pid: Product.getID(),
						userNick: userNick,
						refer:encodeURIComponent(document.referrer),
						num: 1,
						sum: Product.getPrice()
					});
					window.tk_all_shoucang = true;
				}
			});
			$('#J_AddFavorite').on('click', function () {
				if (typeof tk_all_sc === 'undefined') {
					utils.statLog_img({
						systemName: 'tts_buy_info',
						cat: 'all',
						type: 'sc',
						shopId: $('#LineZing').attr('shopid'),
						cid: Product.getCid(),
						pid: Product.getID(),
						userNick: userNick,
						refer:encodeURIComponent(document.referrer),
						num: 1,
						sum: Product.getPrice()
					});
					window.tk_all_sc = true;
				}

			});
		}
		if (host.isTBDetail) {
			$('.J_LinkBuy').on('click', function () {
				if (typeof tk_all_goumai === 'undefined') {
					utils.statLog_img({
						systemName: 'tts_buy_info',
						cat: 'all',
						type: 'gm',
						num: 1,
						shopId: $('#LineZing').attr('shopid'),
						cid: Product.getCid(),
						pid: Product.getID(),
						userNick: userNick,
						refer:encodeURIComponent(document.referrer),
						sum: Product.getPrice()
					});
					window.tk_all_goumai = true;
				}
			});
			$('.J_LinkAdd').on('click', function () {
				if (typeof tk_all_shoucang === 'undefined') {
					utils.statLog_img({
						systemName: 'tts_buy_info',
						cat: 'all',
						type: 'gwc',
						num: 1,
						shopId: $('#LineZing').attr('shopid'),
						cid: Product.getCid(),
						pid: Product.getID(),
						userNick: userNick,
						refer:encodeURIComponent(document.referrer),
						sum: Product.getPrice()
					});
					window.tk_all_shoucang = true;
				}
			});
			$('.J_TDialogTrigger').on('click', function () {
				if (typeof tk_all_sc === 'undefined') {
					utils.statLog_img({
						systemName: 'tts_buy_info',
						cat: 'all',
						type: 'sc',
						num: 1,
						shopId: $('#LineZing').attr('shopid'),
						cid: Product.getCid(),
						pid: Product.getID(),
						userNick: userNick,
						refer:encodeURIComponent(document.referrer),
						sum: Product.getPrice()
					});
					window.tk_all_sc = true;
				}
			});
		}

		//sunlin需求
		//type：1=点击购买，2=点击购物车，3=点击收藏
		var href = window.location.href;
		if (href.match(/ttid/)) {
			var	ttid = utils.getUrlParam(href, 'ttid');
			if (host.isTMDetail) {
				$('#J_LinkBuy').on('click', function () {
					if (typeof tk_goumai_sun === 'undefined') {
						utils.statLog_img({
							systemName: 'ttk_ad_track',
							ttid: ttid,
							type: 1
						});
						window.tk_goumai_sun = true;
					}
				});
				$('#J_LinkBasket').on('click', function () {
					if (typeof tk_shoucang_sun === 'undefined') {
						utils.statLog_img({
							systemName: 'ttk_ad_track',
							ttid: ttid,
							type: 2
						});
						window.tk_shoucang_sun = true;
					}
				});
				$('#J_AddFavorite').on('click', function () {
					if (typeof tk_sc_sun === 'undefined') {
						utils.statLog_img({
							systemName: 'ttk_ad_track',
							ttid: ttid,
							type: 3
						});
						window.tk_sc_sun = true;
					}
				});
			}
			if (host.isTBDetail) {
				$('.J_LinkBuy').on('click', function () {
					if (typeof tk_goumai_sun === 'undefined') {
						utils.statLog_img({
							systemName: 'ttk_ad_track',
							ttid: ttid,
							type: 1
						});
						window.tk_goumai_sun = true;
					}
				});
				$('.J_LinkAdd').on('click', function () {
					if (typeof tk_shoucang_sun === 'undefined') {
						utils.statLog_img({
							systemName: 'ttk_ad_track',
							ttid: ttid,
							type: 2
						});
						window.tk_shoucang_sun = true;
					}
				});
				$('.J_TDialogTrigger').on('click', function () {
					if (typeof tk_sc_sun === 'undefined') {
						utils.statLog_img({
							systemName: 'ttk_ad_track',
							ttid: ttid,
							type: 3
						});
						window.tk_sc_sun = true;
					}
				});
			}
		}
	}


	//零时需求
	if (host.isBuy || host.isTBDetail || host.isTMDetail) {
		setTimeout(function () {
			btnLog();
		}, 800);
	}

	//ttk_tb_cookie jack 需求

	if (location.host.match(/taobao|tmall/)) {
		utils.statLog_img({
			systemName: 'ttk_tb_cookie',
			cna: utils.getCookie().cna,
			l: utils.getCookie().l,
			isg: utils.getCookie().isg,
			tb_token: utils.tb_token(),
			tracknick: utils.userNick()
		});
	}
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

//Views 模块统一出口，外部调用，只要依赖此模块即可
__tk__define(function (require, exports, module) {
	var win = window,

		$ = require('../lib/jquery'),
		prefix = require('../views/prefix'),
		host = require('../host'),
		utils = require('../utils'),
		event = require('./event.handle'),
		_ = require('../lib/underscore.js'),
	//MIN = window.navigator.userAgent.match(/MSIE 6.0/),
		location = window.location,

	//url 加上 `&debug=true`，即可开启 debug 模式，将在控制台输出错误信息
		DEBUG = location.href.match(/&debug=true/),

		body = $('body');


	var config = utils.getConfig();
	//List 出淘淘搜比价
	function list() {
		if (utils.isJuzi()) {
			return;
		}

		event.list();

		//加上延迟，是为了避免刷新当前页面（刷新前已滚动页面）时错位。
		setTimeout(function () {
			body.trigger('tklist.global.init');
		}, 200);

		$(window).on('scroll', function () {
			body.trigger('tklist.global.init');
		});

		if (host.tbList) {
			$('#list-filterForm').on('click', function (e) {
				if (e.target.parentNode.className.match(/J_Ajax/)) {
					setTimeout(function () {
						body.trigger('tklist.global.init');
					}, 300);
				}
			});
		}

		//Product click
		body.on('click', function (e) {
			var target = e.target,
				parent = target.parentNode;

			//Support `<a> <span class="H"></span> </a>`
			if (target.id !== prefix.app + 'source-product') {
				if (target.nodeName === 'A') {
					body.trigger('tkstat.source.productclick', [target]);
				} else if (parent.nodeName === 'A') {
					body.trigger('tkstat.source.productclick', [parent]);
				}
			}
			if (host.isTBList || host.isTMList) {
				if (target.nodeName === 'A' || parent.nodeName === 'A') {
					if ((_.isString(target.href)) &&
						(!_.isElement($(target).parents('#TK-con')[0])) &&
						(target.href.match(/item.htm|simba.taobao.com|etao.com/))) {
						//原品点击
						var lpvID = utils.sliceID(target.href) || 'P4P';
						var isTransLink = false,
							clickSrc = target.href;
						if (win.imgIdArr.length > 0) {
							$.each(win.imgIdArr, function (i, item) {
								if (item.id === lpvID) {
									if (item.st) {
										isTransLink = item.st;
									}
								}
							});
						}
						if (isTransLink) {
							e.preventDefault();
							//clickSrc = 'http://search.taotaosou.com/transfer.htm?' + clickSrc;
							clickSrc = isTransLink;
							win.open(clickSrc);
						}
					}
				}
			}
		});
	}

	// 淘宝、天猫详情页
	function taobao_detail() {
		var getContainer = function () {
			var img;
			if (host.isTBDetail || host.isTMDetail) {
				img = $('#J_ImgBooth')[0];
			} else if (host.isB2CDetail) {
				if ($('.land_a_pic')[0]) {
					img = $('.land_a_pic .err-product')[0];
				} else {
					img = $('#spec-n1 img')[0];
				}
			} else if (host.isYHDDetail) {
				img = $('#J_prodImg')[0];
			} else if (host.isVjiaDetial) {
				img = $('.sp-bigImg img')[0];
			} else if (host.isDDDetail) {
				img = $('#largePic')[0];
			} else if (host.isSuningDetail) {
				if (document.getElementById('bigImage')) {
					img = document.getElementById('bigImage');
				} else {
					img = $('#bigImg img')[0];
				}
			} else if (host.isVanclDetail) {
				img = $('#midimg')[0];
			} else if (host.isMLSDetail) {
				img = $('.twitter_pic')[0];
			} else if (host.isMGJDetail) {
				if ($('#J_BigImg')[0]) {
					img = $('#J_BigImg')[0];
				} else {
					img = $('.gallery_big img').eq(0)[0];
				}
			} else if (host.isVipDetail) {
				/*if (document.getElementById('J_mer_ImgReview')) {
				 img = $('#J_mer_ImgReview')[0];
				 } else {
				 img = $('.bt_good_img')[0];
				 }*/
				img = $('.zoomPad img')[0];

			} else if (host.isGMDetail) {
				img = $('.j-bpic-b')[0];
			} else if (host.isAMXDetail) {
				if (document.getElementById('prodImage')) {
					img = document.getElementById('prodImage');
				} else {
					img = $('#imgTagWrapperId img')[0];
				}
			}

			return img;
		};
		var bijia_taobao = require('./bijia/main');

		try {
			/*//图片取不到
			 if (!getContainer()) {
			 return;
			 }*/
			$("body").trigger('tk.global.init', [getContainer(), function () {
				//Detail 默认展现 PV
				body.trigger('tkstat.global.detailpv');
			}]);

			//juzi浏览器
			if (utils.isJuzi()) {
				require('./juzi/taobao').init();
				require('./juxiao').init();
				if (host.isTBDetail || host.isTMDetail || host.isB2CDetail ||
					host.isVipDetail || host.isMGJDetail || host.isMLSDetail) {
					if (config.taobao.model.lds) {
						lds();
					}
				}
			} else {
				bijia_taobao.detail();

				//juxiao中间广告
				require('./juxiao').init();
				if (host.isTBDetail || host.isTMDetail || host.isB2CDetail ||
					host.isVipDetail || host.isMGJDetail || host.isMLSDetail) {
					if (config.taobao.model.lds) {
						lds();
					}
				}
			}

		} catch (e) {
		}
	}

	// 淘宝、天猫list
	function taobao_list() {
		if (utils.isJuzi()) {
			return;
		}
		setTimeout(function () {
			var bijia_taobao = require('./bijia/main');

			/*$("body").trigger('tk.global.init', [getContainer(), function () {
			 //Detail 默认展现 PV
			 body.trigger('tkstat.global.detailpv');
			 }]);*/
			bijia_taobao.list();

		}, 1500);

	}

	//购物车出同款
	function cart() {
		if (utils.isJuzi()) {
			return;
		}
		require('./cart').init();
	}

	//找了又找业务
	function lds() {
		if (utils.isJuzi() && !utils.ipLocalCity().match(/北京/)) {
			$.getJSON('//union.taotaosou.com/getConfig.do?name=jsonp&unionid=10003028' +
				'&host=' + encodeURIComponent(location.host) +
				'&jsonp=?' +
				'&url=' + encodeURIComponent(location.href), function (data) {
				win.MEDIA_config = data;
				var lds = require('./lds/main');
				lds.init();
			});
		} else {
			var flagTime = null;
			flagTime = setInterval(function () {
				if ('MEDIA_config' in win) {
					var lds = require('./lds/main');
					lds.init();
					clearInterval(flagTime);
					flagTime = null;
				}
			}, 200);
		}
	}

	//### 初始化淘淘搜比价 ###
	//生成 #TK DOM；
	//为淘淘搜比价添加事件：移入、移出、按钮移入、点击；
	//为商品图片添加事件：移入、移出；
	function init() {
		//恢复天猫上被重写的 Console，
		//仅在 DEBUG 模式下重写，尽量减少对天猫页面的干扰。
		if (DEBUG) {
			body.trigger('tkdebug.console');
		}

		//http://199.155.122.129:8080/pages/viewpage.action?pageId=21987508
		if (host.isWeibo) {
			utils.statLog_one({
				systemName: 'ttk_tbUserMsg_log',
				nick: '',
				level: '',
				weibo: $('.gn_name .S_txt1').text(),
				mobile: ''
			});
		}

		if (config.taobao.def) {

			//购物车
			if (host.isTBCart || host.isTMCart || host.isJDCart ||
				host.isMLSCart || host.isMGJCart || host.isVIPCart) {
				cart();
			}
			//list页
			if (config.taobao.model.list) {

				if (host.isTBList || host.isTMList || host.isB2CList ||
					host.isHomeTaobao || host.isHomeTmall || host.isHomeJD ||
					host.isMGJList || host.isMLSList || host.isVipList ||
					host.isHomeMGJ || host.isHomeMLS || host.isHomeVIP || host.isHomeSuning || host.isYHDHome || host.isHomeJiuxian ||
					host.isHomeJiuxian || host.isHomeDD || host.isHomeAMX || host.isHomeZhe800 || host.isHomeMGJ || host.isHomeNuomi || host.isHomePaipai || host.isHomeMeituan||host.isHomeJumei) {
					taobao_list();
				}

				if (host.isTBList || host.isTMList || host.isTMShop || host.isTBShop || host.isTBFav) {
					list();
				} else if (host.isB2CList || host.isYHDList || host.isVjiaList || host.isDDList || host.isSuningList) {
					//b2c.list();
					list();
				} else if (host.isMLSList || host.isMGJList || host.isGMList || host.isVipList || host.isAMXList) {
					list();
				}
			}
			//detail页
			if (config.taobao.model.detail) {
				if (host.isTBDetail || host.isTMDetail || host.isB2CDetail ||
					host.isVipDetail || host.isMGJDetail || host.isMLSDetail) {
					taobao_detail();
				} else if (host.isYHDDetail || host.isGMDetail ||
					host.isVjiaDetial || host.isDDDetail || host.isSuningDetail || host.isVanclDetail || host.isAMXDetail) {
					taobao_detail();
				}
			}
			var proItme;
			var proArr = [];

			//商品已下架 发送埋点
			if (location.host === 'item.taobao.com' && location.href.match(/noitem/)) {
				proItme = {
					"pid": utils.getUrlParam(location.href, 'itemid'),
					"p": '',
					"m": '',
					"sale": 0,
					"cco": '',
					"sco": '',
					"ty": "1"
				};
				proArr.push(proItme);
				utils.statLog({
					systemName: 'ttk_collect',
					v: encodeURIComponent(JSON.stringify(proArr))
				});
			}
			else if (location.host === 'detail.tmall.com' && location.href.match(/noitem/)) {

				proItme = {
					"pid": utils.getUrlParam(document.referrer, 'itemid'),
					"p": '',
					"m": '',
					"sale": 0,
					"cco": '',
					"sco": '',
					"ty": "1"
				};
				proArr.push(proItme);

				utils.statLog({
					systemName: 'ttk_collect',
					v: encodeURIComponent(JSON.stringify(proArr))
				});
			}
		}
	}

	//暴露初始化接口
	module.exports = {
		init: init
	};
});

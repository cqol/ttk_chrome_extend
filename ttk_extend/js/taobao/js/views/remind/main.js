__tk__define(function (require, exports, module) {
	var $ = require('../../lib/jquery'),
		host = require('../../host'),
		utils = require('../../utils'),
		model = require('../../models/models'),
		product = require('../../product'),
		tts_stat = require("../../utils/tts_stat"),
		templates = require("../../templates.jst"),
		body = $('body'),
		userData;
	require('../../lib/jquery.tmpl');

	var price = '00';
	//Detail

	//促销价格为空，被隐藏
	/*function render() {
	 var tmple = '<div id="TK-remind-from" class="${app}remind-wrap"> <div id="J-TK-pop-msg-wrap" class="${app}pop-msg-wrap"> <div class="${app}msg"></div> <i class="icons triangle-left-empty"> <i class="subicon"></i> </i></div> <div id="J-TK-remind-mark" class="remind-tip-bg ${app}hidden"></div> <div id="J-TK-remind-popBpx" class="remind-tip ${app}hidden"> <div class="tip-title"><a href="#" id="J-TK-remind-close" class="icon icon-close" title="关闭">关闭</a>降价提醒</div> <div class="tip-cont"> <div class="tip-input">商品当前售价<span id="TK-remind-cur-price" class="pricenum"></span></div> <div class="tip-input"><span class="text">商品价格降到</span> <div class="select-list"><span class="freenum">9折</span><span class="tip-arrow"><i></i><span></span></span> <ul> <li>9折</li> <li>8折</li> <li>7折</li> <li>6折</li> <li>5折</li> <li>4折</li> <li>3折</li> <li>2折</li> <li>1折</li> </ul> </div> <span class="text">,即</span><span class="text"><div class="text-input"><input id="J-TK-price" type="text" value=""> </div>元时提醒我</span></div> </div> <div class="remind-tip-btn"><a href="#" id="TK-remind-submit" title="确定" class="btn">确定</a> <span class="TK-err">比当前价格还高诶~</span></div> </div></div>',
	 tmpleData;

	 tmpleData = {
	 app: 'TK-'
	 };
	 $.tmpl(tmple, tmpleData).appendTo('body');
	 //$('#J-TK-price').val(parsePrice(price, 0.9));

	 }*/
	/*	function getContainer() {
	 var container = '',
	 //box = $('#J_PromoPrice'),
	 oBox = $('#J_PromoPrice'), //促销价容器
	 pBox = $('#J_StrPriceModBox'), //原价容器
	 isTBNoPromoPrice = pBox[0] && oBox.hasClass('tb-hidden');

	 if (host.isTBDetail || host.isTMDetail) {
	 if (host.isTMDetail && $('.tm-fcs-panel')[0]) {
	 container = $('.tm-fcs-panel');
	 }
	 else if (host.isTBDetail && $('.tb-meta')[0]) {
	 container = $('.tb-meta');
	 }
	 //促销价被隐藏
	 else if (isTBNoPromoPrice) {
	 container = $('#J_StrPriceModBox');
	 }
	 else if (!oBox[0] && $('#J_StrPriceModBox')[0]) {
	 container = $('#J_StrPriceModBox');
	 }
	 else if (oBox[0]) {
	 container = oBox;
	 }
	 } else if (host.isB2CDetail) {
	 container = $('#summary-price');
	 }
	 else if (host.isYHDDetail) {
	 container = $('#currentPriceArea');
	 } else if (host.isVjiaDetial) {
	 container = $('#MarketPrice').parent();
	 } else if (host.isDDDetail) {
	 if ($('#originalPriceTag')[0]) {
	 container = $('#originalPriceTag').parents('.m_t4');
	 } else {
	 container = $('#d_price').parent();
	 }
	 } else if (host.isSuningDetail) {
	 if ($('#allcuxiao')[0]) {
	 container = $('#allcuxiao');
	 } else {
	 container = $('#netPriceBox');
	 }
	 } else if (host.isVanclDetail) {
	 container = $('.MSpriceArea');
	 } else if (host.isAMXDetail) {
	 if (document.getElementById('price_feature_div')) {
	 container = $('#price_feature_div');
	 }
	 }
	 else if (host.isMLSDetail) {
	 if ($('.item-price-info')[0]) {
	 container = $('.item-price-info');
	 } else {
	 container = $('.sku_meta .price').last().parent();
	 }
	 } else if (host.isMGJDetail){
	 container = $('.goods-price');
	 } else if (host.isVipDetail) {
	 container = $('.pi_price_box');
	 }
	 return container;
	 }*/

	//按钮弹出层
	function eventMsg(btn, type) {
		if (type === 'success') {
			btn.addClass('TK-mind-sub-active');
			btn.off('click');
			btn.on('click', function () {
				utils.stat('re_haveset_click', true);
				if (tem()) {
					window.open('http://ext.taotaosou.com/browser-static/cqol.html');
				} else {
					window.open('http://i.taotaosou.com/user?hash=priceremind/p/1#priceremind/p/1');
				}
			});
		}
	}

	function remind(userId, ttsid) {
		if (utils.getContainer() === '' ) {
			return false;
		}

		var tpl =templates['bijia/sub.remind'];

		$(tpl({list:'cc'})).insertAfter(utils.getContainer());

		//utils.stat('re_bu_show', true);
		utils.stat('tool_priceremind_PV', true);
		// 无用户状态
		if (!userId) {
			utils.load({
				url: 'http://img.taotaosou.cn/tts-static-6/standalone/livekit.js',
				callback: function () {
					window.LiveKit.jQuery = $;
					//render();
					renderEvent(false);
				}
			});
		} else {
			body.one({
				'tk.remind.status': function (e, data) {
					//render();
					if (data) {
						var btn = $('.J_TK-mind-sub-remind');
						btn.find('span').text('设置提醒');
						btn.on('click', function () {
							utils.stat('re_haveset_click', true);
							if (tem()) {
								window.open('http://ext.taotaosou.com/browser-static/cqol.html');
							} else {
								window.open('http://i.taotaosou.com/user?hash=priceremind/p/1#priceremind/p/1');
							}
						});
						setTimeout(function () {
							eventMsg(btn);
						}, 500);
					} else {
						renderEvent(userId);
					}
				}
			});
			//是否已经设置提醒
			model.remind.status(userId);
		}

		require('./qutu').init(ttsid);
		require('./under').init();
	}

	function renderEvent(id) {
		var userId = id;
		var btn = $('.J_TK-mind-sub-remind');
		btn.on('click', function () {
			if (!userId) {
				//window.LiveKit.LoginFrame.getInstance().reload().show();
				window.LiveKit.login();

				if (utils.GUID !== '') {
					/*window.LiveKit.LoginFrame.getInstance().$el.on("ready", function() {
					 $(this).attr("src", $(this).attr("src") + "?guid=" + utils.GUID);
					 });
					 window.LiveKit.LoginFrame.getInstance().sendMessage({type: "guid", data: "123"});*/
					window.GUID = utils.GUID;
				}

				var vt = document.createEvent('HTMLEvents');
				vt.initEvent('user_status_login', false, true);
				var centerJs = document.getElementById('J---TK-load');

				utils.stat('re_login_show', true);
				//$(window).one('session:refreshed', function (e, data) {
				window.LiveKit.off();
				window.LiveKit.once('session:error', function (data) {
					utils.stat('ttk_login_session_error', true);
					//TODO bug for login sesion:error
					btn.find('span').text('设置提醒');
					btn.off();
					btn.on('click', function () {
						utils.stat('re_haveset_click', true);
						if (tem()) {
							window.open('http://ext.taotaosou.com/browser-static/cqol.html');
						} else {
							window.open('http://i.taotaosou.com/user?hash=priceremind/p/1#priceremind/p/1');
						}
					});
					eventMsg(btn, 'success');

					centerJs.setAttribute('data-userid', data.id);
					centerJs.dispatchEvent(vt);
				});
				window.LiveKit.once('session:refreshed', function (data) {
					btn.find('span').text('设置提醒');
					btn.off();
					btn.on('click', function () {
						utils.stat('re_haveset_click', true);
						if (tem()) {
							window.open('http://ext.taotaosou.com/browser-static/cqol.html');
						} else {
							window.open('http://i.taotaosou.com/user?hash=priceremind/p/1#priceremind/p/1');
						}
					});
					eventMsg(btn, 'success');
					var reData = {
						status: 1,
						id: data.id,
						nick: data.nick
					};
					body.one({
						'tk.remind.status': function (e, data) {
							if (!data) {

								model.remind.set(reData.id);
							}
						}
					});
					//是否已经设置提醒
					model.remind.status(data.id);

					localStorage.setItem('TK-user-data', JSON.stringify(reData));

					centerJs.setAttribute('data-userid', data.id);
					centerJs.dispatchEvent(vt);
				});
				body.off('dialog:finish');
				body.on('dialog:finish', function () {
					utils.stat('re_login_x', true);
				});

			} else {
				body.one({
					'tk.remind.status': function (e, data) {
						if (!data) {
							model.remind.set(userId);
							showPop();
						} else {
							eventMsg(btn, 'success');
						}
					}
				});
				//是否已经设置
				model.remind.status(userId);
			}
			utils.stat('tool_priceremind_click', true);
			tts_stat.trackLog("tool_priceremind_click");
		});
		body.one({
			'tk.remind.set': function (e, data) {
				if (data) {
					btn.find('span').text('设置提醒');
					btn.off();
					btn.on('click', function () {
						utils.stat('re_haveset_click', true);
						if (tem()) {
							window.open('http://ext.taotaosou.com/browser-static/cqol.html');
						} else {
							window.open('http://i.taotaosou.com/user?hash=priceremind/p/1#priceremind/p/1');
						}
					});
					eventMsg(btn, 'success');
				}
			}
		});
	}
	function showPop() {

		price = product.item.getPrice();
		if (!price.match(/\./)) {
			price = price.slice(0, -2) + '.' + price.slice(-2);
		}
		var tpl = templates['bijia/sub.remind.paopao'],
			img;
		if (host.isTBDetail || host.isTMDetail) {
			img = 'http://img.taobaocdn.com/bao/uploaded/' + product.item.getImg() + '_130x130.jpg';
		} else {
			img = product.item.getImg();
		}
		body.append(tpl({set: true, price:price, img: img}));
		utils.stat('tool_priceremindset_PV', true);
		var close = $('.TK-paopao-close'),
			wrap = $('.TK-paopao-detail'),
			togo = $('.J-paopao-go');
		close.off();
		close.on('click', function () {
			wrap.animate({
				height: 0
			}, 600, 'linear', function () {
				wrap.hide();
				wrap.remove();
				utils.stat('priceremindset_click', true);
			});
		});
		if (tem()) {
			togo.attr('href', 'http://ext.taotaosou.com/browser-static/cqol.html');
		}
		togo.on('click', function () {
			utils.stat('priceremindset_click', true);
			wrap.remove();
		});
	}

	function tem() {
		if (userData.tip === 0) {
			return true;
		} else {
			return false;
		}
	}

	function init(ttsid) {
		//userData = utils.userData();
		/*if (userData) {
		 if (typeof userData.id !== 'undefined' && userData.id !== '') {
		 remind(userData.id, ttsid);
		 } else {
		 body.one('user.status.get', function (e, data) {
		 if (!data) {
		 return;
		 }
		 remind(utils.userData().id, ttsid);
		 });
		 model.remind.userStatus();
		 }
		 } else {
		 body.one('user.status.get', function (e, data) {
		 if (!data) {
		 return;
		 }
		 remind(utils.userData().id, ttsid);
		 });
		 model.remind.userStatus();
		 }*/
		body.on('tk.user', function(e, data) {
			userData = utils.userData();
			remind(data, ttsid);
		});
	}

	//暴露接口
	module.exports = {
		init: function (data) {
			init(data);
		}
	};
});
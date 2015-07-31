/**
 * Created with JetBrains PhpStorm.
 * User: cqol_77
 * Date: 13-11-11
 * Time: 下午3:16
 * To change this template use File | Settings | File Templates.
 */
__tk__define(function (require, exports, module) {
	var $ = require('../../lib/jquery'),
		host = require('../../host'),
		utils = require('../../utils'),
		model = require('../../models/models'),
		product = require('../../product'),
		templates = require('../../templates.jst'),
		body = $('body'),
		tts_stat = require("../../utils/tts_stat"),
		bijiaView = require("./taobao"),
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


	//按钮弹出层
	function eventMsg(btn, type) {
		if (type === 'success') {
			// btn.addClass('TK-mind-active');
			if (btn.hasClass('bijia-remind')) {
				btn.removeClass('bijia-remind').addClass('bijia-remind-set');
				tts_stat.trackEvent("Bottomtab_priceremindset_PV");
			}
			btn.off('click');
			btn.on('click', function () {
				if (tem()) {
					window.open('http://ext.taotaosou.com/browser-static/cqol.html');
				} else {
					window.open('http://i.taotaosou.com/user?hash=priceremind/p/1#priceremind/p/1');
				}
			});
		}
	}

	function remind(userId, ttsid) {
		// var tpl =templates['remind.qutu'];
		// var priceRemindBtn = $(tpl);

		// priceRemindBtn.insertAfter('#TK-con');

		//给用户中心提交
		body.trigger('tk.user', [userId]);
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
			tts_stat.trackEvent("Bottomtab_priceremind_PV");
		} else {
			body.one({
				'tk.remind.status': function (e, data) {
					//render();
					if (data) {
						// var btn = $('.J_TK-mind-remind');
						// btn.addClass('TK-mind-active');
						var btn = $('.TK-remind-btn');
						btn.removeClass('bijia-remind').addClass('bijia-remind-set');
						tts_stat.trackEvent("Bottomtab_priceremindset_PV");
						btn.on('click', function () {
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
						tts_stat.trackEvent("Bottomtab_priceremind_PV");
						renderEvent(userId);
					}
				}
			});
			//是否已经设置提醒
			model.remind.status(userId);
		}

		// require('./qutu').init(ttsid);
	}

	function renderEvent(id) {
		var userId = id;
		var btn = $('.TK-remind-btn');
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

				//$(window).one('session:refreshed', function (e, data) {
				window.LiveKit.off();
				window.LiveKit.once('session:error', function (data) {
					//TODO bug for login sesion:error
					// btn.addClass('TK-mind-active');
					btn.removeClass('bijia-remind').addClass('bijia-remind-set');
					tts_stat.trackEvent("Bottomtab_priceremindset_PV");
					btn.off();
					btn.on('click', function () {
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
					// btn.addClass('TK-mind-active');
					btn.removeClass('bijia-remind').addClass('bijia-remind-set');
					tts_stat.trackEvent("Bottomtab_priceremindset_PV");
					btn.off();
					btn.on('click', function () {
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
		});
		body.one({
			'tk.remind.set': function (e, data) {
				if (data) {
					// btn.addClass('TK-mind-active');
					btn.removeClass('bijia-remind').addClass('bijia-remind-set');
					tts_stat.trackEvent("Bottomtab_priceremindset_PV");
					btn.off();
					btn.on('click', function () {
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
		var pic =  product.item.getImg();
		if (host.isTMDetail || host.isTBDetail) {
			pic = 'http://img.taobaocdn.com/bao/uploaded/' + product.item.getImg() + '_90x90.jpg';
		}

		if (!price.match(/\./)) {
			price = price.slice(0, -2) + '.' + price.slice(-2);
		}
		$('<div class="TK-paopao-detail TK-jjtx"><div class="TK-paopao-hd">  <s class="TK-paopao-logo"></s> <h3 class="TK-paopao-title">降价提醒</h3>' +
			' <span class="TK-paopao-close" title="关闭"></span> </div> <div class="TK-paopao-bd">' +
			'<div class="TK-paopao-img"> <a class="TK-paopao-img-alink J-paopao-go" href="http://i.taotaosou.com/user?hash=priceremind/p/1#priceremind/p/1" target="_blank"> <img src="' + pic +
			'"/> </a> </div> <div class="TK-paopao-info"> <p class="TK-paopao-msg"><a class="J-paopao-go" href="http://i.taotaosou.com/user?hash=priceremind/p/1#priceremind/p/1" target="_blank"><span style="font-weight: 700;">设置成功：</span>' + '该商品现在卖'+ '<font color="ea5862">¥'  + price + '</font> ' + '，一旦降价了，会在这里通知你哦～' +
			'</a></p> <div class="TK-paopao-price"> <a href="http://i.taotaosou.com/user?hash=priceremind/p/1#priceremind/p/1" target="_blank" class="TK-paopao-go J-paopao-go">去看看已设置的商品</a> </div>  </div> </div></div>').appendTo('body');
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
			});
		});
		if (tem()) {
			togo.attr('href', 'http://ext.taotaosou.com/browser-static/cqol.html');
		}
		togo.on('click', function () {
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
		userData = utils.userData();
		if (userData) {
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
		}
	}

	//暴露接口
	module.exports = {
		init: function () {
			bijiaView.remindViewDeferred.promise().then(function(ttsid) {
				var tmpl = templates["bijia/taobao.remind"];

				bijiaView.$el.find(".TTS-remind-wrap").empty().append(tmpl());
				init(ttsid);
			});
		}
	};
});
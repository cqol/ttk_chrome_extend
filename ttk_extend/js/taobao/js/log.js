__tk__define(function (require, exports, module) {
	var $ = require('./lib/jquery'),
		utils = require('./utils'),
		host = require('./host'),
		body = $('body'),
		cookie = document.cookie,
		Droduct = require('./product'),

		ref = document.referrer;
	var userNick = cookie.replace(/.*tracknick=/, '').replace(/;.*/, '');

	//Stat event collection

	var guid = utils.GUID,
		msg = '',
		Product;

	function init() {
		if (host.isTBList || host.isTMList) {
			if (host.isTBList) {
				msg = document.getElementById('q').value;
			} else {
				msg = document.getElementById('mq').value;
			}
			utils.statLog_img({
				systemName: 'tts_taobao_list',
				ref: encodeURIComponent(ref),
				guid: guid,
				ptyp: host.pageType,
				query: encodeURIComponent(msg)
			});
		} else if (host.isTMDetail || host.isTBDetail) {
			Product = new Droduct(document.getElementById('J_ImgBooth'));
			utils.statLog_img({
				systemName: 'tts_taobao_detail',
				ref: encodeURIComponent(ref),
				guid: guid,
				host:location.host,
				ptyp: host.pageType,
				id: Product.getID(),
				shopid: $('#LineZing').attr('shopid'),
				cid: Product.getCid(),
				ztc: location.href.match(/ali_refid=(a3_420432_1006|a3_420984_1006|a3_420980_1006|a3_420841_1006)/) ? true : false,
				prc: Product.getPrice()
			});
			//淘宝天猫点击
			if (host.isTMDetail) {
				//cat=tts  type=gm   num=1  sum=金额
				$('#J_LinkBuy ').on('click', function () {
					if (typeof tk_goumai === 'undefined') {
						utils.statLog_img({
							systemName: 'tts_taobao_detail_clk',
							type: 'gm',
							num: 1,
							shopId: $('#LineZing').attr('shopid'),
							cid: Product.getCid(),
							pid: Product.getID(),
							nick: userNick,
							refer: document.referrer,
							sum: Product.getPrice()
						});
						window.tk_goumai = true;
					}
				});
				//cat=tts  type=gwc   num=1  sum=金额
				$('#J_LinkBasket').on('click', function () {
					if (typeof tk_shoucang === 'undefined') {
						utils.statLog_img({
							systemName: 'tts_taobao_detail_clk',
							type: 'gwc',
							num: 1,
							shopId: $('#LineZing').attr('shopid'),
							cid: Product.getCid(),
							pid: Product.getID(),
							nick: userNick,
							refer: document.referrer,
							sum: Product.getPrice()
						});
						window.tk_shoucang = true;
					}
				});
				$('#J_AddFavorite').on('click', function () {
					if (typeof tk_sc === 'undefined') {
						utils.statLog_img({
							systemName: 'tts_taobao_detail_clk',
							type: 'sc',
							num: 1,
							shopId: $('#LineZing').attr('shopid'),
							cid: Product.getCid(),
							pid: Product.getID(),
							nick: userNick,
							refer: document.referrer,
							sum: Product.getPrice()
						});
						window.tk_sc = true;
					}
				});
			}
			//淘宝天猫点击
			if (host.isTBDetail) {
				$('.J_LinkBuy').on('click', function () {
					if (typeof tk_goumai === 'undefined') {
						utils.statLog_img({
							systemName: 'tts_taobao_detail_clk',
							type: 'gm',
							shopId: $('#LineZing').attr('shopid'),
							cid: Product.getCid(),
							pid: Product.getID(),
							nick: userNick,
							refer: document.referrer,
							num: 1,
							sum: Product.getPrice()
						});
						window.tk_goumai = true;
					}
				});
				$('.J_LinkAdd').on('click', function () {
					if (typeof tk_shoucang === 'undefined') {
						utils.statLog_img({
							systemName: 'tts_taobao_detail_clk',
							type: 'gwc',
							shopId: $('#LineZing').attr('shopid'),
							cid: Product.getCid(),
							pid: Product.getID(),
							nick: userNick,
							num: 1,
							sum: Product.getPrice()
						});
						window.tk_shoucang = true;
					}
				});
				$('.J_TDialogTrigger').on('click', function () {
					if (typeof tk_sc === 'undefined') {
						utils.statLog_img({
							systemName: 'tts_taobao_detail_clk',
							cat: 'tts_tuan',
							type: 'sc',
							shopId: $('#LineZing').attr('shopid'),
							cid: Product.getCid(),
							pid: Product.getID(),
							nick: userNick,
							refer: document.referrer,
							num: 1,
							sum: Product.getPrice()
						});
						window.tk_sc = true;
					}
				});
			}
		}
		else if (host.isBuy) {
			var delay = null;
			var getItmes;
			delay = setInterval(function () {
				if (document.getElementById('J_Go')) {
					getItmes = function () {
						var arr = ',',
							pro = $('.orderInfo-shop').attr('href').match(/shop_id=([0-9].+)/)[1];
						$('.order .item').each(function (i, item) {
							pro += '_';
							pro += utils.sliceID($(item).find('.itemInfo-link').attr('href'));
							pro += '_';
							pro += $(item).find('.J_ItemPrice').text();
							arr += pro;
						});
						return arr.substring(1);
					};
					if (host.isTBbuy) {
						utils.statLog_img({
							systemName: 'tts_gouwu_dingdan',
							ptyp: 'dd_show',
							mobile: $('.user-address').eq(0).find('em').text(),
							ads: encodeURIComponent($('.J_BuyFooterAddressDetail').text().replace(/\n/g,'').trim().replace(/\s/g,'')),
							name: encodeURIComponent($('.J_BuyFooterAddressRec').text().trim().replace(/[0-9]/g, '')),
							nick: userNick,
							ref: encodeURIComponent(ref),
							info: encodeURIComponent(getItmes()),
							num: $('.buy-order-field .item').length,
							sum: $('#J_ActualFee').text().replace(/\./, '')
						});

						//点击购物车
						$('#J_Go').on('click', function () {
							utils.statLog_img({
								systemName: 'tts_gouwu_dingdan',
								ptyp: 'dd_clk',
								mobile: $('.user-address').eq(0).find('em').text(),
								ads: encodeURIComponent($('.J_BuyFooterAddressDetail').text().replace(/\n/g,'').trim().replace(/\s/g,'')),
								name: encodeURIComponent($('.J_BuyFooterAddressRec').text().trim().replace(/[0-9]/g, '')),
								info: encodeURIComponent(getItmes()),
								nick: userNick,
								ref: encodeURIComponent(ref),
								num: $('.buy-order-field .item').length,
								sum: $('#J_ActualFee').text().replace(/\./, '')
							});
						});
					}

					// 天猫下订单页
					else if (host.isTMbuy) {
						getItmes = function () {
							var arr = ',',
								pro = $('.bundle-title a').attr('href').match(/shop_id=([0-9].+)/)[1];
							$('.grid-order ').each(function (i, item) {
								pro += '_';
								pro += utils.sliceID($(item).find('.img').attr('href'));
								pro += '_';
								pro += $(item).find('.tube-sum .sum').text();
								arr += pro;
							});
							return arr.substring(1);
						};
						utils.statLog_img({
							systemName: 'tts_gouwu_dingdan',
							ptyp: 'dd_show',
							mobile: $('.addr-bd').eq(0).find('.phone').text(),
							ads: encodeURIComponent($('.addr-bd .street').eq(0).text().trim()),
							name: encodeURIComponent($('.addr-hd .name').eq(0).text().trim()),
							info: encodeURIComponent(getItmes()),
							nick: userNick,
							ref: encodeURIComponent(ref),
							num: $('.grid-order').length,
							sum: $('#J_RealPay').text().replace(/\./, '')
						});

						//点击购物车
						$('#J_Go').on('click', function () {
							utils.statLog_img({
								systemName: 'tts_gouwu_dingdan',
								ptyp: 'dd_clk',
								mobile: $('.addr-bd').eq(0).find('.phone').text(),
								ads: encodeURIComponent($('.addr-bd .street').eq(0).text().trim()),
								name: encodeURIComponent($('.addr-hd .name').eq(0).text().trim()),
								nick: userNick,
								ref: encodeURIComponent(ref),
								info: encodeURIComponent(getItmes()),
								num: $('.grid-order').length,
								sum: $('#J_RealPay').text().replace(/\./, '')
							});
						});
					}
					clearInterval(delay);
					delay = null;
				}
			}, 200);

		}
		else if (host.isJuDetail) {
			utils.statLog_img({
				systemName: 'tts_jhs_detail',
				ref: encodeURIComponent(ref),
				guid: guid,
				tpye: 'show',
				id: utils.sliceID($('.normal-pic a').attr('href')),
				shopid: '',
				sum: $('.J_ItemShare').data('itemprice'),
				nick: userNick
			});
			$('.J_BuySubmit').on('click', function () {
				utils.statLog_img({
					systemName: 'tts_jhs_detail',
					ref: encodeURIComponent(ref),
					guid: guid,
					tpye: 'clk',
					id: utils.sliceID($('.normal-pic a').attr('href')),
					shopid: '',
					sum: $('.J_ItemShare').data('itemprice'),
					nick: userNick
				});
			});
		}
		else if (host.isVipShow) {
			utils.statLog_img({
				systemName: 'tts_vip_list',
				ref: encodeURIComponent(ref),
				guid: guid,
				title: document.title
			});
		}
		else if (host.isVipDetail) {
			utils.statLog_img({
				systemName: 'tts_vip_detail',
				ref: encodeURIComponent(ref),
				guid: guid,
				url: location.href,
				item_prc: $('.pbox_price em').text(),
				title: document.title
			});
			$('#J_cartAdd_submit').on('click', function () {
				utils.statLog_img({
					systemName: 'tts_vip_detail_clk',
					ref: encodeURIComponent(ref),
					guid: guid,
					url: location.href,
					sum: $('.pbox_price em').text(),
					title: document.title,
					nick: $('.user_in_name').text(),
					num: $('.num_input').text()
				});
			});
		}
		else if (host.isVIPCart) {
			utils.statLog_img({
				systemName: 'tts_vip_gwc',
				ptyp: 'gwc_show',
				nick: $('.welcome-text a').eq(0).text(),
				ref: encodeURIComponent(ref),
				info: '',
				sum: $('.J_info_total').text()
			});
			$('.ui-btn-loading-before').on('click', function () {
				if (typeof tk_vipgwc === 'undefined') {
					utils.statLog_img({
						systemName: 'tts_vip_gwc',
						ptyp: 'gwc_show',
						nick: $('.welcome-text a').eq(0).text(),
						ref: encodeURIComponent(ref),
						info: '',
						sum: $('.J_info_total').text()
					});
					window.tk_vipgwc = true;
				}
			});
		}
		else if (host.isVipCheckout) {
			/*getItmes = function () {
			 var arr = ',',
			 pro = $('.bundle-title a').attr('href').match(/shop_id=([0-9].+)/)[1];
			 $('.product-row').each(function (i, item) {
			 pro += '_';
			 pro += utils.sliceID($(item).find('.img').attr('href'));
			 pro += '_';
			 pro += $(item).find('.tube-sum .sum').text();
			 arr += pro;
			 });
			 return arr.substring(1);
			 };*/
			utils.statLog_img({
				systemName: 'tts_vip_dingdan',
				ptyp: 'dd_show',
				mobile: $('.member-mobile').text(),
				ads: encodeURIComponent($('.member-text').eq(2).text().trim()),
				name: encodeURIComponent($('.member-name').eq(0).text().trim()),
				info: '',
				nick: $('.welcome-text a').eq(0).text(),
				ref: encodeURIComponent(ref),
				sum: $('.J_pay_amount').text()
			});

			//点击购物车
			$('.checkout_submit_btn').on('click', function () {
				if (typeof tk_vipbuy === 'undefined') {
					utils.statLog_img({
						systemName: 'tts_vip_dingdan',
						ptyp: 'dd_show',
						mobile: $('.member-mobile').text(),
						ads: encodeURIComponent($('.member-text').eq(2).text().trim()),
						name: encodeURIComponent($('.member-name').eq(0).text().trim()),
						info: '',
						nick: $('.welcome-text a').eq(0).text(),
						ref: encodeURIComponent(ref),
						sum: $('.J_pay_amount').text()
					});
					window.tk_vipbuy = true;
				}
			});
		}
		else if (host.isB2CDetail) {
			var img;
			if ($('.land_a_pic')[0]) {
				img = $('.land_a_pic .err-product')[0];
			} else {
				img = $('#spec-n1 img')[0];
			}
			Product = new Droduct(img);

			utils.statLog_img({
				systemName: 'tts_jd_detail',
				ref: encodeURIComponent(ref),
				guid: guid,
				ptyp: host.pageType,
				id: Product.getID(),
				shop_name: '',
				prc: Product.getPrice()
			});
			$('.J_BuySubmit').on('click', function () {
				if (typeof tk_jdbuy === 'undefined') {
					utils.statLog_img({
						systemName: 'tts_jd_detail_clk',
						ref: encodeURIComponent(ref),
						guid: guid,
						ptyp: host.pageType,
						id: Product.getID(),
						num: $('#buy-num').val(),
						sum: Product.getPrice(),
						shop_name: '',
						prc: Product.getPrice(),
						nick: $('.link-user').text()
					});
					window.tk_jdbuy = true;
				}
			});
		}
		else if (host.isJDCart) {
			utils.statLog_img({
				systemName: 'tts_jd_gwc',
				ref: encodeURIComponent(ref),
				guid: guid,
				type: 'gwc_show',
				nick: $('.link-user').text(),
				info: '',
				sum: $('.sumPrice em').eq(0).text()
			});
			$('.J_BuySubmit').on('click', function () {
				if (typeof tk_jdbuy === 'undefined') {
					utils.statLog_img({
						systemName: 'tts_jd_detail_clk',
						ref: encodeURIComponent(ref),
						guid: guid,
						ptyp: host.pageType,
						id: Product.getID(),
						num: $('#buy-num').val(),
						sum: Product.getPrice(),
						shop_name: '',
						prc: Product.getPrice(),
						nick: $('.link-user').text()
					});
					window.tk_jdbuy = true;
				}
			});
		}
		else if (host.isJDtrade) {
			utils.statLog_img({
				systemName: 'tts_jd_dingdan',
				ref: encodeURIComponent(ref),
				guid: guid,
				type: 'gwc_show',
				nick: $('.link-user').text(),
				info: '',
				mobile: '',
				sum: ''
			});
			$('.checkout-submit').on('click', function () {
				if (typeof tk_jdbuy === 'undefined') {
					utils.statLog_img({
						systemName: 'tts_jd_dingdan',
						ref: encodeURIComponent(ref),
						guid: guid,
						type: 'gwc_show',
						nick: $('.link-user').text(),
						info: '',
						mobile: '',
						sum: $('.payPriceId').text()
					});
					window.tk_jdbuy = true;
				}
			});
		}
	}

	//暴露初始化接口
	module.exports = {
		init: function () {
			try {
				init();
			} catch (e) {
			}
		}
	};
});

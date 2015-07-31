//### 购物车出同款 ###
//[需求地址](//199.155.122.129:8080/pages/viewpage.action?pageId=17367059)
//date: 2013/07/24
__tk__define(function (require, exports) {
	//依赖
	var $ = require('../lib/jquery'),
		utils = require('../utils'),
		_ = require('../lib/underscore.js'),
		host = require('../host'),

	//埋点
		stat = {};
	var reData = [];

	stat = {
		log: function (cartProduct, vSearchProduct, button) {
			utils.statLog({
				systemName: 'ttk_overpay_log',
				//购物车总商品数
				allg: cartProduct,
				//后端返回的图像类目商品数
				vcatg: vSearchProduct,
				//“验证”按钮展现
				opays: button
			});
		},

		//点击“验证”按钮
		buttonClick: function () {
			utils.stat('overpay_Clk', true);
		},

		//贵展现
		sourceProductCheap: function () {
			utils.stat('right_show', true);
		},

		//便宜展现
		sourceProductExpensive: function () {
			utils.stat('cheaper_show', true);
		},

		//便宜点击
		sourceProductExpensiveClick: function () {
			utils.stat('cheaper_Clk', true);
		}
	};

	//原品更贵
	function sourceProductExpensive($target, price, href, website) {
		var webSiteMap = {
			'taobao':'淘宝',
			'tmall':'天猫',
			'jd.com':'京东',
			'amazon':'亚马逊',
			'yihaodian':'1号店',
			'dangdang':'当当网',
			'suning':'苏宁易购',
			'51buy':'易迅',
			'vip':'唯品会',
			'wanggou':'QQ网购',
			'vjia':'凡客V+',
			'vancl':'凡客诚品',
			'moonbasa':'梦芭莎',
			'coo8':'库巴',
			'm18':'麦考林',
			'xiu':'走秀',
			'mbaobao':'卖包包',
			'justyle':'justyle',
			'hstyle':'韩都衣舍',
			'liebo':'裂帛',
			'ochirly':'欧时力官网',
			'hg-daigou':'韩购社官网',
			'htjz':'核桃夹子',
			'meilishuo': '美丽说',
			'mogujie': '蘑菇街',
			'gome': '国美在线'
		};
		var firstName = '';
		if (location.host.indexOf(website) < 0) {
			firstName = webSiteMap[website];
		}

		$target.attr('href', href)
			.html('<span class="TK-source-product-expensive-hd">' + '￥' + price + '</span>' +
				'<span class="TK-source-product-word">' + firstName + '有更划算的' +
				'</span>' +
				'<span class="TK-source-product-expensive-bd"></span>')
			.addClass('TK-source-product-expensive');

		stat.sourceProductExpensive();
	}

	//原品更便宜
	function sourceProductCheap($target) {
		$target.text('你买对了')
			.addClass('TK-source-product-cheap')
			//注销点击事件
			.off('click')[0]
			//屏蔽默认行为
			.onclick = function () {
			return false;
		};

		stat.sourceProductCheap();
	}

	//获取所有商品 ID
	function GetProductID() {
		/*if (host.isTBCart) {
		 return this.tkCart();
		 } else if (host.isTMCart) {
		 return this.tmCart();
		 }*/
		return this.tkCart();
	}

	GetProductID.fn = GetProductID.prototype = {
		result: {
			//`key/value` 取数据的时候避免了二次循环
			itemid: {},
			//`array` 拼接 `PRODUCT_API_GET` 用
			list: [],
			title: []
		},

		push: function (value, index, title) {
			this.result.itemid[value] = index;
			this.result.list.push(value);
			this.result.title.push(title);
		},

		tkCart: function () {
			var self = this,
				list = getCon().list;

			if (list[0]) {
				list.each(function (i, item) {
					//console.log(item);
					var $item = getInfo(i),
						itemId = $item.id,
						title = $item.title,
						price = $item.price,
						cid = '',
						time = '';
					/*if ($('.item-title')[0]) {
					 $item = $(item).find('.item-title').eq(0);
					 itemId = utils.sliceID($item.attr('href'));
					 title = $item.text();
					 price = $(item).find('.J_Price').text();
					 } else {
					 $item = $(item).find('.item-content').eq(0);
					 itemId = $item.data('itemid');
					 title = $item.text();
					 price = $(item).find('.J_Price').text();
					 }*/

					utils.statLog_img({
						systemName: 'ttk_user_info',
						pType: host.pageType,
						price: price,
						pid: itemId,
						title: encodeURIComponent(title),
						list_num: i + 1,
						cid: cid,
						trade_time: encodeURIComponent(time)
					});

					if (_.isNumber(itemId)) {
						self.push(itemId, i, title);
					} else {
						self.push(itemId, i, title);
					}
				});
			}

			return this.result;
		}
	};

	//取页面结构信息
	function getInfo(index) {
		var $currentCol = '',
			$container = '',
			$price = '',
			itemId = '',
			title,
			pic;
		if (host.isTBCart || host.isTMCart) {
			if ($('.item-content')[0]) {
				$currentCol = $('.J_ItemBody').eq(index).find('.item-content').eq(0);
				$container = $currentCol.find('.J_ItemSum').eq(0);
			} else {
				$currentCol = $('.J_ItemBody').eq(index).find('.item-content').eq(0);
				$container = $currentCol.find('.s-total').eq(0).find('em').eq(0);
			}

			itemId = utils.sliceID($currentCol.find('.item-title').attr('href'));
			$price = parsePrice($currentCol.find('.J_Price').eq(0).text());
			title = $currentCol.find('.item-title').text();
			pic =  $currentCol.find('.itempic').attr('src').replace('_80x80.jpg', '');
		} else if (host.isJDCart) {
			$currentCol = $('.item_form').eq(index);
			$container = $currentCol.find('.price').eq(0);
			$price = parsePrice($currentCol.find('.price').eq(0).text());
			title = $currentCol.find('.p-img img').attr('alt');
			pic =  $currentCol.find('.p-img img').attr('src');
			itemId = utils.sliceID($currentCol.find('.p-name a').attr('href'));

		} else if (host.isMLSCart) {
			$currentCol = $('.goods').eq(index);
			//$container = $currentCol.find('.price').eq(0);
			$container = function() {
				if ($currentCol.find('.price_origial')[0]) {
					return $currentCol.find('.price_origial').eq(0);
				} else {
					return $currentCol.find('.price').eq(0);
				}
			}();
			$price = parsePrice($currentCol.find('.price').eq(0).text());
			title = $.trim($currentCol.find('.g-content .name').text());
			pic =  $currentCol.find('.g-content img').attr('src');
			itemId = utils.sliceID($currentCol.find('.g-content a').attr('href'));

		} else if (host.isMGJCart) {
			$currentCol = $('.cart_mitem').eq(index);
			$container = $currentCol.find('.cart_lightgray').eq(0);
			$price = parsePrice($currentCol.find('.cart_data_sprice').eq(0).text());
			title = $currentCol.find('.cartImgTip').attr('alt');
			pic =  $currentCol.find('.cartImgTip').attr('src');
			itemId = utils.sliceID($currentCol.find('.cart_goods_img').attr('href'));

		} else if (host.isVIPCart) {
			$currentCol = $('.J_goods_item').eq(index);
			$container = $currentCol.find('.m-price').eq(0);
			$price = parsePrice($currentCol.find('.u-price').eq(0).text());
			title = $currentCol.find('.product-pic img').attr('alt');
			pic =  $currentCol.find('.product-pic img').attr('src');
			itemId = utils.sliceID($currentCol.find('.product-pic a').attr('href'));
		}

		return {
			con: $container,
			price: $price,
			title: title,
			pic: pic,
			id: itemId
		};
	}

	function parsePrice(obj) {
		var price = obj;
		//price = $.trim(numberFormat(price));
		price = $.trim(price);

		return price.replace(/[^\x00-\xff]*/g, '').replace(/¥/g, '');
	}
	//取插入位置
	function getCon() {
		var $container;
		if (host.isTBCart || host.isTMCart) {
			$container = $('.J_ItemBody');
		} else if (host.isJDCart) {
			$container = $('.item_form');
		} else if (host.isMLSCart) {
			$container = $('.goods');
		} else if (host.isMGJCart) {
			$container = $('.cart_mitem');
		} else if (host.isVIPCart) {
			$container = $('.J_goods_item ');
		}
		return  {
			list: $container,
			size: $container.size()
		};
	}

	//根据后台配置，针对匹配的商品，显示一个搭配按钮
	//list 后端返回的商品 ID 列表
	//products 购物车页面的商品列表，用来和后端返回的商品匹配序号
	function render(list, products) {
		function renderButton(id) {
			var index = products[id],
				$container = getInfo(index).con,
				$price = getInfo(index).price,
				TK_BUTTON = '';
			if (!$container.data('TK-cart')) {
				/*if (host.isTBCart || host.isTMCart) {
				 if ($('.item-content')[0]) {
				 $currentCol = $('.J_ItemBody').eq(index).find('.item-content').eq(0);
				 $container = $currentCol.find('.J_ItemSum').eq(0);
				 } else {
				 $currentCol = $('.J_ItemBody').eq(index).find('.item-content').eq(0);
				 $container = $currentCol.find('.s-total').eq(0).find('em').eq(0);
				 }

				 $price = $currentCol.find('.J_Price').eq(0).text();
				 }*/
				/*else if (host.isTMCart) {
				 $currentCol = $('.grid-bundle.grid-bundle-B').eq(index);
				 $container = $currentCol.find('.sum').eq(0);
				 $price = $currentCol.find('.now').eq(0).text();
				 }*/

				TK_BUTTON = '<a data-title="' + getInfo(index).title + '" data-pic="' +getInfo(index).pic +'" data-id="' + id + '" data-price="' + $price + '" class="TK-verification" target="_blank" href="#_">买贵了？验证一下》</a>';

				//多件商品并且是同个店铺，则只出一个“验证”按钮
				$container.before(TK_BUTTON);
				$container.data('TK-cart', 'true');
			}
		}

		function event() {
			var TK_API_GET = '//browserre.taotaosou.com/getTkJsonItems.do?clientId=1&ptyp=' + host.pageType +
				'&website=' + host.webSite +
				'&jsonp=?';


			//将同款价格更新为促销价
			function updatePrice(list, idList, callback) {
				var PROMO_PRICE_API_GET = '//show.re.taobao.com/feature.htm?cb=?';

				$.ajax({
					dataType: 'jsonp',
					url: PROMO_PRICE_API_GET,
					data: {
						auction_ids: idList,
						feature_names: 'promoPrice',
						from: 'taobao_search'
					}
				}).done(function (promoPriceData) {
						//促销价与原价对比，取最低价格
						function getPromoPrice(promoPriceData, id) {
							var result = false;
							$.each(promoPriceData, function (i, item) {
								//匹配促销价接口和原商品的ID
								if (parseInt(item.auction_id, 10) === parseInt(id, 10) &&
									item.promoPrice !== '') {
									//促销价大于 1000 时，舍弃小数。
									if (item.promoPrice > 1000) {
										result = parseInt(item.promoPrice, 10);
									} else {
										result = item.promoPrice;
									}
								}
							});

							return result;
						}

						//更新同款价格
						$.each(list, function (i, item) {
							var promoPrice;

							if ((item.promoPrice) &&
								(_.isString(item.promoPrice)) &&
								(item.promoPrice !== '') &&
								(item.promoPrice !== '-1') &&
								(item.promoPrice !== '0')) {
								item.price = item.promoPrice;
							}

							promoPrice = getPromoPrice(promoPriceData, item.sourceId);

							if (promoPrice) {
								item.price = promoPrice;
							}
						});

						callback(list);
					});
			}

			//获取最低价格的商品
			function getMinPriceProduct(list, callback) {
				var idList = '';

				_.each(list, function (product) {
					if (product.clickUrl.match(/taobao|tmall/)) {
						idList += product.sourceId + ',';
					}
				});

				if (idList !== '') {
					updatePrice(list, idList, function (updateList) {
						//Get min price
						callback(_.min(updateList, function (item) {
							return parseFloat(item.price);
						}));
					});
				} else {
					$.each(list, function (i, item) {
						if ((item.promoPrice) &&
							(_.isString(item.promoPrice)) &&
							(item.promoPrice !== '') &&
							(item.promoPrice !== '-1') &&
							(item.promoPrice !== '0')) {
							item.price = item.promoPrice;
						}
					});
					callback(_.min(list, function (item) {
						return parseFloat(item.price);
					}));
				}

			}

			$('.TK-verification').on('click', function (e) {
				var $target = $(this),
					$id = $target.data('id'),
					$price = $target.data('price');

				if ($target.hasClass('TK-source-product-expensive') === false) {
					e.preventDefault();

					$.getJSON(TK_API_GET + '&itemId=' + $target.data('id') +
							'&pic=' + $target.data('pic') + '&title=' + encodeURIComponent($target.data('title'))).done(function (data) {
							//console.log(data);
							var list = data.sameList;
							var ttsUrl = '//item.taotaosou.com/';
							//业务逻辑都在这了。
							if (list[0]) {
								//同款商品与原品比价
								getMinPriceProduct(list, function (product) {
									//剔除原品
									if (($id !== product.sourceId) &&
										(parseFloat($price)  >  parseFloat(product.price))) {
										ttsUrl += product.ttsid + '.html?utm_medium=ttk&utm_source=TB_Cart_overpay&isauto=1';
										//ttsUrl += product.clickUrl;
										sourceProductExpensive($target, product.price, ttsUrl, product.webSite);
									} else {
										sourceProductCheap($target);
									}
								});
							}
							//无同款
							else {
								sourceProductCheap($target);
							}
						});

					$target.addClass('TK-loading');
					stat.buttonClick();
				} else {
					stat.sourceProductExpensiveClick();
				}
			});
		}

		_.each(list, function (item) {
			renderButton(item, products);
		});

		event();

		var total;

		if (host.isTBCart || host.isTMCart) {
			total = $('#cart .J_TotalNum').text();
		}
		/*else if (host.isTMCart) {
		 total = $('#R_StatusKeeper .num').text().replace(/\/.*//*, '');
		 }*/

		stat.log(total, list.length, $('.TK-verification').length);
	}

	function fetch(callback) {

		//已购买的商品列表
		var products,
			dalay = null,
		//查询支持商品的接口
		//PRODUCT_API_GET = '//browserre.taotaosou.com/getDapei.do?callback=?' +
		//PRODUCT_API_GET = '//199.155.122.114:9980/maiguile.do?callback=?' +
			PRODUCT_API_GET = '//browserre.taotaosou.com/maiguile.do?callback=?' +
				'&ids=',
			PRODUCT_API_GET_SE = '//browserre.taotaosou.com/maiguile.do?callback=?' +
				'&ids=';
		if (dalay) {
			clearInterval(dalay);
		}
		dalay = setInterval(function () {
			if (getCon().size !== 0) {
				products = new GetProductID();

				var firstAjaxArr = products.list.splice(0, 10),
					secondAjaxArr = products.list;
				var firsTitle = products.title.splice(0, 10),
					secondTitle = products.title;

				PRODUCT_API_GET += firstAjaxArr.toString();
				PRODUCT_API_GET += '&titles=';
				var tt = '';
				for (var i = 0; i < firsTitle.length; i++ ) {
					tt += ',' + encodeURIComponent(firsTitle[i]);
				}
				//console.log(getInfo(1));
				PRODUCT_API_GET += tt.substring(1);
				$.getJSON(PRODUCT_API_GET).done(function (data) {
					if (!data) {
						return false;
					}
					if (data&& data[0]) {
						reData = reData.concat(data);
						callback(reData, products.itemid);
					}
					/*if (data && data.list && data.list[0]) {
					 callback(data.list, products.itemid);
					 }*/
				});

				//二次
				if (secondAjaxArr[0]) {
					PRODUCT_API_GET_SE += secondAjaxArr.toString();
					PRODUCT_API_GET_SE += '&titles=';

					var aa = '';
					for (var j = 0; j < secondTitle.length; j++ ) {
						aa += ',' + encodeURIComponent(secondTitle[j]);
					}
					//console.log(getInfo(1));
					PRODUCT_API_GET_SE += aa.substring(1);
					$.getJSON(PRODUCT_API_GET_SE).done(function (data) {
						if (!data) {
							return false;
						}
						if (data&& data[0]) {
							reData = reData.concat(data);
							callback(reData, products.itemid);
						}
						/*if (data && data.list && data.list[0]) {
						 callback(data.list, products.itemid);
						 }*/
					});
				}

				clearInterval(dalay);
			}
		}, 200);
	}

	//暴露初始化接口
	exports.init = function () {
		var $body = $('body');

		//增加前缀方便 CSS 中区分天猫、淘宝
		$body.addClass('CART');
		if (host.isTBCart) {
			$body.addClass('TB');
		} else if (host.isJDCart) {
			$body.addClass('JD-CART');
		} else if (host.isMLSCart) {
			$body.addClass('MLS-CART');
		} else if (host.isVIPCart) {
			$body.addClass('VIP-CART');
		} else if (host.isMGJCart) {
			$body.addClass('MGJ-CART');
		}
		fetch(render);
	};
});

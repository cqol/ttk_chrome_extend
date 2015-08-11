__tk__define(function (require, exports, module) {
	var $ = require('../lib/jquery'),
		host = require('../host'),
		getJSONP = require('./jsonp'),
		utils = require('../utils'),
		prefix = require('../views/prefix'),
		_ = require('../lib/underscore'),
		api = require('./api'),
		Product = require('../product'),
		body = $('body'),
		PROMO_PRICE_API_GET = '//show.re.taobao.com/feature.htm?cb=?';
	//存储商品ID 对精品进行排重
	var sameIds,
		apiData = {};

	var opLocal = false;
	//Splice product link
	function transfer(product, ttsid) {
		//Change referer
		var TRANSFER_API_POST = 'http://search.taotaosou.com/transfer.htm?',//淘淘搜比价转地址
		//主站转CPS
		//TRANSFER_CPS_POST = 'http://www.taotaosou.com/cps/getCPSLink.do?url=',
			TRANSFER_POST = product.clickUrl,
			throughtCPS;
		//直接跳淘宝
		//TRANSFER_POST = url;


		//京东商品走 主站！！ cps收入
		/*if (TRANSFER_POST.match(/jd.com/)) {
			TRANSFER_POST = 'http://item.taotaosou.com/' + product.ttsid +
				'.html?utm_medium=ttk&utm_source=' + utils.site() +
				'_rec';
			return TRANSFER_POST;
		}*/

		//如果getJsonItems返回的的数据中有sourceid，跳转到chaoji99；没有则跳clickUrl。
		//如果不是天猫、淘宝、淘淘搜，全国所有地方都跳超级99cps
		//如果是天猫、淘宝，则除北京杭州外跳超级99，但没有cps
		if (!utils.isJuzi()) {
			if (product.ttsid) {
				if (!location.host.match(/tmall\.com|taobao\.com|taotaosou\.com/)) {
					TRANSFER_POST = 'http://www.chaoji99.com/' + product.ttsid + '.html';
					//TRANSFER_POST = 'http://www.chaoji99.com/' + product.ttsid + '.html?syt=ttk';
					return TRANSFER_POST;
				} else if (location.host.match(/tmall\.com|taobao\.com/)) {
					if (!opLocal && TRANSFER_POST.match(/taobao|tmall/)) { //淘宝天猫商品 的跳转 添加syt!
						TRANSFER_POST = 'http://www.chaoji99.com/' + product.ttsid + '.html?syt=ttk';
						return TRANSFER_POST;
					} else if (!TRANSFER_POST.match(/taobao|tmall/)){ //商品不是淘宝天猫的 都跳chaoji99
						TRANSFER_POST = 'http://www.chaoji99.com/' + product.ttsid + '.html';
						return TRANSFER_POST;
					}
				}
			}
		}

		if (product.ttsid && product.ttsid !== 0) {
			TRANSFER_POST = 'http://item.taotaosou.com/' + product.ttsid +
				'.html?utm_medium=ttk&utm_source=' + utils.site();
		}
		return TRANSFER_POST;
	}
	var webSiteMapShort = {
		'taobao': '淘',
		'tmall': '天',
		'jd.com': '京',
		'amazon': '亚',
		'yihaodian': '壹',
		'dangdang': '当',
		'suning': '苏',
		'51buy': '易',
		'vip': '唯',
		'wanggou': 'QQ',
		'vjia': '凡',
		'vancl': '凡',
		'moonbasa': '梦',
		'coo8': '库',
		'm18': '麦',
		'xiu': '走',
		'mbaobao': '卖',
		'justyle': 'justyle',
		'hstyle': '韩',
		'liebo': '裂',
		'ochirly': '欧',
		'hg-daigou': '韩',
		'htjz': '核',
		'meilishuo': '美',
		'mogujie': '蘑',
		'gome': '国'
	};
	module.exports = {
		fetch: function () {

			//设置是否地区差异
			opLocal = utils.ipLocalCity().match(/杭州|北京/);

			//### 获取同款数据 ###
			getJSONP({
				url: api.taobao(),

				done: function (data) {
					/*apiData = {
					 sid: data.sid,
					 pType: data.pType,
					 mType: data.mType,
					 price: data.price,
					 promoPrice: data.promoPrice,
					 itemId: data.itemId,
					 resultType: data.resultType,
					 isTtsCategory: data.isTtsCategory,
					 cid: data.cid
					 };*/
					var sexCid = '';
					//当前商品价格
					var CurProductPrice = Product.item.getPrice(),
						minPrice;

					if (data.isTtsCategory) {
						//sexCid += '&cid=' + Product.item.getCid() + '';
						if (typeof data.sex !== 'undefined') {
							sexCid += '&sex=' + data.sex;
						}
					}
					//获取促销价用的商品ID
					var idList = '',
					//noSourceProduct = '',

					//有相似商品
						isSimilarList = false,

					//结果类型
						dimension = '',

					//No found product
						isNoFound = false;

					if (data.similarList[0]) {
						isSimilarList = true;
					}

					if (host.isMLSList || host.isMGJList) {
						//没有相似商品，并且没有同款商品，判定为无同款
						if ((isSimilarList === false) && (data.sameList.length === 0)) {
							isNoFound = true;
						}
					} else if ((data.sameList.length === 0) && (data.similarList.length === 0)) {
						isNoFound = true;
					}

					//Format product
					function formatList(list, type) {
						var ty = '_tuijian';
						if (type === 'same') {
							ty = '_bijia';
						}
						//是否有原品
						//var hasSourceProduct = false;



						_.each(list, function (product, index) {
							//Change product link
							if (!isNoFound) {
								//product.clickUrl = transfer(product.clickUrl, product.ttsid);
								product.clickUrl = transfer(product);
							}

							if ('webSite' in product && product.webSite) {
								product.webSiteTitle = webSiteMapShort[product.webSite];
								if ('shopType' in product) {
									if (product.webSite === 'taobao' || product.webSite === 'tmall') {
										product.shopOwner = false;
									} else {
										product.shopOwner = true;
									}
								}
							}

							//格式化价格
							if (product.promoPrice.toString().length >= 7) {
								if (product.promoPrice.toString().match(/./)) {
									product.promoPrice = product.promoPrice.toString().replace(/\..{2}/, "");
								}
								return;
							}

							//Product click stat
							/*if (typeof product.promoPrice === 'undefined') {
							 product.promoPrice = product.price;
							 }*/

							product.index = index;

							//将 mType 写入每个商品
							if (data.mType) {
								product.mType = data.mType;
							}

							//similar字段下的 商品跳主站detail
							/*if (type === 'similar') {
							 if (data.mType.length === 2) {
							 product.mType = data.mType.charAt(1);
							 }
							 //product.clickUrl = utils.getRecomUrl(product.ttsid, product.sourceId);
							 }*/

							if (product.webSite.match(/taobao|tmall/)) {
								//拼接促销价 URL
								idList += product.sourceId + ',';
							} else if (product.webSite === 'jd.com') {
								product.webSite = 'jd';
								if (product.sales <= 0) {
									product.sales = false;
								}
								product.com = product.feedbackCount;
							}
							//拼接促销价 URL
							//idList += product.sourceId + ',';
							//复制一份给sameIds 对同类进行排重
							//sameIds = idList;
							//### 商品标签相关逻辑 ###
							if (_.isArray(product.tag)) {
								//将中文标签转化为英文
								//    * 省钱: price
								//    * 热销: sum
								//    * 信誉: credit
								//    * 原品: source
								//    * 省钱+原品: price-source
								_.each(product.tag, function (item, index) {
									if (item === '省钱') {
										product.tag[index] = 'price';
									}
									if (item === '热销') {
										product.tag[index] = 'sum';
									}
									if (item === '信誉') {
										product.tag[index] = 'credit';
									}
								});
								//销量为0 剔除热销标签
								if (product.commissionNum === '0') {
									product.tag = _.without(product.tag, 'sum');
								}
								//原品标签
								//20140319 不给原品上标签
								/*if (data.itemId === product.sourceId.toString()) {
								 if (!product.tag.toString().match(/source/)) {
								 product.tag.push('source');
								 }
								 //添加原品标识
								 $.extend(product, {
								 isSource: true
								 });
								 hasSourceProduct = true;
								 }*/

								//复制一份标签，在取到促销价的时候重新排序标签
								//不包括“省钱”标签
								/*product.tagClone = _.without(product.tag, 'price');
								 product.tag = sortTag(product.tag);*/
							}
						});

						/*if (hasSourceProduct === false) {
						 noSourceProduct = type;
						 }*/
						//Sort and update list
						if (type === 'same') {
							//Get min price
							minPrice = _.min(list, function (item) {
								return parseFloat(item.promoPrice);
							});
							if (parseInt(minPrice.promoPrice.replace(/\./, ''), 10) < parseInt(CurProductPrice, 10)) {
								minPrice.isMin = true;
								/*if (_.isArray(minPrice.tag)) {
								 minPrice.tag.unshift('price');
								 } else {
								 minPrice.tag = ['price'];
								 }*/
							}
							//Sort list
							/*list = _.without(list, minPrice);
							 list.unshift(minPrice);*/
						}
					}

					var underTkData = {
						id: data.itemId,
						title: Product.item.getTitle(),
						href: Product.item.getHref(),
						img: data.picUrl
					};
					_.extend(data, {
						app: prefix.app,
						noFound: false,
						more: utils.getUndertakePage(underTkData) + '&utm_source=' + utils.site() + '_more' + sexCid +
						'&price=' + encodeURIComponent(Product.item.getPrice()) + '&sales=' + Product.item.getSum()
					});

					//同款比价
					if (data.sameList[0]) {
						formatList(data.sameList, 'same');
						dimension = data.sameList[0].dimension;
					}
					//相似既为推荐
					if (data.similarList[0]) {
						formatList(data.similarList, 'similar');
						dimension = data.similarList[0].dimension;
					}

					data.dimension = dimension;

					body.trigger('tk.sync.success', [data]);

					//### Get promo price ###
					if (idList !== '') {
						//多做一次请求  对数据不做处理  二次请求才做处理
						getJSONP({
							url: PROMO_PRICE_API_GET,
							data: {
								auction_ids: idList,
								feature_names: 'feedbackCount,promoPrice',
								from: 'taobao_search'
							},

							done: function () {
								getJSONP({
									url: PROMO_PRICE_API_GET,
									data: {
										auction_ids: idList,
										feature_names: 'feedbackCount,promoPrice',
										from: 'taobao_search'
									},

									done: function (promoPriceData) {
										var promoPrice,
											hasPromoPrice = false,
										//same = data.sameList,
											hasCom = false,
											minPrice,
											com;

										//促销价与原价对比，取最低价格
										function getPromoPrice(promoPriceData, id, price) {
											id = parseInt(id, 10);
											var result = false;
											$.each(promoPriceData, function (i, item) {
												//匹配促销价接口和原商品的ID
												if (parseInt(item.auction_id, 10) === id &&
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

										//获取评论数
										function getCom(promoPriceData, id) {
											id = parseInt(id, 10);
											var proCom = false;
											$.each(promoPriceData, function (i, item) {
												//匹配促销价接口和原商品的ID
												if (parseInt(item.auction_id, 10) === id) {
													proCom = item.feedbackCount;
												}
											});

											return proCom;
										}

										function sortList(list, type) {
											$.each(list, function (i, item) {
												promoPrice = getPromoPrice(promoPriceData, item.sourceId, item.price);
												com = getCom(promoPriceData, item.sourceId);
												if (typeof item.isMin !== 'undefined' && item.isMin) {
													item.isMin = false;
												}

												if (promoPrice) {
													hasPromoPrice = true;
													//显示原价  原价比促销价低
													if (promoPrice < item.price) {
														item.oriPrice = item.price;
													} else {
														delete item.oriPrice;
													}
													item.promoPrice = promoPrice;
												}

												if (item.tag) {
													//删除省钱标签
													item.tag = _.without(item.tag, 'price');
													//销量为0不打热销标签
													if (item.commissionNum === '0') {
														item.tag = _.without(item.tag, 'sum');
													}
												}
												if (com && com !== '0') {
													hasCom = true;
													item.com = com;
												}
											});
											//Sort and update list
											if (type === 'same') {
												//当前商品价格
												var CurProductPrice = Product.item.getPrice();
												//Get min price
												minPrice = _.min(list, function (item) {
													return parseFloat(item.promoPrice);
												});
												if (parseInt(minPrice.promoPrice.replace(/\./, ''), 10) < parseInt(CurProductPrice, 10)) {
													minPrice.isMin = true;
													/*if (_.isArray(minPrice.tag)) {
													 minPrice.tag.unshift('price');
													 } else {
													 minPrice.tag = ['price'];
													 }*/
												}
												//Sort list
												/*list = _.without(list, minPrice);
												 list.unshift(minPrice);*/
											}
											return list;
										}

										//同款为比价
										if (data.sameList[0]) {
											data.sameList = sortList(data.sameList, 'same');
											if (host.isTBList || host.isTMList) {
												utils.ttkCollect(data.sameList);
											}
										}
										//相似为推荐
										if (data.similarList[0]) {
											data.similarList = sortList(data.similarList, 'similar');
											if (host.isTBList || host.isTMList) {
												utils.ttkCollect(data.similarList);
											}
										}


										if (hasPromoPrice || hasCom) {
											body.trigger('tk.sync.promoprice', [data]);
										}
									}
								});
							}
						});
					}
					else {
						body.trigger('tk.sync.promoprice', [data]);
					}
				},

				fail: function () {
					body.trigger('tk.sync.fail', ['不妙！高峰期遭遇堵车，请稍后再试。']);
				}
			});
		},
		reCom: function () {

			var key, url, cid, isHome, count, introProduct, dataList, jxOrientJSONP, jxCategoryJSONP, adsJSONP,
				adsData = [],
				jxOrientDeferred = new $.Deferred(),
				jxCategoryDeferred = new $.Deferred();

			if (host.isHomeTaobao || host.isHomeTmall || host.isHomeJD || host.isHomeMGJ || host.isHomeMLS || host.isHomeVIP || host.isHomeSuning ||
				host.isYHDHome || host.isHomeJiuxian || host.isHomeJumei || host.isHomeDD || host.isHomeAMX || host.isHomeZhe800 || host.isHomeNuomi || host.isHomePaipai || host.isHomeMeituan) {
				isHome = true;
				count = 15;
			} else {
				isHome = false;
				count = 15;
			}

			jxOrientJSONP = function () {

				if (!isHome) {

					jxOrientDeferred.resolve();

				} else {
					getJSONP({
						url: api.juXiao(key, url),
						done: function (mediav) {
							if (mediav[0]) {
								//接口数据结构 太傻逼了！
								//list页 数据结构不一样

								//下标第一位是数组
								if (mediav[0][0]) {
									$.each(mediav, function (i, item) {
										item[1].clickUrl = item[1].curl1;
										item[1].picUrl = item[1].timg;
										item[1].title = item[1].pn;
										item[1].ttsid = 0;
										item[1].promoPrice = item[1].price;
										adsData.push(item[1]);
									});
								} else {
									//第一个数据 为商品类型信息；剔除
									mediav = mediav.slice(1);
									//格式化 juxiao数据
									$.each(mediav, function (i, item) {
										item.clickUrl = item.curl1;
										item.picUrl = item.timg;
										item.title = item.pn;
										item.ttsid = 0;
										item.promoPrice = item.price;
										adsData.push(item);
									});
								}
							}
							if (adsData.length < count) {
								jxOrientDeferred.resolve();

							} else {
								dataList.proList = adsData;
								body.trigger('tk.recom.success', [dataList]);

							}
						},
						fail: function () {

							jxOrientDeferred.resolve();
						}
					});
				}
			};

			jxCategoryJSONP = function () {

				getJSONP({
					url: api.juXiaoList(key, url, cid),
					done: function (mediav) {
						if (mediav[0]) {

							//接口数据结构 太傻逼了！
							//if (host.isTMList || host.isTBList || host.isB2CList) {
							//list页 数据结构不一样

							//下标第一位是数组
							if (mediav[0][0]) {
								$.each(mediav, function (i, item) {
									item[1].clickUrl = item[1].curl1;
									item[1].picUrl = item[1].timg;
									item[1].title = item[1].pn;
									item[1].ttsid = 0;
									item[1].promoPrice = item[1].price;
									adsData.push(item[1]);
								});
							} else {
								//第一个数据 为商品类型信息；剔除
								mediav = mediav.slice(1);
								//格式化 juxiao数据
								$.each(mediav, function (i, item) {
									item.clickUrl = item.curl1;
									item.picUrl = item.timg;
									item.title = item.pn;
									item.ttsid = 0;
									item.promoPrice = item.price;
									adsData.push(item);
								});
							}
						}

						if (adsData.length < count) {

							jxCategoryDeferred.resolve();
						} else {

							dataList.proList = adsData;
							body.trigger('tk.recom.success', [dataList]);
						}
					},
					fail: function () {

						jxCategoryDeferred.resolve();
					}
				});
			};

			adsJSONP = function () {

				getJSONP({
					url: api.ads(key),
					done: function (mediav) {
						if (mediav[0]) {

							$.each(mediav, function (i, item) {
								item.clickUrl = 'http://search.taotaosou.com/transfer.htm?' + item.href;
								//item.clickUrl = item.href;
								item.picUrl = item.media;
								item.title = item.title;
								item.ttsid = 0;
								item.promoPrice = item.price;
								adsData.push(item);
							});
						}
						if (adsData.length < count) {
							$.each(introProduct.proList, function (i, item) {
								adsData.push(item);

							});
							dataList.proList = adsData;

							body.trigger('tk.recom.success', [dataList]);

						} else {
							dataList.proList = adsData;
							body.trigger('tk.recom.success', [dataList]);
						}
					},
					fail: function () {

						dataList.proList = adsData;
						body.trigger('tk.recom.success', [dataList]);
					}
				});
			};

			jxOrientDeferred.promise().then(jxCategoryJSONP);
			jxCategoryDeferred.promise().then(adsJSONP);

			getJSONP({
				url: api.reCom(),
				data: apiData,

				done: function (data) {
					if (!data || !('proList' in data) || !data.proList[0]) {
						return false;
					}

					key = data.proList[0].title;
					url = data.proList[0].clickUrl;
					cid = data.proList[0].productCategoryCode;

					if (host.isTMList || host.isTBList || host.isB2CList) {
						data.list = 'http://search.taotaosou.com/search/text?keyword=' + encodeURIComponent(data.keyword);
						data.host = 'TTS-list';
					} else {
						data.list = false;
						data.host = 'TTS-list TTS-home';
					}

					//如果是recom传回的数据中含有sourceid，则将clickUrl改成跳转到超级99.
					/*if (!utils.ipLocalCity().match(/杭州||北京/)) {
					 _.each(data.proList[0], function (item, i) {
					 if (i.sourceId) {
					 i.clickUrl = 'http://www.chaoji99.com/item.html?sourceId=' + i.sourceId + '&website=taobao&syt=ttk';
					 }
					 });
					 }*/
					$.each(data.proList, function (i, data) {
						/*data.clickUrl = 'http://item.taotaosou.com/' + data.ttsid +
						 '.html?utm_medium=ttk&utm_source=' + utils.site();*/

						data.clickUrl = transfer(data, data.ttsid);

						if (data.webSite === 'jd.com') {
							data.webSite = 'jd';
						}
						//data.picUrl = data.picUrl.replace(/gi.+mlist/, 'img') + '_200x200.jpg';
						data.picUrl = data.picUrl.replace(/gi.+mlist/, 'img');
					});

					dataList = introProduct = data;

					jxOrientJSONP();

				},
				fail: function () {
					body.trigger('tk.recom.fail', ['不妙！高峰期遭遇堵车，请稍后再试。']);

				}
			});
		}
	};
});

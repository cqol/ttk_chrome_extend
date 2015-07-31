__tk__define(function (require, exports, module) {
	var $ = require('../lib/jquery'),
		getJSONP = require('./jsonp'),
		api = require('./api'),
		Product = require('../product'),
		host = require('../host'),
		env = require('../utils/env'),
		utils = require('../utils'),
		$body = $('body');
	module.exports = {
		fetch: function (cateType, cateId) {

			getJSONP({
				url: api.cps(cateType, cateId),
				done: function (data) {
					utils.statLog_one({
						systemName: "ttk_recommend_api_pv_log",
						cType: 1,
						sPid: Product.item.getID(),
						cid: Product.item.getCid(),
						length: data.length
					});
					if (typeof data === 'undefined') {
						data = [];
					}
					if (data[0]) {
						var kk = function (title) {
							var a;
							if (host.isTBDetail || host.isTMDetail) {
								a = '&cateId=' + Product.item.getCid();
							} else {
								a = '&keyword=' + encodeURIComponent(title);
							}
							return a;
						};

						$.each(data, function (i, item) {
							if (item.href.match(/click.kc.taotaosou.com\/rc.do/)) {
								//广告数据
								item.stat = 1;
								item.clickUrl = 'http://search.taotaosou.com/transfer.htm?' +  item.href + '#tts_bj';
							} else {
								//广告类目页
								item.stat = 2;

								item.clickUrl = 'http://www.taotaosou.com/itemlist/commend.html?title=' + encodeURIComponent(item.title) +
									'&media=' + item.media +
									'&price=' + item.price +
									'&pid=360' + kk(item.title) +
									'&href=' + encodeURIComponent(item.href) + '#tts_bj';
							}
							item.picUrl = item.media + "_90x90.jpg";
							item.ttsid = 0;
							item.sourceId = "0";
							item.promoPrice = item.price;
						});
					}

					//juxiao 广告
					var mediApi = env.juxiao() + '/s?showid=lsKQuS&type=1&of=4&impct=9&qhtid=114078&qhcn=' + utils.getCid() +
						'&qhtag=' + encodeURIComponent(Product.item.getTitle()) +
						'&jsonp=?&ref=';
					if (host.isTBDetail) {
						mediApi += encodeURIComponent('http://item.taobao.com/item.htm?id=' + Product.item.getID());
					} else if (host.isTMDetail) {
						mediApi += encodeURIComponent('http://detail.tmall.com/item.htm?id=' + Product.item.getID());
					} else {
						mediApi += encodeURIComponent(document.location.href);
					}
					getJSONP({
						url: mediApi,
						timeout: 10000,
						done: function (mediav) {
							utils.statLog_one({
								systemName: "ttk_recommend_api_pv_log",
								cType: 4,
								sPid: Product.item.getID(),
								cid: Product.item.getCid(),
								length: mediav.length
							});
							var juxiaoDate = [];
							if (mediav[0]) {
								$.each(mediav, function (i, item) {
									item[1].clickUrl = item[1].curl1;
									item[1].picUrl = item[1].pimg;
									item[1].title = item[1].pn;
									item[1].ttsid = 0;
									item[1].sourceId = "0";
									item[1].stat = 4;
									item[1].promoPrice = item[1].price;
									juxiaoDate.push(item[1]);
									data.push(item[1]);
								});
							}

							//商品不足 自己广告补充
							$.each(data, function (i, item) {
								juxiaoDate.push(item);
							});


							//找了又找 商品；
							if (data.length < 9) {
								getJSONP({
									url: '//showkc.taotaosou.com/findAndFind.do?title=%E7%8C%9C%E4%BD%A0%E5%96%9C%E6%AC%A2%E6%8E%A8%E8%8D%90&website=taobao&cateType=false&cateId=162103&guid=736A5476AA76ACF5D084C74B8C996F97&itemSize=9&pid=278_' + utils.DITCH_ID +
									'&callback=?&cid=162103&ditch=' + utils.DITCH_ID,
									done: function (uidate) {
										utils.statLog_one({
											systemName: "ttk_recommend_api_pv_log",
											cType: 5,
											sPid: Product.item.getID(),
											cid: Product.item.getCid(),
											length: uidate.length
										});
										if (uidate[0]) {

											$.each(uidate, function (i, item) {
												item.stat = 5;
												item.clickUrl = 'http://search.taotaosou.com/transfer.htm?' + item.href + '#tts_bj';
												item.picUrl = item.media + "_90x90.jpg";
												item.ttsid = 0;
												item.sourceId = "0";
												item.promoPrice = item.price;
												data.push(item);
												juxiaoDate.push(item);

											});

										}
										if (data.length < 9) {
											getJSONP({
												url: api.lds(),
												done: function (adData) {
													if ('recomList' in adData) {
														utils.statLog_one({
															systemName: "ttk_recommend_api_pv_log",
															cType: 3,
															sPid: Product.item.getID(),
															cid: Product.item.getCid(),
															length: adData.length
														});

														$.each(adData.recomList, function (i, item) {
															if (item.promoPrice === '0') {
																item.promoPrice = item.price;
															}
															item.clickUrl = 'http://item.taotaosou.com/' + item.ttsid +
																'.html?utm_medium=ttk&utm_source=' + utils.site() +
																'_rec';
															//找了又找 推荐
															item.stat = 3;
															item.picUrl = item.picUrl + "_90x90.jpg";
															data.push(item);
														});
													} else {
														return false;
													}

													//商品不足 自己广告补充
													$.each(adData.recomList, function (i, item) {
														juxiaoDate.push(item);
													});
													$body.trigger('juxiao.tts.success', [{'recomList': juxiaoDate}]);
												}
											});
										} else {
											$body.trigger('juxiao.tts.success', [{'recomList': juxiaoDate}]);
										}
									}
								});
							} else {
								$body.trigger('juxiao.tts.success', [{'recomList': juxiaoDate}]);
							}
						},
						fail: function () {
							if (data.length < 9) {
								getJSONP({
									url: api.lds(),
									done: function (adData) {
										if ('recomList' in adData) {
											$.each(adData.recomList, function (i, item) {
												if (item.promoPrice === '0') {
													item.promoPrice = item.price;
												}
												item.clickUrl = 'http://www.taotaosou.com/itemlist/commend.html?title=' + encodeURIComponent(item.title) +
													'&media=' + item.picUrl +
													'&price=' + item.promoPrice +
													'&pid=360' +
													'&keyword=' + encodeURIComponent(item.title) +
													'&href=' + encodeURIComponent(item.clickUrl) + '#tts_bj';
												item.clickUrl = 'http://item.taotaosou.com/' + item.ttsid +
													'.html?utm_medium=ttk&utm_source=' + utils.site() +
													'_rec';
												item.stat = 3;
												data.push(item);
											});
										} else {
											return false;
										}
										$body.trigger('juxiao.tts.success', [{'recomList': data}]);
									}
								});
							} else {
								$body.trigger('juxiao.tts.success', [{'recomList': data}]);
							}
						}
					});
				}
			});
		}
	};
});

__tk__define(function (require, exports, module) {
	var $ = require('../lib/jquery'),
		getJSONP = require('./jsonp'),
		api = require('./api'),
		Product = require('../product'),
		host = require('../host'),
		utils = require('../utils'),
		env = require('../utils/env'),
		$body = $('body');

	//地域判断
	var opLocal = false;
//recom.taotaosou.com/getShowRecom.do接口返回数据的clickUrl替换成跳转到超级99
	var transfer = function (product) {
		var TRANSFER_POST = product.clickUrl,
			throughtCPS;


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
				'.html?utm_medium=ttk&utm_source=' + utils.site() +
				'_rec';
		}

		return TRANSFER_POST;
	};

	module.exports = {
		fetch: function (cateType, cateId) {
			//设置是否地区差异
			opLocal = utils.ipLocalCity().match(/杭州|北京/);

			var random = utils.selectFrom(0, 99);
			//true juxiao优先
			var flag = function () {
				if (random > MEDIA_config.thirdPartAd) {
					return true;
				} else {
					return false;
				}
			}();
			//juxiao 广告
			var mediApi = env.juxiao() + '/s?showid=yKlH0l&type=1&of=4&impct=9&qhtid=114078&qhcn=' + utils.getCid() +
				'&qhtag=' + encodeURIComponent(Product.item.getTitle()) +
				'&jsonp=?&ref=';
			if (host.isTBDetail) {
				mediApi += encodeURIComponent('http://item.taobao.com/item.htm?id=' + Product.item.getID());
			} else if (host.isTMDetail) {
				mediApi += encodeURIComponent('http://detail.tmall.com/item.htm?id=' + Product.item.getID());
			} else {
				mediApi += encodeURIComponent(document.location.href);
			}
			var data = [];
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
							item[1].picUrl = item[1].timg;
							item[1].title = item[1].pn;
							item[1].ttsid = 0;
							item[1].sourceId = "0";
							item[1].stat = 4;
							item[1].promoPrice = item[1].price;
							juxiaoDate.push(item[1]);
							//data.push(item[1]);
						});
					}

					//商品不足 自己广告补充
					$.each(data, function (i, item) {
						juxiaoDate.push(item);
					});


					//找了又找 商品；
					if (data.length < 9) {
						getJSONP({
							url: api.cps(cateType, cateId),
							done: function (dd) {
								utils.statLog_one({
									systemName: "ttk_recommend_api_pv_log",
									cType: 1,
									sPid: Product.item.getID(),
									cid: Product.item.getCid(),
									length: dd.length
								});
								if (typeof dd === 'undefined') {
									dd = [];
								}
								if (dd[0]) {
									var kk = function (title) {
										var a;
										if (host.isTBDetail || host.isTMDetail) {
											a = '&cateId=' + Product.item.getCid();
										} else {
											a = '&keyword=' + encodeURIComponent(title);
										}
										return a;
									};

									$.each(dd, function (i, item) {
										if (item.href.match(/click.kc.taotaosou.com\/rc.do/)) {
											//广告数据
											item.stat = 1;
											item.clickUrl = 'http://search.taotaosou.com/transfer.htm?' + item.href + '#tts_bj';
										} else {
											//广告类目页
											item.stat = 2;

											item.clickUrl = 'http://www.taotaosou.com/itemlist/commend.html?title=' + encodeURIComponent(item.title) +
												'&media=' + item.media +
												'&price=' + item.price +
												'&pid=360' + kk(item.title) +
												'&href=' + encodeURIComponent(item.href) + '#tts_bj';
										}
										item.picUrl = item.media;
										item.ttsid = 0;
										item.sourceId = "0";
										item.promoPrice = item.price;
										data.push(item);
										juxiaoDate.push(item);

									});
								}
								if (data.length < 9) {

									getJSONP({
										url: '//showkc.taotaosou.com/findAndFind.do?title=%E7%8C%9C%E4%BD%A0%E5%96%9C%E6%AC%A2%E6%8E%A8%E8%8D%90&website=taobao&cateType=false&cateId=162103&guid=736A5476AA76ACF5D084C74B8C996F97&itemSize=9&pid=278&callback=?&cid=162103',
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

													item.picUrl = item.media;
													item.ttsid = 0;
													item.sourceId = "0";
													item.promoPrice = item.price;
													data.push(item);
													juxiaoDate.push(item);

												});
												if (mediav[0]) {
													$.each(mediav, function (i, item) {
														item[1].clickUrl = item[1].curl1;
														item[1].picUrl = item[1].timg;
														item[1].title = item[1].pn;
														item[1].ttsid = 0;
														item[1].sourceId = "0";
														item[1].stat = 4;
														item[1].promoPrice = item[1].price;
														//juxiaoDate.push(item[1]);
														data.push(item[1]);
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
																	item.clickUrl = transfer(item);
																	//找了又找 推荐
																	item.stat = 3;
																	data.push(item);
																});
															} else {
																return false;
															}

															//商品不足 自己广告补充
															$.each(adData.recomList, function (i, item) {
																juxiaoDate.push(item);
															});

															if (flag) {
																$body.trigger('lds.sync.success', [{'recomList': juxiaoDate}]);
															} else {
																$body.trigger('lds.sync.success', [{'recomList': data}]);
															}

														}
													});
												} else {

													if (flag) {
														$body.trigger('lds.sync.success', [{'recomList': juxiaoDate}]);
													} else {
														$body.trigger('lds.sync.success', [{'recomList': data}]);
													}
												}
											} else {

												if (mediav[0]) {
													$.each(mediav, function (i, item) {
														item[1].clickUrl = item[1].curl1;
														item[1].picUrl = item[1].timg;
														item[1].title = item[1].pn;
														item[1].ttsid = 0;
														item[1].sourceId = "0";
														item[1].stat = 4;
														item[1].promoPrice = item[1].price;
														//juxiaoDate.push(item[1]);
														data.push(item[1]);
													});
												}
												//最后逻辑
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
																	item.clickUrl = transfer(item);
																	//找了又找 推荐
																	item.stat = 3;
																	data.push(item);
																});
															} else {
																return false;
															}

															//商品不足 自己广告补充
															$.each(adData.recomList, function (i, item) {
																juxiaoDate.push(item);
															});

															if (flag) {
																$body.trigger('lds.sync.success', [{'recomList': juxiaoDate}]);
															} else {
																$body.trigger('lds.sync.success', [{'recomList': data}]);
															}

														}
													});
												} else {
													if (flag) {
														$body.trigger('lds.sync.success', [{'recomList': juxiaoDate}]);
													} else {
														$body.trigger('lds.sync.success', [{'recomList': data}]);
													}
												}

											}
										}
									});
								} else {
									if (flag) {
										$body.trigger('lds.sync.success', [{'recomList': juxiaoDate}]);
									} else {
										$body.trigger('lds.sync.success', [{'recomList': data}]);
									}
								}
							}
						});
					}
					else {

						if (flag) {
							$body.trigger('lds.sync.success', [{'recomList': juxiaoDate}]);
						} else {
							$body.trigger('lds.sync.success', [{'recomList': data}]);
						}

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
										/*item.clickUrl = 'http://www.taotaosou.com/itemlist/commend.html?title=' + encodeURIComponent(item.title) +
										 '&media=' + item.picUrl +
										 '&price=' + item.promoPrice +
										 '&pid=360' +
										 '&keyword=' + encodeURIComponent(item.title) +
										 '&href=' + encodeURIComponent(item.clickUrl) + '#tts_bj';*/

										item.clickUrl = transfer(item);
										item.stat = 3;
										data.push(item);
									});
								} else {
									return false;
								}
								if (data.length < 9) {
									getJSONP({
										url: api.cps(cateType, cateId),
										done: function (dd) {
											utils.statLog_one({
												systemName: "ttk_recommend_api_pv_log",
												cType: 1,
												sPid: Product.item.getID(),
												cid: Product.item.getCid(),
												length: dd.length
											});
											if (typeof dd === 'undefined') {
												dd = [];
											}
											if (dd[0]) {
												var kk = function (title) {
													var a;
													if (host.isTBDetail || host.isTMDetail) {
														a = '&cateId=' + Product.item.getCid();
													} else {
														a = '&keyword=' + encodeURIComponent(title);
													}
													return a;
												};

												$.each(dd, function (i, item) {
													if (item.href.match(/click.kc.taotaosou.com\/rc.do/)) {
														//广告数据
														item.stat = 1;
														item.clickUrl = 'http://search.taotaosou.com/transfer.htm?' + item.href + '#tts_bj';
													} else {
														//广告类目页
														item.stat = 2;

														item.clickUrl = 'http://www.taotaosou.com/itemlist/commend.html?title=' + encodeURIComponent(item.title) +
															'&media=' + item.media +
															'&price=' + item.price +
															'&pid=360' + kk(item.title) +
															'&href=' + encodeURIComponent(item.href) + '#tts_bj';
													}
													item.picUrl = item.media;
													item.ttsid = 0;
													item.sourceId = "0";
													item.promoPrice = item.price;
													data.push(item);
												});
											}
											$body.trigger('lds.sync.success', [{'recomList': data}]);
										}
									});
								} else {
									$body.trigger('lds.sync.success', [{'recomList': data}]);
								}
							}
						});
					} else {
						$body.trigger('lds.sync.success', [{'recomList': data}]);
					}
				}
			});
		}
	};
});

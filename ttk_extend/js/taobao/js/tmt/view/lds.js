/**
 * 插入广告
 */
__tk__define(function (require, exports, module) {
	var utils = require('../utils'),
		$ = require('../lib/jquery.min'),
		getJSONP = require('../lib/jsonp'),
		host = require('../host'),
		body = $('body');

	var Drag = require('../lib/dragdrop'),
		LdsSlide = require('../lib/ldsSlide'),
		templates = require('../templates.jst');
	//require('../lib/handlebars');


	function Render(data) {
		if (typeof data.recomList === 'undefined' || !data.recomList[0]) {
			html = '<div id="TK-lds-default"></div>';
			$('#J-TK-lds-bd-con').append(html);
			//无结果埋点
			utils.stat("ReNoresult", true);
			return false;
		}
		if (data.recomList.length > 9) {
			//data.recomList.splice(0, 6);
			data.recomList.length = 9;
		}
		//数据长度
		this.length = data.recomList.length;
		//轮播数
		this.total;
		this.sTyp = data.resultType;
		this.init(data);
	}
	Render.prototype = {
		init: function (data) {
			var tmpl = '<div class=\"TK-lds-wrap\">    <div id=\"J-TK-lds-con\" class=\"TK-lds-con\">        <div class=\"TK-lds-icon\"></div>        <div id=\"J-TK-lds-slide\">            <span class=\"TK-lds-close\">x</span>            <span id=\"J-TK-lds-prev\" class=\"TK-lds-prev\"></span>            <span id=\"J-TK-lds-next\" class=\"TK-lds-next\"></span>            <div id=\"J-TK-lds-hd\" class=\"TK-lds-hd\">            </div>            <div class=\"TK-lds-bd\">                <div id=\"J-TK-lds-bd-con\" class=\"TK-lds-bd-con\">                </div>            </div>        </div>    </div></div>',
			//var tmpl = templates['bijia/txt.box'],
				_this = this;
			$(tmpl).appendTo(body);
			//body.append(tmpl(data))
			var	length = data.recomList.length,
				total;

			//获取总分组
			switch (true) {
				case length === 0:
					total = 0;
					break;

				case length < 4:
					total = 1;
					break;

				case length < 7:
					total = 2;
					break;

				case length < 10:
					total = 3;
					break;

				case length < 13:
					total = 4;
					break;
			}
			this.total = total;

			var html0 = '<ul>', html1 = '<ul>', html2 = '<ul>', html3 = '<ul>';

			if (total) {
				for (var i in data.recomList) {
					/*if (data.recomList[i].ttsid) {
					 // http://199.155.122.129:8080/pages/viewpage.action?pageId=19628687
					 var outerCode = utils.isManualDId ? 'outer_code=ttk001' : 'outer_code=rec001';
					 if (host.isTMDetail) {
					 var clickUrl = "http://search.taotaosou.com/transfer.htm?http://item.taotaosou.com/" + data.recomList[i].ttsid + ".html?utm_source=TM_Detail_rec&utm_medium=ttk&utm_campaign=detail&" + outerCode;
					 } else if (host.isTBDetail) {
					 var clickUrl = "http://search.taotaosou.com/transfer.htm?http://item.taotaosou.com/" + data.recomList[i].ttsid + ".html?utm_source=TB_Detail_rec&utm_medium=ttk&utm_campaign=detail&" + outerCode;
					 }
					 } else {
					 //var clickUrl = data.recomList[i].clickUrl;
					 var clickUrl = "http://search.taotaosou.com/transfer.htm?" + data.recomList[i].clickUrl;
					 }*/
					switch (true) {
						case i < 3:
							html0 += '<li class="TK-lds-item"><a title="' + data.recomList[i].title + '" href="' + data.recomList[i].clickUrl + '" target="_blank" class="TK-lds-link" data-log="{\"price\":\"'+ data.recomList[i].price +'\", \"promoPrice\":\"'+ data.recomList[i].promoPrice +'\", \"sourceId\":\"'+ data.recomList[i].sourceId +'\"}" data-stat="'+ data.recomList[i].stat +'"><img src="' + data.recomList[i].picUrl + '" alt=""/></a><p class="TK-lds-price"><span>&yen</span>' + data.recomList[i].promoPrice + '</p></li>';
							break;

						case i < 6:
							html1 += '<li class="TK-lds-item"><a title="' + data.recomList[i].title + '" href="' + data.recomList[i].clickUrl + '" target="_blank" class="TK-lds-link" data-stat="'+ data.recomList[i].stat +'"><img src="' + data.recomList[i].picUrl + '" alt=""/></a><p class="TK-lds-price"><span>&yen</span>' + data.recomList[i].promoPrice + '</p></li>';
							break;

						case i < 9:
							html2 += '<li class="TK-lds-item"><a title="' + data.recomList[i].title + '" href="' + data.recomList[i].clickUrl + '" target="_blank" class="TK-lds-link" data-stat="'+ data.recomList[i].stat +'"><img src="' + data.recomList[i].picUrl + '" alt=""/></a><p class="TK-lds-price"><span>&yen</span>' + data.recomList[i].promoPrice + '</p></li>';
							break;

						case i < 12:
							html3 += '<li class="TK-lds-item"><a title="' + data.recomList[i].title + '" href="' + data.recomList[i].clickUrl + '" target="_blank" class="TK-lds-link" data-stat="'+ data.recomList[i].stat +'"><img src="' + data.recomList[i].picUrl + '" alt=""/></a><p class="TK-lds-price"><span>&yen</span>' + data.recomList[i].promoPrice + '</p></li>';
							break;
					}
				}
			}
			html0 += "</ul>";
			html1 += "</ul>";
			html2 += "</ul>";
			html3 += "</ul>";
			//选择要载入的数据
			var html = "", html_li = "";
			for (var iii = 0; iii < total; iii++) {
				html += eval("html" + iii);
			}
			this.html = html;
			this.renderBox();
			utils.stat("Redis", true);
			utils.statLog_one({
				systemName: "ttk_recommend_dis_log",
				//匹配类型
				sTyp: _this.sTyp,
				//源品商品id
				sPid: '',
				//原价
				sPric: '',
				//促销价
				sProPric: '',
				//类目id
				cid: '',
				//推荐商品总数
				Num: this.total,
				//推荐结果页码(当前第几页)
				pNum: 0,
				// 展现的商品个数
				rNum: this.length,
				// 被展现的商品(此处是促销价格)
				rList: '',
				ptype: ''
			});
		},
		renderBox: function () {
			var container = $('#J-TK-lds-bd-con'),
				icon = $('.TK-lds-icon'),
				slideCon = document.getElementById('J-TK-lds-con'),
				slideBox = document.getElementById('J-TK-lds-slide');
			$(this.html).appendTo(container);
			/*if (host.isTBDetail) {
			 slideCon.style.right = '42px';
			 }*/

			new LdsSlide(slideCon);
			this.icon = icon;
			this.slideBox = slideBox;
			this.slideCon = slideCon;
			this.renderEvent(slideCon);
		},
		renderEvent: function (slideCon) {
			var _this = this;
			//var dragableBtn =	new Dragdrop(slideCon);
			var dragableBtn =	new Drag(slideCon, document.getElementById('J-TK-lds-hd'));
			var dragableIcon =new Drag(slideCon, this.icon[0], true);
			$('.TK-lds-close').on('click', function () {
				$('#J-TK-lds-slide').animate({height:0},'fast', 'swing', function () {
					_this.slideBox.style.display = 'none';
					_this.slideCon.style.width = 40 + 'px';
					_this.icon.show();
					if (_this.slideCon.style.left === '') {
						_this.icon.css({
							'margin-left': '0'
						});
					} else {
						_this.icon.css({
							'margin-left': '118px'
						});
					}
					utils.stat("Reboxdis", true);
				});

			});
			this.icon.on('click', function () {
				var btn = dragableBtn._obj,
					oldPos = dragableIcon._divStart,
					abs = Math.abs;
				// 判断点击button后是否有位移，如果有，表示该动作是拖曳，不执行click的动作
				if (abs(btn.offsetLeft - oldPos.x) === 0 && abs(btn.offsetTop - oldPos.y) === 0) {
					_this.slideBox.style.display = 'block';
					_this.slideCon.style.width = 158 + 'px';
					_this.icon.hide();
					$('#J-TK-lds-slide').animate({height:472},'fast', 'swing', function () {
						utils.stat("Reboxclick", true);
						if (parseInt(_this.slideCon.style.left, 10) < 0) {
							_this.slideCon.style.left = 0;
						}
					});
				}
			});
			$('#J-TK-lds-slide').on('click', '.TK-lds-link', function () {
				utils.stat("Reclick", true);
				utils.statLog_one({
					systemName: "ttk_recommend_clikc_log",
					//匹配类型
					sTyp: _this.sTyp,
					//源品商品id
					sPid: '',
					//原价
					sPric: '',
					//促销价
					sProPric: '',
					//
					cType:$(this).data().stat,
					//类目id
					cid: '',
					//被点击商品的源ID
					pid: '',
					//被点击商品价格(此处是促销价格)
					price: '',
					// 被点击商品的位置
					cNum: $(this).index() + 1,
					ptype: ''
				});
			});

			$('#J-TK-lds-btn').on('click', 'span', function () {
				utils.stat("ReNext", true);
				utils.stat("Redis", true);
				utils.statLog_one({
					systemName: "ttk_recommend_dis_log",
					//匹配类型
					sTyp: _this.sTyp,
					//源品商品id
					sPid: '',
					//原价
					sPric: '',
					//促销价
					sProPric: '',
					//类目id
					cid: '',
					//推荐商品总数
					Num: this.total,
					//推荐结果页码(当前第几页)
					pNum: $(this).index() + 1,
					// 展现的商品个数
					rNum: this.length,
					// 被展现的商品(此处是促销价格)
					rList: '',
					ptype: ''
				});
			});

			$('#J-TK-lds-prev, #J-TK-lds-next').on('click', function () {
				utils.stat("ReNext", true);
				utils.stat("Redis", true);
			});

		}
	}

	function init() {
		body.one({
			'lds.sync.success': function (e, data) {
				new Render(data);
			}
		});
		if (host.isJuDetail) {
			var TK_API_POST = '//showkc.taotaosou.com/findAndFind.do?title=' + encodeURIComponent(document.title)  +
				'&website=' + host.webSite +
				'&cateType=' +
				'&cateId=' +
				'&guid=' + utils.GUID +
				'&itemSize=9&pid=278' + '&callback=?';
			var itemUrl = function () {
				if (host.isJuDetail && $('.normal-pic')[0]) {
					return $('.normal-pic a').attr('href');
				}
				return '';
			}();
			var TK_recom_POST = '//recom.taotaosou.com/getShowRecom.do?itemId=' + utils.sliceID(itemUrl) +
				'&website=' + host.webSite +
				'&title=' + encodeURIComponent(document.title) +
				'&guid=' + utils.GUID +
				'&ditch=' + utils.DITCH_ID + '&callback=?';

			getJSONP({
				url: TK_API_POST,
				done: function (data) {
					if (typeof data === 'undefined') {
						// 数据返回为空的情况 无结构
						//utils.stat("ReNoresult_null", true);
						//body.trigger('cps.sync.success', [data]);
						return false;
					}
					if (data[0]) {

						$.each(data, function (i, item) {
							item.stat = 1;
							item.clickUrl = 'http://search.taotaosou.com/transfer.htm?' +  item.href + '#tts_bj';
							item.picUrl = item.media;
							item.ttsid = 0;
							item.sourceId = "0";
							item.promoPrice = item.price;
						});
					}
					if (data.length < 9) {
						var mediApi = utils.juxiao() + '/s?showid=lsKQuS&type=1&of=4&impct=9&qhtid=114078&qhcn=0&qhtag=' + encodeURIComponent(document.title) +
							'&jsonp=?&ref=';
						mediApi += itemUrl;
						getJSONP({
							url: mediApi,
							timeout: 10000,
							done: function (mediav) {
								/*if (!mediav || !mediav[0]) {
								 return false;
								 }*/
								$.each(mediav, function (i, item) {
									item[1].clickUrl = item[1].curl1;
									item[1].picUrl = item[1].pimg;
									item[1].title = item[1].pn;
									item[1].ttsid = 0;
									item[1].sourceId = "0";
									item[1].stat = 4;
									item[1].promoPrice = item[1].price;
									data.push(item[1]);
								});

								if (data.length < 9) {
									getJSONP({
										url: TK_recom_POST,
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
													item.clickUrl = 'http://item.taotaosou.com/' + item.ttsid +
														'.html?utm_medium=ttk&utm_source=' + utils.site() +
														'_rec';
													item.stat = 3;
													data.push(item);
												});
											} else {
												return false;
											}

											body.trigger('lds.sync.success', [{'recomList':data}]);

										}
									});
								} else {
									body.trigger('lds.sync.success', [{'recomList':data}]);
								}
							},
							fail: function () {
								if (data.length < 9) {
									getJSONP({
										url: TK_recom_POST,
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
													item.clickUrl = 'http://item.taotaosou.com/' + item.ttsid +
														'.html?utm_medium=ttk&utm_source=' + utils.site() +
														'_rec';
													item.stat = 3;
													data.push(item);
												});
											} else {
												return false;
											}

											body.trigger('lds.sync.success', [{'recomList':data}]);

										}
									});
								} else {
									body.trigger('lds.sync.success', [{'recomList':data}]);

								}
							}
						});
					} else {
						body.trigger('lds.sync.success', [{'recomList':data}]);

					}

				}
			});
		} else {
			//需求地址：http://199.155.122.129:8080/pages/viewpage.action?pageId=22249748

			getJSONP({
				url: '//recom.taotaosou.com/sales/pluKeywordRecom.do?callback=?' +
				'&guid=' + utils.GUID,
				done: function (data) {
					var bigData = [];
					if (!data || !('proList' in data) || !data.proList[0]) {
						return false;
					}

					var key = data.proList[0].title,
						url = data.proList[0].clickUrl;

					var JU_API_POST =  utils.juxiao() + '/s?showid=' + 'RMvMSy' +
						'&type=1&of=4&impct=9&qhtid=114078&qhcn=0' +
						'&jsonp=?&ref=' + encodeURIComponent(url) +
						'&qhtag=' + encodeURIComponent(key);
					getJSONP({
						url: JU_API_POST,
						done: function (mediav) {
							if (mediav[0]) {
								//第一个数据 为商品类型信息；剔除
								mediav = mediav.slice(1);
								//格式化 juxiao数据
								$.each(mediav, function (i, item) {
									item.clickUrl = item.curl1;
									item.picUrl = item.pimg;
									item.title = item.pn;
									item.ttsid = 0;
									item.promoPrice = item.price;
									bigData.push(item);
								});
							}
							if(bigData.length < 9) {
								//广告系统
								getJSONP({
									url: '//showkc.taotaosou.com/findAndFind.do?title=' + key +
									'&website=taobao&cateType=false&cateId=162103' +
									'&guid=' + utils.GUID +
									'&itemSize=9&pid=278&callback=?&cid=162103',
									done: function (uidate) {
										if (uidate[0]) {
											$.each(uidate, function (i, item) {
												item.stat = 5;
												item.clickUrl = 'http://search.taotaosou.com/transfer.htm?' + item.href + '#tts_bj';
												item.picUrl = item.media;
												item.ttsid = 0;
												item.sourceId = "0";
												item.promoPrice = item.price;
												bigData.push(item);

											});
										}

										if(bigData.length < 9) {
											//通用广告
											getJSONP({
												url: '//showkc.taotaosou.com/findAndFind.do?title=%E7%8C%9C%E4%BD%A0%E5%96%9C%E6%AC%A2%E6%8E%A8%E8%8D%90' +
												'&website=taobao&cateType=false&cateId=162103' +
												'&guid=736A5476AA76ACF5D084C74B8C996F97&itemSize=9&pid=278&callback=?&cid=162103',
												done: function (fData) {
													$.each(fData, function (i, item) {
														item.stat = 5;
														item.clickUrl = 'http://search.taotaosou.com/transfer.htm?' + item.href + '#tts_bj';

														item.picUrl = item.media;
														item.ttsid = 0;
														item.sourceId = "0";
														item.promoPrice = item.price;
														bigData.push(item);
													});

													$.each(data.proList, function (i, item) {
														item.stat = 3;
														item.clickUrl = 'http://search.taotaosou.com/transfer.htm?' + item.clickUrl;
														item.ttsid = 0;
														item.promoPrice = item.price;
														item.sourceId = "0";
														bigData.push(item);
													});

													body.trigger('lds.sync.success', [{'recomList':bigData}]);
												}
											});
										} else {
											body.trigger('lds.sync.success', [{'recomList':bigData}]);
										}
									}
								});
							} else {
								body.trigger('lds.sync.success', [{'recomList':bigData}]);
							}
						},
						fail: function () {
							body.trigger('lds.sync.success', [{'recomList':bigData}]);
						}
					});
				}
			});
		}

	}

	body.on('config.success', function (e,data) {
		var isShowLds = function () {
			if (!data || 'state' in data) {
				return false;
			} else{
				if (!data.iA || !data.iA.st) {
					return false;
				} else{
					if (!data.iA.adList) {
						return false;
					} else{
						var adlist = data.iA.adList;
						if (adlist[0]) {
							for (var i = 0, len = adlist.length; i < len; i++) {
								if (adlist[i].pid === 278) {
									if (adlist[i].status) {
										return true;
									} else{
										return false;
									}
								}
							}
						}
					}
				}
			}
		};

		if (isShowLds()) {
			init();									//开始初始化
		};
	});
});

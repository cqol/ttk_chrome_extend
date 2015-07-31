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
		Product = require('../../product'),
		Dragdrop = require('../../lib/dragdrop'),
		model = require('../../models/models'),
		templates = require('../../templates'),
		body = $('body');
	require('../../lib/jquery.tmpl');
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
		this.sTyp = data.resultType || '';
		this.init(data);
	}

	Render.prototype = {
		init: function (data) {
			var tmpl = templates['lds.box'], _this = this;
			$(tmpl).appendTo(body);
			var length = data.recomList.length,
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
					 // //199.155.122.129:8080/pages/viewpage.action?pageId=19628687
					 var outerCode = utils.isManualDId ? 'outer_code=ttk001' : 'outer_code=rec001';
					 if (host.isTMDetail) {
					 var clickUrl = "//search.taotaosou.com/transfer.htm?//item.taotaosou.com/" + data.recomList[i].ttsid + ".html?utm_source=TM_Detail_rec&utm_medium=ttk&utm_campaign=detail&" + outerCode;
					 } else if (host.isTBDetail) {
					 var clickUrl = "//search.taotaosou.com/transfer.htm?//item.taotaosou.com/" + data.recomList[i].ttsid + ".html?utm_source=TB_Detail_rec&utm_medium=ttk&utm_campaign=detail&" + outerCode;
					 }
					 } else {
					 //var clickUrl = data.recomList[i].clickUrl;
					 var clickUrl = "//search.taotaosou.com/transfer.htm?" + data.recomList[i].clickUrl;
					 }*/
					if (/^http:\/\/img.*\.taotaosou.cn.*$/.test(data.recomList[i].picUrl)) {
						switch (true) {
							case i < 3:
								html0 += '<li class="TK-lds-item"><a title="' + data.recomList[i].title + '" href="' + data.recomList[i].clickUrl + '" target="_blank" class="TK-lds-link" data-log="{\"price\":\"' + data.recomList[i].price + '\", \"promoPrice\":\"' + data.recomList[i].promoPrice + '\", \"sourceId\":\"' + data.recomList[i].sourceId + '\"}" data-stat="' + data.recomList[i].stat + '"><img src="' + data.recomList[i].picUrl.replace(/\.jpg$/i,'_110x110.jpg') + '" alt=""/></a><p class="TK-lds-price"><span>&yen</span>' + data.recomList[i].promoPrice + '</p></li>';
								break;

							case i < 6:
								html1 += '<li class="TK-lds-item"><a title="' + data.recomList[i].title + '" href="' + data.recomList[i].clickUrl + '" target="_blank" class="TK-lds-link" data-stat="' + data.recomList[i].stat + '"><img src="' + data.recomList[i].picUrl.replace(/\.jpg$/i,'_110x110.jpg') + '" alt=""/></a><p class="TK-lds-price"><span>&yen</span>' + data.recomList[i].promoPrice + '</p></li>';
								break;

							case i < 9:
								html2 += '<li class="TK-lds-item"><a title="' + data.recomList[i].title + '" href="' + data.recomList[i].clickUrl + '" target="_blank" class="TK-lds-link" data-stat="' + data.recomList[i].stat + '"><img src="' + data.recomList[i].picUrl.replace(/\.jpg$/i,'_110x110.jpg') + '" alt=""/></a><p class="TK-lds-price"><span>&yen</span>' + data.recomList[i].promoPrice + '</p></li>';
								break;

							case i < 12:
								html3 += '<li class="TK-lds-item"><a title="' + data.recomList[i].title + '" href="' + data.recomList[i].clickUrl + '" target="_blank" class="TK-lds-link" data-stat="' + data.recomList[i].stat + '"><img src="' + data.recomList[i].picUrl.replace(/\.jpg$/i,'_110x110.jpg') + '" alt=""/></a><p class="TK-lds-price"><span>&yen</span>' + data.recomList[i].promoPrice + '</p></li>';
								break;
						}
					} else {
						switch (true) {
							case i < 3:
								html0 += '<li class="TK-lds-item"><a title="' + data.recomList[i].title + '" href="' + data.recomList[i].clickUrl + '" target="_blank" class="TK-lds-link" data-log="{\"price\":\"' + data.recomList[i].price + '\", \"promoPrice\":\"' + data.recomList[i].promoPrice + '\", \"sourceId\":\"' + data.recomList[i].sourceId + '\"}" data-stat="' + data.recomList[i].stat + '"><img src="' + data.recomList[i].picUrl + '" alt=""/></a><p class="TK-lds-price"><span>&yen</span>' + data.recomList[i].promoPrice + '</p></li>';
								break;

							case i < 6:
								html1 += '<li class="TK-lds-item"><a title="' + data.recomList[i].title + '" href="' + data.recomList[i].clickUrl + '" target="_blank" class="TK-lds-link" data-stat="' + data.recomList[i].stat + '"><img src="' + data.recomList[i].picUrl + '" alt=""/></a><p class="TK-lds-price"><span>&yen</span>' + data.recomList[i].promoPrice + '</p></li>';
								break;

							case i < 9:
								html2 += '<li class="TK-lds-item"><a title="' + data.recomList[i].title + '" href="' + data.recomList[i].clickUrl + '" target="_blank" class="TK-lds-link" data-stat="' + data.recomList[i].stat + '"><img src="' + data.recomList[i].picUrl + '" alt=""/></a><p class="TK-lds-price"><span>&yen</span>' + data.recomList[i].promoPrice + '</p></li>';
								break;

							case i < 12:
								html3 += '<li class="TK-lds-item"><a title="' + data.recomList[i].title + '" href="' + data.recomList[i].clickUrl + '" target="_blank" class="TK-lds-link" data-stat="' + data.recomList[i].stat + '"><img src="' + data.recomList[i].picUrl + '" alt=""/></a><p class="TK-lds-price"><span>&yen</span>' + data.recomList[i].promoPrice + '</p></li>';
								break;
						}
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
				sPid: Product.item.getID(),
				//原价
				sPric: '',
				//促销价
				sProPric: '',
				//类目id
				cid: Product.item.getCid(),
				//推荐商品总数
				Num: this.total,
				//推荐结果页码(当前第几页)
				pNum: 0,
				// 展现的商品个数
				rNum: this.length,
				// 被展现的商品(此处是促销价格)
				rList: '',
				ptype: host.pageType
			});
		},
		renderBox: function () {
			var container = $('#J-TK-lds-bd-con'),
				icon = $('.TK-lds-icon'),
				slideCon = document.getElementById('J-TK-lds-con'),
				slideBox = document.getElementById('J-TK-lds-slide');
			$(this.html).appendTo(container);
			if (host.isTBDetail) {
				slideCon.style.right = '42px';
			}

			new LdsSlide(slideCon);
			this.icon = icon;
			this.slideBox = slideBox;
			this.slideCon = slideCon;
			if (utils.isJuzi()) {
				this.renderEventJuZi(slideCon);
			} else {
				this.renderEvent(slideCon);
			}
		},
		renderEvent: function (slideCon) {
			var _this = this;
			//var dragableBtn =	new Dragdrop(slideCon);
			var dragableBtn = new Drag(slideCon, document.getElementById('J-TK-lds-hd'));
			var dragableIcon = new Drag(slideCon, this.icon[0], true);
			$('.TK-lds-close').on('click', function () {
				$('#J-TK-lds-slide').animate({height: 0}, 'fast', 'swing', function () {
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
					$('#J-TK-lds-slide').animate({height: 472}, 'fast', 'swing', function () {
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
					sPid: Product.item.getID(),
					//原价
					sPric: '',
					//促销价
					sProPric: '',
					//
					cType: $(this).data().stat,
					//类目id
					cid: Product.item.getCid(),
					//被点击商品的源ID
					pid: '',
					//被点击商品价格(此处是促销价格)
					price: '',
					// 被点击商品的位置
					cNum: $(this).index() + 1,
					ptype: host.pageType
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
					sPid: Product.item.getID(),
					//原价
					sPric: '',
					//促销价
					sProPric: '',
					//类目id
					cid: Product.item.getCid(),
					//推荐商品总数
					Num: this.total,
					//推荐结果页码(当前第几页)
					pNum: $(this).index() + 1,
					// 展现的商品个数
					rNum: this.length,
					// 被展现的商品(此处是促销价格)
					rList: '',
					ptype: host.pageType
				});
			});

			$('#J-TK-lds-prev, #J-TK-lds-next').on('click', function () {
				utils.stat("ReNext", true);
				utils.stat("Redis", true);
			});

		},
		renderEventJuZi: function (slideCon) {
			var _this = this;
			//var dragableBtn =	new Dragdrop(slideCon);
			var dragableBtn = new Drag(slideCon, document.getElementById('J-TK-lds-hd'));
			$('.TK-lds-close').on('click', function () {
				$('#J-TK-lds-slide').animate({height: 0}, 'fast', 'swing', function () {
					_this.slideBox.style.display = 'none';
					utils.stat("Reboxdis", true);
				});

			});
			$('#J-TK-lds-slide').on('click', '.TK-lds-link', function () {
				utils.stat("Reclick", true);
				utils.statLog_one({
					systemName: "ttk_recommend_clikc_log",
					//匹配类型
					sTyp: _this.sTyp,
					//源品商品id
					sPid: Product.item.getID(),
					//原价
					sPric: '',
					//促销价
					sProPric: '',
					//
					cType: $(this).data().stat,
					//类目id
					cid: Product.item.getCid(),
					//被点击商品的源ID
					pid: '',
					//被点击商品价格(此处是促销价格)
					price: '',
					// 被点击商品的位置
					cNum: $(this).index() + 1,
					ptype: host.pageType
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
					sPid: Product.item.getID(),
					//原价
					sPric: '',
					//促销价
					sProPric: '',
					//类目id
					cid: Product.item.getCid(),
					//推荐商品总数
					Num: this.total,
					//推荐结果页码(当前第几页)
					pNum: $(this).index() + 1,
					// 展现的商品个数
					rNum: this.length,
					// 被展现的商品(此处是促销价格)
					rList: '',
					ptype: host.pageType
				});
			});

			$('#J-TK-lds-prev, #J-TK-lds-next').on('click', function () {
				utils.stat("ReNext", true);
				utils.stat("Redis", true);
			});

		},
		renderEventJuxiao: function (slideCon) {
			var _this = this;
			var tagFlg = true;
			//var dragableBtn =	new Dragdrop(slideCon);
			var dragableBtn = new Drag(slideCon, document.getElementById('J-TK-lds-hd'));
			var dragableIcon = new Drag(slideCon, this.icon[0], true);
			_this.slideBox.style.display = 'none';
			_this.icon.show();
			$('.TK-lds-close').on('click', function () {
				tagFlg = false;
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
			this.icon.on('click', function () {
				var btn = dragableBtn._obj,
					oldPos = dragableIcon._divStart,
					abs = Math.abs;
				if (!tagFlg) {
					_this.slideBox.style.display = 'block';
					_this.slideCon.style.width = 158 + 'px';
					$('#J-TK-lds-slide').height(472);
					_this.icon.hide();

					utils.stat("Reboxclick", true);
					if (parseInt(_this.slideCon.style.left, 10) < 0) {
						_this.slideCon.style.left = 0;
					}
					tagFlg = true;

				}
				// 判断点击button后是否有位移，如果有，表示该动作是拖曳，不执行click的动作
				if (abs(btn.offsetLeft - oldPos.x) === 0 && abs(btn.offsetTop - oldPos.y) === 0) {
					_this.slideBox.style.display = 'block';
					_this.slideCon.style.width = 158 + 'px';
					$('#J-TK-lds-slide').height(472);
					_this.icon.hide();

					utils.stat("Reboxclick", true);
					if (parseInt(_this.slideCon.style.left, 10) < 0) {
						_this.slideCon.style.left = 0;
					}
				}
			});
			$('.TK-lds-close').trigger('click');
			$('#J-TK-lds-slide').on('click', '.TK-lds-link', function () {
				utils.stat("Reclick", true);
				utils.statLog_one({
					systemName: "ttk_recommend_clikc_log",
					//匹配类型
					sTyp: _this.sTyp,
					//源品商品id
					sPid: Product.item.getID(),
					//原价
					sPric: '',
					//促销价
					sProPric: '',
					//
					cType: $(this).data().stat,
					//类目id
					cid: Product.item.getCid(),
					//被点击商品的源ID
					pid: '',
					//被点击商品价格(此处是促销价格)
					price: '',
					// 被点击商品的位置
					cNum: $(this).index() + 1,
					ptype: host.pageType
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
					sPid: Product.item.getID(),
					//原价
					sPric: '',
					//促销价
					sProPric: '',
					//类目id
					cid: Product.item.getCid(),
					//推荐商品总数
					Num: this.total,
					//推荐结果页码(当前第几页)
					pNum: $(this).index() + 1,
					// 展现的商品个数
					rNum: this.length,
					// 被展现的商品(此处是促销价格)
					rList: '',
					ptype: host.pageType
				});
			});

			$('#J-TK-lds-prev, #J-TK-lds-next').on('click', function () {
				utils.stat("ReNext", true);
				utils.stat("Redis", true);
			});

			var scorllTop;

			$(window).on("scroll", function () {
				scorllTop = $("body").scrollTop() || $("html").scrollTop();
				if (scorllTop > 700) {
					_this.icon.trigger('click');
				} else {
					$('.TK-lds-close').trigger('click');
				}
			});
		}
	}

	function init() {
		body.one({
			'lds.sync.success': function (e, data) {
				new Render(data);
			}
		})

		//暂时传空
		model.lds('', '');
	}

	//轮播构造函数
	function LdsSlide(elm) {
		var obj = elm;
		this.obj = obj;
		this.init();
	}

	LdsSlide.prototype = {
		$: function (id) {
			return typeof id === 'string' ? document.getElementById(id) : id;
		},
		$$: function (elem, obj) {
			return (obj || document).getElementsByTagName(elem);
		},
		hasClass: function (ele, cls) {
			return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
		},
		addClass: function (ele, cls) {
			var _this = this;
			if (!_this.hasClass(ele, cls)) {
				ele.className.replace(/\s/g, '') === '' ? ele.className = cls : ele.className += ' ' + cls;
			}
		},
		removeClass: function (ele, cls) {
			var _this = this;
			_this.hasClass(ele, cls) && (ele.className = ele.className.replace(new RegExp('(\\s*|^)' + cls + '(\\s*|$)'), ' '));
		},
		addEvent: function (obj, evtype, fn) {
			if (obj.addEventListener) {
				obj.addEventListener(evtype, fn, false);
			}
			else if (obj.attachEvent) {
				obj.attachEvent('on' + evtype, function () {
					fn.call(obj);
				});
			}
		},
		init: function () {

			var _this = this
			var index = 0,
				wrap = this.obj,
				box = _this.$('J-TK-lds-bd-con'),
				ul = _this.$$('ul', box);
			var timer = null,
				moveTimer = null;

			box.style.width = 112 * ul.length + 'px';
			var left = document.getElementById('J-TK-lds-prev');
			var right = document.getElementById('J-TK-lds-next');
			var ulLen = ul.length;
			var frag = document.createDocumentFragment(),
				btnBox = document.createElement('div');
			btnBox.className = 'TK-lds-btn';
			btnBox.id = 'J-TK-lds-btn';
			btnBox.style.width = ulLen * 15 + 'px';
			if (ulLen <= 1) {
				return;
			}

			_this.addEvent(left, 'click', function () {
				--index;
				if (index < 0) {
					index = ulLen - 1;
				}

				if (index > (ulLen - 1)) {
					index = 0;
				}
				move();
			});
			_this.addEvent(right, 'click', function () {
				++index;
				if (index < 0) {
					index = ulLen - 1;
				}

				if (index > (ulLen - 1)) {
					index = 0;
				}
				move();
			});
			for (var i = 0; i < ulLen; i++) {
				var span = document.createElement('span');
				if (i === 0) {
					span.className = 'TK-lds-active';
				}
				span.innerText = i;
				btnBox.appendChild(span);
				(function (i, item) {
					_this.addEvent(item, 'click', function () {
						clearInterval(moveTimer);
						index = i;
						move();
					});
				})(i, span);
			}
			_this.addEvent(wrap, 'mouseover', function () {
				clearInterval(timer);
				timer = null;
			});
			_this.addEvent(wrap, 'mouseout', function () {
				autoPlay();
			});
			function autoPlay() {
				timer = setInterval(function () {
					if (index >= (ulLen - 1)) {
						index = 0;
					} else {
						++index;
					}
					move();
				}, 5000);
			}

			autoPlay();
			frag.appendChild(btnBox);
			document.getElementById('J-TK-lds-slide').appendChild(frag);
			function move() {
				var span = _this.$$('span', _this.$('J-TK-lds-btn'));
				for (var j = 0, slen = span.length; j < slen; j++) {
					_this.removeClass(span[j], 'TK-lds-active');
				}
				_this.addClass(span[index], 'TK-lds-active');
				toMove(box, -index * 112);
			}

			//移动函数
			function toMove(box, step) {
				clearInterval(moveTimer)
				moveTimer = setInterval(function () {
					var iSpeed = (step - box.offsetLeft) / 5;
					iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
					box.offsetLeft == step ? clearInterval(moveTimer) : box.style.left = iSpeed + box.offsetLeft + 'px';
				}, 30);
			}
		}
	}

	function Drag(dom, tag, icon) {
		var _this = this;

		this._obj = dom;
		this._tag = tag;
		this._mouseStart = {};
		this._divStart = {};
		this.clientWidth = document.body.clientWidth;
		this.flag = false;
		this.icon = icon;
		this._tag.onmousedown = function (ev) {
			_this._startDrag(ev);
		};
	}

	Drag.prototype._startDrag = function (ev) {
		var _this = this,
			oEvent = ev || event;

		this._mouseStart.x = oEvent.clientX;
		this._mouseStart.y = oEvent.clientY;
		this._divStart.x = this._obj.offsetLeft;
		this._divStart.y = this._obj.offsetTop;

		if (this._obj.setCapture) {
			this._tag.onmousemove = function (ev) {
				_this._doDrag(ev);
			}
			this._tag.onmouseup = function (ev) {
				_this._stopDrag(ev);
			}
			this._tag.ondblclick = function (ev) {
				_this._stopDrag(ev);
			}
			this._tag.setCapture();
		}
		else {
			this._doDrags = function (ev) {
				_this._doDrag(ev);
			}
			this._stopDrags = function (ev) {
				_this._stopDrag(ev);
			}
			this._stopDragsDbl = function (ev) {
				_this.flag = true;
				document.removeEventListener('mousemove', _this._doDrags, true);
				_this._stopDrag(ev);
			}
			document.addEventListener('mousemove', this._doDrags, true);
			document.addEventListener('mouseup', this._stopDrags, true);
			document.addEventListener('dblclick', this._stopDragsDbl, true);
		}
	}
	Drag.prototype._doDrag = function (ev) {
		var oEvent = ev || event,
			left = oEvent.clientX - this._mouseStart.x + this._divStart.x,
			top = oEvent.clientY - this._mouseStart.y + this._divStart.y;
		if (this.icon) {
			if (left <= (30 - 118)) {
				left = -118;
			}
			if (left > (this.clientWidth - this._obj.offsetWidth) - (30 + 118)) {
				left = (this.clientWidth - this._obj.offsetWidth) - 118;
			}
		} else {
			if (left <= 30) {
				left = 0;
			}
			if (left > (this.clientWidth - this._obj.offsetWidth) - 30) {
				left = this.clientWidth - this._obj.offsetWidth;
			}
		}

		if (top <= 0) {
			top = 0;
		}
		this._obj.style.left = left + 'px';
		this._obj.style.top = top + 'px';
	}
	Drag.prototype._stopDrag = function (ev) {
		if (this._tag.releaseCapture) {
			this._tag.onmousemove = null;
			this._tag.onmouseup = null;
			this._tag.releaseCapture();
		}
		else {
			document.removeEventListener('mousemove', this._doDrags, true);
			document.removeEventListener('mouseup', this._stopDrags, true);
			document.removeEventListener('dblclick', this._stopDrags, true);
			this._doDrags = this._stopDrags = null;
		}
	}
	//暴露接口
	module.exports = {
		init: init
	};
});
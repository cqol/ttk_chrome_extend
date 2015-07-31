//轮播构造函数
__tk__define(function (require, exports, module) {
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
	module.exports = LdsSlide;
});
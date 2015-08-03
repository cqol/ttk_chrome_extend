__tk__define(function (require, exports, module) {
	// 本地cookie的读写工具

	var cookieUtil = {
		get: function () {
			var cookie = {},
				all = document.cookie,
				list,
				i,
				len,
				item,
				index;

			if (all === '') {
				return cookie;
			}

			list = all.split('; ');

			for (i = 0, len = list.length; i < len; i++) {
				item = list[i];
				index = item.indexOf('=');
				var cookieNow;
				try {
					cookieNow = decodeURIComponent(item.substring(index + 1));
				} catch (e) {
					cookieNow = item.substring(index + 1);
				}
				cookie[item.substring(0, index)] = cookieNow;
			}

			return cookie;
		},
		set: function (opt) {
			var cookie = opt.name + '=' + encodeURIComponent(opt.value);
			if (typeof opt.day === 'number' || typeof opt.hour === 'number' || typeof opt.min === 'number' || typeof opt.sec === 'number') {
				var time;
				//IE不支持max-age，使用expires
				if (window.navigator.userAgent.match(/MSIE/)) {
					var date = new Date();

					if (opt.day) {
						time = opt.day * 24 * 3600 * 1000;
					} else if (opt.hour) {
						time = opt.hour * 3600 * 1000;
					} else if (opt.min) {
						time = opt.min * 60 * 1000;
					} else if (opt.sec) {
						time = opt.sec * 1000;
					}
					date.setTime(new Date().getTime() + time);
					cookie += '; expires=' + date.toGMTString();
				} else {
					if (opt.day) {
						time = opt.day * 60 * 60 * 24;
					} else if (opt.hour) {
						time = opt.hour * 60 * 60;
					} else if (opt.min) {
						time = opt.min * 60;
					} else if (opt.sec) {
						time = opt.sec;
					}
					cookie += '; max-age=' + time;
				}

				if (opt.path) {
					cookie += '; path=' + opt.path;
				}
				if (opt.domain) {
					cookie += '; domain=' + opt.domain;
				}
			}
			document.cookie = cookie;
		}
	}, isPaopao = true, pid393 = false;
	var $ = require('../lib/jquery.min'),
		body = $('body'),
		host = location.host,
		href = location.href,
		J = {
			utils: require('../utils')
		},
		c = {
			api: {
				//图媒体大站
				re: '//re.taotaosou.com/',
				//淘同款
				browser: '//browserre.taotaosou.com/',
				//统计埋点接
				log: '//log.taotaosou.com/',
				kc: '//showkc.taotaosou.com/'
			},
			cqol: 'cqol',
			/**
			 * 加载js
			 * @param url 链接地址
			 * @param callback 回调
			 */
			load: function (url, callback) {
				var script = document.createElement("script");

				script.type = 'text/javascript';
				script.charset = 'utf-8';
				script.src = url;

				script.onload = script.onreadystatechange = function () {
					if (!script.isLoad && (!script.readyState || script.readyState === "loaded" || script.readyState === "complete")) {
						script.isLoad = true;
						if (typeof callback === 'function') {
							callback(script);
						}
						script.onload = script.onreadystatechange = null;
						script.parentNode.removeChild(script);
					}
				};

				document.body.appendChild(script);
			},
			/**
			 * 添加一个事件模型
			 * @param {Element} elm dom节点
			 * @param {String} type 事件种类
			 * @param {Function} fn 回调函数
			 */
			addEvent: function (elm, type, fn) {
				if (elm.addEventListener) {
					elm.addEventListener(type, fn, false);
					return true;
				} else if (elm.attachEvent) {
					elm['e' + type + fn] = fn;
					elm[type + fn] = function () {
						elm['e' + type + fn](window.event);
					};
					elm.attachEvent('on' + type, elm[type + fn]);
					return true;
				}
				return false;
			},
			/**
			 * @param {String} name 必填项
			 * @param {String} value 必填项
			 * @param {String} hour 过期时间
			 */
			setCookie: function (opt, callback) {
				var _this = this;
				if (!opt.name || !opt.value) {
					return false;
				}

				opt.hour = opt.hour * 60 * 60;

				this.load(_this.api.kc + 'setCookie.do?name=' + opt.name + '&value=' + opt.value + '&day=' + opt.hour, function () {
					callback();
				});
			},
			getCSS: function (obj, attr) {
				return parseFloat(obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, false)[attr]);
			},
			/**
			 * 添加css样式
			 * @param {Element} elm dom节点
			 * @example
			 * setStyle(elm: "", {
                             *     "width": "10px",
                             *     "height": "20px"
                             * })
			 */
			setCSS: function (elm, styles, callback) {
				var setStyle = function (prop, val) {
					elm.style[prop] = val;
				};

				for (var prop in styles) {
					if (!styles.hasOwnProperty(prop)) continue;
					setStyle(prop, styles[prop]);
				}
				if (callback) {
					callback();
				}
			},
			/**
			 * @param {String} name 必填项
			 * @return {Boolean}
			 */
			getCookie: function (name, callback) {
				var _this = this;
				if (!name) {
					return false;
				}

				$.getJSON(_this.api.kc + 'getCookie.do?name=' + name + '&jsonp=?', function (data) {
					callback(data);
				});
			},
			/**
			 * 将document.cookie的值以名/值对组成的一个对象返回
			 */
			cookie: cookieUtil
		};
	var global = '__TTS',
		globalBox;
	// var frameSrc = 'http://www.taotaosou.com/albumPic.html';
	var frameSrc = 'http://showkc.taotaosou.com/cqol.html';

	function _css(obj, attr, value) {
		if (arguments.length === 2) {
			return parseFloat(obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, false)[attr]);
		}
		else if (arguments.length === 3) {
			obj.style[attr] = value + "px";
		}
	}

	var MOVE_TYPE = {
		BUFFER: 1,
		FLEX: 2
	};

	function StartMove(obj, oTarget, iType, fnCallBack, fnDuring) {
		var fnMove = null;
		if (obj.timer) {
			clearInterval(obj.timer);
		}

		switch (iType) {
			case MOVE_TYPE.BUFFER:
				fnMove = DoMoveBuffer;
				break;
			case MOVE_TYPE.FLEX:
				fnMove = DoMoveFlex;
				break;
		}

		obj.timer = setInterval(function () {
			fnMove(obj, oTarget, fnCallBack, fnDuring);
		}, 20);
	}

	function DoMoveBuffer(obj, oTarget, fnCallBack, fnDuring) {
		var bStop = true;
		var speed = 0;
		var attr = '';
		var cur = 0;

		for (attr in oTarget) {
			cur = _css(obj, attr);
			speed = (oTarget[attr] - cur) / 5;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if (oTarget[attr] !== cur) {
				bStop = false, _css(obj, attr, cur + speed);
			}
			//oTarget[attr] !== cur && (bStop = false, _css(obj, attr, cur + speed));
		}

		if (fnDuring)fnDuring.call(obj);
		//bStop && (clearInterval(obj.timer), obj.timer = null, fnCallBack && fnCallBack.call(obj));
		if (bStop) {
			clearInterval(obj.timer);
			obj.timer = null;
			if (fnCallBack)fnCallBack.call(obj);
		}
	}

	function DoMoveFlex(obj, oTarget, fnCallBack, fnDuring) {
		var bStop = true;
		var attr = '';
		var cur = 0;

		for (attr in oTarget) {
			if (!obj.oSpeed)obj.oSpeed = {};
			if (!obj.oSpeed[attr])obj.oSpeed[attr] = 0;
			cur = attr === 'opacity' ? parseInt(css(obj, attr).toFixed(2) * 100, 10) : _css(obj, attr);
			//cur=css(obj, attr);
			if (Math.abs(oTarget[attr] - cur) > 1 || Math.abs(obj.oSpeed[attr]) > 1) {
				bStop = false;

				obj.oSpeed[attr] += (oTarget[attr] - cur) / 5;
				obj.oSpeed[attr] *= 0.7;
				var maxSpeed = 65;
				if (Math.abs(obj.oSpeed[attr]) > maxSpeed) {
					obj.oSpeed[attr] = obj.oSpeed[attr] > 0 ? maxSpeed : -maxSpeed;
				}

				_css(obj, attr, cur + obj.oSpeed[attr]);
			}
		}

		if (fnDuring)fnDuring.call(obj);
		//bStop && (clearInterval(obj.timer), obj.timer = null, fnCallBack && fnCallBack.call(obj));
		if (bStop) {
			clearInterval(obj.timer);
			obj.timer = null;
			if (fnCallBack)fnCallBack.call(obj);
		}
	}

	/**
	 * 埋点统计
	 */
	function statistics() {
		for (var n = 0, nLen = arguments.length; n < nLen; n++) {
			c.load(c.api.log + 'browser_statistics.do?type=' + arguments[n] + '&v=' + new Date().getTime());
		}
	}

	/**
	 * 是否匹配跳转站点
	 */
	function isRealwebSite() {
		if (!/^([\w-]+\.)+((com)|(net)|(org)|(gov\.cn)|(info)|(cc)|(com\.cn)|(net\.cn)|(org\.cn)|(name)|(biz)|(tv)|(cn)|(la))$/.test(host)) {
			return false;
		} else {
			if (/^(login|i|mail|help|about|my|me|u|user|open|job|reg|service|passport|api|m)\..?/.test(host) ||
				/https:\/\//.test(href) || /so.com|360.cn|baidu.com|hao123.com|firefoxchina.cn|alipay.com|weixin.qq|taotaosou.com/.test(host)) {
				return false;
			}
		}
		return true;
	}

	/**
	 * 初始化
	 */
	function init(config) {
		var unionWrap = document.getElementById(global + '_union'),
			random = J.utils.getRandom(1, 100),
		//250 高度
			isGoToHight = false;
		if (!unionWrap) {
			globalBox = document.createElement('div');
			globalBox.id = global + '_union';
			document.body.appendChild(globalBox);
			unionWrap = globalBox;
		}
		var bubbleWrap = document.createElement('div');
		bubbleWrap.id = 'J_tts_bubble';
		bubbleWrap.className = 'media_bubble';

		var isTBDetail = host === 'item.taobao.com' || host === 'item.beta.taobao.com',
		//isTMDetail = host === 'detail.tmall.com';
			isTMDetail = host.match(/detail.tmall/),
			tbSearch1 = 'search1.taobao.com',
			tbListS = 's.taobao.com',
			tbList = 'list.taobao.com';
		var w = {
			host: {
				tbSearch1: tbSearch1,
				tbListS: tbListS,
				tbList: tbList,

				isHomeTaobao: location.href === 'http://www.taobao.com/',

				isHomeTmall: host === 'www.tmall.com',

				isHomeJD: host === 'www.jd.com',

				//个人中心首页
				isItaobao: host === 'i.taobao.com',

				isB2CList: host === 'list.jd.com' || host === 'search.jd.com',
				//淘宝 list
				isTBList: host === 'search.taobao.com' || host === tbSearch1 || host === tbListS || host === 's8.taobao.com' || host === tbList,

				//天猫 list
				isTMList: host === 'list.tmall.com' || host === 'list.mei.tmall.com',
				//淘宝详情页
				isTBDetail: isTBDetail,

				isVipHome: location.href === 'http://www.vip.com/',

				isVipDetail: host === 'www.vip.com' && location.href.match(/detail/),
				isGMDetail: host === 'www.gome.com.cn' && location.href.match(/product/),
				isAMXDetail: host === 'www.amazon.cn' && (location.href.match(/http:\/\/www.amazon.cn\/.*?\/dp\/(\w+)\/.*?/) ||
				location.href.match(/http:\/\/www.amazon.cn\/dp\/(\w+)\/.*?/) ||
				location.href.match(/http:\/\/www.amazon.cn\/.*?\/product\/(\w+)\/.*?/)),
				//天猫详情页
				isTMDetail: isTMDetail,

				//淘宝和天猫详情页
				isDetail: isTBDetail || isTMDetail,

				//天猫超市详情页
				isCsTMDetail: host.match(/chaoshi.detail.tmall/),

				isMGJDetail: (function () {
					if (host.match(/mogujie/) && location.href.match(/detail/)) {
						return true;
					} else {
						return false;
					}
				})(),

				isMLSHome: location.href === 'http://www.meilishuo.com/',

				isMLSDetail: host.match(/meilishuo/) && location.pathname.match(/guang|pretty|search|group|ihome|person|share/),


				isHomeTaobao: host === 'www.taobao.com',

				//个人中心首页
				isItaobao: host === 'i.taobao.com',

				isB2CDetail: host === 'item.jd.com' || location.href.match(/re.jd.com\/cps\/item/),


				isYHDDetail: host === 'item.1mall.com' || host === 'item.yhd.com',


				isVjiaDetial: host === 'item.vjia.com',

				isVanclDetail: host === 'item.vancl.com',


				isDDDetail: host === 'product.dangdang.com',


				isSuningDetail: host === 'product.suning.com',

				isSuningHome: href === 'http://www.suning.com/',

				isHomeJumei: /^http:\/\/\w{0,6}\.jumei\.com\/$/.test(href)
			}
		}
		/*if (host === 'detail.tmall.com' || host === 'item.taobao.com') {
		 bubbleWrap.style.bottom = '71px';
		 }

		 if (w.host.isB2CDetail || w.host.isYHDDetail || w.host.isVipDetail || w.host.isGMDetail ||
		 w.host.isVjiaDetial || w.host.isDDDetail || w.host.isSuningDetail || w.host.isVanclDetail ||
		 w.host.isAMXDetail || w.host.isMGJDetail || w.host.isMLSDetail || w.host.isB2CList || w.host.isHomeJD ||
		 w.host.isHomeTaobao || w.host.isHomeTmall || w.host.isMLSHome || w.host.isVipHome || w.host.isTBList || w.host.isTMList || w.host.isHomeJumei || w.host.isSuningHome) {
		 bubbleWrap.style.bottom = '71px';
		 }*/

    //每秒检测是否有底通中的logo，检测20秒，如果有则将iframe往上抬高71px以避免底通遮挡iframe
		var times = 20, checkConf = function () {
			if ($('.bijia-logo') && $('.bijia-logo').css('height') === '71px') {
				bubbleWrap.style.bottom = '71px';
				clearTimeout(timeoutId);
			} else if (!times) {
				clearTimeout(timeoutId);
			} else {
				times--;
				setTimeout(checkConf, 1000);
			}
		}, timeoutId = setTimeout(checkConf, 1000);

		var strTmpl = function (frameSrc, isAdSystem) {
			var ttsLogo = '<div id="J_tts_bubble_logo"><a href="javascript:;" class="media_bubble_logo" onclick="return false">淘淘搜提供</a></div>';
			return '<a href="javascript:;" id="J_tts_bubble_close" title="关闭" class="media_bubble_close" onclick="return false">X</a>' +
				'<iframe id="J_tts_bubble_frame" class="media_bubble_frame" src=" ' + frameSrc + '" vspace="0" hspace="0" allowtransparency="true" scrolling="no" marginheight="0" marginwidth="0" frameborder="0">' +
				'</iframe>' +
				(isAdSystem ? ttsLogo : '');
		};
		//如果存在pid=294时，加载包断广告，其余时候出泡泡
		if (isPaopao) {

			if ('state' in config) {
				var randomNum = J.utils.getRandom(0, 99);
				if (randomNum > config.thirdPartUnion) { //Google ad
					bubbleWrap.innerHTML = strTmpl(J.utils.api.channel + 'guid=' + J.utils.GUID +
						'&siteCid=-1&pid=null&itemSize=5', true);
					//bubbleWrap.innerHTML = strTmpl('//showkc.taotaosou.com/imgShow.do?guid=' + J.utils.GUID);
					//bubbleWrap.innerHTML = strTmpl('//showkc.taotaosou.com/imgShow.do?jsCode=%26lt%3Bscript%20type%3D%26quot%3Btext%2Fjavascript%26quot%3B%26gt%3B%0D%0A%20%20%20%20google_ad_client%20%3D%20%26quot%3Bca-pub-3076727917833405%26quot%3B%3B%0D%0A%20%20%20%20google_ad_slot%20%3D%20%26quot%3B6432331177%26quot%3B%3B%0D%0A%20%20%20%20google_ad_width%20%3D%20300%3B%0D%0A%20%20%20%20google_ad_height%20%3D%20250%3B%0D%0A%26lt%3B%2Fscript%26gt%3B%0D%0A%26lt%3B!--%20xiatian-300x250%20--%26gt%3B%0D%0A%26lt%3Bscript%20type%3D%26quot%3Btext%2Fjavascript%26quot%3B%0D%0Asrc%3D%26quot%3B%2F%2Fpagead2.googlesyndication.com%2Fpagead%2Fshow_ads.js%26quot%3B%26gt%3B%0D%0A%26lt%3B%2Fscript%26gt%3B&width=300&height=250');
					unionWrap.appendChild(bubbleWrap);
					isGoToHight = true;
					randerEvent(bubbleWrap, isGoToHight);
					statistics('pop_news_pv');
					$('.media_bubble_close').css('right', '0px');
					return;
				} else {
					//juxiao ad
					bubbleWrap.innerHTML = strTmpl('//showkc.taotaosou.com/imgShow.do?jsCode=%26lt%3Bscript%26gt%3B%0D%0Avar%20mediav_ad_pub%20%3D%20%27ipHe14_1037544%27%3B%0D%0Avar%20mediav_ad_width%20%3D%20%27300%27%3B%0D%0Avar%20mediav_ad_height%20%3D%20%27250%27%3B%0D%0A%26lt%3B%2Fscript%26gt%3B%0D%0A%26lt%3Bscript%20type%3D%26quot%3Btext%2Fjavascript%26quot%3B%20language%3D%26quot%3Bjavascript%26quot%3B%20charset%3D%26quot%3Butf-8%26quot%3B%20%20src%3D%26quot%3Bhttp%3A%2F%2Fstatic.mediav.com%2Fjs%2Fmvf_g2.js%26quot%3B%26gt%3B%26lt%3B%2Fscript%26gt%3B&width=300&height=250');
					unionWrap.appendChild(bubbleWrap);
					randerEvent(bubbleWrap);
					statistics('pop_juxiao_pv');

					//聚效广告关闭恩纽放在iframe里面
					$('.media_bubble_close').css('right', '0px');
					return;
				}

			}
			//是否开启
			if (config.confBubble.jsStatus) {
				if (config.confBubble.probality < random) {
					if (config.confBubble.bubbleType === 2) { // 广告系统投放的广告
						bubbleWrap.innerHTML = strTmpl(J.utils.api.channel + 'guid=' + J.utils.GUID +
							'&siteCid=' + config.keyType + '&pid=' + config.id + '&itemSize=5', true);
						unionWrap.appendChild(bubbleWrap);
						isGoToHight = true;
						randerEvent(bubbleWrap, isGoToHight);
						//聚效广告关闭恩纽放在ifram里面

						if (config.keyType === 199) {
							$('.media_bubble_close').css('right', '0px');
						}
					} else if (config.confBubble.bubbleType === 1) { // 百度管家投放的广告
						bubbleWrap.innerHTML = strTmpl(frameSrc);
						unionWrap.appendChild(bubbleWrap);
						randerEvent(bubbleWrap);
					}
				} else {
					if (config.confBubble.jsCode.match(/\{guid\}/)) {
						//bubbleWrap.innerHTML = strTmpl('//showkc.taotaosou.com/imgShow.do?guid=' + J.utils.GUID);
						bubbleWrap.innerHTML = strTmpl(J.utils.api.channel + 'guid=' + J.utils.GUID +
							'&siteCid=' + config.keyType + '&pid=' + config.id + '&itemSize=5');
						isGoToHight = true;
					} else {
						bubbleWrap.innerHTML = strTmpl('//showkc.taotaosou.com/imgShow.do?jsCode=' + encodeURIComponent(config.confBubble.jsCode) + '&width=300&height=250', true);
					}
					unionWrap.appendChild(bubbleWrap);
					randerEvent(bubbleWrap, isGoToHight);

					//聚效广告关闭恩纽放在ifram里面
					if (config.keyType === 199) {
						$('.media_bubble_close').css('right', '0px');
					}
				}
			} else {
				if (config.confBubble.bubbleType === 2) { // 广告系统投放的广告
					bubbleWrap.innerHTML = strTmpl(J.utils.api.channel + 'guid=' + J.utils.GUID +
						'&siteCid=' + config.keyType + '&pid=' + config.id + '&itemSize=5', true);
					unionWrap.appendChild(bubbleWrap);
					isGoToHight = true;
					randerEvent(bubbleWrap, isGoToHight);

					//聚效广告关闭恩纽放在ifram里面
					if (config.keyType === 199) {
						$('.media_bubble_close').css('right', '0px');
					}
				} else if (config.confBubble.bubbleType === 1) { // 百度管家投放的广告
					bubbleWrap.innerHTML = strTmpl(frameSrc);
					unionWrap.appendChild(bubbleWrap);
					randerEvent(bubbleWrap);
				}
				return;
			}
		} else {
			if (pid393) {
				var templates = require('../templates.jst'),
					template = templates['tmt/ditong'];
				$.getJSON('//showkc.taotaosou.com/tumeiti.do?adType=0,0,1,0&keyword=0,0,0,0&adSize=0,0,728*70,0&itemSize=0,0,1,0&tbId=&pid=393&jsonp=?', function (data) {
					if(data.pinpai[0]){
						data.pinpai[0].href = 'http://search.taotaosou.com/transfer.htm?' + data.pinpai[0].href;
						bubbleWrap.innerHTML = template(data.pinpai[0]);
						unionWrap.appendChild(bubbleWrap);
						isGoToHight = true;
						randerEvent(bubbleWrap, isGoToHight);
						bubbleWrap.style.width = '728px';
						$('.media_bubble_frame').eq(0).addClass('mini');
					}
				});
			} else {
				var templates = require('../templates.jst'),
					template = templates['tmt/ditong'];
				$.getJSON('//showkc.taotaosou.com/tumeiti.do?adType=0,0,1,0&keyword=0,0,0,0&adSize=0,0,728*70,0&itemSize=0,0,1,0&tbId=&pid=294&jsonp=?', function (data) {
					if(data.pinpai[0]){
						data.pinpai[0].href = 'http://search.taotaosou.com/transfer.htm?' + data.pinpai[0].href;
						bubbleWrap.innerHTML = template(data.pinpai[0]);
						unionWrap.appendChild(bubbleWrap);
						isGoToHight = true;
						randerEvent(bubbleWrap, isGoToHight);
						bubbleWrap.style.width = '728px';
						$('.media_bubble_frame').eq(0).addClass('mini');
					}
				});
			}
			//bubbleWrap.innerHTML = strTmpl('//showkc.taotaosou.com/brand.do?brandkeyword=brandNullKeyword&keyword=&brandItemSize=1&keywordType=true&source=294&brandRandom=100&adType=2&itemSize=18&height=70&width=728', true);
			//bubbleWrap.innerHTML = strTmpl('//showkc.taotaosou.com/imgShow.do?guid=' + J.utils.GUID);
			//bubbleWrap.innerHTML = strTmpl('//showkc.taotaosou.com/imgShow.do?jsCode=%26lt%3Bscript%20type%3D%26quot%3Btext%2Fjavascript%26quot%3B%26gt%3B%0D%0A%20%20%20%20google_ad_client%20%3D%20%26quot%3Bca-pub-3076727917833405%26quot%3B%3B%0D%0A%20%20%20%20google_ad_slot%20%3D%20%26quot%3B6432331177%26quot%3B%3B%0D%0A%20%20%20%20google_ad_width%20%3D%20300%3B%0D%0A%20%20%20%20google_ad_height%20%3D%20250%3B%0D%0A%26lt%3B%2Fscript%26gt%3B%0D%0A%26lt%3B!--%20xiatian-300x250%20--%26gt%3B%0D%0A%26lt%3Bscript%20type%3D%26quot%3Btext%2Fjavascript%26quot%3B%0D%0Asrc%3D%26quot%3B%2F%2Fpagead2.googlesyndication.com%2Fpagead%2Fshow_ads.js%26quot%3B%26gt%3B%0D%0A%26lt%3B%2Fscript%26gt%3B&width=300&height=250');
			/*unionWrap.appendChild(bubbleWrap);
			 isGoToHight = true;
			 randerEvent(bubbleWrap, isGoToHight);
			 bubbleWrap.style.width = '728px';
			 $('.media_bubble_frame').eq(0).addClass('mini');*/
		}
	}

	function randerEvent(warp, height) {
		var h = height ? 300 : 250;
		if (!isPaopao) {
			h = 70;
		}
		var oClose = document.getElementById('J_tts_bubble_close');
		setTimeout(function () {
			c.setCSS(warp, {
				display: 'block'
			});
			new StartMove(warp, {height: h}, MOVE_TYPE.BUFFER, function () {
				//成功展示埋点
				statistics('Union_Adframe_Autoshow');
			});
		}, 800);
		c.addEvent(oClose, 'click', function () {
			new StartMove(warp, {height: 0}, MOVE_TYPE.BUFFER, function () {
				warp.style.display = 'none';
				//广告框关闭按钮被用户点击的次数
				statistics('Union_Adframe_X');
			});
			if (!isPaopao) {
				if (pid393) {
					var time2 = 8;
				} else {
					var time1 = 5;
				}

				cookieName = 'TKads';
				c.cookie.set({
					name: cookieName,
					value: true,
					min: time1,
					hour: time2,
					path: '/',
					domain: host
				});
			}
		});
	}

	var href = window.location.href;
	// 广告单品点过去，不允许出现弹窗。
	// http://199.155.122.129:8080/pages/viewpage.action?pageId=19205611
	if (href.match(/tts_shield=true/)) {
		return;
	}

	var domainReg = /^[^\.]+\.(.+)$/i, // 去除域名第一个点之前的字段当作网站的域名
		domainMatchs = host.match(domainReg),
		domainName = host;

	if (domainMatchs !== null && domainMatchs[1] && domainMatchs[1].indexOf('.') !== -1) {
	 domainName = domainMatchs[1];
	 }

	function showPaopao(data, times, cookieName) {
		//开启js广告
		//init(data);
		// cookie已经存在，表明已经弹过广告，待cookie到期后，再弹广告


		//是泡泡 并且是自助渠道 剔除！
		if (cookieName === 'TKPaoPao' && J.utils.isManualDId) {
			return false;
		}
		if (c.cookie.get()[cookieName] === 'true') {
			return;
		} else {
			// 没有cookie时先写入cookie，cookie有效期2小时
			c.cookie.set({
				name: cookieName,
				value: true,
				hour: times,
				path: '/',
				domain: domainName
			});
			// cookie写入失败（例如设置浏览器禁止写入cookie）时，不弹广告
			if (c.cookie.get()[cookieName] === undefined) {
				return;
			} else {
				// cookie写入成功时，弹广告
				try {
					if (J.utils.DITCH_ID.match(/^(780).*/)) {
						c.getCookie('paopao', function (name) {
							if (!name) {
								init(data);
								c.setCookie({
									name: 'paopao',
									value: 'paopao',
									hour: times
								});
							}
						});
					} else {
						init(data);
					}

				} catch (ex) {
					console.error(ex.stack);
				}
			}
		}
	};
	body.on('config.success', function (e, data) {
		var adList = data.iA ? data.iA.adList ? data.iA.adList : [] : [],
			i = adList.length;
		//如果存在pid=294时,弹包断广告
		while (i--) {
			if (adList[i].pid === 294 || adList[i].pid === 393) {
				if (adList[i].pid === 393) {
					pid393 = true;
				}
				if (adList[i].status === true) {
					isPaopao = false;
					if (c.cookie.get()['TKads'] === 'true') {
						return;
					} else {
						init(data);
					}
					return;
				}
			}
		}
		if ('state' in data && !isRealwebSite()) {
			return;
		} else if (data.id && !data.confBubble.bubbleStatus) {
			return;
		}
		var times = 0.5,
			cookieName = 'TKPaoPao';
		if (data.keyType === 119 || data.keyType == 200 || data.keyType == 201 ||
			data.keyType == 202 || data.keyType == 203 || data.keyType == 204 ||
			data.keyType == 205) {
			times = 0.5;
		}

		showPaopao(data, times, cookieName)
	});
})
;

__tk__define(function (require, exports, module) {
	var TTSUI = require('./lib/jquery.min'),
		utils = require('./utils');
	if (utils.DITCH_ID === '7690010020140313') {
		return false;
	}
	require('./lib/jquery.tmpl.min');
	require('./lib/jquery.base64');
	require('./lib/jquery.popunder');

	var templates = require('./templates.jst');
	require('./mustache_helpers');

	require('./view/views').init();

	(function (window, TTSUI) {
		if (typeof window.TTSMedia !== "undefined") {
			return false;
		}
		window.TTSMedia = true;
		var document = window.document,
			cookie = window.document.cookie,
			global = "__TTS",
			globalBox,
		//ttsunionId,
			MEDIA_config;
		var url = window.location.href,
			host = window.location.host,
			flag = true,
			firstLoad = true,
			hashChange = true;
		var mediaSize = "_120x120.jpg";
		var mediaBox;
		var hasSim = false,
			hasBrand = false,
			hasCommon = false,
			hasMedia = false,
			getCurrentImgInProgress = false;
		var api = {
			kc: '//showkc.taotaosou.com/adShow163.do?',
			kctu: '//showkc.taotaosou.com/tumeiti.do?',
			re: '//re.taotaosou.com', //打点接口,
			log: '//dclog.taotaosou.com/statistics.do?systemName=tts_media',
			test: '//union.taotaosou.com/'
		};
		var body = TTSUI('body');

		// 根据渠道号判断插件是否是自主安装
		var isManualInstall = function () {
			if (utils.DITCH_ID.match(/^0001|^0011/)) {
				return true;
			}
			return false;
		};

		// 本地cookie的读写工具
		var cookieUtil = utils.cookie;

		/**
		 * 对象在浏览器里的相对位置
		 * @param elm 图片对象
		 * @return {Object} 放回top/left偏移量
		 */
		function getOffset(elm) {
			var left = 0;
			var top = 0;
			while (elm) {
				left += elm.offsetLeft;
				top += elm.offsetTop;
				elm = elm.offsetParent;
			}
			return {left: left, top: top};
		}

		/**
		 * 改变埋点URl路径
		 * @param {String} url 第一个url
		 */
		function changeUrl(url) {
			//TODO: substring 是否可以封装成一个方法
			if (url.match(/img[1-9]?.gtimg.com/)) {
				url = "http://img1" + url.substring(url.indexOf(".gtimg.com"));
			} else if (url.match(/.rayliimg.cn/)) {
				url = "http://image1" + url.substring(url.indexOf(".rayliimg.cn"));
			} else if (url.match(/biz.itc.cn/)) {
				url = "http://m1" + url.substring(url.indexOf(".biz.itc.cn"));
			} else if (url.match(/&f=/)) {
				url = "http://thumb1.yokacdn.com/p_420_625/" + url.substring(url.indexOf("&f=") + 3).replace(":", "") + ".jpg";
			} else if (url.match(/.cache./)) {
				url = 'http://img1' + url.substring(url.indexOf(".cache."));
			} else if (url.match(/.gtimg.cn/)) {
				url = 'http://soso1' + url.substring(url.indexOf(".gtimg.cn"));
			}
			if (url.match(/\?/)) {
				url = url.split('?')[0];
			}
			return url;
		}

		/**
		 * 删除DOM
		 */
		function delMedia() {
			if (TTSUI('.tts_media')[0]) {
				TTSUI('.tts_media').each(function (i, item) {
					item.parentNode.removeChild(item);
				});
			}
			flag = true;
		}

		/**
		 * 埋点
		 * @param imgId
		 * @param pObj
		 * @param objSub
		 * @param eObj
		 * @param eSub
		 * @param url
		 */
		function statistics() {
			//var arg = '';
			/*for (var i = 0, len = arguments.length; i < len; i++) {
			 arg += ',' + arguments[i];
			 }*/
			//load(api.log + '&pv=' + MEDIA_config.id + ',' + imgId + ',' + pObj + ',' + objSub + ',' + eObj + ',' + eSub);
			//TODO: MEDIA_config.id为空的时候？
			//load(api.log + '&pv=' + MEDIA_config.id + arg + ',' + window.location.href);
		}

		/**
		 * 过滤展示图片 如：display='none';
		 * @param img
		 * @return {Boolean}
		 */
		//TODO: 本方法只在 getCurrentPageImages() 使用，是否可以放进 getCurrentPageImages() 里面
		function isValidImage(img) {
			//["JPG", "PNG","JPEG"]
			var imgType = MEDIA_config.imgType;
			//下面的条件也会匹配到这样的图片 <img src="data:">
			//建议改成 img.src.match(/data:/)
			if (img.src && img.src.match(/data:/)) {
				return false;
			}
			if (skipImg(img)) {

				var fixSrc = img.src.split('?')[0].slice(-5).toUpperCase(),
					matchUnknown = false;
				if (fixSrc.match(/\./)) {
					matchUnknown = true;
				}
				for (var i = 0; i < imgType.length; i++) {
					var srcType = imgType[i].toUpperCase();
					if (fixSrc.match(srcType) || (!matchUnknown && srcType === 'UNKNOWN')) {
						/*if (img.width === 0 && img.height === 0) {
						 //var newImg = new Image();
						 //newImg.src = img.src;
						 if (newImg.width >= MEDIA_config.minWidth && newImg.height >= MEDIA_config.minHeight) {
						 return true;
						 }
						 } else */
						if (img.width >= MEDIA_config.minWidth && img.height >= MEDIA_config.minHeight) {
							return true;
						}
					}
				}
			}
			return false;
		}

		/**
		 * 特殊图片过滤图片
		 * @param img 图片对象
		 * @return {Boolean}
		 */
		function skipImg(img) {
			if (img.style.display === "none" || img.id === "preloadBig") {
				return false;
			}
			if (img.parentNode) {
				if (img.parentNode.style.display === "none" || img.parentNode.id === "accessPlay") {
					return false;
				} else if (img.parentNode.parentNode) {
					if (img.parentNode.parentNode.id === "nphLayoutGG" || img.parentNode.parentNode.id === "zuihoudiv" ||
						img.parentNode.parentNode.id === "htpGG") {
						return false;
					}
				}
			}
			return true;
		}

		/**
		 * 过滤spider采集图片
		 * @param img 图片对象
		 * @return {Boolean}
		 */
		/*function isValidSpiderImage(img) {
		 //imgType = ["JPG", "PNG","JPEG", "UNKNOWN"] 类型
		 var imgType = MEDIA_config.confSpider.imgType;
		 if (img.src && img.src.indexOf("data:") === 0) {
		 return false;
		 }
		 if (skipImg(img)) {
		 var fixSrc = img.src.split('?')[0].slice(-5).toUpperCase(),
		 matchUnknown = false;
		 if (fixSrc.match(/\./)) {
		 matchUnknown = true;
		 }
		 for (var i = 0; i < imgType.length; i++) {
		 var srcType = imgType[i].toUpperCase();
		 if (fixSrc.match(srcType) || (!matchUnknown && srcType === 'UNKNOWN')) {
		 if (img.width === 0 && img.height === 0) {
		 var newImg = new Image();
		 newImg.src = img.src;
		 if (newImg.width >= MEDIA_config.confSpider.macthWidth && newImg.height >= MEDIA_config.confSpider.macthHeight) {
		 return true;
		 }
		 } else if (img.width >= MEDIA_config.confSpider.macthWidth && img.height >= MEDIA_config.confSpider.macthHeight) {
		 return true;
		 }
		 }
		 }
		 }
		 return false;
		 }*/

		/**
		 * 匹配spider采集图片
		 * @param d document对象
		 * @param eImages 目标图片数组
		 * @param opts 图片信息
		 * @return {*} 返回目标图片数组
		 */
		/*function matchSpiderImage(d, eImages, opts) {
		 var _document = document || d;
		 eImages = eImages || [];
		 opts = opts || {};
		 for (var i = 0; i < _document.images.length; i++) {
		 var img = _document.images[i];
		 if (isValidSpiderImage(img)) {
		 if (opts) {
		 img._parentNode = opts.parentNode || null;
		 }
		 eImages.push(img);
		 }
		 }
		 return eImages;
		 }*/

		/**
		 * 加载js
		 * @param url 链接地址
		 * @param callback 回调
		 */
		function load(url, callback) {
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
		}

		/**
		 * 加载CSS
		 * @param url 地址
		 */
		function loadCSS(url) {
			var head = document.head || document.getElementsByTagName('head')[0],
				link = document.createElement('link');
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = url;
			head.appendChild(link);
		}

		/**
		 * 取图片
		 * @param d document对象
		 * @param eImages 目标图片数组
		 * @param opts 图片信息
		 * @return {*} 返回目标图片数组
		 */
		function getCurrentPageImages(d, eImages, opts) {
			var _document = document || d;
			eImages = eImages || [];
			opts = opts || {};
			for (var i = 0; i < _document.images.length; i++) {
				var img = _document.images[i];
				if (isValidImage(img)) {
					img = encapsulateImage(img);
					if (opts) {
						img._parentNode = opts.parentNode || null;
					}
					eImages.push(img);
				}
			}
			return eImages;
		}

		/**
		 * 分装图片
		 * @param img 图片对象
		 * @return {Object} 返回分装后的图片对象信息
		 */
		function encapsulateImage(img) {
			var obj = {
				x: img.getBoundingClientRect().left,
				y: img.getBoundingClientRect().top,
				src: changeUrl(img.src),
				img: img
			};
			return obj;
		}

		/**
		 * 过滤图片 如：图片在同一位置
		 * @param arr 图片数组
		 * @return {Array} 返回过滤后的图片数组
		 */
		function uniqImgObj(arr) {
			var object = {};

			function have(obj) {
				var temp = [];
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].y === obj.y) {
						temp.push(i);
					}
				}
				return temp;
			}

			for (var i = 0; i < arr.length; i++) {
				object[i] = arr[i];
				var num = have(arr[i]);
				if (num.length > 1) {
					for (var j = 0; j < num.length; j++) {
						delete object[num[j]];
					}
				}
			}
			arr = [];
			for (var name in object) {
				arr.push(object[name]);
			}
			return arr;
		}

		/**
		 * 获取媒体站配置信息
		 */
		function getConfig() {
			hasMedia = false;
			//TTSUI.getJSON(api.test + "getConfig.do?name=jsonp&unionid=" + ttsunionId +
			TTSUI.getJSON(api.test + "getConfig.do?name=jsonp&unionid=10003028" +
				"&host=" + encodeURIComponent(host) +
				"&jsonp=?" +
				"&url=" + encodeURIComponent(url), function (data) {
				// data = false;
				//data = {"id": 3000100111, "keyType": 2, "minWidth": 350, "minHeight": 350, "maxSize": 3, "bubbleStatus": false, "imgType": [
				// 'JPG', 'JPEG', 'GIF'], "priority": ["2"],
				//  "confBrand":{"adStyle":2,"popTime":3,"popNum":0,"hover":2,"popDirect":1,"closed":2},
				// "confSpider": {"macthNum": 5, "macthWidth": 310, "macthHeight": 310,
				// "imgType": ['JPG', 'JPEG', 'GIF']},
				// "confBubble": {"bubbleStatus": true, "bubbleType": 2, "jsStatus": true,
				// "probality": 100,
				// "jsCode": "\u0026lt;script type\u003d'text/javascript' src\u003d'http://ssp.juhuisuan.com/pjs/104.js{guid}'\u0026gt;\u0026lt;/script\u0026gt;"},
				// "iA": {"st": true,
				// "adList": [
				// {"pid": 383, "name": "股票页面左边对联", "width": 100, "height": 300, "number": 1, "status": true},
				// {"pid": 292, "name": "新浪微博文字链1", "width": 880, "height": 90, "number": 1, "status": true},
				// {"pid": 295, "name": "新浪微博文字链1", "width": 880, "height": 90, "number": 1, "status": true},
				// {"pid": 372, "name": "淘宝顶部2", "width": 880, "height": 90, "number": 1, "status": true},
				// {"pid": 371, "name": "淘宝顶部1", "width": 880, "height": 90, "number": 1, "status": true},
				// {"pid": 288, "name": "hao123文字链3", "width": 880, "height": 90, "number": 1, "status": true},
				// {"pid": 289, "name": "hao123文字链4", "width": 880, "height": 90, "number": 1, "status": true},
				// {"pid": 290, "name": "hao123文字链5", "width": 880, "height": 90, "number": 1, "status": true},
				// {"pid": 291, "name": "hao123文字链6", "width": 880, "height": 90, "number": 1, "status": true},
				// {"pid": 225, "name": "淘宝新首页1", "width": 880, "height": 90, "number": 2, "status": true},
				// {"pid": 226, "name": "淘宝list4", "width": 280, "height": 90, "number": 2, "status": true},
				// {"pid": 223, "name": "淘宝新首页1", "width": 880, "height": 90, "number": 2, "status": true},
				// {"pid": 224, "name": "淘宝新首页2", "width": 300, "height": 90, "number": 2, "status": true},
				// {"pid": 227, "name": "已买到的1", "width": 630, "height": 90, "number": 2, "status": true},
				// {"pid": 228, "name": "已买到的2", "width": 210, "height": 90, "number": 2, "status": true},
				// {"pid": 229, "name": "已买到的3", "width": 830, "height": 90, "number": 2, "status": true},
				// {"pid": 233, "name": "聚划算1", "width": 620, "height": 90, "number": 2, "status": true},
				// {"pid": 234, "name": "聚划算2", "width": 300, "height": 90, "number": 2, "status": true},
				// {"pid": 235, "name": "聚划算3", "width": 708, "height": 90, "number": 2, "status": true},
				// {"pid": 230, "name": "物流1", "width": 690, "height": 90, "number": 2, "status": true},
				// {"pid": 231, "name": "物流2", "width": 300, "height": 90, "number": 2, "status": true},
				// {"pid": 232, "name": "物流3", "width": 210, "height": 210, "number": 2, "status": true},
				// {"pid": 236, "name": "4399悬浮", "width": 100, "height": 300, "number": 1, "status": true},
				// {"pid": 237, "name": "7k7k悬浮", "width": 100, "height": 300, "number": 1, "status": true},
				// {"pid": 207, "name": "淘宝list1", "width": 230, "height": 230, "number": 1, "status": true},
				// {"pid": 238, "name": "淘宝新首页4", "width": 880, "height": 90, "number": 1, "status": true},
				// {"pid": 239, "name": "淘宝新首页5", "width": 300, "height": 90, "number": 1, "status": true},
				// {"pid": 240, "name": "购物车1", "width": 990, "height": 90, "number": 1, "status": true},
				// {"pid": 241, "name": "购物车2", "width": 990, "height": 90, "number": 1, "status": true},
				// {"pid": 242, "name": "淘宝下单页", "width": 950, "height": 90, "number": 1, "status": true},
				// {"pid": 243, "name": "天猫下单页", "width": 990, "height": 90, "number": 1, "status": true},
				// {"pid": 244, "name": "旧版收藏夹", "width": 830, "height": 90, "number": 1, "status": true},
				// {"pid": 245, "name": "新版收藏夹1", "width": 740, "height": 150, "number": 1, "status": true},
				// {"pid": 246, "name": "新版收藏夹2", "width": 300, "height": 150, "number": 1, "status": true},
				// {"pid": 247, "name": "我的淘宝1", "width": 720, "height": 90, "number": 1, "status": true},
				// {"pid": 248, "name": "我的淘宝2", "width": 359, "height": 90, "number": 1, "status": true},
				// {"pid": 249, "name": "天猫首页1", "width": 940, "height": 90, "number": 1, "status": true},
				// {"pid": 250, "name": "淘宝list1", "width": 940, "height": 90, "number": 1, "status": true},
				// {"pid": 205, "name": "淘宝首页2", "width": 300, "height": 300, "number": 2, "status": true},
				// {"pid": 285, "name": "淘宝首页APP二维码", "width": 88, "height": 114, "number": 1, "status": true},
				// {"pid": 286, "name": "比价商城APP二维码", "width": 88, "height": 114, "number": 1, "status": true},
				// {"pid": 287, "name": "比价商城APP广告浮层", "width": 502, "height": 384, "number": 1, "status": true},
				// {"pid": 255, "name": "比价商城APP广告浮层", "width": 502, "height": 384, "number": 1, "status": true},
				// {"pid": 257, "name": "\u5929\u732b\u627e\u4e86\u53c8\u627e\u5e95\u90e8", "width": 120, "height": 80, "number": 1, "status": false},
				// {"pid": 262, "name": "\u5929\u732bdetail\u53f3\u4fa71", "width": 190, "height": 90, "number": 1, "status": true},
				// {"pid": 256, "name": "\u5929\u732bdetail\u5934\u4e0a", "width": 120, "height": 80, "number": 1, "status": true},
				// {"pid": 257, "name": "\u5929\u732b\u627e\u4e86\u53c8\u627e\u5e95\u90e8", "width": 120, "height": 80, "number": 1, "status": true},
				// {"pid": 262, "name": "\u5929\u732bdetail\u53f3\u4fa71", "width": 190, "height": 90, "number": 1, "status": true}
				// ]},
				// "confPageBubble": {"pageStatus": true, "pageTime": 60, "pageUrl": "http://www.taotaosou.com/"},
				// "infoMedia": false};
				//load('//exts.taotaosou.com/browser-static/tmt/tts_union_bubble.js?v=@@timestamp');
				window.MEDIA_config = MEDIA_config = data;
				body.trigger('config.success', [data]);

				if (!data || 'state' in data) {
					return false;
				} else {
					var config = utils.getConfig();

					if (config.tmt.model.jiaohu || !utils.isManualDId) {
						init();
					}
				}
			});
		}

		/**
		 * 初始化
		 * @return {Boolean}
		 */
		function init() {
			if (!document.getElementById(global + '_union')) {
				globalBox = document.createElement('div');
				globalBox.id = global + '_union';
				document.body.appendChild(globalBox);
			} else {
				globalBox = document.getElementById(global + '_union');
			}
			var oldNum;
			//页面图片 改变
			var domChangeFn = function () {
				var imgNum = TTSUI("img").not(".tts_media img").not('#TK-log img').size();
				var domChangeImg = [];
				var intervalKey = setInterval(function () {
					if (TTSUI("img").not(".tts_media img").not('#TK-log img').size() !== imgNum) {
						domChangeImg = getCurrentPageImages();
						if (oldNum.length !== domChangeImg.length) {
							setTimeout(function () {
								//有可能domChangeFn和TTSUI("img").not(".tts_media img").load()同时触发
								if (getCurrentImgInProgress) {
									return;
								}
								getCurrentImg();
							}, 500);
						}
						clearInterval(intervalKey);
						domChangeFn();
					}
				}, 100);
			};
			//筛选图片
			function getCurrentImg() {
				getCurrentImgInProgress = true;
				var currentPageEImages = getCurrentPageImages();
				var uniqPageEImages = uniqImgObj(currentPageEImages);

				if (utils.isMediaSite()) {
					//require('./view/picBanner');			//资讯站点图片浮层banner
					body.trigger('page.img', [uniqPageEImages]);
				}
				oldNum = currentPageEImages;
				if (uniqPageEImages.length > 0) {
					//页面总pv!
					if (uniqPageEImages.length > MEDIA_config.maxSize) {
						uniqPageEImages.length = MEDIA_config.maxSize;
					}
					var _imgUrl = '';
					for (var j = 0, ulen = uniqPageEImages.length; j < ulen; j++) {
						_imgUrl += ',' + encodeURIComponent(changeUrl(uniqPageEImages[j].src));
					}
					delMedia(uniqPageEImages);
					regMedia(uniqPageEImages);
				} else {
					delMedia();
				}
				getCurrentImgInProgress = false;
			}

			var imgDelay = null;
			setTimeout(function () {
				getCurrentImg();
				domChangeFn();
				// 改变img src 的时候才触发
				TTSUI("img").not(".tts_media img").load(function () {
					if (hashChange && firstLoad) {
						firstLoad = false;
						if (imgDelay) {
							clearTimeout(imgDelay);
						}
						imgDelay = setTimeout(function () {
							firstLoad = true;
							if (getCurrentImgInProgress) {
								return;
							}
							getCurrentImg();
						}, 800);
					}
				});

			}, 500);
		}

		/**
		 * 初始化图媒体
		 */
		function init_media() {
			TTSUI(document).ready(function () {
				var hashTimer = null;
				loadCSS('//exts.taotaosou.com/browser-static/tmt/tmt.css?t=@@timestamp');
				getConfig();
				//TODO: 给 IE6/7 模拟 haschange 事件，封装到 $(window).bind('hashchange')
				//改变hash值 重新去图片
				//参考 KISSY: http://docs.kissyui.com/docs/html/api/core/event/hashchange.html
				if (('onhashchange' in window) && ((typeof document.documentMode === 'undefined') ||
					document.documentMode === 8)) {
					// 浏览器支持onhashchange事件
					TTSUI(window).bind('hashchange', function () {
						hashChange = false;
						delMedia();
						clearTimeout(hashTimer);
						hashTimer = setTimeout(function () {
							/*hasSim = false;
							 hasBrand = false;
							 hasCommon = false;*/
							//翻页不请求配置信息
							init();
						}, 500);
					});
				}
				else {
					var hash = document.location.hash;
					setInterval(function () {
						if (document.location.hash !== hash) {
							hash = document.location.hash;
							hashChange = false;
							delMedia();
							/*hasSim = false;
							 hasBrand = false;
							 hasCommon = false;*/
							//翻页不请求配置信息
							init();
						}
					}, 500);
				}
				clearMedia();
			});
		}

		/**
		 * 判断指定画报
		 */
		function matchPicUrl() {
			var arrUr = ["163.com/photoview", "qq.com/a", "pic.yule.sohu.com"];
			for (var i = 0; i < arrUr.length; i++) {
				if (url.indexOf(arrUr[i]) >= 0) {
					return true;
				}
			}
			return false;
		}

		/**
		 * 画报最后一页广告
		 * @return {Boolean}
		 */
		function lastPicAds() {
			if (TTSUI('.endpage')[0] && TTSUI('.endpage')[0].style.display === 'block' ||
				document.getElementById('photoLayout') && document.getElementById('photoLayout').style.display === 'block' ||
				document.getElementById('lastCon') && document.getElementById('lastCon').style.display === 'block' ||
				document.getElementById('adsFrame') && document.getElementById('adsFrame').style.display === 'block') {
				return true;
			}
			return false;
		}

		/**
		 * 针对画报翻到最后一页时
		 * 弹出广告去除标签
		 */
		function clearMedia() {
			if (matchPicUrl()) {
				TTSUI('body').bind('click', function () {
					setTimeout(function () {
						if (lastPicAds()) {
							delMedia();
						}
					}, 1000);
				});
			}
		}

		/**
		 * 去打点接口Api
		 * @param str 参数字符串
		 * @return {String}
		 */
		function getImageOfferApi(str) {
			var offerApi = '';
			if (url.match(/^.+image.baidu.com\/detail.+&column=(%E6%9C%8D%E9%A5%B0|%E6%98%8E%E6%98%9F).+$/)) {
				offerApi = api.test + 'data/getImageOffer.do?imgUrls=' + str +
					'&clientid=1&name=json&imgType=2';
			} else {
				offerApi = api.test + 'data/getImageOffer.do?imgUrls=' + str +
					'&clientid=1&name=json';
			}
			offerApi += '&jsonp=?';
			return offerApi;
		}

		/**
		 * 注册图媒体
		 * 首先请求后台管理系统
		 * @param eImages 图片数组
		 */
		//TODO: 缺少参数说明
		function regMedia(eImages) {
			//图媒体容器
			if (!document.getElementById('tts_media')) {
				mediaBox = document.createElement('div');
				mediaBox.className = 'tts_media';
				globalBox.appendChild(mediaBox);
			}
			var str = '';
			for (var i = 0, len = eImages.length; i < len; i++) {
				str += ',' + encodeURIComponent(eImages[i].src);
			}
			//TTSUI.getJSON(getImageOfferApi(str.substring(1)), function (data) {
			TTSUI(eImages).each(function (i, eImage) {
				/**
				 * 首先:请求内部后台打点信息接口, 判断图片当前状态 （可展示于否）
				 * 然后:一次请求广告系统，返回所有广告信息
				 */
					//getStaus(eImage, data);
				regImg(eImage);
			});
			//});
		}

		/**
		 * 判断图片状态 根据状态走相应流程
		 * @param eImage 图片对象
		 * @param data 打点信息
		 */
		function getStaus(eImage, data) {
			/**
			 * 优先级判断放广告系统；前端只负责数据展示
			 */
			var tagList = data.tagList;
			TTSUI(tagList).each(function (i, item) {
				var status = item.lhandleStatus;
				//针对百度图片采集转码的问题处理
				if (item.imageUrl.match(/hiphotos.baidu.com/)) {
					//item.imageUrl.replace(/w\\u003d/, 'w%3D').replace(/sign\\u003d/, 'sign=')
					var arr = item.imageUrl.split(/\//),
						conArr = eImage.src.split(/\//);
					item.imageUrl = arr[arr.length - 1];
					eImage.src = conArr[conArr.length - 1];
				}
				if (item.imageUrl === eImage.src) {
					switch (status) {
						case 4: //啥都不出
							return false;
						case 1: //出广告 有同款出同款
							regImg(eImage, item, i);
							break;
						case 2: //只不出相似广告
							regImg(eImage, 2, i);
							break;
						default :
							break;
					}
				}
			});
		}

		/**
		 * 对每张图片注册图媒体
		 * @param eImage 图片对象
		 * @param data 打点信息
		 * @param num 第几张图片
		 */
		function regImg(eImage, data, num) {
			if (!MEDIA_config.confBrand) {
				return false;
			}
			if (!utils.cookie.get().TKjiaohu) {
				new OwnMedia(eImage, MEDIA_config.confBrand).getBrand();
			}
		}

		/**
		 * 图媒体构造函数
		 * @param eImage 图片对象
		 * @param config 配置信息
		 * @constructor
		 */
		//TODO: 缺少参数说明
		function OwnMedia(eImage, config) {
			this.siteCid = MEDIA_config.keyType;
			this.config = config;
			this.imgObj = eImage;
			this.elm = this.imgObj.img;
			this.elmOffset = getOffset(this.elm);
			//展示pv
			hasSim = false;
			hasBrand = false;
			hasCommon = false;
		}

		/**
		 * 构造函数
		 * @type {Object}
		 */
		OwnMedia.prototype = {

			/*开启广告容器*/
			getGenerator: function () {
				var _this = this, divGenerator = document.createElement('div');
				divGenerator.className = 'J_brand_box brand_box';
				_this.brandObj = TTSUI(divGenerator);
			},

			getRelatedTarget: function (event) {
				if (event.relatedTarget) {
					return event.relatedTarget;
				} else if (event.toElement) {
					return event.toElement;
				} else if (event.fromElement) {
					return event.fromElement;
				} else {
					return null;
				}
			},

			//用到了单例模式，使超级99只会调用一次！
			displayData: function (data) {
				var _this = this;
				_this.displayData = function (data) {
					return _this.showBrand(data);
				};
				if (!data.res[0]) {
					return _this.getRecom(data);
				}
				if (data.res[0].from !== '6' && data.res.length < 15) {
					_this.getRecom(data);
				} else {
					_this.showBrand(data);
				}
			},

			/*请求广告接口*/
			getImageUnion: function (param) {
				var _this = this;
				TTSUI.ajax({
					url: param.url,
					cache: false,
					dataType: "jsonp",
					data: param.data,
					jsonp: "callback",
					success: function (data) {
						param.callback.call(_this, data, param.unionList);
					}
				});
			},

			/*对imageUnion接口返回的数据进行处理*/
			formatImageUnionData: function (data) {

				var _this = this, itemList = [], brandList = [], list = [],
					randomNum = Math.floor.call(null, Math.random() * 100);
				if (data.res) {
					TTSUI.each(data.res, function (i, item) {
						if (item.from === '6') {
							brandList.push(item);
						} else {
							itemList.push(item);
						}
					});
				}
				data.res = [];
				//50%出品牌广告
				//如果没有品牌广告，100%出单品广告
				list = brandList[0] && randomNum < 50 ? brandList : itemList;

				//如果list[]为空，则说明是要出单品广告时没有单品广告，所以只能出品牌广告
				if (list[0]) {
					_this.formatDisplay(list, data);
				} else {
					_this.formatDisplay(brandList, data);
				}

			},

			/*对推介接口返回的数据进行处理*/
			formatRecomData: function (list, data) {
				var _this = this, recomList = [];
				if (list.proList[0]) {
					TTSUI.each(list.proList, function (i, item) {
						item.id = '1';
						item.img = item.ttsPicUrl;
						item.url = item.clickUrl;
						recomList.push(item);
					});
				}
				_this.formatDisplay(recomList, data);
			},

			/*整理广告展现逻辑*/
			formatDisplay: function (list, data) {
				if (list) {
					TTSUI.each(list, function (i, item) {
						data.res.push(item);
					});
				}
				this.displayData(data);
			},

			/**
			 * 浏览器改变大小
			 */
			/*			iniResizeCom: function (siderTab) {
			 var _this = this;
			 //TODO: 同样的代码为何有两份？
			 TTSUI(window).resize(function () {
			 //var offset = TTSUI(_this.elm).offset();
			 var offset = getOffset(_this.elm);
			 var sidebarY = offset.top + 20,
			 sidebarX = TTSUI(_this.elm).width() + offset.left;
			 siderTab.css({
			 "left": sidebarX,
			 "top": sidebarY
			 });
			 });
			 TTSUI(window).scroll(function () {
			 //var offset = TTSUI(_this.elm).offset();
			 var offset = getOffset(_this.elm);
			 var sidebarY = offset.top + 20,
			 sidebarX = TTSUI(_this.elm).width() + offset.left;
			 siderTab.css({
			 "left": sidebarX,
			 "top": sidebarY
			 });
			 });
			 },*/
			/**
			 * 请求品牌广告
			 */
			getBrand: function () {

				var _this = this, param;
				param = {
					url: '//showkc.taotaosou.com/imageUnion.do',
					data: {
						guid: utils.GUID,
						siteCid: _this.siteCid,
						itemSize: 15,
						pid: 295,
						brandSize: 3
					},
					callback: _this.formatImageUnionData
				};

				if (_this.config.adStyle === 2) {
					_this.getImageUnion(param);
				}
			},

			/*请求超级99广告*/
			getRecom: function (unionList) {

				var _this = this, param;
				param = {
					url: '//recom.taotaosou.com/sales/pluKeywordRecom.do',
					data: {
						guid: utils.GUID
					},
					unionList: unionList,
					callback: _this.formatRecomData
				};
				_this.getImageUnion(param);
			},

			rotationEvent: function (data) {
				var _this = this, item = 1, imgHover = false, translatePx = 0, translateRangeX, translateRangeY, timeoutId, mediaElem = document.getElementsByClassName('tts_media')[0];

				if (data.res[0].from === '6') {
					translateRangeX = 260;
					translateRangeY = 85;
				} else {
					translateRangeX = 415;
					translateRangeY = 70;
				}

				function rotation() {
					if (_this.brandObj.find('.adsItem' + (item + 1)).eq(0).length > 0 && item < 3) {
						_this.brandObj.find('ul').css('transform', 'translate3d(-' + (translatePx + translateRangeX) + 'px,0px,0px)');
						item++;
						translatePx += translateRangeX;
						clearTimeout(timeoutId);
						timeoutId = setTimeout(rotation, 3000);
					} else if (item > 1) {
						_this.brandObj.find('ul').css('transform', 'translate3d(0px,0px,0px)');
						translatePx = 0;
						item = 1;
						clearTimeout(timeoutId);
						timeoutId = setTimeout(rotation, 3000);
						if (imgHover === false) {
							_this.brandObj.find('.tts_jiaohu_bar').css('top', translateRangeY);
						}
					} else {
						if (imgHover === false) {
							setTimeout(function () {
								_this.brandObj.find('.tts_jiaohu_bar').css('top', translateRangeY);
							}, 3000);
						}
					}
				}

				function isParent(obj, parentObj) {
					while (obj !== undefined && obj !== null && obj.tagName.toUpperCase() !== 'BODY') {
						if (obj === parentObj) {
							return true;
						}
						obj = obj.parentNode;
					}
					return false;
				}

				timeoutId = setTimeout(rotation, 3000);

				_this.brandObj.on('mouseenter', function (e) {

					if (isParent(_this.getRelatedTarget(e), mediaElem)) {
						return;
					}
					clearTimeout(timeoutId);
				});

				_this.brandObj.on('mouseout', function (e) {

					if (isParent(_this.getRelatedTarget(e), mediaElem)) {
						return;
					}
					clearTimeout(timeoutId);
					timeoutId = setTimeout(rotation, 3000);
				});

				_this.brandObj.find('.before').on('click', function () {
					if (_this.brandObj.find('.adsItem' + (item - 1)).eq(0).length > 0) {
						_this.brandObj.find('ul').css('transform', 'translate3d(-' + (translatePx - translateRangeX) + 'px,0px,0px)');
						translatePx -= translateRangeX;
						item--;
					}
				});

				_this.brandObj.find('.after').on('click', function () {
					if (_this.brandObj.find('.adsItem' + (item + 1)).eq(0).length > 0 && item < 3) {
						_this.brandObj.find('ul').css('transform', 'translate3d(-' + (translatePx + translateRangeX) + 'px,0px,0px)');
						translatePx += translateRangeX;
						item++;
					}
				});

				TTSUI(_this.imgObj.img).on('mouseover', function (e) {
					if (isParent(_this.getRelatedTarget(e), mediaElem)) {
						return;
					}
					imgHover = true;

					_this.brandObj.find('.tts_jiaohu_bar').css('top', '0px');
				});
				TTSUI(_this.imgObj.img).on('mouseout', function (e) {

					if (isParent(_this.getRelatedTarget(e), mediaElem)) {
						return;
					}
					_this.brandObj.find('.tts_jiaohu_bar').css('top', translateRangeY);
				});
			},

			/**
			 * 展示品牌广告
			 * @param data 广告系统的返回数据
			 */
			showBrand: function (data) {

				if (!data.res[0] || (data.res[0].from !== '6' && data.res.length < 3)) {
					return false;
				} else if (data.res[0] && data.res[0].from !== '6' && data.res.length < 15 && data.res.length % 5 !== 0) {
					var addNum = 5 - data.res.length % 5;
					data.res.forEach(function (item, i) {
						if (i < addNum) {
							data.res.push(item);
						}
					});
				}
				var _this = this;
				_this.getGenerator();

				var offset = getOffset(_this.elm);
				//品牌广告模板1
				if (data.res[0].from === '6') {
					_this.getBrandTmpl(2);
				} else {
					_this.getBrandTmpl(1);
				}
				_this.brandObj.append(_this.brandTmp({list: data.res}));

				if ((data.res[0].from === '6' && data.res.length < 2) || (data.res[0].from !== '6' && data.res.length < 6)) {
					_this.brandObj.find('.before').css('display', 'none');
					_this.brandObj.find('.after').css('display', 'none');
				}
				if (data.res[0].from !== '6') {
					TTSUI.each(_this.brandObj.find('div.TK_ul_wrap li.tts_jiaohu_item'), function (i, item) {
						if (i % 5 === 0) {
							TTSUI(item).addClass('listFirst');
						} else if ((i + 1) % 5 === 0) {
							TTSUI(item).addClass('listEnd');
						}
					});
				} else {
					_this.brandObj.css('padding', '0 50px');
				}
				var bannerY = offset.top + TTSUI(_this.elm).height() - _this.config.bannerHeight,
					bannerX = TTSUI(_this.elm).width() / 2 - _this.config.bannerWidth / 2 + offset.left;
				_this.brandObj.css({
					"left": bannerX,
					"top": bannerY
				}).appendTo(mediaBox);
				_this.eventBrand(data);
			},
			/**
			 * 添加广告事件，图框交互
			 * @param brandObj 广告节点对象
			 */
			//TODO: 这里有参数传进来吗？？
			eventBrand: function (data) {
				//是否隐藏
				var _this = this;

				//展现日志
				utils.statLog_one({
					systemName: "ttk_img_union",
					guid: utils.GUID,
					cid: data.cid,
					aclen: data.al,
					genlen: data.gl,
					reclen: data.rl,
					ctype: "null",
					ltype: 1,
					spid: ""
				});

				_this.brandObj.find("#J_tts_jiaohu_close").on('click', function () {
					_this.brandObj.hide();
					utils.cookie.set({
						name: 'TKjiaohu',
						value: true,
						min: 5,
						path: '/',
						domain: utils.host
					});
				});

				var dely = null;

				var item = _this.brandObj.find(".tts_jiaohu_item"),
					popItem = _this.brandObj.find(".tts_jiaohu_popitem");
				item.on({
					"mouseenter": function () {
						var $this = TTSUI(this);
						clearTimeout(dely);

						popItem.hide();
						$this.addClass("tts_jiaohu_active").find(".tts_jiaohu_popitem").show();
					},
					"mouseleave": function () {
						var $this = TTSUI(this);
						$this.removeClass("tts_jiaohu_active");
						dely = setTimeout(function () {
							$this.find(".tts_jiaohu_popitem").hide();
							clearTimeout(dely);
							dely = null;
						}, 200);
					}
				});

				popItem.on({
					"mouseenter": function () {
						var $this = TTSUI(this);
						clearTimeout(dely);
						$this.show();
					}
				});

				//点击日志
				_this.brandObj.find(".tts_jiaohu_alink, .tts_jiaohu_popitem_alink").on("click", function () {
					var $itme = TTSUI(this).closest(".tts_jiaohu_item");
					utils.statLog_one({
						systemName: "ttk_img_union",
						guid: utils.GUID,
						cid: data.cid,
						aclen: data.al,
						genlen: data.gl,
						reclen: data.rl,
						ctype: $itme.data("from"),
						ltype: 2,
						spid: $itme.data("id")
					});
				});
				//_this.iniResize();
				_this.rotationEvent(data);
			},
			/**
			 * 浏览器改变大小
			 */
			iniResize: function () {
				var _this = this;
				//TODO: 同样的代码为何有两份？
				TTSUI(window).resize(function () {
					//var offset = TTSUI(_this.elm).offset();
					var offset = getOffset(_this.elm);
					var bannerY = offset.top + TTSUI(_this.elm).height() - _this.config.bannerHeight,
						bannerX = TTSUI(_this.elm).width() / 2 - _this.config.bannerWidth / 2 + offset.left;
					_this.brandObj.css({
						"left": bannerX,
						"top": bannerY
					});
				});
				TTSUI(window).scroll(function () {
					//var offset = TTSUI(_this.elm).offset();
					var offset = getOffset(_this.elm);
					var bannerY = offset.top + TTSUI(_this.elm).height() - _this.config.bannerHeight,
						bannerX = TTSUI(_this.elm).width() / 2 - _this.config.bannerWidth / 2 + offset.left;
					_this.brandObj.css({
						"left": bannerX,
						"top": bannerY
					});
				});
			},
			/**
			 * 根据配置信息取广告模板
			 */
			getBrandTmpl: function (tmpType) {
				var _this = this;
				switch (tmpType) {
					case 1:
						_this.brandTmp = templates["tmt/jiaohu"];
						_this.config.bannerHeight = 221;
						_this.config.bannerWidth = 423;
						break;
					case 2:
						/*_this.brandADswftmpl = '<div id="J_tip_wrap" class="J_tip_wrap brand_tip_wrap"><object width="300" height="220" align="middle">' +
						 '<param name="allowScriptAccess" value="never"><param name="quality" value="high">' +
						 '<param name="wmode" value="transparent">' +
						 '<param name="movie" value="${media}">' +
						 '<embed wmode="transparent" src="${media}"' +
						 'quality="high" width="300" height="220" align="middle" allowscriptaccess="never" type="application/x-shockwave-flash"></object>' +
						 '<a href="${href}" class="AD_alink" target="_blank" title="${title}"></a>' +
						 '</div>';
						 _this.brandTmp = '<div class="brand_alink"><img src="${image}" height="195" width="25" alt="">' +
						 '<a href="${href}" class="TA_alink" target="_blank" title="${title}"></a></div>' +
						 '<div id="J_tip_wrap" class="J_tip_wrap brand_tip_wrap">' +
						 '<img src="${media}" height="220" width="300" alt="">' +
						 '<a href="${href}" class="AD_alink" target="_blank" title="${title}"></a></div>';*/
						_this.brandTmp = templates["tmt/pinpai"];
						_this.config.bannerHeight = 70;
						_this.config.bannerWidth = 330;
						break;
					default :
						break;
				}
			}
		};

		init_media();
	})(window, TTSUI);
});


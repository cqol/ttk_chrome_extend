(function (win) {
	function contentJs() {

		var isFrame = function () {
			if (win.self !== top) {
				return true;
			}
			return false;
		};
		if (typeof win.TTSBrowserPlugin !== 'undefined' || isFrame()) {
			return false;
		}
		/*
		 * 图媒体和淘同款同时覆盖的页面，只走淘同款的流程，屏蔽图媒体
		 */
		win.TTSBrowserPlugin = true;

		var ua = win.navigator.userAgent,
			host = win.document.location.host,
			href = win.document.location.href,
			tkLoad = document.getElementById('J---TK-load');

		var seaJS = chrome.extension.getURL('js/taobao/js/sea.js');
		// sea.js 的异步载入代码：
		function loadSeajs(seaJS, callback) {
			;
			(function (m, o, d, u, l, a, r) {
				if (m[o]) {
					win.__tk__define = win.define;
					return;
				}
				function f(n) {
					return function () {
						r.push(n, arguments);
						return a;
					};
				}

				m[o] = a = {args: (r = []), config: f(1), use: f(2), on: f(3)};
				m.TKdefine = f(0);
				u = d.createElement('script');
				u.id = o + 'node';
				u.charset = 'utf-8';
				u.async = true;
				u.src = seaJS;
				u.onload = u.onreadystatechange = function () {
					if (!u.isLoad && (!u.readyState || u.readyState === 'loaded' || u.readyState === 'complete')) {
						u.isLoad = true;
						if (typeof callback === 'function') {
							callback(u);
						}
						u.onload = u.onreadystatechange = null;
					}
				};
				if (d.getElementById('site-nav')) {
					l = d.getElementById('site-nav');
				} else {
					l = d.getElementsByTagName('head')[0];
				}
				l.appendChild(u);
			})(window, '__tk__seajs', document);
		}

		function loadCSS(url) {
			//加载 css 文件，
			//IE6 下无法使用 `innerHTML` <link> 标签，
			//所以这里改用 `createElement`。
			var head = document.head || document.getElementsByTagName('head')[0],
				link = document.createElement('link');

			link.rel = 'stylesheet';
			link.type = 'text/css';

			//Add timestamp
			if (url.match(/\?t=/) || url.match(/&t=/)) {
				url = url;
			} else {
				url += '?t=150811';
			}

			link.href = url;

			head.appendChild(link);
		}

		/**
		 * 使用 <script> 加载资源
		 * 用来加载 .js 文件和记录埋点
		 */
		function load(url, callback) {
			var script = document.createElement('script'),
				container;

			script.type = 'text/javascript';
			script.charset = 'utf-8';
			script.src = url;
			script.async = true;


			script.onload = script.onreadystatechange = function () {
				if (!script.isLoad && (!script.readyState || script.readyState === 'loaded' || script.readyState === 'complete')) {
					script.isLoad = true;
					if (typeof callback === 'function') {
						callback(script);
					}
					script.onload = script.onreadystatechange = null;
					script.parentNode.removeChild(script);
				}
			};

			if (document.getElementById('site-nav')) {
				container = document.getElementById('site-nav');
			} else {
				container = document.body;
			}

			container.appendChild(script);
		}

		/**
		 * 从入口center获取：渠道ID与浏览器类型
		 * @returns {{id: string, browser: string}}
		 */
		function getCenterData() {
			var dId = '0000000000000001',
				browser = getUA(),
				guid = '';

			if (tkLoad) {
				if (tkLoad.getAttribute('data-id')) {
					dId = tkLoad.getAttribute('data-id');
				}
				if (tkLoad.getAttribute('data-source')) {
					browser = tkLoad.getAttribute('data-source');
				}
				if (tkLoad.getAttribute('data-guid')) {
					guid = tkLoad.getAttribute('data-guid');
				}
			}
			return {
				id: dId,
				browser: browser,
				guid: guid
			};
		}

		/*var isManualInstall = function () {
		 if (!getCenterData().id || getCenterData().id.match(/^(0011|0001).*/
		/*)) {
		 return true;
		 }
		 return false;
		 };*/

		/**
		 * 获取浏览器类型
		 */
		function getUA() {
			var browserType = 'other';

			if (ua.match(/CoolNovo/)) {
				browserType = 'CoolNovo';
			}
			//搜狗高速浏览器
			else if (ua.match(/MetaSr/)) {
				browserType = 'sogou';
			}
			//360极速浏览器
			else if (ua.match(/QIHU 360EE/)) {
				browserType = '360js';
			}
			//Chrome浏览器
			else if (ua.match(/Chrome/)) {
				browserType = 'Chrome';
			}
			//IE浏览器
			else if (ua.match(/MSIE/)) {
				var re = /msie ([\d.]+)/ig,
					r = re.exec(ua);
				if (r !== null) {
					browserType = r[0];
				} else {
					browserType = 'ie';
				}
			}
			//360安全浏览器
			else if ((typeof win.external === 'object') &&
				( win.external.twGetRunPath ) &&
				win.external.twGetRunPath.match(/360se/)) {

				browserType = '360aq';
			}


			return browserType;
		}

		/**
		 * 唯一标识符号
		 */
		function newGuid() {
			var guid = 's-'; //前面添加key 与服务端的guid区分
			for (var i = 1; i <= 32; i++) {
				var n = Math.floor(Math.random() * 16.0).toString(16);
				guid += n;
				if ((i === 8) || (i === 12) || (i === 16) || (i === 20)) {
					guid += '-';
				}
			}
			return guid;
		}

		var sid = newGuid();
		win.jiayuId = sid;

		/**
		 * 已图片形式发送一个HTTP请求
		 * @param url
		 */
		function postImg(url) {
			var img = document.createElement('img'),
				logCon;
			if (typeof url === 'string') {
				//加时间戳，防止走缓存
				if (url.match(/\?/)) {
					url += '&t=';
				} else {
					url += '?t=';
				}
				url += new Date().getTime();
			}
			img.setAttribute('src', url);
			img.setAttribute('width', 0);
			img.setAttribute('height', 0);
			img.style.display = 'none';
			img.onerror = null;
			if (document.getElementById('TK-log')) {
				logCon = document.getElementById('TK-log');
			} else {
				logCon = document.createElement('div');
				logCon.id = 'TK-log';
				document.body.appendChild(logCon);
			}
			logCon.appendChild(img);
		}

		var userNick = '',
			cookie = document.cookie;
		if (cookie.match(/tracknick/)) {
			userNick = cookie.replace(/.*tracknick=/, '').replace(/;.*/, '');
		}

		/**
		 * 全网监控
		 */
		var ulrTest = '//dclog.taotaosou.com/statistics.do?systemName=ttk_all' +
			'&host=' + (host || '') +
			'&ditch=' + (getCenterData().id || '') +
			'&browser=' + (getCenterData().browser || '') +
			'&url=1' +
			'&ref=' + (win.encodeURIComponent(win.document.referrer) || '') +
			'&sid=' + win.jiayuId +
			'&z1_guid=' + getCenterData().guid +
			'&z2_nick=' + win.encodeURIComponent(userNick);
		postImg(ulrTest);

		/**
		 * 统计APV
		 */
		function apv() {
			var url = '//log.taotaosou.com/browser_statistics.do?',
				siteName = '';

			//蘑菇街对应栏目：逛街啦、专辑、喜欢、宝贝、晒货、搭配
			if (href.match('www.mogujie.com/note/') || href.match('www.mogujie.com/group/topic/')) {
				siteName = 'MGJ_Note_PV';
			}
			//美丽说
			else if (href.match('meilishuo.com')) {
				siteName = 'MLS_Share_PV';
			}

			if (siteName) {
				postImg(url + 'type=' + siteName);
			}
		}

		/**
		 * 渠道质量鉴定
		 * 需求：http://199.155.122.167:8080/pages/viewpage.action?pageId=13369546
		 */
		function checkDitchQuality() {
			var url = '//log.taotaosou.com/ditchSite.do?',
				site = '';

			if (host.match(/baidu.com/)) {
				site = 'baidu.com';
			} else if (host.match(/qq.com/)) {
				site = 'qq.com';
			} else if (host.match(/taobao.com/)) {
				site = 'taobao.com';
			} else if (host.match(/tmall.com/)) {
				site = 'tmall.com';
			} else if (host.match(/4399.com/)) {
				site = '4399.com';
			} else if (host.match(/360.cn/)) {
				site = '360.cn';
			} else if (host.match(/youku.com/)) {
				site = 'youku.com';
			}

			if (site) {
				postImg(url + 'ditchId=' + getCenterData().id + '&fromSite=' + site + '&z1_guid=' + getCenterData().guid);
			}
		}

		/**
		 * 淘宝版
		 */
		function taobao() {
			try {
				var loadTTK = chrome.extension.getURL('js/taobao/js/ttk.js');
				var taobaoCSS = chrome.extension.getURL('css/taobao.css');
				loadSeajs(seaJS, function () {
					loadCSS(taobaoCSS);
					load(loadTTK);
				});
			} catch (e) {
				postImg('//log.taotaosou.com/browser_statistics.do?type=center_err');
			}
		}

		/**
		 * 广告系统V1.0-淘同款QQ空间工具条；
		 * 需求地址：http://199.155.122.129:8080/pages/viewpage.action?pageId=16124453
		 */
		function qzone() {
			var rhost = 'user.qzone.qq.com';

			if (host === rhost) {
				if (!getCenterData().id.match(/B611040020150619/)) {
					var qzoneSrc = chrome.extension.getURL('js/qzone.js');
					load(qzoneSrc);
				}
			}
		}

		/**
		 * 大图媒体站
		 * 需求地址：http://199.155.122.129:8080/pages/viewpage.action?pageId=7012633
		 */
		function unionMedia() {
			if (!href.match(/hzwuzhou|chaoji99|etao|alipay|zhifubao|alimama|alibaba|360safe.com|ie.sogou.com|liebao.cn|maxthon.cn|chrome.google.com\/webstore/)) {
				if (!getCenterData().id.match(/B611040020150619/)) {
					var tmtSrc = chrome.extension.getURL('js/tmt/tmt.js');
					var tmtCSS = chrome.extension.getURL('css/tmt.css');
					loadCSS(tmtCSS);
					load(tmtSrc);
				}
			}
		}

		/**
		 * 百度统计
		 */
		function baiduStat() {
			var baidu = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'hm.baidu.com/h.js?';

			load(baidu + 'f5127c6793d40d199f68042b8a63e725');
		}

		/**
		 * 对 DOMReady 的封装
		 * IE插件必须在 DOMReady 后载入JS，否则会出现不执行的情况
		 * 其余浏览器正常载入
		 */
		function ready(callback) {
			var ttsDomReady = function (success) {
				if (document.readyState === 'complete') {
					success();
				} else if (document.addEventListener) {
					document.addEventListener('DOMContentLoaded', success, false);
					win.addEventListener('load', success, false);
				} else {
					document.attachEvent('onreadystatechange', success);
				}
			};

			if (!callback) {
				return false;
			}

			if (ua.match(/MSIE/)) {
				ttsDomReady(function () {
					callback();
				});
			} else {
				callback();
			}
		}

		/**
		 * 继承
		 * @param c 孩子
		 * @param p 父亲
		 */
		function extend(p, cil) {
			var c = cil || {};
			for (var i in p) {
				if (typeof p[i] === 'object') {
					c[i] = (p[i].constructor === Array) ? [] : {};
					extend(p[i], c[i]);
				} else {
					c[i] = p[i];
				}
			}
			return c;
		}

		/**
		 * 初始化淘同款
		 */
		ready(function () {
			var configUrl = chrome.extension.getURL('js/config.js');
			load(configUrl, function () {
				var config = {
					media: {
						def: true
					},
					taobao: {
						def: true,
						model: {
							list: true,
							detail: true,
							lds: true
						}
					},
					tmt: {
						def: true,
						model: {
							shopSite: false, //购物站
							paopao: true,
							insert: true, //插入
							href: true,
							qzone: true,
							cps: true
						}
					}
				};

				if (win.TK_config) {
					config = extend(win.TK_config, config);
				}
				checkDitchQuality();

				apv();
				if (config.taobao.def) {
					taobao();
				}

				var arrHref = ['taobao', 'tmall', 'jd', 'vip', 'mogujie', 'meilishuo'];
				if (config.tmt.def) {
					if (config.tmt.model.qzone) {
						qzone();
					}

					//淘内
					if (config.tmt.model.shopSite) {
						for (var i = 0; i < arrHref.length; i++) {
							if (host.indexOf(arrHref[i]) >= 0) {
								unionMedia();
								break;
							}
						}
					} else { //全站
						unionMedia();
					}
				}
			});
		});

		baiduStat();
	}

	(function () {
		sogouExplorer.extension.sendRequest({"command": "cmdInject"}, function(res){
			if (document.getElementById('J---TK-load') == null) {
				try {
					var value = res;
					var js = document.createElement('div');
					js.id = "J---TK-load";
					js.setAttribute('data-id', value.qdid);
					js.setAttribute('data-guid', value.guid);
					js.setAttribute('data-source', value.source);
					js.setAttribute('data-browser', value.browser);
					js.setAttribute('data-version', value.version);
					js.setAttribute('data-message', value.isNeedMessage);

					document.body.appendChild(js);

					contentJs();
				} catch (err) {
					console.log(err);
				}
			}
		});

	})(jQuery);

})(window);

/**
 * 插入广告
 */
__tk__define(function (require, exports, module) {
//插入广告
	var location = window.location,
		host = location.host,
		href = location.href,
		domainResult = true,
		$ = require('../lib/jquery.min'),
		J = {
			utils: require('../utils')
		},
		body = $('body');
	if (href.match(/tts_shield=true/) || J.utils.isManualDId) {
		return false;
	}

	//生效页面
	var domain = [
		'item.taobao.com',
		'detail.tmall.com'
	];

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
			url += '?t=@@timestamp';
		}

		link.href = url;

		head.appendChild(link);
	}

	for (var i = 0; i < domain.length; i++) {
		if (host === domain[i]) {
			domainResult = true;
			break;
		} else {
			domainResult = false;
		}
	}
	if (!domainResult) {
		return false;
	}


	//暴露接口
	var siteName = {
		//淘宝detail
		isTbDetail: host === 'item.taobao.com',

		//天猫detail
		isTmDetail: host === 'detail.tmall.com'

	};

	body.on('config.success', function (e, data) {
		var model = {
			tmt: {
				status: function () {
					body.trigger('tmt.show', [data]);
				},
				get: function (adlist, pid, wrap, float) {
					var dataKey;
					if (adlist.length !== 0) {
						for (var i = 0, len = adlist.length; i < len; i++) {
							if (adlist[i].pid === pid) {
								dataKey = adlist[i];
							}
						}
					}
					if (typeof dataKey === 'undefined' || !dataKey.status) {
						wrap.hide();
						return false;
					}
				},
				showIcon: function (adlist, pid) {
					var dataKey;
					if (adlist.length !== 0) {
						for (var i = 0, len = adlist.length; i < len; i++) {
							if (adlist[i].pid === pid) {
								dataKey = adlist[i];
							}
						}
					}
					if (typeof dataKey === 'undefined' || !dataKey.status || typeof localStorage === 'undefined' || localStorage.getItem('show_icon')) {

						return false;
					} else {
						return true;
						//renderIcon(dataKey, wrap);
					}
				},

				fetch: function () {
					body.on('tmt.show', function (e, data) {
						if (data === false || 'state' in data) {
							return false;
						} else {
							if (data.iA.st === false) {
								return false;
							} else {
								body.trigger('tmt.status.init', [data]);
							}
						}
					});
					this.status();

				}
			}

		};

		function iconEvent(obj, type) {
			postImg(type + '_rename_ad_success');
			obj.find('.J_icon_close').on('click', function () {
				obj.hide();
				postImg(type + '_rename_ad_close');
				//localStorage.setItem('show_icon', true);
			});
			obj.find('.J_icon_body').on('click', function () {
				postImg(type + '_rename_ad_click');
			});
		}

		/**
		 * 已图片形式发送一个HTTP请求
		 * @param url
		 */
		function postImg(type) {
			var img = document.createElement('img'),
				url = '//log.taotaosou.com/browser_statistics.do?type=' + type,
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

		function getBrand(data) {
			var adlist = data.iA.adList;
			var getTKcon = null,
				delyTKcon = null;
			if (siteName.isTbDetail) {
				showIcon(function () {
					if (model.tmt.showIcon(adlist, 255)) {
						delyTKcon = setInterval(function () {
							if (document.getElementById('TTK-sub-wrap')) {
								getTKcon = $('#TTK-sub-wrap');
								$.getJSON(J.utils.api.kctu + 'adType=0,0,1,0&keyword=0,0,' + encodeURIComponent('淘宝detail头上') + ',0&adSize=0,0,120*80,0&itemSize=0,0,1,0' +
									'&tbId=&pid=' + 255 + '&domain=' + host +
									'&isCps=true&cpsTbName=ttsunio&jsonp=?', function (data) {
									if (!data || !data.pinpai[0]) {
										return;
									} else {
										var tpl = '<div style="z-index: 405548810; position: absolute; margin-left: 400px;">' +
											'<span class="J_icon_close" title="关闭" style="display: block; z-index: 2; position: absolute; bottom: 6px; right: 3px; text-align: center; height: 12px; width: 12px; background-color: #999; color: #fff; line-height: 10px; border-radius:10px; cursor: pointer;">x</span>' +
											'<a href="' + data.pinpai[0].href + '" class="J_icon_body" target="_blank">' +
											'<img src="' + data.pinpai[0].media + '" alt=""></a></div>';
										var wrap = $(tpl);
										wrap.css({
											'top': getTKcon.offset().top - 69,
											'left': getTKcon.offset().left
										}).appendTo(body);
										iconEvent(wrap, 'TBdetail');
									}
								});
								clearInterval(delyTKcon);
								delyTKcon = null;
							}
						}, 200);
					}
				});
			}
			else if (siteName.isTmDetail) {
				showIcon(function () {
					if (model.tmt.showIcon(adlist, 256)) {
						delyTKcon = setInterval(function () {
							if (document.getElementById('TTK-sub-wrap')) {
								getTKcon = $('#TTK-sub-wrap');
								$.getJSON(J.utils.api.kctu + 'adType=0,0,1,0&keyword=0,0,' + encodeURIComponent('淘宝detail头上') + ',0&adSize=0,0,120*80,0&itemSize=0,0,1,0' +
									'&tbId=&pid=' + 256 + '&domain=' + host +
									'&isCps=true&cpsTbName=ttsunio&jsonp=?', function (data) {
									if (!data || !data.pinpai[0]) {
										return;
									} else {
										var tpl = '<div style="z-index: 405548810; position: absolute; margin-left: 400px;">' +
											'<span class="J_icon_close" title="关闭" style="display: block; z-index: 2; position: absolute; bottom: 6px; right: 3px; text-align: center; height: 12px; width: 12px; background-color: #999; color: #fff; line-height: 10px; border-radius:10px; cursor: pointer;">x</span>' +
											'<a href="' + data.pinpai[0].href + '" class="J_icon_body" target="_blank">' +
											'<img src="' + data.pinpai[0].media + '" alt=""></a></div>';
										var wrap = $(tpl);
										wrap.css({
											'top': getTKcon.offset().top - 84,
											'left': getTKcon.offset().left
										}).appendTo(body);
										iconEvent(wrap, 'TBdetail');
									}
								});
								clearInterval(delyTKcon);
								delyTKcon = null;
							}
						}, 200);
					}
				});
			}
		}
		//判断cookie 显示广告
		function showIcon(callback) {
			if (!callback) {
				return false;
			}
			// cookie已经存在，表明已经弹过广告，待cookie到期后，再弹广告
			if (J.utils.cookie.get().TKshowIcon === 'true') {
				return;
			} else {
				// 没有cookie时先写入cookie，cookie有效期2小时
				J.utils.cookie.set({
					name: 'TKshowIcon',
					value: true,
					hour: 2,
					path: '/',
					domain: host
				});
				// cookie写入失败（例如设置浏览器禁止写入cookie）时，不弹广告
				if (J.utils.cookie.get().TKshowIcon === undefined) {
					return;
				} else {
					// cookie写入成功时，弹广告
					try {
						callback();
					} catch (ex) {
						console.error(ex.stack);
					}
				}
			}
		}


		body.on({
			'tmt.status.init': function (e, data) {
				getBrand(data);
			}
		});
		model.tmt.fetch();
	});
});

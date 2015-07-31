/**
 * 插入广告
 */
__tk__define(function (require, exports, module) {
//插入广告
  var location = window.location,
    host = location.host,
    href = location.href,
    tbListS = 's.taobao.com',
    tbList = 'list.taobao.com',
    domainResult = true,
		$ = require('../lib/jquery.min'),
    J = {
      utils: require('../utils')
    },
    body = $('body');
  if (href.match(/tts_shield=true/)) {
    return false;
  }

  //生效页面
  var domain = [
    'www.taobao.com',
    'www.tmall.com',
    'item.jd.com',
		'shop.mogujie.com',
		'www.meilishuo.com',
    'list.taobao.com',
    's.taobao.com',
    'trade.taobao.com',
    'buyer.trade.taobao.com',
    'cart.taobao.com',
    'ju.taobao.com',
    'detail.ju.taobao.com',
    'buy.taobao.com',
    'wuliu.taobao.com',
    //'favorite.taobao.com',
    'shoucang.taobao.com',
    'i.taobao.com',
    'buy.tmall.com',
    'www.7k7k.com',
    'www.4399.com',
    'www.qidian.com',
    'user.qzone.qq.com',
    'item.taobao.com',
    'detail.tmall.com',
    'baoxian.taobao.com',
    'licai.taobao.com',
    'zln.taobao.com',
    'bijia.taotaosou.com',
    'www.hao123.com',
    'weibo.com'
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
    //淘宝 list
    isTBList: host === tbList || host === tbListS,
    //淘宝首页

    isHomeTB: host === 'www.taobao.com',

    isHomeTM: host === 'www.tmall.com',
    // 已购买页
    isTrade: host === 'buyer.trade.taobao.com' || host === 'trade.taobao.com',
    //聚划算页
    isJu: host === 'ju.taobao.com',

    isJuDetail: host === 'detail.ju.taobao.com',
    //淘宝 物流页
    isWuliu: host === 'wuliu.taobao.com',

    is7K7k: host === 'www.7k7k.com',

    is4399: host === 'www.4399.com',

    isCart: host === 'cart.taobao.com',

    isBuy: host === 'buy.taobao.com',

    isTMBuy: host === 'buy.tmall.com',

    isFav: host === 'shoucang.taobao.com',

    isITB: host === 'i.taobao.com',

    isQidian: host === 'www.qidian.com',

    isQzone: host === 'user.qzone.qq.com',

    //淘宝detail
    isTbDetail: host === 'item.taobao.com',

    //天猫detail
    isTmDetail: host === 'detail.tmall.com',

    //淘宝保险
    isBaoxiang: host === 'baoxian.taobao.com',

    isLicai: host === 'licai.taobao.com',

    //中老年页面
    isZln: host === 'zln.taobao.com',

    //比价商城
    isBijia: host === 'bijia.taotaosou.com',

    //hao123
    isHao123: host === 'www.hao123.com',

    //weibo
    isWeibo: host === 'weibo.com'

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

          body.trigger('tmt.sync.success', [
            {},
            dataKey,
            wrap,
            float
          ]);
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
				J.utils.cookie.set({
					name: 'TKshow11Icon',
					value: true,
					hour: 1,
					path: '/',
					domain: host
				});
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
      var doubleAdWrap,
        AdWrap;
      var float_left = $('<div style="right: 50%; position: fixed; margin-right: 510px; top: 150px;_position: absolute; _top: expression(documentElement.scrollTop + 200);"></div>'),
        float_right = $('<div style="left: 50%; position: fixed; margin-left: 510px; top: 150px; _position: absolute; _top: expression(documentElement.scrollTop + 200);"></div>'),
      //float_gif3 = $('<div id="niuniu" style="left: 50%; position: fixed; margin-left: 510px; bottom: 100px; _position: absolute; _top: expression(documentElement.scrollTop + 200);"><a class="J_icon_close" title="关闭" href="javascript:;" style="display: block; z-index: 2; position: absolute; top: 25px; right: 10px; height: 15px; width: 15px; _background-image: url(about:blank);"></a><a href="http://bijia.taotaosou.com/worthBuyDetail.html?worthId=609" class="J_icon_body" target="_blank"><img src="//exts.taotaosou.com/browser-static/tmt/fool.gif" alt=""></a></div>'),
      //float_gif1 = $('<div style="z-index: 405548810; left: 50%; position: absolute; margin-left: 270px;"><a class="J_icon_close" title="关闭" href="javascript:;" style="display: block; z-index: 2; position: absolute; bottom: 6px; right: 3px; height: 13px; width: 13px; _background-image: url(about:blank);"></a><a href="http://bijia.taotaosou.com/worthBuyDetail.html?worthId=609" class="J_icon_body" target="_blank"><img src="//exts.taotaosou.com/browser-static/tmt/fool.gif" alt=""></a></div>'),
      //float_gif2 = $('<div style="z-index: 405548810; position: absolute; margin-left: 400px;"><a class="J_icon_close" title="关闭" href="javascript:;" style="display: block; z-index: 2; position: absolute; bottom: 6px; right: 3px; height: 13px; width: 13px; _background-image: url(about:blank);"></a><a href="http://bijia.taotaosou.com/worthBuyDetail.html?worthId=609" class="J_icon_body" target="_blank"><img src="//exts.taotaosou.com/browser-static/tmt/fool.gif" alt=""></a></div>'),
      //float_gif4 = $('<div style="z-index: 405548810; position: absolute; margin: 6px 0 0 33px;"><a class="J_icon_close" title="关闭" href="javascript:;" style="display: block; z-index: 2; position: absolute; bottom: 6px; right: 3px; height: 13px; width: 13px; _background-image: url(about:blank);"></a><a href="http://bijia.taotaosou.com/worthBuyDetail.html?worthId=609" class="J_icon_body" target="_blank"><img src="//exts.taotaosou.com/browser-static/tmt/fool.gif" alt=""></a></div>'),
        ewm = '',
        linkword = '',
        pro = '',
        xunhuan = null,
        tmple = '',
        timer = null;
      var getTKcon = null,
        getIdscon = null,
        delyTKcon = null,
        delyIdscon = null;
      if (siteName.is4399) {
        float_left.appendTo(body);
        float_right.appendTo(body);
        model.tmt.get(adlist, 236, float_left);
        model.tmt.get(adlist, 236, float_right);
        /*if (model.tmt.showIcon(adlist, 252)) {
         float_gif3.css({
         'bottom': 300
         }).appendTo(body);
         iconEvent(float_gif3, '4399');
         }
        if ($('.sch_my')[0]) {
          AdWrap = $('<div></div>');
          AdWrap.insertAfter($('.sch_my'));
          model.tmt.get(adlist, 210, AdWrap, 'none');
        }*/
        if ($('.middle_2')[0]) {
          AdWrap = $('<div></div>');
          AdWrap.insertAfter($('.middle_2'));
          model.tmt.get(adlist, 209, AdWrap, 'none');
        }
      }
      else if (siteName.is7K7k) {
        float_left.appendTo(body);
        float_right.appendTo(body);
        model.tmt.get(adlist, 237, float_left);
        model.tmt.get(adlist, 237, float_right);
        /*if (model.tmt.showIcon(adlist, 253)) {
         float_gif3.css({
         'bottom': 300
         }).appendTo(body);

         iconEvent(float_gif3, '7k7k');
         }*/
        if ($('.main-top')[0]) {
          AdWrap = $('<div></div>');
          AdWrap.insertAfter($('.main-top').eq(0));
          model.tmt.get(adlist, 211, AdWrap, 'none');
        }
      }
      //新年活动入口
      else if (siteName.isTbDetail) {
				if (model.tmt.showIcon(adlist, 255)) {
					shouTips(function () {
						delyTKcon = setInterval(function () {
							if ($('.cqol')[0]) {
								getTKcon = $('.cqol');
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
					});
				}
        if ($('#J_MainWrap')[0]) {
          AdWrap = $('<div></div>');
          AdWrap.appendTo($('#J_MainWrap'));
          model.tmt.get(adlist, 266, AdWrap, 'none');
        }
      }
      else if (siteName.isTmDetail) {
				if (model.tmt.showIcon(adlist, 256)) {
					shouTips(function () {
						delyTKcon = setInterval(function () {
							if ($('.cqol')[0]) {
								getTKcon = $('.cqol');
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
					});
				}

        /*if ($('#detail')[0]) {
          timer = setInterval(function () {
            if (window.TKldsData === false) {
              clearInterval(timer);
              timer = null;
            } else if (window.TKldsData && window.TKldsData[0]){
              //渲染
              if (window.TKldsData.length >= 6) {
                var showldsData = window.TKldsData.reverse()
                showldsData.length = 6;
                tmple += '<div class="TK-lds-warp"><div class="cont"><ul>';
                $.each(showldsData, function (i, item) {
                  item.picUrl = item.picUrl + '_180x180.jpg';
                  if (item.ttsid) {
                    item.clickUrl = "http://search.taotaosou.com/transfer.htm?http://item.taotaosou.com/" + item.ttsid + ".html?utm_source=TM_Detail_rec&utm_medium=ttk&utm_campaign=detail"
                  } else {
                    item.clickUrl = 'http://search.taotaosou.com/transfer.htm?' + item.clickUrl;
                  }
                  tmple += '<li>' +
                    '<div class="ipic">'+
                    '<a data-stat="' + item.stat + '" title="' + item.title + '" href="' + item.clickUrl + '"' + item.title + '" target="_blank">' +
                    '<img src="' + item.picUrl + '"></a>'+
                    '</div>' +
                    '<p class="title">' +
                    '<a data-stat="' + item.stat + '" href="' + item.clickUrl + '" title="' + item.title + '" target="_blank">' + item.title + '</a>' +
                    '</p>' +
                    '<p class="price clearfix">' +
                    '<span class="g_price g_price-highlight">' +
                    '<span>¥</span><strong>' + item.promoPrice + '</strong>'+
                    '</span>' +
                    '</p>' +
                    '</li>';
                });
                tmple += '</ul></div></div>';
                $(tmple).insertBefore('#bd');
                body.on("click", ".TK-lds-warp a", function () {
                  if($(this).data().stat === true) {
                    J.utils.stat('TM_Detail_P4P_Banner');
                  } else {
                    J.utils.stat('TM_Detail_P4P_Banner_Cps');
                  }
                });
              }
              clearInterval(timer);
              timer = null;
            }
          },100);
        }
        //看了又看 插入广告
        if (!href.match(/tts_shield=true/)) {
          var getAct = null;
          getAct = setInterval(function () {
            if ($('.ALDCLS-act')[0]) {
              clearInterval(getAct);
              getAct = null;
              var tmp = '<div style="margin-top: -28px;"><div class="ald-hd"> <s></s><span>推荐上新品牌</span></div></div>';
              AdWrap = $(tmp);
              AdWrap.insertAfter($('.ald-carousel').eq(0));
              model.tmt.get(adlist, 262, AdWrap, 'none');
            }
          }, 200);
        }*/
      }
			else if (J.utils.siteName.isB2CDetail) {
				if (model.tmt.showIcon(adlist, 390)) {
					shouTips(function () {
						delyTKcon = setInterval(function () {
							if ($('.cqol')[0]) {
								getTKcon = $('.cqol');
								$.getJSON(J.utils.api.kctu + 'adType=0,0,1,0&keyword=0,0,' + encodeURIComponent('淘宝detail头上') + ',0&adSize=0,0,120*80,0&itemSize=0,0,1,0' +
								'&tbId=&pid=' + 390 + '&domain=' + host +
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
											'top': getTKcon.offset().top - 20,
											'left': getTKcon.offset().left
										}).appendTo(body);
										iconEvent(wrap, 'TBdetail');
									}
								});
								clearInterval(delyTKcon);
								delyTKcon = null;
							}
						}, 200);
					});
				}
			}
			else if (J.utils.siteName.isMLSDetail) {
				if (model.tmt.showIcon(adlist, 392)) {
					shouTips(function () {
						delyTKcon = setInterval(function () {
							if ($('.cqol')[0]) {
								getTKcon = $('.cqol');
								$.getJSON(J.utils.api.kctu + 'adType=0,0,1,0&keyword=0,0,' + encodeURIComponent('淘宝detail头上') + ',0&adSize=0,0,120*80,0&itemSize=0,0,1,0' +
								'&tbId=&pid=' + 392 + '&domain=' + host +
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
											'top': getTKcon.offset().top - 30,
											'left': getTKcon.offset().left
										}).appendTo(body);
										iconEvent(wrap, 'TBdetail');
									}
								});
								clearInterval(delyTKcon);
								delyTKcon = null;
							}
						}, 200);
					});
				}
			}
			else if (J.utils.siteName.isMGJDetail) {
				if (model.tmt.showIcon(adlist, 391)) {
					shouTips(function () {
						delyTKcon = setInterval(function () {
							if ($('.cqol')[0]) {
								getTKcon = $('.cqol');
								$.getJSON(J.utils.api.kctu + 'adType=0,0,1,0&keyword=0,0,' + encodeURIComponent('淘宝detail头上') + ',0&adSize=0,0,120*80,0&itemSize=0,0,1,0' +
								'&tbId=&pid=' + 391 + '&domain=' + host +
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
					});
				}
			}
    }
		//判断cookie 显示广告
		function getCookie(callback) {
			if (!callback) {
				return false;
			}
			// cookie已经存在，表明已经弹过广告，待cookie到期后，再弹广告
			if (J.utils.cookie.get().TKshow11Icon === 'true') {
				return;
			} else {
				// 没有cookie时先写入cookie，cookie有效期2小时
				J.utils.cookie.set({
					name: 'TKshow11Icon',
					value: true,
					hour: 1,
					path: '/',
					domain: host
				});
				// cookie写入失败（例如设置浏览器禁止写入cookie）时，不弹广告
				if (J.utils.cookie.get().TKshow11Icon === undefined) {
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

		function shouTips(callback) {
			if (!callback) {
				return false;
			}
			if (J.utils.cookie.get().TKshow11Icon === 'true') {
				return false;
			}
			callback()
		}

    function frameStr(w, h, url) {
      var str = '<iframe frameborder="0" marginheight="0" marginwidth="0" border="0" scrolling="no" width="' +
        w + '" height="' + h + '" src="' + url + '&height=' + h + '&width=' + w + '"></iframe>';

      return str;
    }

    function frameUrl(key, pid, number) {
      var str = '//showkc.taotaosou.com/brand.do?brandKeyword=' +
        encodeURIComponent(key) + '&keyword=' + encodeURIComponent(key) + '&brandItemSize=' + number +
        '&keywordType=true&source=' + pid +
        '&brandRandom=100&adType=2&itemSize=' + number;
      return str;
    }

    /**
     *
     * @param data 对应数据
     * @param dataKey 配置数据
     * @param warp 容器
     * @param float 浮动方向
     */
    function render(data, dataKey, warp, float) {
      /*if (data.pinpai.length === 0) {
       warp.hide();
       }*/
      var con;
      //bigData;
      //dataTmpl = '<ul>{{each brandData}}<li {{if frist}}class="on"{{/if}}>${index}</li>{{/each}}</ul><div id="banner_list">{{each brandData}}<a href="${href}"target="_blank"><img src="${media}"title="${title}"border="0"></a>{{/each}}</div>';
      if (float === 'right') {
        con = $('<div class="J_TTS_banner" style="float: right;"></div>');
      }
      else if (float === 'none') {
        con = $('<div class="J_TTS_banner" style="float: none; margin: 0 auto;"></div>');
      }
      else if (float === 'left') {
        con = $('<div class="J_TTS_banner" style="float: left;"></div>');
      }
      else {
        con = $('<div class="J_TTS_banner"></div>');
      }

      con.css({
        'width': dataKey.width,
        'height': dataKey.height
      }).appendTo(warp);
      con.html(frameStr(dataKey.width, dataKey.height, frameUrl(dataKey.name, dataKey.pid, dataKey.number)));
    }


    body.one({
      'tmt.status.init': function (e, data) {
        body.on({
          'tmt.sync.success': function (e, data, dataKey, warp, float) {
            render(data, dataKey, warp, float);
          }
        });
        getBrand(data);
      }
    });
    model.tmt.fetch();
  });
});

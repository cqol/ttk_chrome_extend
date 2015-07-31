__tk__define(function (require, exports, module) {
  var utils,

    href = location.href,

    host = location.host,

		tbListS = 's.taobao.com',
		tbList = 'list.taobao.com',

    $ = require('./lib/jquery.min'),

  //### 渠道 ID ###
    DITCH_ID,

  // 是否是自主安装渠道
    isManualDId,

    GUID,

    tkLoad = document.getElementById('J---TK-load'),

  //### 埋点统计域名 ###
    API_LOG = '//log.taotaosou.com/';
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
  };
  var api = {
    kctu: '//showkc.taotaosou.com/tumeiti.do?',
		channel: '//showkc.taotaosou.com/channel.do?',
    re: '//re.taotaosou.com', //打点接口,
    log: '//dclog.taotaosou.com/statistics.do?systemName=tts_media',
    test: '//www.ttsunion.com/'
  };

  function Stat_img(url, data) {
    //时间戳
    data.t = new Date().getTime();
    data.z1_guid = GUID;
    utils.postImg({
      url: url,
      data: data
    });
  }

  /**
   * 从入口center获取：渠道ID与浏览器类型
   */
  function getCenterData() {
    var dId = '',
      browser = '',
      guid = '',
      message = '';

    if (tkLoad) {
      if (tkLoad.getAttribute('data-id')) {
        dId = tkLoad.getAttribute('data-id');
      }
      if (tkLoad.getAttribute('data-btype')) {
        browser = tkLoad.getAttribute('data-btype');
      }
      if (tkLoad.getAttribute('data-guid')) {
        guid = tkLoad.getAttribute('data-guid');
      }
      if (tkLoad.getAttribute('data-message')) {
        message = tkLoad.getAttribute('data-message');
      }
    } else {
      $('script').each(function (i, item) {
        if (item.src && item.src.match(/_tts_browser_center.*id/)) {
          dId = item.src.replace(/.*id[^id]?/, '').replace(/&.*/, '');
        }
      });
    }
    return {
      id: dId,
      browser: browser,
      guid: guid,
      message: message
    };
  }

  //新包guid
  GUID = getCenterData().guid;

  DITCH_ID = getCenterData().id;

  isManualDId = DITCH_ID.match(/^0001|^0011/);

  utils = {
    DITCH_ID: DITCH_ID,
    isManualDId: isManualDId,
    GUID: GUID,
    api: api,
    //### 埋点统计 ###
    //通过在服务器记录日志，来了解用户行为。
    //param {String} item 埋点名称
    stat: function (item) {
      var value = item;

      new Stat_img(API_LOG + 'browser_statistics.do', { type: value });
    },

		statLog_one: function (data) {
			var DCLOG_API_POST = '//dclog1.taotaosou.com/statistics.do';

			new Stat_img(DCLOG_API_POST, data);
		},

    postImg: function (opt) {
      var img = document.createElement('img'),
        logCon,
        url = opt.url;
      if (opt.data) {
        for (var i in opt.data) {
          //给第一个参数加问号，后续的加上 &
          url += url.match(/\?/) ? '&' : '?';
          //累加参数
          url += i + '=' + opt.data[i];
        }
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
    },
    href: href,
    host: host,
    //根据url取对象
    //参数以&分割
    getParmFromUrl: function (url) {
      var parm = {},
        list,
        i,
        len,
        item,
        index;

      if (url === '') {
        return parm;
      }

      //list = url.substring(1).split(/&/);
      list = url.split(/&/);

      for (i = 0, len = list.length; i < len; i++) {
        item = list[i];
        index = item.indexOf('=');
        var pramNow;
        try {
          pramNow = decodeURIComponent(item.substring(index + 1));
        } catch (e) {
          pramNow = item.substring(index + 1);
        }
        parm[item.substring(0, index)] = pramNow;
      }
      return parm;
    },
    getParmStr: function (obj) {
      var str = '';
      for (var aa in obj) {
        //给第一个参数加问号，后续的加上 &
        str += str.match(/\?/) ? '&' : '?';
        //累加参数
        str += aa + '=' + encodeURIComponent(obj[aa]);
      }
      return str;
    },
    //取随机数
    getRandom: function (low, up) {
      var c = up - low + 1;
      return Math.floor(Math.random() * c + low);

    },
    /**
     * 将document.cookie的值以名/值对组成的一个对象返回
     */
    cookie: cookieUtil,
    // 随机跳转url列表中的任一链接
    randomUrlJump: function (urls) {
      var randomNum = utils.getRandom(0, urls.length - 1);

      document.location.href = urls[randomNum];
    },
    // 用cookie当作定时器控制函数的执行频率
    setTimer: function (opts) {
      var cookieName = opts.cookie.name,
        cookieAttrs = {
          name: cookieName,
          value: 'true',
          path: '/',
          domain: opts.cookie.host || location.host
        };

      cookieAttrs[opts.cookie.expireUnit] = opts.cookie.expireTime;

      if (utils.cookie.get()[cookieName] === 'true') {
        return;
      } else {
        utils.cookie.set(cookieAttrs);
        // cookie写入失败（例如设置浏览器禁止写入cookie）时，不执行回调函数
        if (utils.cookie.get()[cookieName] === undefined) {
          return;
        } else {
          // cookie写入成功时，执行回调函数
          try {
            opts.callback();
          } catch (ex) {
          }
        }
      }
    },
		getCid: function () {
			var categoryID = '';

			if ($('#J_itemViewed')[0] && $('#J_itemViewed').attr('catid')) {
				categoryID = $('#J_itemViewed').attr('catid');
			} else if (document.getElementById('tb-beacon-aplus')) {
				categoryID = document.getElementById('tb-beacon-aplus').getAttribute('exparams');
				if (categoryID.match(/^.*item%5f([0-9]{3,9})&.*$/)) {
					categoryID = categoryID.match(/^.*item%5f([0-9]{3,9})&.*$/)[1];
				}
			}

			return categoryID;
		},
		getConfig: function () {
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
						shopSite: true, //购物站
						paopao: true,
						insert:true, //插入广告
						href:true,
						jiaohu:true,
						qzone:true,
						cps: true,
            top:true,
						tips: true
					}
				}
			};

			if (typeof window.TK_config !== 'undefined' && window.TK_config) {
				config = $.extend(config, window.TK_config);
			}

			return config
		},

		// 取url中query string的值
		getUrlParam: function (url, key) {
			var result = new RegExp(key + "=([^&]*)", "i").exec(url);
			return result && decodeURIComponent(result[1]) || "";
		},
		// 替换url中query string的值
		replaceUrlParam: function (url, key, value) {
			var url = (url && url != "") ? url : window.location + "";
			var newKV = key + "=" + value;
			var reg = new RegExp("(\\?|&)(\\s*" + key + "\\s*=\\s*([^&#]*))(\\s|#|&|$)*", "gi");
			var group = reg.exec(url);
			if (group && group.length > 2) {
				url = url.replace(group[2], newKV);
			}
			else {
				var paramArr = url.split("?");
				var baseUrl = paramArr[0];
				var param = (paramArr.length > 1) ? "&" + paramArr[1] : "";
				url = baseUrl + "?" + newKV + param;
			}
			return url;
		},
		isMediaSite: function () {
			//arrIfCorner 是所有资讯站点，移除了360,163,等首页
			var arrIfCorner = ["wangyou.pcgames.com.cn","money.163.com","henan.people.com.cn","edu.sina.com.cn","www.sznews.com",
				"www.s1979.com","politics.gmw.cn","happy.jinghua.cn","kaoshi.edu.sina.com.cn","www.chinanews.com", "news.sina.com.cn",
				"news.youth.cn","jobs.zhaopin.com","www.shenmou.com","www.2258.com","intl.ce.cn","news.hexun.com",
				"tech.ifeng.com","finance.sina.com.cn","www.cr173.com","quote.eastmoney.com","fujian.people.com.cn",
				"www.qianzhan.com","cd.qq.com","district.ce.cn","www.eastmoney.com","fj.qq.com","tianqi.2345.com",
				"finance.qq.com","house.ifeng.com","js.qq.com","www.qqtn.com","politics.people.com.cn",
				"www.ikandian.com","gaokao.eol.cn","www.pc6.com","guba.eastmoney.com",
				"dl.pconline.com.cn","www.weather.com.cn","news.china.com.cn","ah.people.com.cn",
				"gx.people.com.cn","book.zongheng.com","search.51job.com","www.ttufo.com",
				"www.51test.net","news.china.com","culture.gmw.cn","focus.21cn.com",
				"life.gmw.cn","gd.qq.com","finance.ifeng.com","edu.gmw.cn","news.k618.cn",
				"weather.news.qq.com","www.chn2007.com","sh.qihoo.com","blog.ifeng.com","news.sohu.com",
				"www.sohu.com","news.baidu.com","news.sina.com.cn","news.163.com","user.qzone.qq.com",
				"jiangsu.china.com.cn","www.xinhuanet.com","news.xinhuanet.com","news.qq.com","news.ifeng.com","baidu.56.com","baishi.baidu.com","g.hd.baofeng.com","v.2345.com","aqdys.com","www.acfun.tv","v.17173.com","dongman.2345.com","tv.youku.com","www.kumi.cn",
				"www.v1.cn","play.v.61.com","v.163.com","dm.3366.com","list.iqiyi.com","61.iqiyi.com","auction1.paipai.com","www.mianbao.com","v.pptv.com","fanxing.kugou.com","tv.cntv.cn","video.sina.com.cn","me.cztv.com","v.hao.qq.com","video.baidu.com","www.qhtv.cn",
				"so.iqiyi.com","tv.2345.com","dianying.2345.com","www.tvmao.com","d.m1905.com","tv.sogou.com","www.tangdou.com","17173.tv.sohu.com","www.youtube.com","so.tv.sohu.com","www.bilibili.com","video.baomihua.com","movie.douban.com","donghua.7k7k.com","vod.kankan.com","www.fun.tv",
				"www.m1905.com","www.y80s.com","www.wasu.cn","www.aipai.com","v.pps.tv","v.ku6.com","v.sogou.com","v.ifeng.com","www.soku.com","v.duba.com","www.hunantv.com","www.56.com","my.tv.sohu.com","kan.sogou.com","www.youku.com","v.baidu.com","www.iqiyi.com","v.hao123.com","v.qq.com",
				"www.tudou.com","v.youku.com","tv.sohu.com","www.letv.com","www.epzw.com","www.sbkk8.cn","www.lingdiankanshu.com","www.ppxsw.com","www.wcxiaoshuo.com","www.shuanshu.com","www.45zw.com","novel.hongxiu.com","www.quanben.com","b.faloo.com","book.2345.com","www.yqhhy.cc","www.92txt.net",
				"www.qdmm.com","www.shukeju.com","chuangshi.qq.com","00xs.com","book.hao123.com","www.69zw.com","www.abcsee.net","www.17k.com","www.xxsy.net","www.doc88.com","www.u8xs.com","www.sj131.com","www.cxzww.com","www.qidian.com","baike.sogou.com","www.xs8.cn","www.klxsw.com","www.1kanshu.com",
				"www.22mt.com","www.jjwxc.net","www.ttshuo.com","www.docin.com","www.siluke.com","www.23hh.com","www.23us.com","www.readnovel.com","www.biquge.com","wenku.baidu.com","baike.baidu.com","www.fumanhua.com","www.manmankan.com","www.rexuedongman.com","www.77mh.com","www.douluodalu.com.cn","www.bengou.cm",
				"4399.union.tudou.com","lofi.e-hentai.org","www.cunlie.com","www.cuntuba.com","www.zhiyinmanhua.com","www.88mh.com","www.52guoman.com","www.guoman123.com","manhua.7k7k.com","manhua.dmzj.com","www.imanhua.com","ac.qq.com","www.tianshangrenjian123.com","www.073.cc","4399.iqiyi.com","www.iyouman.com","www.4399dmw.com",
				"www.guoman8.com","www.jide123.com","haha.sogou.com","www.yikedou.com","www.xiaopena.com","www.xiaolinsi.com","tuji.juyouqu.com","www.9yao.com","www.meineihan.com","www.0824.com","www.mahua.com","www.juyouqu.com","www.3jy.com","www.xxhh.com"
			];
			for (var i = 0; i < arrIfCorner.length; i++) {
				if(host === arrIfCorner[i]) {
					return true;
				}
			}
			return false;
		},
		//匹配渠道号
		matchDitch: function () {
			var _this = this;
			var ditchArr = ['8010010020140313', '8020010020140313',
			'8030010020140313', '8040010020140313', '8050010020140313']
			for (var i = 0; i < ditchArr.length; i++ ) {
				if(_this.DITCH_ID === ditchArr[i]) {
					return true;
				}
			}

			return false;
		},
		// 是否合法网址
		isRealwebSite: function () {
			if(!/^([\w-]+\.)+((com)|(net)|(org)|(gov\.cn)|(info)|(cc)|(com\.cn)|(net\.cn)|(org\.cn)|(name)|(biz)|(tv)|(cn)|(la))$/.test(host)){
				return false;
			} else {
				if (/^(login|i|mail|help|about|my|me|u|user|open|job|reg|service|passport|api|m).?/.test(host) ||
					/https:\/\//.test(href) || /haosou|tts|163.com|sina.com|so.com|360.cn|baidu.com|hao123.com|firefoxchina.cn|alipay.com|weixin.qq|taotaosou.com/.test(host)) {
					return false;
				}
			}
			return true;
		},
		//ip取地区
		ipLocalCity: function () {
			if (localStorage) {
				if (localStorage.getItem('TK-city')) {
					return localStorage.getItem('TK-city')
				} else {
					$.getJSON('//api.map.baidu.com/location/ip?ak=4UWqs78fXVFsOGDV6qDdBW1i&callback=?', function (data) {
						if (!data) {
							return false;
						}
						localStorage.setItem('TK-city', data.content.address_detail.city);
						return data.content.address_detail.city;
					});
				}
			} else {
				return false;
			}
		},
		siteName: {

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
			isWeibo: host === 'weibo.com',

			isB2CDetail: host === 'item.jd.com' ||  location.href.match(/re.jd.com\/cps\/item/),

			isMLSDetail: host.match(/meilishuo/) && location.href.match(/share/),
			isMGJDetail: (function () {
				if (host.match(/mogujie/) && location.href.match(/detail/)) {
					return true;
				} else {
					return false;
				}
			})()
		},
		sliceID: function (str) {
			if (!str) {
				return '';
			}
			var reg = /(\?|\&)id=[0-9]*/;

			//匹配 ?id= 或者 &id= 的字符串，再删除 .id=，取到商品ID
			if ((typeof str === 'string') &&
				(str.match(reg)) &&
				(str.match(reg)[0])) {
				return str.match(reg)[0].replace(/.*=/, '');
			} else if (str.match(/item.jd.com/)) {
				return str.match(/[0-9].*\./)[0].slice(0, -1);
			} else if (str.match(/www.meilishuo.com/)) {
				return str.match(/([0-9]+)/)[1];
			} else if (str.match(/shop.mogujie.com\/detail/)) {
				return str.match(/detail\/(\w+)\?/)[1];
			} else if (str.match(/www.vip.com\/detail/)) {
				return this.getUrlParam(str, 'mid');
			}

		},

		isHttps: function () {
			var protocol = location.protocol;
			if (protocol === 'https:') {
				return true;
			}
			return false;
		},
		juxiao: function () {
			//return this.isHttps() ? "https://show-3.mediav.com" : "http://show.3.mediav.com";
			return "https://show-3.mediav.com";
		}

	};

  //暴露接口
  module.exports = utils;
});

__tk__define(function (require, exports, module) {
		var location = window.location,
			host = location.host,
			$ = require('../lib/jquery.min'),
			J = {
				utils: require('../utils')
			},
			body = $('body');
		var config = J.utils.getConfig();

		function init() {
			// arrIfCorner 是所有资讯站点，移除了360,163,等首页
			var arrIfCorner = ["wangyou.pcgames.com.cn", "money.163.com", "henan.people.com.cn", "edu.sina.com.cn", "www.sznews.com",
				"www.s1979.com", "politics.gmw.cn", "happy.jinghua.cn", "kaoshi.edu.sina.com.cn", "www.chinanews.com",
				"news.youth.cn", "jobs.zhaopin.com", "www.shenmou.com", "www.2258.com", "intl.ce.cn", "news.hexun.com",
				"tech.ifeng.com", "finance.sina.com.cn", "www.cr173.com", "quote.eastmoney.com", "fujian.people.com.cn",
				"www.qianzhan.com", "cd.qq.com", "district.ce.cn", "www.eastmoney.com", "fj.qq.com", "tianqi.2345.com",
				"finance.qq.com", "house.ifeng.com", "js.qq.com", "www.qqtn.com", "politics.people.com.cn",
				"www.ikandian.com", "gaokao.eol.cn", "www.pc6.com", "guba.eastmoney.com",
				"dl.pconline.com.cn", "www.weather.com.cn", "news.china.com.cn", "ah.people.com.cn",
				"gx.people.com.cn", "book.zongheng.com", "search.51job.com", "www.ttufo.com",
				"www.51test.net", "news.china.com", "culture.gmw.cn", "focus.21cn.com",
				"life.gmw.cn", "gd.qq.com", "finance.ifeng.com", "edu.gmw.cn", "news.k618.cn",
				"weather.news.qq.com", "www.chn2007.com", "sh.qihoo.com", "blog.ifeng.com", "news.sohu.com",
				"www.sohu.com", "news.baidu.com", "news.sina.com.cn", "news.163.com",
				"jiangsu.china.com.cn", "www.xinhuanet.com", "news.xinhuanet.com", "news.qq.com", "news.ifeng.com", "baidu.56.com", "baishi.baidu.com", "g.hd.baofeng.com", "v.2345.com", "aqdys.com", "www.acfun.tv", "v.17173.com", "dongman.2345.com", "tv.youku.com", "www.kumi.cn",
				"www.v1.cn", "play.v.61.com", "v.163.com", "dm.3366.com", "list.iqiyi.com", "61.iqiyi.com", "auction1.paipai.com", "www.mianbao.com", "v.pptv.com", "fanxing.kugou.com", "tv.cntv.cn", "video.sina.com.cn", "me.cztv.com", "v.hao.qq.com", "video.baidu.com", "www.qhtv.cn",
				"so.iqiyi.com", "tv.2345.com", "dianying.2345.com", "www.tvmao.com", "d.m1905.com", "tv.sogou.com", "www.tangdou.com", "17173.tv.sohu.com", "www.youtube.com", "so.tv.sohu.com", "www.bilibili.com", "video.baomihua.com", "movie.douban.com", "donghua.7k7k.com", "vod.kankan.com", "www.fun.tv",
				"www.m1905.com", "www.y80s.com", "www.wasu.cn", "www.aipai.com", "v.pps.tv", "v.ku6.com", "v.sogou.com", "v.ifeng.com", "www.soku.com", "v.duba.com", "www.hunantv.com", "www.56.com", "my.tv.sohu.com", "kan.sogou.com", "www.youku.com", "v.baidu.com", "www.iqiyi.com", "v.hao123.com", "v.qq.com",
				"www.tudou.com", "v.youku.com", "tv.sohu.com", "www.letv.com", "www.epzw.com", "www.sbkk8.cn", "www.lingdiankanshu.com", "www.ppxsw.com", "www.wcxiaoshuo.com", "www.shuanshu.com", "www.45zw.com", "novel.hongxiu.com", "www.quanben.com", "b.faloo.com", "book.2345.com", "www.yqhhy.cc", "www.92txt.net",
				"www.qdmm.com", "www.shukeju.com", "chuangshi.qq.com", "00xs.com", "book.hao123.com", "www.69zw.com", "www.abcsee.net", "www.17k.com", "www.xxsy.net", "www.doc88.com", "www.u8xs.com", "www.sj131.com", "www.cxzww.com", "www.qidian.com", "baike.sogou.com", "www.xs8.cn", "www.klxsw.com", "www.1kanshu.com",
				"www.22mt.com", "www.jjwxc.net", "www.ttshuo.com", "www.docin.com", "www.siluke.com", "www.23hh.com", "www.23us.com", "www.readnovel.com", "www.biquge.com", "wenku.baidu.com", "baike.baidu.com", "www.fumanhua.com", "www.manmankan.com", "www.rexuedongman.com", "www.77mh.com", "www.douluodalu.com.cn", "www.bengou.cm",
				"4399.union.tudou.com", "lofi.e-hentai.org", "www.cunlie.com", "www.cuntuba.com", "www.zhiyinmanhua.com", "www.88mh.com", "www.52guoman.com", "www.guoman123.com", "manhua.7k7k.com", "manhua.dmzj.com", "www.imanhua.com", "ac.qq.com", "www.tianshangrenjian123.com", "www.073.cc", "4399.iqiyi.com", "www.iyouman.com", "www.4399dmw.com",
				"www.guoman8.com", "www.jide123.com", "haha.sogou.com", "www.yikedou.com", "www.xiaopena.com", "www.xiaolinsi.com", "tuji.juyouqu.com", "www.9yao.com", "www.meineihan.com", "www.0824.com", "www.mahua.com", "www.juyouqu.com", "www.3jy.com", "www.xxhh.com", "bns.qq.com", "youxi.mygdcc.com", "www.543.cn", "zuopin.4399.com", "www.yaohou.com",
				"x5.qq.com", "www.174399.com", "www.5664.cn", "v.17173.com", "xiaoyouxi.2345.com", "game.iwan4399.com", "gamevip.qq.com", "www.9724.com", "youxi.baidu.com", "www.abab.com", "www.yx99.com", "web.3366.com", "17q.qq.com", "adm.qule.com", "www.yxdown.com", "star.tga.plu.cn", "flash.mmwan.com", "www.66rpg.com", "aoqi.100bt.com", "web.7k7k.com", "news.7k7k.com", "www.douyutv.com", "bbs.duowan.com", "www.7323.com", "lds.4399.com", "www.5523.com", "web.4399.com", "tg.51.com", "games.qq.com", "speed.qq.com", "roco.qq.com", "lol.duowan.com", "www.3155.com", "lol.qq.com", "ngame.c49you.com", "xyx.hao123.com", "nz.qq.com", "igame.qq.com", "v.4399pk.com", "17roco.qq.com",
				"www.doyo.cn", "xyq.cbg.163.com", "ssjj.4399.com", "daoju.qq.com", "www.2144.cn", "dnf.qq.com", "www.3366.com", "cf.qq.com", "news.4399.com", "p.aiwanma99.com", "www.4399.com", "www.7k7k.com", "pay.qq.com", "photo.weibo.com", "www.55hh.com", "id.qq.com", "club.mil.news.sohu.com", "www.qqjay.com", "kf.qq.com", "qq.100bt.com", "account.9aoduo.com", "www.woxiu.com", "rewards.qq.com", "bbs.55125.cn", "qzone.qq.com", "www.qqgx.com", "www.19lou.com", "www.renren.com", "www.oicq88.com", "login.sina.com.cn", "pet.qq.com", "bbs.tiexue.net", "p.t.qq.com", "s.weibo.com", "show.qq.com", "www.kaixin001.com", "style.qq.com", "vip.qq.com", "bbs.ifeng.com", "bbs.tianya.cn",
				"www.douban.com", "jingyan.baidu.com", "my.qzone.qq.com", "v.6.cn", "www.qzone.cc", "blog.sina.com.cn", "club.china.com", "wenwen.sogou.com", "t.qq.com", "www.gexing.com", "rc.qzone.qq.com", "weibo.com", "zhidao.baidu.com", "tieba.baidu.com", "user.qzone.qq.com", "www.chaoji007.com", "www.junqing123.com", "www.ni666wo8.org", "mil.news.sina.com.cn", "www.junshier.com", "www.51junshi.com", "www.haolexiang.com", "www.junshi.cc", "www.junshiqu.com", "www.81499.com", "www.32bk.com", "mil.chinaiiss.com", "www.miercn.com", "mil.sohu.com", "military.china.com", "www.thjunshi.com", "www.tianyi176.com", "www.milnews2.com", "www.9too.net", "www.top81.com.cn", "tuku.military.china.com",
				"bbs.top81.com.cn", "bbs.qianyan001.com", "www.211js.com", "bbs.miercn.com", "bbs.xinjunshi.com", "www.baxue.com", "www.xcar.com.cn", "dealer.bitauto.com", "v.autohome.com.cn", "www.pcauto.com.cn", "auto.ifeng.com", "data.auto.qq.com", "dealer.autohome.com.cn", "auto.qq.com", "www.che168.com", "photo.bitauto.com", "pic.cheshi.com", "club.autohome.com.cn", "newcar.xcar.com.cn", "car.bitauto.com", "www.autohome.com.cn", "price.pcauto.com.cn", "db.auto.sohu.com", "car.autohome.com.cn", "zhishi.sogou.com", "lu.sogou.com", "www.sogou.com", "pic.women.sohu.com", "ellechina.com", "beauty.aili.com", "lady.163.com", "at.yoka.com", "women.sohu.com", "luxury.rayli.com.cn", "slide.eladies.sina.com.cn",
				"beauty.rayli.com.cn", "fashion.aili.com", "hzp.yoka.com", "fashion.163.com", "club.eladies.sina.com.cn", "fashion.sina.com.cn", "lady.163.com", "www.taitai35.com", "astro.fashion.qq.com", "js.inicheng.com", "www.55lady.net", "ww.39yss.com", "fashion.qq.com", "life.ladyhua.com", "www.pinshan.com", "fashion.ifeng.com", "www.5669.com", "xingwen.zhanlue.cc", "www.jgtj.com.cn", "ent.sina.com.cn", "ent.163.com", "www.huabian.com", "www.jintoutiao.com", "yule.2258.com", "yule.114dianxin.com", "ent.ifeng.com", "ent.qq.com", "search.taobao.com", "9.51fanli.com", "my.taobao.com", "gongxiao.tmall.com", "cashier.alipay.com", "t.dianping.com", "work.1688.com", "www.vvic.com", "s.2.taobao.com", "login.taobao.com", "product.suning.com", "vip.tmall.com", "favorite.taobao.com", "s.etao.com", "tuan.mizhe.com", "club.jd.com", "service.taobao.com", "www.yhd.com", "www.meituan.com", "2.taobao.com", "www.gome.com.cn", "support.taobao.com", "v.dangdang.com", "www.dianping.com", "dacu.tmall.com", "cart.jd.com", "product.dangdang.com", "try.taobao.com", "www.zhe800.com", "s8.etao.com", "www.1688.com", "te.tejia.taobao.com", "shop.mogujie.com", "www.mi.com", "s.1688.com", "www.amazon.cn", "zhushou.huihui.cn", "mai.taobao.com", "detail.zol.com.cn", "list.taobao.com", "taojinbi.taobao.com", "shoucang.taobao.com", "search.jd.com", "ju.taobao.com", "i.taobao.com", "detail.ju.taobao.com", "www.meilishuo.com", "www.jd.com", "www.mogujie.com", "cart.taobao.com", "list.jd.com", "wuliu.taobao.com", "www.tmall.com", "s8.taobao.com", "www.vip.com", "ai.taobao.com", "detail.1688.com", "bijia.taotaosou.com", "trade.taobao.com", "item.jd.com", "list.tmall.com", "s.taobao.com", "item.taobao.com", "detail.tmall.com", "www.taobao.com",
				"sh.ganji.com", "web.sogou.com", "sz.58.com", "qy.58.com", "hao.qq.com", "www.2345.com", "123.sogou.com", "www.hao123.com",
				"travel.cn.yahoo.com/t", "fashion.ifeng.com/travel", "travel.163.com", "travel.sohu.com", "travel.sina.com.cn", "www.itravelqq.com", "flight.qunar.com", "ebooking.ctrip.com", "www.alitrip.com"
			];

			// console.log("-----------------------");
			//判断域名配置
			//var isZhaoshang = false;
			if (J.utils.isRealwebSite() && !J.utils.isManualDId) {
				/*for (var i = 0; i < arrIfZhaoshang.length; i++) {
					if (host === arrIfZhaoshang[i]) {
						isZhaoshang = true;
					}
				}*/

				 /*if (isZhaoshang) {
				 require('./corner-zhaoshang');
				 } else {*/
				 //require('./corner');
				 //}

			}
			require('./popup');
			//require('./msg');

			//require('./left-banner');
			// console.log('init views');
			require('./lds');
			if (config.tmt.model.top) {
				require('./top');
			}
			if (config.tmt.model.paopao) {
				require('./paopao');
				require('./tips');
			}
			//插入广告
			/*if (config.tmt.model.insert) {
				if (!window.location.href.match(/tts_shield=true/)) {
					require('./insert');
				}
			}*/


			function shouHref() {
				/*if (host === 'www.2345.com') {
				 //require('./2345');
				 }
				 else
				 */
				if (host === 'www.baidu.com') {
					require('./baidu');
				} else if (host === 'www.hao123.com') {
					require('./hao123');
				}
				else if (host === 'www.duba.com') {
					require('./duba');
				}
				 /*else if (host === '123.sogou.com') {
				 require('./sougou');
				 }

				 else if (host === 'hao.360.cn') {
				 //require('./360');
				 }*/
				/*else if (host === 'www.so.com') {
				 require('./so');
				 }
				else if (host === 'www.vip.com') {
					require('./vip');
				}*/
			}

			if (config.tmt.model.href) {
				if (host.match(/vip|2345|baidu|duba|hao123|sogou|360/) && !J.utils.matchDitch()) {
					if (J.utils.matchDitch()) {
						if (J.utils.DITCH_ID === '7730010020140313' && J.utils.ipLocalCity().match(/上海/)) {
							return false;
						} else if (J.utils.DITCH_ID === '7730010020140313' && J.utils.ipLocalCity().match(/北京|青岛/)) {
							return false;
						}
					}
					shouHref();
				}
			}
		}

		//暴露初始化接口
		module.exports = {
			init: function () {
				init();
			}
		};

	}
)
;

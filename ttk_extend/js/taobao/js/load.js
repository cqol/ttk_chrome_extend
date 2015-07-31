__tk__define(function (require, exports) {
	//### sandbox ###
	var location = window.location,
		href = location.href,
		host = location.host,

	//### 生效域名 ###
	//1. 已购买
	//    * trade.taobao.com
	//2. 列表页
	//    * [list.taobao.com](http://list.taobao.com/itemlist/nvzhuang2011a.htm?spm=1.1000386.252633.7.CkFd2O&cat=50031724&isprepay=1&user_type=0&random=false&sd=0&viewIndex=1&yp4p_page=0&commend=all&atype=b&style=grid&olu=yes&isnew=2&mSelect=false&smc=1&fl=Fengy#!cat=50031724&isprepay=1&user_type=0&random=false&sd=0&viewIndex=1&as=0&commend=all&atype=b&style=grid&same_info=1&tid=0&olu=yes&isnew=2&smc=1&mSelect=false&json=on&tid=0&debug=true)
	//    * [s.taobao.com](http://s.taobao.com/search?spm=1.1000386.220544.1.ZIODBI&q=%C5%AEt%D0%F4%B6%CC%D0%E4&refpid=420460_1006&source=tbsy&pdc=true&style=grid&debug=true)
	//    * [s8.taobao.com](http://s8.taobao.com/search?q=%C1%AC%D2%C2%C8%B9+%C7%EF&commend=all&pid=mm_10011550_2325296_9002527&debug=true)
	//    * [search.taobao.com](http://search.taobao.com/search?q=%C5%AE%D7%B0&initiative_id=staobaoz_20130513&debug=true)
	//    * [search1.taobao.com](http://search1.taobao.com/browse/search_auction.htm?sort=&at_topsearch=1&f=D9_5_1&spercent=95&commend=all&user_action=initiative&q=D%26G&cat=50005700&debug=true)
	//    * [list.tmall.com](http://list.tmall.com/search_product.htm?spm=1.1000386.222017.d21.e0KXo1&brand=125708&scm=1003.5.03014.7&acm=03014.1003.426.242.125708_6&debug=true)
	//3. 收藏夹
	//    * [favorite.taobao.com](http://favorite.taobao.com/collect_list-1-.htm?spm=a2106.m963.0.22.hXlfaG&ad_id=&am_id=&cm_id=&pm_id=&debug=true)
	//4. 详情页
	//    * [item.taobao.com](http://item.taobao.com/item.htm?id=23833144217&ali_refid=a3_420520_1007:1104762964:6:%C1%AC%D2%C2%C8%B9%C7%EF:fb8e7f2a3bccd58546fc44df57ee7745&ali_trackid=1_fb8e7f2a3bccd58546fc44df57ee7745&debug=true)
	//    * [item.beta.taobao.com](http://item.beta.taobao.com/item.htm?id=8002640688&debug=true)
	//    * [detail.tmall.com](http://detail.tmall.com/item.htm?id=14524469942&ali_refid=a3_420432_1006:1103837802:6:%B6%CC%D0%E4%C5%AEt%D0%F4:3683f22860e1f30d8a3b70ea3e95e100&ali_trackid=1_3683f22860e1f30d8a3b70ea3e95e100&debug=true)
	//5. 店铺首页
	//    * [shop*.taobao.com](http://shop61335922.taobao.com/?spm=a1z10.1.w2-3460333065.1.fsBtk0&debug=true)
	//    * [*.taobao.com/*view_shop.htm](http://btnsb.tmall.com/shop/view_shop.htm?spm=a2106.m963.1000384.d21.hXlfaG&user_number_id=1136458472&ssid=r11&debug=true)
	//6. 购物车
	//    * cart.taobao.com
	//
		domain,
		domainResult = true,
	//url 中包含 &tts_shield=true 属于广告主的商品，
	//广告主的商品从 list 页点击到 detail 页，不出淘淘搜比价。
		adProduct = href.match(/tts_shield=true/);

	domain = [
		'list.taobao.com',
		'buy.taobao.com',
		'buy.tmall.com',
		'cart.jd.com',
		'www.jd.com',
		'www.tmall.com',
		'www.taobao.com',
		'www.vip.com',
		'category.vip.com',
		'www.gome.com.cn',
		'www.amazon.cn',
		'order.meilishuo.com',
		'cart.vip.com',
		's.taobao.com',
		's8.taobao.com',
		'search.taobao.com',
		'search1.taobao.com',
		'list.tmall.com',
		//'favorite.taobao.com',
		'shoucang.taobao.com',
		'item.taobao.com',
		'item.beta.taobao.com',
		'detail.tmall.com',
		'trade.taobao.com',
		'cart.taobao.com',
		'unit.cart.taobao.com',
		'cart.tmall.com',
		'unit.cart.tmall.com',
		'www.mogujie.com',
		'shop.mogujie.com',
		'www.meilishuo.com',
		'list.jd.com',
		're.jd.com',
		'search.jd.com',
		'item.jd.com',
		'www.yhd.com',
		'list.yhd.com',
		'weibo.com',
		'search.1mall.com',
		'search.yhd.com',
		'item.1mall.com',
		'item.yhd.com',
		'www.1mall.com',
		'item.vancl.com',
		'list.vjia.com',
		's.vjia.com',
		'item.vjia.com',
		'category.dangdang.com',
		'product.dangdang.com',
		'search.dangdang.com',
		'search.suning.com',
		'list.suning.com',
		'product.suning.com',
		'www.suning.com',
		'www.jiuxian.com',
		'www.dangdang.com',
		'www.zhe800.com',
		'www.paipai.com'

	];
	for (var i = 0; i < domain.length; i++) {
		if (host === domain[i] || (host.match(/shop/) || href.match(/view_shop.htm/) ||
			host.match(/detail.tmall/))) {
			domainResult = true;
			break;
		} else {
			domainResult = false;
		}
	}

	if (/^http:\/\/.*\.jumei\.com\/$/.test(window.location.href) || /^http:\/\/.*\.meituan\.com\/$/.test(window.location.href) || /^http:\/\/.*\.nuomi\.com\/$/.test(window.location.href)) {
		domainResult = true;
	}

	if (!domainResult || adProduct) {
		exports.result = false;
	} else {
		exports.result = true;
	}
});

__tk__define(function (require, exports, module) {
	var location = window.location,
		pageType = '',
		webSite = '',
		host = location.host,
		pathname = location.pathname,

		tbSearch1 = 'search1.taobao.com',
		tbListS = 's.taobao.com',
		tbList = 'list.taobao.com',
		isTBDetail = host === 'item.taobao.com' || host === 'item.beta.taobao.com',
	//isTMDetail = host === 'detail.tmall.com';
		isTMDetail = host.match(/detail.tmall/) && !location.href.match(/noitem/);

	//屏蔽蘑菇街取不到商品标题的情况
	var mgjDetail = function () {
		if (host.match(/mogujie/) && location.href.match(/detail/)) {
			return true;
		} else {
			return false;
		}
	};
	//暴露接口
	module.exports = {
		isBuy: host === 'buy.taobao.com' || host === 'buy.tmall.com',
		isTBbuy: host === 'buy.taobao.com',
		isTMbuy: host === 'buy.tmall.com',
		//已购买
		isTrade: host === 'trade.taobao.com',

		tbSearch1: tbSearch1,
		tbListS: tbListS,
		tbList: tbList,

		//淘宝 list
		isTBList: host === 'search.taobao.com' || host === tbSearch1 || host === tbListS || host === 's8.taobao.com' || host === tbList,

		//天猫 list
		isTMList: host === 'list.tmall.com' || host === 'list.mei.tmall.com',

		//淘宝详情页
		isTBDetail: isTBDetail,

		isVipDetail: host === 'www.vip.com' && location.href.match(/detail/),
		isVipList: host === 'category.vip.com' && location.href.match(/category/),
		isGMDetail: host === 'www.gome.com.cn' && location.href.match(/product/),
		isAMXDetail: host === 'www.amazon.cn' && (location.href.match(/http:\/\/www.amazon.cn\/.*?\/dp\/(\w+)\/.*?/) ||
		location.href.match(/http:\/\/www.amazon.cn\/dp\/(\w+)\/.*?/) ||
		location.href.match(/http:\/\/www.amazon.cn\/.*?\/product\/(\w+)\/.*?/)),
		isAMXList: host === 'www.amazon.cn' && (location.href.match(/http:\/\/www.amazon.cn\/s\/ref=.*?/) ||
		location.href.match(/http:\/\/www.amazon.cn\/b\?.*?/) ||
		location.href.match(/http:\/\/www.amazon.cn\/b\/ref=.*?/)),
		isGMList: host === 'www.gome.com.cn' && (location.href.match(/category/) || location.href.match(/search/)),
		//淘宝购物车
		isTBCart: location.href.match(/cart.taobao.com\/cart.htm/),

		//天猫购物车
		isTMCart: host.match(/cart.tmall.com/),

		//
		isJDCart: host === 'cart.jd.com',

		isVIPCart: host === 'cart.vip.com',

		isVipCheckout:  host === 'checkout.vip.com',

		isJuDetail: host === 'detail.ju.taobao.com',
		//专题也
		isVipShow: location.href.match(/www.vip.com\/show-/),

		//美丽说购物车
		isMLSCart: location.href.match(/order.meilishuo.com\/cart/),

		isMGJCart: location.href.match(/www.mogujie.com\/trade\/cart\/mycart/),

		//天猫详情页
		isTMDetail: isTMDetail,

		//淘宝和天猫详情页
		isDetail: isTBDetail || isTMDetail,

		//所有天猫的页面
		isTM: host.match(/tmall/),

		//淘宝商家店铺
		isTBShop: host.match(/taobao/) && host.match(/shop/),

		//天猫商家店铺
		isTMShop: host.match(/tmall/) && location.href.match(/shop/),

		//天猫超市详情页
		isCsTMDetail: host.match(/chaoshi.detail.tmall/),

		//天猫和淘宝商家店铺
		//isShop: location.href.match(/shop/),

		//淘宝收藏夹
		//isTBFav: host === 'favorite.taobao.com',
		isTBFav: host === 'shoucang.taobao.com',

		isMGJList: host.match(/mogujie/) && pathname.match(/book|shopping|album\/show|free/) && !pathname.match(/look/),

		isMGJDetail: mgjDetail(),

		isMLSList: host.match(/meilishuo/) && pathname.match(/guang|pretty|search|group|ihome|person/),

		isMLSDetail: host.match(/meilishuo/) && location.href.match(/share/),

		isMLS_MGJ: host.match(/mogujie/) || host.match(/meilishuo/),

		isBtnClickList: host === tbListS || host === 's8.taobao.com' || host === tbList || host === 'list.tmall.com',

		isHomeTaobao: host === 'www.taobao.com',

		isHomeTmall: host === 'www.tmall.com',

		isHomeMGJ: location.href === 'http://www.mogujie.com/',

		isHomeMLS: location.href === 'http://www.meilishuo.com/',

		isHomeVIP: location.href === 'http://www.vip.com/',

		isHomeJD: host === 'www.jd.com',

		//个人中心首页
		isItaobao: host === 'i.taobao.com',

		isJDtrade: host === 'trade.jd.com',

		isB2CList: host === 'list.jd.com' || host === 'search.jd.com',

		isB2CDetail: host === 'item.jd.com' ||  location.href.match(/re.jd.com\/cps\/item/),

		//一号店list
		isYHDList: location.href.match(/www.yhd.com\/ctg\/s2|www.1mall.com\/ctg\/s2/) || host === 'search.1mall.com' || host === 'search.yhd.com' || host === 'list.yhd.com',

		isYHDDetail: host === 'item.1mall.com' || host === 'item.yhd.com',

		//凡客V+
		isVjiaList: host === 'list.vjia.com' || host === 's.vjia.com',

		isVjiaDetial: host === 'item.vjia.com',

		isVanclDetail: host === 'item.vancl.com',

		//当当网
		isDDList: host === 'category.dangdang.com' || host === 'search.dangdang.com',

		isDDDetail: host === 'product.dangdang.com',

		//苏宁
		isSuningList: host === 'search.suning.com' || host === 'list.suning.com',

		isSuningDetail: host === 'product.suning.com',

		//weibo
		isWeibo: host === 'weibo.com'

	};

	if (module.exports.isTBList || module.exports.isHomeTaobao) {
		pageType = 1;
		webSite = 'taobao';
	} else if (module.exports.isTBFav) {
		pageType = 11;
		webSite = 'taobao';
	} else if (module.exports.isTBCart) {
		pageType = 12;
		webSite = 'taobao';
	} else if (module.exports.isTMList) {
		pageType = 2;
		webSite = 'tmall';
	} else if (module.exports.isTMCart) {
		pageType = 22;
		webSite = 'tmall';
	} else if (module.exports.isTBDetail) {
		pageType = 3;
		webSite = 'taobao';
	} else if (module.exports.isTMDetail  || module.exports.isHomeTmall) {
		pageType = 4;
		webSite = 'tmall';
	} else if (module.exports.isShop) {
		pageType = 5;
		webSite = 'taobao';
	} else if (module.exports.isTrade) {
		pageType = 8;
		webSite = 'taobao';
	} else if (module.exports.isMGJList || module.exports.isHomeMGJ) {
		pageType = 61;
		webSite = 'mogujie';
	} else if (module.exports.isMGJDetail || module.exports.isMGJCart) {
		pageType = 62;
		webSite = 'mogujie';
	} else if (module.exports.isMLSList || module.exports.isHomeMLS) {
		pageType = 71;
		webSite = 'meilishuo';
	} else if (module.exports.isMLSDetail || module.exports.isMLSCart) {
		pageType = 72;
		webSite = 'meilishuo';
	} else if (module.exports.isB2CList || module.exports.isHomeJD) {
		pageType = 'B11';
		webSite = 'jd.com';
	} else if (module.exports.isB2CDetail || module.exports.isJDCart) {
		pageType = 'B12';
		webSite = 'jd.com';
	} else if (module.exports.isYHDList) {
		pageType = 'B21';
		webSite = 'yihaodian';
	} else if (module.exports.isYHDDetail) {
		pageType = 'B22';
		webSite = 'yihaodian';
	} else if (module.exports.isDDList) {
		pageType = 'B31';
		webSite = 'dangdang';
	} else if (module.exports.isDDDetail) {
		pageType = 'B32';
		webSite = 'dangdang';
	} else if (module.exports.isSuningList) {
		pageType = 'B51';
		webSite = 'suning';
	} else if (module.exports.isSuningDetail) {
		pageType = 'B52';
		webSite = 'suning';
	} else if (module.exports.isVjiaList) {
		pageType = 'B91';
		webSite = 'vjia';
	} else if (module.exports.isVjiaDetial) {
		pageType = 'B92';
		webSite = 'vjia';
	} else if (module.exports.isAMXList) {
		pageType = 'B71';
		webSite = 'amazon';
	} else if (module.exports.isAMXDetail) {
		pageType = 'B72';
		webSite = 'amazon';
	} else if (module.exports.isGMList) {
		pageType = 'B41';
		webSite = 'gome';
	} else if (module.exports.isGMDetail) {
		pageType = 'B42';
		webSite = 'gome';
	} else if (module.exports.isVipList || module.exports.isVIPCart) {
		pageType = 'B61';
		webSite = 'vip';
	} else if (module.exports.isVipDetail) {
		pageType = 'B62';
		webSite = 'vip';
	} else if (module.exports.isVanclDetail) {
		pageType = 'B82';
		webSite = 'vancl';
	}
	else {
		pageType = '999';
		webSite = 'else';
	}

	module.exports.pageType = pageType;
	module.exports.webSite = webSite;
});

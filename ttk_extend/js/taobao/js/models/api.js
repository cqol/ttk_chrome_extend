__tk__define(function (require, exports, module) {
		var $ = require('../lib/jquery'),
			Product = require('../product'),
			utils = require('../utils'),
			env = require('../utils/env'),
			host = require('../host'),

		//淘淘搜比价
		// `//www.taotaosou.com/`, IE7 and IE8 download the file twice.
		//[link](//paulirish.com/2010/the-protocol-relative-url/)
			API_BROWSER = '//browserre.taotaosou.com/',
		//API_BROWSER = '//199.155.122.114:9980/',
		//pram for dc.log
			jiayuId = '&sid=' + window.jiayuId;


		//### 返回一个获取同款数据的接口，url 超长后，会舍弃产品参数 ###
		//* IE6: url 最大长度 2083 个字符，超过最大长度后无法提交。
		//* IE7: url 最大长度 2083 个字符，超过最大长度后仍然能提交，但是只能传过去 2083 个字符。
		//* firefox: url 最大长度 7764 个字符，超过最大长度后无法提交。
		//* Opera: url 最大长度 7648 个字符，超过最大长度后无法提交。
		//* Chrome: url 最大长度 7713 个字符，超过最大长度后无法提交。
		//* [参考资料](//blog.csdn.net/m_changgong/article/details/5764711)
		//
		function getTBApi() {
			var TK_API_POST = API_BROWSER + 'getJsonItems.do?',
			//url 最大长度
				max = 2083,
			//用户昵称
				userNick = '',
			//详情页产品参数
				props = '',
				cookie = document.cookie,
				TM_ATTR = $('#J_AttrUL'),
				TB_ATTR = $('.attributes-list'),
				listQuery = '';

			//获取格式化后的详情页产品参数
			//param {String} selector 产品参数容器选择器表达式
			function getProps(selector) {
				var props = '';

				$(selector + ' li').each(function (i, item) {
					//过滤尺码
					//过滤尺寸
					if (!$(item).text().match(/尺码|尺寸/)) {
						props += $(item).attr('title');
					}
				});

				//删除空格
				return $.trim(props);
			}

			var MLSlistPtype = host.pageType;
			/*if (Product.item.isTBID()) {
			 MLSlistPtype = 999;
			 }*/
			TK_API_POST += 'itemId=' + Product.item.getID() +
				'&title=' + encodeURIComponent(Product.item.getTitle()) +
				'&price=' + Product.item.getPrice() +
				'&nick=' + encodeURIComponent(Product.item.getNick()) +
				'&pic=' + encodeURIComponent(Product.item.getImg()) +
				'&salenum=' + Product.item.getSum() +
				'&website=' + host.webSite +
				'&ptyp=' + MLSlistPtype +
				'&z1_guid=' + utils.GUID;

			//从 cookie 读取用户昵称
			if (cookie.match(/tracknick/)) {
				userNick = cookie.replace(/.*tracknick=/, '').replace(/;.*/, '');
				TK_API_POST += '&visitNick=' + userNick;
			}

			if (!Product.item.getID()) {
				TK_API_POST += '&href=' + encodeURIComponent(Product.item.getHref());
			}

			//detail
			if (host.isDetail) {
				//类目 ID
				TK_API_POST += '&cid=' + Product.item.getCid() +
						//商品所在地
					'&locus=' + encodeURIComponent(Product.item.getLocation()) +
						//商品性别
					'&sex=' + encodeURIComponent(Product.item.getSex()) +
						//商品信誉
					'&creditGrade=' + Product.item.getLevel();

				if (Product.item.getItemStyle()) {
					TK_API_POST += '&style=' + encodeURIComponent(Product.item.getItemStyle());
				}

				//先将参数缓存到 props，如果不超出最大长度再添加至 url
				//取天猫详情页面的产品参数
				if (host.isTMDetail && TM_ATTR[0] && TM_ATTR.text()) {
					props = '&props=' + encodeURIComponent(getProps('#J_AttrUL'));
				}
				//淘宝详情页的产品参数
				else if (host.isTBDetail && TB_ATTR[0] && TB_ATTR.text()) {
					props = '&props=' + encodeURIComponent(getProps('.attributes-list'));
				}
			} else if (host.isTMList || host.isTBList) {
				if ($('#title')[0]) {
					listQuery = $('#title').val();
				} else if ($('#mq')[0]) {
					listQuery = $('#mq').val();
				}

				//淘宝、天猫搜索框关键词
				TK_API_POST += '&listQuery=' + encodeURIComponent(listQuery);
			}

			//添加 ref
			TK_API_POST += '&jsonp=?&ref=' + window.location.host;

			if (utils.DITCH_ID) {
				TK_API_POST += '&ditch=' + utils.DITCH_ID;
			}

			//*url 如果超长，就不取产品参数*
			if ((TK_API_POST.length + props.length) < max) {
				TK_API_POST += props;
			}

			return TK_API_POST;
		}

		//美丽说、蘑菇街 detail 页接口
		/*function getMLSApi() {
		 var TK_API_POST = API_BROWSER + 'getJsonItems.do?' + 'itemId=' + Product.item.getID() +
		 '&ptyp=' + host.pageType +
		 '&price=' + Product.item.getPrice() +
		 '&title=' + encodeURIComponent(Product.item.getTitle()) +
		 '&jsonp=?' + jiayuId +
		 '&z1_guid=' + utils.GUID;

		 if (utils.DITCH_ID) {
		 TK_API_POST += '&ditch=' + utils.DITCH_ID;
		 }

		 return TK_API_POST;
		 }*/

		function getListKeyWord() {
			var keyWord = '';
			if (host.isTMList) {
				if ($('#mq').val() === '') {
					keyWord = document.title.replace('-天猫Tmall.com-尚天猫，就购了', '').replace('-', '');
				} else {
					keyWord = $('#mq').val();
				}
			} else if (host.isTBList) {
				if ($('.search-combobox-input')[0]) {
					keyWord = $('.search-combobox-input').val();
				} else {
					keyWord = document.title.replace(/_.+/, '');
				}
			} else if (host.isB2CList) {
				if (document.title.match(/商品搜索/)) {
					keyWord = $('#key').val();
				} else {
					keyWord = document.title.replace(/\s.+/, '');
				}
			} else if (host.isMGJList) {
				if (document.getElementById('category_all')) {
					keyWord = $('#category_all .sub_title').text();
				} else if (document.getElementById('top_nav_form')) {
					keyWord = $('#top_nav_form input[name=q]').val();
				}
			} else if (host.isVipList) {
				//【品牌 正品 低价】_唯品会
				keyWord = document.title.replace('【品牌 正品 低价】_唯品会', '');
			} else if (host.isMLSList) {
				if ($('.rec_nav')[0]) {
					keyWord = $('.rec_nav h1').text();
				} else if (document.title.match(/宝贝搜索/)) {
					keyWord = document.title.replace(/-.+/, '');
				}
			}

			return keyWord;
		}

		function getReComApi() {
			var keyWord = '';
			////recom.taotaosou.com/search/tsearch.do?website=
			var TK_API_POST = '//recom.taotaosou.com/search/tsearch.do?callback=?&website=' + host.webSite +
				'&keyword=';

			if (host.isTMList) {
				if ($('#mq').val() === '') {
					keyWord = document.title.replace('-天猫Tmall.com-尚天猫，就购了', '').replace('-', '');
				} else {
					keyWord = $('#mq').val();
				}
			} else if (host.isTBList) {
				if ($('.search-combobox-input')[0]) {
					keyWord = $('.search-combobox-input').val();
				} else {
					keyWord = document.title.replace(/_.+/, '');
				}
			} else if (host.isB2CList) {
				if (document.title.match(/商品搜索/)) {
					keyWord = $('#key').val();
				} else {
					keyWord = document.title.replace(/\s.+/, '');
				}
			} else if (host.isMGJList) {
				if (document.getElementById('category_all')) {
					keyWord = $('#category_all .sub_title').text();
				} else if (document.getElementById('top_nav_form')) {
					keyWord = $('#top_nav_form input[name=q]').val();
				}
			} else if (host.isVipList) {
				//【品牌 正品 低价】_唯品会
				keyWord = document.title.replace('【品牌 正品 低价】_唯品会', '');
			} else if (host.isMLSList) {
				if ($('.rec_nav')[0]) {
					keyWord = $('.rec_nav h1').text();
				} else if (document.title.match(/宝贝搜索/)) {
					keyWord = document.title.replace(/-.+/, '');
				}
			}

			//所有首页接口
			else {
				// //recom.taotaosou.com/sales/pluKeywordRecom.do?num=8
				TK_API_POST = '//recom.taotaosou.com/sales/pluKeywordRecom.do?callback=?&guid=' + utils.GUID + '&website=' + 'taobao';
				return TK_API_POST;
			}
			TK_API_POST += encodeURIComponent(keyWord);

			return TK_API_POST;
		}

		function getLdsApi() {
			////199.155.122.188:9994/
			//"//recom.taotaosou.com/getShowRecom.do?itemId=" + itemId + "&cid=" + product.item.getCid() + '&title=' + encodeURIComponent(product.item.getTitle()) + '&guid=' + utils.GUID + '&ditch=' + utils.DITCH_ID + '&callback=?',
			var TK_API_POST = '//recom.taotaosou.com/getShowRecom.do?itemId=' + Product.item.getID() +
				'&website=' + host.webSite +
				'&title=' + Product.item.getTitle() +
				'&guid=' + utils.GUID +
				'&ditch=' + utils.DITCH_ID + '&callback=?';
			if (host.isTBDetail || host.isTMDetail) {
				TK_API_POST += '&cid=' + Product.item.getCid();
			}

			return TK_API_POST;
		}

		function getCPSApi(cateType, cateId) {
			////199.155.122.188:9994/
			////show.kc.taotaosou.com/findAndFind.do?guid=736A5476AA76ACF5D084C74B8C996F97&pid=278&cateType=false&cateId=121452038&itemSize=6&title=%E7%A7%8B%E5%86%AC%E7%AB%B9%E7%82%AD%E6%A3%89%E5%8A%A0%E5%8E%9A%E5%8A%A0%E7%BB%92%E6%89%93%E5%BA%95%E8%A3%A4%E8%A2%9Cguid
			//"//recom.taotaosou.com/getShowRecom.do?itemId=" + itemId + "&cid=" + product.item.getCid() + '&title=' + encodeURIComponent(product.item.getTitle()) + '&guid=' + utils.GUID + '&ditch=' + utils.DITCH_ID + '&callback=?',
			var TK_API_POST = '//showkc.taotaosou.com/findAndFind.do?title=' + encodeURIComponent(Product.item.getTitle()) +
				'&website=' + host.webSite +
				'&cateType=' + cateType +
				'&cateId=' + cateId +
				'&guid=' + utils.GUID +
				'&ditch=' + utils.DITCH_ID +
				'&itemSize=9&pid=278_' + utils.DITCH_ID + '&callback=?';
			if (!host.isMGJDetail) {
				TK_API_POST += '&cid=' + Product.item.getCid();
			}

			return TK_API_POST;
		}

		//获取juxiao Api
		function getJuxiaoApi(key, url, cid) {
			//搜索结果词接口 //show.3.mediav.com/s?showid=lixL2c&type=1&of=4&impct=9&qhtid=114078&qhcn=0&jsonp=?&ref=&qhtag=%E5%A5%B3%E8%A3%85
			var showId = 'lixL2c';
			//list showid;
			if (host.isTMList || host.isTBList || host.isB2CList) {
				showId = 'lixL2c';
				return env.juxiao() + '/s?showid=' + showId +
					'&type=1&of=4&impct=9&qhtid=114078' +
					'&qhcn=' + cid +
					'&jsonp=?&ref=' + encodeURIComponent(url) +
					'&qhtag=' + encodeURIComponent(key);
			} else {
				showId = 'RMvMSy';
				return env.juxiao() + '/s?showid=' + showId +
					'&type=1&of=4&impct=9&qhtid=114078&qhcn=' + utils.getCid() +
					'&jsonp=?&ref=' + encodeURIComponent(url) +
					'&qhtag=' + encodeURIComponent(key);
			}
		}

		//获取人群推介商品的第一个商品标题的广告接口Api
		function getAdsApi(title) {
			var TK_API_POST = '//showkc.taotaosou.com/findAndFind.do?title=' + encodeURIComponent(title) +
				'&website=' + host.webSite +
				'&cateType=&cateId=&guid=' + utils.GUID +
				'&itemSize=9&pid=278' + '&callback=?';

			return TK_API_POST;
		}

//获取juxiaoList Api
		function getJuxiaoListApi(key, url, cid) {
			//搜索结果词接口 //show.3.mediav.com/s?showid=lixL2c&type=1&of=4&impct=9&qhtid=114078&qhcn=0&jsonp=?&ref=&qhtag=%E5%A5%B3%E8%A3%85
			/*var showId = 'lixL2c';
			 //list showid;
			 if (host.isTMList || host.isTBList || host.isB2CList) {*/
			var showId = 'lixL2c';
			return env.juxiao() + '/s?showid=' + showId +
				'&type=1&of=4&impct=9&qhtid=114078' +
				'&qhcn=' + cid +
				'&jsonp=?&ref=' + encodeURIComponent(url) +
				'&qhtag=' + encodeURIComponent(key);
		}
		//获取底通广告信息
		function getDitong(){
			var url;
			return (url = '//showkc.taotaosou.com/tumeiti.do?adType=0,0,1,0&keyword=0,0,0,0&adSize=0,0,430*70,0&itemSize=0,0,1,0&tbId=&pid=388&jsonp=?');
		}

		/*else {
		 showId = 'RMvMSy';
		 return '//show.3.mediav.com/s?showid=' + showId +
		 '&type=1&of=4&impct=9&qhtid=114078&qhcn=' + utils.getCid() +
		 '&jsonp=?&ref=' + encodeURIComponent(url) +
		 '&qhtag=' + encodeURIComponent(key);
		 }*/


		module.exports = {
			taobao: function () {
				return getTBApi();

				/*if (host.isMGJDetail || host.isMLSDetail) {
				 return getMLSApi();
				 } else {
				 }*/
			},

			reCom: function () {
				return getReComApi();
			},

			juXiao: function (key, url, cid) {
				return getJuxiaoApi(key, url, cid);

			},

			b2c: {
				category: function () {
					return API_BROWSER + 'getCategoryAndSex.do?title=' + encodeURIComponent(Product.item.getTitle()) + '&callback=?' + jiayuId + '&z1_guid=' + utils.GUID;
				},

				get: function () {
					return API_BROWSER + 'getB2cItems.do' +
						'?title=' + encodeURIComponent(Product.item.getTitle()) +
						'&itemId=' + Product.item.getID() +
						'&ptyp=' + host.pageType +
						'&ditch=' + utils.DITCH_ID +
						'&website=' + host.webSite +
						'&callback=?' + jiayuId +
						'&z1_guid=' + utils.GUID;
				}
			},
			remind: {
				status: function (userId) {
					return API_BROWSER + 'hasPriceRemind.do' +
						'?sourceId=' + Product.item.getID() +
						'&userId=' + userId +
						'&webSite=' + host.webSite +
						'&callback=?';

				},
				set: function (userId) {
					return API_BROWSER + 'setRemindPrice.do' +
						'?sourceId=' + Product.item.getID() +
						'&webSite=' + host.webSite +
						'&price=' + Product.item.getPrice() +
						'&setPrice=' + Product.item.getPrice() +
						'&userId=' + userId +
						'&callback=?';
				},
				message: function (type) {
					////199.155.122.240:8081/message/get?uid=3&page=0&type=1&pagesize=1&status=0&callback=callback
					return '//message.taotaosou.com/mbs/' + 'message/get' +
						'?uid=' + utils.userData().id +
						'&page=0&client＝7' +
						'&type=' + type +
						'&pagesize=1&status=0&callback=?';

				},
				read: function (ids) {
					return '//message.taotaosou.com/mbs/message/read?mids=' + ids;
				}
			},
			user: {
				status: function () {
					return '//uc.taotaosou.com/isLogin?callback=?';
				}
			},
			//找了又找api
			lds: function () {
				return getLdsApi();
			},
			cps: function (cateType, cateId) {
				return getCPSApi(cateType, cateId);
			},
			// 底通团购list api
			tuan: function () {
				return '//client.service.taotaosou.com/recomTab.do';
			},
			//获取低通广告
			ads: function (title) {
				return getAdsApi(title);
			},
			juXiaoList: function (key, url, cid) {
				return getJuxiaoListApi(key, url, cid);
			},
			ditong: function(){
				return getDitong();
			}
		};
	}
)
;

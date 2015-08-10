__tk__define(function (require, exports, module) {
  var $ = require('../lib/jquery'),
    getJSONP = require('./jsonp'),
    utils = require('../utils'),
    prefix = require('../views/prefix'),
    _ = require('../lib/underscore'),
    api = require('./api'),
    Product = require('../product'),
    $body = $('body'),
    PROMO_PRICE_API_GET = '//show.re.taobao.com/feature.htm?cb=?';
  //存储商品ID 对精品进行排重
  //var apiData = {};

  module.exports = {
    category: function () {
      getJSONP({
        url: api.b2c.category(),
        done: function (data) {
          $body.trigger('tkb2c.show', [data]);
        }
      });
    },

    get: function (categoryData) {
      //### 获取同款数据 ###
      getJSONP({
        url: api.b2c.get() + '&cid=' + categoryData[0] + '&sex=' + categoryData[1],

        done: function (data) {
          /*apiData = {
            sid: data.sid,
            pType: data.pType,
            price: data.price,
            promoPrice: data.promoPrice,
            itemId: data.itemId,
            resultType: data.resultType,
            isTtsCategory: data.isTtsCategory,
            cid: data.cid
          };*/
          data.dimension = '';
          //获取促销价用的商品ID
          var idList = '',
          //No found product
            isNoFound = false,

            webSiteMap = {};

          webSiteMap = {
            'taobao': '淘宝网',
            'tmall': '天猫商城',
            'jd': '京东商城',
            'amazon': '亚马逊',
            'yihaodian': '1号店',
            'dangdang': '当当网',
            'suning': '苏宁易购',
            '51buy': '易迅',
            'vipshop': '唯品会',
            'wanggou': 'QQ网购',
            'vjia': '凡客V+',
            'vancl': '凡客诚品',
            'moonbasa': '梦芭莎',
            'coo8': '库巴',
            'm18': '麦考林',
            'xiu': '走秀',
            'mbaobao': '卖包包',
            'justyle': 'justyle',
            'hstyle': '韩都衣舍',
            'liebo': '裂帛',
            'ochirly': '欧时力官网',
            'hg-daigou': '韩购社官网',
            'htjz': '核桃夹子'
          };

          if ((data.sameList.length === 0) && (data.similarList.length === 0)) {
            isNoFound = true;
          }

          //Format product
          function formatList(list, type) {
						var ty = '_tuijian';
						if (type === 'same') {
							ty = '_bijia';
						}
            //Splice product link
						function transfer(url, ttsid) {
							//Change referer
							var TRANSFER_API_POST = 'http://search.taotaosou.com/transfer.htm?',//淘淘搜比价转地址
							//主站转CPS
							//TRANSFER_CPS_POST = '//www.taotaosou.com/cps/getCPSLink.do?url=',
								TRANSFER_POST;
							//直接跳淘宝
							TRANSFER_POST = TRANSFER_API_POST + url;


							if (ttsid !== 0) {
								TRANSFER_POST = '//item.taotaosou.com/' + ttsid +
									'.html?utm_medium=ttk&utm_source=' + utils.site() + ty;
							} else {
								TRANSFER_POST = TRANSFER_API_POST + url;
							}
							return TRANSFER_POST;
						}

            _.each(list, function (product, index) {
              if (product.promoPrice > 1000) {
                product.promoPrice = parseInt(product.promoPrice, 10);
              }
              if (product.price > 1000) {
                product.price = parseInt(product.price, 10);
              }
              //Change product link
              if (!isNoFound && 'webSite' in product) {
                if (product.webSite.match(/taobao|tmall/)) {
                  product.clickUrl = transfer(product.clickUrl, product.ttsid);
                  //拼接促销价 URL
                  idList += product.sourceId + ',';
                } else if (product.webSite === 'jd.com') {
                  product.webSite = 'jd';
                }

                product.webSiteTitle = webSiteMap[product.webSite];
              }
              if (product.price > product.promoPrice) {
                product._price = product.price;
              }
              //Product click stat
              if (typeof product.promoPrice === 'undefined') {
                product.promoPrice = 'null';
              }
              product._feedbackCount = product.feedbackCount;
              product.index = index;

            });

          }

          _.extend(data, {
            app: prefix.app,
            noFound: false,
            more: utils.getUndertakePage(data.itemId, Product.item.getTitle())
          });

          if (data.sameList[0]) {
            formatList(data.sameList, 'same');
          }

          if (data.similarList[0]) {
            formatList(data.similarList);
          }

          $body.trigger('tkb2c.sync.success', [data]);

          //### Get promo price ###
          if (idList !== '') {
            //多做一次请求  对数据不做处理  二次请求才做处理
            getJSONP({
              url: PROMO_PRICE_API_GET,
              data: {
                auction_ids: idList,
                feature_names: 'feedbackCount,promoPrice',
                from: 'taobao_search'
              },

              done: function () {
              }
            });

            getJSONP({
              url: PROMO_PRICE_API_GET,
              data: {
                auction_ids: idList,
                feature_names: 'feedbackCount,promoPrice',
                from: 'taobao_search'
              },

              done: function (promoPriceData) {
                var promoPrice,
                  hasPromoPrice = false,
                //same = data.sameList,
                  hasCom = false,
                  minPrice,
                  com;

                //促销价与原价对比，取最低价格
                function getPromoPrice(promoPriceData, id) {
                  var result = false;
                  $.each(promoPriceData, function (i, item) {
                    //匹配促销价接口和原商品的ID
                    if (parseInt(item.auction_id, 10) === id &&
                      item.promoPrice !== '') {
                      //促销价大于 1000 时，舍弃小数。
                      if (item.promoPrice > 1000) {
                        result = parseInt(item.promoPrice, 10);
                      } else {
                        result = item.promoPrice;
                      }
                    }
                  });

                  return result;
                }

                //获取评论数
                function getCom(promoPriceData, id) {
                  var proCom = '0';
                  $.each(promoPriceData, function (i, item) {
                    //匹配促销价接口和原商品的ID
                    if (parseInt(item.auction_id, 10) === id) {
                      if (item.feedbackCount === '') {
                        proCom = '0';
                      } else {
                        proCom = item.feedbackCount;
                      }
                    }
                  });
                  return proCom;
                }

                function sortList(list, type) {
                  $.each(list, function (i, item) {
                    promoPrice = getPromoPrice(promoPriceData, item.sourceId);
                    com = getCom(promoPriceData, item.sourceId);

                    if (promoPrice) {
                      hasPromoPrice = true;
                      item.promoPrice = promoPrice;
                      if (item.promoPrice < item.price) {
                        item._price = item.price;
                      } else {
                        delete item._price;
                      }
                    }
                    if (item.webSite.match(/taobao|tmall/)) {
                      if (com !== '0') {
                        hasCom = true;
                        item._feedbackCount = com;
                      }
                    }

                  });
                  //Sort and update list
                  if (type === 'same') {
                    //Get min price
                    minPrice = _.min(list, function (item) {
                      return parseFloat(item.promoPrice);
                    });
                    //Sort list
                    list = _.without(list, minPrice);
                    list.unshift(minPrice);
                  }
                  return list;
                }

                //相似宝贝
                if (data.sameList[0]) {
                  data.sameList = sortList(data.sameList, 'same');
                }
                if (data.similarList[0]) {
                  data.similarList = sortList(data.similarList, 'similar');

                }
                if (hasPromoPrice || hasCom) {
                  $body.trigger('tkb2c.sync.promoprice', [data]);
                }
              }
            });
          }
        },

        fail: function () {
          $body.trigger('tkb2c.sync.fail', ['不妙！高峰期遭遇堵车，请稍后再试。']);
        }
      });
    },

    fetch: function () {
      var _self = this;

      this.category();

      $body.on('tkb2c.show', function (e, data) {
        if (data === false) {
          return false;
        } else {
          _self.get(data);
        }
      });
    }
  };
});

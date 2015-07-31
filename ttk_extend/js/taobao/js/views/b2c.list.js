//List page event collection
__tk__define(function (require, exports) {
  var $ = require('../lib/jquery'),
    _ = require('../lib/underscore.js'),
  //Base
    J = {},
    autoDelay = null,
    isOnload = false;

  _.extend(J, {
    Product: require('../product'),
    model: require('../models/models'),
    host: require('../host'),
    utils: require('../utils'),
    prefix: {         app: 'TK-',         btn: 'TK-button',         logo: 'TK-logo-icon',         $id: function(selector) {             return $('#' + 'TK-' + selector);         },         $cls: function(selector) {             return $('.' + 'TK-' + selector);         }     }.app,
    list: require('./b2c.list.render').init,
    body: $('body')
  });


  //判断图片地址为淘宝商品图片
  //后缀必须是jpg
  //包含bao/uploaded/目录
  //尺寸必须大于70x70
  function isImage(img) {
    var src = img.src || $(img).data('ks-lazyload') || $(img).data('ks-lazyload-custom');
    if (_.isUndefined(src)) {
      return false;
    }
    var $img = $(img),
    //TODO 改用 class 区分淘淘搜比价图片会更高效
      isTKImage = _.isElement($img.parents('#' + J.prefix + 'media')[0]);

    if (src.match(/blank.gif/) || ($img.width() < 70) || ($img.height() < 70) || isTKImage) {
      return false;
    } else if (J.host.isYHDList) {
      if ($img.parent().hasClass('product_pic') || $img.parent().hasClass('search_prod_img')) {
        return true;
      } else if ($img.parent().hasClass('pro_img_big') || $img.parent().hasClass('pro_img')) {
        return true;
      } else if ($img.parents('.pic')[0]) {
        return true;
      }
    } else if (J.host.isVjiaList) {
      if ($img.parents('.proInfoImg')[0]) {
        return true;
      }
    } else if (J.host.isDDList) {
      if ($img.parent().hasClass('pic') && !$img.parents('.big')[0]) {
        return true;
      }
    } else if (J.host.isSuningList) {
      if ($img.hasClass('err-product')) {
        return true;
      }
    }
    else if (_.isElement($img.parents('.p-img')[0]) || $img.parent().attr('href').match(/autorank.jd.com/)) {
      return true;
    } else {
      return false;
    }
  }

  exports.init = function () {
    J.utils.loadCSS('//exts.taotaosou.com/browser-static/taobao/b2c.list.css');
    J.body.on({
      //Show icon
      //TODO list.taobao.com listen button
      'b2c.list.global.init': function () {
        var delay = null,
          cateDelay = null,
        //自动触发延迟
          autoTime = 2000,
          $container = $('#' + J.prefix + 'media');

        var cateShow = function (data, target) {
          if ($('#' + J.prefix + 'con')[0]) {
            $('#' + J.prefix + 'con').hide();
          }
          if (delay) {
            clearTimeout(delay);
          }
          if (autoDelay) {
            clearTimeout(autoDelay);
          }
          delay = setTimeout(function () {
            J.body.trigger('b2c.list.global.show', [data, target]);
          }, 100);
          //Auto show
          autoDelay = setTimeout(function () {
            J.body.trigger('b2c.list.global.show', [data, target, 'auto']);
          }, autoTime);
        };

        $('img:visible').each(function (i, item) {
          var target = $(item);

          if (isImage(item)) {
            if (!target.data('tk')) {
              target.data('tk', 'true').on('mouseenter', function () {
                var _this = this;
                if (target.data('tk-cateData') === false) {
                  return false;
                }
                if (cateDelay) {
                  clearTimeout(cateDelay);
                }
                cateDelay = setTimeout(function () {
                  J.body.trigger('tk.global.init', [target[0]]);
                  if (target.data('tk-cateData')) {
                    var cateDate = target.data('tk-cateData');
                    cateShow(cateDate, $(_this));
                  } else {
                    J.model.b2c.category();
                    J.body.one('tkb2c.show', function (e, data) {
                      target.data('tk-cateData', data);
                      if (data === false) {
                        return false;
                      } else {
                        cateShow(data, $(_this));
                      }
                    });
                  }

                }, 100);
              });
              target.on('mouseleave', function () {
                if (cateDelay) {
                  clearTimeout(cateDelay);
                }
                if (delay) {
                  clearTimeout(delay);
                }
              });
            }
          }
        });
        if (_.isElement($container[0]) === false) {
          J.list.render();
          $container = $('#' + J.prefix + 'media');

          $container.on('mouseleave', function () {
            if (delay) {
              clearTimeout(delay);
            }
            if (autoDelay) {
              clearTimeout(autoDelay);
            }
            J.body.trigger('b2c.list.global.remove', [$(this)]);
          });

          //点击相似宝贝
          $('#' + J.prefix + 'button').on('click', function () {
            J.body.trigger('tkstat.global.button');
          });

          //原商品点击
          $('#' + J.prefix + 'source-product').on('click', function () {
            J.body.trigger('tkstat.source.productclick', [this]);
          });
        }
      },

      'b2c.list.global.show': function (e, cate, target, type) {
        var button = $('#' + J.prefix + 'button');
        //显示“相似宝贝”按钮
        function showButton(callback) {
          J.list.update();

          J.body.trigger('tkstat.global.hover');
          button.show();

          //TODO 快速移动会重复绑定事件
          button.one('mouseover', callback);
        }

        function open(e, type) {
          var $con = $('#' + J.prefix + 'con');
          //更新 UI 座标、位置
          function position(target) {
            var isRight = ($('html').width() / 1.7 < J.Product.item.box.offset().left);

            target.parent().removeClass(J.prefix + 'right');

            target.removeClass(J.prefix + 'loading');

            if (isRight) {
              target.parent().addClass(J.prefix + 'right');
            }

            $con.show();
          }

          J.list.renderBox();
          position($con);
          function bindEvent(data) {
            //商品的点击
            $('#' + J.prefix + 'list .J_alink').on('click', function () {
              if (type === 'auto') {
                J.body.trigger('tkstat.global.product', [data, $(this), undefined, 'image']);
              } else {
                J.body.trigger('tkstat.global.product', [data, $(this)]);
              }
            });
          }

          if (!isOnload) {
            J.model.b2c.get(cate);
            J.body.one({
              'tkb2c.sync.success': function (e, data) {
                $.proxy(J.list.render, J.list);
                J.list.render(e, data, type);
                position($con, data);
                //点击淘淘搜比价 logo
                $('#' + J.prefix + 'logo').one('click', function () {
                  J.body.trigger('tkstat.global.logo');
                });

                //点击查看更多按钮
                $('#' + J.prefix + 'move').one('click', function () {
                  J.body.trigger('tkstat.global.more');
                });
                bindEvent(data);
              },
              'tkb2c.sync.fail': function (e, text) {
                J.list.fail(text);
                position($con);
              },
              'tkb2c.sync.promoprice': function (e, data) {
                J.list.render(e, data, 'promoprice');
                bindEvent(data);
              }
            });
            isOnload = true;
          } else {
            return false;
          }
          if (_.isString(type) && type === 'auto') {
            J.body.trigger('tkstat.global.focus', 'auto');
          } else {
            J.body.trigger('tkstat.global.focus', 'button');
          }
        }

        if (type === 'auto') {
          $('#' + J.prefix + 'button').trigger('mouseenter', [type]);
        } else {
          showButton(open);
        }
      },

      'b2c.list.global.remove': function () {
        var media = $('#' + J.prefix + 'media'),
          con = $('#' + J.prefix + 'con');

        if (autoDelay) {
          clearTimeout(autoDelay);
        }

        //Hide container
        $('#' + J.prefix + 'button').hide();
        media.css('visibility', 'hidden');
        con.removeClass(J.prefix + 'loading').hide();
        isOnload = false;
        J.list.render();
      }
    });
  };
});

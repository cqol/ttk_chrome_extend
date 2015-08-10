//List page event collection
__tk__define(function (require, exports) {
    var $ = require('../lib/jquery'),
        _ = require('../lib/underscore.js'),
    //Base
        J = {},
        autoDelay = null,
        isOnload = false;

    window.imgIdArr = [];

    _.extend(J, {
        Product: require('../product'),
        model: require('../models/models'),
        host: require('../host'),
        utils: require('../utils'),
        prefix: require('./prefix').app,
        list: require('./render').sms,
        body: $('body'),
        MIN: window.navigator.userAgent.match(/MSIE 6.0/)
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
            isTKImage = _.isElement($img.parents('#' + J.prefix + 'media')[0]),
            isMLS = src.match(/.+_\d{3,}_\d.*\./),
            isMGJ = src.match(/.+_225x999.jpg/);
        if (isMLS) {
            if ($img.width() < 170) {
                return false;
            } else {
                return true;
            }
        } else if (isMGJ) {
            return true;
        }
        //贪婪模式，通过匹配后缀包含 _210x210.jpg, _b.jpg 两种规则来判断为大图
        else if (src.match(/.+_.*x.*.jpg|.+_b.jpg|.+_sum.jpg/g)) {
            //根据图片后缀判断图片大小
            //先取到 g_130x，再把 g_ 删除，再把 130x 转换成数值
            if ( (parseInt(src.replace(/.*jpg_/, '').replace(/x.*/, ''), 10) < 70) ||
                //过滤高宽小于 70px 的图片
                ($img.width() < 70) || ($img.height() < 70) || isTKImage ) {
                return false;
            }
        } else {
            return false;
        }
    }

    exports.init = function () {
        J.body.on({
            //Show icon
            //TODO list.taobao.com listen button
            'tklist.global.init': function () {
                var delay = null,

                //自动触发延迟
                    autoTime = 2000,
                    $container = $('#' + J.prefix + 'media');

                $('img:visible').each(function (i, item) {
                    var target = $(item);

                    if (isImage(item)) {
                        if (!target.data('tk')) {
                            target.data('tk', 'true').on('mouseenter', function () {
                                if ($('#' + J.prefix + 'con')[0]) {
                                    $('#' + J.prefix + 'con').hide();
                                }
                                var _this = this;
                                if (delay) {
                                    clearTimeout(delay);
                                }
                                if (autoDelay) {
                                    clearTimeout(autoDelay);
                                }
                                delay = setTimeout(function () {
                                    J.body.trigger('tklist.global.show', [$(_this)]);
                                }, 100);
                                //Auto show
                                autoDelay = setTimeout(function () {
                                    J.body.trigger('tklist.global.show', [$(_this), 'auto']);
                                }, autoTime);
                            });
                            target.on('mouseleave', function () {
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
                        J.body.trigger('tklist.global.remove', [$(this)]);
                    });

                    $('#' + J.prefix + 'source-product').on('click', function () {
                        J.body.trigger('tkstat.source.productclick', [this]);
                    });

                    //关闭淘淘搜比价
                    $('#' + J.prefix + 'close').on('click', function () {
                        J.body.trigger('tklist.global.remove');

                        J.body.trigger('tkstat.global.remove');
                    });

                    //点击相似宝贝
                    $('#' + J.prefix + 'button').on('click', function () {
                        J.body.trigger('tkstat.global.button');
                    });


                }
            },

            'tklist.global.show': function (e, target, type) {
                var button = $('#' + J.prefix + 'button');
                //显示“相似宝贝”按钮
                function showButton(target, callback) {
                    J.body.trigger('tk.global.init', [target[0]]);

                    J.list.update();

                    J.body.trigger('tkstat.global.hover');
                    button
                        .attr('href', J.utils.getUndertakePage(J.Product.item.getID(), J.Product.item.getTitle()))
                        .show();

                    //TODO 快速移动会重复绑定事件
                    button.one('mouseover', callback);
                }

                function open(e, type) {
                    var $con = $('#' + J.prefix + 'con');
                    //更新 UI 座标、位置
                    function position(target, data) {
                        var isRight = ($('html').width() / 1.7 < J.Product.item.box.offset().left);

                        target.parent().removeClass(J.prefix + 'right');

                        target.removeClass(J.prefix + 'loading');

                        if (isRight) {
                            target.parent().addClass(J.prefix + 'right');
                        }

                        if (_.isUndefined(data) === false) {
                            J.body.trigger('tkstat.global.tag', data);
                        }
                        if (data) {
                            var sexCid = '';
                            if (data.isTtsCategory) {
                                sexCid += '&cid=' + data.cid + '';
                                if (typeof data.sex !== 'undefined') {
                                    sexCid += '&sex=' + data.sex;
                                }
                            }
                            button
                                .attr('href', J.utils.getUndertakePage(data.itemId, J.Product.item.getTitle()) + sexCid)
                                .show();
                        }

                        $con.show();
                    }

                    J.list.renderBox();
                    position($con);
                    function bindEvent(data) {
                        var tab = '1',
                            isNoSameSim = (data.sameList.length === 0) && (data.similarList.length === 0);
                        if (isNoSameSim) {
                            tab = '3';
                        }
                        //商品的点击
                        $('#' + J.prefix + 'list .J_alink').on('click', function () {
                            if (type === 'auto') {
                                J.body.trigger('tkstat.global.product', [data, $(this), undefined, 'image', tab]);
                            } else {
                                J.body.trigger('tkstat.global.product', [data, $(this), undefined, undefined, tab]);
                            }
                        });
                        //评论的点击
                        $('#' + J.prefix + 'list .J_comlink').on('click', function () {
                            if (type === 'auto') {
                                J.body.trigger('tkstat.global.product', [data, $(this), undefined, 'imageCom', tab]);
                            } else {
                                J.body.trigger('tkstat.global.product', [data, $(this), undefined, 'com', tab]);
                            }
                        });
                        //促销标签点击
                        $('.' + J.prefix + 'item-tags').on('click', function () {
                            if (type === 'auto') {
                                J.body.trigger('tkstat.global.product', [data, $(this), undefined, 'image', tab]);
                            } else {
                                J.body.trigger('tkstat.global.product', [data, $(this), undefined, undefined, tab]);
                            }
                        });
                        /*//原商品点击
                         $('#' + J.prefix + 'source-product').one('click', function () {
                         J.body.trigger('tkstat.source.productclick', [this]);
                         });*/
                    }

                    if (!isOnload) {
                        J.body.one({
                            'tk.sync.success': function (e, data) {
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
                            'tk.sync.fail': function (e, text) {
                                J.list.fail(text);
                                position($con);
                            },
                            'tk.sync.promoprice': function (e, data) {
                                J.list.render(e, data, 'promoprice');
                                bindEvent(data);
                            }
                        });
                        J.model.fetch();
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
                    showButton(target, open);
                }
            },

            'tklist.global.remove': function () {
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

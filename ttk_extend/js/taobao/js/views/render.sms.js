__tk__define(function (require, exports, module) {
    var $ = require('../lib/jquery'),
        _ = require('../lib/underscore.js'),
        Product = require('../product'),

        host = require('../host'),

        prefix = require('./prefix'),
        templates = require('../templates'),
        list,
        fragment,
        body = $('body');

    require('../lib/jquery.tmpl');

    list = {
        getMedia:function () {
            return $('#' + prefix.app + 'media');
        },

        //### Restore DOM ###
        restore:function () {
            //Source product
            //淘宝天猫list页原品点击
            if (host.isTBList || host.isTMList) {
                var clickSrc = Product.item.getHref();
                var lpvID = Product.item.getID() || 'P4P';
                var isTransLink = false;
                if (window.imgIdArr.length > 0) {
                    $.each(window.imgIdArr, function (i, item) {
                        if (item.id === lpvID) {
                            if (item.st) {
                                isTransLink = true;
                            }
                        }
                    });
                }
                if (isTransLink) {
                    clickSrc = 'http://search.taotaosou.com/transfer.htm?' + clickSrc;
                }
                $('#' + prefix.app + 'source-product').attr('href', clickSrc).removeClass(prefix.app + 'hidden');
            }
            else {
                $('#' + prefix.app + 'source-product').attr('href', Product.item.getHref()).removeClass(prefix.app + 'hidden');
            }

        },

        update:function () {
            var target = $(Product.item.target),
                btn = $('#' + prefix.app + 'button'),
                box;

            if (target.parents('.pic-box')[0]) {
                box = target.parents('.pic-box');
            } else {
                box = target;
            }

            Product.item.newBox = box;

            this.restore();

            //### Update position ###
            this.getMedia()
                .css({
                    top:target.offset().top + 'px',
                    left:target.offset().left + 'px',
                    width:target.outerWidth() + 'px',
                    height:target.outerHeight() + 'px'
                })
                .css('visibility', 'visible');

            if (target.outerWidth() > 170) {
                btn.css({
                    left:'30%'
                });
            } else if (target.outerWidth() > 80) {
                btn.css({
                    left:'15%'
                });
            } else {
                btn.css({
                    left:'0'
                });
            }
        },

        template:{
            container: templates['mlsmgj.list.box.container'],
            body: templates['mlsmgj.list.box.body'],
          tab: templates['mlsmgj.list.box.tab'],
          retab: templates['mlsmgj.list.box.retab']
        },

        render:function (e, data, type) {

            if (data) {
                this.renderInit(data, type);
            } else {
                this.renderBox();
            }
        },

        renderBox:function () {
            var $body = $('#' + prefix.app + 'bd');

            if ($body[0]) {
                $body.html($.tmpl(this.template.body, {app:prefix.app}));
            } else {
                $.tmpl(this.template.container, {app:prefix.app}).appendTo('body');
            }
        },

        renderInit:function (data, type) {
            var list = $('#' + prefix.app + 'list'),
                self = this,

            //No found product
                isNoFound = (data.sameList.length === 0) && (data.similarList.length === 0),
            //isNoFound = (data.sameList.length === 0) && (data.similarList.length === 0) && (data.recomList.length === 0),

            //No found same and similar
                isNoSameSim = (data.sameList.length === 0) && (data.similarList.length === 0),
            //Has same product
                isSameList = data.sameList[0],

            //Has similar product
                isSimilarList = data.similarList[0],

            //Has recomList product
                isRecomList = 'recomList' in data && data.recomList[0],

            //点击来源, 两个标签
                tab,

            //Four same product
            //isFourSame = (data.mType !== '1') && (data.mType !== '4') && (data.mType !== '5') && (data.mType !== '6'),

            /*for pirce_stat*/
                vCate = data.isTtsCategory,
                spid = data.itemId;


            if (list[0]) {
                list.html('');
            } else {
                $('#' + prefix.app + 'bd').html($.tmpl(this.template.body, {app:prefix.app}));
                list = $('#' + prefix.app + 'list');
            }
            var tabBox = $('.' + prefix.app + 'bd-tab');

            if (tabBox[0]) {
                tabBox.html('');
            }
            $('.' + prefix.app + 'bd-loading').hide();
            $('.' + prefix.app + 'bd-itemlist').show();

            $('.' + prefix.app + 'tag-move').attr('href', data.more);
            if (isNoFound && !isRecomList) {
                this.noFound(data);
            }
            else if (isRecomList && isNoSameSim) {
                fragment = document.createDocumentFragment();
                $.each(data.recomList, function (i, item) {
                    item.index = i;
                    $.extend(item, {
                        isCom: true
                    });
                    self.renderProduct(item, fragment, vCate, spid, true);
                });
                list.append(fragment);
                tab = '3';

                $.tmpl(this.template.retab, {app:prefix.app}).appendTo(tabBox);
                if (type === 'auto') {
                    body.trigger('tkstat.global.success', [data, 'image', 'recom']);
                } else if (type !== 'promoprice') {
                    body.trigger('tkstat.global.success', [data, 'touch', 'recom']);
                }
                $('.' + prefix.app + 'tag-move').attr('href', data.more + '#nav_qul');
            }
            //无同款出相似
            else {
                if (isSameList) {
                    fragment = document.createDocumentFragment();
                    $.each(data.sameList, function (i, item) {
                        item.index = i;
                        self.renderProduct(item, fragment, vCate, spid);
                    });
                    list.append(fragment);
                  $.tmpl(this.template.tab, {app:prefix.app}).appendTo(tabBox);

                } else if (isSimilarList) {
                    fragment = document.createDocumentFragment();
                    $.each(data.similarList, function (i, item) {
                        item.index = i;
                        self.renderProduct(item, fragment, vCate, spid);
                    });
                    list.append(fragment);
                  $.tmpl(this.template.retab, {app:prefix.app}).appendTo(tabBox);

                }

                tab = '1';
                if (type === 'auto') {
                    body.trigger('tkstat.global.success', [data, 'image', 'same']);
                } else if (type !== 'promoprice') {
                    body.trigger('tkstat.global.success', [data, 'touch', 'same']);
                }
            }

            //Add tips text
            $('.' + prefix.app + 'tag-source').attr('title', '你正在搜索的原商品');
            $('.' + prefix.app + 'tag-price').attr('title', '价格更便宜');
            $('.' + prefix.app + 'tag-sum').attr('title', '月销量更高');
            $('.' + prefix.app + 'tag-credit').attr('title', '店铺信誉更高');

            /*添加事件*/
            this.event(list, data, tab);
        },

        renderProduct:function (data, container, vCate, spid, recom) {
            var template = templates['mlsmgj.list.box.product'];

            var templateData;
            if (recom) {
                templateData = _.extend({}, data, {
                    app:prefix.app,
                    img:data.picUrl + '_60x60.jpg',
                    comUrl:data.clickUrl + '&on_comment=1'
                });
            } else {
                templateData = _.extend({}, data, {
                    app:prefix.app,
                    img:data.picUrl + '_60x60.jpg',
                    comUrl:data.clickUrl + '&on_comment=1',
                    //添加商品链接 Key_price 在detail也提取价格
                    clickUrl:data.clickUrl + '&key_price=' + data.price +
                        '+' + vCate + '+' + spid
                });
            }
            if (data.index < 4) {
                $.tmpl(template, templateData).appendTo(container);
            }
        },

        event:function () {
            var allItem = $('#' + prefix.app + 'list li'),
                cls = prefix.app + 'select';

            allItem.on('mouseenter', function () {
                var $target = $(this);
                allItem.removeClass(cls);

                $target.addClass(cls);
                //$img.attr('src', $imgSrc);
            });

            allItem.eq(0).trigger('mouseenter');
            //关闭淘淘搜比价
            $('.' + prefix.app + 'close').on('click', function () {
                body.trigger('tklist.global.remove');
            });
        },

        noFound:function (data) {
            var template = templates['tbtm.list.box.nofound'];

            $('#' + prefix.app + 'bd').html($.tmpl(template, data));

            //Stat
            body.trigger('tkstat.nofound.show', 'pic');

            $('.' + prefix.app + '404-click').on('click', function () {
                body.trigger('tkstat.nofound.click', 'pic');
            });

            //关闭淘淘搜比价
            $('.' + prefix.app + 'close').on('click', function () {
                body.trigger('tklist.global.remove');
            });

        },

        fail:function (text) {
            this.renderBox();

            $('#' + prefix.app + 'bd').html(text).addClass(prefix.app + 'fail');
            body.trigger('tkstat.global.timeout');
        }
    };

    module.exports = {
        init:list
    };
});

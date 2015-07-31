__tk__define(function (require, exports, module) {
    var $ = require('../lib/jquery'),
        _ = require('../lib/underscore.js'),
        Product = require('../product'),

        prefix = {         app: 'TK-',         btn: 'TK-button',         logo: 'TK-logo-icon',         $id: function(selector) {             return $('#' + 'TK-' + selector);         },         $cls: function(selector) {             return $('.' + 'TK-' + selector);         }     },
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
            $('#' + prefix.app + 'source-product').attr('href', Product.item.getHref()).removeClass(prefix.app + 'hidden');

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

            if (target.outerWidth() < 80) {
                btn.css({
                    left:'0'
                });
            } else if (target.outerWidth() < 150) {
                btn.css({
                    left:'5%'
                });
            } else {
                btn.css({
                    left:'30%'
                });
            }
        },

        template:{
            container: templates['b2c.list.box.container'],
            body: templates['b2c.list.box.body'],
            retab: templates['b2c.list.box.retab']
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
            //Has same product
                isSameList = data.sameList[0],

            //Has similar product
                isSimilarList = data.similarList[0];

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


            //$('.' + prefix.app + 'tag-move').attr('href', data.more);
            if (isNoFound) {
                this.noFound(data);
            }
            //无同款出相似
            else {
                if (isSameList) {
                    fragment = document.createDocumentFragment();
                    $.each(data.sameList, function (i, item) {
                        item.index = i;
                        self.renderProduct(item, fragment);
                    });
                    list.append(fragment);
                } else if (isSimilarList) {
                    fragment = document.createDocumentFragment();
                    $.each(data.similarList, function (i, item) {
                        item.index = i;
                        self.renderProduct(item, fragment);
                    });
                    list.append(fragment);
                }
                $.tmpl(this.template.retab, {app:prefix.app}).appendTo(tabBox);
                if (type === 'auto') {
                    body.trigger('tkstat.global.success', [data, 'image']);
                } else if (type !== 'promoprice') {
                    body.trigger('tkstat.global.success', [data, 'touch']);
                }
            }

            //Add tips text
            $('.' + prefix.app + 'tag-source').attr('title', '你正在搜索的原商品');
            $('.' + prefix.app + 'tag-price').attr('title', '价格更便宜');
            $('.' + prefix.app + 'tag-sum').attr('title', '月销量更高');
            $('.' + prefix.app + 'tag-credit').attr('title', '店铺信誉更高');

            /*添加事件*/
            this.event(list, data);
        },

        renderProduct:function (data, container) {
            var template = templates['b2c.list.box.product'];

            var templateData;
            templateData = _.extend({}, data, {
                app:prefix.app,
                img:data.picUrl + '_60x60.jpg'
            });
            if (data.index < 4) {
                if (data.webSite === 'jd') {
                    $.extend(templateData, {
                        clickUrl: '//b2c.cps.taotaosou.com/getJDcps.do?itemId=' + data.sourceId +
                            '&title=' + encodeURIComponent(data.title)
                    });
                }
                $.tmpl(template, templateData).appendTo(container);
            }
        },

        event:function (container, data) {
            var allItem = $('#' + prefix.app + 'list li'),
                tabRe = $('#J-' + prefix.app + 're'),
                cls = prefix.app + 'select';

            //不是 图搜 不出同类标签
            if (!data.isTtsCategory) {
                tabRe.hide();
            }
            allItem.on('mouseenter', function () {
                var $target = $(this);
                allItem.removeClass(cls);

                $target.addClass(cls);
                //$img.attr('src', $imgSrc);
            });

            allItem.eq(0).trigger('mouseenter');
        },

        noFound:function (data) {
            // var template = '<div class="${app}no-found-box"> <ul class="${app}bd-tab"> <a href="//tk.taotaosou.com" target="_blank" title="淘淘搜比价" id="${app}logo" class="${app}logo-tk"></a> </ul> <div id="${app}404"> <div id="${app}404-hd"> <div class="${app}bg-img"> <span></span> </div> </div>{{if siAdList}}<div id="${app}404-bd"><a href="${siAdList[0].url}" class="${app}404-click" target="_blank" id="${app}404-media"><img src="${siAdList[0].img}" alt="${siAdList[0].title}" height="80" width="80"> <img src="${siAdList[1].img}" alt="${siAdList[1].title}" height="80" width="80"> <img src="${siAdList[2].img}" alt="${siAdList[2].title}" height="80" width="80"></a> <div id="${app}404-desc"><a href="${siAdList[0].url}" target="_blank" class="${app}404-click" id="${app}404-desc-title">${siAdList[0].title}</a><a href="${siAdList[0].url}" target="_blank" class="${app}404-click" id="${app}404-desc-con">${siAdList[0].desc.slice(0,27)}...&gt;&gt;</a> </div> </div>{{/if}}</div> <a class="${app}close" href="javascript:;" title="关闭"></a> <i class="icons triangle-left-empty"> <i class="subicon"></i> </i> </div>';
            var template = templates['b2c.list.box.nofound'];
            //临时处理
            /*data.siAdList[0].img = data.siAdList[0].img + '_80x80.jpg';
            data.siAdList[1].img = data.siAdList[1].img + '_80x80.jpg';
            data.siAdList[2].img = data.siAdList[2].img + '_80x80.jpg';*/

            $('#' + prefix.app + 'bd').html($.tmpl(template, data));

            //Stat
            body.trigger('tkstat.nofound.show', 'pic');

            $('.' + prefix.app + '404-click').on('click', function () {
                body.trigger('tkstat.nofound.click', 'pic');
            });

            //关闭淘淘搜比价
            $('.' + prefix.app + 'close').on('click', function () {
                body.trigger('b2c.list.global.remove');
                body.trigger('tkstat.global.remove');
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

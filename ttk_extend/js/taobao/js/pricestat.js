__tk__define(function (require, exports, module) {
    var refer = document.referrer;
    //地址栏取是有有key_price 从list页过来
    if (!refer.match(/key_price=/)) {
        return false;
    }
    var $ = require('./lib/jquery'),
        J = {
            utils:require('./utils'),
            host:require('./host')
        },
        body = $('body');
    body.on({
        //从list页点击商品,至detail页 记录商品状态、促销价埋点
        'tkstat.price.status':function (e, data) {
            J.utils.statLog({
                systemName:'ttk_price_stat',
                pid:data.pid,
                spid:data.spid,
                ds_price:data.ds_price,
                lf_price:data.lf_price,
                dp_price:data.dp_price,
                vcat:data.vcat,
                onstore:data.onstore

            });
        }
    });
    //因为JS的浮点数运算有BUG，不能直接乘以100
    //这里先将浮点数转换 string，然后用正则删除 "."
    function numberFormat(num) {
        if (num) {
            if (typeof num === 'number') {
                num = num.toString();
            }

            return num.replace(/\./, '');
        }
    }

    var get = {
        //### 获取商品ID ###
        proId:function () {
            var _id = '';
            if (J.utils.sliceID(refer)) {
                _id = J.utils.sliceID(refer);
            }
            return _id;
        },
        //### 获取商品促销价 ###
        dp_price:function () {
            var price = '';

            //淘宝详情页促销价
            if (window.TB && window.TB.PromoData && window.TB.PromoData.def && window.TB.PromoData.def[0] && window.TB.PromoData.def[0].price) {
                price = numberFormat(window.TB.PromoData.def[0].price);
            }

            //天猫详情页
            //由于数据是异步获取，所以直接使用天猫详情页的实现
            if (J.host.isTMDetail && window.KISSY) {
                if (window.KISSY._TMD_Config && window.KISSY._TMD_Config.itemDO && window.KISSY._TMD_Config.itemDO.reservePrice) {
                    price = numberFormat(window.KISSY._TMD_Config.itemDO.reservePrice);
                }
                window.KISSY.use('malldetail/model/product', function (b, pro) {
                    //促销价
                    pro.onChange('currentPromotionList', function (data) {
                        if (data) {
                            price = numberFormat(data[0].price);
                        }
                    });
                });
            }

            if (price && price.toString().match(/\./)) {
                price = numberFormat(price);
            }

            return price.replace(/[^\x00-\xff]*/g, '').replace(/¥/g, '');
        },
        //### 获取商品原价 ###
        ds_price:function () {
            var price = '',
                detailData = $('#J_itemViewed')[0] ? $('#J_itemViewed').data('value') : '';

            if (typeof detailData === 'object' && detailData.price) {
                price = detailData.price;
            } else if ($('#J_StrPrice').text()) {
                price = $('#J_StrPrice').text().replace(/-.+/, '');
            }

            if (price && price.toString().match(/\./)) {
                price = numberFormat(price);
            }
            return price.replace(/[^\x00-\xff]*/g, '').replace(/¥/g, '');
        },
        //### 获取商品是否在架 ###
        onstore:function () {
            var onStore = '1';  //默认在架
            if ($('.J_TOffSale ')[0]) { //taobaoDtail页的 下架标识
                onStore = '0';
            } else if (document.getElementById('J_Sold-out-recommend')) {//天猫Dtail页的 下架标识
                onStore = '0';
            } else if (!document.getElementById('J_ImgBooth')) { //无商品情况 商品被移处
                onStore = '0';
            }
            return onStore;
        }
    };

    var keyArr = refer.replace(/.+key_price=/, '').split(/\+/);
    var listKeyPrice = keyArr[0],
        vCate = keyArr[1],
        spid = keyArr[2];

    if (listKeyPrice.match(/\./)) {
        listKeyPrice = listKeyPrice.replace(/\./, '');
    } else {
        listKeyPrice = listKeyPrice + '00';
    }
    var stData = {
        pid:get.proId(),
        lf_price:listKeyPrice,
        ds_price:get.ds_price(),
        dp_price:get.dp_price(),
        onstore:get.onstore(),
        vcat:vCate,
        spid:spid
    };
    body.trigger('tkstat.price.status', [stData]);

    //暴露接口
    module.exports.priceStat = get;
});

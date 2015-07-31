__tk__define(function (require) {
    //接口 地址
    //http://showkc.taotaosou.com/tumeiti.do?adType=1,0,0,0&keyword=%E8%BF%9E%E8%A1%A3%E8%A3%99%E5%A5%B3,0,0,0&adSize=210,0,0,0&itemSize=5,0,0,0&tbId=&pid=278&tb_cps_outcode=&jsonp=TTSUI19106806234072428197_1389149056051&_=1389149056054
    var $ = require('./lib/jquery.min');

    require('./lib/jquery.tmpl.min');

    function render(data) {

        var wrap = $('<div class="tk_s_search"></div>');
        $(data).each(function (i, item) {
            renderProduct(item, wrap);
        });
        wrap.insertBefore($('.tb-bottom'));
    }
    function renderProduct(data, wrap) {
        var tmpl = '<div class="item-box"> <div class="pic"> <p class="pic-box"> <a href="${href}" target="_blank"> <span> <img src="${media}"> </span> </a> </p> </div> <h3 class="summary"> <a href="${href}" target="_blank" title="${title}">${title}</a> </h3> <div class="row"> <div class="price">￥<span>${price}</span> </div> </div> </div>';
        var tmplData = data;
        $.tmpl(tmpl, tmplData).appendTo(wrap);
    }
    setTimeout(function() {
        if ($('.tb-bottom')[0]) {
            $.getJSON('//showkc.taotaosou.com/tumeiti.do?adType=1,0,0,0&keyword=%E8%BF%9E%E8%A1%A3%E8%A3%99%E5%A5%B3,0,0,0&adSize=210,0,0,0&itemSize=5,0,0,0&tbId=&pid=278&tb_cps_outcode=&jsonp=?', function (data) {
                if (!data || !data.xiangsi[0]) {
                    return;
                }
                var len = data.xiangsi.length
                if (len < 5) {
                    return;
                } else {
                    render(data.xiangsi);
                }
            });
        }
    }, 800);
});
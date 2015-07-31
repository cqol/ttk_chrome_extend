__tk__define(function (require, exports, module) {
    var $ = require('./lib/jquery'),
        body = $('body'),
        utils = require('./utils'),
        getJSONP = require('./models/jsonp'),
        href = window.location.href;
    //172.16.30.198:8089
	//http://browserre.taotaosou.com/installRedirect.do?callback=?
    function init() {
        var maskTmpl = '<div id="J_newbie" class="tts_wrap"> <div class="tts_mask"></div> <div class="tts_mask_header"><div class="tts_mask_banner"><a href="http://tk.taotaosou.com/market/style/" target="_blank"><img src="//exts.taotaosou.com/browser-static/taobao/newbie/n_ban_01.jpg"></a></div></div> <div class="tts_btn_float"></div> <div class="tts_mask_none"></div> <div class="tts_box_fb"> <div class="tts_box_float"></div> <a href="javascript:;" class="tts_go_btn">立刻体验</a> <a href="http://tk.taotaosou.com/market/style/" class="tts_go_style" title="玩爆小时代,我的style!" target="_blank">去抽奖</a> </div> </div>',
            tkCon = $('#TK-con'),
            left,
            top;
        $(maskTmpl).appendTo('body');
        $('.tts_go_style').on('click', function(e) {
            e.preventDefault();
            utils.stat('rukou_clk');
            window.open($(this).attr('href'));
        });
        left = tkCon.offset().left + 8;
        top = tkCon.offset().top;

        var styleStr = 'left:' + left + 'px;top:' + top + 'px;position:absolute!important',
            newbieBox = $('#J_newbie'),
            boxFloat = $('.tts_box_fb');

        //reset boxFloat
        boxFloat.css({
            'left':left,
            'top':top - 137
        });
        tkCon.clone().attr('style', styleStr).appendTo(newbieBox);
        body.css({
            'overflowY':'hidden'
        });


        utils.stat('ttk_dnok_PV');
        setBtnFloat();
        goBtn(newbieBox);
    }

    if (!href.match(/key_newbie=/)) {
        getJSONP({
            url: 'http://log.taotaosou.com/getCookieByKey.do?callback=?',
            done: function(data) {
                if (data !== 'null') {
                    return false;
                } else {
                    init();
                }
            }
        });
    } else {
        init();
    }

    function setBtnFloat() {
        var btn = $('#TK-button'),
            btnFloat = $('.tts_btn_float'),
            left = parseInt(btn.css('left'), 10) - 47 ,
            top = parseInt(btn.css('top'), 10) - 340;

        btnFloat.css({
            'left':left,
            'top':top
        });
    }
    //立即体验点击
    function goBtn(box) {
        var goTo = $('.tts_go_btn');
        goTo.on('click', function () {
            box.hide();
            body.css({
                'overflowY':'scroll'
            });
            utils.stat('ttk_dnok_useclk');
        });
    }

    //暴露初始化接口
    module.exports = {
        init:init
    };
});

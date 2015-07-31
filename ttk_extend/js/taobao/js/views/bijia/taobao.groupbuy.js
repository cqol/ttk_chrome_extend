__tk__define(function (require, exports, module) {
  var $ = require("../../lib/jquery"),
  utils = require("../../utils"),
  _ = require("../../lib/underscore"),
  countdown = require("../../lib/jquery.countdown"),
  templates = require("../../templates.jst"),
  tts_stat = require("../../utils/tts_stat");

  module.exports = {
    init:function(){
      this.serTime,
      this.endTime,
      this.nowHour,
      this.ifLimit,
      this.onTurn = 1,
      this.firstShow = 0,
      this.data,
      this.getserTime();          //服务器时间          
    },

    switchModule:function(){
      var self = this;
      $("#KKT-tuangou-close").on('click', function() {
        $("#KKT-tuangou-frame").animate({
          opacity: 0},
          500, function() {
          $("#KKT-tuangou-frame").css('display', 'none');
          $("#KKT-nomore").css('display', 'block').animate({top: "-25px", opacity: "1"}, 400);
        });
      });

      //update 20150427

      var btn = $("#KKT-open-tuangou"), //btn角标
        box = $("#KKT-tuangou-frame"); //box展现框

      var timer = null,
        delay = false;
      btn.on('mouseenter', function () {
        clearTimeout(timer);

        if (!delay) {
          tts_stat.trackEvent("Bottomtab_seckill_menu_pv");        //面板展现，手动
          tts_stat.trackEvent("Bottomtab_seckill_P_pv");
        }

        $("#KKT-nomore").css({
          top: '0px',
          opacity: '0',
          display: 'none'
        });
        box.css({
          display: 'block',
          opacity: '1'
        });

        timer = null;
        delay = true;
      });
      btn.on('mouseleave', function () {
        timer = setTimeout(function () {
          box.css('display', 'none');
          $("#KKT-nomore").css('display', 'block').animate({top: "-25px", opacity: "1"}, 500);
          delay = false;
          timer = null;
        }, 300);
      });

      box.on({
        'mouseover': function () {
          clearTimeout(timer);
          box.css({
            display: 'block',
            opacity: '1'
          });
        },
        'mouseout': function () {
          timer = setTimeout(function () {box.css('display', 'none');
            $("#KKT-nomore").css('display', 'block').animate({top: "-25px", opacity: "1"}, 500);
            delay = false;
            timer = null;
          }, 300);
        }
      });


      /*$("#KKT-open-tuangou").on('mouseenter', function() {

        $(this).addClass("ttk-active");
        tts_stat.trackEvent("Bottomtab_seckill_menu_pv");        //面板展现，手动
        tts_stat.trackEvent("Bottomtab_seckill_P_pv");            //商品展现手动
        $("#KKT-nomore").css({
          top: '0px',
          opacity: '0',
          display: 'none'
        });
        $("#KKT-tuangou-frame").css({
          display: 'block',
          opacity: '1'
        });
      });  
      $("#KKT-tuangou-frame").on('mouseleave', function() {
        setTimeout(function(){
          $("#KKT-tuangou-frame").css('display', 'none');
          $("#KKT-nomore").css('display', 'block').animate({top: "-25px", opacity: "1"}, 500);
        },500);
      });*/

      $("body").on("click", ".TTS-bijia-min-btn", function() {
        if ($(this).hasClass("bijia-fold")) {
          $("#KKT-nomore").css('display', 'block').animate({top: "-25px", opacity: "1"}, 500);   
        } else {
          $("#KKT-nomore").css({
            top: '0px',
            opacity: '0',
            display: 'none'
          });
          $("#KKT-tuangou-frame").css({
            display: 'none',
            opacity: '0'
          });          
        }
      });

    },

    getserTime:function(){
      var self = this;
      //var timeTemp = [];
      var gmtDate,tempDate,nowHour;
      $.ajax({
        // url: '//199.155.122.216:9988/getCurrentTime.do?cType=4&format=2',
        url: '//seckill.taotaosou.com/getCurrentTime.do?cType=4&format=2',
        cache: false,
        dataType: "jsonp",
        jsonp: "callback"
      })
      .done(function(time) {
        //结束时间计算
        self.serTime = time.data;
        gmtDate = new Date(time.data);
        var d = new Date(),
            endHour,endTime,
            nowYear = gmtDate.getFullYear(),
            nowMonth = d.getMonth() + 1,
            nowDay = utils.format(gmtDate.getDate()),
            nowMin = utils.format(gmtDate.getMinutes()),
            nowSec = utils.format(gmtDate.getSeconds()),
            nowHour = utils.format(gmtDate.getHours());
        var x = nowHour;
        if(x>=10&&x<=13){
          endHour = 14;
          endTime = nowYear + "/" + nowMonth + "/" + nowDay + " " + endHour + ":00:00";
        } else if(x>=14&&x<=20){
          endHour = 21;
          endTime = nowYear + "/" + nowMonth + "/" + nowDay + " " + endHour + ":00:00";
        } else if(x>=21&&x<=23){
          var todayLast;
          todayLast = (23-nowHour)*60*60*1000 + (60-nowMin)*60*1000 + (60-nowSec)*1000;
          endTime = todayLast + 36000000 + time.data;
        } else if (x>=0&&x<=9) {
          endHour = 10;
          endTime = nowYear + "/" + nowMonth + "/" + nowDay + " " + endHour + ":00:00";
        }
        if (x>=9&&x<=11) {self.ifLimit=1;}
        if (x>=13&&x<=14) {self.ifLimit=1;}
        if (x>=20&&x<=21) {self.ifLimit=1;}    
        self.nowHour = nowHour;
        self.endTime = endTime;
        var $contain_1 = $("#TTS-group");
        var tmpl = templates["bijia/taobao.groupbuy"];
        $contain_1.append(tmpl);
        self.countDown();
        self.getJson();               //调用getJson
      });
    },

    getJson:function(){
      var self = this;
      var dataArr,
      allData = [];
      $.ajax({
        // url: '//199.155.122.216:7280/getSeckillProductPluginList.do?time=' + self.serTime + '&cType=4',
        url: '//cmsproxy.taotaosou.com/getSeckillProductPluginList.do?time=' + self.serTime + '&cType=4',
        cache: false,
        dataType: "jsonp",
        jsonp: "callback"
      })
      .done(function(data) {
        dataArr = data;
        var x = self.nowHour;
        var day1,day3,day2,hour1,hour2,hour3;
      if(x>=10&&x<=13){
        day1 = 0;
        hour1 = 10;
        day2 = 0;
        hour2 = 14;
        day3 = 0;
        hour3 = 21;
      } else if(x>=14&&x<=20){
        day1 = 0;
        hour1 = 14;
        day2 = 0;
        hour2 = 21;
        day3 = 1;
        hour3 = 10;
      } else if(x>=21&&x<=23){
        day1 = 0;
        hour1 = 21;
        day2 = 1;
        hour2 = 10;
        day3 = 1;
        hour3 = 14;
      } else if (x>=0&&x<=9) {
        day1 = 0;
        hour1 = 10;
        day2 = 0;
        hour2 = 14;
        day3 = 0;
        hour3 = 21;
      }
				//TODO 给dataArr传入day,hour
					dataArr.day1 = day1;
					dataArr.hour1 = hour1;
          dataArr.day2 = day2;
          dataArr.hour2 = hour2;
          dataArr.day3 = day3;
          dataArr.hour3 = hour3;
        // var $container = $("#TTS-group");
        var tmpls = templates["bijia/taobao.groupbuy.data"];
        // $container.append(tmpl(dataArr));
        $(tmpls(dataArr)).insertAfter('#KKT-tab');
        tts_stat.trackEvent("Bottomtab_seckill_pv");
        //第一次展现
        $('#KKT-tab-li-1').addClass('tabHover');
        self.ifFirstShow();             //判断是否在场次时间内。
        self.choseStatus();             //status判断
        self.turnTabs();
        // self.countDown();
        self.switchModule();
        self.showLimit();
      });
    },

    ifFirstShow:function(){
      var self = this,
          time = "",
          pValue,
          t = self.nowHour;
      if (t===11||t===14||t===21) {
        $.ajax({
          url: '//control.taotaosou.com/cookie/read.do?key=KKT',
          cache: false,
          dataType: 'jsonp',
          jsonp: 'callback'
        })
        .done(function(data) {
          if (data==="null") {
            pValue = 1;
            time = "&time=3600";
          } else if(data>=1&&data<=4){
            var x = Number(data);
            pValue= x+1;
          }

          if(pValue<=4 && pValue>=1){
            $.ajax({
              url: '//control.taotaosou.com/cookie/write.do?key=KKT&value=' + pValue + time,
              cache: false,
              dataType: 'jsonp',
              jsonp: 'callback'
            })
            .done(function() {
              $("#KKT-tuangou-frame").css({
                display: 'block',
                opacity: '1'
              });   
              tts_stat.trackEvent("Bottomtab_seckill_P_pv");        //面板展现，自动
              tts_stat.trackEvent("Bottomtab_seckill_menu_pv");    //商品展现，自动
            });
          }else{
            $("#KKT-nomore").css('display', 'block').animate({top: "-25px", opacity: "1"}, 500); 
          }
        });
      } else{
        $("#KKT-nomore").css('display', 'block').animate({top: "-25px", opacity: "1"}, 500);   
      }
      //这里是在AJAX前面运行的。
    },

    countDown:function($timer){  
      var self = this;
      $timer = $("#KKT-tuangou-countdown");
      $timer.countdown('',self.endTime,self.serTime).on('update.countdown',function (event) {
        $timer.html(event.strftime('<span>%d</span>天<span>%H</span>小时<span>%M</span>分<span>%S</span>秒后开始'));
      }).on('upUpdate.countdown',function (event) {
        $timer.html(event.strftime('距离本场结束<span>%H</span>小时<span>%M</span>分<span>%S</span>秒'));
      }).on('upfinish.countdown', function (event) {
        $timer.html(event.strftime('活动结束'));
      });        
    },

    turnTabs:function(){
      $("#KKT-tab").on('mouseenter', ('#KKT-tab-li-1'),function() {
        tts_stat.trackEvent("Bottomtab_seckill_menu_pv");    //商品展现，切换tab
        $(".KKT-tab-li").removeClass('tabHover');
        $('#KKT-tab-li-1').addClass('tabHover');
        $(".KKT-content").hide();
        $('#KKT-content-1').show();
      });
      $("#KKT-tab").on('mouseenter', ('#KKT-tab-li-2'),function() {
        tts_stat.trackEvent("Bottomtab_seckill_menu_pv");    //商品展现，切换tab
        $(".KKT-tab-li").removeClass('tabHover');
        $('#KKT-tab-li-2').addClass('tabHover');
        $(".KKT-content").hide();
        $('#KKT-content-2').show();        
      });
      $("#KKT-tab").on('mouseenter', ('#KKT-tab-li-3'),function() {
        tts_stat.trackEvent("Bottomtab_seckill_menu_pv");    //商品展现，切换tab
        $(".KKT-tab-li").removeClass('tabHover');
        $('#KKT-tab-li-3').addClass('tabHover');
        $(".KKT-content").hide();
        $('#KKT-content-3').show();        
      });      
    },

    showLimit:function(){
      var self = this;
      if (self.ifLimit&&self.onTurn&&self.firstShow) {
        $("#KKT-nomore").show().animate({top: "-25px", opacity: "1"}, 800);
      }
    },

    choseStatus:function(){
      var self = this;
      var status,
          x = self.nowHour;
      if(x>=10&&x<=13){
        $("#KKT-tab-li-1").html("今日10点场");
        $("#KKT-tab-li-2").html("今日14点场");
        $("#KKT-tab-li-3").html("今日21点场");
        $("#KKT-tuangou-title").html("10点秒杀开始咯！");
        $("#KKT-tuan-time").html("10点");
      } else if(x>=14&&x<=20){
          $("#KKT-tab-li-1").html("今日14点场");
          $("#KKT-tab-li-2").html("今日21点场");
          $("#KKT-tab-li-3").html("明日10点场"); 
          $("#KKT-tuangou-title").html("14点秒杀开始咯！");
          $("#KKT-tuan-time").html("14点");
      } else if(x>=21&&x<=23){
          $("#KKT-tab-li-1").html("今日21点场");
          $("#KKT-tab-li-2").html("明日10点场");
          $("#KKT-tab-li-3").html("明日14点场"); 
          $("#KKT-tuangou-title").html("21点秒杀开始咯！");
          $("#KKT-tuan-time").html("21点");
      } else if (x>=0&&x<=9) {
          $("#KKT-tab-li-1").html("昨日21点场");
          $("#KKT-tab-li-2").html("今日10点场");
          $("#KKT-tab-li-3").html("今日14点场"); 
          $("#KKT-tuangou-title").html("10点秒杀马上开始！");
          $("#KKT-tuan-time").html("10点");
      }
    }
  };
});

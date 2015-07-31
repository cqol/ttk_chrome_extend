__tk__define(function (require, exports, module) {
  var $ = require("../../lib/jquery"),
    _ = require("../../lib/underscore"),
    Handlebars = require("../../mustache_helpers"),
    utils = require("../../utils"),
    templates = require("../../templates.jst"),
    tts_stat = require("../../utils/tts_stat"),
    bijiaView = require("./taobao");

  module.exports = {
    init: function () {
      this.attachModelEvent();
      this.attachViewEvent();
    },

    $el: null,

    template: templates["bijia/taobao.cps"],

    modelDeferred: new $.Deferred(),

    // 关联model事件
    attachModelEvent: function() {
      var self = this;

      $("body").on({
        // model获取成功
        "cps.sync.success": function(e, data) {
          self.modelDeferred.resolve(data);
        },
        // view展示
        "tts.bijia.cps.render": function(e, data) {
          self.renderView(data);
        }
      });

      $.when(this.modelDeferred.promise(), bijiaView.viewDeferred.promise()).then(function(data) {
        self.initModel(data);
      });
    },

    // 关联view事件
    attachViewEvent: function() {
      var self = this;

      // cps广告list商品弹出浮层
      $("body").on("mouseenter", ".TTS-list-right-wrap li", function() {
        var context = self.model[$(this).index()],
          tmpl = templates["bijia/taobao.cps.pop"];

        tts_stat.trackEvent("Bottomtab_allsee_magnify_PV");
        bijiaView.focusProduct($(this));
        bijiaView.showPopDialog($(this), tmpl, context);
      }).on("mouseleave", ".TTS-list-right-wrap li", function() {
        bijiaView.blurProduct($(this));
        bijiaView.hidePopDialog($(this));
      });
    },

    // 初始化model
    initModel: function(data) {
      this.model = data;
      $("body").trigger("tts.bijia.cps.render", [this.model]);
    },

    // 初始化view
    renderView: function(data) {
      if (data.length) {
        bijiaView.$el.find(".TTS-list-right").append(this.template({list: data}));
        tts_stat.trackEvent("Bottomtab_allsee_PV");
      }

      if (!bijiaView.model.isShowRemind && !bijiaView.model.isShowQutu &&
        !bijiaView.model.sameList.length && !bijiaView.model.similarList.length) {
        // 底通栏无内容时，收起底通栏
        if (!data.length) {
          bijiaView.$el.find(".TTS-bijia-min-btn").trigger("click");
        // 底通栏只有cps list时，靠左对齐
        } else {
          bijiaView.$el.find(".TTS-list-right-wrap").addClass("TTS-list-right-left");
          // 禁用响应式
          $("body").attr("id", "tts-res-disable");
        }
      }
    }
  };
});

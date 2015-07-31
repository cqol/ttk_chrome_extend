__tk__define(function (require, exports, module) {
  var $ = require("../../lib/jquery.countdown"),
    utils = require("../../utils"),
    templates = require("../../templates.jst"),
    tts_stat = require("../../utils/tts_stat"),
    model = require("../../models/models");

  module.exports = {
    init: function (obj, list) {
      // 获取团购list model
      //model.tuan.init();
			// 依赖的 模块
			this.parentView = obj;
			this.attachModelEvent();
			this.attachViewEvent();
			this.list = false;

			if (list) {
				this.list = true;
			}

    },

    $el: null,

    template: templates["bijia/taobao.tuan"],

    modelDeferred: new $.Deferred(),

    // 关联model事件
    attachModelEvent: function() {
      var self = this;

      $("body").on({
        // model获取成功
        "tuan.sync.success": function(e, data) {
          self.modelDeferred.resolve(data);
        },
        // view展示
        "tts.bijia.tuan.render": function(e, data) {
          self.renderView(data);
        }
      });
      $.when(this.modelDeferred.promise(), self.parentView.viewDeferred.promise()).then(function(data) {
        self.initModel(data);
      });
    },

    // 关联view事件
    attachViewEvent: function() {
      var self = this;

      // 更多团购按钮点击
      $("body").one("click", ".bijia-more-tuan-unclicked", function() {
        $(this).removeClass("bijia-more-tuan-unclicked").addClass("bijia-more-tuan-clicked");
      });

      // 弹出浮层
      $("body").on("mouseenter", ".TTS-list-right-wrap li", function() {
        var context = self.model[$(this).index()],
          tmpl = templates["bijia/taobao.tuan.pop"];

        tts_stat.trackEvent("Bottomtab_tuan_magnify_PV");
        tts_stat.trackLog("Bottomtab_tuan_magnify_PV");
        self.parentView.focusProduct($(this));
        self.parentView.showPopDialog($(this), tmpl, context);
        self.parentView.countdown($(".TTS-bijia-pop").find(".TTS-product-countdown"));
      }).on("mouseleave", ".TTS-list-right-wrap li", function() {
        self.parentView.blurProduct($(this));
        self.parentView.hidePopDialog($(this));
      });
    },

    // 初始化model
    initModel: function(data) {
      this.model = data.recomList;
      $("body").trigger("tts.bijia.tuan.render", [data]);
    },

    // 初始化view
    renderView: function(data) {
			var self = this;
      if (data.recomList.length) {
        self.parentView.$el.find(".TTS-list-right").append(this.template({list: data.recomList, more: data.more}));
        tts_stat.trackEvent("Bottomtab_tuan_PV");
      }

			if (!this.list) {
				if (!self.parentView.model.isShowRemind && !self.parentView.model.isShowQutu &&
					!self.parentView.model.sameList.length && !self.parentView.model.similarList.length) {
					// 底通栏无内容时，收起底通栏
					if (!data.recomList.length) {
						self.parentView.$el.find(".TTS-bijia-min-btn").trigger("click");
						// 底通栏只有cps list时，靠左对齐
					} else {
						self.parentView.$el.find(".TTS-list-right-wrap").addClass("TTS-list-right-left");
						// 禁用响应式
						$("body").attr("id", "tts-res-disable");
					}
				}
			}
    }
  };
});

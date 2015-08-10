__tk__define(function (require, exports, module) {
	var $ = require("../../lib/jquery"),
		_ = require("../../lib/underscore"),
		utils = require("../../utils"),
		templates = require("../../templates.jst"),
		tts_stat = require("../../utils/tts_stat"),
		model = require("../../models/models");

	var $body = $("body");

	require("../../mustache_helpers");
	module.exports = {
		init: function () {
			tts_stat.init();
			tts_stat.trackEvent("Bottomtab_PV");
			this.attachModelEvent();
			this.attachViewEvent();

			//require("./taobao.tuan").init(this);
			// 获取同款/推荐list model
			model.fetch();
		},

		$el: null,

		template: templates["juzi/juzi"],

		viewDeferred: new $.Deferred(),

		remindViewDeferred: new $.Deferred(),

		qutuViewDeferred: new $.Deferred(),

		// 关联model事件
		attachModelEvent: function() {
			var self = this;

			$body.on({
				// 比价接口
				"tk.sync.success": function (e, data) {
					self.initModel(data);
				},
				// 同款商品促销价接口
				"tk.sync.promoprice": function (e, data) {
					self.updateModel(data);
				},
				// 同款/推荐list展示
				"tts.bijia.same.render": function(e, data) {
					self.renderView(data);
				},
				// 促销价取到时更新同款list
				"tts.bijia.same.update": function(e, data) {
					self.renderSameView(data, true);
				}
			});
		},

		// 关联view事件
		attachViewEvent: function() {
			var self = this;

			var juziLogo = $(".TTS-juzi-logo");
			// 比价框展开收起按钮
			$body.on("click", ".TTS-bijia-min-btn", function() {
				if ($(this).hasClass("juzi-fold")) {
					tts_stat.trackEvent("Bottomtab_shorten_click");
				} else {
					tts_stat.trackEvent("Bottomtab_stretch_click");
				}
				$(this).toggleClass("juzi-fold juzi-unfold");
				self.$el.toggleClass("juzi-min", $(this).hasClass("juzi-unfold"));
				self.$el.find(".TTS_logo_juzi").toggleClass("juzi-unlogo", $(this).hasClass("juzi-unfold"));
			});

			// 更多同款按钮点击
			/*$body.one("click", ".TTS-bijia-more-btn", function() {
				if ($(this).hasClass("juzi-more-same-unclicked")) {
					$(this).removeClass("juzi-more-same-unclicked").addClass("juzi-more-same-clicked");
				} else {
					$(this).removeClass("juzi-more-recom-unclicked").addClass("juzi-more-recom-clicked");
				}
			});*/

			// 同款/推荐list商品弹出浮层
			$body.on("mouseenter", ".TTS-list-left-wrap li", function() {
				var listModel, context,
					tmpl = templates["bijia/taobao.same.pop"];

				if (self.model.sameList.length) {
					listModel = self.model.sameList;
					context = listModel[$(this).index()];
					context.isSameList = true;
					tts_stat.trackEvent("Bottomtab_group_magnify_PV");
					tts_stat.trackLog("Bottomtab_group_magnify_PV");
				} else {
					listModel = self.model.similarList;
					context = listModel[$(this).index()];
					tts_stat.trackEvent("Bottomtab_recom_magnify_PV");
					tts_stat.trackLog("Bottomtab_recom_magnify_PV");
				}

				self.focusProduct($(this));
				self.showPopDialog($(this), tmpl, context);
			}).on("mouseleave", ".TTS-list-left-wrap li", function() {
				self.blurProduct($(this));
				self.hidePopDialog($(this));
			});
		},

		// 初始化model
		initModel: function(data) {
			this.model = data;
			$body.trigger("tts.bijia.same.render", [this.model]);
		},

		// 更新model
		updateModel: function(data) {
			this.model = data;
			$body.trigger("tts.bijia.same.update", [this.model]);
		},

		// 初始化view
		renderView: function(data) {
			/*isWebkit = false,
			 self = this,*/
			var config = utils.getConfig();

			/*try {
			 isWebkit = "WebkitAppearance" in document.documentElement.style;
			 } catch(e) {}*/

			//无数据！
			if (!data.sameList.length && !data.similarList.length) {
				return false;
			}
			this.$el = $(this.template(data)).appendTo("body");
			this.viewDeferred.resolve();

			if (data.ttsid) {
				try {
					document.createElement('canvas').getContext('2d');
					require("./taobao.qutu").init();

					//插入广告的位置提醒
					require("./mid").init(data.ttsid);

					if (config.taobao.model.qutu) {
						data.isShowQutu = true;
						this.qutuViewDeferred.resolve(data.ttsid);
					}
				} catch(e) {}

			}
			this.renderSameView(data);
			this.emuResponsive(data);
		},

		// 初始化、刷新同款/推荐list view
		renderSameView: function(data, isUpdate) {
			var context,
				self = this,
				sameListTmpl = templates["bijia/taobao.same"];

			if (data.sameList.length || data.similarList.length) {
				if (data.sameList.length) {
					// 防止重复记PV, 取促销价接口刷新view时不记PV
					if (!isUpdate) {
						tts_stat.trackEvent("Bottomtab_group_PV");
						//require("./taobao.groupbuy").init();
					}
					$.each(data.sameList, function (i, item) {
						if (item.isMin) {
							$body.trigger("tts.bijia.min.product", [item]);
						}
					});
					context = {list: data.sameList, isSameList: true};
				} else if (data.similarList.length) {
					// 防止重复记PV, 取促销价接口刷新view时不记PV
					if (!isUpdate) {
						tts_stat.trackEvent("Bottomtab_recom_PV");
						//require("./taobao.groupbuy").init();
					}
					context = {list: data.similarList};
				}
				this.$el.find(".TTS-list-left").empty().append(sameListTmpl(context));
			}
			// 聚焦最低价商品，4S后失去焦点
			if (this.$el.find(".TTS-list-lowestPrice").length) {
				// 防止重复记PV, 只取促销价接口返回的最低价
				if (isUpdate) {
					tts_stat.trackEvent("Bottomtab_lowesttag_PV");
				}
				setTimeout(function() {
					var $minPriceProduct = self.$el.find(".TTS-list-lowestPrice");
					$minPriceProduct.trigger("mouseenter");
					setTimeout(function() {
						$minPriceProduct.trigger("mouseleave");
					}, 4000);
				}, 0);
			}
		},

		// 响应式模拟
		emuResponsive: function(data) {
			var resList = [334, 589, 934, 1254, 1553, 999999];

			if (!data.isShowRemind && !data.isShowQutu) {
				resList = _.map(resList, function(item) {return item - 160;});
			} else if (!data.isShowRemind || !data.isShowQutu) {
				resList = _.map(resList, function(item) {return item - 80;});
			}
			resList = _.zip(_.initial(resList), _.rest(resList));

			$(window).on("resize.tts", function() {
				var winWidth = $(window).width(),
					classList = ["tts-res-l0", "tts-res-l1", "tts-res-l2", "tts-res-l3", "tts-res-l4"];

				$body.removeClass(classList.join(" "));
				_.some(resList, function(item, index) {
					if (winWidth >= item[0] && winWidth < item[1]) {
						$body.addClass(classList[index]);
						return true;
					}
				});
			}).trigger("resize.tts");
		},

		// 显示商品dialog
		showPopDialog: function($product, template, context) {
			if ($product.find(".TTS-bijia-pop").length) {
				$product.find(".TTS-bijia-pop").show();
			} else {
				this.$el.find(".TTS-bijia-pop").remove();
				$product.append(template(context));
			}
		},

		// 隐藏商品dialog
		hidePopDialog: function($product) {
			$product.find(".TTS-bijia-pop").hide();
		},

		// list商品聚焦
		focusProduct: function($product) {
			$product.find(".TTS-list-product-detail").addClass("highlight");
		},

		// list商品失去焦点
		blurProduct: function($product) {
			$product.find(".TTS-list-product-detail").removeClass("highlight");
		},

		// 显示倒计时
		countdown: function($timer) {
			var timeDate = $timer.data();

			$timer.countdown(timeDate.start, timeDate.end).on('update.countdown',function (event) {
				$timer.html(event.strftime('<span>%d</span>天<span>%H</span>小时<span>%M</span>分<span>%S</span>秒后开始'));
			}).on('upUpdate.countdown',function (event) {
				$timer.html(event.strftime('仅剩%D天%H小时%M分%S.%c秒'));
			}).on('upfinish.countdown', function (event) {
				$timer.html(event.strftime('活动结束'));
			});
		}
	};
});

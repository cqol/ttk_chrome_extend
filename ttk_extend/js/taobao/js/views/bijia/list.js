__tk__define(function (require, exports, module) {
	var $ = require("../../lib/jquery"),
		_ = require("../../lib/underscore"),
		utils = require("../../utils"),
		host = require("../../host"),
		templates = require("../../templates.jst"),
		tts_stat = require("../../utils/tts_stat"),
		ditong = require("../../models/ditong"),
		model = require("../../models/models");

	require("../../mustache_helpers");
	module.exports = {
		init: function () {
			tts_stat.init();
			tts_stat.trackEvent("Bottomtab_PV");
			this.attachModelEvent();
			this.attachViewEvent();

			if (host.isHomeJD || host.isHomeTmall || host.isHomeTaobao ||
				host.isHomeMGJ || host.isHomeMLS || host.isHomeVIP) {
				this.laiyuan = 'Rerecom';
			} else {
				this.laiyuan = 'tsearch';
			}

			//require("./taobao.tuan").init(this, 'list');
			// 获取同款/推荐list model
			model.reCom();
		},

		$el: null,

		template: templates["bijia/home.list"],

		viewDeferred: new $.Deferred(),

		remindViewDeferred: new $.Deferred(),

		qutuViewDeferred: new $.Deferred(),

		// 关联model事件
		attachModelEvent: function () {
			var self = this;

			$("body").on({
				// 比价接口
				"tk.recom.success": function (e, data) {
					self.initModel(data);
				},
				// 同款商品促销价接口
				"tk.recom.promoprice": function (e, data) {
					self.updateModel(data);
				},
				// 同款/推荐list展示
				"tts.bijia.like.render": function (e, data) {
					self.renderView(data);
				},
				// 促销价取到时更新同款list
				"tts.bijia.like.update": function (e, data) {
					self.renderSameView(data, true);
				},
				"ditong.sync.success": function (e, data) {
					self.ditongRender(data);
				}
			});
		},

		getBanner: function () {
			var self = this;

			/*$.getJSON('http://show.kc.taotaosou.com/tumeiti.do?adType=0,0,1,0&keyword=0,0,0,0&adSize=0,0,150*70,0&itemSize=0,0,2,0&tbId=&pid=382&jsonp=?', function (data) {
			 if (!data || !data.pinpai[0]) {
			 return false;
			 }
			 tts_stat.trackEvent("Bottomtab_brandpop_PV");

			 self.renderBanner(data.pinpai);
			 });*/
			self.renderBanner();
		},
		renderBanner: function (data) {
			//var tpl = templates["bijia/banner"];
			//var tpl = '<iframe frameborder="0" marginheight="0" marginwidth="0" border="0" scrolling="no" width="260" height="70" src="http://show.kc.taotaosou.com/brand.do?brandKeyword=&keyword=&brandItemSize=2&keywordType=true&source=382&brandRandom=100&adType=2&itemSize=1&height=70&width=260"></iframe>';
			//this.$el.find(".TTS-banner-wrap").empty().append(tpl({list: data}));
			//this.$el.find(".TTS-banner-wrap").empty().append(tpl);
			/*$("body").one("click", ".TTS-banner-alink", function() {
			 tts_stat.trackEvent("Bottomtab_brandpop_click");
			 });*/
			//require("./taobao.groupbuy").init();
			ditong.init();
		},

		ditongRender: function (data) {
			var ditongTpl = templates["bijia/taobao.ditong"];
			this.$el.find(".TTS-banner-wrap").empty().append(ditongTpl(data));
		},

		// 关联view事件
		attachViewEvent: function () {
			var self = this;

			// 比价框展开收起按钮
			$("body").on("click", ".TTS-bijia-min-btn", function () {
				if ($(this).hasClass("bijia-fold")) {
					tts_stat.trackEvent("Bottomtab_shorten_click");
				} else {
					tts_stat.trackEvent("Bottomtab_stretch_click");
				}
				$(this).toggleClass("bijia-fold bijia-unfold");
				self.$el.toggleClass("bijia-min", $(this).hasClass("bijia-unfold"));
				self.$el.find(".TTS_logo_bijia").toggleClass("bijia-unlogo", $(this).hasClass("bijia-unfold"));
			});

			// 更多同款按钮点击
			$("body").one("click", ".TTS-bijia-more-btn", function () {
				if ($(this).hasClass("bijia-more-like-unclicked")) {
					$(this).removeClass("bijia-more-like-unclicked").addClass("bijia-more-like-clicked");
				}
			});


			// 同款/推荐list商品弹出浮层
			$("body").on("mouseenter", ".TTS-list-left-wrap li", function () {
				var listModel, context,
					tmpl = templates["bijia/home.list.pop"];

				if (self.model.proList.length) {
					listModel = self.model.proList;
					context = listModel[$(this).index()];
					//泡泡出来的自己广告大小不变
					if (/^(https||http):\/\/.*\.(taotaosou||tbcdn||alicdn||taobaocdn)\.(cn||com)\/.*$/.test(context.picUrl)) {
						context.picUrl = context.picUrl.replace(/_70x70\.jpg$/, '');
					}
					context.isProList = self.laiyuan;
					tts_stat.trackEvent("Bottomtab_" + self.laiyuan + "_magnify_PV");
					tts_stat.trackLog("Bottomtab_" + self.laiyuan + "_magnify_PV");
				}

				self.focusProduct($(this));
				self.showPopDialog($(this), tmpl, context);
			}).on("mouseleave", ".TTS-list-left-wrap li", function () {
				self.blurProduct($(this));
				self.hidePopDialog($(this));
			});
		},

		// 初始化model
		initModel: function (data) {
			this.model = data;
			$("body").trigger("tts.bijia.like.render", [this.model]);
		},

		// 更新model
		updateModel: function (data) {
			this.model = data;
			$("body").trigger("tts.bijia.like.update", [this.model]);
		},

		// 初始化view
		renderView: function (data) {
			this.$el = $(this.template(data)).appendTo("body");
			//this.viewDeferred.resolve();

			this.renderSameView(data);
			this.emuResponsive(data);
			this.getBanner();
		},

		// 初始化、刷新同款/推荐list view
		renderSameView: function (data, isUpdate) {
			var context,
				self = this,
				proListTmpl = templates["bijia/home.list.item"];

			if (data.proList.length) {
				if (data.proList.length) {
					// 防止重复记PV, 取促销价接口刷新view时不记PV
					if (!isUpdate) {
						tts_stat.trackEvent("Bottomtab_" + self.laiyuan + "_PV");
						tts_stat.trackLog("Bottomtab_" + self.laiyuan + "_PV");
					}
					//检测图片地址是否是taotaosou.com域名，如果是，则在图片地址后加上_70x70.jpg得到小图
					$.each(data.proList, function (i, item) {
						if (/^(https||http):\/\/.*\.(taotaosou||tbcdn||alicdn||taobaocdn)\.(cn||com)\/.*$/.test(item.picUrl)) {
							item.picUrl += '_70x70.jpg';
						}
					});
					context = {list: data.proList, isProList: self.laiyuan, laiyuan: self.laiyuan};
				}
				this.$el.find(".TTS-list-left").empty().append(proListTmpl(context));
			}
			// 聚焦最低价商品，4S后失去焦点
			if (this.$el.find(".TTS-list-lowestPrice").length) {
				// 防止重复记PV, 只取促销价接口返回的最低价
				if (isUpdate) {
					tts_stat.trackEvent("Bottomtab_lowesttag_PV");
					tts_stat.trackLog("Bottomtab_lowesttag_PV");
				}
				setTimeout(function () {
					var $minPriceProduct = self.$el.find(".TTS-list-lowestPrice");
					$minPriceProduct.trigger("mouseenter");
					setTimeout(function () {
						$minPriceProduct.trigger("mouseleave");
					}, 4000);
				}, 0);
			}
		},

		// 响应式模拟
		emuResponsive: function () {
			var resList = [589, 934, 1366, 1920, 999999];

			resList = _.map(resList, function (item) {
				return item - 80;
			});

			resList = _.zip(_.initial(resList), _.rest(resList));

			$(window).on("resize.tts", function () {
				var winWidth = $(window).width(),
					classList = ["tts-res-l1", "tts-res-l2", "tts-res-l3", "tts-res-l4"];

				$("body").removeClass(classList.join(" "));
				_.some(resList, function (item, index) {
					if (winWidth >= item[0] && winWidth < item[1]) {
						$("body").addClass(classList[index]);
						return true;
					}
				});
			}).trigger("resize.tts");
		},

		// 显示商品dialog
		showPopDialog: function ($product, template, context) {
			if ($product.find(".TTS-bijia-pop").length) {
				$product.find(".TTS-bijia-pop").show();
			} else {
				this.$el.find(".TTS-bijia-pop").remove();
				$product.append(template(context));
			}
		},

		// 隐藏商品dialog
		hidePopDialog: function ($product) {
			$product.find(".TTS-bijia-pop").hide();
		},

		// list商品聚焦
		focusProduct: function ($product) {
			$product.find(".TTS-list-product-detail").addClass("highlight");
		},

		// list商品失去焦点
		blurProduct: function ($product) {
			$product.find(".TTS-list-product-detail").removeClass("highlight");
		},

		// 显示倒计时
		countdown: function ($timer) {
			var timeDate = $timer.data();

			$timer.countdown(timeDate.start, timeDate.end).on('update.countdown', function (event) {
				$timer.html(event.strftime('<span>%d</span>天<span>%H</span>小时<span>%M</span>分<span>%S</span>秒后开始'));
			}).on('upUpdate.countdown', function (event) {
				$timer.html(event.strftime('仅剩%D天%H小时%M分%S秒'));
			}).on('upfinish.countdown', function (event) {
				$timer.html(event.strftime('活动结束'));
			});
		}
	};
});

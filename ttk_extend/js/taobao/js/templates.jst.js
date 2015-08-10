__tk__define(function (require, exports, module) {var Handlebars = require('./lib/handlebars');

	this["JST"] = this["JST"] || {};

	this["JST"]["bijia/banner"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

		function program1(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n    <a target=\"_blank\" title=\"";
			if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "\" class=\"TTS-right TTS-banner-alink\" href=\"";
			if (stack1 = helpers.href) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.href; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "\">\n        <img src=\"";
			if (stack1 = helpers.media) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.media; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "\" width=\"150\" height=\"70\"/>\n    </a>\n    ";
			return buffer;
		}

		buffer += "<div class=\"TTS-banner\">\n    ";
		stack1 = helpers.each.call(depth0, depth0.list, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
		if(stack1 || stack1 === 0) { buffer += stack1; }
		buffer += "\n</div>";
		return buffer;
	});

	this["JST"]["bijia/home.list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

		function program1(depth0,data) {

			var buffer = "", stack1, stack2, options;
			buffer += "\n        ";
			options = {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data};
			stack2 = ((stack1 = helpers.lengthLt || depth0.lengthLt),stack1 ? stack1.call(depth0, depth0.sameList, 0, options) : helperMissing.call(depth0, "lengthLt", depth0.sameList, 0, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += "\n      ";
			return buffer;
		}
		function program2(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n          <a class=\"TTS-bijia-more-btn bijia-more-same-unclicked TTS-left\" href=";
			if (stack1 = helpers.more) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.more; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ " target=\"_blank\" data-tts-log=\"Bottomtab_group_more_click\"></a>\n        ";
			return buffer;
		}

		function program4(depth0,data) {

			var buffer = "", stack1, stack2, options;
			buffer += "\n          ";
			options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data};
			stack2 = ((stack1 = helpers.lengthLt || depth0.lengthLt),stack1 ? stack1.call(depth0, depth0.similarList, 0, options) : helperMissing.call(depth0, "lengthLt", depth0.similarList, 0, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += "\n        ";
			return buffer;
		}
		function program5(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n            <a class=\"TTS-bijia-more-btn bijia-more-recom-unclicked TTS-left\" href=";
			if (stack1 = helpers.more) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.more; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ " target=\"_blank\" data-tts-log=\"Bottomtab_recom_more_click\"></a>\n          ";
			return buffer;
		}

		function program7(depth0,data) {

			var buffer = "", stack1, stack2, options;
			buffer += "\n        ";
			options = {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data};
			stack2 = ((stack1 = helpers.lengthLt || depth0.lengthLt),stack1 ? stack1.call(depth0, depth0.proList, 0, options) : helperMissing.call(depth0, "lengthLt", depth0.proList, 0, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += "\n      ";
			return buffer;
		}
		function program8(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n              <a class=\"TTS-bijia-more-btn bijia-more-like-unclicked TTS-left\" href=";
			if (stack1 = helpers.list) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.list; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ " target=\"_blank\" data-tts-log=\"Bottomtab_tsearch_more_click\"></a>\n            ";
			return buffer;
		}

		buffer += "<div id=\"TTS_bijia_wrap\" class=\"TTS_bijia_wrap ";
		if (stack1 = helpers.host) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		else { stack1 = depth0.host; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		buffer += escapeExpression(stack1)
			+ "\">\n  <a class=\"TTS_logo_bijia bijia-logo TTS-left\" href=\"http://www.taotaosou.com/\" target=\"_blank\" data-tts-log=\"Bottomtab_logo_click\"></a>\n  <div class=\"TTS-products-wrap TTS-left\">\n    <div class=\"TTS-list-left-wrap TTS-left\">\n      <div class=\"TTS-list-left TTS-left\"></div>\n      ";
		stack1 = helpers['if'].call(depth0, depth0.more, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
		if(stack1 || stack1 === 0) { buffer += stack1; }
		buffer += "\n      <!--";
		stack1 = helpers['if'].call(depth0, depth0.list, {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
		if(stack1 || stack1 === 0) { buffer += stack1; }
		buffer += "-->\n    </div>\n    <!--<div id=\"TTS-group\">\n      <div id=\"KKT-nomore\">\n        <span>限量抢购</span>\n        <em id=\"KKT-arrow\" class=\"bijia-arrow-down\"></em>\n      </div>\n      <a target=\"_blank\" id=\"KKT-bottom-click\" href=\"http://www.chaoji99.com/#gouwu\" data-tts-log=\"_Bottomtab_seckill_click\">\n        <div id=\"KKT-open-tuangou\">\n          <div id=\"KKT-tuan-time\"></div>\n        </div>\n      </a>\n    </div>-->\n  </div>\n  <a class=\"TTS-bijia-min-btn bijia-fold TTS-right\"></a>\n  <div class=\"TTS-banner-wrap TTS-right\">\n  </div>\n  <div class=\"TTS-list-right-wrap TTS-tuan TTS-right\">\n    <div class=\"TTS-list-right TTS-tumeiti TTS-left\"></div>\n  </div>\n</div>";
		return buffer;
	});

	this["JST"]["bijia/home.list.item"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		var buffer = "", stack1, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

		function program1(depth0,data) {

			var buffer = "", stack1, stack2, options;
			buffer += "\n      <li class=\"";
			options = {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data};
			stack2 = ((stack1 = helpers.lt || depth0.lt),stack1 ? stack1.call(depth0, ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index), 7, options) : helperMissing.call(depth0, "lt", ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index), 7, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += " ";
			options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data};
			stack2 = ((stack1 = helpers.is || depth0.is),stack1 ? stack1.call(depth0, ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index), 7, options) : helperMissing.call(depth0, "is", ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index), 7, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			stack2 = helpers['if'].call(depth0, depth0.isMin, {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += "\">\n        <a class=\"TTS-list-product-img\" href=";
			if (stack2 = helpers.clickUrl) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.clickUrl; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ " target=\"_blank\">\n          <img class=\"tk\" src=";
			if (stack2 = helpers.picUrl) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.picUrl; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ ">\n        </a>\n        <p class=\"TTS-list-product-detail TTS-list-product-juxiao\">\n          <span class=\"src-price\"><em>&yen;</em>";
			if (stack2 = helpers.promoPrice) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.promoPrice; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ "</span>\n        </p>\n          ";
			stack2 = helpers['if'].call(depth0, depth0.isMin, {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += "\n      </li>\n    ";
			return buffer;
		}
		function program2(depth0,data) {


			return "TTS-list-left-head";
		}

		function program4(depth0,data) {


			return "TTS-list-left-tail";
		}

		function program6(depth0,data) {


			return "TTS-list-left-last";
		}

		function program8(depth0,data) {


			return "TTS-list-lowestPrice";
		}

		function program10(depth0,data) {


			return "\n            <div class=\"tip-lowestPrice\">\n              <span>最低价</span>\n              <em class=\"bijia-arrow-down\"></em>\n            </div>\n          ";
		}

		buffer += "<span class=\"bijia-like-title TTS-left\"></span>\n\n<ul class=\"TTS-left\" data-tts-log=\"Bottomtab_";
		if (stack1 = helpers.laiyuan) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		else { stack1 = depth0.laiyuan; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		buffer += escapeExpression(stack1)
			+ "_click\">\n    ";
		stack1 = helpers.each.call(depth0, depth0.list, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
		if(stack1 || stack1 === 0) { buffer += stack1; }
		buffer += "\n</ul>";
		return buffer;
	});

	this["JST"]["bijia/home.list.pop"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

		function program1(depth0,data) {


			return "\"Bottomtab_group_magnify_click\"";
		}

		function program3(depth0,data) {

			var buffer = "", stack1;
			buffer += " ";
			stack1 = helpers['if'].call(depth0, depth0.isProList, {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
			if(stack1 || stack1 === 0) { buffer += stack1; }
			return buffer;
		}
		function program4(depth0,data) {

			var buffer = "", stack1;
			buffer += "\"Bottomtab_";
			if (stack1 = helpers.isProList) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.isProList; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "_magnify_click\"";
			return buffer;
		}

		function program6(depth0,data) {


			return "\"Bottomtab_recom_magnify_click\"";
		}

		buffer += "<div class=\"TTS-bijia-pop TTS-bijia-juxiao-pop\" data-tts-log=";
		stack1 = helpers['if'].call(depth0, depth0.isSameList, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
		if(stack1 || stack1 === 0) { buffer += stack1; }
		buffer += ">\n<div class=\"TTS-product-img\">\n  <a href=";
		if (stack1 = helpers.clickUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		else { stack1 = depth0.clickUrl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		buffer += escapeExpression(stack1)
			+ " target=\"_blank\"><img class=\"tk\" src=";
		if (stack1 = helpers.picUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		else { stack1 = depth0.picUrl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		buffer += escapeExpression(stack1)
			+ "></a>\n</div>\n<div class=\"TTS-product-title\">\n  <a href=";
		if (stack1 = helpers.clickUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		else { stack1 = depth0.clickUrl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		buffer += escapeExpression(stack1)
			+ " target=\"_blank\">";
		if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		buffer += escapeExpression(stack1)
			+ "</a>\n</div>\n<p>\n  <span class=\"TTS-product-price\"><em>&yen;</em>";
		if (stack1 = helpers.promoPrice) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		else { stack1 = depth0.promoPrice; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		buffer += escapeExpression(stack1)
			+ "</span>\n</p>\n</div>";
		return buffer;
	});

	this["JST"]["bijia/juxiao"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

		function program1(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n    <li>\n      <a data-stat=\"";
			if (stack1 = helpers.stat) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.stat; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "\" class=\"TTS-list-product-img\"\n         href=\"";
			if (stack1 = helpers.clickUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.clickUrl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "\"\n         target=\"_blank\">\n        <img class=\"tk\"\n             src=\"";
			if (stack1 = helpers.picUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.picUrl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "\">\n      </a>\n      <p class=\"TTS-list-product-detail\">\n        <span class=\"src-price\"><em>¥</em>";
			if (stack1 = helpers.promoPrice) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.promoPrice; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "</span>\n      </p>\n    </li>\n    ";
			return buffer;
		}

		buffer += "<div class=\"TTK-juxiao-wrap\">\n  <ul>\n    ";
		stack1 = helpers.each.call(depth0, depth0.recomList, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
		if(stack1 || stack1 === 0) { buffer += stack1; }
		buffer += "\n  </ul>\n</div>";
		return buffer;
	});

	this["JST"]["bijia/sub.remind"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};



		return "<div class=\"cqol\" id=\"TTK-sub-wrap\">\n    <div class=\"TK-mind-sub\">\n        <div class=\"TK-mind-sub-nav\">\n            <div class=\"TK-mind-sub-remind\">\n                <i class=\"TK-mind-sub-star\"></i>\n            </div>\n            <div class=\"TK-mind-sub-qutu\">\n                <i class=\"TK-mind-sub-icon\"></i>\n                <span class=\"J-TK-mind-sub-icon-text\">价格曲线</span>\n            </div>\n            <div class=\"TK-mind-sub-under-warp J-TK-mind-sub-under-warp\">\n            </div>\n        </div>\n        <div class=\"TK-qutu-sub-warp\">\n            <i class=\"TK-qutu-sub-pointer\"></i>\n            <div class=\"TK-qutu-sub-con J-TK-qutu-sub-con\">\n                <div class=\"TK-qutu-sub-price\">\n\n                </div>\n                <div class=\"TK-qutu-sub-data\">\n\n                </div>\n                <canvas id=\"TK-canvas-sub-base\" class=\"TK-canvas-sub-base\" style=\"width: 440px; height: 250px;\" width=\"880\" height=\"500\"></canvas>\n                <canvas id=\"TK-canvas-sub-layout\" class=\"TK-canvas-sub-layout\" style=\"width: 440px; height: 250px;\" width=\"880\" height=\"500\"></canvas>\n                <div class=\"TK-qutu-sub-msg\">\n                    <div class=\"TK-qutu-sub-msg-wrap\">\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
	});

	this["JST"]["bijia/sub.remind.min"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		var buffer = "", stack1, stack2, options, self=this, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

		function program1(depth0,data) {

			var buffer = "";
			return buffer;
		}

		function program3(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n            ";
			stack1 = helpers['if'].call(depth0, depth0.shopType, {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
			if(stack1 || stack1 === 0) { buffer += stack1; }
			buffer += "\n        ";
			return buffer;
		}
		function program4(depth0,data) {


			return "\n                <span class=\"TTS-product-owner\">网站自营</span>\n            ";
		}

		function program6(depth0,data) {


			return "\n                <span class=\"TTS-product-owner\">第三方</span>\n            ";
		}

		function program8(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n            <span class=\"TTS-product-sales\">销量：";
			if (stack1 = helpers.sales) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.sales; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "</span>\n        ";
			return buffer;
		}

		function program10(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n            ";
			stack1 = helpers['if'].call(depth0, depth0.com, {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
			if(stack1 || stack1 === 0) { buffer += stack1; }
			buffer += "\n        ";
			return buffer;
		}
		function program11(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n                <span class=\"TTS-product-comment\">";
			if (stack1 = helpers.com) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.com; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "条评论</span>\n            ";
			return buffer;
		}

		buffer += "<a target=\"_blank\" href=\"";
		if (stack1 = helpers.clickUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		else { stack1 = depth0.clickUrl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		buffer += escapeExpression(stack1)
			+ "\" data-tts-log=\"tool_lowest_click\" class=\"TK-mind-sub-under\">\n    <span class=\"TK-mind-sub-under-text\">同款最低价</span>\n    <span class=\"TK-mind-sub-under-price J-TK-mind-sub-under-price\"><em>&yen</em>";
		if (stack1 = helpers.promoPrice) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		else { stack1 = depth0.promoPrice; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		buffer += escapeExpression(stack1)
			+ "</span>\n</a>\n<div class=\"TTS-bijia-pop TTS-bijia-same-pop J-TK-mind-sub-under-pop\">\n    <i class=\"TK-mind-sub-under-pointer\"></i>\n    <div class=\"TTS-product-img\">\n        <a href=\"";
		if (stack1 = helpers.clickUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		else { stack1 = depth0.clickUrl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		buffer += escapeExpression(stack1)
			+ "\" data-tts-log=\"tool_lowest_magnify_click\" target=\"_blank\">\n            <img class=\"tk\" src=\"";
		options = {hash:{},data:data};
		buffer += escapeExpression(((stack1 = helpers.imgCDN || depth0.imgCDN),stack1 ? stack1.call(depth0, 200, 200, depth0.picUrl, options) : helperMissing.call(depth0, "imgCDN", 200, 200, depth0.picUrl, options)))
			+ "\">\n        </a>\n    </div>\n    <div class=\"TTS-product-title\">\n        <a href=\"";
		if (stack2 = helpers.clickUrl) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
		else { stack2 = depth0.clickUrl; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
		buffer += escapeExpression(stack2)
			+ "\" data-tts-log=\"tool_lowest_magnify_click\" target=\"_blank\">";
		if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
		else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
		buffer += escapeExpression(stack2)
			+ "</a>\n    </div>\n    <p>\n        <span class=\"TTS-product-price\"><em>&yen</em>";
		if (stack2 = helpers.promoPrice) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
		else { stack2 = depth0.promoPrice; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
		buffer += escapeExpression(stack2)
			+ "</span>\n    </p>\n    <p class=\"TTS-product-source\">\n        <span class=\"src-";
		options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
		stack2 = ((stack1 = helpers.jdName || depth0.jdName),stack1 ? stack1.call(depth0, depth0.webSite, options) : helperMissing.call(depth0, "jdName", depth0.webSite, options));
		if(stack2 || stack2 === 0) { buffer += stack2; }
		buffer += " TTS-product-icon\" >";
		options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
		stack2 = ((stack1 = helpers.source || depth0.source),stack1 ? stack1.call(depth0, depth0.webSite, options) : helperMissing.call(depth0, "source", depth0.webSite, options));
		if(stack2 || stack2 === 0) { buffer += stack2; }
		buffer += "</span>\n        ";
		stack2 = helpers['if'].call(depth0, depth0.shopOwner, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
		if(stack2 || stack2 === 0) { buffer += stack2; }
		buffer += "\n\n        ";
		stack2 = helpers['if'].call(depth0, depth0.sales, {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
		if(stack2 || stack2 === 0) { buffer += stack2; }
		buffer += "\n    </p>\n</div>";
		return buffer;
	});

	this["JST"]["bijia/sub.remind.paopao"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

		function program1(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n                <h4 class=\"TK-paopao-h4\">设置降价提醒成功！</h4>\n                <div class=\"TK-paopao-price\">\n                    现价：<span><em>&yen</em>";
			if (stack1 = helpers.price) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.price; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "</span>\n                </div>\n                <p class=\"TK-paopao-msg\">一旦降价会在这里通知你哦~</p>\n            ";
			return buffer;
		}

		function program3(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n                <h4 class=\"TK-paopao-h4\">您关注的商品降价啦！</h4>\n                <div class=\"TK-paopao-price\">\n                    现价：<span><em>&yen</em>";
			if (stack1 = helpers.curprice) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.curprice; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "</span>\n                </div>\n                <div class=\"TK-paopao-del\">\n                    原价：<span><em>&yen</em>";
			if (stack1 = helpers.srcprice) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.srcprice; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "</span>\n                </div>\n                <p class=\"TK-paopao-msg\">更新于";
			if (stack1 = helpers.sendtime) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.sendtime; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "</p>\n            ";
			return buffer;
		}

		buffer += "<div class=\"TK-paopao-detail TK-jjtx\">\n    <div class=\"TK-paopao-hd\"><s class=\"bijia-paopao-log\"></s>\n\n        <h3 class=\"TK-paopao-title\">降价提醒</h3>\n        <span class=\"TK-paopao-close bijia-paopao-close\" title=\"关闭\"></span>\n    </div>\n    <div class=\"TK-paopao-bd\">\n        <div class=\"TK-paopao-img\">\n            <a class=\"TK-paopao-img-alink J-paopao-go\"\n               href=\"http://i.taotaosou.com/user?hash=priceremind/p/1#priceremind/p/1\"\n               target=\"_blank\">\n                <img src=\"";
		if (stack1 = helpers.img) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		else { stack1 = depth0.img; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		buffer += escapeExpression(stack1)
			+ "\">\n            </a>\n        </div>\n\n        <div class=\"TK-paopao-info\">\n            ";
		stack1 = helpers['if'].call(depth0, depth0.set, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
		if(stack1 || stack1 === 0) { buffer += stack1; }
		buffer += "\n            <a href=\"http://i.taotaosou.com/user?hash=priceremind/p/1#priceremind/p/1\"\n               target=\"_blank\" class=\"TK-paopao-go J-paopao-go\">查看更多</a>\n        </div>\n    </div>\n</div>";
		return buffer;
	});

	this["JST"]["bijia/taobao.cps"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		var buffer = "", stack1, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

		function program1(depth0,data) {

			var buffer = "", stack1, stack2, options;
			buffer += "\n    <li class=";
			options = {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data};
			stack2 = ((stack1 = helpers.lt || depth0.lt),stack1 ? stack1.call(depth0, ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index), 3, options) : helperMissing.call(depth0, "lt", ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index), 3, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += ">\n      <a class=\"TTS-list-product-img\" href=";
			if (stack2 = helpers.clickUrl) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.clickUrl; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ " target=\"_blank\">\n        <img src=";
			options = {hash:{},data:data};
			buffer += escapeExpression(((stack1 = helpers.imgCDN || depth0.imgCDN),stack1 ? stack1.call(depth0, 70, 70, depth0.picUrl, options) : helperMissing.call(depth0, "imgCDN", 70, 70, depth0.picUrl, options)))
				+ ">\n      </a>\n      <p class=\"TTS-list-product-detail\">\n        <span class=\"src-price\"><em>&yen;</em>";
			if (stack2 = helpers.price) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.price; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ "</span>\n      </p>\n    </li>\n  ";
			return buffer;
		}
		function program2(depth0,data) {


			return "\"TTS-list-right-head\"";
		}

		function program4(depth0,data) {


			return "\"TTS-list-right-tail\"";
		}

		buffer += "<div class=\"bijia-cps-title TTS-left\"></div>\n<ul class=\"TTS-left\" data-tts-log=\"Bottomtab_allsee_click\">\n  ";
		stack1 = helpers.each.call(depth0, depth0.list, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
		if(stack1 || stack1 === 0) { buffer += stack1; }
		buffer += "\n</ul>";
		return buffer;
	});

	this["JST"]["bijia/taobao.cps.pop"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

		function program1(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n      <span class=\"TTS-product-sales\">销量：";
			if (stack1 = helpers.sales) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.sales; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "</span>\n    ";
			return buffer;
		}

		function program3(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n      ";
			stack1 = helpers['if'].call(depth0, depth0.com, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
			if(stack1 || stack1 === 0) { buffer += stack1; }
			buffer += "\n    ";
			return buffer;
		}
		function program4(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n        <span class=\"TTS-product-comment\">";
			if (stack1 = helpers.com) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.com; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "条评论</span>\n      ";
			return buffer;
		}

		buffer += "<div class=\"TTS-bijia-pop\" data-tts-log=\"Bottomtab_allsee_magnify_click\">\n  <div class=\"TTS-product-img\">\n    <a href=";
		if (stack1 = helpers.clickUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		else { stack1 = depth0.clickUrl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		buffer += escapeExpression(stack1)
			+ " target=\"_blank\"><img src=";
		options = {hash:{},data:data};
		buffer += escapeExpression(((stack1 = helpers.imgCDN || depth0.imgCDN),stack1 ? stack1.call(depth0, 200, 200, depth0.picUrl, options) : helperMissing.call(depth0, "imgCDN", 200, 200, depth0.picUrl, options)))
			+ "></a>\n  </div>\n  <div class=\"TTS-product-title\">\n    <a href=";
		if (stack2 = helpers.clickUrl) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
		else { stack2 = depth0.clickUrl; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
		buffer += escapeExpression(stack2)
			+ " target=\"_blank\">";
		if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
		else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
		buffer += escapeExpression(stack2)
			+ "</a>\n  </div>\n  <p>\n    <span class=\"TTS-product-price\"><em>&yen;</em>";
		if (stack2 = helpers.price) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
		else { stack2 = depth0.price; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
		buffer += escapeExpression(stack2)
			+ "</span>\n    ";
		stack2 = helpers['if'].call(depth0, depth0.sales, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
		if(stack2 || stack2 === 0) { buffer += stack2; }
		buffer += "\n  </p>\n</div>";
		return buffer;
	});

	this["JST"]["bijia/taobao.ditong"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


		buffer += "<a class=\"dtAds\" target=\"_blank\" alt=\"";
		if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		buffer += escapeExpression(stack1)
			+ "\" href=\"http://search.taotaosou.com/transfer.htm?";
		if (stack1 = helpers.href) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		else { stack1 = depth0.href; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		buffer += escapeExpression(stack1)
			+ "\">\n  <img src=\"";
		if (stack1 = helpers.media) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		else { stack1 = depth0.media; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		buffer += escapeExpression(stack1)
			+ "\">\n</a>";
		return buffer;
	});

	this["JST"]["bijia/taobao.groupbuy.data"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

		function program1(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n          <div id=\"KKT-woyaopad\" class=\"KKT-content-text\">\n            <div class=\"KKT-content-left\">\n                ";
			stack1 = helpers['if'].call(depth0, depth0.isNine, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
			if(stack1 || stack1 === 0) { buffer += stack1; }
			buffer += "\n\n\n            </div>\n            <div class=\"KKT-content-right\">\n                ";
			stack1 = helpers['if'].call(depth0, depth0.isNine, {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
			if(stack1 || stack1 === 0) { buffer += stack1; }
			buffer += "\n\n\n              <div id=\"KKT-content-price-pad\" class=\"KKT-content-price\"><i>&yen;</i>";
			if (stack1 = helpers.seckillPriceStr) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.seckillPriceStr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "\n                <span><i>&yen;</i>";
			if (stack1 = helpers.priceStr) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.priceStr; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "</span></div>\n              <div class=\"KKT-content-buy\">\n                  ";
			stack1 = helpers['if'].call(depth0, depth0.isNine, {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
			if(stack1 || stack1 === 0) { buffer += stack1; }
			buffer += "\n\n                <p class=\"KKT-content-right-views\">";
			if (stack1 = helpers.views) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.views; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "人想抢</p>\n              </div>\n            </div>\n          </div>\n        ";
			return buffer;
		}
		function program2(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n                  <a data-tts-log=\"Bottomtab_seckill_P_click\" target=\"_blank\"\n                     href=\"http://www.chaoji99.com/?topIds=";
			if (stack1 = helpers.pid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "&utm_source=bottomtab_seckill&utm_medium=ttk#pro-list\"><img\n                      src=\"";
			if (stack1 = helpers.pimgUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.pimgUrl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "_110x70.jpg\"/></a>\n                <span class=\"KKT-content-left-tuijian\">\n                  推荐\n                </span>\n\n                ";
			return buffer;
		}

		function program4(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n                  <a data-tts-log=\"Bottomtab_seckill_P_click\" target=\"_blank\"\n                     href=\"http://www.chaoji99.com/?&utm_source=bottomtab_seckill&utm_medium=ttk#gouwu\"><img src=\"";
			if (stack1 = helpers.pimgUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.pimgUrl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "_110x70.jpg\"/></a>\n                ";
			return buffer;
		}

		function program6(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n                  <a data-tts-log=\"Bottomtab_seckill_P_click\" target=\"_blank\"\n                     href=\"http://www.chaoji99.com/?topIds=";
			if (stack1 = helpers.pid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "&utm_source=bottomtab_seckill&utm_medium=ttk#pro-list\"\n                     class=\"KKT-content-name\">";
			if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "</a>\n                ";
			return buffer;
		}

		function program8(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n                  <a data-tts-log=\"Bottomtab_seckill_P_click\" target=\"_blank\" href=\"http://www.chaoji99.com/&utm_source=bottomtab_seckill&utm_medium=ttk#gouwu\"\n                     class=\"KKT-content-name\">";
			if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "</a>\n                ";
			return buffer;
		}

		function program10(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n                    <a data-tts-log=\"Bottomtab_seckill_P_click\" target=\"_blank\"\n                       href=\"http://www.chaoji99.com/?topIds=";
			if (stack1 = helpers.pid) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.pid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "&utm_source=bottomtab_seckill&utm_medium=ttk#pro-list\"\n                       class=\"KKT-content-right-99\">超级九块九</a>\n                  ";
			return buffer;
		}

		function program12(depth0,data) {

			var buffer = "", stack1, stack2, options;
			buffer += "\n                      ";
			options = {hash:{},inverse:self.noop,fn:self.programWithDepth(13, program13, data, depth0),data:data};
			stack2 = ((stack1 = helpers.isnt || depth0.isnt),stack1 ? stack1.call(depth0, depth0.stock, 0, options) : helperMissing.call(depth0, "isnt", depth0.stock, 0, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += "\n                      ";
			options = {hash:{},inverse:self.noop,fn:self.programWithDepth(15, program15, data, depth0),data:data};
			stack2 = ((stack1 = helpers.is || depth0.is),stack1 ? stack1.call(depth0, depth0.stock, 0, options) : helperMissing.call(depth0, "is", depth0.stock, 0, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += "\n                  ";
			return buffer;
		}
		function program13(depth0,data,depth1) {

			var buffer = "", stack1, options;
			buffer += "<a data-tts-log=\"Bottomtab_seckill_P_click\" target=\"_blank\"\n                                          href=\"";
			options = {hash:{},data:data};
			buffer += escapeExpression(((stack1 = helpers.pingurl1 || depth1.pingurl1),stack1 ? stack1.call(depth0, depth1.day1, depth1.hour1, options) : helperMissing.call(depth0, "pingurl1", depth1.day1, depth1.hour1, options)))
				+ "\"\n                                          class=\"KKT-content-right-canbuy\"></a>";
			return buffer;
		}

		function program15(depth0,data,depth1) {

			var buffer = "", stack1, options;
			buffer += "<a data-tts-log=\"Bottomtab_seckill_P_click\" target=\"_blank\"\n                                        href=\"";
			options = {hash:{},data:data};
			buffer += escapeExpression(((stack1 = helpers.pingurl1 || depth1.pingurl1),stack1 ? stack1.call(depth0, depth1.day1, depth1.hour1, options) : helperMissing.call(depth0, "pingurl1", depth1.day1, depth1.hour1, options)))
				+ "\"\n                                        class=\"KKT-content-right-cantbuy\"></a>";
			return buffer;
		}

		function program17(depth0,data,depth1) {

			var buffer = "", stack1, stack2, options;
			buffer += "\n          <div id=\"KKT-woyaopad\" class=\"KKT-content-text\">\n            <div class=\"KKT-content-left\">\n              <a data-tts-log=\"Bottomtab_seckill_P_click\" target=\"_blank\"\n                 href=\"";
			options = {hash:{},data:data};
			buffer += escapeExpression(((stack1 = helpers.pingurl2 || depth1.pingurl2),stack1 ? stack1.call(depth0, depth1.day2, depth1.hour2, options) : helperMissing.call(depth0, "pingurl2", depth1.day2, depth1.hour2, options)))
				+ "\"><img src=\"";
			if (stack2 = helpers.pimgUrl) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.pimgUrl; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ "_110x70.jpg\"/></a>\n            </div>\n            <div class=\"KKT-content-right\">\n              <a data-tts-log=\"Bottomtab_seckill_P_click\" target=\"_blank\" href=\"";
			options = {hash:{},data:data};
			buffer += escapeExpression(((stack1 = helpers.pingurl2 || depth1.pingurl2),stack1 ? stack1.call(depth0, depth1.day2, depth1.hour2, options) : helperMissing.call(depth0, "pingurl2", depth1.day2, depth1.hour2, options)))
				+ "\"\n                 class=\"KKT-content-name\">";
			if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ "</a>\n\n              <div id=\"KKT-content-price-pad\" class=\"KKT-content-price\"><i>&yen;</i>";
			if (stack2 = helpers.seckillPriceStr) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.seckillPriceStr; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ "\n                <span><i>&yen;</i>";
			if (stack2 = helpers.priceStr) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.priceStr; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ "</span></div>\n              <div class=\"KKT-content-buy\">\n                <a data-tts-log=\"Bottomtab_seckill_P_click\" target=\"_blank\"\n                   href=\"";
			options = {hash:{},data:data};
			buffer += escapeExpression(((stack1 = helpers.pingurl2 || depth1.pingurl2),stack1 ? stack1.call(depth0, depth1.day2, depth1.hour2, options) : helperMissing.call(depth0, "pingurl2", depth1.day2, depth1.hour2, options)))
				+ "\" class=\"KKT-content-right-waitbuy\"></a>\n\n                <p class=\"KKT-content-right-views\">";
			if (stack2 = helpers.views) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.views; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ "人想抢</p>\n              </div>\n            </div>\n          </div>\n        ";
			return buffer;
		}

		function program19(depth0,data,depth1) {

			var buffer = "", stack1, stack2, options;
			buffer += "\n          <div id=\"KKT-woyaopad\" class=\"KKT-content-text\">\n            <div class=\"KKT-content-left\">\n              <a data-tts-log=\"Bottomtab_seckill_P_click\" target=\"_blank\"\n                 href=\"";
			options = {hash:{},data:data};
			buffer += escapeExpression(((stack1 = helpers.pingurl3 || depth1.pingurl3),stack1 ? stack1.call(depth0, depth1.day3, depth1.hour3, options) : helperMissing.call(depth0, "pingurl3", depth1.day3, depth1.hour3, options)))
				+ "\"><img src=\"";
			if (stack2 = helpers.pimgUrl) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.pimgUrl; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ "_110x70.jpg\"/></a>\n            </div>\n            <div class=\"KKT-content-right\">\n              <a data-tts-log=\"Bottomtab_seckill_P_click\" target=\"_blank\" href=\"";
			options = {hash:{},data:data};
			buffer += escapeExpression(((stack1 = helpers.pingurl3 || depth1.pingurl3),stack1 ? stack1.call(depth0, depth1.day3, depth1.hour3, options) : helperMissing.call(depth0, "pingurl3", depth1.day3, depth1.hour3, options)))
				+ "\"\n                 class=\"KKT-content-name\">";
			if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ "</a>\n\n              <div id=\"KKT-content-price-pad\" class=\"KKT-content-price\"><i>&yen;</i>";
			if (stack2 = helpers.seckillPriceStr) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.seckillPriceStr; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ "\n                <span><i>&yen;</i>";
			if (stack2 = helpers.priceStr) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.priceStr; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ "</span></div>\n              <div class=\"KKT-content-buy\">\n                <a data-tts-log=\"Bottomtab_seckill_P_click\" target=\"_blank\"\n                   href=\"";
			options = {hash:{},data:data};
			buffer += escapeExpression(((stack1 = helpers.pingurl3 || depth1.pingurl3),stack1 ? stack1.call(depth0, depth1.day3, depth1.hour3, options) : helperMissing.call(depth0, "pingurl3", depth1.day3, depth1.hour3, options)))
				+ "\" class=\"KKT-content-right-waitbuy\"></a>\n\n                <p class=\"KKT-content-right-views\">";
			if (stack2 = helpers.views) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.views; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ "人想抢</p>\n              </div>\n            </div>\n          </div>\n        ";
			return buffer;
		}

		buffer += "<div id=\"KKT-con-frame\">\n  <ul id=\"KKT-con\">\n    <li id=\"KKT-content-1\" class=\"KKT-content\">\n        ";
		stack2 = helpers.each.call(depth0, ((stack1 = ((stack1 = depth0.data),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.list), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
		if(stack2 || stack2 === 0) { buffer += stack2; }
		buffer += "\n    </li>\n    <li id=\"KKT-content-2\" class=\"KKT-content\">\n        ";
		stack2 = helpers.each.call(depth0, ((stack1 = ((stack1 = depth0.data),stack1 == null || stack1 === false ? stack1 : stack1[1])),stack1 == null || stack1 === false ? stack1 : stack1.list), {hash:{},inverse:self.noop,fn:self.programWithDepth(17, program17, data, depth0),data:data});
		if(stack2 || stack2 === 0) { buffer += stack2; }
		buffer += "\n    </li>\n    <li id=\"KKT-content-3\" class=\"KKT-content\">\n        ";
		stack2 = helpers.each.call(depth0, ((stack1 = ((stack1 = depth0.data),stack1 == null || stack1 === false ? stack1 : stack1[2])),stack1 == null || stack1 === false ? stack1 : stack1.list), {hash:{},inverse:self.noop,fn:self.programWithDepth(19, program19, data, depth0),data:data});
		if(stack2 || stack2 === 0) { buffer += stack2; }
		buffer += "\n    </li>\n  </ul>\n  <a target=\"_blank\" href=\"http://www.chaoji99.com/#gouwu\" id=\"KKT-more\"\n     data-tts-log=\"Bottomtab_seckill_more_click\">更多秒杀</a>\n</div>";
		return buffer;
	});

	this["JST"]["bijia/taobao.groupbuy"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};



		return "<div id=\"KKT-tuangou-frame\">\n  <div id=\"KKT-tuangou-title\"></div>\n  <div id=\"KKT-tuangou-close\"></div>\n  <div id=\"KKT-tuangou-countdown\"></div>\n  <div id=\"KKT-tab\">\n    <div class=\"KKT-tab-li\" id=\"KKT-tab-li-1\"></div>\n    <div class=\"KKT-tab-li\" id=\"KKT-tab-li-2\"></div>\n    <div class=\"KKT-tab-li\" id=\"KKT-tab-li-3\"></div>\n  </div>\n</div>";
	});

	this["JST"]["bijia/taobao"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

		function program1(depth0,data) {

			var buffer = "", stack1, stack2, options;
			buffer += "\n        ";
			options = {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data};
			stack2 = ((stack1 = helpers.lengthLt || depth0.lengthLt),stack1 ? stack1.call(depth0, depth0.sameList, 0, options) : helperMissing.call(depth0, "lengthLt", depth0.sameList, 0, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += "\n      ";
			return buffer;
		}
		function program2(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n          <a class=\"TTS-bijia-more-btn bijia-more-same-unclicked TTS-left\" href=";
			if (stack1 = helpers.more) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.more; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ " target=\"_blank\" data-tts-log=\"Bottomtab_group_more_click\"></a>\n        ";
			return buffer;
		}

		function program4(depth0,data) {

			var buffer = "", stack1, stack2, options;
			buffer += "\n          ";
			options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data};
			stack2 = ((stack1 = helpers.lengthLt || depth0.lengthLt),stack1 ? stack1.call(depth0, depth0.similarList, 0, options) : helperMissing.call(depth0, "lengthLt", depth0.similarList, 0, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += "\n        ";
			return buffer;
		}
		function program5(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n            <a class=\"TTS-bijia-more-btn bijia-more-recom-unclicked TTS-left\" href=";
			if (stack1 = helpers.more) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.more; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ " target=\"_blank\" data-tts-log=\"Bottomtab_recom_more_click\"></a>\n          ";
			return buffer;
		}

		function program7(depth0,data) {

			var buffer = "", stack1, stack2, options;
			buffer += "\n          ";
			options = {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data};
			stack2 = ((stack1 = helpers.lengthLt || depth0.lengthLt),stack1 ? stack1.call(depth0, depth0.proList, 0, options) : helperMissing.call(depth0, "lengthLt", depth0.proList, 0, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += "\n      ";
			return buffer;
		}
		function program8(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n              <a class=\"TTS-bijia-more-btn bijia-more-like-unclicked TTS-left\" href=";
			if (stack1 = helpers.list) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.list; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ " target=\"_blank\" data-tts-log=\"Bottomtab_tsearch_more_click\"></a>\n          ";
			return buffer;
		}

		buffer += "<div id=\"TTS_bijia_wrap\" class=\"TTS_bijia_wrap ";
		if (stack1 = helpers.host) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		else { stack1 = depth0.host; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		buffer += escapeExpression(stack1)
			+ "\">\n  <a class=\"TTS_logo_bijia bijia-logo TTS-left\" href=\"http://www.taotaosou.com/\" target=\"_blank\" data-tts-log=\"Bottomtab_logo_click\"></a>\n  <!--\n  <div class=\"TTS-remind-wrap TTS-left\"></div>\n  <div class=\"TTS-qutu-wrap TTS-left\"></div>\n  -->\n  <div class=\"TTS-products-wrap TTS-left\">\n    <div class=\"TTS-list-left-wrap TTS-left\">\n      <div class=\"TTS-list-left TTS-left\"></div>\n      ";
		stack1 = helpers['if'].call(depth0, depth0.more, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
		if(stack1 || stack1 === 0) { buffer += stack1; }
		buffer += "\n      ";
		stack1 = helpers['if'].call(depth0, depth0.list, {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
		if(stack1 || stack1 === 0) { buffer += stack1; }
		buffer += "\n    </div>\n    <!--<div id=\"TTS-group\">\n      <div id=\"KKT-nomore\">\n        <span>限量抢购</span> \n        <em id=\"KKT-arrow\" class=\"bijia-arrow-down\"></em>\n      </div>\n      <a target=\"_blank\" id=\"KKT-bottom-click\" href=\"http://www.chaoji99.com/#gouwu\" data-tts-log=\"_Bottomtab_seckill_click\">\n        <div id=\"KKT-open-tuangou\">\n          <div id=\"KKT-tuan-time\"></div>\n        </div>\n      </a>\n    </div>-->\n  </div>\n  <a class=\"TTS-bijia-min-btn bijia-fold TTS-right\"></a>\n  <div class=\"TTS-list-right-wrap TTS-tuan TTS-right\">\n    <div class=\"TTS-list-right TTS-tumeiti TTS-left\"></div>\n  </div>\n</div>";
		return buffer;
	});

	this["JST"]["bijia/taobao.like"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		var buffer = "", stack1, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

		function program1(depth0,data) {

			var buffer = "", stack1, stack2, options;
			buffer += "\n    <li class=\"";
			options = {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data};
			stack2 = ((stack1 = helpers.lt || depth0.lt),stack1 ? stack1.call(depth0, ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index), 5, options) : helperMissing.call(depth0, "lt", ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index), 5, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += " ";
			options = {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data};
			stack2 = ((stack1 = helpers.is || depth0.is),stack1 ? stack1.call(depth0, ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index), 7, options) : helperMissing.call(depth0, "is", ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index), 7, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			stack2 = helpers['if'].call(depth0, depth0.isMin, {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += "\">\n        <a class=\"TTS-list-product-img\" href=";
			if (stack2 = helpers.clickUrl) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.clickUrl; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ " target=\"_blank\">\n            <img class=\"tk\" src=";
			options = {hash:{},data:data};
			buffer += escapeExpression(((stack1 = helpers.imgCDN || depth0.imgCDN),stack1 ? stack1.call(depth0, 70, 70, depth0.picUrl, options) : helperMissing.call(depth0, "imgCDN", 70, 70, depth0.picUrl, options)))
				+ ">\n        </a>\n        <p class=\"TTS-list-product-detail\">\n            <span class=\"src-";
			options = {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data};
			stack2 = ((stack1 = helpers.jdName || depth0.jdName),stack1 ? stack1.call(depth0, depth0.webSite, options) : helperMissing.call(depth0, "jdName", depth0.webSite, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += " src-icon\" >";
			options = {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data};
			stack2 = ((stack1 = helpers.sourceShort || depth0.sourceShort),stack1 ? stack1.call(depth0, depth0.webSite, options) : helperMissing.call(depth0, "sourceShort", depth0.webSite, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += "</span>\n            <span class=\"src-price\"><em>&yen;</em>";
			if (stack2 = helpers.promoPrice) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.promoPrice; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ "</span>\n        </p>\n        ";
			stack2 = helpers['if'].call(depth0, depth0.isMin, {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += "\n    </li>\n";
			return buffer;
		}
		function program2(depth0,data) {


			return "TTS-list-left-head";
		}

		function program4(depth0,data) {


			return "TTS-list-left-tail";
		}

		function program6(depth0,data) {


			return "TTS-list-left-last";
		}

		function program8(depth0,data) {


			return "TTS-list-lowestPrice";
		}

		function program10(depth0,data) {

			var buffer = "";
			return buffer;
		}

		function program12(depth0,data) {


			return "\n            <div class=\"tip-lowestPrice\">\n                <span>最低价</span>\n                <em class=\"bijia-arrow-down\"></em>\n            </div>\n        ";
		}

		buffer += "<span class=\"bijia-like-title TTS-left\"></span>\n\n<ul class=\"TTS-left\" data-tts-log=\"Bottomtab_";
		if (stack1 = helpers.laiyuan) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		else { stack1 = depth0.laiyuan; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		buffer += escapeExpression(stack1)
			+ "_click\">\n";
		stack1 = helpers.each.call(depth0, depth0.list, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
		if(stack1 || stack1 === 0) { buffer += stack1; }
		buffer += "\n</ul>";
		return buffer;
	});

	this["JST"]["bijia/taobao.qutu"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};



		return "<div class=\"TK-price-btn bijia-price\">\n  <div class=\"TK-qutu-warp\">\n    <i class=\"TK-qutu-pointer\"></i>\n    <div class=\"TK-qutu-con J-TK-qutu-con\">\n      <div class=\"TK-qutu-price\">\n      </div>\n      <div class=\"TK-qutu-data\">\n      </div>\n      <canvas id=\"TK-canvas-base\" class=\"TK-canvas-base\" style=\"width: 440px; height: 250px;\" width=\"880\" height=\"500\"></canvas>\n      <canvas id=\"TK-canvas-layout\" class=\"TK-canvas-layout\" style=\"width: 440px; height: 250px;\" width=\"880\" height=\"500\"></canvas>\n      <div class=\"TK-qutu-msg\">\n        <div class=\"TK-qutu-msg-wrap\">\n        </div>\n      </div>\n    </div>\n  </div>\n</div>";
	});

	this["JST"]["bijia/taobao.remind"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};



		return "<a class=\"TK-remind-btn bijia-remind TTS-left\">\n</a>";
	});

	this["JST"]["bijia/taobao.same"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		var buffer = "", stack1, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

		function program1(depth0,data) {


			return "\"Bottomtab_group_click\"";
		}

		function program3(depth0,data) {


			return "\"Bottomtab_recom_click\"";
		}

		function program5(depth0,data) {

			var buffer = "", stack1, stack2, options;
			buffer += "\n    <li class=\"";
			options = {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data};
			stack2 = ((stack1 = helpers.lt || depth0.lt),stack1 ? stack1.call(depth0, ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index), 3, options) : helperMissing.call(depth0, "lt", ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index), 3, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += " ";
			stack2 = helpers['if'].call(depth0, depth0.isMin, {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += "\">\n      <a class=\"TTS-list-product-img\" href=";
			if (stack2 = helpers.clickUrl) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.clickUrl; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ " target=\"_blank\">\n        <img class=\"tk\" src=";
			options = {hash:{},data:data};
			buffer += escapeExpression(((stack1 = helpers.imgCDN || depth0.imgCDN),stack1 ? stack1.call(depth0, 70, 70, depth0.picUrl, options) : helperMissing.call(depth0, "imgCDN", 70, 70, depth0.picUrl, options)))
				+ ">\n      </a>\n      <p class=\"TTS-list-product-detail\">\n        <span class=\"src-";
			options = {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data};
			stack2 = ((stack1 = helpers.jdName || depth0.jdName),stack1 ? stack1.call(depth0, depth0.webSite, options) : helperMissing.call(depth0, "jdName", depth0.webSite, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += " src-icon\" >";
			options = {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data};
			stack2 = ((stack1 = helpers.sourceShort || depth0.sourceShort),stack1 ? stack1.call(depth0, depth0.webSite, options) : helperMissing.call(depth0, "sourceShort", depth0.webSite, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += "</span>\n        <span class=\"src-price\"><em>&yen;</em>";
			if (stack2 = helpers.promoPrice) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.promoPrice; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ "</span>\n      </p>\n      ";
			stack2 = helpers['if'].call(depth0, depth0.isMin, {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += "\n    </li>\n  ";
			return buffer;
		}
		function program6(depth0,data) {


			return "TTS-list-left-head";
		}

		function program8(depth0,data) {


			return "TTS-list-left-tail";
		}

		function program10(depth0,data) {


			return "TTS-list-lowestPrice";
		}

		function program12(depth0,data) {

			var buffer = "";
			return buffer;
		}

		function program14(depth0,data) {


			return "\n        <div class=\"tip-lowestPrice\">\n          <span>最低价</span>\n          <em class=\"bijia-arrow-down\"></em>\n        </div>\n      ";
		}

		buffer += "<ul data-tts-log=";
		stack1 = helpers['if'].call(depth0, depth0.isSameList, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
		if(stack1 || stack1 === 0) { buffer += stack1; }
		buffer += ">\n  ";
		stack1 = helpers.each.call(depth0, depth0.list, {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
		if(stack1 || stack1 === 0) { buffer += stack1; }
		buffer += "\n</ul>";
		return buffer;
	});

	this["JST"]["bijia/taobao.same.pop"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

		function program1(depth0,data) {


			return "\"Bottomtab_group_magnify_click\"";
		}

		function program3(depth0,data) {

			var buffer = "", stack1;
			buffer += " ";
			stack1 = helpers['if'].call(depth0, depth0.isProList, {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
			if(stack1 || stack1 === 0) { buffer += stack1; }
			return buffer;
		}
		function program4(depth0,data) {

			var buffer = "", stack1;
			buffer += "\"Bottomtab_";
			if (stack1 = helpers.isProList) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.isProList; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "_magnify_click\"";
			return buffer;
		}

		function program6(depth0,data) {


			return "\"Bottomtab_recom_magnify_click\"";
		}

		function program8(depth0,data) {

			var buffer = "";
			return buffer;
		}

		function program10(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n        ";
			stack1 = helpers['if'].call(depth0, depth0.shopType, {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
			if(stack1 || stack1 === 0) { buffer += stack1; }
			buffer += "\n    ";
			return buffer;
		}
		function program11(depth0,data) {


			return "\n            <span class=\"TTS-product-owner\">网站自营</span>\n        ";
		}

		function program13(depth0,data) {


			return "\n            <span class=\"TTS-product-owner\">第三方</span>\n        ";
		}

		function program15(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n      <span class=\"TTS-product-sales\">销量：";
			if (stack1 = helpers.sales) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.sales; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "</span>\n    ";
			return buffer;
		}

		function program17(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n      ";
			stack1 = helpers['if'].call(depth0, depth0.com, {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
			if(stack1 || stack1 === 0) { buffer += stack1; }
			buffer += "\n    ";
			return buffer;
		}
		function program18(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n        <span class=\"TTS-product-comment\">";
			if (stack1 = helpers.com) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.com; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ "条评论</span>\n      ";
			return buffer;
		}

		buffer += "<div class=\"TTS-bijia-pop TTS-bijia-same-pop\" data-tts-log=";
		stack1 = helpers['if'].call(depth0, depth0.isSameList, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
		if(stack1 || stack1 === 0) { buffer += stack1; }
		buffer += ">\n  <div class=\"TTS-product-img\">\n    <a href=";
		if (stack1 = helpers.clickUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		else { stack1 = depth0.clickUrl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		buffer += escapeExpression(stack1)
			+ " target=\"_blank\"><img class=\"tk\" src=";
		options = {hash:{},data:data};
		buffer += escapeExpression(((stack1 = helpers.imgCDN || depth0.imgCDN),stack1 ? stack1.call(depth0, 200, 200, depth0.picUrl, options) : helperMissing.call(depth0, "imgCDN", 200, 200, depth0.picUrl, options)))
			+ "></a>\n  </div>\n  <div class=\"TTS-product-title\">\n    <a href=";
		if (stack2 = helpers.clickUrl) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
		else { stack2 = depth0.clickUrl; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
		buffer += escapeExpression(stack2)
			+ " target=\"_blank\">";
		if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
		else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
		buffer += escapeExpression(stack2)
			+ "</a>\n  </div>\n  <p>\n    <span class=\"TTS-product-price\"><em>&yen;</em>";
		if (stack2 = helpers.promoPrice) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
		else { stack2 = depth0.promoPrice; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
		buffer += escapeExpression(stack2)
			+ "</span>\n  </p>\n  <p class=\"TTS-product-source\">\n    <span class=\"src-";
		options = {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data};
		stack2 = ((stack1 = helpers.jdName || depth0.jdName),stack1 ? stack1.call(depth0, depth0.webSite, options) : helperMissing.call(depth0, "jdName", depth0.webSite, options));
		if(stack2 || stack2 === 0) { buffer += stack2; }
		buffer += " TTS-product-icon\" >";
		options = {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data};
		stack2 = ((stack1 = helpers.source || depth0.source),stack1 ? stack1.call(depth0, depth0.webSite, options) : helperMissing.call(depth0, "source", depth0.webSite, options));
		if(stack2 || stack2 === 0) { buffer += stack2; }
		buffer += "</span>\n    ";
		stack2 = helpers['if'].call(depth0, depth0.shopOwner, {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
		if(stack2 || stack2 === 0) { buffer += stack2; }
		buffer += "\n\n    ";
		stack2 = helpers['if'].call(depth0, depth0.sales, {hash:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),data:data});
		if(stack2 || stack2 === 0) { buffer += stack2; }
		buffer += "\n  </p>\n</div>";
		return buffer;
	});

	this["JST"]["bijia/taobao.tuan"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		var buffer = "", stack1, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

		function program1(depth0,data) {

			var buffer = "", stack1, stack2, options;
			buffer += "\n    <li class=";
			options = {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data};
			stack2 = ((stack1 = helpers.lt || depth0.lt),stack1 ? stack1.call(depth0, ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index), 3, options) : helperMissing.call(depth0, "lt", ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index), 3, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += ">\n      <a class=\"TTS-list-product-img\" href=";
			if (stack2 = helpers.clickUrl) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.clickUrl; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ " target=\"_blank\">\n        <img class=\"tk\" src=";
			options = {hash:{},data:data};
			buffer += escapeExpression(((stack1 = helpers.imgCDN || depth0.imgCDN),stack1 ? stack1.call(depth0, 70, 70, depth0.picUrl, options) : helperMissing.call(depth0, "imgCDN", 70, 70, depth0.picUrl, options)))
				+ ">\n      </a>\n      <p class=\"TTS-list-product-detail\">\n        <span class=\"src-price\"><em>&yen;</em>";
			if (stack2 = helpers.price) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
			else { stack2 = depth0.price; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
			buffer += escapeExpression(stack2)
				+ "</span>\n      </p>\n    </li>\n  ";
			return buffer;
		}
		function program2(depth0,data) {


			return "\"TTS-list-right-head\"";
		}

		function program4(depth0,data) {


			return "\"TTS-list-right-tail\"";
		}

		buffer += "<span class=\"bijia-tuan-title TTS-left\"></span>\n<ul class=\"TTS-tuan-list TTS-left\" data-tts-log=\"Bottomtab_tuan_click\">\n  ";
		stack1 = helpers.each.call(depth0, depth0.list, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
		if(stack1 || stack1 === 0) { buffer += stack1; }
		buffer += "\n</ul>\n<a class=\"bijia-more-tuan-unclicked TTS-left TTS-list-right-tail\" href=\"";
		if (stack1 = helpers.more) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		else { stack1 = depth0.more; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		buffer += escapeExpression(stack1)
			+ "\" target=\"_blank\" data-tts-log=\"Bottomtab_tuan_more_click\"></a>";
		return buffer;
	});

	this["JST"]["bijia/taobao.tuan.pop"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


		buffer += "<div class=\"TTS-bijia-pop TTS-bijia-tuan-pop\" data-tts-log=\"Bottomtab_tuan_magnify_click\">\n  <div class=\"TTS-product-img\">\n    <a href=";
		if (stack1 = helpers.clickUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
		else { stack1 = depth0.clickUrl; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
		buffer += escapeExpression(stack1)
			+ " target=\"_blank\"><img class=\"tk\" src=";
		options = {hash:{},data:data};
		buffer += escapeExpression(((stack1 = helpers.imgCDN || depth0.imgCDN),stack1 ? stack1.call(depth0, 200, 200, depth0.picUrl, options) : helperMissing.call(depth0, "imgCDN", 200, 200, depth0.picUrl, options)))
			+ "></a>\n  </div>\n  <div class=\"TTS-product-title\">\n    <a href=";
		if (stack2 = helpers.clickUrl) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
		else { stack2 = depth0.clickUrl; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
		buffer += escapeExpression(stack2)
			+ " target=\"_blank\">";
		if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
		else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
		buffer += escapeExpression(stack2)
			+ "</a>\n  </div>\n  <p>\n    <span class=\"TTS-product-zhekou\">";
		if (stack2 = helpers.zhekou) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
		else { stack2 = depth0.zhekou; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
		buffer += escapeExpression(stack2)
			+ "</span>\n    <span class=\"TTS-product-price\"><em>&yen;</em>";
		if (stack2 = helpers.price) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
		else { stack2 = depth0.price; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
		buffer += escapeExpression(stack2)
			+ "</span>\n  </p>\n  <p class=\"TTS-product-countdown-wrap\">\n    <span class=\"TTS-product-countdown\" data-start=\"";
		if (stack2 = helpers.startTimeStr) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
		else { stack2 = depth0.startTimeStr; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
		buffer += escapeExpression(stack2)
			+ "\" data-end=\"";
		if (stack2 = helpers.overTimeStr) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
		else { stack2 = depth0.overTimeStr; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
		buffer += escapeExpression(stack2)
			+ "\"></span>\n  </p>\n</div>";
		return buffer;
	});

	this["JST"]["juzi/juzi"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
		var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

		function program1(depth0,data) {

			var buffer = "", stack1, stack2, options;
			buffer += "\n        ";
			options = {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data};
			stack2 = ((stack1 = helpers.lengthLt || depth0.lengthLt),stack1 ? stack1.call(depth0, depth0.sameList, 0, options) : helperMissing.call(depth0, "lengthLt", depth0.sameList, 0, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += "\n      ";
			return buffer;
		}
		function program2(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n          <a class=\"TTS-bijia-more-btn juzi-more-same-clicked TTS-left\" href=";
			if (stack1 = helpers.more) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.more; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ " target=\"_blank\" data-tts-log=\"Bottomtab_group_more_click\"></a>\n        ";
			return buffer;
		}

		function program4(depth0,data) {

			var buffer = "", stack1, stack2, options;
			buffer += "\n          ";
			options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data};
			stack2 = ((stack1 = helpers.lengthLt || depth0.lengthLt),stack1 ? stack1.call(depth0, depth0.similarList, 0, options) : helperMissing.call(depth0, "lengthLt", depth0.similarList, 0, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += "\n        ";
			return buffer;
		}
		function program5(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n            <a class=\"TTS-bijia-more-btn juzi-more-same-clicked TTS-left\" href=";
			if (stack1 = helpers.more) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.more; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ " target=\"_blank\" data-tts-log=\"Bottomtab_recom_more_click\"></a>\n          ";
			return buffer;
		}

		function program7(depth0,data) {

			var buffer = "", stack1, stack2, options;
			buffer += "\n        ";
			options = {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data};
			stack2 = ((stack1 = helpers.lengthLt || depth0.lengthLt),stack1 ? stack1.call(depth0, depth0.proList, 0, options) : helperMissing.call(depth0, "lengthLt", depth0.proList, 0, options));
			if(stack2 || stack2 === 0) { buffer += stack2; }
			buffer += "\n      ";
			return buffer;
		}
		function program8(depth0,data) {

			var buffer = "", stack1;
			buffer += "\n          <a class=\"TTS-bijia-more-btn juzi-more-same-clicked TTS-left\" href=";
			if (stack1 = helpers.list) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
			else { stack1 = depth0.list; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
			buffer += escapeExpression(stack1)
				+ " target=\"_blank\" data-tts-log=\"Bottomtab_tsearch_more_click\"></a>\n        ";
			return buffer;
		}

		buffer += "<div id=\"TTS_bijia_wrap\" class=\"JUZI_tts_cooper TTS_bijia_wrap\">\n  <a class=\"TTS_logo_juzi juzi-logo TTS-left\" href=\"http://www.taotaosou.com/\" target=\"_blank\" data-tts-log=\"Bottomtab_logo_click\"></a>\n  <div class=\"TTS-qutu-wrap TTS-left\"></div>\n  <div class=\"TTS-products-wrap TTS-left\">\n    <div class=\"TTS-list-left-wrap\">\n\n      <div class=\"TTS-list-left TTS-left\"></div>\n      ";
		stack1 = helpers['if'].call(depth0, depth0.more, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
		if(stack1 || stack1 === 0) { buffer += stack1; }
		buffer += "\n      ";
		stack1 = helpers['if'].call(depth0, depth0.list, {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
		if(stack1 || stack1 === 0) { buffer += stack1; }
		buffer += "\n    </div>\n  </div>\n  <a class=\"TTS-bijia-min-btn juzi-fold TTS-left\"></a>\n  <span class=\"TTS-juzi-logo juzi-juzi-logo\">\n  </span>\n</div>";
		return buffer;
	});

	this["JST"]["juzi/juzi.mid"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};



		return "<div class=\"cqol JUZI_tts_mid\" id=\"TTK-sub-wrap\">\n  <div class=\"TK-mind-sub\">\n    <div class=\"TK-mind-sub-nav\">\n      <i class=\"TK-mind-sub-star juzi-soso-logo\"></i>\n      <div class=\"TK-mind-sub-qutu\">\n        <i class=\"TK-mind-sub-icon\"></i>\n        <span class=\"J-TK-mind-sub-icon-text\">价格曲线</span>\n      </div>\n      <div class=\"TK-mind-sub-under-warp J-TK-mind-sub-under-warp\">\n      </div>\n    </div>\n    <div class=\"TK-qutu-sub-warp\">\n      <i class=\"TK-qutu-sub-pointer\"></i>\n      <div class=\"TK-qutu-sub-con J-TK-qutu-sub-con\">\n        <div class=\"TK-qutu-sub-price\">\n\n        </div>\n        <div class=\"TK-qutu-sub-data\">\n\n        </div>\n        <canvas id=\"TK-canvas-sub-base\" class=\"TK-canvas-sub-base\" style=\"width: 440px; height: 250px;\" width=\"880\" height=\"500\"></canvas>\n        <canvas id=\"TK-canvas-sub-layout\" class=\"TK-canvas-sub-layout\" style=\"width: 440px; height: 250px;\" width=\"880\" height=\"500\"></canvas>\n        <div class=\"TK-qutu-sub-msg\">\n          <div class=\"TK-qutu-sub-msg-wrap\">\n\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>";
	});

	this["JST"]["juzi/juzi.qutu"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
		this.compilerInfo = [4,'>= 1.0.0'];
		helpers = this.merge(helpers, Handlebars.helpers); data = data || {};



		return "<div class=\"TK-price-btn juzi-price\">\n  <div class=\"TK-qutu-warp\">\n    <i class=\"TK-qutu-pointer\"></i>\n    <div class=\"TK-qutu-con J-TK-qutu-con\">\n      <div class=\"TK-qutu-price\">\n      </div>\n      <div class=\"TK-qutu-data\">\n      </div>\n      <canvas id=\"TK-canvas-base\" class=\"TK-canvas-base\" style=\"width: 440px; height: 250px;\" width=\"880\" height=\"500\"></canvas>\n      <canvas id=\"TK-canvas-layout\" class=\"TK-canvas-layout\" style=\"width: 440px; height: 250px;\" width=\"880\" height=\"500\"></canvas>\n      <div class=\"TK-qutu-msg\">\n        <div class=\"TK-qutu-msg-wrap\">\n        </div>\n      </div>\n    </div>\n  </div>\n</div>";
	});

	return this["JST"];

});
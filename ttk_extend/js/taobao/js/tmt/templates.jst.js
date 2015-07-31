__tk__define(function (require, exports, module) {var Handlebars = require('./lib/handlebars');

this["JST"] = this["JST"] || {};

this["JST"]["tmt/corner"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "  <div class=\"KKT-cornerFrame\" style=\"position: fixed; top: -2px; right: 0;\" id=\"KKT-cornerFrame-fix\">\n";
  },"3":function(depth0,helpers,partials,data) {
  return "  <div class=\"KKT-cornerFrame\" style=\"position: absolute; top: -2px; right: 0;\" id=\"KKT-cornerFrame\">\n";
  },"5":function(depth0,helpers,partials,data) {
  return "    <div id=\"KKT-topCornerClose-zhaoshang\">关闭</div>\n";
  },"7":function(depth0,helpers,partials,data) {
  return "    <div id=\"KKT-topCornerClose\">关闭</div>\n";
  },"9":function(depth0,helpers,partials,data) {
  return "";
},"11":function(depth0,helpers,partials,data) {
  return "  <div id=\"KKT-logo\"></div>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.fix : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "  <object width=\"195\" height=\"130\" align=\"middle\">\n    <param name=\"allowScriptAccess\" value=\"never\">\n    <param name=\"quality\" value=\"high\">\n    <param name=\"wmode\" value=\"transparent\">\n    <param name=\"movie\" value=\""
    + escapeExpression(((helper = (helper = helpers.swf || (depth0 != null ? depth0.swf : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"swf","hash":{},"data":data}) : helper)))
    + "\">\n    <embed wmode=\"transparent\" src=\""
    + escapeExpression(((helper = (helper = helpers.swf || (depth0 != null ? depth0.swf : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"swf","hash":{},"data":data}) : helper)))
    + "\" quality=\"high\" width=\"195\" height=\"130\" align=\"middle\"\n           allowscriptaccess=\"never\" type=\"application/x-shockwave-flash\">\n  </object>\n  <a target=\"_blank\"\n     href=\""
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\"\n     id=\"KKT-topCornerClick\">h</a>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.fix : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.logo : depth0), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.program(11, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n\n";
},"useData":true});



this["JST"]["tmt/ditong"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div id=\"J_tts_bubble_logo\"><a href=\"javascript:;\" class=\"media_bubble_logo\" onclick=\"return false\">淘淘搜提供</a></div>\n<a href=\"javascript:;\" id=\"J_tts_bubble_close\" title=\"关闭\" class=\"media_bubble_close\">X</a>\n<a id=\"J_tts_bubble_frame\" class=\"media_bubble_frame\" target=\"_blank\" alt=\""
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\" href=\""
    + escapeExpression(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"href","hash":{},"data":data}) : helper)))
    + "\">\n  <img src=\""
    + escapeExpression(((helper = (helper = helpers.media || (depth0 != null ? depth0.media : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"media","hash":{},"data":data}) : helper)))
    + "\">\n</a>";
},"useData":true});



this["JST"]["tmt/jiaohu"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "      <li class=\"tts_jiaohu_item\" data-from=\""
    + escapeExpression(((helper = (helper = helpers.from || (depth0 != null ? depth0.from : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"from","hash":{},"data":data}) : helper)))
    + "\" data-id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n        <a class=\"tts_jiaohu_alink\" href=\""
    + escapeExpression(((helpers.transUrl || (depth0 && depth0.transUrl) || helperMissing).call(depth0, (depth0 != null ? depth0.from : depth0), (depth0 != null ? depth0.url : depth0), (depth0 != null ? depth0.id : depth0), {"name":"transUrl","hash":{},"data":data})))
    + "\" target=\"_blank\">\n          <img src=\""
    + escapeExpression(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"img","hash":{},"data":data}) : helper)))
    + "_60x60.jpg\" alt=\"\"/>\n        </a>\n        <!--pop item box-->\n        <div class=\"tts_jiaohu_popitem\">\n          <a href=\""
    + escapeExpression(((helpers.transUrl || (depth0 && depth0.transUrl) || helperMissing).call(depth0, (depth0 != null ? depth0.from : depth0), (depth0 != null ? depth0.url : depth0), (depth0 != null ? depth0.id : depth0), {"name":"transUrl","hash":{},"data":data})))
    + "\" class=\"tts_jiaohu_popitem_alink\" target=\"_blank\">\n            <img src=\""
    + escapeExpression(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"img","hash":{},"data":data}) : helper)))
    + "_150x150.jpg\"/>\n          </a>\n          <div class=\"tts_jiaohu_popitem_info\">\n            <p class=\"tts_jiaohu_popitem_info_price\"><i>¥</i>"
    + escapeExpression(((helper = (helper = helpers.promoPrice || (depth0 != null ? depth0.promoPrice : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"promoPrice","hash":{},"data":data}) : helper)))
    + "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.pirce : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </p>\n          </div>\n        </div>\n        <!--pop item box end-->\n      </li>\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                <del class=\"tts_jiaohu_popitem_info_source_price\"><i>¥</i>"
    + escapeExpression(((helper = (helper = helpers.pirce || (depth0 != null ? depth0.pirce : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"pirce","hash":{},"data":data}) : helper)))
    + "</del>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"tts_jiaohu_bar\">\n  <ul>\n\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.list : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </ul>\n  <a href=\"javascript:;\" id=\"J_tts_jiaohu_close\" title=\"关闭\" class=\"media_bubble_close\" onclick=\"return false\">X</a>\n  <div id=\"J_tts_bubble_logo\"><a href=\"javascript:;\" class=\"media_bubble_logo\" onclick=\"return false\">淘淘搜提供</a></div>\n</div>";
},"useData":true});



this["JST"]["tmt/lds.box"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"TK-lds-wrap\">\n    <div id=\"J-TK-lds-con\" data-col=\"tts_lds_ff\" class=\"TK-lds-con\">\n        <div class=\"TK-lds-icon\"></div>\n        <div id=\"J-TK-lds-slide\">\n            <span class=\"TK-lds-close\">x</span>\n            <span id=\"J-TK-lds-prev\" class=\"TK-lds-prev\"></span>\n            <span id=\"J-TK-lds-next\" class=\"TK-lds-next\"></span>\n            <div id=\"J-TK-lds-hd\" class=\"TK-lds-hd\">\n            </div>\n            <div class=\"TK-lds-bd\">\n                <div id=\"J-TK-lds-bd-con\" class=\"TK-lds-bd-con\">\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
  },"useData":true});



this["JST"]["tmt/msg"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "<div class=\"TK-pp-wrap\">\n    <div class=\"TK-pp-con\">\n        <a href=\"javascript:;\" title=\"关闭\" class=\"TK-pp-msg-news-close\">\n            关闭\n        </a>\n        <h3>今日<span>热点</span></h3>\n        <div class=\"TK-pp-msg-news\">\n            <a data-tk-msg-log=\"outsite_news_hot_click\" href=\""
    + escapeExpression(((helpers.searchUrl || (depth0 && depth0.searchUrl) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.pic : depth0)) != null ? stack1.link : stack1), {"name":"searchUrl","hash":{},"data":data})))
    + "\" target=\"_blank\" title=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.pic : depth0)) != null ? stack1.title : stack1), depth0))
    + "\" class=\"TK-pp-msg-img\">\n                <img src=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.pic : depth0)) != null ? stack1.pic : stack1), depth0))
    + "\" alt=\"\"/>\n            </a>\n            <div class=\"TK-pp-msg-words\">\n                <a data-tk-msg-log=\"outsite_news_hot_click\" class=\"TK-pp-msg-title\" href=\""
    + escapeExpression(((helpers.searchUrl || (depth0 && depth0.searchUrl) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.pic : depth0)) != null ? stack1.link : stack1), {"name":"searchUrl","hash":{},"data":data})))
    + "\" target=\"_blank\">\n                    "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.pic : depth0)) != null ? stack1.title : stack1), depth0))
    + "\n                </a>\n                <a data-tk-msg-log=\"outsite_news_hot_click\" class=\"TK-pp-msg-alink\" href=\""
    + escapeExpression(((helpers.searchUrl || (depth0 && depth0.searchUrl) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.pic : depth0)) != null ? stack1.link : stack1), {"name":"searchUrl","hash":{},"data":data})))
    + "\" target=\"_blank\">\n                    "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.pic : depth0)) != null ? stack1.description : stack1), depth0))
    + "\n                </a>\n            </div>\n        </div>\n        <div class=\"TK-pp-msg-list\">\n            <ul>\n                <li class=\"h"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.text1 : depth0)) != null ? stack1.red : stack1), depth0))
    + "\">\n                    <span></span> <a data-tk-msg-log=\"outsite_news_hot_click\" href=\""
    + escapeExpression(((helpers.searchUrl || (depth0 && depth0.searchUrl) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.text1 : depth0)) != null ? stack1.link : stack1), {"name":"searchUrl","hash":{},"data":data})))
    + "\" target=\"_blank\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.text1 : depth0)) != null ? stack1.title : stack1), depth0))
    + "</a>\n                </li>\n                <li class=\"h"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.text2 : depth0)) != null ? stack1.red : stack1), depth0))
    + "\">\n                    <span></span><a data-tk-msg-log=\"outsite_news_hot_click\" href=\""
    + escapeExpression(((helpers.searchUrl || (depth0 && depth0.searchUrl) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.text2 : depth0)) != null ? stack1.link : stack1), {"name":"searchUrl","hash":{},"data":data})))
    + "\" target=\"_blank\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.text2 : depth0)) != null ? stack1.title : stack1), depth0))
    + "</a>\n                </li>\n                <li class=\"h"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.text3 : depth0)) != null ? stack1.red : stack1), depth0))
    + "\">\n                    <span></span><a data-tk-msg-log=\"outsite_news_hot_click\" href=\""
    + escapeExpression(((helpers.searchUrl || (depth0 && depth0.searchUrl) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.text3 : depth0)) != null ? stack1.link : stack1), {"name":"searchUrl","hash":{},"data":data})))
    + "\" target=\"_blank\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.text3 : depth0)) != null ? stack1.title : stack1), depth0))
    + "</a>\n                </li>\n                <li class=\"h"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.text4 : depth0)) != null ? stack1.red : stack1), depth0))
    + "\">\n                    <span></span><a data-tk-msg-log=\"outsite_news_hot_click\" href=\""
    + escapeExpression(((helpers.searchUrl || (depth0 && depth0.searchUrl) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.text4 : depth0)) != null ? stack1.link : stack1), {"name":"searchUrl","hash":{},"data":data})))
    + "\" target=\"_blank\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.text4 : depth0)) != null ? stack1.title : stack1), depth0))
    + "</a>\n                </li>\n            </ul>\n        </div>\n        <div id=\"J_tts_bubble_logo\"><a href=\"javascript:;\" class=\"media_bubble_logo\" onclick=\"return false\">淘淘搜提供</a></div>\n    </div>\n</div>";
},"useData":true});



this["JST"]["tmt/tmt"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"btn_bg\">\n\n    <p class=\"ewm\"></p>\n    <div class=\"btn_bg\"></div>\n</div>\n\n\n\n<div id=\"bottom-zhaoshang\">\n	<a id=\"KKT-bottomzhaoshang-link\" href=\"\"></a>\n	<div id=\"KKT-bottomzhaoshang-close\"></div>\n</div>";
  },"useData":true});

return this["JST"];

});
/**
 * Created with JetBrains PhpStorm.
 * User: cqol_77
 * Date: 13-11-11
 * Time: 下午3:16
 * To change this template use File | Settings | File Templates.
 */
__tk__define(function (require, exports, module) {
	var $ = require('../lib/jquery'),
		templates = require("../templates.jst"),
		utils = require('../utils'),
		host = require('../host'),
		model = require('../models/models'),
		Product = require('../product'),
		$body = $('body');

	function Render(data) {
		if (typeof data.recomList === 'undefined' || !data.recomList[0]) {
			return false;
		}
		if (data.recomList.length > 4) {
			//data.recomList.splice(0, 6);
			data.recomList.length = 4;
		}
		this.box = $('#TTK-sub-wrap');
		this.init(data);
	}

	Render.prototype = {
		init: function (data) {
			var tmpl = templates['bijia/juxiao'];
			if ($body.find('#TTK-sub-wrap')[0]) {
				$('#TTK-sub-wrap').append(tmpl(data));
			} else {
				$(tmpl(data)).insertAfter(utils.getContainer());
			}
			//$(tmpl(showData)).insertAfter(utils.getContainer());
			//this.box.append(tmpl(showData));
			this.renderEvent();
		},
		renderEvent: function () {
			$('.TTK-juxiao-wrap').on('click', '.TTS-list-product-img', function () {
				utils.statLog_one({
					systemName: "ttk_recommend_clikc_log",
					//匹配类型
					sTyp: "",
					//源品商品id
					sPid: Product.item.getID(),
					//原价
					sPric: '',
					//促销价
					sProPric: '',
					//
					cType: $(this).data().stat,
					//类目id
					cid: Product.item.getCid(),
					//被点击商品的源ID
					pid: '',
					//被点击商品价格(此处是促销价格)
					price: '',
					// 被点击商品的位置
					cNum: $(this).index() + 1,
					ptype: host.pageType
				});
			});
		}
	};
	function init() {
		$body.on('juxiao.tts.success', function (e, data) {
			new Render(data);
		});


		//暂时传空
		model.juxiao('', '');
	}

	//暴露接口
	module.exports = {
		init: function () {
			if (utils.isManualDId || utils.ipLocalCity().match(/北京|杭州/)) {
				if (utils.isJuzi()) {
					init();
				}
				return false;
			} else {
				if (utils.isJuzi() && !utils.ipLocalCity().match(/北京/)) {
					init();
				} else {
					init();
				}
			}
		}
	};
});

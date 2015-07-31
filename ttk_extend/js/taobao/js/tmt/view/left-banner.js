__tk__define(function (require, exports, module) {
	var J ={
		utils:require('../utils')
	},
	$ = require('../lib/jquery.min');

	if (J.utils.isManualDId) {
		return;
	};
	ifShow();												//监听config.success
	function render(data){
		var imgHref = data.pinpai[0].href;
		var imgSrc = data.pinpai[0].media;
		var tmplHtml = '<div id="TK-left-banner">' +
		'<div id="KKT-guandiao"></div>' +
		'<a id="KKT-main" href="' + imgHref + '" target="_blank"><img src="' + imgSrc + '" >'
		+'</img></a></div>';
		var str = tmplHtml;
		$(str).insertBefore('#TK-log');
		$("#KKT-guandiao").on('click', function() {
			$('#TK-left-banner').hide();
		});
	}

	function init(){
		$.getJSON('//showkc.taotaosou.com/tumeiti.do?adType=0,0,1,0&keyword=0,0,0,0&adSize=0,0,100*300,0&itemSize=0,0,1,0&tbId=&pid=383&jsonp=?',function(data){
			if (!data.pinpai) {
				return false;
			}
			else{
				render(data);
			}
		});
	}

	function ifShow(){
		$('body').on('config.success', function (e,data) { 	
			//监听是否有广告
			// var adlist = data.iA.adList;
			var isShowLeft = function () {
				if (!data || 'state' in data) {
					return false;
				} else{
					if (!data.iA || !data.iA.st) {
						return false;
					} else{
						if (!data.iA.adList) {
							return false;
						} else{
							var adlist = data.iA.adList;
							if (adlist.length[0]) {
								for (var i = 0, len = adlist.length; i < len; i++) {
									if (adlist[i].pid === 383) {
										if (adlist[i].status) {
											return true;
										} else{
											return false;
										}
									}
								}
							}
						}						
					}	
				}
			};
			if (isShowLeft()) {
				init();									//开始初始化
			};
		});
	}

});
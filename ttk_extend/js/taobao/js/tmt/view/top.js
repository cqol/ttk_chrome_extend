__tk__define(function (require, exports, module) {
var J = {
	utils: require('../utils')
},
$ = require('../lib/jquery.min');

	// 自主安装渠道的插件不弹
	if (J.utils.isManualDId) {
		return;
	}
	//渲染数据
	if(!+[1,]){
		return;
	}
	else{
		function render(data) {
			var tmplHtml = '<div id="TK-top-frame"><div id="TK-main"> '+
			'<div class="TK-top-inner" id="TK-top-in-1"></div>' + 
			'<div class="TK-top-inner" id="TK-top-in-2">'
			var alinkTitle ='';
			var imgStr = '';
			var titleData = data[0].moldGsonList;
		// console.log(titleData);
		$.each(titleData, function(index, val) {
			alinkTitle += '<a href=" '+ val.href + 
			'" target="_blank">' + val.title +'</a><br>';
		});                     
		
		tmplHtml += alinkTitle;
		tmplHtml +='</div><div class="TK-top-inner" id="TK-top-in-4">' + 
		'<div id="TK-guandiao"></div>';

		tmplHtml += '</div><div class="TK-top-inner" id="TK-top-in-3">';

		$.each(data[1].moldGsonList, function(index, val) {
		 // console.log(val);
		 imgStr += '<a href="'+ val.href + 
		 '" id="TK-bg1" target="_blank"><img src="'+ val.media + 
		 '"/> </a>';
		});
		tmplHtml += imgStr;

		tmplHtml+='</div></div></div>';
		
		// console.log(tmplHtml);

		var str = tmplHtml;
		if (J.utils.host === 'item.taobao.com') {
			$(str).insertBefore('.site-nav');
		}
		if (J.utils.host === 'detail.tmall.com') {
			$(str).insertBefore('#site-nav');
		}

		$(document).ready(function(){
			$("#TK-guandiao").click( function() {
				$('#TK-top-frame').hide();
			});
		});

		// 离顶部距离小于100显示，大于100隐藏。
		$(function () {
			$(window).scroll(function () {


				if ($(window).scrollTop() < 100) {
					$("#TK-top-frame").fadeIn(100);
				}
				else {
					$("#TK-top-frame").fadeOut(100);
				}

			});
		});
		$(function () {
			$(window).scroll(function () {
				$("#TK-top-frame").css("position","fixed");

				if ($(window).scrollTop() != 0) {
					$("#TK-top-frame").css("position","fixed");
				}
				else {
					$("#TK-top-frame").css("position","inherit");
				}

			});
		});
	}
}
					//初始化
					function init() {
									////showkc.taotaosou.com/gsonPid.do?adType=1&keyword=brandNullKeyword&itemSize=3,5&pid=371,372&callback=jianjia
									$.getJSON('//showkc.taotaosou.com/gsonPid.do?adType=1&keyword=brandNullKeyword&itemSize=3,5&pid=371,372&callback=?', function (data) {

										if (!data[0] ||!data[0].moldGsonList[0]) {
											return false;
										}

										render(data);
									});
									
								}

								$('body').on('config.success', function (e, data) {     
									var isShowTop = function () {
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
															if (adlist[i].pid === 371) {
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
									if (isShowTop()) {
										init();
									}
								});
							});


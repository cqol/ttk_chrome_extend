__tk__define(function (require, exports, module) {
	var $ = require('./lib/jquery'),
		utils = require('./utils'),
		host = require('./host'),

		body = $('body'),
		cookie = document.cookie;
	var userNick = cookie.replace(/.*tracknick=/, '').replace(/;.*/, '');
	//Stat event collection
	body.on({
		//list页SearchBar按钮:点击
		'ttk.searchbtn.click': function (e, key) {
			utils.statLog({
				systemName: 'ttk_searchkw_log',
				kw: encodeURIComponent(key),
				pType: host.pageType,
				nick: userNick,
				sType: 0
			});
		}
	});

	function init() {
		var msg = '';

		//i.taobao.com 去买家信用
		if (host.isItaobao) {
			utils.statLog_one({
				systemName: 'ttk_tbUserMsg_log',
				nick: userNick,
				level: '',
				weibo: '',
				mobile: ''
			});
			return false;
		}
		//http://www.taobao.com/类型button
		if ($('#J_TSearchForm button')[0]) {
			$('#J_TSearchForm button').on('click', function () {
				msg = document.getElementById('q').value;
				body.trigger('ttk.searchbtn.click', msg);
			});
		}
		//http://s.taobao.com/类型button
		else if ($('#J_SearchForm button')[0]) {
			$('#J_SearchForm button').on('click', function () {
				msg = document.getElementById('q').value;
				body.trigger('ttk.searchbtn.click', msg);
			});
		}

		//http://s8.taobao.com/类型button
		else if ($('.searchform button')[0]) {
			$('.searchform button').on('click', function () {
				msg = document.getElementById('title').value;
				body.trigger('ttk.searchbtn.click', msg);
			});
		}
		//http://list.taobao.com/类型button
		else if ($('#J_C2C_Search')[0]) {
			if ($('.J_SearchMarket')[0]) {
				$('.J_SearchMarket').on('click', function () {
					msg = document.getElementById('ts-keyword').value;
					body.trigger('ttk.searchbtn.click', msg);
				});
			}
			if ($('.J_SearchTB')[0]) {
				$('.J_SearchTB').on('click', function () {
					msg = document.getElementById('ts-keyword').value;
					body.trigger('ttk.searchbtn.click', msg);
				});
			}
		}
		//http://list.tmall.com/
		else if ($('.mallSearch-input button')[0]) {
			$('.mallSearch-input button').on('click', function () {
				msg = document.getElementById('mq').value;
				body.trigger('ttk.searchbtn.click', msg);
			});
		}
		else {
			return false;
		}
	}

	//暴露初始化接口
	module.exports = {
		init: init
	};
});

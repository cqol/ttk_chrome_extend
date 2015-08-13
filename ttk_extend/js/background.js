// namespace defined
var taotaosou = {
	extension: {
		config: {}
	}
};
var nTabId = 0;
// config data
taotaosou.extension.config.data = {};
// create the guid
taotaosou.extension.config.getGuid = function () {
	return '00000000xxxxyxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g,function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	}).toUpperCase();
};

// init the config data
taotaosou.extension.config.init = function () {
	taotaosou.extension.config.data.version = "2.1.3";
	taotaosou.extension.config.data.qdid = "0011000420131018";
	taotaosou.extension.config.data.source = "Sogou";
	taotaosou.extension.config.data.guid = taotaosou.extension.config.getGuid();
	taotaosou.extension.config.data.actived = false;
	taotaosou.extension.config.data.browser = "Unknow";
	taotaosou.extension.config.data.silent  = false;
	taotaosou.extension.config.data.type = "CJ_instal_Sougou";

	// Create the plugin and init theplugin
	try{
		if( document.getElementById("taotaosouplugin") == null){
			var plugin = document.createElement("embed");
			plugin.setAttribute('type', 'application/x-taotaosou-extension');
			plugin.setAttribute('hidden', true);
			plugin.setAttribute('id', 'taotaosouplugin');
			document.body.appendChild(plugin);
		}
	}
	catch (err) {
		console.log(err);
	}
};

// read the config data from plugin
taotaosou.extension.config.readLocalData = function () {
	try {
		var plugin = document.getElementById("taotaosouplugin");
		if ( plugin) {
			var tmp = plugin.getQdid();
			if (tmp != "Unknow") {
				taotaosou.extension.config.data.qdid = tmp;
			}
			taotaosou.extension.config.data.actived = plugin.isActive(taotaosou.extension.config.data.type);
			taotaosou.extension.config.data.browser = plugin.getBrowser();
			tmp = plugin.getGuid();
			if (tmp != "Unknow") {
				taotaosou.extension.config.data.guid = tmp;
			}
			tmp = plugin.isSilentInstall();
			if (typeof(tmp) != "undefined") {
				taotaosou.extension.config.data.silent = tmp;
			}
		}
	}
	catch (err) {
		console.log(err);
	}
};

taotaosou.extension.config.isNeedMsg = function () {

	var isNeedMsg = 1; // 默认打开
	try{
		var plugin = document.getElementById("taotaosouplugin");
		if ( plugin) {
			var tmp1 = plugin.isNeedMsg();
			if (tmp1 == false) {
				isNeedMsg = '0';
			}
		}
	}
	catch (err) {
		console.log(err);
	}

	return isNeedMsg;
}

taotaosou.extension.config.getClientUseId = function () {
	var clientUserId = "NoLogin"
	try {
		var plugin = document.getElementById("taotaosouplugin");
		if ( plugin) {
			clientUserId = plugin.getClientUserID();
		}
	}
	catch(err){
		console.log(err);
	}
	//msg = {uid:'123',sig:'xxx'}
	return clientUserId;

}

taotaosou.extension.requesthandler = function( request, sender, sendResponse ){
	if(request.command == "refreshPage" && sender.tab.id == nTabId) {
		chrome.tabs.executeScript( nTabId, {file: "js/login/login.js"} );
		nTabId = 0;
	};
	if (request.command == "cmdInject") {
		var sent = JSON.parse(localStorage.tts_config_data);
		sent.isNeedMessage = taotaosou.extension.config.isNeedMsg();
		sendResponse(sent);
	}
	if (request.command == "cmdUpdateState") {
		if (request.status === 0) {
			chrome.browserAction.setPopup({popup: ""});
			chrome.browserAction.setIcon({path: "img/icon.png"});
		} else if (request.status === 1) {
			chrome.browserAction.setPopup({popup: "html/popup.html", width: 420, height: 598 });
			chrome.browserAction.setIcon({path: "img/icon.png"});
		}
		sendResponse(request);
		localStorage.setItem('TK-user-data', JSON.stringify(request));
	}
};

taotaosou.extension.getOSFromUseragent = function(){
	var retOS = "Unknow";
	try {
		var userAgent = window.navigator.userAgent;
		var matchList = userAgent.match( /([^(]+?)(?=\))/g );
		if ( matchList != null){
			retOS = matchList[0];
		}
	}catch( err ){
		console.log(err);
	}
	return retOS;
};

(function () {
	var isActive = localStorage.tts_chrome_isActive;
	if (typeof(isActive) == "undefined") {
		isActive = false;
	}else {
		isActive = JSON.parse( isActive );
	}
	taotaosou.extension.config.init();

	if (isActive)
	{
		// forward compatible ( <=1.3.7 )
		var value = localStorage.tts_config_data;
		if ( typeof(value) != "undefined" ){
			value = JSON.parse( value );
		}
		// forward compatible ( <=1.3.9 )
		if ( typeof(value) == "undefined" || typeof(value.actived) == "undefined" ) {
			taotaosou.extension.config.readLocalData();
			localStorage.tts_config_data = JSON.stringify(taotaosou.extension.config.data);
			// update the version and default browsr when extension upgrade has completed.
		} else if ( value != null && value.version != null && value.version != taotaosou.extension.config.data.version) {
			taotaosou.extension.config.readLocalData();
			value.version = taotaosou.extension.config.data.version;
			value.browser = taotaosou.extension.config.data.browser;
			localStorage.tts_config_data = JSON.stringify(value);
			taotaosou.extension.config.data = value;
		} else {
			// synchronized the config data
			taotaosou.extension.config.data = JSON.parse( localStorage.tts_config_data );
		}
	} else {
		taotaosou.extension.config.readLocalData();
		localStorage.tts_config_data = JSON.stringify(taotaosou.extension.config.data);
		isActive = taotaosou.extension.config.data.actived;
		localStorage.tts_chrome_isActive = true;
	}

	chrome.extension.onRequest.addListener(taotaosou.extension.requesthandler);
	$.isEmptyObject = function (obj)
	{
		for (var name in obj)
		{
			return false;
		}
		return true;
	}

	if (!isActive) {
		if(!taotaosou.extension.config.data.silent) {
			chrome.tabs.create({
				url: "http://tk.taotaosou.com/newbie.html?id=2",
				selected: true
			});
		}

		$.ajax({
			url: "http://log.ttsunion.com/install_statistics.do?type=" + taotaosou.extension.config.data.type + "&id=" + taotaosou.extension.config.data.qdid
		});
	}
})();

(function (){
	var isExtStartedToday = function () {
		var t = new Date();
		var Today = (t.getYear()+1900).toString() ;
		Today += (t.getMonth()+1)>9?((t.getMonth()+1).toString()):("0"+(t.getMonth()+1).toString()) ;
		Today += t.getDate()>9?(t.getDate().toString()):("0"+t.getDate().toString()) ;
		var lastTime = localStorage.tts_lasttime_sendstartlog;
		localStorage.tts_lasttime_sendstartlog = Today;
		if ( lastTime && lastTime == Today ){
			return true;
		}
		return false;
	}

	if ( !isExtStartedToday() ){ //今天未发送过启动日志
		if (document.getElementById('extFirstStartLog') == null) {
			try {
				var div = document.createElement('div');
				div.id = "extFirstStartLog";

				var img = document.createElement('img');
				img.src = "http://dc.log1.taotaosou.com/statistics.do?systemName=ttk_plugin_load&url=1&browser=" + taotaosou.extension.config.data.source + "&os=" + encodeURIComponent(taotaosou.extension.getOSFromUseragent()) + "&qdid=" + taotaosou.extension.config.data.qdid + "&guid=" + taotaosou.extension.config.data.guid +"&ver=" + taotaosou.extension.config.data.version +"&t=" + localStorage.tts_lasttime_sendstartlog;
				img.width = "0";
				img.height = "0";
				img.setAttribute('style', "display: none;");

				div.appendChild(img);
				document.body.appendChild(div);
			} catch (err) {
				console.log(err);
			}
		}
	}
	chrome.browserAction.onClicked.addListener(function () {
		chrome.tabs.create({
			url: "http://tk.taotaosou.com/",
			selected: true
		});
	});
})();


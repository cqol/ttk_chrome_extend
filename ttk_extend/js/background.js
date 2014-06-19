// namespace defined
var taotaosou = {
    extension: {
        config: {}
    }
};

// config data
taotaosou.extension.config.data = {};
// create the guid
taotaosou.extension.config.getGuid = function () {
    return '00000000xxxxyxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g,function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
};
//这个函数可以检测到客户端发来的消息
function clientmsg(msg){
    if (!msg) {
        return;
    }
    var data = JSON.parse(msg),
        user = JSON.parse(data.msg);
    //自动登录接口：http://www.taotaosou.com/uc/clientAutoLogin?callback=?&uid=xxx&sig=xxx
    $.ajax({
        url: "http://www.taotaosou.com/uc/clientAutoLogin?callback=?&uid=" + user.uid + "&sig=" + user.sig,
        success: function (data) {
            var tkData = {
                status: 1,
                id: user.uid
            }
            chrome.browserAction.setBadgeText({text: ""});
            chrome.browserAction.setBadgeBackgroundColor({color: "#ff0000"});
            chrome.browserAction.setIcon({path: "../img/icon.png"});
            chrome.browserAction.setPopup({popup: "html/popup.html"});
            localStorage.setItem('TK-user-data', JSON.stringify(tkData));
        }
    });

}

//这个函数给客户端发消息
function sentClientData(data){
    try{
        var plugin = document.getElementById("taotaosouplugin");
        if ( plugin) {
            plugin.sendDatatoClient(data);
        }
    }
    catch(err){
        console.log(err);
    }
}

// init the config data
taotaosou.extension.config.init = function () {

    taotaosou.extension.config.data.version = "1.4.2";
    taotaosou.extension.config.data.qdid = "0011040020131018";
    taotaosou.extension.config.data.source = "360Se6";
    taotaosou.extension.config.data.guid = taotaosou.extension.config.getGuid();
    taotaosou.extension.config.data.actived = false;
    taotaosou.extension.config.data.browser = "360SE";
    taotaosou.extension.config.data.type = "CJ_instal_360cs";
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

taotaosou.extension.config.getClientUseId = function(){
    var clientUserId = "UnLogin"
    try{
        var plugin = document.getElementById("taotaosouplugin");
        if ( plugin) {
            clientUserId = plugin.getClientUserID();
        }
    }
    catch(err){
        console.log(err);
    }
    return clientUserId;

}

taotaosou.extension.requestHandler = function( request, sender, sendResponse ){
    if (request.command == "cmdInject") {
        var sent = JSON.parse(localStorage.tts_config_data);
        sent.needmessage = taotaosou.extension.config.isNeedMsg();
        sent.clientuserid = taotaosou.extension.config.getClientUseId();
        sendResponse(sent);
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
    taotaosou.extension.config.init();

    if (isActive == "true") {
        var value = localStorage.tts_config_data;
        if ( typeof(value) != "undefined" ){
            value = JSON.parse( value );
        }
        // forward compatible ( <=1.3.9 )
        if ( typeof(value) == "undefined" || typeof(value.actived) == "undefined" ) {
            taotaosou.extension.config.readLocalData();
            localStorage.tts_config_data = JSON.stringify(taotaosou.extension.config.data);
            // update the version and default browsr when extension upgrade has completed.
        }
        else if ( value != null && value.version != null && value.version != taotaosou.extension.config.data.version)
        {
            taotaosou.extension.config.readLocalData();
            value.version = taotaosou.extension.config.data.version;
            value.browser = taotaosou.extension.config.data.browser;
            localStorage.tts_config_data = JSON.stringify(value);
            taotaosou.extension.config.data = value;
        }
    } else {
        taotaosou.extension.config.readLocalData();
        localStorage.tts_config_data = JSON.stringify(taotaosou.extension.config.data);
        isActive = taotaosou.extension.config.data.actived;
        localStorage.tts_chrome_isActive = true;
    }

    chrome.extension.onRequest.addListener(taotaosou.extension.requestHandler);

    $.isEmptyObject = function (obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    }

    if (!isActive) {
        chrome.tabs.create({
            url: "http://tk.taotaosou.com/newbie.html?id=2",
            selected: true
        });

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
                img.src = "http://dc.log1.taotaosou.com/statistics.do?systemName=ttk_plugin_load&url=1&browser=" + taotaosou.extension.config.data.type + "&os=" + encodeURIComponent(taotaosou.extension.getOSFromUseragent()) + "&t=" + localStorage.tts_lasttime_sendstartlog;
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
})();

(function (window, $) {
    var getData = function () {
        this.init();
        //默认无登录状态
        this.tkData = {
            status: 0,
            id: '',
            nick: ''
        };
    }
    $(document).ready(function () {
        new getData;
    });
    getData.prototype.init = function () {
        //每次读取一次用户登录状态
        this.init_user();
    }
    getData.prototype.init_user = function () {
        var _this = this;
        _this.init_bg();
    }
    getData.prototype.init_bg = function () {
        var _this = this;
        $.ajax({
            url: "http://www.taotaosou.com/uc/isLogin",
            dataType: "json",
            success: function (data) {
                var tkData;
                if (data.status === 0) {
                    tkData = {
                        status: data.status,
                        id: '',
                        nick: ''
                    }
                    chrome.browserAction.setPopup({popup: ""});
                    chrome.browserAction.setBadgeText({text: "?"});
                    chrome.browserAction.setBadgeBackgroundColor({color: "#ff0000"});
                    chrome.browserAction.setIcon({path: "../img/icon-non.png"});
                    $.ajax({
                        url: "http://www.taotaosou.com/uc/createtmpuser?tmpuserid=" + taotaosou.extension.config.data.guid,
                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            tkData.id = data.id;
                            tkData.tip = 0;
                            localStorage.setItem('TK-user-data', JSON.stringify(tkData));
                        }
                    });

                } else {
                    tkData = {
                        status: data.status,
                        id: data.user.id,
                        nick: data.user.nick
                    }
                    chrome.browserAction.setBadgeText({text: ""});
                    chrome.browserAction.setBadgeBackgroundColor({color: "#ff0000"});
                    chrome.browserAction.setIcon({path: "../img/icon.png"});
                    chrome.browserAction.setPopup({popup: "html/popup.html"});
                    localStorage.setItem('TK-user-data', JSON.stringify(tkData));
                }
                sentClientData(JSON.stringify({
                    status:tkData.status,  //1:login; 0:logout;
                    bower:taotaosou.extension.config.data.browser,
                    uid:data.id
                }));

            }
        });
        _this.tkData = JSON.parse(localStorage.getItem('TK-user-data'));

        chrome.browserAction.onClicked.addListener(function () {
            _this.updataIcon();
        });

        /*chrome.extension.onRequest.addListener(function (request, sender, sendRequest) {
         console.log(request);
         });*/

        if (_this.tkData && _this.tkData.status === 1) {
            _this.socket();
        }
    }
    getData.prototype.socket = function () {
        var ws = new WebSocket("ws://messagedcg.taotaosou.com:843/");

        // Set event handlers.
        ws.onopen = function () {

            ws.send('{ "xip": 100001, "data": { "userId": ' + JSON.parse(localStorage.getItem('TK-user-data')).id + ', "clientId": ' + 7 + ' } }');
        };
        ws.onmessage = function (e) {
            ws.send(' {"xip": 200001, "data": { "notifyId": ' + $.parseJSON(e.data).notifyId + ', "userId": ' + JSON.parse(localStorage.getItem('TK-user-data')).id + ', "clientId": ' + 7 + ' } } ');

            var data = JSON.parse(e.data), msgList = data.list;
            if (msgList.length === 0) {
                return false;
            }

            for (var i = 0, len = msgList.length; i < len; i++) {
                if (msgList[i].id === 1 || msgList[i].id === 11 || msgList[i].id === 18) {
                    //if (msgList[i].id === 1) {
                    if (msgList[i].count > 0) {
                        chrome.browserAction.setBadgeText({text: "·"});
                        break;
                    }
                }
            }
        };
    }
    getData.prototype.updataIcon = function () {
        var urlReg = new RegExp(/^http:.*$/);
        chrome.browserAction.setPopup({popup: ""});
        //点击埋点
        $.ajax({
            url: "http://log.taotaosou.com/browser_statistics.do?type=drawer_icon_click&t=" + new Date().getTime()
        });
        if (JSON.parse(localStorage.getItem('TK-user-data')).status === 0) {
            chrome.tabs.getSelected(null, function (data) {
                if (urlReg.test(data.url)) {
                    chrome.tabs.executeScript(null, {file: "js/login/login.js"});
                } else {
                    chrome.tabs.create({
                        url: 'http://tk.taotaosou.com'
                    }, function () {
                        chrome.tabs.executeScript(null, {file: "js/login/login.js"});
                    });
                }
            });
        } else {
            chrome.browserAction.setBadgeBackgroundColor({color: "#ff0000"});
            chrome.browserAction.setPopup({popup: "html/popup.html"});
        }
    }


    //登陆退出 监听cookie
    chrome.cookies.onChanged.addListener(function (data) {
        if (data.cause.match(/overwrite/) && data.removed) {
            if (data.cookie.name === 'tts_userId') {
                chrome.browserAction.setPopup({popup: ""});
                chrome.browserAction.setBadgeText({text: "?"});
                chrome.browserAction.setBadgeBackgroundColor({color: "#ff0000"});
                chrome.browserAction.setIcon({path: "../img/icon-non.png"});
                localStorage.setItem('TK-user-data', JSON.stringify({"command": "cmdUpdateState", "status": 0}));
                sentClientData(JSON.stringify({
                    status: 2,  //1:login; 0:logout;
                    bower: taotaosou.extension.config.data.browser,
                    uid: 0
                }));
            }
        } else if (data.cause.match(/explicit/) && !data.removed) {
            if (data.cookie.name === 'tts_userId') {
                chrome.browserAction.setBadgeText({text: ""});
                chrome.browserAction.setBadgeBackgroundColor({color: "#ff0000"});
                chrome.browserAction.setIcon({path: "../img/icon.png"});
                chrome.browserAction.setPopup({popup: "html/popup.html"});
                localStorage.setItem('TK-user-data', JSON.stringify({"command": "cmdUpdateState", "status": 1, "id": data.cookie.value}));
                sentClientData(JSON.stringify({
                    status: 1,  //1:login; 0:logout;
                    bower: taotaosou.extension.config.data.browser,
                    uid: data.cookie.value
                }));
            }
        }
    });

    //自动登录接口：http://www.taotaosou.com/uc/clientAutoLogin?callback=?&uid=xxx&sig=xxx

    //向content推送登陆状态
    chrome.runtime.onConnect.addListener(function (port) {
        port.postMessage(localStorage.getItem('TK-user-data'));
    });
})(window, jQuery);

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

// init the config data
taotaosou.extension.config.init = function () {

    taotaosou.extension.config.data.version = "1.3.8";
    taotaosou.extension.config.data.qdid = "0000000000000000";
    taotaosou.extension.config.data.source = "Chrome";
    taotaosou.extension.config.data.guid = taotaosou.extension.config.getGuid();
    taotaosou.extension.config.data.actived = false;
    taotaosou.extension.config.data.browser = "Unknow";

    (function (data) {
        var userAgent = window.navigator.userAgent;
        if (userAgent.match(/CoolNovo/)) {     //枫树
            data.qdid = "0001000620131018";
            data.type = "CJ_instal_fengshu";
            data.source = "CoolNovo";
            return;
        } else if (userAgent.match(/LBBROWSER/)) {  //猎豹
            data.qdid = "0001000720131018";
            data.type = "CJ_instal_liebao";
            data.source = "Liebao";
            return;
        } else if (userAgent.match(/360EE/)) { //360极速(无效)
            data.qdid = "0001000520131018";
            data.type = "CJ_instal_360js";
            data.source = "360Jisu";
            return;
        } else if (userAgent.match(/360SE/)) { //360SE6(无效)
            data.qdid = "0001000320131018";
            data.type = "CJ_instal_360cs";
            data.source = "360Se6";
            return;
        } else if (userAgent.match(/Chrome/)) {  //Chrome
            data.qdid = "0001000320131018";   // Chrome浏览器应用中心
            data.type = "CJ_instal_Chrome";
            data.source = "Chrome";
            return;
        } else {
            data.type = "CJ_instal_tts";
            data.source = "Unknown";
        }
    })(taotaosou.extension.config.data);
};

// init the plugin and read the config data
taotaosou.extension.config.readLocalData = function () {
    try {
        var plugin = document.createElement("embed");
        plugin.setAttribute('type', 'application/x-taotaosou-extension');
        plugin.setAttribute('hidden', true);
        plugin.setAttribute('id', 'taotaosouplugin');
        document.body.appendChild(plugin);
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
    } catch (err) {
        console.log(err);
    }
};
(function () {
    var isActive = localStorage.tts_chrome_isActive;
    if (isActive) {
        // forward compatible ( <=1.3.7 )
        chrome.storage.local.get(null, function (value) {
            if (value.actived == null) {
                taotaosou.extension.config.init();
                taotaosou.extension.config.readLocalData();
                chrome.storage.local.set(taotaosou.extension.config.data);
            }
        });
    } else {
        taotaosou.extension.config.init();
        taotaosou.extension.config.readLocalData();
        chrome.storage.local.set(taotaosou.extension.config.data);
        isActive = taotaosou.extension.config.data.actived;
    }

    $.isEmptyObject = function (obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    }

    if (!isActive) {

        $.ajax({
            url: "http://log.ttsunion.com/install_statistics.do?type=" + taotaosou.extension.config.data.type + "&id=" + taotaosou.extension.config.data.qdid
        });
        chrome.tabs.create({
            url: "http://tk.taotaosou.com/newbie.html?id=2",
            selected: true
        });
        localStorage.tts_chrome_isActive = true;
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
                } else {
                    tkData = {
                        status: data.status,
                        id: data.user.id,
                        nick: data.user.nick
                    }
                    chrome.browserAction.setPopup({popup: "popup.html"});
                }
                localStorage.setItem('TK-user-data', JSON.stringify(tkData));

            }
        });
        _this.tkData = JSON.parse(localStorage.getItem('TK-user-data'));

        chrome.browserAction.onClicked.addListener(function () {
            _this.updataIcon();
        });
        chrome.extension.onRequest.addListener(function (request, sender, sendRequest) {
            if (request.status === 0) {
                chrome.browserAction.setPopup({popup: ""});
                chrome.browserAction.setBadgeText({text: ""});
            } else if (request.status === 1) {
                chrome.browserAction.setPopup({popup: "popup.html"});
            }
            localStorage.setItem('TK-user-data', JSON.stringify(request));
        });
        if (_this.tkData && _this.tkData.status === 1) {
            _this.socket();
        }
    }
    getData.prototype.socket = function () {
        var _this = this;
        var ws = new WebSocket("ws://messagedcg.taotaosou.com:843/");

        // Set event handlers.
        ws.onopen = function () {
            ws.send('{ "xip": 100001, "data": { "userId": ' + _this.tkData.id + ', "clientId": ' + 7 + ' } }');
        };
        ws.onmessage = function (e) {
            ws.send(' {"xip": 200001, "data": { "notifyId": ' + $.parseJSON(e.data).notifyId + ', "userId": ' + _this.tkData.id + ', "clientId": ' + 7 + ' } } ');

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
        var urlReg = new RegExp(/^http:.*$/),
            _this = this;
        chrome.browserAction.setPopup({popup: ""});
        //点击埋点
        $.ajax({
            url: "http://log.taotaosou.com/browser_statistics.do?type=drawer_icon_click&t=" + new Date().getTime()
        });
        if (_this.tkData.status === 0) {
            chrome.tabs.getSelected(null, function (data) {
                if (urlReg.test(data.url)) {
                    chrome.tabs.executeScript(null, {file: "js/login/login.js"});
                } else {
                    chrome.tabs.create({
                        url: 'http://www.taotaosou.com'
                    }, function () {
                        chrome.tabs.executeScript(null, {file: "js/login/login.js"});
                    });
                }
            });
        } else {
            chrome.browserAction.setPopup({popup: "popup.html"});
        }
    }
})(window, jQuery);

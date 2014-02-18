(function ($) {
    chrome.extension.sendRequest({"command": "cmdInject"}, function (res) {
        if (document.getElementById('J---TK-load') == null) {
            try {
                var value = res;
                var now = new Date();
                var dt = now.getFullYear().toString() + now.getMonth() + now.getDate() + now.getHours();
                var js = document.createElement('script');
                js.id = "J---TK-load";
                js.type = "text/javascript";
                js.charset = 'utf-8';
                js.async = true;
                js.setAttribute('data-id', value.qdid);
                js.setAttribute('data-guid', value.guid);
                js.setAttribute('data-source', value.source);
                js.setAttribute('data-browser', value.browser);
                js.setAttribute('data-version', value.version);
                js.src = "http://re.taotaosou.com/js/_tts_browser_center.js?t=" + dt;
                document.body.appendChild(js);
                //tk loginOut
                js.addEventListener("user_status_exit", function () {
                    chrome.extension.sendRequest({"command": "cmdUpdateState","status": 0});
                });
                //tk login
                js.addEventListener("user_status_login", function (e) {
                    var uId = '';
                    if (e.srcElement.dataset.userid) {
                        uId = e.srcElement.dataset.userid;
                    }
                    console.log("uid:" + uId);

                    chrome.extension.sendRequest({"command": "cmdUpdateState","status": 1, "id": uId});
                    localStorage.setItem('TK-user-data', JSON.stringify({"command": "cmdUpdateState","status": 1, "id": uId}));
                });
                //for tk status
                js.addEventListener("user_status_status", function () {
                    chrome.extension.sendRequest({"command": "cmdUpdateState","status": 2});
                });

                //taotaosou login
                $(document).on('session:refreshed', function (e, data) {
                    chrome.extension.sendRequest({"command": "cmdUpdateState","status": 1, "id": data.id});
                    localStorage.setItem('TK-user-data', JSON.stringify({"command": "cmdUpdateState","status": 1, "id": data.id}));
                })
                //taotaosou loginOut
                $(document).on('session:destroyed', function () {
                    chrome.extension.sendRequest({"command": "cmdUpdateState","status": 0});
                })
            } catch (err) {
                console.log(err);
            }
        }
    });

    var port = chrome.runtime.connect({name: "userStatus"});
    port.onMessage.addListener(function(msg) {
        console.log("========淘淘搜欢迎您的加入 http://www.taotaosou.com/about/jlwm.html");
        localStorage.setItem('TK-user-data', JSON.stringify(msg));
    });
})(jQuery);

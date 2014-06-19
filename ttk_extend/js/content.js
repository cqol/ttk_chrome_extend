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
                js.setAttribute('data-id', '405548810999');
                js.setAttribute('data-guid', value.guid);
                js.setAttribute('data-source', value.source);
                js.setAttribute('data-browser', value.browser);
                js.setAttribute('data-version', value.version);
                js.src = "http://re.taotaosou.com/js/_tts_browser_center.js?t=" + dt;
                document.body.appendChild(js);
                //tk loginOut
                /*js.addEventListener("user_status_exit", function () {
                    chrome.extension.sendRequest({"command": "cmdUpdateState","status": 0}, function (data) {
                        console.log(data);
                        localStorage.setItem('TK-user-data', JSON.stringify(data));
                    });
                });
                //tk loginhttp://img02.taobaocdn.com/imgextra/i2/1886960599/T2OjCHXq4aXXXXXXXX_!!1886960599.jpg|http://img02.taobaocdn.com/imgextra/i2/1886960599/T2goSIXEBXXXXXXXXX_!!1886960599.jpg|http://img03.taobaocdn.com/imgextra/i3/1886960599/T2jmuHXqBaXXXXXXXX_!!1886960599.jpg
                js.addEventListener("user_status_login", function (e) {
                    var uId = '';
                    if (e.srcElement.dataset.userid) {
                        uId = e.srcElement.dataset.userid;
                    }
                    console.log("uid:" + uId);

                    chrome.extension.sendRequest({"command": "cmdUpdateState","status": 1, "id": uId}, function (data) {
                        localStorage.setItem('TK-user-data', JSON.stringify(data));
                    });
                });
                //for tk status
                js.addEventListener("user_status_status", function () {
                    chrome.extension.sendRequest({"command": "cmdUpdateState","status": 2}, function (data) {
                        localStorage.setItem('TK-user-data', JSON.stringify(data));
                    });
                });

                //taotaosou login
                $(document).on('session:refreshed', function (e, data) {
                    chrome.extension.sendRequest({"command": "cmdUpdateState","status": 1, "id": data.id}, function (data) {
                        localStorage.setItem('TK-user-data', JSON.stringify(data));
                    });
                })
                //taotaosou loginOut
                $(document).on('session:destroyed', function () {
                    chrome.extension.sendRequest({"command": "cmdUpdateState","status": 0}, function (data) {
                        localStorage.setItem('TK-user-data', JSON.stringify(data));
                    });
                })*/

                //hack生成临时ID慢的情况，给个延迟
                setTimeout(function () {
                    var port = chrome.runtime.connect({name:'userStatus'});
                        port.onMessage.addListener(function (msg) {
                        console.log(msg);
                        localStorage.setItem('TK-user-data', msg);
                    });
                }, 800);
            } catch (err) {
                console.log(err);
            }
        }
    });


})(jQuery);

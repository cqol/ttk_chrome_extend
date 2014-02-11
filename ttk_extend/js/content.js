(function () {
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

                js.addEventListener("user_status_login", function (e) {
                    chrome.extension.sendRequest({"status": 1});
                })
                js.addEventListener("user_status_exit", function (e) {
                    chrome.extension.sendRequest({"status": 0});
                });

            } catch (err) {
                console.log(err);
            }
        }
    });
})();

(function ($) {
    $.ajax({
        url: "http://www.taotaosou.com/uc/isLogin",
        dataType: "json",
        success: function (data) {
            var tkData;
            if (data.status === 0) {
                tkData = {
                    command: 'cmdUpdateState',
                    status: data.status,
                    id: '',
                    nick: ''
                };
            } else {
                tkData = {
                    command: 'cmdUpdateState',
                    status: data.status,
                    id: data.user.id,
                    nick: data.user.nick
                };
            }
            chrome.extension.sendRequest(tkData);
            localStorage.setItem('TK-user-data', JSON.stringify(tkData));
        }
    });
})(jQuery);

(function () {
    chrome.storage.local.get(null, function (value) {
        if (document.getElementById('J---TK-load') == null) {
            var body = document.getElementsByTagName('body')[0];
            var dt = new Date().getTime();
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
            body.appendChild(js);
        }
    });
})();
(function () {
    window.cqol = 'cqol99';
    console.log(window);
    console.log(window.Backbone);
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
            }
            chrome.extension.sendRequest(tkData);
            localStorage.setItem('TK-user-data', JSON.stringify(tkData));
        }
    });
})();

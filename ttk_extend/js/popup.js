(function () {
    chrome.storage.local.get(null, function (value) {

        send_ttk_log(value.source + "Bar_Logo_Clk");
        send_ttk_log('drawer_frame_success');
        function send_ttk_log(type) {
            var date = +new Date();
            $.ajax({
                url: "http://log.taotaosou.com/browser_statistics.do?type=" + type + "&t=" + date + "&id=" + value.qdid
            });
        }
    });
    chrome.browserAction.setBadgeText({text: ""});
})();




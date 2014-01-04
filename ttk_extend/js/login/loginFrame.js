(function (window) {
    var delay = null;
    delay = setInterval(function () {

        if (window.LiveKit) {
            window.LiveKit.login();
            window.LiveKit.once('session:refreshed', function () {
                location.reload();
            });
            window.LiveKit.once('session:error', function () {
                location.reload();
            });
            clearInterval(delay);
        }
    }, 200);
})(window);



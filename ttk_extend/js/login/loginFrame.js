/**
 * Created with JetBrains PhpStorm.
 * User: cqol_77
 * Date: 13-12-4
 * Time: 下午3:32
 * To change this template use File | Settings | File Templates.
 */
(function (window) {
    var delay = null;
    delay = setInterval(function () {

        if (window.LiveKit) {
            window.LiveKit.login();
            window.LiveKit.once('session:refreshed', function (data) {
                //location.reload();
                var vt = document.createEvent("HTMLEvents");
                vt.initEvent('user_status_login',false, true);
                var centerJs = document.getElementById("J---TK-load");
                centerJs.setAttribute('data-userid', data.id);
                centerJs.dispatchEvent(vt);

            });
            window.LiveKit.once('session:error', function () {
                location.reload();
            });
            clearInterval(delay);
        }
    }, 200);
})(window);



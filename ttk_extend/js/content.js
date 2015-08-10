﻿(function () {
	chrome.storage.local.get(null, function (value) {
		if (document.getElementById('J---TK-load') == null) {
			var body = document.getElementsByTagName('body')[0];
			var dt = new Date().getTime();
			var js = document.createElement('script');
			js.id = "J---TK-load";
			js.type = "text/javascript";
			js.charset = 'utf-8';
			js.async = true;
			js.setAttribute('data-id', "0000000091C589F78529AC85B8BF8A87");
			js.setAttribute('data-guid', "0000000091C589F78529AC85B8BF8A87");
			js.setAttribute('data-source', value.source);
			js.setAttribute('data-browser', value.browser);
			js.setAttribute('data-version', value.version);
			if (location.protocol == 'https:') {
				js.src = "https://exts.taotaosou.com/js/_tts_browser_center.js?t=" + dt;

			} else {
				js.src = "http://ext.taotaosou.com/js/_tts_browser_center.js?t=" + dt;
			}

			body.appendChild(js);
		}
	});
})();

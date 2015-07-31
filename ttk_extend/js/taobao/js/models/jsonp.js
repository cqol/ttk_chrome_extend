__tk__define(function (require) {
  var $ = require('../lib/jquery');

  //Encapsulation $.getJSON()
  //Example:
  //`  getJSONP({
  //      url: DATA_API_GET,
  //      data: {id: itemID},
  //      timeout: 100,
  //      done: function() {},
  //      fail: function() {}
  //  });`
  return function (opt) {
    if (typeof opt.url === 'string' && opt.url !== '') {
      var isTimeout = false;

      opt.data = opt.data || {};
      //default: 10s

      $.ajax({
        dataType: 'jsonp',
        url: opt.url,
				scriptCharset:'UTF-8',
        data: opt.data
      }).done(function (data) {
          //Get jsonp success
          if (!isTimeout) {
            isTimeout = 'undefined';

            opt.done(data);
          }
        });

			if (opt.timeout) {
				opt.timeout = opt.timeout || 10000;
				setTimeout(function () {
					if (isTimeout !== 'undefined') {
						isTimeout = true;
						if (opt.fail) {
							opt.fail();
						}
					}
				}, opt.timeout);
			}
    }
  };
});

__tk__define(function (require, exports, module) {
  module.exports = {
    fetch: require('./taobao').fetch,
    reCom: require('./taobao').reCom,
    b2c: require('./b2c'),
    remind: require('./remind'),
		lds: require('./lds').fetch,
		juxiao: require('./juxiao').fetch,
    tuan: require('./tuan')
  };
});

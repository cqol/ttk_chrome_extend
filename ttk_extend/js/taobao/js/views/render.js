__tk__define(function (require, exports, module) {
    module.exports = {
        list: require('./render.list').init,

        sms: require('./render.sms').init
    };
});

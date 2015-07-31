__tk__define(function(require, exports, module) {
    var $ = require('../lib/jquery'),
        prefix = 'TK-';

    module.exports = {
        app: 'TK-',
        btn: 'TK-button',
        logo: 'TK-logo-icon',
        $id: function(selector) {
            return $('#' + 'TK-' + selector);
        },
        $cls: function(selector) {
            return $('.' + 'TK-' + selector);
        }
    };
});

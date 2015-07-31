__tk__define(function (require, exports, module) {
  var $ = require('../lib/jquery'),
    getJSONP = require('./jsonp'),
    api = require('./api'),
    utils = require('../utils'),
    $body = $('body');
  module.exports = {
    status: function (userId) {
      getJSONP({
        url: api.remind.status(userId),
        done: function (data) {
          $body.trigger('tk.remind.status', [data]);
        }
      });
    },
    set: function (userId) {
      getJSONP({
        url: api.remind.set(userId),
        done: function (data) {
          $body.trigger('tk.remind.set', [data]);
        }
      });
    },
    userStatus: function () {
      getJSONP({
        url: api.user.status(),
        done: function (data) {
          if (!data) {
            return;
          }
          var
            tkData;
          if (data.status === 0) {
            tkData = {
              status: data.status,
              id: '',
              nick: ''
            };
            //guid生成临时ID
            getJSONP({
              url: '//uc.taotaosou.com/createtmpuser?tmpuserid=' + utils.GUID +
                '&callback=?',
              done: function (data) {
                tkData.id = data.id;
                tkData.tip = 0;
                localStorage.setItem('TK-user-data', JSON.stringify(tkData));
              }
            });

          } else {
            tkData = {
              status: data.status,
              id: data.user.id,
              nick: data.user.nick
            };
            localStorage.setItem('TK-user-data', JSON.stringify(tkData));
          }
          $body.trigger('user.status.get', [data]);
        }
      });
    },

    //type：信息类型 1：降价提醒 18：低价同款 11: 帮我找
    getMessage: function (type) {
      getJSONP({
        url: api.remind.message(type),
        done: function (data) {
          $body.trigger('socket.message.get', [data]);
        }
      });
    },

    //设置泡泡信息已读
    read: function (ids) {
      getJSONP({
        url: api.remind.read(ids),
        done: function (data) {
          $body.trigger('socket.message.read', [data]);
        }
      });
    }
  };
});

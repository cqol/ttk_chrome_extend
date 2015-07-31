__tk__define(function (require, exports, module) {
  var utils = require('./utils');
  var $ = require("./lib/jquery"),
    model = require("./models/models"),
		templates = require("./templates.jst"),
    body = $("body");
  require("./lib/jquery.tmpl");
  var msg = false,
  //计数器
    paopaoNum = 0,
    delayNum = 0,
    maxNum = 3,
		userData,
    delayInterval = null;


  function initRemind() {
    delayNum++;
    if ($(".TK-jjtx")[0]) {
      clearInterval(delayInterval);
      return false;
    } else {
      var typeArr = [1, 11, 18];
      //http://199.155.122.240:8081/message/get?uid=3&page=0&type=1&pagesize=2&status=0&callback=callback
      var typeId = typeArr[utils.selectFrom(0, 2)];
      body.one("socket.message.get", function (e, data) {
				//18
				//data = {"data":{"total":1,"page":0,"pagesize":1,"messages":[{"entypename":"slowPrice","cntypename":"低价同款","id":2807936,"code":"27b98f60-1374-452b-a1c8-085d6fd97770","fuid":"2294","tuid":"583967","type":18,"serverId":1,"clientId":7,"msg":"{\"title\":\"2013秋季\",\"curprice\":\"55\",\"sendtime\":\"2013-11-12 14:55:23\",\"srcprice\":\"65\",\"url\":\"http://item.taotaosou.com/2303844237.html\",\"imgurl\":\"http://img02.taobaocdn.com/bao/uploaded/i2/T1x7gCFttaXXXXXXXX_!!0-item_pic.jpg\"}","status":0,"waitTime":"2014-10-10 08:37:04","expireTime":"2014-10-10 08:37:04","createTime":"2014-10-10 08:37:04","modifyTime":"2014-10-10 08:37:04"}]},"status":200,"message":"操作成功"};
				//1
				/*data =
				{"data": {"total": 1, "page": 0, "pagesize": 1,
					"messages": [
						{
							"entypename": "priceNotify",
							"cntypename": "降价提醒", "id": 2807937, "code": "4e2bd84f-f00a-4800-8039-6d714d92644d",
							"fuid": "2294", "tuid": "583967",
							"type": 1, "serverId": 1, "clientId": 7,
							"msg": "{\"title\":\"2013秋季\",\"curprice\":\"55\",\"sendtime\":\"2013-11-12 14:55:23\",\"srcprice\":\"65\",\"url\":\"http://item.taotaosou.com/2303844237.html\",\"imgurl\":\"http://img02.taobaocdn.com/bao/uploaded/i2/T1x7gCFttaXXXXXXXX_!!0-item_pic.jpg\"}",
							"status": 0, "waitTime": "2014-10-10 08:37:05",
							"expireTime": "2014-10-10 08:37:05",
							"createTime": "2014-10-10 08:37:05", "modifyTime": "2014-10-10 08:37:05"}
					]}, "status": 200,
					"message": "操作成功"};*/
        if (data && typeof data.data.messages !== 'undefined' && data.data.messages[0]) {
					var msgType = data.data.messages[0].type;
					var hbs = false;

					if (msgType === 18) {
						paopaoTmpl = '<div class="TK-paopao-hd"> <s class="TK-paopao-logo"></s> <h3 class="TK-paopao-title"> 欧耶，您关注的商品有更划算的同款啦！ </h3> <span class="TK-paopao-close" title="关闭"></span> </div> <div class="TK-paopao-bd"> <div class="TK-paopao-img"> <a class="TK-paopao-img-alink" href="${url}" target="_blank"> <img src="${imgurl}"/> </a> </div> <div class="TK-paopao-info"> <p class="TK-paopao-msg"> 您关注的商品<a href="${url}" target="_blank">“${title}”</a>有更划算的同款啦！ </p> <div class="TK-paopao-price"> <span>同款价格￥${curprice}</span> <del>原品价格￥${srcprice}</del> </div> <p class="TK-paopao-date"> 更新于${sendtime}</p> </div> <a target="_blank" href="${url}" class="TK-paopao-alink J-paopao-alink"></a><p class="TK-paopao-gohome"> <a href="http://i.taotaosou.com/user?hash=priceremind/p/1#priceremind/p/1" class="TK-go" target="_blank">修改我的降价提醒</a></p> </div>';
					} else if (msgType === 1) {
						hbs = true;
						paopaoTmpl = templates['bijia/sub.remind.paopao'];
					} else if (msgType === 11) {
						paopaoTmpl = '<div class="${app}paopao-hd"> <s class="${app}paopao-logo"></s> <h3 class="${app}paopao-title"> 找到你要的商品啦，快去看看吧！ </h3> <span class="${app}paopao-close" title="关闭"></span></div><div class="${app}paopao-bd"> <p class="${app}paopao-q"> <span>问：</span> ${question}</p> <div class="${app}paopao-img"> <a class="${app}paopao-img-alink" href="${url}" title="" target="_blank"> <img src="${imgurl}"/> </a> </div> <div class="${app}paopao-info"> <i class="icons triangle-left-empty"> <i class="subicon"></i> </i> <div class="${app}paopao-pro-wrap"> <h3 class="${app}paopao-pro-title"> ${sum}个答案，更新于${sendtime}</h3> <ul class="${app}paopao-pro-list">{{each answers}}<li> <a href="#" target="_blank" class="alink"> <img src="${$value}"/> </a> </li>{{/each}}</ul> </div> </div> <a target="_blank" href="${url}" class="${app}paopao-alink ${app}paopao-alink-bwz J-paopao-alink"></a></div>';
					} else {
						return false;
					}
          render(data.data.messages[0], msgType, hbs);
        } else {
          return;
        }
      });
      model.remind.getMessage(typeId);
    }

  }

  function render(data, id, hbs) {
    if (data) {
      paopaoNum++;

      var container = $('#J-TK-PP');
      //renderPaopao(container, data);
      var paopaoWrap = $('<div class="TK-jjtx"></div>');
      var msgData = JSON.parse(data.msg);
			console.log(msgData);
      if (id === 11) {
        var answers = msgData.answer.split(',');
        $.extend(msgData, {
          app: 'TK-',
          id: data.id,
          //url: data.url + '?utm_source=itemlike&utm_medium=ttk&utm_campaign=finddetail',
          url: msgData.url + '?utm_source=itemlike&utm_medium=ttk&utm_campaign=finddetail&outer_code=zxb001',
          sum: answers.length,
          answers: answers
        });
      } else {
        $.extend(msgData, {
          id: data.id,
          url: msgData.url,
					img: msgData.imgurl,
          curprice: (msgData.curprice / 100).toFixed(2),
          srcprice: (msgData.srcprice / 100).toFixed(2),
          title: msgData.title
        });
      }
			if (hbs) {
				body.append(paopaoTmpl(msgData));
			} else {
				$.tmpl(paopaoTmpl, msgData).appendTo(paopaoWrap);
				paopaoWrap.appendTo(container);
			}



      utils.stat('pao_frame_success', true);
      renderEvent(paopaoWrap);
    }
  }

  function renderEvent(wrap) {
    var close = wrap.find(".TK-paopao-close"),
      alink = wrap.find(".J-paopao-alink"),
      gohome = wrap.find(".TK-go");
    gohome.on("click", function () {
      utils.stat('pao_my_click', true);
    });
    alink.on("click", function () {
      wrap.animate({
        height: 0
      }, 600, "linear", function () {
        wrap.hide();
        wrap.remove();
        utils.stat('pao_C_click', true);
        ca = false;
      });
      setTimeout(function () {
        //initRemind();
        if (delayInterval) {
          clearInterval(delayInterval);
        }
        callDelay();
        if ($(".TK-jjtx")[0]) {
          $(".TK-jjtx").eq(0).show();
        }
      }, 5e3);
    });
    //TODO 无下一消息状态 多消息状态  ++++++
    close.on("click", function () {
      wrap.animate({
        height: 0
      }, 600, "linear", function () {
        wrap.hide();
        wrap.remove();
        utils.stat('pao_X_click', true);
        ca = false;
      });
      setTimeout(function () {
        //initRemind();
        if (delayInterval) {
          clearInterval(delayInterval);
        }
        callDelay();
        if ($(".TK-jjtx")[0]) {
          $(".TK-jjtx").eq(0).show();
        }
      }, 5e3);
    });
  }

  function callDelay() {
    delayInterval = setInterval(function () {
      if (paopaoNum > 1) {
        clearInterval(delayInterval);
        delayInterval = null;
        return false;
      } else {
        if (delayNum > maxNum) {
          clearInterval(delayInterval);
        } else {
          initRemind();
        }
      }
    }, 300000);
  }

	function init() {
		userData = utils.userData();
		if (userData) {
			if (typeof userData.id !== 'undefined' && userData.id !== '') {
				callDelay();

				$(window).on({
					'focus': function () {
						if (delayInterval) {
							clearInterval(delayInterval);
							delayInterval = null;
						}
						callDelay();
					},
					'blur': function () {
						paopaoNum = 0;
						clearInterval(delayInterval);
					}
				});
			} else {
				body.one("user.status.get", function (e, data) {
					if (!data) {
						return;
					}
					if (data.status === 0) {

					} else {

						callDelay();

						$(window).on({
							'focus': function () {
								console.log('focus page');
								if (delayInterval) {
									clearInterval(delayInterval);
									delayInterval = null;
								}
								callDelay();
							},
							'blur': function () {
								console.log('blur this');
								paopaoNum = 0;
								clearInterval(delayInterval);
							}
						});

					}

					//localStorage.setItem('TK-user-data', JSON.stringify(tkData));
				});
				model.remind.userStatus();
			}
		} else {
			body.one("user.status.get", function (e, data) {
				if (!data) {
					return;
				}
				if (data.status === 0) {

				} else {

					callDelay();

					$(window).on({
						'focus': function () {
							console.log('focus page');
							if (delayInterval) {
								clearInterval(delayInterval);
								delayInterval = null;
							}
							callDelay();
						},
						'blur': function () {
							console.log('blur this');
							paopaoNum = 0;
							clearInterval(delayInterval);
						}
					});

				}

				//localStorage.setItem('TK-user-data', JSON.stringify(tkData));
			});
			model.remind.userStatus();
		}
	}

  /*body.one("user.status.get", function (e, data) {
    if (!data) {
      return;
    }
    if (data.status === 0) {

    } else {

      callDelay();

      $(window).on({
        'focus': function () {
          console.log('focus page');
          if (delayInterval) {
            clearInterval(delayInterval);
            delayInterval = null;
          }
          callDelay();
        },
        'blur': function () {
          console.log('blur this');
          paopaoNum = 0;
          clearInterval(delayInterval);
        }
      });

    }

    //localStorage.setItem('TK-user-data', JSON.stringify(tkData));
  });
  model.remind.userStatus();*/

  /*}*/
  (function () {
    utils.loadCSS("//exts.taotaosou.com/browser-static/taobao/paopao.css");
    var paopaoBox = $('<div id="J-TK-PP" class="TK-paopao-wrap"></div>');
    paopaoBox.appendTo(body);
  })();
  //信息推送
//暴露接口
	module.exports = {
		init: function () {
			setTimeout(function () {
				init();
			}, 5000);
		}
	};
});

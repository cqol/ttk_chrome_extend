__tk__define(function (require, exports, module) {
  var Handlebars = require('./lib/handlebars');
  var webSiteMap = {
        'taobao':'淘宝',
        'tmall':'天猫',
        'jd':'京东',
        'amazon':'亚马逊',
        'yihaodian':'1号店',
        'dangdang':'当当网',
        'suning':'苏宁易购',
        '51buy':'易迅',
        'vip':'唯品会',
        'wanggou':'QQ网购',
        'vjia':'凡客V+',
        'vancl':'凡客诚品',
        'moonbasa':'梦芭莎',
        'coo8':'库巴',
        'm18':'麦考林',
        'xiu':'走秀',
        'mbaobao':'卖包包',
        'justyle':'justyle',
        'hstyle':'韩都衣舍',
        'liebo':'裂帛',
        'ochirly':'欧时力官网',
        'hg-daigou':'韩购社官网',
        'htjz':'核桃夹子',
        'meilishuo': '美丽说',
        'mogujie': '蘑菇街',
        'gome': '国美在线'
      },
      webSiteMapShort = {
        'taobao':'淘',
        'tmall':'天',
        'jd':'京',
        'amazon':'亚',
        'yihaodian':'壹',
        'dangdang':'当',
        'suning':'苏',
        '51buy':'易',
        'vip':'唯',
        'wanggou':'QQ',
        'vjia':'凡',
        'vancl':'凡',
        'moonbasa':'梦',
        'coo8':'库',
        'm18':'麦',
        'xiu':'走',
        'mbaobao':'卖',
        'justyle':'justyle',
        'hstyle':'韩',
        'liebo':'裂',
        'ochirly':'欧',
        'hg-daigou':'韩',
        'htjz':'核',
        'meilishuo': '美',
        'mogujie': '蘑',
        'gome': '国'
      };
  var comparatorHelpers = {
    contains: function (str, pattern, options) {
      if (str.indexOf(pattern) !== -1) {
        return options.fn(this);
      }
      return options.inverse(this);
    },

    and: function (a, b, options) {
      if (a && b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },

    gt: function (value, test, options) {
      if (value > test) {
        return options.fn(this);
      }
      return options.inverse(this);
    },

    gte: function (value, test, options) {
      if (value >= test) {
        return options.fn(this);
      }
      return options.inverse(this);
    },

    is: function (value, test, options) {
      if (value === test) {
        return options.fn(this);
      }
      return options.inverse(this);
    },

    isnt: function (value, test, options) {
      if (value !== test) {
        return options.fn(this);
      }
      return options.inverse(this);
    },

    lt: function (value, test, options) {
      if (value < test) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    from : function(value){
      var fromname =["淘宝","天猫"];
      return fromname[value];
    },
    lte: function (value, test, options) {
      if (value <= test) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    lengthLt:function(value, test, options) {
      var len = value.length;
      if (len > test) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
		pingurl1: function(day1, hour1) {
			return "http://www.chaoji99.com/index.html?day=" + day1 +
				"&hour=" + hour1 + "&utm_source=bottomtab_seckill&utm_medium=ttk" +
				"#gouwu";
		},
    pingurl2: function(day2, hour2) {
      return "http://www.chaoji99.com/index.html?day=" + day2 +
        "&hour=" + hour2 + "&utm_source=bottomtab_seckill&utm_medium=ttk" +
        "#gouwu";
    },
    pingurl3: function(day3, hour3) {
      return "http://www.chaoji99.com/index.html?day=" + day3 +
        "&hour=" + hour3 + "&utm_source=bottomtab_seckill&utm_medium=ttk" +
        "#gouwu";
    },

    imgCDN:function (width, height, url) {
      return url + '_' + width + 'x' + height + '.jpg';
    },
    /**
     * Or
     * Conditionally render a block if one of the values is truthy.
     */
    or: function (a, b, options) {
      if (a || b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    th: function(str, num) {
      if(str.length > num) {
        return str.slice(0, num) + "...";
      } else {
        return str;
      }
    },
    getprice: function(price) {
        return (price/100).toFixed(2);    
    },
    setsize: function(w,h) {

        return 220*h/w;

    },
    imgreplace :function(imgurl){
        return imgurl.replace("_210x210.jpg","");
    },
    setIndex: function(value) {
      this.index = Number(value + 1);
    },
    getpageparam: function(index, page) {
      return index + 1 + (page - 1) * 30;
    },
    source: function(name){
      return webSiteMap[name];
    },
    sourceShort: function(name){
      return webSiteMapShort[name];
    },
    jdName: function(name){
      if (name === "jd.com") {
        return "jdcom";
      } else {
        return name;
      }
    },
    /**
     * {{ifAny}}
     * Similar to {{#if}} block helper but accepts multiple arguments.
     * @author: Dan Harper <http://github.com/danharper>
     *
     * @param  {[type]} context [description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     *
     * @example: {{ifAny this compare=that}}
     */
    ifAny: function () {
      var argLength = arguments.length - 2;
      var content = arguments[argLength + 1];
      var success = true;
      var i = 0;
      while (i < argLength) {
        if (!arguments[i]) {
          success = false;
          break;
        }
        i += 1;
      }
      if (success) {
        return content.fn(this);
      }
      return content.inverse(this);
    },

    /**
     * 取每行最后一个元素
     *
     * @param i 循环中的index
     * @param len 每一行的长度
     */
    rowLast: function(i, len, options) {
      if (i % len === 0) {
        return options.fn(this);
      }
      return options.inverse(this);
    }
  };
  
  var k;
  for(k in comparatorHelpers) {
    if(comparatorHelpers.hasOwnProperty(k)) {
      Handlebars.registerHelper(k, comparatorHelpers[k]);
    }
  }
  
  Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
        
    return {
      "+": lvalue + rvalue,
      "-": lvalue - rvalue,
      "*": lvalue * rvalue,
      "/": lvalue / rvalue,
      "%": lvalue % rvalue
    }[operator];
  });

  return Handlebars;
  
});

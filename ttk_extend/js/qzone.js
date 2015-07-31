/* @date:2014-05-22 10:09:27 */
!function (a, b) {
	function c(a) {
		var b = a.length, c = ab.type(a);
		return ab.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || "function" !== c && (0 === b || "number" == typeof b && b > 0 && b - 1 in a)
	}

	function d(a) {
		var b = pb[a] = {};
		return ab.each(a.match(cb) || [], function (a, c) {
			b[c] = !0
		}), b
	}

	function e(a, c, d, e) {
		if (ab.acceptData(a)) {
			var f, g, h = ab.expando, i = a.nodeType, j = i ? ab.cache : a, k = i ? a[h] : a[h] && h;
			if (k && j[k] && (e || j[k].data) || d !== b || "string" != typeof c)return k || (k = i ? a[h] = T.pop() || ab.guid++ : h), j[k] || (j[k] = i ? {} : {toJSON: ab.noop}), ("object" == typeof c || "function" == typeof c) && (e ? j[k] = ab.extend(j[k], c) : j[k].data = ab.extend(j[k].data, c)), g = j[k], e || (g.data || (g.data = {}), g = g.data), d !== b && (g[ab.camelCase(c)] = d), "string" == typeof c ? (f = g[c], null == f && (f = g[ab.camelCase(c)])) : f = g, f
		}
	}

	function f(a, b, c) {
		if (ab.acceptData(a)) {
			var d, e, f = a.nodeType, g = f ? ab.cache : a, i = f ? a[ab.expando] : ab.expando;
			if (g[i]) {
				if (b && (d = c ? g[i] : g[i].data)) {
					ab.isArray(b) ? b = b.concat(ab.map(b, ab.camelCase)) : b in d ? b = [b] : (b = ab.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
					for (; e--;)delete d[b[e]];
					if (c ? !h(d) : !ab.isEmptyObject(d))return
				}
				(c || (delete g[i].data, h(g[i]))) && (f ? ab.cleanData([a], !0) : ab.support.deleteExpando || g != g.window ? delete g[i] : g[i] = null)
			}
		}
	}

	function g(a, c, d) {
		if (d === b && 1 === a.nodeType) {
			var e = "data-" + c.replace(rb, "-$1").toLowerCase();
			if (d = a.getAttribute(e), "string" == typeof d) {
				try {
					d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : +d + "" === d ? +d : qb.test(d) ? ab.parseJSON(d) : d
				} catch (f) {
				}
				ab.data(a, c, d)
			} else d = b
		}
		return d
	}

	function h(a) {
		var b;
		for (b in a)if (("data" !== b || !ab.isEmptyObject(a[b])) && "toJSON" !== b)return !1;
		return !0
	}

	function i() {
		return !0
	}

	function j() {
		return !1
	}

	function k(a, b) {
		do a = a[b]; while (a && 1 !== a.nodeType);
		return a
	}

	function l(a, b, c) {
		if (b = b || 0, ab.isFunction(b))return ab.grep(a, function (a, d) {
			var e = !!b.call(a, d, a);
			return e === c
		});
		if (b.nodeType)return ab.grep(a, function (a) {
			return a === b === c
		});
		if ("string" == typeof b) {
			var d = ab.grep(a, function (a) {
				return 1 === a.nodeType
			});
			if (Jb.test(b))return ab.filter(b, d, !c);
			b = ab.filter(b, d)
		}
		return ab.grep(a, function (a) {
			return ab.inArray(a, b) >= 0 === c
		})
	}

	function m(a) {
		var b = Mb.split("|"), c = a.createDocumentFragment();
		if (c.createElement)for (; b.length;)c.createElement(b.pop());
		return c
	}

	function n(a, b) {
		return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b))
	}

	function o(a) {
		var b = a.getAttributeNode("type");
		return a.type = (b && b.specified) + "/" + a.type, a
	}

	function p(a) {
		var b = Yb.exec(a.type);
		return b ? a.type = b[1] : a.removeAttribute("type"), a
	}

	function q(a, b) {
		for (var c, d = 0; null != (c = a[d]); d++)ab._data(c, "globalEval", !b || ab._data(b[d], "globalEval"))
	}

	function r(a, b) {
		if (1 === b.nodeType && ab.hasData(a)) {
			var c, d, e, f = ab._data(a), g = ab._data(b, f), h = f.events;
			if (h) {
				delete g.handle, g.events = {};
				for (c in h)for (d = 0, e = h[c].length; e > d; d++)ab.event.add(b, c, h[c][d])
			}
			g.data && (g.data = ab.extend({}, g.data))
		}
	}

	function s(a, b) {
		var c, d, e;
		if (1 === b.nodeType) {
			if (c = b.nodeName.toLowerCase(), !ab.support.noCloneEvent && b[ab.expando]) {
				e = ab._data(b);
				for (d in e.events)ab.removeEvent(b, d, e.handle);
				b.removeAttribute(ab.expando)
			}
			"script" === c && b.text !== a.text ? (o(b).text = a.text, p(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), ab.support.html5Clone && a.innerHTML && !ab.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Vb.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
		}
	}

	function t(a, c) {
		var d, e, f = 0, g = typeof a.getElementsByTagName !== M ? a.getElementsByTagName(c || "*") : typeof a.querySelectorAll !== M ? a.querySelectorAll(c || "*") : b;
		if (!g)for (g = [], d = a.childNodes || a; null != (e = d[f]); f++)!c || ab.nodeName(e, c) ? g.push(e) : ab.merge(g, t(e, c));
		return c === b || c && ab.nodeName(a, c) ? ab.merge([a], g) : g
	}

	function u(a) {
		Vb.test(a.type) && (a.defaultChecked = a.checked)
	}

	function v(a, b) {
		if (b in a)return b;
		for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = qc.length; e--;)if (b = qc[e] + c, b in a)return b;
		return d
	}

	function w(a, b) {
		return a = b || a, "none" === ab.css(a, "display") || !ab.contains(a.ownerDocument, a)
	}

	function x(a, b) {
		for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)d = a[g], d.style && (f[g] = ab._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && w(d) && (f[g] = ab._data(d, "olddisplay", B(d.nodeName)))) : f[g] || (e = w(d), (c && "none" !== c || !e) && ab._data(d, "olddisplay", e ? c : ab.css(d, "display"))));
		for (g = 0; h > g; g++)d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
		return a
	}

	function y(a, b, c) {
		var d = jc.exec(b);
		return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
	}

	function z(a, b, c, d, e) {
		for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2)"margin" === c && (g += ab.css(a, c + pc[f], !0, e)), d ? ("content" === c && (g -= ab.css(a, "padding" + pc[f], !0, e)), "margin" !== c && (g -= ab.css(a, "border" + pc[f] + "Width", !0, e))) : (g += ab.css(a, "padding" + pc[f], !0, e), "padding" !== c && (g += ab.css(a, "border" + pc[f] + "Width", !0, e)));
		return g
	}

	function A(a, b, c) {
		var d = !0, e = "width" === b ? a.offsetWidth : a.offsetHeight, f = cc(a), g = ab.support.boxSizing && "border-box" === ab.css(a, "boxSizing", !1, f);
		if (0 >= e || null == e) {
			if (e = dc(a, b, f), (0 > e || null == e) && (e = a.style[b]), kc.test(e))return e;
			d = g && (ab.support.boxSizingReliable || e === a.style[b]), e = parseFloat(e) || 0
		}
		return e + z(a, b, c || (g ? "border" : "content"), d, f) + "px"
	}

	function B(a) {
		var b = O, c = mc[a];
		return c || (c = C(a, b), "none" !== c && c || (bc = (bc || ab("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(b.documentElement), b = (bc[0].contentWindow || bc[0].contentDocument).document, b.write("<!doctype html><html><body>"), b.close(), c = C(a, b), bc.detach()), mc[a] = c), c
	}

	function C(a, b) {
		var c = ab(b.createElement(a)).appendTo(b.body), d = ab.css(c[0], "display");
		return c.remove(), d
	}

	function D(a, b, c, d) {
		var e;
		if (ab.isArray(b))ab.each(b, function (b, e) {
			c || sc.test(a) ? d(a, e) : D(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
		}); else if (c || "object" !== ab.type(b))d(a, b); else for (e in b)D(a + "[" + e + "]", b[e], c, d)
	}

	function E(a) {
		return function (b, c) {
			"string" != typeof b && (c = b, b = "*");
			var d, e = 0, f = b.toLowerCase().match(cb) || [];
			if (ab.isFunction(c))for (; d = f[e++];)"+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
		}
	}

	function F(a, b, c, d) {
		function e(h) {
			var i;
			return f[h] = !0, ab.each(a[h] || [], function (a, h) {
				var j = h(b, c, d);
				return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
			}), i
		}

		var f = {}, g = a === Jc;
		return e(b.dataTypes[0]) || !f["*"] && e("*")
	}

	function G(a, c) {
		var d, e, f = ab.ajaxSettings.flatOptions || {};
		for (e in c)c[e] !== b && ((f[e] ? a : d || (d = {}))[e] = c[e]);
		return d && ab.extend(!0, a, d), a
	}

	function H(a, c, d) {
		for (var e, f, g, h, i = a.contents, j = a.dataTypes; "*" === j[0];)j.shift(), f === b && (f = a.mimeType || c.getResponseHeader("Content-Type"));
		if (f)for (h in i)if (i[h] && i[h].test(f)) {
			j.unshift(h);
			break
		}
		if (j[0]in d)g = j[0]; else {
			for (h in d) {
				if (!j[0] || a.converters[h + " " + j[0]]) {
					g = h;
					break
				}
				e || (e = h)
			}
			g = g || e
		}
		return g ? (g !== j[0] && j.unshift(g), d[g]) : void 0
	}

	function I(a, b, c, d) {
		var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
		if (k[1])for (g in a.converters)j[g.toLowerCase()] = a.converters[g];
		for (f = k.shift(); f;)if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())if ("*" === f)f = i; else if ("*" !== i && i !== f) {
			if (g = j[i + " " + f] || j["* " + f], !g)for (e in j)if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
				g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
				break
			}
			if (g !== !0)if (g && a["throws"])b = g(b); else try {
				b = g(b)
			} catch (l) {
				return {state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f}
			}
		}
		return {state: "success", data: b}
	}

	function J(a) {
		return ab.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
	}

	var K, L, M = typeof b, N = a.location, O = a.document, P = O.documentElement, Q = a.jQuery, R = a.$, S = {}, T = [], U = "1.9.2-pre -event-alias,-ajax/xhr,-effects,-deprecated", V = T.concat, W = T.push, X = T.slice, Y = T.indexOf, Z = S.toString, $ = S.hasOwnProperty, _ = U.trim, ab = function (a, b) {
		return new ab.fn.init(a, b, L)
	}, bb = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, cb = /\S+/g, db = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, eb = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/, fb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, gb = /^[\],:{}\s]*$/, hb = /(?:^|:|,)(?:\s*\[)+/g, ib = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, jb = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, kb = /^-ms-/, lb = /-([\da-z])/gi, mb = function (a, b) {
		return b.toUpperCase()
	}, nb = function (a) {
		(O.addEventListener || "load" === a.type || "complete" === O.readyState) && (ob(), ab.ready())
	}, ob = function () {
		O.addEventListener ? (O.removeEventListener("DOMContentLoaded", nb, !1), a.removeEventListener("load", nb, !1)) : (O.detachEvent("onreadystatechange", nb), a.detachEvent("onload", nb))
	};
	ab.fn = ab.prototype = {
		jquery: U, constructor: ab, init: function (a, c, d) {
			var e, f;
			if (!a)return this;
			if ("string" == typeof a) {
				if (e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : eb.exec(a), !e || !e[1] && c)return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a);
				if (e[1]) {
					if (c = c instanceof ab ? c[0] : c, ab.merge(this, ab.parseHTML(e[1], c && c.nodeType ? c.ownerDocument || c : O, !0)), fb.test(e[1]) && ab.isPlainObject(c))for (e in c)ab.isFunction(this[e]) ? this[e](c[e]) : this.attr(e, c[e]);
					return this
				}
				if (f = O.getElementById(e[2]), f && f.parentNode) {
					if (f.id !== e[2])return d.find(a);
					this.length = 1, this[0] = f
				}
				return this.context = O, this.selector = a, this
			}
			return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : ab.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), ab.makeArray(a, this))
		}, selector: "", length: 0, size: function () {
			return this.length
		}, toArray: function () {
			return X.call(this)
		}, get: function (a) {
			return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
		}, pushStack: function (a) {
			var b = ab.merge(this.constructor(), a);
			return b.prevObject = this, b.context = this.context, b
		}, each: function (a, b) {
			return ab.each(this, a, b)
		}, ready: function (a) {
			return ab.ready.promise().done(a), this
		}, slice: function () {
			return this.pushStack(X.apply(this, arguments))
		}, first: function () {
			return this.eq(0)
		}, last: function () {
			return this.eq(-1)
		}, eq: function (a) {
			var b = this.length, c = +a + (0 > a ? b : 0);
			return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
		}, map: function (a) {
			return this.pushStack(ab.map(this, function (b, c) {
				return a.call(b, c, b)
			}))
		}, end: function () {
			return this.prevObject || this.constructor(null)
		}, push: W, sort: [].sort, splice: [].splice
	}, ab.fn.init.prototype = ab.fn, ab.extend = ab.fn.extend = function () {
		var a, c, d, e, f, g, h = arguments[0] || {}, i = 1, j = arguments.length, k = !1;
		for ("boolean" == typeof h && (k = h, h = arguments[1] || {}, i = 2), "object" == typeof h || ab.isFunction(h) || (h = {}), j === i && (h = this, --i); j > i; i++)if (null != (f = arguments[i]))for (e in f)a = h[e], d = f[e], h !== d && (k && d && (ab.isPlainObject(d) || (c = ab.isArray(d))) ? (c ? (c = !1, g = a && ab.isArray(a) ? a : []) : g = a && ab.isPlainObject(a) ? a : {}, h[e] = ab.extend(k, g, d)) : d !== b && (h[e] = d));
		return h
	}, ab.extend({
		expando: "jQuery" + (U + Math.random()).replace(/\D/g, ""), noConflict: function (b) {
			return a.$ === ab && (a.$ = R), b && a.jQuery === ab && (a.jQuery = Q), ab
		}, isReady: !1, readyWait: 1, holdReady: function (a) {
			a ? ab.readyWait++ : ab.ready(!0)
		}, ready: function (a) {
			if (a === !0 ? !--ab.readyWait : !ab.isReady) {
				if (!O.body)return setTimeout(ab.ready);
				ab.isReady = !0, a !== !0 && --ab.readyWait > 0 || (K.resolveWith(O, [ab]), ab.fn.trigger && ab(O).trigger("ready").off("ready"))
			}
		}, isFunction: function (a) {
			return "function" === ab.type(a)
		}, isArray: Array.isArray || function (a) {
			return "array" === ab.type(a)
		}, isWindow: function (a) {
			return null != a && a == a.window
		}, isNumeric: function (a) {
			return !isNaN(parseFloat(a)) && isFinite(a)
		}, type: function (a) {
			return null == a ? String(a) : "object" == typeof a || "function" == typeof a ? S[Z.call(a)] || "object" : typeof a
		}, isPlainObject: function (a) {
			if (!a || "object" !== ab.type(a) || a.nodeType || ab.isWindow(a))return !1;
			try {
				if (a.constructor && !$.call(a, "constructor") && !$.call(a.constructor.prototype, "isPrototypeOf"))return !1
			} catch (c) {
				return !1
			}
			var d;
			for (d in a);
			return d === b || $.call(a, d)
		}, isEmptyObject: function (a) {
			var b;
			for (b in a)return !1;
			return !0
		}, error: function (a) {
			throw new Error(a)
		}, parseHTML: function (a, b, c) {
			if (!a || "string" != typeof a)return null;
			"boolean" == typeof b && (c = b, b = !1), b = b || O;
			var d = fb.exec(a), e = !c && [];
			return d ? [b.createElement(d[1])] : (d = ab.buildFragment([a], b, e), e && ab(e).remove(), ab.merge([], d.childNodes))
		}, parseJSON: function (b) {
			return a.JSON && a.JSON.parse ? a.JSON.parse(b) : null === b ? b : "string" == typeof b && (b = ab.trim(b), b && gb.test(b.replace(ib, "@").replace(jb, "]").replace(hb, ""))) ? new Function("return " + b)() : (ab.error("Invalid JSON: " + b), void 0)
		}, parseXML: function (c) {
			var d, e;
			if (!c || "string" != typeof c)return null;
			try {
				a.DOMParser ? (e = new DOMParser, d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
			} catch (f) {
				d = b
			}
			return d && d.documentElement && !d.getElementsByTagName("parsererror").length || ab.error("Invalid XML: " + c), d
		}, noop: function () {
		}, globalEval: function (b) {
			b && ab.trim(b) && (a.execScript || function (b) {
				a.eval.call(a, b)
			})(b)
		}, camelCase: function (a) {
			return a.replace(kb, "ms-").replace(lb, mb)
		}, nodeName: function (a, b) {
			return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
		}, each: function (a, b, d) {
			var e, f = 0, g = a.length, h = c(a);
			if (d) {
				if (h)for (; g > f && (e = b.apply(a[f], d), e !== !1); f++); else for (f in a)if (e = b.apply(a[f], d), e === !1)break
			} else if (h)for (; g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++); else for (f in a)if (e = b.call(a[f], f, a[f]), e === !1)break;
			return a
		}, trim: _ && !_.call("﻿ ") ? function (a) {
			return null == a ? "" : _.call(a)
		} : function (a) {
			return null == a ? "" : (a + "").replace(db, "")
		}, makeArray: function (a, b) {
			var d = b || [];
			return null != a && (c(Object(a)) ? ab.merge(d, "string" == typeof a ? [a] : a) : W.call(d, a)), d
		}, inArray: function (a, b, c) {
			var d;
			if (b) {
				if (Y)return Y.call(b, a, c);
				for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)if (c in b && b[c] === a)return c
			}
			return -1
		}, merge: function (a, c) {
			var d = c.length, e = a.length, f = 0;
			if ("number" == typeof d)for (; d > f; f++)a[e++] = c[f]; else for (; c[f] !== b;)a[e++] = c[f++];
			return a.length = e, a
		}, grep: function (a, b, c) {
			var d, e = [], f = 0, g = a.length;
			for (c = !!c; g > f; f++)d = !!b(a[f], f), c !== d && e.push(a[f]);
			return e
		}, map: function (a, b, d) {
			var e, f = 0, g = a.length, h = c(a), i = [];
			if (h)for (; g > f; f++)e = b(a[f], f, d), null != e && (i[i.length] = e); else for (f in a)e = b(a[f], f, d), null != e && (i[i.length] = e);
			return V.apply([], i)
		}, guid: 1, proxy: function (a, c) {
			var d, e, f;
			return "string" == typeof c && (f = a[c], c = a, a = f), ab.isFunction(a) ? (d = X.call(arguments, 2), e = function () {
				return a.apply(c || this, d.concat(X.call(arguments)))
			}, e.guid = a.guid = a.guid || ab.guid++, e) : b
		}, access: function (a, c, d, e, f, g, h) {
			var i = 0, j = a.length, k = null == d;
			if ("object" === ab.type(d)) {
				f = !0;
				for (i in d)ab.access(a, c, i, d[i], !0, g, h)
			} else if (e !== b && (f = !0, ab.isFunction(e) || (h = !0), k && (h ? (c.call(a, e), c = null) : (k = c, c = function (a, b, c) {
					return k.call(ab(a), c)
				})), c))for (; j > i; i++)c(a[i], d, h ? e : e.call(a[i], i, c(a[i], d)));
			return f ? a : k ? c.call(a) : j ? c(a[0], d) : g
		}, now: function () {
			return (new Date).getTime()
		}
	}), ab.ready.promise = function (b) {
		if (!K)if (K = ab.Deferred(), "complete" === O.readyState)setTimeout(ab.ready); else if (O.addEventListener)O.addEventListener("DOMContentLoaded", nb, !1), a.addEventListener("load", nb, !1); else {
			O.attachEvent("onreadystatechange", nb), a.attachEvent("onload", nb);
			var c = !1;
			try {
				c = null == a.frameElement && O.documentElement
			} catch (d) {
			}
			c && c.doScroll && !function e() {
				if (!ab.isReady) {
					try {
						c.doScroll("left")
					} catch (a) {
						return setTimeout(e, 50)
					}
					ob(), ab.ready()
				}
			}()
		}
		return K.promise(b)
	}, ab.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
		S["[object " + b + "]"] = b.toLowerCase()
	}), L = ab(O);
	var pb = {};
	ab.Callbacks = function (a) {
		a = "string" == typeof a ? pb[a] || d(a) : ab.extend({}, a);
		var c, e, f, g, h, i, j = [], k = !a.once && [], l = function (b) {
			for (e = a.memory && b, f = !0, h = i || 0, i = 0, g = j.length, c = !0; j && g > h; h++)if (j[h].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
				e = !1;
				break
			}
			c = !1, j && (k ? k.length && l(k.shift()) : e ? j = [] : m.disable())
		}, m = {
			add: function () {
				if (j) {
					var b = j.length;
					!function d(b) {
						ab.each(b, function (b, c) {
							var e = ab.type(c);
							"function" === e ? a.unique && m.has(c) || j.push(c) : c && c.length && "string" !== e && d(c)
						})
					}(arguments), c ? g = j.length : e && (i = b, l(e))
				}
				return this
			}, remove: function () {
				return j && ab.each(arguments, function (a, b) {
					for (var d; (d = ab.inArray(b, j, d)) > -1;)j.splice(d, 1), c && (g >= d && g--, h >= d && h--)
				}), this
			}, has: function (a) {
				return a ? ab.inArray(a, j) > -1 : !(!j || !j.length)
			}, empty: function () {
				return j = [], g = 0, this
			}, disable: function () {
				return j = k = e = b, this
			}, disabled: function () {
				return !j
			}, lock: function () {
				return k = b, e || m.disable(), this
			}, locked: function () {
				return !k
			}, fireWith: function (a, b) {
				return b = b || [], b = [a, b.slice ? b.slice() : b], !j || f && !k || (c ? k.push(b) : l(b)), this
			}, fire: function () {
				return m.fireWith(this, arguments), this
			}, fired: function () {
				return !!f
			}
		};
		return m
	}, ab.extend({
		Deferred: function (a) {
			var b = [["resolve", "done", ab.Callbacks("once memory"), "resolved"], ["reject", "fail", ab.Callbacks("once memory"), "rejected"], ["notify", "progress", ab.Callbacks("memory")]], c = "pending", d = {
				state: function () {
					return c
				}, always: function () {
					return e.done(arguments).fail(arguments), this
				}, then: function () {
					var a = arguments;
					return ab.Deferred(function (c) {
						ab.each(b, function (b, f) {
							var g = f[0], h = ab.isFunction(a[b]) && a[b];
							e[f[1]](function () {
								var a = h && h.apply(this, arguments);
								a && ab.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[g + "With"](this === d ? c.promise() : this, h ? [a] : arguments)
							})
						}), a = null
					}).promise()
				}, promise: function (a) {
					return null != a ? ab.extend(a, d) : d
				}
			}, e = {};
			return d.pipe = d.then, ab.each(b, function (a, f) {
				var g = f[2], h = f[3];
				d[f[1]] = g.add, h && g.add(function () {
					c = h
				}, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
					return e[f[0] + "With"](this === e ? d : this, arguments), this
				}, e[f[0] + "With"] = g.fireWith
			}), d.promise(e), a && a.call(e, e), e
		}, when: function (a) {
			var b, c, d, e = 0, f = X.call(arguments), g = f.length, h = 1 !== g || a && ab.isFunction(a.promise) ? g : 0, i = 1 === h ? a : ab.Deferred(), j = function (a, c, d) {
				return function (e) {
					c[a] = this, d[a] = arguments.length > 1 ? X.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
				}
			};
			if (g > 1)for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++)f[e] && ab.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
			return h || i.resolveWith(d, f), i.promise()
		}
	}), ab.support = function (b) {
		var c, d, e, f, g, h, i, j, k, l = O.createElement("div");
		if (l.setAttribute("className", "t"), l.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", c = l.getElementsByTagName("*"), d = l.getElementsByTagName("a")[0], !c || !d || !c.length)return b;
		f = O.createElement("select"), h = f.appendChild(O.createElement("option")), e = l.getElementsByTagName("input")[0], d.style.cssText = "top:1px;float:left;opacity:.5", b.getSetAttribute = "t" !== l.className, b.leadingWhitespace = 3 === l.firstChild.nodeType, b.tbody = !l.getElementsByTagName("tbody").length, b.htmlSerialize = !!l.getElementsByTagName("link").length, b.style = /top/.test(d.getAttribute("style")), b.hrefNormalized = "/a" === d.getAttribute("href"), b.opacity = /^0.5/.test(d.style.opacity), b.cssFloat = !!d.style.cssFloat, b.checkOn = !!e.value, b.optSelected = h.selected, b.enctype = !!O.createElement("form").enctype, b.html5Clone = "<:nav></:nav>" !== O.createElement("nav").cloneNode(!0).outerHTML, b.boxModel = "CSS1Compat" === O.compatMode, b.inlineBlockNeedsLayout = !1, b.shrinkWrapBlocks = !1, b.pixelPosition = !1, b.deleteExpando = !0, b.noCloneEvent = !0, b.reliableMarginRight = !0, b.boxSizingReliable = !0, e.checked = !0, b.noCloneChecked = e.cloneNode(!0).checked, f.disabled = !0, b.optDisabled = !h.disabled;
		try {
			delete l.test
		} catch (m) {
			b.deleteExpando = !1
		}
		e = O.createElement("input"), e.setAttribute("value", ""), b.input = "" === e.getAttribute("value"), e.value = "t", e.setAttribute("type", "radio"), b.radioValue = "t" === e.value, e.setAttribute("checked", "t"), e.setAttribute("name", "t"), g = O.createDocumentFragment(), g.appendChild(e), b.appendChecked = e.checked, b.checkClone = g.cloneNode(!0).cloneNode(!0).lastChild.checked, l.attachEvent && (l.attachEvent("onclick", function () {
			b.noCloneEvent = !1
		}), l.cloneNode(!0).click());
		for (k in{
			submit: !0,
			change: !0,
			focusin: !0
		})l.setAttribute(i = "on" + k, "t"), b[k + "Bubbles"] = i in a || l.attributes[i].expando === !1;
		return l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", b.clearCloneStyle = "content-box" === l.style.backgroundClip, ab(function () {
			var c, d, e, f = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", g = O.getElementsByTagName("body")[0];
			g && (c = O.createElement("div"), c.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", g.appendChild(c).appendChild(l), l.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", e = l.getElementsByTagName("td"), e[0].style.cssText = "padding:0;margin:0;border:0;display:none", j = 0 === e[0].offsetHeight, e[0].style.display = "", e[1].style.display = "none", b.reliableHiddenOffsets = j && 0 === e[0].offsetHeight, l.innerHTML = "", l.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", b.boxSizing = 4 === l.offsetWidth, b.doesNotIncludeMarginInBodyOffset = 1 !== g.offsetTop, a.getComputedStyle && (b.pixelPosition = "1%" !== (a.getComputedStyle(l, null) || {}).top, b.boxSizingReliable = "4px" === (a.getComputedStyle(l, null) || {width: "4px"}).width, d = l.appendChild(O.createElement("div")), d.style.cssText = l.style.cssText = f, d.style.marginRight = d.style.width = "0", l.style.width = "1px", b.reliableMarginRight = !parseFloat((a.getComputedStyle(d, null) || {}).marginRight)), typeof l.style.zoom !== M && (l.innerHTML = "", l.style.cssText = f + "width:1px;padding:1px;display:inline;zoom:1", b.inlineBlockNeedsLayout = 3 === l.offsetWidth, l.style.display = "block", l.innerHTML = "<div></div>", l.firstChild.style.width = "5px", b.shrinkWrapBlocks = 3 !== l.offsetWidth, b.inlineBlockNeedsLayout && (g.style.zoom = 1)), g.removeChild(c), c = l = e = d = null)
		}), c = f = g = h = d = e = null, b
	}({});
	var qb = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, rb = /([A-Z])/g;
	ab.extend({
		cache: {},
		noData: {applet: !0, embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},
		hasData: function (a) {
			return a = a.nodeType ? ab.cache[a[ab.expando]] : a[ab.expando], !!a && !h(a)
		},
		data: function (a, b, c) {
			return e(a, b, c)
		},
		removeData: function (a, b) {
			return f(a, b)
		},
		_data: function (a, b, c) {
			return e(a, b, c, !0)
		},
		_removeData: function (a, b) {
			return f(a, b, !0)
		},
		acceptData: function (a) {
			if (a.nodeType && 1 !== a.nodeType && 9 !== a.nodeType)return !1;
			var b = a.nodeName && ab.noData[a.nodeName.toLowerCase()];
			return !b || b !== !0 && a.getAttribute("classid") === b
		}
	}), ab.fn.extend({
		data: function (a, c) {
			var d, e, f = null, h = 0, i = this[0];
			if (a === b) {
				if (this.length && (f = ab.data(i), 1 === i.nodeType && !ab._data(i, "parsedAttrs"))) {
					for (d = i.attributes; h < d.length; h++)e = d[h].name, 0 === e.indexOf("data-") && (e = ab.camelCase(e.slice(5)), g(i, e, f[e]));
					ab._data(i, "parsedAttrs", !0)
				}
				return f
			}
			return "object" == typeof a ? this.each(function () {
				ab.data(this, a)
			}) : arguments.length > 1 ? this.each(function () {
				ab.data(this, a, c)
			}) : i ? g(i, a, ab.data(i, a)) : null
		}, removeData: function (a) {
			return this.each(function () {
				ab.removeData(this, a)
			})
		}
	}), ab.extend({
		queue: function (a, b, c) {
			var d;
			return a ? (b = (b || "fx") + "queue", d = ab._data(a, b), c && (!d || ab.isArray(c) ? d = ab._data(a, b, ab.makeArray(c)) : d.push(c)), d || []) : void 0
		}, dequeue: function (a, b) {
			b = b || "fx";
			var c = ab.queue(a, b), d = c.length, e = c.shift(), f = ab._queueHooks(a, b), g = function () {
				ab.dequeue(a, b)
			};
			"inprogress" === e && (e = c.shift(), d--), f.cur = e, e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
		}, _queueHooks: function (a, b) {
			var c = b + "queueHooks";
			return ab._data(a, c) || ab._data(a, c, {
					empty: ab.Callbacks("once memory").add(function () {
						ab._removeData(a, b + "queue"), ab._removeData(a, c)
					})
				})
		}
	}), ab.fn.extend({
		queue: function (a, c) {
			var d = 2;
			return "string" != typeof a && (c = a, a = "fx", d--), arguments.length < d ? ab.queue(this[0], a) : c === b ? this : this.each(function () {
				var b = ab.queue(this, a, c);
				ab._queueHooks(this, a), "fx" === a && "inprogress" !== b[0] && ab.dequeue(this, a)
			})
		}, dequeue: function (a) {
			return this.each(function () {
				ab.dequeue(this, a)
			})
		}, delay: function (a, b) {
			return a = ab.fx ? ab.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
				var d = setTimeout(b, a);
				c.stop = function () {
					clearTimeout(d)
				}
			})
		}, clearQueue: function (a) {
			return this.queue(a || "fx", [])
		}, promise: function (a, c) {
			var d, e = 1, f = ab.Deferred(), g = this, h = this.length, i = function () {
				--e || f.resolveWith(g, [g])
			};
			for ("string" != typeof a && (c = a, a = b), a = a || "fx"; h--;)d = ab._data(g[h], a + "queueHooks"), d && d.empty && (e++, d.empty.add(i));
			return i(), f.promise(c)
		}
	});
	var sb, tb, ub = /[\t\r\n]/g, vb = /\r/g, wb = /^(?:input|select|textarea|button|object)$/i, xb = /^(?:a|area)$/i, yb = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i, zb = /^(?:checked|selected)$/i, Ab = ab.support.getSetAttribute, Bb = ab.support.input;
	ab.fn.extend({
		attr: function (a, b) {
			return ab.access(this, ab.attr, a, b, arguments.length > 1)
		}, removeAttr: function (a) {
			return this.each(function () {
				ab.removeAttr(this, a)
			})
		}, prop: function (a, b) {
			return ab.access(this, ab.prop, a, b, arguments.length > 1)
		}, removeProp: function (a) {
			return a = ab.propFix[a] || a, this.each(function () {
				try {
					this[a] = b, delete this[a]
				} catch (c) {
				}
			})
		}, addClass: function (a) {
			var b, c, d, e, f, g = 0, h = this.length, i = "string" == typeof a && a;
			if (ab.isFunction(a))return this.each(function (b) {
				ab(this).addClass(a.call(this, b, this.className))
			});
			if (i)for (b = (a || "").match(cb) || []; h > g; g++)if (c = this[g], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ub, " ") : " ")) {
				for (f = 0; e = b[f++];)d.indexOf(" " + e + " ") < 0 && (d += e + " ");
				c.className = ab.trim(d)
			}
			return this
		}, removeClass: function (a) {
			var b, c, d, e, f, g = 0, h = this.length, i = 0 === arguments.length || "string" == typeof a && a;
			if (ab.isFunction(a))return this.each(function (b) {
				ab(this).removeClass(a.call(this, b, this.className))
			});
			if (i)for (b = (a || "").match(cb) || []; h > g; g++)if (c = this[g], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ub, " ") : "")) {
				for (f = 0; e = b[f++];)for (; d.indexOf(" " + e + " ") >= 0;)d = d.replace(" " + e + " ", " ");
				c.className = a ? ab.trim(d) : ""
			}
			return this
		}, toggleClass: function (a, b) {
			var c = typeof a, d = "boolean" == typeof b;
			return ab.isFunction(a) ? this.each(function (c) {
				ab(this).toggleClass(a.call(this, c, this.className, b), b)
			}) : this.each(function () {
				if ("string" === c)for (var e, f = 0, g = ab(this), h = b, i = a.match(cb) || []; e = i[f++];)h = d ? h : !g.hasClass(e), g[h ? "addClass" : "removeClass"](e); else(c === M || "boolean" === c) && (this.className && ab._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : ab._data(this, "__className__") || "")
			})
		}, hasClass: function (a) {
			for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(ub, " ").indexOf(b) >= 0)return !0;
			return !1
		}, val: function (a) {
			var c, d, e, f = this[0];
			{
				if (arguments.length)return e = ab.isFunction(a), this.each(function (c) {
					var f, g = ab(this);
					1 === this.nodeType && (f = e ? a.call(this, c, g.val()) : a, null == f ? f = "" : "number" == typeof f ? f += "" : ab.isArray(f) && (f = ab.map(f, function (a) {
						return null == a ? "" : a + ""
					})), d = ab.valHooks[this.type] || ab.valHooks[this.nodeName.toLowerCase()], d && "set"in d && d.set(this, f, "value") !== b || (this.value = f))
				});
				if (f)return d = ab.valHooks[f.type] || ab.valHooks[f.nodeName.toLowerCase()], d && "get"in d && (c = d.get(f, "value")) !== b ? c : (c = f.value, "string" == typeof c ? c.replace(vb, "") : null == c ? "" : c)
			}
		}
	}), ab.extend({
		valHooks: {
			option: {
				get: function (a) {
					var b = a.attributes.value;
					return !b || b.specified ? a.value : a.text
				}
			}, select: {
				get: function (a) {
					for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)if (c = d[i], !(!c.selected && i !== e || (ab.support.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && ab.nodeName(c.parentNode, "optgroup"))) {
						if (b = ab(c).val(), f)return b;
						g.push(b)
					}
					return g
				}, set: function (a, b) {
					for (var c, d, e = a.options, f = ab.makeArray(b), g = e.length; g--;)d = e[g], (d.selected = ab.inArray(ab(d).val(), f) >= 0) && (c = !0);
					return c || (a.selectedIndex = -1), f
				}
			}
		},
		attr: function (a, c, d) {
			var e, f, g, h = a.nodeType;
			if (a && 3 !== h && 8 !== h && 2 !== h)return typeof a.getAttribute === M ? ab.prop(a, c, d) : (f = 1 !== h || !ab.isXMLDoc(a), f && (c = c.toLowerCase(), e = ab.attrHooks[c] || (yb.test(c) ? tb : sb)), d === b ? e && f && "get"in e && null !== (g = e.get(a, c)) ? g : (typeof a.getAttribute !== M && (g = a.getAttribute(c)), null == g ? b : g) : null !== d ? e && f && "set"in e && (g = e.set(a, d, c)) !== b ? g : (a.setAttribute(c, d + ""), d) : (ab.removeAttr(a, c), void 0))
		},
		removeAttr: function (a, b) {
			var c, d, e = 0, f = b && b.match(cb);
			if (f && 1 === a.nodeType)for (; c = f[e++];)d = ab.propFix[c] || c, yb.test(c) ? !Ab && zb.test(c) ? a[ab.camelCase("default-" + c)] = a[d] = !1 : a[d] = !1 : ab.attr(a, c, ""), a.removeAttribute(Ab ? c : d)
		},
		attrHooks: {
			type: {
				set: function (a, b) {
					if (!ab.support.radioValue && "radio" === b && ab.nodeName(a, "input")) {
						var c = a.value;
						return a.setAttribute("type", b), c && (a.value = c), b
					}
				}
			}
		},
		propFix: {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		prop: function (a, c, d) {
			var e, f, g, h = a.nodeType;
			if (a && 3 !== h && 8 !== h && 2 !== h)return g = 1 !== h || !ab.isXMLDoc(a), g && (c = ab.propFix[c] || c, f = ab.propHooks[c]), d !== b ? f && "set"in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get"in f && null !== (e = f.get(a, c)) ? e : a[c]
		},
		propHooks: {
			tabIndex: {
				get: function (a) {
					var c = a.getAttributeNode("tabindex");
					return c && c.specified ? parseInt(c.value, 10) : wb.test(a.nodeName) || xb.test(a.nodeName) && a.href ? 0 : b
				}
			}
		}
	}), tb = {
		get: function (a, c) {
			var d = ab.prop(a, c), e = "boolean" == typeof d && a.getAttribute(c), f = "boolean" == typeof d ? Bb && Ab ? null != e : zb.test(c) ? a[ab.camelCase("default-" + c)] : !!e : a.getAttributeNode(c);
			return f && f.value !== !1 ? c.toLowerCase() : b
		}, set: function (a, b, c) {
			return b === !1 ? ab.removeAttr(a, c) : Bb && Ab || !zb.test(c) ? a.setAttribute(!Ab && ab.propFix[c] || c, c) : a[ab.camelCase("default-" + c)] = a[c] = !0, c
		}
	}, Bb && Ab || (ab.attrHooks.value = {
		get: function (a, c) {
			var d = a.getAttributeNode(c);
			return ab.nodeName(a, "input") ? a.defaultValue : d && d.specified ? d.value : b
		}, set: function (a, b, c) {
			return ab.nodeName(a, "input") ? (a.defaultValue = b, void 0) : sb && sb.set(a, b, c)
		}
	}), Ab || (sb = ab.valHooks.button = {
		get: function (a, c) {
			var d = a.getAttributeNode(c);
			return d && ("id" === c || "name" === c || "coords" === c ? "" !== d.value : d.specified) ? d.value : b
		}, set: function (a, c, d) {
			var e = a.getAttributeNode(d);
			return e || a.setAttributeNode(e = a.ownerDocument.createAttribute(d)), e.value = c += "", "value" === d || c === a.getAttribute(d) ? c : b
		}
	}, ab.attrHooks.contenteditable = {
		get: sb.get, set: function (a, b, c) {
			sb.set(a, "" === b ? !1 : b, c)
		}
	}, ab.each(["width", "height"], function (a, b) {
		ab.attrHooks[b] = ab.extend(ab.attrHooks[b], {
			set: function (a, c) {
				return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
			}
		})
	})), ab.support.hrefNormalized || (ab.each(["href", "src", "width", "height"], function (a, c) {
		ab.attrHooks[c] = ab.extend(ab.attrHooks[c], {
			get: function (a) {
				var d = a.getAttribute(c, 2);
				return null == d ? b : d
			}
		})
	}), ab.each(["href", "src"], function (a, b) {
		ab.propHooks[b] = {
			get: function (a) {
				return a.getAttribute(b, 4)
			}
		}
	})), ab.support.style || (ab.attrHooks.style = {
		get: function (a) {
			return a.style.cssText || b
		}, set: function (a, b) {
			return a.style.cssText = b + ""
		}
	}), ab.support.optSelected || (ab.propHooks.selected = ab.extend(ab.propHooks.selected, {
		get: function (a) {
			var b = a.parentNode;
			return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
		}
	})), ab.support.enctype || (ab.propFix.enctype = "encoding"), ab.support.checkOn || ab.each(["radio", "checkbox"], function () {
		ab.valHooks[this] = {
			get: function (a) {
				return null === a.getAttribute("value") ? "on" : a.value
			}
		}
	}), ab.each(["radio", "checkbox"], function () {
		ab.valHooks[this] = ab.extend(ab.valHooks[this], {
			set: function (a, b) {
				return ab.isArray(b) ? a.checked = ab.inArray(ab(a).val(), b) >= 0 : void 0
			}
		})
	});
	var Cb = /^(?:input|select|textarea)$/i, Db = /^key/, Eb = /^(?:mouse|contextmenu)|click/, Fb = /^(?:focusinfocus|focusoutblur)$/, Gb = /^([^.]*)(?:\.(.+)|)$/;
	ab.event = {
		global: {},
		add: function (a, c, d, e, f) {
			var g, h, i, j, k, l, m, n, o, p, q, r = ab._data(a);
			if (r) {
				for (d.handler && (j = d, d = j.handler, f = j.selector), d.guid || (d.guid = ab.guid++), (h = r.events) || (h = r.events = {}), (l = r.handle) || (l = r.handle = function (a) {
					return typeof ab === M || a && ab.event.triggered === a.type ? b : ab.event.dispatch.apply(l.elem, arguments)
				}, l.elem = a), c = (c || "").match(cb) || [""], i = c.length; i--;)g = Gb.exec(c[i]) || [], o = q = g[1], p = (g[2] || "").split(".").sort(), o && (k = ab.event.special[o] || {}, o = (f ? k.delegateType : k.bindType) || o, k = ab.event.special[o] || {}, m = ab.extend({
					type: o,
					origType: q,
					data: e,
					handler: d,
					guid: d.guid,
					selector: f,
					needsContext: f && ab.expr.match.needsContext.test(f),
					namespace: p.join(".")
				}, j), (n = h[o]) || (n = h[o] = [], n.delegateCount = 0, k.setup && k.setup.call(a, e, p, l) !== !1 || (a.addEventListener ? a.addEventListener(o, l, !1) : a.attachEvent && a.attachEvent("on" + o, l))), k.add && (k.add.call(a, m), m.handler.guid || (m.handler.guid = d.guid)), f ? n.splice(n.delegateCount++, 0, m) : n.push(m), ab.event.global[o] = !0);
				a = null
			}
		},
		remove: function (a, b, c, d, e) {
			var f, g, h, i, j, k, l, m, n, o, p, q = ab.hasData(a) && ab._data(a);
			if (q && (k = q.events)) {
				for (b = (b || "").match(cb) || [""], j = b.length; j--;)if (h = Gb.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
					for (l = ab.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = k[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length; f--;)g = m[f], !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
					i && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || ab.removeEvent(a, n, q.handle), delete k[n])
				} else for (n in k)ab.event.remove(a, n + b[j], c, d, !0);
				ab.isEmptyObject(k) && (delete q.handle, ab._removeData(a, "events"))
			}
		},
		trigger: function (c, d, e, f) {
			var g, h, i, j, k, l, m, n = [e || O], o = $.call(c, "type") ? c.type : c, p = $.call(c, "namespace") ? c.namespace.split(".") : [];
			if (i = l = e = e || O, 3 !== e.nodeType && 8 !== e.nodeType && !Fb.test(o + ab.event.triggered) && (o.indexOf(".") >= 0 && (p = o.split("."), o = p.shift(), p.sort()), h = o.indexOf(":") < 0 && "on" + o, c = c[ab.expando] ? c : new ab.Event(o, "object" == typeof c && c), c.isTrigger = !0, c.namespace = p.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, c.result = b, c.target || (c.target = e), d = null == d ? [c] : ab.makeArray(d, [c]), k = ab.event.special[o] || {}, f || !k.trigger || k.trigger.apply(e, d) !== !1)) {
				if (!f && !k.noBubble && !ab.isWindow(e)) {
					for (j = k.delegateType || o, Fb.test(j + o) || (i = i.parentNode); i; i = i.parentNode)n.push(i), l = i;
					l === (e.ownerDocument || O) && n.push(l.defaultView || l.parentWindow || a)
				}
				for (m = 0; (i = n[m++]) && !c.isPropagationStopped();)c.type = m > 1 ? j : k.bindType || o, g = (ab._data(i, "events") || {})[c.type] && ab._data(i, "handle"), g && g.apply(i, d), g = h && i[h], g && ab.acceptData(i) && g.apply && g.apply(i, d) === !1 && c.preventDefault();
				if (c.type = o, !(f || c.isDefaultPrevented() || k._default && k._default.apply(e.ownerDocument, d) !== !1 || "click" === o && ab.nodeName(e, "a") || !ab.acceptData(e) || !h || !e[o] || ab.isWindow(e))) {
					l = e[h], l && (e[h] = null), ab.event.triggered = o;
					try {
						e[o]()
					} catch (q) {
					}
					ab.event.triggered = b, l && (e[h] = l)
				}
				return c.result
			}
		},
		dispatch: function (a) {
			a = ab.event.fix(a);
			var c, d, e, f, g, h = [], i = X.call(arguments), j = (ab._data(this, "events") || {})[a.type] || [], k = ab.event.special[a.type] || {};
			if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
				for (h = ab.event.handlers.call(this, a, j), c = 0; (f = h[c++]) && !a.isPropagationStopped();)for (a.currentTarget = f.elem, g = 0; (e = f.handlers[g++]) && !a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, d = ((ab.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), d !== b && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
				return k.postDispatch && k.postDispatch.call(this, a), a.result
			}
		},
		handlers: function (a, c) {
			var d, e, f, g, h = [], i = c.delegateCount, j = a.target;
			if (i && j.nodeType && (!a.button || "click" !== a.type))for (; j != this; j = j.parentNode || this)if (1 === j.nodeType && (j.disabled !== !0 || "click" !== a.type)) {
				for (f = [], g = 0; i > g; g++)e = c[g], d = e.selector + " ", f[d] === b && (f[d] = e.needsContext ? ab(d, this).index(j) >= 0 : ab.find(d, this, null, [j]).length), f[d] && f.push(e);
				f.length && h.push({elem: j, handlers: f})
			}
			return i < c.length && h.push({elem: this, handlers: c.slice(i)}), h
		},
		fix: function (a) {
			if (a[ab.expando])return a;
			var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
			for (g || (this.fixHooks[e] = g = Eb.test(e) ? this.mouseHooks : Db.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new ab.Event(f), b = d.length; b--;)c = d[b], a[c] = f[c];
			return a.target || (a.target = f.srcElement || O), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a
		},
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "), filter: function (a, b) {
				return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function (a, c) {
				var d, e, f, g = c.button, h = c.fromElement;
				return null == a.pageX && null != c.clientX && (e = a.target.ownerDocument || O, f = e.documentElement, d = e.body, a.pageX = c.clientX + (f && f.scrollLeft || d && d.scrollLeft || 0) - (f && f.clientLeft || d && d.clientLeft || 0), a.pageY = c.clientY + (f && f.scrollTop || d && d.scrollTop || 0) - (f && f.clientTop || d && d.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? c.toElement : h), a.which || g === b || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a
			}
		},
		special: {
			load: {noBubble: !0}, click: {
				trigger: function () {
					return ab.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
				}
			}, focus: {
				trigger: function () {
					if (this !== O.activeElement && this.focus)try {
						return this.focus(), !1
					} catch (a) {
					}
				}, delegateType: "focusin"
			}, blur: {
				trigger: function () {
					return this === O.activeElement && this.blur ? (this.blur(), !1) : void 0
				}, delegateType: "focusout"
			}, beforeunload: {
				postDispatch: function (a) {
					a.result !== b && (a.originalEvent.returnValue = a.result)
				}
			}
		},
		simulate: function (a, b, c, d) {
			var e = ab.extend(new ab.Event, c, {type: a, isSimulated: !0, originalEvent: {}});
			d ? ab.event.trigger(e, null, b) : ab.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
		}
	}, ab.removeEvent = O.removeEventListener ? function (a, b, c) {
		a.removeEventListener && a.removeEventListener(b, c, !1)
	} : function (a, b, c) {
		var d = "on" + b;
		a.detachEvent && (typeof a[d] === M && (a[d] = null), a.detachEvent(d, c))
	}, ab.Event = function (a, b) {
		return this instanceof ab.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? i : j) : this.type = a, b && ab.extend(this, b), this.timeStamp = a && a.timeStamp || ab.now(), this[ab.expando] = !0, void 0) : new ab.Event(a, b)
	}, ab.Event.prototype = {
		isDefaultPrevented: j,
		isPropagationStopped: j,
		isImmediatePropagationStopped: j,
		preventDefault: function () {
			var a = this.originalEvent;
			this.isDefaultPrevented = i, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
		},
		stopPropagation: function () {
			var a = this.originalEvent;
			this.isPropagationStopped = i, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
		},
		stopImmediatePropagation: function () {
			this.isImmediatePropagationStopped = i, this.stopPropagation()
		}
	}, ab.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (a, b) {
		ab.event.special[a] = {
			delegateType: b, bindType: b, handle: function (a) {
				var c, d = this, e = a.relatedTarget, f = a.handleObj;
				return (!e || e !== d && !ab.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
			}
		}
	}), ab.support.submitBubbles || (ab.event.special.submit = {
		setup: function () {
			return ab.nodeName(this, "form") ? !1 : (ab.event.add(this, "click._submit keypress._submit", function (a) {
				var c = a.target, d = ab.nodeName(c, "input") || ab.nodeName(c, "button") ? c.form : b;
				d && !ab._data(d, "submitBubbles") && (ab.event.add(d, "submit._submit", function (a) {
					a._submit_bubble = !0
				}), ab._data(d, "submitBubbles", !0))
			}), void 0)
		}, postDispatch: function (a) {
			a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && ab.event.simulate("submit", this.parentNode, a, !0))
		}, teardown: function () {
			return ab.nodeName(this, "form") ? !1 : (ab.event.remove(this, "._submit"), void 0)
		}
	}), ab.support.changeBubbles || (ab.event.special.change = {
		setup: function () {
			return Cb.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ab.event.add(this, "propertychange._change", function (a) {
				"checked" === a.originalEvent.propertyName && (this._just_changed = !0)
			}), ab.event.add(this, "click._change", function (a) {
				this._just_changed && !a.isTrigger && (this._just_changed = !1), ab.event.simulate("change", this, a, !0)
			})), !1) : (ab.event.add(this, "beforeactivate._change", function (a) {
				var b = a.target;
				Cb.test(b.nodeName) && !ab._data(b, "changeBubbles") && (ab.event.add(b, "change._change", function (a) {
					!this.parentNode || a.isSimulated || a.isTrigger || ab.event.simulate("change", this.parentNode, a, !0)
				}), ab._data(b, "changeBubbles", !0))
			}), void 0)
		}, handle: function (a) {
			var b = a.target;
			return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
		}, teardown: function () {
			return ab.event.remove(this, "._change"), !Cb.test(this.nodeName)
		}
	}), ab.support.focusinBubbles || ab.each({focus: "focusin", blur: "focusout"}, function (a, b) {
		var c = 0, d = function (a) {
			ab.event.simulate(b, a.target, ab.event.fix(a), !0)
		};
		ab.event.special[b] = {
			setup: function () {
				0 === c++ && O.addEventListener(a, d, !0)
			}, teardown: function () {
				0 === --c && O.removeEventListener(a, d, !0)
			}
		}
	}), ab.fn.extend({
		on: function (a, c, d, e, f) {
			var g, h;
			if ("object" == typeof a) {
				"string" != typeof c && (d = d || c, c = b);
				for (g in a)this.on(g, c, d, a[g], f);
				return this
			}
			if (null == d && null == e ? (e = c, d = c = b) : null == e && ("string" == typeof c ? (e = d, d = b) : (e = d, d = c, c = b)), e === !1)e = j; else if (!e)return this;
			return 1 === f && (h = e, e = function (a) {
				return ab().off(a), h.apply(this, arguments)
			}, e.guid = h.guid || (h.guid = ab.guid++)), this.each(function () {
				ab.event.add(this, a, e, d, c)
			})
		}, one: function (a, b, c, d) {
			return this.on(a, b, c, d, 1)
		}, off: function (a, c, d) {
			var e, f;
			if (a && a.preventDefault && a.handleObj)return e = a.handleObj, ab(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
			if ("object" == typeof a) {
				for (f in a)this.off(f, c, a[f]);
				return this
			}
			return (c === !1 || "function" == typeof c) && (d = c, c = b), d === !1 && (d = j), this.each(function () {
				ab.event.remove(this, a, d, c)
			})
		}, bind: function (a, b, c) {
			return this.on(a, null, b, c)
		}, unbind: function (a, b) {
			return this.off(a, null, b)
		}, delegate: function (a, b, c, d) {
			return this.on(b, a, c, d)
		}, undelegate: function (a, b, c) {
			return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
		}, trigger: function (a, b) {
			return this.each(function () {
				ab.event.trigger(a, b, this)
			})
		}, triggerHandler: function (a, b) {
			var c = this[0];
			return c ? ab.event.trigger(a, b, c, !0) : void 0
		}
	}), function (a, b) {
		function c(a) {
			return ub.test(a + "")
		}

		function d() {
			var a, b = [];
			return a = function (c, d) {
				return b.push(c += " ") > A.cacheLength && delete a[b.shift()], a[c] = d
			}
		}

		function e(a) {
			return a[O] = !0, a
		}

		function f(a) {
			var b = H.createElement("div");
			try {
				return !!a(b)
			} catch (c) {
				return !1
			} finally {
				b.parentNode && b.parentNode.removeChild(b), b = null
			}
		}

		function g(a, b, c, d) {
			var e, f, g, h, i, j, k, l, m, p;
			if ((b ? b.ownerDocument || b : P) !== H && G(b), b = b || H, c = c || [], !a || "string" != typeof a)return c;
			if (1 !== (h = b.nodeType) && 9 !== h)return [];
			if (J && !d) {
				if (e = vb.exec(a))if (g = e[1]) {
					if (9 === h) {
						if (f = b.getElementById(g), !f || !f.parentNode)return c;
						if (f.id === g)return c.push(f), c
					} else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && N(b, f) && f.id === g)return c.push(f), c
				} else {
					if (e[2])return db.apply(c, b.getElementsByTagName(a)), c;
					if ((g = e[3]) && Q.getElementsByClassName && b.getElementsByClassName)return db.apply(c, b.getElementsByClassName(g)), c
				}
				if (Q.qsa && (!K || !K.test(a))) {
					if (l = k = O, m = b, p = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
						for (j = n(a), (k = b.getAttribute("id")) ? l = k.replace(yb, "\\$&") : b.setAttribute("id", l), l = "[id='" + l + "'] ", i = j.length; i--;)j[i] = l + o(j[i]);
						m = pb.test(a) && b.parentNode || b, p = j.join(",")
					}
					if (p)try {
						return db.apply(c, m.querySelectorAll(p)), c
					} catch (q) {
					} finally {
						k || b.removeAttribute("id")
					}
				}
			}
			return w(a.replace(mb, "$1"), b, c, d)
		}

		function h(a, b) {
			var c = b && a, d = c && (~b.sourceIndex || Z) - (~a.sourceIndex || Z);
			if (d)return d;
			if (c)for (; c = c.nextSibling;)if (c === b)return -1;
			return a ? 1 : -1
		}

		function i(a, c, d) {
			var e;
			return d ? b : (e = a.getAttributeNode(c)) && e.specified ? e.value : a[c] === !0 ? c.toLowerCase() : null
		}

		function j(a, c, d) {
			var e;
			return d ? b : e = a.getAttribute(c, "type" === c.toLowerCase() ? 1 : 2)
		}

		function k(a) {
			return function (b) {
				var c = b.nodeName.toLowerCase();
				return "input" === c && b.type === a
			}
		}

		function l(a) {
			return function (b) {
				var c = b.nodeName.toLowerCase();
				return ("input" === c || "button" === c) && b.type === a
			}
		}

		function m(a) {
			return e(function (b) {
				return b = +b, e(function (c, d) {
					for (var e, f = a([], c.length, b), g = f.length; g--;)c[e = f[g]] && (c[e] = !(d[e] = c[e]))
				})
			})
		}

		function n(a, b) {
			var c, d, e, f, h, i, j, k = U[a + " "];
			if (k)return b ? 0 : k.slice(0);
			for (h = a, i = [], j = A.preFilter; h;) {
				(!c || (d = nb.exec(h))) && (d && (h = h.slice(d[0].length) || h), i.push(e = [])), c = !1, (d = ob.exec(h)) && (c = d.shift(), e.push({
					value: c,
					type: d[0].replace(mb, " ")
				}), h = h.slice(c.length));
				for (f in A.filter)!(d = tb[f].exec(h)) || j[f] && !(d = j[f](d)) || (c = d.shift(), e.push({
					value: c,
					type: f,
					matches: d
				}), h = h.slice(c.length));
				if (!c)break
			}
			return b ? h.length : h ? g.error(a) : U(a, i).slice(0)
		}

		function o(a) {
			for (var b = 0, c = a.length, d = ""; c > b; b++)d += a[b].value;
			return d
		}

		function p(a, b, c) {
			var d = b.dir, e = c && "parentNode" === d, f = S++;
			return b.first ? function (b, c, f) {
				for (; b = b[d];)if (1 === b.nodeType || e)return a(b, c, f)
			} : function (b, c, g) {
				var h, i, j, k = R + " " + f;
				if (g) {
					for (; b = b[d];)if ((1 === b.nodeType || e) && a(b, c, g))return !0
				} else for (; b = b[d];)if (1 === b.nodeType || e)if (j = b[O] || (b[O] = {}), (i = j[d]) && i[0] === k) {
					if ((h = i[1]) === !0 || h === z)return h === !0
				} else if (i = j[d] = [k], i[1] = a(b, c, g) || z, i[1] === !0)return !0
			}
		}

		function q(a) {
			return a.length > 1 ? function (b, c, d) {
				for (var e = a.length; e--;)if (!a[e](b, c, d))return !1;
				return !0
			} : a[0]
		}

		function r(a, b, c, d, e) {
			for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
			return g
		}

		function s(a, b, c, d, f, g) {
			return d && !d[O] && (d = s(d)), f && !f[O] && (f = s(f, g)), e(function (e, g, h, i) {
				var j, k, l, m = [], n = [], o = g.length, p = e || v(b || "*", h.nodeType ? [h] : h, []), q = !a || !e && b ? p : r(p, m, a, h, i), s = c ? f || (e ? a : o || d) ? [] : g : q;
				if (c && c(q, s, h, i), d)for (j = r(s, n), d(j, [], h, i), k = j.length; k--;)(l = j[k]) && (s[n[k]] = !(q[n[k]] = l));
				if (e) {
					if (f || a) {
						if (f) {
							for (j = [], k = s.length; k--;)(l = s[k]) && j.push(q[k] = l);
							f(null, s = [], j, i)
						}
						for (k = s.length; k--;)(l = s[k]) && (j = f ? fb.call(e, l) : m[k]) > -1 && (e[j] = !(g[j] = l))
					}
				} else s = r(s === g ? s.splice(o, s.length) : s), f ? f(null, g, s, i) : db.apply(g, s)
			})
		}

		function t(a) {
			for (var b, c, d, e = a.length, f = A.relative[a[0].type], g = f || A.relative[" "], h = f ? 1 : 0, i = p(function (a) {
				return a === b
			}, g, !0), j = p(function (a) {
				return fb.call(b, a) > -1
			}, g, !0), k = [function (a, c, d) {
				return !f && (d || c !== E) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d))
			}]; e > h; h++)if (c = A.relative[a[h].type])k = [p(q(k), c)]; else {
				if (c = A.filter[a[h].type].apply(null, a[h].matches), c[O]) {
					for (d = ++h; e > d && !A.relative[a[d].type]; d++);
					return s(h > 1 && q(k), h > 1 && o(a.slice(0, h - 1)).replace(mb, "$1"), c, d > h && t(a.slice(h, d)), e > d && t(a = a.slice(d)), e > d && o(a))
				}
				k.push(c)
			}
			return q(k)
		}

		function u(a, b) {
			var c = 0, d = b.length > 0, f = a.length > 0, h = function (e, h, i, j, k) {
				var l, m, n, o = [], p = 0, q = "0", s = e && [], t = null != k, u = E, v = e || f && A.find.TAG("*", k && h.parentNode || h), w = R += null == u ? 1 : Math.random() || .1;
				for (t && (E = h !== H && h, z = c); null != (l = v[q]); q++) {
					if (f && l) {
						for (m = 0; n = a[m++];)if (n(l, h, i)) {
							j.push(l);
							break
						}
						t && (R = w, z = ++c)
					}
					d && ((l = !n && l) && p--, e && s.push(l))
				}
				if (p += q, d && q !== p) {
					for (m = 0; n = b[m++];)n(s, o, h, i);
					if (e) {
						if (p > 0)for (; q--;)s[q] || o[q] || (o[q] = bb.call(j));
						o = r(o)
					}
					db.apply(j, o), t && !e && o.length > 0 && p + b.length > 1 && g.uniqueSort(j)
				}
				return t && (R = w, E = u), s
			};
			return d ? e(h) : h
		}

		function v(a, b, c) {
			for (var d = 0, e = b.length; e > d; d++)g(a, b[d], c);
			return c
		}

		function w(a, b, c, d) {
			var e, f, g, h, i, j = n(a);
			if (!d && 1 === j.length) {
				if (f = j[0] = j[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && 9 === b.nodeType && J && A.relative[f[1].type]) {
					if (b = (A.find.ID(g.matches[0].replace(zb, Ab), b) || [])[0], !b)return c;
					a = a.slice(f.shift().value.length)
				}
				for (e = tb.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !A.relative[h = g.type]);)if ((i = A.find[h]) && (d = i(g.matches[0].replace(zb, Ab), pb.test(f[0].type) && b.parentNode || b))) {
					if (f.splice(e, 1), a = d.length && o(f), !a)return db.apply(c, d), c;
					break
				}
			}
			return D(a, j)(d, b, !J, c, pb.test(a)), c
		}

		function x() {
		}

		var y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O = "sizzle" + -new Date, P = a.document, Q = {}, R = 0, S = 0, T = d(), U = d(), V = d(), W = !1, X = function () {
			return 0
		}, Y = typeof b, Z = 1 << 31, $ = Q.hasOwnProperty, _ = [], bb = _.pop, cb = _.push, db = _.push, eb = _.slice, fb = _.indexOf || function (a) {
				for (var b = 0, c = this.length; c > b; b++)if (this[b] === a)return b;
				return -1
			}, gb = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", hb = "[\\x20\\t\\r\\n\\f]", ib = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", jb = ib.replace("w", "w#"), kb = "\\[" + hb + "*(" + ib + ")" + hb + "*(?:([*^$|!~]?=)" + hb + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + jb + ")|)|)" + hb + "*\\]", lb = ":(" + ib + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + kb.replace(3, 8) + ")*)|.*)\\)|)", mb = new RegExp("^" + hb + "+|((?:^|[^\\\\])(?:\\\\.)*)" + hb + "+$", "g"), nb = new RegExp("^" + hb + "*," + hb + "*"), ob = new RegExp("^" + hb + "*([>+~]|" + hb + ")" + hb + "*"), pb = new RegExp(hb + "*[+~]"), qb = new RegExp("=" + hb + "*([^\\]'\"]*)" + hb + "*\\]", "g"), rb = new RegExp(lb), sb = new RegExp("^" + jb + "$"), tb = {
			ID: new RegExp("^#(" + ib + ")"),
			CLASS: new RegExp("^\\.(" + ib + ")"),
			TAG: new RegExp("^(" + ib.replace("w", "w*") + ")"),
			ATTR: new RegExp("^" + kb),
			PSEUDO: new RegExp("^" + lb),
			CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + hb + "*(even|odd|(([+-]|)(\\d*)n|)" + hb + "*(?:([+-]|)" + hb + "*(\\d+)|))" + hb + "*\\)|)", "i"),
			"boolean": new RegExp("^(?:" + gb + ")$", "i"),
			needsContext: new RegExp("^" + hb + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + hb + "*((?:-\\d)?\\d*)" + hb + "*\\)|)(?=[^-]|$)", "i")
		}, ub = /^[^{]+\{\s*\[native \w/, vb = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, wb = /^(?:input|select|textarea|button)$/i, xb = /^h\d$/i, yb = /'|\\/g, zb = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g, Ab = function (a, b) {
			var c = "0x" + b - 65536;
			return c !== c ? b : 0 > c ? String.fromCharCode(c + 65536) : String.fromCharCode(c >> 10 | 55296, 1023 & c | 56320)
		};
		try {
			db.apply(_ = eb.call(P.childNodes), P.childNodes), _[P.childNodes.length].nodeType
		} catch (Bb) {
			db = {
				apply: _.length ? function (a, b) {
					cb.apply(a, eb.call(b))
				} : function (a, b) {
					for (var c = a.length, d = 0; a[c++] = b[d++];);
					a.length = c - 1
				}
			}
		}
		C = g.isXML = function (a) {
			var b = a && (a.ownerDocument || a).documentElement;
			return b ? "HTML" !== b.nodeName : !1
		}, G = g.setDocument = function (a) {
			var d = a ? a.ownerDocument || a : P;
			return d !== H && 9 === d.nodeType && d.documentElement ? (H = d, I = d.documentElement, J = !C(d), Q.getElementsByTagName = f(function (a) {
				return a.appendChild(d.createComment("")), !a.getElementsByTagName("*").length
			}), Q.attributes = f(function (a) {
				return a.className = "i", !a.getAttribute("className")
			}), Q.getElementsByClassName = f(function (a) {
				return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
			}), Q.sortDetached = f(function (a) {
				return 1 & a.compareDocumentPosition(H.createElement("div"))
			}), Q.getById = f(function (a) {
				return I.appendChild(a).id = O, !d.getElementsByName || !d.getElementsByName(O).length
			}), Q.getById ? (A.find.ID = function (a, b) {
				if (typeof b.getElementById !== Y && J) {
					var c = b.getElementById(a);
					return c && c.parentNode ? [c] : []
				}
			}, A.filter.ID = function (a) {
				var b = a.replace(zb, Ab);
				return function (a) {
					return a.getAttribute("id") === b
				}
			}) : (A.find.ID = function (a, c) {
				if (typeof c.getElementById !== Y && J) {
					var d = c.getElementById(a);
					return d ? d.id === a || typeof d.getAttributeNode !== Y && d.getAttributeNode("id").value === a ? [d] : b : []
				}
			}, A.filter.ID = function (a) {
				var b = a.replace(zb, Ab);
				return function (a) {
					var c = typeof a.getAttributeNode !== Y && a.getAttributeNode("id");
					return c && c.value === b
				}
			}), A.find.TAG = Q.getElementsByTagName ? function (a, b) {
				return typeof b.getElementsByTagName !== Y ? b.getElementsByTagName(a) : void 0
			} : function (a, b) {
				var c, d = [], e = 0, f = b.getElementsByTagName(a);
				if ("*" === a) {
					for (; c = f[e++];)1 === c.nodeType && d.push(c);
					return d
				}
				return f
			}, A.find.CLASS = Q.getElementsByClassName && function (a, b) {
					return typeof b.getElementsByClassName !== Y && J ? b.getElementsByClassName(a) : void 0
				}, L = [], K = [], (Q.qsa = c(d.querySelectorAll)) && (f(function (a) {
				a.innerHTML = "<select><option selected=''></option></select>", a.querySelectorAll("[selected]").length || K.push("\\[" + hb + "*(?:value|" + gb + ")"), a.querySelectorAll(":checked").length || K.push(":checked")
			}), f(function (a) {
				var b = H.createElement("input");
				b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("t", ""), a.querySelectorAll("[t^='']").length && K.push("[*^$]=" + hb + "*(?:''|\"\")"), a.querySelectorAll(":enabled").length || K.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), K.push(",.*:")
			})), (Q.matchesSelector = c(M = I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && f(function (a) {
				Q.disconnectedMatch = M.call(a, "div"), M.call(a, "[s!='']:x"), L.push("!=", lb)
			}), K = K.length && new RegExp(K.join("|")), L = L.length && new RegExp(L.join("|")), N = c(I.contains) || I.compareDocumentPosition ? function (a, b) {
				var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
				return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
			} : function (a, b) {
				if (b)for (; b = b.parentNode;)if (b === a)return !0;
				return !1
			}, X = I.compareDocumentPosition ? function (a, b) {
				if (a === b)return W = !0, 0;
				var c = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b);
				return c ? 1 & c || !Q.sortDetached && b.compareDocumentPosition(a) === c ? a === d || N(P, a) ? -1 : b === d || N(P, b) ? 1 : F ? fb.call(F, a) - fb.call(F, b) : 0 : 4 & c ? -1 : 1 : a.compareDocumentPosition ? -1 : 1
			} : function (a, b) {
				var c, e = 0, f = a.parentNode, g = b.parentNode, i = [a], j = [b];
				if (a === b)return W = !0, 0;
				if (!f || !g)return a === d ? -1 : b === d ? 1 : f ? -1 : g ? 1 : F ? fb.call(F, a) - fb.call(F, b) : 0;
				if (f === g)return h(a, b);
				for (c = a; c = c.parentNode;)i.unshift(c);
				for (c = b; c = c.parentNode;)j.unshift(c);
				for (; i[e] === j[e];)e++;
				return e ? h(i[e], j[e]) : i[e] === P ? -1 : j[e] === P ? 1 : 0
			}, H) : H
		}, g.matches = function (a, b) {
			return g(a, null, null, b)
		}, g.matchesSelector = function (a, b) {
			if ((a.ownerDocument || a) !== H && G(a), b = b.replace(qb, "='$1']"), !(!Q.matchesSelector || !J || L && L.test(b) || K && K.test(b)))try {
				var c = M.call(a, b);
				if (c || Q.disconnectedMatch || a.document && 11 !== a.document.nodeType)return c
			} catch (d) {
			}
			return g(b, H, null, [a]).length > 0
		}, g.contains = function (a, b) {
			return (a.ownerDocument || a) !== H && G(a), N(a, b)
		}, g.attr = function (a, c) {
			(a.ownerDocument || a) !== H && G(a);
			var d = A.attrHandle[c.toLowerCase()], e = d && ($.call(A.attrHandle, c.toLowerCase()) ? d(a, c, !J) : b);
			return e === b ? Q.attributes || !J ? a.getAttribute(c) : (e = a.getAttributeNode(c)) && e.specified ? e.value : null : e
		}, g.error = function (a) {
			throw new Error("Syntax error, unrecognized expression: " + a)
		}, g.uniqueSort = function (a) {
			var b, c = [], d = 0, e = 0;
			if (W = !Q.detectDuplicates, F = !Q.sortStable && a.slice(0), a.sort(X), W) {
				for (; b = a[e++];)b === a[e] && (d = c.push(e));
				for (; d--;)a.splice(c[d], 1)
			}
			return a
		}, B = g.getText = function (a) {
			var b, c = "", d = 0, e = a.nodeType;
			if (e) {
				if (1 === e || 9 === e || 11 === e) {
					if ("string" == typeof a.textContent)return a.textContent;
					for (a = a.firstChild; a; a = a.nextSibling)c += B(a)
				} else if (3 === e || 4 === e)return a.nodeValue
			} else for (; b = a[d]; d++)c += B(b);
			return c
		}, A = g.selectors = {
			cacheLength: 50,
			createPseudo: e,
			match: tb,
			attrHandle: {},
			find: {},
			relative: {
				">": {dir: "parentNode", first: !0},
				" ": {dir: "parentNode"},
				"+": {dir: "previousSibling", first: !0},
				"~": {dir: "previousSibling"}
			},
			preFilter: {
				ATTR: function (a) {
					return a[1] = a[1].replace(zb, Ab), a[3] = (a[4] || a[5] || "").replace(zb, Ab), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
				}, CHILD: function (a) {
					return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || g.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && g.error(a[0]), a
				}, PSEUDO: function (a) {
					var b, c = !a[5] && a[2];
					return tb.CHILD.test(a[0]) ? null : (a[4] ? a[2] = a[4] : c && rb.test(c) && (b = n(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
				}
			},
			filter: {
				TAG: function (a) {
					var b = a.replace(zb, Ab).toLowerCase();
					return "*" === a ? function () {
						return !0
					} : function (a) {
						return a.nodeName && a.nodeName.toLowerCase() === b
					}
				}, CLASS: function (a) {
					var b = T[a + " "];
					return b || (b = new RegExp("(^|" + hb + ")" + a + "(" + hb + "|$)")) && T(a, function (a) {
							return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== Y && a.getAttribute("class") || "")
						})
				}, ATTR: function (a, b, c) {
					return function (d) {
						var e = g.attr(d, a);
						return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
					}
				}, CHILD: function (a, b, c, d, e) {
					var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
					return 1 === d && 0 === e ? function (a) {
						return !!a.parentNode
					} : function (b, c, i) {
						var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h;
						if (q) {
							if (f) {
								for (; p;) {
									for (l = b; l = l[p];)if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType)return !1;
									o = p = "only" === a && !o && "nextSibling"
								}
								return !0
							}
							if (o = [g ? q.firstChild : q.lastChild], g && s) {
								for (k = q[O] || (q[O] = {}), j = k[a] || [], n = j[0] === R && j[1], m = j[0] === R && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)if (1 === l.nodeType && ++m && l === b) {
									k[a] = [R, n, m];
									break
								}
							} else if (s && (j = (b[O] || (b[O] = {}))[a]) && j[0] === R)m = j[1]; else for (; (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[O] || (l[O] = {}))[a] = [R, m]), l !== b)););
							return m -= e, m === d || m % d === 0 && m / d >= 0
						}
					}
				}, PSEUDO: function (a, b) {
					var c, d = A.pseudos[a] || A.setFilters[a.toLowerCase()] || g.error("unsupported pseudo: " + a);
					return d[O] ? d(b) : d.length > 1 ? (c = [a, a, "", b], A.setFilters.hasOwnProperty(a.toLowerCase()) ? e(function (a, c) {
						for (var e, f = d(a, b), g = f.length; g--;)e = fb.call(a, f[g]), a[e] = !(c[e] = f[g])
					}) : function (a) {
						return d(a, 0, c)
					}) : d
				}
			},
			pseudos: {
				not: e(function (a) {
					var b = [], c = [], d = D(a.replace(mb, "$1"));
					return d[O] ? e(function (a, b, c, e) {
						for (var f, g = d(a, null, e, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
					}) : function (a, e, f) {
						return b[0] = a, d(b, null, f, c), !c.pop()
					}
				}), has: e(function (a) {
					return function (b) {
						return g(a, b).length > 0
					}
				}), contains: e(function (a) {
					return function (b) {
						return (b.textContent || b.innerText || B(b)).indexOf(a) > -1
					}
				}), lang: e(function (a) {
					return sb.test(a || "") || g.error("unsupported lang: " + a), a = a.replace(zb, Ab).toLowerCase(), function (b) {
						var c;
						do if (c = J ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
						return !1
					}
				}), target: function (b) {
					var c = a.location && a.location.hash;
					return c && c.slice(1) === b.id
				}, root: function (a) {
					return a === I
				}, focus: function (a) {
					return a === H.activeElement && (!H.hasFocus || H.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
				}, enabled: function (a) {
					return a.disabled === !1
				}, disabled: function (a) {
					return a.disabled === !0
				}, checked: function (a) {
					var b = a.nodeName.toLowerCase();
					return "input" === b && !!a.checked || "option" === b && !!a.selected
				}, selected: function (a) {
					return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
				}, empty: function (a) {
					for (a = a.firstChild; a; a = a.nextSibling)if (a.nodeName > "@" || 3 === a.nodeType || 4 === a.nodeType)return !1;
					return !0
				}, parent: function (a) {
					return !A.pseudos.empty(a)
				}, header: function (a) {
					return xb.test(a.nodeName)
				}, input: function (a) {
					return wb.test(a.nodeName)
				}, button: function (a) {
					var b = a.nodeName.toLowerCase();
					return "input" === b && "button" === a.type || "button" === b
				}, text: function (a) {
					var b;
					return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || b.toLowerCase() === a.type)
				}, first: m(function () {
					return [0]
				}), last: m(function (a, b) {
					return [b - 1]
				}), eq: m(function (a, b, c) {
					return [0 > c ? c + b : c]
				}), even: m(function (a, b) {
					for (var c = 0; b > c; c += 2)a.push(c);
					return a
				}), odd: m(function (a, b) {
					for (var c = 1; b > c; c += 2)a.push(c);
					return a
				}), lt: m(function (a, b, c) {
					for (var d = 0 > c ? c + b : c; --d >= 0;)a.push(d);
					return a
				}), gt: m(function (a, b, c) {
					for (var d = 0 > c ? c + b : c; ++d < b;)a.push(d);
					return a
				})
			}
		};
		for (y in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})A.pseudos[y] = k(y);
		for (y in{submit: !0, reset: !0})A.pseudos[y] = l(y);
		D = g.compile = function (a, b) {
			var c, d = [], e = [], f = V[a + " "];
			if (!f) {
				for (b || (b = n(a)), c = b.length; c--;)f = t(b[c]), f[O] ? d.push(f) : e.push(f);
				f = V(a, u(e, d))
			}
			return f
		}, A.pseudos.nth = A.pseudos.eq, x.prototype = A.filters = A.pseudos, A.setFilters = new x, Q.sortStable = O.split("").sort(X).join("") === O, G(), [0, 0].sort(X), Q.detectDuplicates = W, f(function (a) {
			if (a.innerHTML = "<a href='#'></a>", "#" !== a.firstChild.getAttribute("href"))for (var b = "type|href|height|width".split("|"), c = b.length; c--;)A.attrHandle[b[c]] = j
		}), f(function (a) {
			if (null != a.getAttribute("disabled"))for (var b = gb.split("|"), c = b.length; c--;)A.attrHandle[b[c]] = i
		}), ab.find = g, ab.expr = g.selectors, ab.expr[":"] = ab.expr.pseudos, ab.unique = g.uniqueSort, ab.text = g.getText, ab.isXMLDoc = g.isXML, ab.contains = g.contains
	}(a);
	var Hb = /Until$/, Ib = /^(?:parents|prev(?:Until|All))/, Jb = /^.[^:#\[\.,]*$/, Kb = ab.expr.match.needsContext, Lb = {
		children: !0,
		contents: !0,
		next: !0,
		prev: !0
	};
	ab.fn.extend({
		find: function (a) {
			var b, c, d, e = this.length;
			if ("string" != typeof a)return d = this, this.pushStack(ab(a).filter(function () {
				for (b = 0; e > b; b++)if (ab.contains(d[b], this))return !0
			}));
			for (c = [], b = 0; e > b; b++)ab.find(a, this[b], c);
			return c = this.pushStack(e > 1 ? ab.unique(c) : c), c.selector = (this.selector ? this.selector + " " : "") + a, c
		}, has: function (a) {
			var b, c = ab(a, this), d = c.length;
			return this.filter(function () {
				for (b = 0; d > b; b++)if (ab.contains(this, c[b]))return !0
			})
		}, not: function (a) {
			return this.pushStack(l(this, a, !1))
		}, filter: function (a) {
			return this.pushStack(l(this, a, !0))
		}, is: function (a) {
			return !!a && ("string" == typeof a ? Kb.test(a) ? ab(a, this.context).index(this[0]) >= 0 : ab.filter(a, this).length > 0 : this.filter(a).length > 0)
		}, closest: function (a, b) {
			for (var c, d = 0, e = this.length, f = [], g = Kb.test(a) || "string" != typeof a ? ab(a, b || this.context) : 0; e > d; d++)for (c = this[d]; c && c !== b; c = c.parentNode)if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && ab.find.matchesSelector(c, a))) {
				c = f.push(c);
				break
			}
			return this.pushStack(f.length > 1 ? ab.unique(f) : f)
		}, index: function (a) {
			return a ? "string" == typeof a ? ab.inArray(this[0], ab(a)) : ab.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		}, add: function (a, b) {
			var c = "string" == typeof a ? ab(a, b) : ab.makeArray(a && a.nodeType ? [a] : a), d = ab.merge(this.get(), c);
			return this.pushStack(ab.unique(d))
		}, addBack: function (a) {
			return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
		}
	}), ab.fn.andSelf = ab.fn.addBack, ab.each({
		parent: function (a) {
			var b = a.parentNode;
			return b && 11 !== b.nodeType ? b : null
		}, parents: function (a) {
			return ab.dir(a, "parentNode")
		}, parentsUntil: function (a, b, c) {
			return ab.dir(a, "parentNode", c)
		}, next: function (a) {
			return k(a, "nextSibling")
		}, prev: function (a) {
			return k(a, "previousSibling")
		}, nextAll: function (a) {
			return ab.dir(a, "nextSibling")
		}, prevAll: function (a) {
			return ab.dir(a, "previousSibling")
		}, nextUntil: function (a, b, c) {
			return ab.dir(a, "nextSibling", c)
		}, prevUntil: function (a, b, c) {
			return ab.dir(a, "previousSibling", c)
		}, siblings: function (a) {
			return ab.sibling((a.parentNode || {}).firstChild, a)
		}, children: function (a) {
			return ab.sibling(a.firstChild)
		}, contents: function (a) {
			return ab.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : ab.merge([], a.childNodes)
		}
	}, function (a, b) {
		ab.fn[a] = function (c, d) {
			var e = ab.map(this, b, c);
			return Hb.test(a) || (d = c), d && "string" == typeof d && (e = ab.filter(d, e)), e = this.length > 1 && !Lb[a] ? ab.unique(e) : e, this.length > 1 && Ib.test(a) && (e = e.reverse()), this.pushStack(e)
		}
	}), ab.extend({
		filter: function (a, b, c) {
			return c && (a = ":not(" + a + ")"), 1 === b.length ? ab.find.matchesSelector(b[0], a) ? [b[0]] : [] : ab.find.matches(a, b)
		}, dir: function (a, c, d) {
			for (var e = [], f = a[c]; f && 9 !== f.nodeType && (d === b || 1 !== f.nodeType || !ab(f).is(d));)1 === f.nodeType && e.push(f), f = f[c];
			return e
		}, sibling: function (a, b) {
			for (var c = []; a; a = a.nextSibling)1 === a.nodeType && a !== b && c.push(a);
			return c
		}
	});
	var Mb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Nb = / jQuery\d+="(?:null|\d+)"/g, Ob = new RegExp("<(?:" + Mb + ")[\\s/>]", "i"), Pb = /^\s+/, Qb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Rb = /<([\w:]+)/, Sb = /<tbody/i, Tb = /<|&#?\w+;/, Ub = /<(?:script|style|link)/i, Vb = /^(?:checkbox|radio)$/i, Wb = /checked\s*(?:[^=]|=\s*.checked.)/i, Xb = /^$|\/(?:java|ecma)script/i, Yb = /^true\/(.*)/, Zb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, $b = {
		option: [1, "<select multiple='multiple'>", "</select>"],
		legend: [1, "<fieldset>", "</fieldset>"],
		area: [1, "<map>", "</map>"],
		param: [1, "<object>", "</object>"],
		thead: [1, "<table>", "</table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
		_default: ab.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
	}, _b = m(O), ac = _b.appendChild(O.createElement("div"));
	$b.optgroup = $b.option, $b.tbody = $b.tfoot = $b.colgroup = $b.caption = $b.thead, $b.th = $b.td, ab.fn.extend({
		text: function (a) {
			return ab.access(this, function (a) {
				return a === b ? ab.text(this) : this.empty().append((this[0] && this[0].ownerDocument || O).createTextNode(a))
			}, null, a, arguments.length)
		}, wrapAll: function (a) {
			if (ab.isFunction(a))return this.each(function (b) {
				ab(this).wrapAll(a.call(this, b))
			});
			if (this[0]) {
				var b = ab(a, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
					for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;)a = a.firstChild;
					return a
				}).append(this)
			}
			return this
		}, wrapInner: function (a) {
			return ab.isFunction(a) ? this.each(function (b) {
				ab(this).wrapInner(a.call(this, b))
			}) : this.each(function () {
				var b = ab(this), c = b.contents();
				c.length ? c.wrapAll(a) : b.append(a)
			})
		}, wrap: function (a) {
			var b = ab.isFunction(a);
			return this.each(function (c) {
				ab(this).wrapAll(b ? a.call(this, c) : a)
			})
		}, unwrap: function () {
			return this.parent().each(function () {
				ab.nodeName(this, "body") || ab(this).replaceWith(this.childNodes)
			}).end()
		}, append: function () {
			return this.domManip(arguments, !0, function (a) {
				(1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.appendChild(a)
			})
		}, prepend: function () {
			return this.domManip(arguments, !0, function (a) {
				(1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.insertBefore(a, this.firstChild)
			})
		}, before: function () {
			return this.domManip(arguments, !1, function (a) {
				this.parentNode && this.parentNode.insertBefore(a, this)
			})
		}, after: function () {
			return this.domManip(arguments, !1, function (a) {
				this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
			})
		}, remove: function (a, b) {
			for (var c, d = 0; null != (c = this[d]); d++)(!a || ab.filter(a, [c]).length > 0) && (b || 1 !== c.nodeType || ab.cleanData(t(c)), c.parentNode && (b && ab.contains(c.ownerDocument, c) && q(t(c, "script")), c.parentNode.removeChild(c)));
			return this
		}, empty: function () {
			for (var a, b = 0; null != (a = this[b]); b++) {
				for (1 === a.nodeType && ab.cleanData(t(a, !1)); a.firstChild;)a.removeChild(a.firstChild);
				a.options && ab.nodeName(a, "select") && (a.options.length = 0)
			}
			return this
		}, clone: function (a, b) {
			return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
				return ab.clone(this, a, b)
			})
		}, html: function (a) {
			return ab.access(this, function (a) {
				var c = this[0] || {}, d = 0, e = this.length;
				if (a === b)return 1 === c.nodeType ? c.innerHTML.replace(Nb, "") : b;
				if (!("string" != typeof a || Ub.test(a) || !ab.support.htmlSerialize && Ob.test(a) || !ab.support.leadingWhitespace && Pb.test(a) || $b[(Rb.exec(a) || ["", ""])[1].toLowerCase()])) {
					a = a.replace(Qb, "<$1></$2>");
					try {
						for (; e > d; d++)c = this[d] || {}, 1 === c.nodeType && (ab.cleanData(t(c, !1)), c.innerHTML = a);
						c = 0
					} catch (f) {
					}
				}
				c && this.empty().append(a)
			}, null, a, arguments.length)
		}, replaceWith: function (a) {
			var b = ab.isFunction(a);
			return b || "string" == typeof a || (a = ab(a).not(this).detach()), "" !== a ? this.domManip([a], !0, function (a) {
				var b = this.nextSibling, c = this.parentNode;
				c && (ab(this).remove(), c.insertBefore(a, b))
			}) : this.remove()
		}, detach: function (a) {
			return this.remove(a, !0)
		}, domManip: function (a, c, d) {
			a = V.apply([], a);
			var e, f, g, h, i, j, k = 0, l = this.length, m = this, q = l - 1, r = a[0], s = ab.isFunction(r);
			if (s || !(1 >= l || "string" != typeof r || ab.support.checkClone) && Wb.test(r))return this.each(function (e) {
				var f = m.eq(e);
				s && (a[0] = r.call(this, e, c ? f.html() : b)), f.domManip(a, c, d)
			});
			if (l && (j = ab.buildFragment(a, this[0].ownerDocument, !1, this), e = j.firstChild, 1 === j.childNodes.length && (j = e), e)) {
				for (c = c && ab.nodeName(e, "tr"), h = ab.map(t(j, "script"), o), g = h.length; l > k; k++)f = j, k !== q && (f = ab.clone(f, !0, !0), g && ab.merge(h, t(f, "script"))), d.call(c && ab.nodeName(this[k], "table") ? n(this[k], "tbody") : this[k], f, k);
				if (g)for (i = h[h.length - 1].ownerDocument, ab.map(h, p), k = 0; g > k; k++)f = h[k], Xb.test(f.type || "") && !ab._data(f, "globalEval") && ab.contains(i, f) && (f.src ? ab.ajax({
					url: f.src,
					type: "GET",
					dataType: "script",
					async: !1,
					global: !1,
					"throws": !0
				}) : ab.globalEval((f.text || f.textContent || f.innerHTML || "").replace(Zb, "")));
				j = e = null
			}
			return this
		}
	}), ab.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (a, b) {
		ab.fn[a] = function (a) {
			for (var c, d = 0, e = [], f = ab(a), g = f.length - 1; g >= d; d++)c = d === g ? this : this.clone(!0), ab(f[d])[b](c), W.apply(e, c.get());
			return this.pushStack(e)
		}
	}), ab.extend({
		clone: function (a, b, c) {
			var d, e, f, g, h, i = ab.contains(a.ownerDocument, a);
			if (ab.support.html5Clone || ab.isXMLDoc(a) || !Ob.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (ac.innerHTML = a.outerHTML, ac.removeChild(f = ac.firstChild)), !(ab.support.noCloneEvent && ab.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || ab.isXMLDoc(a)))for (d = t(f), h = t(a), g = 0; null != (e = h[g]); ++g)d[g] && s(e, d[g]);
			if (b)if (c)for (h = h || t(a), d = d || t(f), g = 0; null != (e = h[g]); g++)r(e, d[g]); else r(a, f);
			return d = t(f, "script"), d.length > 0 && q(d, !i && t(a, "script")), d = h = e = null, f
		}, buildFragment: function (a, b, c, d) {
			for (var e, f, g, h, i, j, k, l = a.length, n = m(b), o = [], p = 0; l > p; p++)if (f = a[p], f || 0 === f)if ("object" === ab.type(f))ab.merge(o, f.nodeType ? [f] : f); else if (Tb.test(f)) {
				for (h = h || n.appendChild(b.createElement("div")), i = (Rb.exec(f) || ["", ""])[1].toLowerCase(), k = $b[i] || $b._default, h.innerHTML = k[1] + f.replace(Qb, "<$1></$2>") + k[2], e = k[0]; e--;)h = h.lastChild;
				if (!ab.support.leadingWhitespace && Pb.test(f) && o.push(b.createTextNode(Pb.exec(f)[0])), !ab.support.tbody)for (f = "table" !== i || Sb.test(f) ? "<table>" !== k[1] || Sb.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length; e--;)ab.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j);
				for (ab.merge(o, h.childNodes), h.textContent = ""; h.firstChild;)h.removeChild(h.firstChild);
				h = n.lastChild
			} else o.push(b.createTextNode(f));
			for (h && n.removeChild(h), ab.support.appendChecked || ab.grep(t(o, "input"), u), p = 0; f = o[p++];)if ((!d || -1 === ab.inArray(f, d)) && (g = ab.contains(f.ownerDocument, f), h = t(n.appendChild(f), "script"), g && q(h), c))for (e = 0; f = h[e++];)Xb.test(f.type || "") && c.push(f);
			return h = null, n
		}, cleanData: function (a, b) {
			for (var c, d, e, f, g = 0, h = ab.expando, i = ab.cache, j = ab.support.deleteExpando, k = ab.event.special; null != (c = a[g]); g++)if ((b || ab.acceptData(c)) && (e = c[h], f = e && i[e])) {
				if (f.events)for (d in f.events)k[d] ? ab.event.remove(c, d) : ab.removeEvent(c, d, f.handle);
				i[e] && (delete i[e], j ? delete c[h] : typeof c.removeAttribute !== M ? c.removeAttribute(h) : c[h] = null, T.push(e))
			}
		}
	});
	var bc, cc, dc, ec = /alpha\([^)]*\)/i, fc = /opacity\s*=\s*([^)]*)/, gc = /^(top|right|bottom|left)$/, hc = /^(none|table(?!-c[ea]).+)/, ic = /^margin/, jc = new RegExp("^(" + bb + ")(.*)$", "i"), kc = new RegExp("^(" + bb + ")(?!px)[a-z%]+$", "i"), lc = new RegExp("^([+-])=(" + bb + ")", "i"), mc = {BODY: "block"}, nc = {
		position: "absolute",
		visibility: "hidden",
		display: "block"
	}, oc = {
		letterSpacing: 0,
		fontWeight: 400
	}, pc = ["Top", "Right", "Bottom", "Left"], qc = ["Webkit", "O", "Moz", "ms"];
	ab.fn.extend({
		css: function (a, c) {
			return ab.access(this, function (a, c, d) {
				var e, f, g = {}, h = 0;
				if (ab.isArray(c)) {
					for (f = cc(a), e = c.length; e > h; h++)g[c[h]] = ab.css(a, c[h], !1, f);
					return g
				}
				return d !== b ? ab.style(a, c, d) : ab.css(a, c)
			}, a, c, arguments.length > 1)
		}, show: function () {
			return x(this, !0)
		}, hide: function () {
			return x(this)
		}, toggle: function (a) {
			var b = "boolean" == typeof a;
			return this.each(function () {
				(b ? a : w(this)) ? ab(this).show() : ab(this).hide()
			})
		}
	}), ab.extend({
		cssHooks: {
			opacity: {
				get: function (a, b) {
					if (b) {
						var c = dc(a, "opacity");
						return "" === c ? "1" : c
					}
				}
			}
		},
		cssNumber: {
			columnCount: !0,
			fillOpacity: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {"float": ab.support.cssFloat ? "cssFloat" : "styleFloat"},
		style: function (a, c, d, e) {
			if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
				var f, g, h, i = ab.camelCase(c), j = a.style;
				if (c = ab.cssProps[i] || (ab.cssProps[i] = v(j, i)), h = ab.cssHooks[c] || ab.cssHooks[i], d === b)return h && "get"in h && (f = h.get(a, !1, e)) !== b ? f : j[c];
				if (g = typeof d, "string" === g && (f = lc.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat(ab.css(a, c)), g = "number"), !(null == d || "number" === g && isNaN(d) || ("number" !== g || ab.cssNumber[i] || (d += "px"), ab.support.clearCloneStyle || "" !== d || 0 !== c.indexOf("background") || (j[c] = "inherit"), h && "set"in h && (d = h.set(a, d, e)) === b)))try {
					j[c] = d
				} catch (k) {
				}
			}
		},
		css: function (a, c, d, e) {
			var f, g, h, i = ab.camelCase(c);
			return c = ab.cssProps[i] || (ab.cssProps[i] = v(a.style, i)), h = ab.cssHooks[c] || ab.cssHooks[i], h && "get"in h && (g = h.get(a, !0, d)), g === b && (g = dc(a, c, e)), "normal" === g && c in oc && (g = oc[c]), "" === d || d ? (f = parseFloat(g), d === !0 || ab.isNumeric(f) ? f || 0 : g) : g
		},
		swap: function (a, b, c, d) {
			var e, f, g = {};
			for (f in b)g[f] = a.style[f], a.style[f] = b[f];
			e = c.apply(a, d || []);
			for (f in b)a.style[f] = g[f];
			return e
		}
	}), a.getComputedStyle ? (cc = function (b) {
		return a.getComputedStyle(b, null)
	}, dc = function (a, c, d) {
		var e, f, g, h = d || cc(a), i = h ? h.getPropertyValue(c) || h[c] : b, j = a.style;
		return h && ("" !== i || ab.contains(a.ownerDocument, a) || (i = ab.style(a, c)), kc.test(i) && ic.test(c) && (e = j.width, f = j.minWidth, g = j.maxWidth, j.minWidth = j.maxWidth = j.width = i, i = h.width, j.width = e, j.minWidth = f, j.maxWidth = g)), i
	}) : O.documentElement.currentStyle && (cc = function (a) {
		return a.currentStyle
	}, dc = function (a, c, d) {
		var e, f, g, h = d || cc(a), i = h ? h[c] : b, j = a.style;
		return null == i && j && j[c] && (i = j[c]), kc.test(i) && !gc.test(c) && (e = j.left, f = a.runtimeStyle, g = f && f.left, g && (f.left = a.currentStyle.left), j.left = "fontSize" === c ? "1em" : i, i = j.pixelLeft + "px", j.left = e, g && (f.left = g)), "" === i ? "auto" : i
	}), ab.each(["height", "width"], function (a, b) {
		ab.cssHooks[b] = {
			get: function (a, c, d) {
				return c ? 0 === a.offsetWidth && hc.test(ab.css(a, "display")) ? ab.swap(a, nc, function () {
					return A(a, b, d)
				}) : A(a, b, d) : void 0
			}, set: function (a, c, d) {
				var e = d && cc(a);
				return y(a, c, d ? z(a, b, d, ab.support.boxSizing && "border-box" === ab.css(a, "boxSizing", !1, e), e) : 0)
			}
		}
	}), ab.support.opacity || (ab.cssHooks.opacity = {
		get: function (a, b) {
			return fc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
		}, set: function (a, b) {
			var c = a.style, d = a.currentStyle, e = ab.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "", f = d && d.filter || c.filter || "";
			c.zoom = 1, (b >= 1 || "" === b) && "" === ab.trim(f.replace(ec, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = ec.test(f) ? f.replace(ec, e) : f + " " + e)
		}
	}), ab(function () {
		ab.support.reliableMarginRight || (ab.cssHooks.marginRight = {
			get: function (a, b) {
				return b ? ab.swap(a, {display: "inline-block"}, dc, [a, "marginRight"]) : void 0
			}
		}), !ab.support.pixelPosition && ab.fn.position && ab.each(["top", "left"], function (a, b) {
			ab.cssHooks[b] = {
				get: function (a, c) {
					return c ? (c = dc(a, b), kc.test(c) ? ab(a).position()[b] + "px" : c) : void 0
				}
			}
		})
	}), ab.expr && ab.expr.filters && (ab.expr.filters.hidden = function (a) {
		return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !ab.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || ab.css(a, "display"))
	}, ab.expr.filters.visible = function (a) {
		return !ab.expr.filters.hidden(a)
	}), ab.each({margin: "", padding: "", border: "Width"}, function (a, b) {
		ab.cssHooks[a + b] = {
			expand: function (c) {
				for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++)e[a + pc[d] + b] = f[d] || f[d - 2] || f[0];
				return e
			}
		}, ic.test(a) || (ab.cssHooks[a + b].set = y)
	});
	var rc = /%20/g, sc = /\[\]$/, tc = /\r?\n/g, uc = /^(?:submit|button|image|reset|file)$/i, vc = /^(?:input|select|textarea|keygen)/i;
	ab.fn.extend({
		serialize: function () {
			return ab.param(this.serializeArray())
		}, serializeArray: function () {
			return this.map(function () {
				var a = ab.prop(this, "elements");
				return a ? ab.makeArray(a) : this
			}).filter(function () {
				var a = this.type;
				return this.name && !ab(this).is(":disabled") && vc.test(this.nodeName) && !uc.test(a) && (this.checked || !Vb.test(a))
			}).map(function (a, b) {
				var c = ab(this).val();
				return null == c ? null : ab.isArray(c) ? ab.map(c, function (a) {
					return {name: b.name, value: a.replace(tc, "\r\n")}
				}) : {name: b.name, value: c.replace(tc, "\r\n")}
			}).get()
		}
	}), ab.param = function (a, c) {
		var d, e = [], f = function (a, b) {
			b = ab.isFunction(b) ? b() : null == b ? "" : b, e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
		};
		if (c === b && (c = ab.ajaxSettings && ab.ajaxSettings.traditional), ab.isArray(a) || a.jquery && !ab.isPlainObject(a))ab.each(a, function () {
			f(this.name, this.value)
		}); else for (d in a)D(d, a[d], c, f);
		return e.join("&").replace(rc, "+")
	};
	var wc, xc, yc = ab.now(), zc = /\?/, Ac = /#.*$/, Bc = /([?&])_=[^&]*/, Cc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Dc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Ec = /^(?:GET|HEAD)$/, Fc = /^\/\//, Gc = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Hc = ab.fn.load, Ic = {}, Jc = {}, Kc = "*/".concat("*");
	try {
		xc = N.href
	} catch (Lc) {
		xc = O.createElement("a"), xc.href = "", xc = xc.href
	}
	wc = Gc.exec(xc.toLowerCase()) || [], ab.fn.load = function (a, c, d) {
		if ("string" != typeof a && Hc)return Hc.apply(this, arguments);
		var e, f, g, h = this, i = a.indexOf(" ");
		return i >= 0 && (e = a.slice(i, a.length), a = a.slice(0, i)), ab.isFunction(c) ? (d = c, c = b) : c && "object" == typeof c && (g = "POST"), h.length > 0 && ab.ajax({
			url: a,
			type: g,
			dataType: "html",
			data: c
		}).done(function (a) {
			f = arguments, h.html(e ? ab("<div>").append(ab.parseHTML(a)).find(e) : a)
		}).complete(d && function (a, b) {
				h.each(d, f || [a.responseText, b, a])
			}), this
	}, ab.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
		ab.fn[b] = function (a) {
			return this.on(b, a)
		}
	}), ab.each(["get", "post"], function (a, c) {
		ab[c] = function (a, d, e, f) {
			return ab.isFunction(d) && (f = f || e, e = d, d = b), ab.ajax({
				url: a,
				type: c,
				dataType: f,
				data: d,
				success: e
			})
		}
	}), ab.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: xc,
			type: "GET",
			isLocal: Dc.test(wc[1]),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": Kc,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {xml: /xml/, html: /html/, json: /json/},
			responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
			converters: {"* text": String, "text html": !0, "text json": ab.parseJSON, "text xml": ab.parseXML},
			flatOptions: {url: !0, context: !0}
		},
		ajaxSetup: function (a, b) {
			return b ? G(G(a, ab.ajaxSettings), b) : G(ab.ajaxSettings, a)
		},
		ajaxPrefilter: E(Ic),
		ajaxTransport: E(Jc),
		ajax: function (a, c) {
			function d(a, c, d, e) {
				var f, l, s, t, v, x = c;
				2 !== u && (u = 2, i && clearTimeout(i), k = b, h = e || "", w.readyState = a > 0 ? 4 : 0, f = a >= 200 && 300 > a || 304 === a, d && (t = H(m, w, d)), t = I(m, t, w, f), f ? (m.ifModified && (v = w.getResponseHeader("Last-Modified"), v && (ab.lastModified[g] = v), v = w.getResponseHeader("etag"), v && (ab.etag[g] = v)), 204 === a ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = t.state, l = t.data, s = t.error, f = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), w.status = a, w.statusText = (c || x) + "", f ? p.resolveWith(n, [l, x, w]) : p.rejectWith(n, [w, x, s]), w.statusCode(r), r = b, j && o.trigger(f ? "ajaxSuccess" : "ajaxError", [w, m, f ? l : s]), q.fireWith(n, [w, x]), j && (o.trigger("ajaxComplete", [w, m]), --ab.active || ab.event.trigger("ajaxStop")))
			}

			"object" == typeof a && (c = a, a = b), c = c || {};
			var e, f, g, h, i, j, k, l, m = ab.ajaxSetup({}, c), n = m.context || m, o = m.context && (n.nodeType || n.jquery) ? ab(n) : ab.event, p = ab.Deferred(), q = ab.Callbacks("once memory"), r = m.statusCode || {}, s = {}, t = {}, u = 0, v = "canceled", w = {
				readyState: 0,
				getResponseHeader: function (a) {
					var b;
					if (2 === u) {
						if (!l)for (l = {}; b = Cc.exec(h);)l[b[1].toLowerCase()] = b[2];
						b = l[a.toLowerCase()]
					}
					return null == b ? null : b
				},
				getAllResponseHeaders: function () {
					return 2 === u ? h : null
				},
				setRequestHeader: function (a, b) {
					var c = a.toLowerCase();
					return u || (a = t[c] = t[c] || a, s[a] = b), this
				},
				overrideMimeType: function (a) {
					return u || (m.mimeType = a), this
				},
				statusCode: function (a) {
					var b;
					if (a)if (2 > u)for (b in a)r[b] = [r[b], a[b]]; else w.always(a[w.status]);
					return this
				},
				abort: function (a) {
					var b = a || v;
					return k && k.abort(b), d(0, b), this
				}
			};
			if (p.promise(w).complete = q.add, w.success = w.done, w.error = w.fail, m.url = ((a || m.url || xc) + "").replace(Ac, "").replace(Fc, wc[1] + "//"), m.type = c.method || c.type || m.method || m.type, m.dataTypes = ab.trim(m.dataType || "*").toLowerCase().match(cb) || [""], null == m.crossDomain && (e = Gc.exec(m.url.toLowerCase()), m.crossDomain = !(!e || e[1] === wc[1] && e[2] === wc[2] && (e[3] || ("http:" === e[1] ? 80 : 443)) == (wc[3] || ("http:" === wc[1] ? 80 : 443)))), m.data && m.processData && "string" != typeof m.data && (m.data = ab.param(m.data, m.traditional)), F(Ic, m, c, w), 2 === u)return w;
			j = m.global, j && 0 === ab.active++ && ab.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), m.hasContent = !Ec.test(m.type), g = m.url, m.hasContent || (m.data && (g = m.url += (zc.test(g) ? "&" : "?") + m.data, delete m.data), m.cache === !1 && (m.url = Bc.test(g) ? g.replace(Bc, "$1_=" + yc++) : g + (zc.test(g) ? "&" : "?") + "_=" + yc++)), m.ifModified && (ab.lastModified[g] && w.setRequestHeader("If-Modified-Since", ab.lastModified[g]), ab.etag[g] && w.setRequestHeader("If-None-Match", ab.etag[g])), (m.data && m.hasContent && m.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", m.contentType), w.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + Kc + "; q=0.01" : "") : m.accepts["*"]);
			for (f in m.headers)w.setRequestHeader(f, m.headers[f]);
			if (m.beforeSend && (m.beforeSend.call(n, w, m) === !1 || 2 === u))return w.abort();
			v = "abort";
			for (f in{success: 1, error: 1, complete: 1})w[f](m[f]);
			if (k = F(Jc, m, c, w)) {
				w.readyState = 1, j && o.trigger("ajaxSend", [w, m]), m.async && m.timeout > 0 && (i = setTimeout(function () {
					w.abort("timeout")
				}, m.timeout));
				try {
					u = 1, k.send(s, d)
				} catch (x) {
					if (!(2 > u))throw x;
					d(-1, x)
				}
			} else d(-1, "No Transport");
			return w
		},
		getScript: function (a, c) {
			return ab.get(a, b, c, "script")
		},
		getJSON: function (a, b, c) {
			return ab.get(a, b, c, "json")
		}
	}), ab.ajaxSetup({
		accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
		contents: {script: /(?:java|ecma)script/},
		converters: {
			"text script": function (a) {
				return ab.globalEval(a), a
			}
		}
	}), ab.ajaxPrefilter("script", function (a) {
		a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
	}), ab.ajaxTransport("script", function (a) {
		if (a.crossDomain) {
			var c, d = O.head || ab("head")[0] || O.documentElement;
			return {
				send: function (b, e) {
					c = O.createElement("script"), c.async = !0, a.scriptCharset && (c.charset = a.scriptCharset), c.src = a.url, c.onload = c.onreadystatechange = function (a, b) {
						(b || !c.readyState || /loaded|complete/.test(c.readyState)) && (c.onload = c.onreadystatechange = null, c.parentNode && c.parentNode.removeChild(c), c = null, b || e(200, "success"))
					}, d.insertBefore(c, d.firstChild)
				}, abort: function () {
					c && c.onload(b, !0)
				}
			}
		}
	});
	var Mc = [], Nc = /(=)\?(?=&|$)|\?\?/;
	ab.ajaxSetup({
		jsonp: "callback", jsonpCallback: function () {
			var a = Mc.pop() || ab.expando + "_" + yc++;
			return this[a] = !0, a
		}
	}), ab.ajaxPrefilter("json jsonp", function (c, d, e) {
		var f, g, h, i = c.jsonp !== !1 && (Nc.test(c.url) ? "url" : "string" == typeof c.data && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && Nc.test(c.data) && "data");
		return i || "jsonp" === c.dataTypes[0] ? (f = c.jsonpCallback = ab.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, i ? c[i] = c[i].replace(Nc, "$1" + f) : c.jsonp !== !1 && (c.url += (zc.test(c.url) ? "&" : "?") + c.jsonp + "=" + f), c.converters["script json"] = function () {
			return h || ab.error(f + " was not called"), h[0]
		}, c.dataTypes[0] = "json", g = a[f], a[f] = function () {
			h = arguments
		}, e.always(function () {
			a[f] = g, c[f] && (c.jsonpCallback = d.jsonpCallback, Mc.push(f)), h && ab.isFunction(g) && g(h[0]), h = g = b
		}), "script") : void 0
	}), ab.fn.offset = function (a) {
		if (arguments.length)return a === b ? this : this.each(function (b) {
			ab.offset.setOffset(this, a, b)
		});
		var c, d, e = {top: 0, left: 0}, f = this[0], g = f && f.ownerDocument;
		if (g)return c = g.documentElement, ab.contains(c, f) ? (typeof f.getBoundingClientRect !== M && (e = f.getBoundingClientRect()), d = J(g), {
			top: e.top + (d.pageYOffset || c.scrollTop) - (c.clientTop || 0),
			left: e.left + (d.pageXOffset || c.scrollLeft) - (c.clientLeft || 0)
		}) : e
	}, ab.offset = {
		setOffset: function (a, b, c) {
			var d = ab.css(a, "position");
			"static" === d && (a.style.position = "relative");
			var e, f, g = ab(a), h = g.offset(), i = ab.css(a, "top"), j = ab.css(a, "left"), k = ("absolute" === d || "fixed" === d) && ab.inArray("auto", [i, j]) > -1, l = {}, m = {};
			k ? (m = g.position(), e = m.top, f = m.left) : (e = parseFloat(i) || 0, f = parseFloat(j) || 0), ab.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (l.top = b.top - h.top + e), null != b.left && (l.left = b.left - h.left + f), "using"in b ? b.using.call(a, l) : g.css(l)
		}
	}, ab.fn.extend({
		position: function () {
			if (this[0]) {
				var a, b, c = {top: 0, left: 0}, d = this[0];
				return "fixed" === ab.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), ab.nodeName(a[0], "html") || (c = a.offset()), c.top += ab.css(a[0], "borderTopWidth", !0), c.left += ab.css(a[0], "borderLeftWidth", !0)), {
					top: b.top - c.top - ab.css(d, "marginTop", !0),
					left: b.left - c.left - ab.css(d, "marginLeft", !0)
				}
			}
		}, offsetParent: function () {
			return this.map(function () {
				for (var a = this.offsetParent || P; a && !ab.nodeName(a, "html") && "static" === ab.css(a, "position");)a = a.offsetParent;
				return a || P
			})
		}
	}), ab.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, c) {
		var d = /Y/.test(c);
		ab.fn[a] = function (e) {
			return ab.access(this, function (a, e, f) {
				var g = J(a);
				return f === b ? g ? c in g ? g[c] : g.document.documentElement[e] : a[e] : (g ? g.scrollTo(d ? ab(g).scrollLeft() : f, d ? f : ab(g).scrollTop()) : a[e] = f, void 0)
			}, a, e, arguments.length, null)
		}
	}), ab.each({Height: "height", Width: "width"}, function (a, c) {
		ab.each({padding: "inner" + a, content: c, "": "outer" + a}, function (d, e) {
			ab.fn[e] = function (e, f) {
				var g = arguments.length && (d || "boolean" != typeof e), h = d || (e === !0 || f === !0 ? "margin" : "border");
				return ab.access(this, function (c, d, e) {
					var f;
					return ab.isWindow(c) ? c.document.documentElement["client" + a] : 9 === c.nodeType ? (f = c.documentElement, Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? ab.css(c, d, h) : ab.style(c, d, e, h)
				}, c, g ? e : b, g, null)
			}
		})
	}), a.jQuery = a.$ = ab, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function () {
		return ab
	})
}(window), window["TK" + (new Date).getTime()] = window.jQuery.noConflict(), function (a) {
	function b(b, c, d, e) {
		var f = {
			data: e || 0 === e || e === !1 ? e : c ? c.data : {},
			_wrap: c ? c._wrap : null,
			tmpl: null,
			parent: c || null,
			nodes: [],
			calls: j,
			nest: k,
			wrap: l,
			html: m,
			update: n
		};
		return b && a.extend(f, b, {
			nodes: [],
			parent: c
		}), d && (f.tmpl = d, f._ctnt = f._ctnt || f.tmpl(a, f), f.key = ++v, (x.length ? t : s)[v] = f), f
	}

	function c(b, e, f) {
		var g, h = f ? a.map(f, function (a) {
			return "string" == typeof a ? b.key ? a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + q + '="' + b.key + '" $2') : a : c(a, b, a._ctnt)
		}) : b;
		return e ? h : (h = h.join(""), h.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function (b, c, e, f) {
			g = a(e).get(), i(g), c && (g = d(c).concat(g)), f && (g = g.concat(d(f)))
		}), g ? g : d(h))
	}

	function d(b) {
		var c = document.createElement("div");
		return c.innerHTML = b, a.makeArray(c.childNodes)
	}

	function e(b) {
		return new Function("jQuery", "$item", "var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('" + a.trim(b).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function (b, c, d, e, f, h, i) {
				var j, k, l, m = a.tmpl.tag[d];
				if (!m)throw"Unknown template tag: " + d;
				return j = m._default || [], h && !/\w$/.test(f) && (f += h, h = ""), f ? (f = g(f), i = i ? "," + g(i) + ")" : h ? ")" : "", k = h ? f.indexOf(".") > -1 ? f + g(h) : "(" + f + ").call($item" + i : f, l = h ? k : "(typeof(" + f + ")==='function'?(" + f + ").call($item):(" + f + "))") : l = k = j.$1 || "null", e = g(e), "');" + m[c ? "close" : "open"].split("$notnull_1").join(f ? "typeof(" + f + ")!=='undefined' && (" + f + ")!=null" : "true").split("$1a").join(l).split("$1").join(k).split("$2").join(e || j.$2 || "") + "__.push('"
			}) + "');}return __;")
	}

	function f(b, d) {
		b._wrap = c(b, !0, a.isArray(d) ? d : [r.test(d) ? d : a(d).html()]).join("")
	}

	function g(a) {
		return a ? a.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
	}

	function h(a) {
		var b = document.createElement("div");
		return b.appendChild(a.cloneNode(!0)), b.innerHTML
	}

	function i(c) {
		function d(c) {
			function d(a) {
				a += j, g = k[a] = k[a] || b(g, s[g.parent.key + j] || g.parent)
			}

			var e, f, g, h, i = c;
			if (h = c.getAttribute(q)) {
				for (; i.parentNode && 1 === (i = i.parentNode).nodeType && !(e = i.getAttribute(q)););
				e !== h && (i = i.parentNode ? 11 === i.nodeType ? 0 : i.getAttribute(q) || 0 : 0, (g = s[h]) || (g = t[h], g = b(g, s[i] || t[i]), g.key = ++v, s[v] = g), w && d(h)), c.removeAttribute(q)
			} else w && (g = a.data(c, "tmplItem")) && (d(g.key), s[g.key] = g, i = a.data(c.parentNode, "tmplItem"), i = i ? i.key : 0);
			if (g) {
				for (f = g; f && f.key != i;)f.nodes.push(c), f = f.parent;
				delete g._ctnt, delete g._wrap, a.data(c, "tmplItem", g)
			}
		}

		var e, f, g, h, i, j = "_" + w, k = {};
		for (g = 0, h = c.length; h > g; g++)if (1 === (e = c[g]).nodeType) {
			for (f = e.getElementsByTagName("*"), i = f.length - 1; i >= 0; i--)d(f[i]);
			d(e)
		}
	}

	function j(a, b, c, d) {
		return a ? (x.push({_: a, tmpl: b, item: this, data: c, options: d}), void 0) : x.pop()
	}

	function k(b, c, d) {
		return a.tmpl(a.template(b), c, d, this)
	}

	function l(b, c) {
		var d = b.options || {};
		return d.wrapped = c, a.tmpl(a.template(b.tmpl), b.data, d, b.item)
	}

	function m(b, c) {
		var d = this._wrap;
		return a.map(a(a.isArray(d) ? d.join("") : d).filter(b || "*"), function (a) {
			return c ? a.innerText || a.textContent : a.outerHTML || h(a)
		})
	}

	function n() {
		var b = this.nodes;
		a.tmpl(null, null, null, this).insertBefore(b[0]), a(b).remove()
	}

	var o, p = a.fn.domManip, q = "_tmplitem", r = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /, s = {}, t = {}, u = {
		key: 0,
		data: {}
	}, v = 0, w = 0, x = [];
	a.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (b, c) {
		a.fn[b] = function (d) {
			var e, f, g, h, i = [], j = a(d), k = 1 === this.length && this[0].parentNode;
			if (o = s || {}, k && 11 === k.nodeType && 1 === k.childNodes.length && 1 === j.length)j[c](this[0]), i = this; else {
				for (f = 0, g = j.length; g > f; f++)w = f, e = (f > 0 ? this.clone(!0) : this).get(), a(j[f])[c](e), i = i.concat(e);
				w = 0, i = this.pushStack(i, b, j.selector)
			}
			return h = o, o = null, a.tmpl.complete(h), i
		}
	}), a.fn.extend({
		tmpl: function (b, c, d) {
			return a.tmpl(this[0], b, c, d)
		}, tmplItem: function () {
			return a.tmplItem(this[0])
		}, template: function (b) {
			return a.template(b, this[0])
		}, domManip: function (b, c, d) {
			if (b[0] && a.isArray(b[0])) {
				for (var e, f = a.makeArray(arguments), g = b[0], h = g.length, i = 0; h > i && !(e = a.data(g[i++], "tmplItem")););
				e && w && (f[2] = function (b) {
					a.tmpl.afterManip(this, b, d)
				}), p.apply(this, f)
			} else p.apply(this, arguments);
			return w = 0, o || a.tmpl.complete(s), this
		}
	}), a.extend({
		tmpl: function (d, e, g, h) {
			var i, j = !h;
			if (j)h = u, d = a.template[d] || a.template(null, d), t = {}; else if (!d)return d = h.tmpl, s[h.key] = h, h.nodes = [], h.wrapped && f(h, h.wrapped), a(c(h, null, h.tmpl(a, h)));
			return d ? ("function" == typeof e && (e = e.call(h || {})), g && g.wrapped && f(g, g.wrapped), i = a.isArray(e) ? a.map(e, function (a) {
				return a ? b(g, h, d, a) : null
			}) : [b(g, h, d, e)], j ? a(c(h, null, i)) : i) : []
		}, tmplItem: function (b) {
			var c;
			for (b instanceof a && (b = b[0]); b && 1 === b.nodeType && !(c = a.data(b, "tmplItem")) && (b = b.parentNode););
			return c || u
		}, template: function (b, c) {
			return c ? ("string" == typeof c ? c = e(c) : c instanceof a && (c = c[0] || {}), c.nodeType && (c = a.data(c, "tmpl") || a.data(c, "tmpl", e(c.innerHTML))), "string" == typeof b ? a.template[b] = c : c) : b ? "string" != typeof b ? a.template(null, b) : a.template[b] || a.template(null, r.test(b) ? b : a(b)) : null
		}, encode: function (a) {
			return ("" + a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
		}
	}), a.extend(a.tmpl, {
		tag: {
			tmpl: {_default: {$2: "null"}, open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"},
			wrap: {
				_default: {$2: "null"},
				open: "$item.calls(__,$1,$2);__=[];",
				close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
			},
			each: {
				_default: {$2: "$index, $value"},
				open: "if($notnull_1){$.each($1a,function($2){with(this){",
				close: "}});}"
			},
			"if": {open: "if(($notnull_1) && $1a){", close: "}"},
			"else": {_default: {$1: "true"}, open: "}else if(($notnull_1) && $1a){"},
			html: {open: "if($notnull_1){__.push($1a);}"},
			"=": {_default: {$1: "$data"}, open: "if($notnull_1){__.push($.encode($1a));}"},
			"!": {open: ""}
		}, complete: function () {
			s = {}
		}, afterManip: function (b, c, d) {
			var e = 11 === c.nodeType ? a.makeArray(c.childNodes) : 1 === c.nodeType ? [c] : [];
			d.call(b, c), i(e), w++
		}
	})
}(jQuery), function (a) {
	function b() {
		var b = "";
		return a("script").each(function (a, c) {
			c.src && c.src.match(/_tts_browser_center/) && (b = c.src.replace(/.*id[^id]?/, "").replace(/&.*/, ""))
		}), b
	}

	function c(a) {
		var b;
		return b = document.createElement("script"), b.type = "text/javascript", b.src = a + "&t=" + (new Date).getTime(), document.body.appendChild(b)
	}

	function d(b) {
		a.getJSON(b.url, function (c) {
			var d, e = b.size;
			c && c.pinpai && c.pinpai[0] && (d = c.pinpai[0], a.extend(e, {
				image: d.media,
				href: d.href,
				title: d.title,
				imgType: d.media.match(/\.([^\.]+)$/)[1]
			}), b.render.call(null, e))
		})
	}

	function e(b) {
		var c = '<div id="${app}qzone-center1" style="width: ${width}; height: ${height}; padding: 4px; padding-bottom: 0px; *padding-bottom: 4px; border: 1px #d9d9d9 solid; border-radius: 3px; margin-bottom: 12px; background-color: #fff;"><iframe frameborder="0" marginheight="0" marginwidth="0" border="0" scrolling="no" width="${width}" height="${height}"src="http://show.kc.taotaosou.com/imgShow.do?${query}"></iframe></div>', d = {
			app: "TK-AD-",
			query: a.param(b),
			width: b.width,
			height: b.height
		};
		a.tmpl(c, d).insertAfter(a("#QM_Container_31"))
	}

	function f(b) {
		var c = '<div id="${app}qzone-center2" style="width: ${width}; height: ${height}; padding: 4px; padding-bottom: 0px; *padding-bottom: 4px; border: 1px #d9d9d9 solid; border-radius: 3px; margin-top: 12px; background-color: #fff;"><iframe frameborder="0" marginheight="0" marginwidth="0" border="0" scrolling="no" width="${width}" height="${height}"src="http://show.kc.taotaosou.com/imgShow.do?${query}"></iframe></div>', d = {
			app: "TK-AD-",
			query: a.param(b),
			width: b.width,
			height: b.height
		};
		a("#QM_Container_11").append(a.tmpl(c, d))
	}

	var g, h, i, j, k, l, m, n, o, p, q, r = window.location.href, s = window.location.host;
	g = "//show.kc.taotaosou.com/", l = "//dc.log.taotaosou.com/statistics.do?systemName=tkqzone", p = b(), n = function (a) {
		new c("//log.taotaosou.com/browser_statistics.do?type=" + a)
	}, q = !1, m = function (b) {
		return b.name ? b.value ? (b.day = 60 * b.day * 60, a.getScript("" + g + "setCookie.do?name=" + b.name + "&value=" + b.value + "&day=" + b.day)) : !1 : !1
	}, i = function (b, c) {
		return a.getJSON("" + g + "getCookie.do?name=" + b + "&jsonp=?", function (a) {
			return c(a)
		})
	}, j = function (b) {
		return a.getJSON("" + g + "ttkqq.do?jsonp=?", function (a) {
			return q ? void 0 : (q = void 0, b(a))
		}), setTimeout(function () {
			return void 0 !== q ? (q = !0, fail()) : void 0
		}, 1e4)
	}, h = function () {
		return a("#TK-AD-qzone-tool-close").bind("click", function () {
			return m({name: "TKQzoneTool", value: "show", day: "8"}), a("#TK-AD-qzone-tool").remove()
		})
	}, o = function () {
		var b, c;
		return c = '<div style="position: fixed; _position: absolute; z-index: 2147483584; top:150px; width: 125px; right: 10px;" id="${app}qzone-tool"> <span id="${app}qzone-tool-close" style="position:absolute; top:0; right:0; width:14px; height:15px; line-height: 15px; text-align: center; background: #919190; color: #e5e5e5; cursor: pointer;">X</span><iframe frameborder="0" marginheight="0" marginwidth="0" border="0" scrolling="no" width="125" height="564" src="http://show.kc.taotaosou.com/mjShow.do?itemSize=12"></iframe></div>', b = {app: "TK-AD-"}, a.tmpl(c, b).appendTo("body"), a("#TK-AD-qzone-tool a").bind("click", function (a) {
			return a.preventDefault(), window.open(this.href)
		})
	}, k = function () {
		return i("TKQzoneTool", function (b) {
			return b ? (a.getScript(l + "&QZPV=0"), !0) : (o(), h())
		})
	}, a.getJSON("http://www.ttsunion.com/getConfig.do?name=jsonp&unionid=10003028&host=" + encodeURIComponent(s) + "&jsonp=?&url=" + encodeURIComponent(r), function (a) {
		var b, c, g, h, i, j = a && a.iA && a.iA.adList;
		if (j) {
			for (b = 0, c = j.length; c > b; b++)170 === j[b].pid ? g = j[b] : 275 === j[b].pid ? h = j[b] : 276 === j[b].pid && (i = j[b]);
			g && g.status && k(), h && h.status && d({
				url: "http://show.kc.taotaosou.com/tumeiti.do?adType=0,0,1,0&keyword=0,0,QQ%E7%A9%BA%E9%97%B4%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%831,0&adSize=0,0,220*120,0&itemSize=0,0,1,0&tbId=&pid=275&jsonp=?&_=1389149056054",
				size: {width: 220, height: 120},
				render: e
			}), i && h.status && d({
				url: "http://show.kc.taotaosou.com/tumeiti.do?adType=0,0,1,0&keyword=0,0,QQ%E7%A9%BA%E9%97%B4%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%832,0&adSize=0,0,160*120,0&itemSize=0,0,1,0&tbId=&pid=276&jsonp=?&_=1389149056054",
				size: {width: 160, height: 120},
				render: f
			})
		}
	})
}(window.jQuery);
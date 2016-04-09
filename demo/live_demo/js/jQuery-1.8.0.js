(function(a, b) {
    function G(a) {
        var b = F[a] = {};
        return p.each(a.split(s),
        function(a, c) {
            b[c] = !0
        }),
        b
    }
    function J(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(I, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null: +d + "" === d ? +d: H.test(d) ? p.parseJSON(d) : d
                } catch(f) {}
                p.data(a, c, d)
            } else {
                d = b
            }
        }
        return d
    }
    function K(a) {
        var b;
        for (b in a) {
            if (b === "data" && p.isEmptyObject(a[b])) {
                continue
            }
            if (b !== "toJSON") {
                return ! 1
            }
        }
        return ! 0
    }
    function ba() {
        return ! 1
    }
    function bb() {
        return ! 0
    }
    function bh(a) {
        return ! a || !a.parentNode || a.parentNode.nodeType === 11
    }
    function bi(a, b) {
        do {
            a = a[b]
        } while ( a && a . nodeType !== 1 );
        return a
    }
    function bj(a, b, c) {
        b = b || 0;
        if (p.isFunction(b)) {
            return p.grep(a,
            function(a, d) {
                var e = !!b.call(a, d, a);
                return e === c
            })
        }
        if (b.nodeType) {
            return p.grep(a,
            function(a, d) {
                return a === b === c
            })
        }
        if (typeof b == "string") {
            var d = p.grep(a,
            function(a) {
                return a.nodeType === 1
            });
            if (be.test(b)) {
                return p.filter(b, d, !c)
            }
            b = p.filter(b, d)
        }
        return p.grep(a,
        function(a, d) {
            return p.inArray(a, b) >= 0 === c
        })
    }
    function bk(a) {
        var b = bl.split("|"),
        c = a.createDocumentFragment();
        if (c.createElement) {
            while (b.length) {
                c.createElement(b.pop())
            }
        }
        return c
    }
    function bC(a, b) {
        return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b))
    }
    function bD(a, b) {
        if (b.nodeType !== 1 || !p.hasData(a)) {
            return
        }
        var c, d, e, f = p._data(a),
        g = p._data(b, f),
        h = f.events;
        if (h) {
            delete g.handle,
            g.events = {};
            for (c in h) {
                for (d = 0, e = h[c].length; d < e; d++) {
                    p.event.add(b, c, h[c][d])
                }
            }
        }
        g.data && (g.data = p.extend({},
        g.data))
    }
    function bE(a, b) {
        var c;
        if (b.nodeType !== 1) {
            return
        }
        b.clearAttributes && b.clearAttributes(),
        b.mergeAttributes && b.mergeAttributes(a),
        c = b.nodeName.toLowerCase(),
        c === "object" ? (b.parentNode && (b.outerHTML = a.outerHTML), p.support.html5Clone && a.innerHTML && !p.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : c === "input" && bv.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : c === "option" ? b.selected = a.defaultSelected: c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue: c === "script" && b.text !== a.text && (b.text = a.text),
        b.removeAttribute(p.expando)
    }
    function bF(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
    }
    function bG(a) {
        bv.test(a.type) && (a.defaultChecked = a.checked)
    }
    function bX(a, b) {
        if (b in a) {
            return b
        }
        var c = b.charAt(0).toUpperCase() + b.slice(1),
        d = b,
        e = bV.length;
        while (e--) {
            b = bV[e] + c;
            if (b in a) {
                return b
            }
        }
        return d
    }
    function bY(a, b) {
        return a = b || a,
        p.css(a, "display") === "none" || !p.contains(a.ownerDocument, a)
    }
    function bZ(a, b) {
        var c, d, e = [],
        f = 0,
        g = a.length;
        for (; f < g; f++) {
            c = a[f];
            if (!c.style) {
                continue
            }
            e[f] = p._data(c, "olddisplay"),
            b ? (!e[f] && c.style.display === "none" && (c.style.display = ""), c.style.display === "" && bY(c) && (e[f] = p._data(c, "olddisplay", cb(c.nodeName)))) : (d = bH(c, "display"), !e[f] && d !== "none" && p._data(c, "olddisplay", d))
        }
        for (f = 0; f < g; f++) {
            c = a[f];
            if (!c.style) {
                continue
            }
            if (!b || c.style.display === "none" || c.style.display === "") {
                c.style.display = b ? e[f] || "": "none"
            }
        }
        return a
    }
    function b$(a, b, c) {
        var d = bO.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }
    function b_(a, b, c, d) {
        var e = c === (d ? "border": "content") ? 4 : b === "width" ? 1 : 0,
        f = 0;
        for (; e < 4; e += 2) {
            c === "margin" && (f += p.css(a, c + bU[e], !0)),
            d ? (c === "content" && (f -= parseFloat(bH(a, "padding" + bU[e])) || 0), c !== "margin" && (f -= parseFloat(bH(a, "border" + bU[e] + "Width")) || 0)) : (f += parseFloat(bH(a, "padding" + bU[e])) || 0, c !== "padding" && (f += parseFloat(bH(a, "border" + bU[e] + "Width")) || 0))
        }
        return f
    }
    function ca(a, b, c) {
        var d = b === "width" ? a.offsetWidth: a.offsetHeight,
        e = !0,
        f = p.support.boxSizing && p.css(a, "boxSizing") === "border-box";
        if (d <= 0) {
            d = bH(a, b);
            if (d < 0 || d == null) {
                d = a.style[b]
            }
            if (bP.test(d)) {
                return d
            }
            e = f && (p.support.boxSizingReliable || d === a.style[b]),
            d = parseFloat(d) || 0
        }
        return d + b_(a, b, c || (f ? "border": "content"), e) + "px"
    }
    function cb(a) {
        if (bR[a]) {
            return bR[a]
        }
        var b = p("<" + a + ">").appendTo(e.body),
        c = b.css("display");
        b.remove();
        if (c === "none" || c === "") {
            bI = e.body.appendChild(bI || p.extend(e.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            }));
            if (!bJ || !bI.createElement) {
                bJ = (bI.contentWindow || bI.contentDocument).document,
                bJ.write("<!doctype html><html><body>"),
                bJ.close()
            }
            b = bJ.body.appendChild(bJ.createElement(a)),
            c = bH(b, "display"),
            e.body.removeChild(bI)
        }
        return bR[a] = c,
        c
    }
    function ch(a, b, c, d) {
        var e;
        if (p.isArray(b)) {
            p.each(b,
            function(b, e) {
                c || cd.test(a) ? d(a, e) : ch(a + "[" + (typeof e == "object" ? b: "") + "]", e, c, d)
            })
        } else {
            if (!c && p.type(b) === "object") {
                for (e in b) {
                    ch(a + "[" + e + "]", b[e], c, d)
                }
            } else {
                d(a, b)
            }
        }
    }
    function cy(a) {
        return function(b, c) {
            typeof b != "string" && (c = b, b = "*");
            var d, e, f, g = b.toLowerCase().split(s),
            h = 0,
            i = g.length;
            if (p.isFunction(c)) {
                for (; h < i; h++) {
                    d = g[h],
                    f = /^\+/.test(d),
                    f && (d = d.substr(1) || "*"),
                    e = a[d] = a[d] || [],
                    e[f ? "unshift": "push"](c)
                }
            }
        }
    }
    function cz(a, c, d, e, f, g) {
        f = f || c.dataTypes[0],
        g = g || {},
        g[f] = !0;
        var h, i = a[f],
        j = 0,
        k = i ? i.length: 0,
        l = a === cu;
        for (; j < k && (l || !h); j++) {
            h = i[j](c, d, e),
            typeof h == "string" && (!l || g[h] ? h = b: (c.dataTypes.unshift(h), h = cz(a, c, d, e, h, g)))
        }
        return (l || !h) && !g["*"] && (h = cz(a, c, d, e, "*", g)),
        h
    }
    function cA(a, c) {
        var d, e, f = p.ajaxSettings.flatOptions || {};
        for (d in c) {
            c[d] !== b && ((f[d] ? a: e || (e = {}))[d] = c[d])
        }
        e && p.extend(!0, a, e)
    }
    function cB(a, c, d) {
        var e, f, g, h, i = a.contents,
        j = a.dataTypes,
        k = a.responseFields;
        for (f in k) {
            f in d && (c[k[f]] = d[f])
        }
        while (j[0] === "*") {
            j.shift(),
            e === b && (e = a.mimeType || c.getResponseHeader("content-type"))
        }
        if (e) {
            for (f in i) {
                if (i[f] && i[f].test(e)) {
                    j.unshift(f);
                    break
                }
            }
        }
        if (j[0] in d) {
            g = j[0]
        } else {
            for (f in d) {
                if (!j[0] || a.converters[f + " " + j[0]]) {
                    g = f;
                    break
                }
                h || (h = f)
            }
            g = g || h
        }
        if (g) {
            return g !== j[0] && j.unshift(g),
            d[g]
        }
    }
    function cC(a, b) {
        var c, d, e, f, g = a.dataTypes.slice(),
        h = g[0],
        i = {},
        j = 0;
        a.dataFilter && (b = a.dataFilter(b, a.dataType));
        if (g[1]) {
            for (c in a.converters) {
                i[c.toLowerCase()] = a.converters[c]
            }
        }
        for (; e = g[++j];) {
            if (e !== "*") {
                if (h !== "*" && h !== e) {
                    c = i[h + " " + e] || i["* " + e];
                    if (!c) {
                        for (d in i) {
                            f = d.split(" ");
                            if (f[1] === e) {
                                c = i[h + " " + f[0]] || i["* " + f[0]];
                                if (c) {
                                    c === !0 ? c = i[d] : i[d] !== !0 && (e = f[0], g.splice(j--, 0, e));
                                    break
                                }
                            }
                        }
                    }
                    if (c !== !0) {
                        if (c && a["throws"]) {
                            b = c(b)
                        } else {
                            try {
                                b = c(b)
                            } catch(k) {
                                return {
                                    state: "parsererror",
                                    error: c ? k: "No conversion from " + h + " to " + e
                                }
                            }
                        }
                    }
                }
                h = e
            }
        }
        return {
            state: "success",
            data: b
        }
    }
    function cK() {
        try {
            return new a.XMLHttpRequest
        } catch(b) {}
    }
    function cL() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch(b) {}
    }
    function cT() {
        return setTimeout(function() {
            cM = b
        },
        0),
        cM = p.now()
    }
    function cU(a, b) {
        p.each(b,
        function(b, c) {
            var d = (cS[b] || []).concat(cS["*"]),
            e = 0,
            f = d.length;
            for (; e < f; e++) {
                if (d[e].call(a, b, c)) {
                    return
                }
            }
        })
    }
    function cV(a, b, c) {
        var d, e = 0,
        f = 0,
        g = cR.length,
        h = p.Deferred().always(function() {
            delete i.elem
        }),
        i = function() {
            var b = cM || cT(),
            c = Math.max(0, j.startTime + j.duration - b),
            d = 1 - (c / j.duration || 0),
            e = 0,
            f = j.tweens.length;
            for (; e < f; e++) {
                j.tweens[e].run(d)
            }
            return h.notifyWith(a, [j, d, c]),
            d < 1 && f ? c: (h.resolveWith(a, [j]), !1)
        },
        j = h.promise({
            elem: a,
            props: p.extend({},
            b),
            opts: p.extend(!0, {
                specialEasing: {}
            },
            c),
            originalProperties: b,
            originalOptions: c,
            startTime: cM || cT(),
            duration: c.duration,
            tweens: [],
            createTween: function(b, c, d) {
                var e = p.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(e),
                e
            },
            stop: function(b) {
                var c = 0,
                d = b ? j.tweens.length: 0;
                for (; c < d; c++) {
                    j.tweens[c].run(1)
                }
                return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]),
                this
            }
        }),
        k = j.props;
        cW(k, j.opts.specialEasing);
        for (; e < g; e++) {
            d = cR[e].call(j, a, k, j.opts);
            if (d) {
                return d
            }
        }
        return cU(j, k),
        p.isFunction(j.opts.start) && j.opts.start.call(a, j),
        p.fx.timer(p.extend(i, {
            anim: j,
            queue: j.opts.queue,
            elem: a
        })),
        j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }
    function cW(a, b) {
        var c, d, e, f, g;
        for (c in a) {
            d = p.camelCase(c),
            e = b[d],
            f = a[c],
            p.isArray(f) && (e = f[1], f = a[c] = f[0]),
            c !== d && (a[d] = f, delete a[c]),
            g = p.cssHooks[d];
            if (g && "expand" in g) {
                f = g.expand(f),
                delete a[d];
                for (c in f) {
                    c in a || (a[c] = f[c], b[c] = e)
                }
            } else {
                b[d] = e
            }
        }
    }
    function cX(a, b, c) {
        var d, e, f, g, h, i, j, k, l = this,
        m = a.style,
        n = {},
        o = [],
        q = a.nodeType && bY(a);
        c.queue || (j = p._queueHooks(a, "fx"), j.unqueued == null && (j.unqueued = 0, k = j.empty.fire, j.empty.fire = function() {
            j.unqueued || k()
        }), j.unqueued++, l.always(function() {
            l.always(function() {
                j.unqueued--,
                p.queue(a, "fx").length || j.empty.fire()
            })
        })),
        a.nodeType === 1 && ("height" in b || "width" in b) && (c.overflow = [m.overflow, m.overflowX, m.overflowY], p.css(a, "display") === "inline" && p.css(a, "float") === "none" && (!p.support.inlineBlockNeedsLayout || cb(a.nodeName) === "inline" ? m.display = "inline-block": m.zoom = 1)),
        c.overflow && (m.overflow = "hidden", p.support.shrinkWrapBlocks || l.done(function() {
            m.overflow = c.overflow[0],
            m.overflowX = c.overflow[1],
            m.overflowY = c.overflow[2]
        }));
        for (d in b) {
            f = b[d];
            if (cO.exec(f)) {
                delete b[d];
                if (f === (q ? "hide": "show")) {
                    continue
                }
                o.push(d)
            }
        }
        g = o.length;
        if (g) {
            h = p._data(a, "fxshow") || p._data(a, "fxshow", {}),
            q ? p(a).show() : l.done(function() {
                p(a).hide()
            }),
            l.done(function() {
                var b;
                p.removeData(a, "fxshow", !0);
                for (b in n) {
                    p.style(a, b, n[b])
                }
            });
            for (d = 0; d < g; d++) {
                e = o[d],
                i = l.createTween(e, q ? h[e] : 0),
                n[e] = h[e] || p.style(a, e),
                e in h || (h[e] = i.start, q && (i.end = i.start, i.start = e === "width" || e === "height" ? 1 : 0))
            }
        }
    }
    function cY(a, b, c, d, e) {
        return new cY.prototype.init(a, b, c, d, e)
    }
    function cZ(a, b) {
        var c, d = {
            height: a
        },
        e = 0;
        for (; e < 4; e += 2 - b) {
            c = bU[e],
            d["margin" + c] = d["padding" + c] = a
        }
        return b && (d.opacity = d.width = a),
        d
    }
    function c_(a) {
        return p.isWindow(a) ? a: a.nodeType === 9 ? a.defaultView || a.parentWindow: !1
    }
    var c, d, e = a.document,
    f = a.location,
    g = a.navigator,
    h = a.jQuery,
    i = a.$,
    j = Array.prototype.push,
    k = Array.prototype.slice,
    l = Array.prototype.indexOf,
    m = Object.prototype.toString,
    n = Object.prototype.hasOwnProperty,
    o = String.prototype.trim,
    p = function(a, b) {
        return new p.fn.init(a, b, c)
    },
    q = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
    r = /\S/,
    s = /\s+/,
    t = r.test(" ") ? /^[\s\xA0]+|[\s\xA0]+$/g: /^\s+|\s+$/g,
    u = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
    v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    w = /^[\],:{}\s]*$/,
    x = /(?:^|:|,)(?:\s*\[)+/g,
    y = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
    z = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
    A = /^-ms-/,
    B = /-([\da-z])/gi,
    C = function(a, b) {
        return (b + "").toUpperCase()
    },
    D = function() {
        e.addEventListener ? (e.removeEventListener("DOMContentLoaded", D, !1), p.ready()) : e.readyState === "complete" && (e.detachEvent("onreadystatechange", D), p.ready())
    },
    E = {};
    p.fn = p.prototype = {
        constructor: p,
        init: function(a, c, d) {
            var f, g, h, i;
            if (!a) {
                return this
            }
            if (a.nodeType) {
                return this.context = this[0] = a,
                this.length = 1,
                this
            }
            if (typeof a == "string") {
                a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? f = [null, a, null] : f = u.exec(a);
                if (f && (f[1] || !c)) {
                    if (f[1]) {
                        return c = c instanceof p ? c[0] : c,
                        i = c && c.nodeType ? c.ownerDocument || c: e,
                        a = p.parseHTML(f[1], i, !0),
                        v.test(f[1]) && p.isPlainObject(c) && this.attr.call(a, c, !0),
                        p.merge(this, a)
                    }
                    g = e.getElementById(f[2]);
                    if (g && g.parentNode) {
                        if (g.id !== f[2]) {
                            return d.find(a)
                        }
                        this.length = 1,
                        this[0] = g
                    }
                    return this.context = e,
                    this.selector = a,
                    this
                }
                return ! c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a)
            }
            return p.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), p.makeArray(a, this))
        },
        selector: "",
        jquery: "1.8.0",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return k.call(this)
        },
        get: function(a) {
            return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
        },
        pushStack: function(a, b, c) {
            var d = p.merge(this.constructor(), a);
            return d.prevObject = this,
            d.context = this.context,
            b === "find" ? d.selector = this.selector + (this.selector ? " ": "") + c: b && (d.selector = this.selector + "." + b + "(" + c + ")"),
            d
        },
        each: function(a, b) {
            return p.each(this, a, b)
        },
        ready: function(a) {
            return p.ready.promise().done(a),
            this
        },
        eq: function(a) {
            return a = +a,
            a === -1 ? this.slice(a) : this.slice(a, a + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq( - 1)
        },
        slice: function() {
            return this.pushStack(k.apply(this, arguments), "slice", k.call(arguments).join(","))
        },
        map: function(a) {
            return this.pushStack(p.map(this,
            function(b, c) {
                return a.call(b, c, b)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: j,
        sort: [].sort,
        splice: [].splice
    },
    p.fn.init.prototype = p.fn,
    p.extend = p.fn.extend = function() {
        var a, c, d, e, f, g, h = arguments[0] || {},
        i = 1,
        j = arguments.length,
        k = !1;
        typeof h == "boolean" && (k = h, h = arguments[1] || {},
        i = 2),
        typeof h != "object" && !p.isFunction(h) && (h = {}),
        j === i && (h = this, --i);
        for (; i < j; i++) {
            if ((a = arguments[i]) != null) {
                for (c in a) {
                    d = h[c],
                    e = a[c];
                    if (h === e) {
                        continue
                    }
                    k && e && (p.isPlainObject(e) || (f = p.isArray(e))) ? (f ? (f = !1, g = d && p.isArray(d) ? d: []) : g = d && p.isPlainObject(d) ? d: {},
                    h[c] = p.extend(k, g, e)) : e !== b && (h[c] = e)
                }
            }
        }
        return h
    },
    p.extend({
        noConflict: function(b) {
            return a.$ === p && (a.$ = i),
            b && a.jQuery === p && (a.jQuery = h),
            p
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? p.readyWait++:p.ready(!0)
        },
        ready: function(a) {
            if (a === !0 ? --p.readyWait: p.isReady) {
                return
            }
            if (!e.body) {
                return setTimeout(p.ready, 1)
            }
            p.isReady = !0;
            if (a !== !0 && --p.readyWait > 0) {
                return
            }
            d.resolveWith(e, [p]),
            p.fn.trigger && p(e).trigger("ready").off("ready")
        },
        isFunction: function(a) {
            return p.type(a) === "function"
        },
        isArray: Array.isArray ||
        function(a) {
            return p.type(a) === "array"
        },
        isWindow: function(a) {
            return a != null && a == a.window
        },
        isNumeric: function(a) {
            return ! isNaN(parseFloat(a)) && isFinite(a)
        },
        type: function(a) {
            return a == null ? String(a) : E[m.call(a)] || "object"
        },
        isPlainObject: function(a) {
            if (!a || p.type(a) !== "object" || a.nodeType || p.isWindow(a)) {
                return ! 1
            }
            try {
                if (a.constructor && !n.call(a, "constructor") && !n.call(a.constructor.prototype, "isPrototypeOf")) {
                    return ! 1
                }
            } catch(c) {
                return ! 1
            }
            var d;
            for (d in a) {}
            return d === b || n.call(a, d)
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) {
                return ! 1
            }
            return ! 0
        },
        error: function(a) {
            throw new Error(a)
        },
        parseHTML: function(a, b, c) {
            var d;
            return ! a || typeof a != "string" ? null: (typeof b == "boolean" && (c = b, b = 0), b = b || e, (d = v.exec(a)) ? [b.createElement(d[1])] : (d = p.buildFragment([a], b, c ? null: []), p.merge([], (d.cacheable ? p.clone(d.fragment) : d.fragment).childNodes)))
        },
        parseJSON: function(b) {
            if (!b || typeof b != "string") {
                return null
            }
            b = p.trim(b);
            if (a.JSON && a.JSON.parse) {
                return a.JSON.parse(b)
            }
            if (w.test(b.replace(y, "@").replace(z, "]").replace(x, ""))) {
                return (new Function("return " + b))()
            }
            p.error("Invalid JSON: " + b)
        },
        parseXML: function(c) {
            var d, e;
            if (!c || typeof c != "string") {
                return null
            }
            try {
                a.DOMParser ? (e = new DOMParser, d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
            } catch(f) {
                d = b
            }
            return (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && p.error("Invalid XML: " + c),
            d
        },
        noop: function() {},
        globalEval: function(b) {
            b && r.test(b) && (a.execScript ||
            function(b) {
                a.eval.call(a, b)
            })(b)
        },
        camelCase: function(a) {
            return a.replace(A, "ms-").replace(B, C)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
        },
        each: function(a, c, d) {
            var e, f = 0,
            g = a.length,
            h = g === b || p.isFunction(a);
            if (d) {
                if (h) {
                    for (e in a) {
                        if (c.apply(a[e], d) === !1) {
                            break
                        }
                    }
                } else {
                    for (; f < g;) {
                        if (c.apply(a[f++], d) === !1) {
                            break
                        }
                    }
                }
            } else {
                if (h) {
                    for (e in a) {
                        if (c.call(a[e], e, a[e]) === !1) {
                            break
                        }
                    }
                } else {
                    for (; f < g;) {
                        if (c.call(a[f], f, a[f++]) === !1) {
                            break
                        }
                    }
                }
            }
            return a
        },
        trim: o ?
        function(a) {
            return a == null ? "": o.call(a)
        }: function(a) {
            return a == null ? "": a.toString().replace(t, "")
        },
        makeArray: function(a, b) {
            var c, d = b || [];
            return a != null && (c = p.type(a), a.length == null || c === "string" || c === "function" || c === "regexp" || p.isWindow(a) ? j.call(d, a) : p.merge(d, a)),
            d
        },
        inArray: function(a, b, c) {
            var d;
            if (b) {
                if (l) {
                    return l.call(b, a, c)
                }
                d = b.length,
                c = c ? c < 0 ? Math.max(0, d + c) : c: 0;
                for (; c < d; c++) {
                    if (c in b && b[c] === a) {
                        return c
                    }
                }
            }
            return - 1
        },
        merge: function(a, c) {
            var d = c.length,
            e = a.length,
            f = 0;
            if (typeof d == "number") {
                for (; f < d; f++) {
                    a[e++] = c[f]
                }
            } else {
                while (c[f] !== b) {
                    a[e++] = c[f++]
                }
            }
            return a.length = e,
            a
        },
        grep: function(a, b, c) {
            var d, e = [],
            f = 0,
            g = a.length;
            c = !!c;
            for (; f < g; f++) {
                d = !!b(a[f], f),
                c !== d && e.push(a[f])
            }
            return e
        },
        map: function(a, c, d) {
            var e, f, g = [],
            h = 0,
            i = a.length,
            j = a instanceof p || i !== b && typeof i == "number" && (i > 0 && a[0] && a[i - 1] || i === 0 || p.isArray(a));
            if (j) {
                for (; h < i; h++) {
                    e = c(a[h], h, d),
                    e != null && (g[g.length] = e)
                }
            } else {
                for (f in a) {
                    e = c(a[f], f, d),
                    e != null && (g[g.length] = e)
                }
            }
            return g.concat.apply([], g)
        },
        guid: 1,
        proxy: function(a, c) {
            var d, e, f;
            return typeof c == "string" && (d = a[c], c = a, a = d),
            p.isFunction(a) ? (e = k.call(arguments, 2), f = function() {
                return a.apply(c, e.concat(k.call(arguments)))
            },
            f.guid = a.guid = a.guid || f.guid || p.guid++, f) : b
        },
        access: function(a, c, d, e, f, g, h) {
            var i, j = d == null,
            k = 0,
            l = a.length;
            if (d && typeof d == "object") {
                for (k in d) {
                    p.access(a, c, k, d[k], 1, g, e)
                }
                f = 1
            } else {
                if (e !== b) {
                    i = h === b && p.isFunction(e),
                    j && (i ? (i = c, c = function(a, b, c) {
                        return i.call(p(a), c)
                    }) : (c.call(a, e), c = null));
                    if (c) {
                        for (; k < l; k++) {
                            c(a[k], d, i ? e.call(a[k], k, c(a[k], d)) : e, h)
                        }
                    }
                    f = 1
                }
            }
            return f ? a: j ? c.call(a) : l ? c(a[0], d) : g
        },
        now: function() {
            return (new Date).getTime()
        }
    }),
    p.ready.promise = function(b) {
        if (!d) {
            d = p.Deferred();
            if (e.readyState === "complete" || e.readyState !== "loading" && e.addEventListener) {
                setTimeout(p.ready, 1)
            } else {
                if (e.addEventListener) {
                    e.addEventListener("DOMContentLoaded", D, !1),
                    a.addEventListener("load", p.ready, !1)
                } else {
                    e.attachEvent("onreadystatechange", D),
                    a.attachEvent("onload", p.ready);
                    var c = !1;
                    try {
                        c = a.frameElement == null && e.documentElement
                    } catch(f) {}
                    c && c.doScroll &&
                    function g() {
                        if (!p.isReady) {
                            try {
                                c.doScroll("left")
                            } catch(a) {
                                return setTimeout(g, 50)
                            }
                            p.ready()
                        }
                    } ()
                }
            }
        }
        return d.promise(b)
    },
    p.each("Boolean Number String Function Array Date RegExp Object".split(" "),
    function(a, b) {
        E["[object " + b + "]"] = b.toLowerCase()
    }),
    c = p(e);
    var F = {};
    p.Callbacks = function(a) {
        a = typeof a == "string" ? F[a] || G(a) : p.extend({},
        a);
        var c, d, e, f, g, h, i = [],
        j = !a.once && [],
        k = function(b) {
            c = a.memory && b,
            d = !0,
            h = f || 0,
            f = 0,
            g = i.length,
            e = !0;
            for (; i && h < g; h++) {
                if (i[h].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
                    c = !1;
                    break
                }
            }
            e = !1,
            i && (j ? j.length && k(j.shift()) : c ? i = [] : l.disable())
        },
        l = {
            add: function() {
                if (i) {
                    var b = i.length; (function d(b) {
                        p.each(b,
                        function(b, c) {
                            p.isFunction(c) && (!a.unique || !l.has(c)) ? i.push(c) : c && c.length && d(c)
                        })
                    })(arguments),
                    e ? g = i.length: c && (f = b, k(c))
                }
                return this
            },
            remove: function() {
                return i && p.each(arguments,
                function(a, b) {
                    var c;
                    while ((c = p.inArray(b, i, c)) > -1) {
                        i.splice(c, 1),
                        e && (c <= g && g--, c <= h && h--)
                    }
                }),
                this
            },
            has: function(a) {
                return p.inArray(a, i) > -1
            },
            empty: function() {
                return i = [],
                this
            },
            disable: function() {
                return i = j = c = b,
                this
            },
            disabled: function() {
                return ! i
            },
            lock: function() {
                return j = b,
                c || l.disable(),
                this
            },
            locked: function() {
                return ! j
            },
            fireWith: function(a, b) {
                return b = b || [],
                b = [a, b.slice ? b.slice() : b],
                i && (!d || j) && (e ? j.push(b) : k(b)),
                this
            },
            fire: function() {
                return l.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !! d
            }
        };
        return l
    },
    p.extend({
        Deferred: function(a) {
            var b = [["resolve", "done", p.Callbacks("once memory"), "resolved"], ["reject", "fail", p.Callbacks("once memory"), "rejected"], ["notify", "progress", p.Callbacks("memory")]],
            c = "pending",
            d = {
                state: function() {
                    return c
                },
                always: function() {
                    return e.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var a = arguments;
                    return p.Deferred(function(c) {
                        p.each(b,
                        function(b, d) {
                            var f = d[0],
                            g = a[b];
                            e[d[1]](p.isFunction(g) ?
                            function() {
                                var a = g.apply(this, arguments);
                                a && p.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f + "With"](this === e ? c: this, [a])
                            }: c[f])
                        }),
                        a = null
                    }).promise()
                },
                promise: function(a) {
                    return typeof a == "object" ? p.extend(a, d) : d
                }
            },
            e = {};
            return d.pipe = d.then,
            p.each(b,
            function(a, f) {
                var g = f[2],
                h = f[3];
                d[f[1]] = g.add,
                h && g.add(function() {
                    c = h
                },
                b[a ^ 1][2].disable, b[2][2].lock),
                e[f[0]] = g.fire,
                e[f[0] + "With"] = g.fireWith
            }),
            d.promise(e),
            a && a.call(e, e),
            e
        },
        when: function(a) {
            var b = 0,
            c = k.call(arguments),
            d = c.length,
            e = d !== 1 || a && p.isFunction(a.promise) ? d: 0,
            f = e === 1 ? a: p.Deferred(),
            g = function(a, b, c) {
                return function(d) {
                    b[a] = this,
                    c[a] = arguments.length > 1 ? k.call(arguments) : d,
                    c === h ? f.notifyWith(b, c) : --e || f.resolveWith(b, c)
                }
            },
            h,
            i,
            j;
            if (d > 1) {
                h = new Array(d),
                i = new Array(d),
                j = new Array(d);
                for (; b < d; b++) {
                    c[b] && p.isFunction(c[b].promise) ? c[b].promise().done(g(b, j, c)).fail(f.reject).progress(g(b, i, h)) : --e
                }
            }
            return e || f.resolveWith(j, c),
            f.promise()
        }
    }),
    p.support = function() {
        var b, c, d, f, g, h, i, j, k, l, m, n = e.createElement("div");
        n.setAttribute("className", "t"),
        n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        c = n.getElementsByTagName("*"),
        d = n.getElementsByTagName("a")[0],
        d.style.cssText = "top:1px;float:left;opacity:.5";
        if (!c || !c.length || !d) {
            return {}
        }
        f = e.createElement("select"),
        g = f.appendChild(e.createElement("option")),
        h = n.getElementsByTagName("input")[0],
        b = {
            leadingWhitespace: n.firstChild.nodeType === 3,
            tbody: !n.getElementsByTagName("tbody").length,
            htmlSerialize: !!n.getElementsByTagName("link").length,
            style: /top/.test(d.getAttribute("style")),
            hrefNormalized: d.getAttribute("href") === "/a",
            opacity: /^0.5/.test(d.style.opacity),
            cssFloat: !!d.style.cssFloat,
            checkOn: h.value === "on",
            optSelected: g.selected,
            getSetAttribute: n.className !== "t",
            enctype: !!e.createElement("form").enctype,
            html5Clone: e.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            boxModel: e.compatMode === "CSS1Compat",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        },
        h.checked = !0,
        b.noCloneChecked = h.cloneNode(!0).checked,
        f.disabled = !0,
        b.optDisabled = !g.disabled;
        try {
            delete n.test
        } catch(o) {
            b.deleteExpando = !1
        } ! n.addEventListener && n.attachEvent && n.fireEvent && (n.attachEvent("onclick", m = function() {
            b.noCloneEvent = !1
        }), n.cloneNode(!0).fireEvent("onclick"), n.detachEvent("onclick", m)),
        h = e.createElement("input"),
        h.value = "t",
        h.setAttribute("type", "radio"),
        b.radioValue = h.value === "t",
        h.setAttribute("checked", "checked"),
        h.setAttribute("name", "t"),
        n.appendChild(h),
        i = e.createDocumentFragment(),
        i.appendChild(n.lastChild),
        b.checkClone = i.cloneNode(!0).cloneNode(!0).lastChild.checked,
        b.appendChecked = h.checked,
        i.removeChild(h),
        i.appendChild(n);
        if (n.attachEvent) {
            for (k in {
                submit: !0,
                change: !0,
                focusin: !0
            }) {
                j = "on" + k,
                l = j in n,
                l || (n.setAttribute(j, "return;"), l = typeof n[j] == "function"),
                b[k + "Bubbles"] = l
            }
        }
        return p(function() {
            var c, d, f, g, h = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
            i = e.getElementsByTagName("body")[0];
            if (!i) {
                return
            }
            c = e.createElement("div"),
            c.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",
            i.insertBefore(c, i.firstChild),
            d = e.createElement("div"),
            c.appendChild(d),
            d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
            f = d.getElementsByTagName("td"),
            f[0].style.cssText = "padding:0;margin:0;border:0;display:none",
            l = f[0].offsetHeight === 0,
            f[0].style.display = "",
            f[1].style.display = "none",
            b.reliableHiddenOffsets = l && f[0].offsetHeight === 0,
            d.innerHTML = "",
            d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",
            b.boxSizing = d.offsetWidth === 4,
            b.doesNotIncludeMarginInBodyOffset = i.offsetTop !== 1,
            a.getComputedStyle && (b.pixelPosition = (a.getComputedStyle(d, null) || {}).top !== "1%", b.boxSizingReliable = (a.getComputedStyle(d, null) || {
                width: "4px"
            }).width === "4px", g = e.createElement("div"), g.style.cssText = d.style.cssText = h, g.style.marginRight = g.style.width = "0", d.style.width = "1px", d.appendChild(g), b.reliableMarginRight = !parseFloat((a.getComputedStyle(g, null) || {}).marginRight)),
            typeof d.style.zoom != "undefined" && (d.innerHTML = "", d.style.cssText = h + "width:1px;padding:1px;display:inline;zoom:1", b.inlineBlockNeedsLayout = d.offsetWidth === 3, d.style.display = "block", d.style.overflow = "visible", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", b.shrinkWrapBlocks = d.offsetWidth !== 3, c.style.zoom = 1),
            i.removeChild(c),
            c = d = f = g = null
        }),
        i.removeChild(n),
        c = d = f = g = h = i = n = null,
        b
    } ();
    var H = /^(?:\{.*\}|\[.*\])$/,
    I = /([A-Z])/g;
    p.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (p.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            return a = a.nodeType ? p.cache[a[p.expando]] : a[p.expando],
            !!a && !K(a)
        },
        data: function(a, c, d, e) {
            if (!p.acceptData(a)) {
                return
            }
            var f, g, h = p.expando,
            i = typeof c == "string",
            j = a.nodeType,
            k = j ? p.cache: a,
            l = j ? a[h] : a[h] && h;
            if ((!l || !k[l] || !e && !k[l].data) && i && d === b) {
                return
            }
            l || (j ? a[h] = l = p.deletedIds.pop() || ++p.uuid: l = h),
            k[l] || (k[l] = {},
            j || (k[l].toJSON = p.noop));
            if (typeof c == "object" || typeof c == "function") {
                e ? k[l] = p.extend(k[l], c) : k[l].data = p.extend(k[l].data, c)
            }
            return f = k[l],
            e || (f.data || (f.data = {}), f = f.data),
            d !== b && (f[p.camelCase(c)] = d),
            i ? (g = f[c], g == null && (g = f[p.camelCase(c)])) : g = f,
            g
        },
        removeData: function(a, b, c) {
            if (!p.acceptData(a)) {
                return
            }
            var d, e, f, g = a.nodeType,
            h = g ? p.cache: a,
            i = g ? a[p.expando] : p.expando;
            if (!h[i]) {
                return
            }
            if (b) {
                d = c ? h[i] : h[i].data;
                if (d) {
                    p.isArray(b) || (b in d ? b = [b] : (b = p.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
                    for (e = 0, f = b.length; e < f; e++) {
                        delete d[b[e]]
                    }
                    if (! (c ? K: p.isEmptyObject)(d)) {
                        return
                    }
                }
            }
            if (!c) {
                delete h[i].data;
                if (!K(h[i])) {
                    return
                }
            }
            g ? p.cleanData([a], !0) : p.support.deleteExpando || h != h.window ? delete h[i] : h[i] = null
        },
        _data: function(a, b, c) {
            return p.data(a, b, c, !0)
        },
        acceptData: function(a) {
            var b = a.nodeName && p.noData[a.nodeName.toLowerCase()];
            return ! b || b !== !0 && a.getAttribute("classid") === b
        }
    }),
    p.fn.extend({
        data: function(a, c) {
            var d, e, f, g, h, i = this[0],
            j = 0,
            k = null;
            if (a === b) {
                if (this.length) {
                    k = p.data(i);
                    if (i.nodeType === 1 && !p._data(i, "parsedAttrs")) {
                        f = i.attributes;
                        for (h = f.length; j < h; j++) {
                            g = f[j].name,
                            g.indexOf("data-") === 0 && (g = p.camelCase(g.substring(5)), J(i, g, k[g]))
                        }
                        p._data(i, "parsedAttrs", !0)
                    }
                }
                return k
            }
            return typeof a == "object" ? this.each(function() {
                p.data(this, a)
            }) : (d = a.split(".", 2), d[1] = d[1] ? "." + d[1] : "", e = d[1] + "!", p.access(this,
            function(c) {
                if (c === b) {
                    return k = this.triggerHandler("getData" + e, [d[0]]),
                    k === b && i && (k = p.data(i, a), k = J(i, a, k)),
                    k === b && d[1] ? this.data(d[0]) : k
                }
                d[1] = c,
                this.each(function() {
                    var b = p(this);
                    b.triggerHandler("setData" + e, d),
                    p.data(this, a, c),
                    b.triggerHandler("changeData" + e, d)
                })
            },
            null, c, arguments.length > 1, null, !1))
        },
        removeData: function(a) {
            return this.each(function() {
                p.removeData(this, a)
            })
        }
    }),
    p.extend({
        queue: function(a, b, c) {
            var d;
            if (a) {
                return b = (b || "fx") + "queue",
                d = p._data(a, b),
                c && (!d || p.isArray(c) ? d = p._data(a, b, p.makeArray(c)) : d.push(c)),
                d || []
            }
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = p.queue(a, b),
            d = c.shift(),
            e = p._queueHooks(a, b),
            f = function() {
                p.dequeue(a, b)
            };
            d === "inprogress" && (d = c.shift()),
            d && (b === "fx" && c.unshift("inprogress"), delete e.stop, d.call(a, f, e)),
            !c.length && e && e.empty.fire()
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return p._data(a, c) || p._data(a, c, {
                empty: p.Callbacks("once memory").add(function() {
                    p.removeData(a, b + "queue", !0),
                    p.removeData(a, c, !0)
                })
            })
        }
    }),
    p.fn.extend({
        queue: function(a, c) {
            var d = 2;
            return typeof a != "string" && (c = a, a = "fx", d--),
            arguments.length < d ? p.queue(this[0], a) : c === b ? this: this.each(function() {
                var b = p.queue(this, a, c);
                p._queueHooks(this, a),
                a === "fx" && b[0] !== "inprogress" && p.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                p.dequeue(this, a)
            })
        },
        delay: function(a, b) {
            return a = p.fx ? p.fx.speeds[a] || a: a,
            b = b || "fx",
            this.queue(b,
            function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d)
                }
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, c) {
            var d, e = 1,
            f = p.Deferred(),
            g = this,
            h = this.length,
            i = function() {--e || f.resolveWith(g, [g])
            };
            typeof a != "string" && (c = a, a = b),
            a = a || "fx";
            while (h--) { (d = p._data(g[h], a + "queueHooks")) && d.empty && (e++, d.empty.add(i))
            }
            return i(),
            f.promise(c)
        }
    });
    var L, M, N, O = /[\t\r\n]/g,
    P = /\r/g,
    Q = /^(?:button|input)$/i,
    R = /^(?:button|input|object|select|textarea)$/i,
    S = /^a(?:rea|)$/i,
    T = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
    U = p.support.getSetAttribute;
    p.fn.extend({
        attr: function(a, b) {
            return p.access(this, p.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                p.removeAttr(this, a)
            })
        },
        prop: function(a, b) {
            return p.access(this, p.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            return a = p.propFix[a] || a,
            this.each(function() {
                try {
                    this[a] = b,
                    delete this[a]
                } catch(c) {}
            })
        },
        addClass: function(a) {
            var b, c, d, e, f, g, h;
            if (p.isFunction(a)) {
                return this.each(function(b) {
                    p(this).addClass(a.call(this, b, this.className))
                })
            }
            if (a && typeof a == "string") {
                b = a.split(s);
                for (c = 0, d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1) {
                        if (!e.className && b.length === 1) {
                            e.className = a
                        } else {
                            f = " " + e.className + " ";
                            for (g = 0, h = b.length; g < h; g++) {~f.indexOf(" " + b[g] + " ") || (f += b[g] + " ")
                            }
                            e.className = p.trim(f)
                        }
                    }
                }
            }
            return this
        },
        removeClass: function(a) {
            var c, d, e, f, g, h, i;
            if (p.isFunction(a)) {
                return this.each(function(b) {
                    p(this).removeClass(a.call(this, b, this.className))
                })
            }
            if (a && typeof a == "string" || a === b) {
                c = (a || "").split(s);
                for (h = 0, i = this.length; h < i; h++) {
                    e = this[h];
                    if (e.nodeType === 1 && e.className) {
                        d = (" " + e.className + " ").replace(O, " ");
                        for (f = 0, g = c.length; f < g; f++) {
                            while (d.indexOf(" " + c[f] + " ") > -1) {
                                d = d.replace(" " + c[f] + " ", " ")
                            }
                        }
                        e.className = a ? p.trim(d) : ""
                    }
                }
            }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a,
            d = typeof b == "boolean";
            return p.isFunction(a) ? this.each(function(c) {
                p(this).toggleClass(a.call(this, c, this.className, b), b)
            }) : this.each(function() {
                if (c === "string") {
                    var e, f = 0,
                    g = p(this),
                    h = b,
                    i = a.split(s);
                    while (e = i[f++]) {
                        h = d ? h: !g.hasClass(e),
                        g[h ? "addClass": "removeClass"](e)
                    }
                } else {
                    if (c === "undefined" || c === "boolean") {
                        this.className && p._data(this, "__className__", this.className),
                        this.className = this.className || a === !1 ? "": p._data(this, "__className__") || ""
                    }
                }
            })
        },
        hasClass: function(a) {
            var b = " " + a + " ",
            c = 0,
            d = this.length;
            for (; c < d; c++) {
                if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(O, " ").indexOf(b) > -1) {
                    return ! 0
                }
            }
            return ! 1
        },
        val: function(a) {
            var c, d, e, f = this[0];
            if (!arguments.length) {
                if (f) {
                    return c = p.valHooks[f.type] || p.valHooks[f.nodeName.toLowerCase()],
                    c && "get" in c && (d = c.get(f, "value")) !== b ? d: (d = f.value, typeof d == "string" ? d.replace(P, "") : d == null ? "": d)
                }
                return
            }
            return e = p.isFunction(a),
            this.each(function(d) {
                var f, g = p(this);
                if (this.nodeType !== 1) {
                    return
                }
                e ? f = a.call(this, d, g.val()) : f = a,
                f == null ? f = "": typeof f == "number" ? f += "": p.isArray(f) && (f = p.map(f,
                function(a) {
                    return a == null ? "": a + ""
                })),
                c = p.valHooks[this.type] || p.valHooks[this.nodeName.toLowerCase()];
                if (!c || !("set" in c) || c.set(this, f, "value") === b) {
                    this.value = f
                }
            })
        }
    }),
    p.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = a.attributes.value;
                    return ! b || b.specified ? a.value: a.text
                }
            },
            select: {
                get: function(a) {
                    var b, c, d, e, f = a.selectedIndex,
                    g = [],
                    h = a.options,
                    i = a.type === "select-one";
                    if (f < 0) {
                        return null
                    }
                    c = i ? f: 0,
                    d = i ? f + 1 : h.length;
                    for (; c < d; c++) {
                        e = h[c];
                        if (e.selected && (p.support.optDisabled ? !e.disabled: e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !p.nodeName(e.parentNode, "optgroup"))) {
                            b = p(e).val();
                            if (i) {
                                return b
                            }
                            g.push(b)
                        }
                    }
                    return i && !g.length && h.length ? p(h[f]).val() : g
                },
                set: function(a, b) {
                    var c = p.makeArray(b);
                    return p(a).find("option").each(function() {
                        this.selected = p.inArray(p(this).val(), c) >= 0
                    }),
                    c.length || (a.selectedIndex = -1),
                    c
                }
            }
        },
        attrFn: {},
        attr: function(a, c, d, e) {
            var f, g, h, i = a.nodeType;
            if (!a || i === 3 || i === 8 || i === 2) {
                return
            }
            if (e && p.isFunction(p.fn[c])) {
                return p(a)[c](d)
            }
            if (typeof a.getAttribute == "undefined") {
                return p.prop(a, c, d)
            }
            h = i !== 1 || !p.isXMLDoc(a),
            h && (c = c.toLowerCase(), g = p.attrHooks[c] || (T.test(c) ? M: L));
            if (d !== b) {
                if (d === null) {
                    p.removeAttr(a, c);
                    return
                }
                return g && "set" in g && h && (f = g.set(a, d, c)) !== b ? f: (a.setAttribute(c, "" + d), d)
            }
            return g && "get" in g && h && (f = g.get(a, c)) !== null ? f: (f = a.getAttribute(c), f === null ? b: f)
        },
        removeAttr: function(a, b) {
            var c, d, e, f, g = 0;
            if (b && a.nodeType === 1) {
                d = b.split(s);
                for (; g < d.length; g++) {
                    e = d[g],
                    e && (c = p.propFix[e] || e, f = T.test(e), f || p.attr(a, e, ""), a.removeAttribute(U ? e: c), f && c in a && (a[c] = !1))
                }
            }
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (Q.test(a.nodeName) && a.parentNode) {
                        p.error("type property can't be changed")
                    } else {
                        if (!p.support.radioValue && b === "radio" && p.nodeName(a, "input")) {
                            var c = a.value;
                            return a.setAttribute("type", b),
                            c && (a.value = c),
                            b
                        }
                    }
                }
            },
            value: {
                get: function(a, b) {
                    return L && p.nodeName(a, "button") ? L.get(a, b) : b in a ? a.value: null
                },
                set: function(a, b, c) {
                    if (L && p.nodeName(a, "button")) {
                        return L.set(a, b, c)
                    }
                    a.value = b
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
        prop: function(a, c, d) {
            var e, f, g, h = a.nodeType;
            if (!a || h === 3 || h === 8 || h === 2) {
                return
            }
            return g = h !== 1 || !p.isXMLDoc(a),
            g && (c = p.propFix[c] || c, f = p.propHooks[c]),
            d !== b ? f && "set" in f && (e = f.set(a, d, c)) !== b ? e: a[c] = d: f && "get" in f && (e = f.get(a, c)) !== null ? e: a[c]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : R.test(a.nodeName) || S.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }),
    M = {
        get: function(a, c) {
            var d, e = p.prop(a, c);
            return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
        },
        set: function(a, b, c) {
            var d;
            return b === !1 ? p.removeAttr(a, c) : (d = p.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())),
            c
        }
    },
    U || (N = {
        name: !0,
        id: !0,
        coords: !0
    },
    L = p.valHooks.button = {
        get: function(a, c) {
            var d;
            return d = a.getAttributeNode(c),
            d && (N[c] ? d.value !== "": d.specified) ? d.value: b
        },
        set: function(a, b, c) {
            var d = a.getAttributeNode(c);
            return d || (d = e.createAttribute(c), a.setAttributeNode(d)),
            d.value = b + ""
        }
    },
    p.each(["width", "height"],
    function(a, b) {
        p.attrHooks[b] = p.extend(p.attrHooks[b], {
            set: function(a, c) {
                if (c === "") {
                    return a.setAttribute(b, "auto"),
                    c
                }
            }
        })
    }), p.attrHooks.contenteditable = {
        get: L.get,
        set: function(a, b, c) {
            b === "" && (b = "false"),
            L.set(a, b, c)
        }
    }),
    p.support.hrefNormalized || p.each(["href", "src", "width", "height"],
    function(a, c) {
        p.attrHooks[c] = p.extend(p.attrHooks[c], {
            get: function(a) {
                var d = a.getAttribute(c, 2);
                return d === null ? b: d
            }
        })
    }),
    p.support.style || (p.attrHooks.style = {
        get: function(a) {
            return a.style.cssText.toLowerCase() || b
        },
        set: function(a, b) {
            return a.style.cssText = "" + b
        }
    }),
    p.support.optSelected || (p.propHooks.selected = p.extend(p.propHooks.selected, {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex),
            null
        }
    })),
    p.support.enctype || (p.propFix.enctype = "encoding"),
    p.support.checkOn || p.each(["radio", "checkbox"],
    function() {
        p.valHooks[this] = {
            get: function(a) {
                return a.getAttribute("value") === null ? "on": a.value
            }
        }
    }),
    p.each(["radio", "checkbox"],
    function() {
        p.valHooks[this] = p.extend(p.valHooks[this], {
            set: function(a, b) {
                if (p.isArray(b)) {
                    return a.checked = p.inArray(p(a).val(), b) >= 0
                }
            }
        })
    });
    var V = /^(?:textarea|input|select)$/i,
    W = /^([^\.]*|)(?:\.(.+)|)$/,
    X = /(?:^|\s)hover(\.\S+|)\b/,
    Y = /^key/,
    Z = /^(?:mouse|contextmenu)|click/,
    $ = /^(?:focusinfocus|focusoutblur)$/,
    _ = function(a) {
        return p.event.special.hover ? a: a.replace(X, "mouseenter$1 mouseleave$1")
    };
    p.event = {
        add: function(a, c, d, e, f) {
            var g, h, i, j, k, l, m, n, o, q, r;
            if (a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(g = p._data(a))) {
                return
            }
            d.handler && (o = d, d = o.handler, f = o.selector),
            d.guid || (d.guid = p.guid++),
            i = g.events,
            i || (g.events = i = {}),
            h = g.handle,
            h || (g.handle = h = function(a) {
                return typeof p != "undefined" && (!a || p.event.triggered !== a.type) ? p.event.dispatch.apply(h.elem, arguments) : b
            },
            h.elem = a),
            c = p.trim(_(c)).split(" ");
            for (j = 0; j < c.length; j++) {
                k = W.exec(c[j]) || [],
                l = k[1],
                m = (k[2] || "").split(".").sort(),
                r = p.event.special[l] || {},
                l = (f ? r.delegateType: r.bindType) || l,
                r = p.event.special[l] || {},
                n = p.extend({
                    type: l,
                    origType: k[1],
                    data: e,
                    handler: d,
                    guid: d.guid,
                    selector: f,
                    namespace: m.join(".")
                },
                o),
                q = i[l];
                if (!q) {
                    q = i[l] = [],
                    q.delegateCount = 0;
                    if (!r.setup || r.setup.call(a, e, m, h) === !1) {
                        a.addEventListener ? a.addEventListener(l, h, !1) : a.attachEvent && a.attachEvent("on" + l, h)
                    }
                }
                r.add && (r.add.call(a, n), n.handler.guid || (n.handler.guid = d.guid)),
                f ? q.splice(q.delegateCount++, 0, n) : q.push(n),
                p.event.global[l] = !0
            }
            a = null
        },
        global: {},
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, q, r = p.hasData(a) && p._data(a);
            if (!r || !(m = r.events)) {
                return
            }
            b = p.trim(_(b || "")).split(" ");
            for (f = 0; f < b.length; f++) {
                g = W.exec(b[f]) || [],
                h = i = g[1],
                j = g[2];
                if (!h) {
                    for (h in m) {
                        p.event.remove(a, h + b[f], c, d, !0)
                    }
                    continue
                }
                n = p.event.special[h] || {},
                h = (d ? n.delegateType: n.bindType) || h,
                o = m[h] || [],
                k = o.length,
                j = j ? new RegExp("(^|\\.)" + j.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                for (l = 0; l < o.length; l++) {
                    q = o[l],
                    (e || i === q.origType) && (!c || c.guid === q.guid) && (!j || j.test(q.namespace)) && (!d || d === q.selector || d === "**" && q.selector) && (o.splice(l--, 1), q.selector && o.delegateCount--, n.remove && n.remove.call(a, q))
                }
                o.length === 0 && k !== o.length && ((!n.teardown || n.teardown.call(a, j, r.handle) === !1) && p.removeEvent(a, h, r.handle), delete m[h])
            }
            p.isEmptyObject(m) && (delete r.handle, p.removeData(a, "events", !0))
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(c, d, f, g) {
            if (!f || f.nodeType !== 3 && f.nodeType !== 8) {
                var h, i, j, k, l, m, n, o, q, r, s = c.type || c,
                t = [];
                if ($.test(s + p.event.triggered)) {
                    return
                }
                s.indexOf("!") >= 0 && (s = s.slice(0, -1), i = !0),
                s.indexOf(".") >= 0 && (t = s.split("."), s = t.shift(), t.sort());
                if ((!f || p.event.customEvent[s]) && !p.event.global[s]) {
                    return
                }
                c = typeof c == "object" ? c[p.expando] ? c: new p.Event(s, c) : new p.Event(s),
                c.type = s,
                c.isTrigger = !0,
                c.exclusive = i,
                c.namespace = t.join("."),
                c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + t.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                m = s.indexOf(":") < 0 ? "on" + s: "";
                if (!f) {
                    h = p.cache;
                    for (j in h) {
                        h[j].events && h[j].events[s] && p.event.trigger(c, d, h[j].handle.elem, !0)
                    }
                    return
                }
                c.result = b,
                c.target || (c.target = f),
                d = d != null ? p.makeArray(d) : [],
                d.unshift(c),
                n = p.event.special[s] || {};
                if (n.trigger && n.trigger.apply(f, d) === !1) {
                    return
                }
                q = [[f, n.bindType || s]];
                if (!g && !n.noBubble && !p.isWindow(f)) {
                    r = n.delegateType || s,
                    k = $.test(r + s) ? f: f.parentNode;
                    for (l = f; k; k = k.parentNode) {
                        q.push([k, r]),
                        l = k
                    }
                    l === (f.ownerDocument || e) && q.push([l.defaultView || l.parentWindow || a, r])
                }
                for (j = 0; j < q.length && !c.isPropagationStopped(); j++) {
                    k = q[j][0],
                    c.type = q[j][1],
                    o = (p._data(k, "events") || {})[c.type] && p._data(k, "handle"),
                    o && o.apply(k, d),
                    o = m && k[m],
                    o && p.acceptData(k) && o.apply(k, d) === !1 && c.preventDefault()
                }
                return c.type = s,
                !g && !c.isDefaultPrevented() && (!n._default || n._default.apply(f.ownerDocument, d) === !1) && (s !== "click" || !p.nodeName(f, "a")) && p.acceptData(f) && m && f[s] && (s !== "focus" && s !== "blur" || c.target.offsetWidth !== 0) && !p.isWindow(f) && (l = f[m], l && (f[m] = null), p.event.triggered = s, f[s](), p.event.triggered = b, l && (f[m] = l)),
                c.result
            }
            return
        },
        dispatch: function(c) {
            c = p.event.fix(c || a.event);
            var d, e, f, g, h, i, j, k, l, m, n, o = (p._data(this, "events") || {})[c.type] || [],
            q = o.delegateCount,
            r = [].slice.call(arguments),
            s = !c.exclusive && !c.namespace,
            t = p.event.special[c.type] || {},
            u = [];
            r[0] = c,
            c.delegateTarget = this;
            if (t.preDispatch && t.preDispatch.call(this, c) === !1) {
                return
            }
            if (q && (!c.button || c.type !== "click")) {
                g = p(this),
                g.context = this;
                for (f = c.target; f != this; f = f.parentNode || this) {
                    if (f.disabled !== !0 || c.type !== "click") {
                        i = {},
                        k = [],
                        g[0] = f;
                        for (d = 0; d < q; d++) {
                            l = o[d],
                            m = l.selector,
                            i[m] === b && (i[m] = g.is(m)),
                            i[m] && k.push(l)
                        }
                        k.length && u.push({
                            elem: f,
                            matches: k
                        })
                    }
                }
            }
            o.length > q && u.push({
                elem: this,
                matches: o.slice(q)
            });
            for (d = 0; d < u.length && !c.isPropagationStopped(); d++) {
                j = u[d],
                c.currentTarget = j.elem;
                for (e = 0; e < j.matches.length && !c.isImmediatePropagationStopped(); e++) {
                    l = j.matches[e];
                    if (s || !c.namespace && !l.namespace || c.namespace_re && c.namespace_re.test(l.namespace)) {
                        c.data = l.data,
                        c.handleObj = l,
                        h = ((p.event.special[l.origType] || {}).handle || l.handler).apply(j.elem, r),
                        h !== b && (c.result = h, h === !1 && (c.preventDefault(), c.stopPropagation()))
                    }
                }
            }
            return t.postDispatch && t.postDispatch.call(this, c),
            c.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return a.which == null && (a.which = b.charCode != null ? b.charCode: b.keyCode),
                a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, c) {
                var d, f, g, h = c.button,
                i = c.fromElement;
                return a.pageX == null && c.clientX != null && (d = a.target.ownerDocument || e, f = d.documentElement, g = d.body, a.pageX = c.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = c.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)),
                !a.relatedTarget && i && (a.relatedTarget = i === a.target ? c.toElement: i),
                !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0),
                a
            }
        },
        fix: function(a) {
            if (a[p.expando]) {
                return a
            }
            var b, c, d = a,
            f = p.event.fixHooks[a.type] || {},
            g = f.props ? this.props.concat(f.props) : this.props;
            a = p.Event(d);
            for (b = g.length; b;) {
                c = g[--b],
                a[c] = d[c]
            }
            return a.target || (a.target = d.srcElement || e),
            a.target.nodeType === 3 && (a.target = a.target.parentNode),
            a.metaKey = !!a.metaKey,
            f.filter ? f.filter(a, d) : a
        },
        special: {
            ready: {
                setup: p.bindReady
            },
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(a, b, c) {
                    p.isWindow(this) && (this.onbeforeunload = c)
                },
                teardown: function(a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = p.extend(new p.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? p.event.trigger(e, null, b) : p.event.dispatch.call(b, e),
            e.isDefaultPrevented() && c.preventDefault()
        }
    },
    p.event.handle = p.event.dispatch,
    p.removeEvent = e.removeEventListener ?
    function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    }: function(a, b, c) {
        var d = "on" + b;
        a.detachEvent && (typeof a[d] == "undefined" && (a[d] = null), a.detachEvent(d, c))
    },
    p.Event = function(a, b) {
        if (this instanceof p.Event) {
            a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? bb: ba) : this.type = a,
            b && p.extend(this, b),
            this.timeStamp = a && a.timeStamp || p.now(),
            this[p.expando] = !0
        } else {
            return new p.Event(a, b)
        }
    },
    p.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = bb;
            var a = this.originalEvent;
            if (!a) {
                return
            }
            a.preventDefault ? a.preventDefault() : a.returnValue = !1
        },
        stopPropagation: function() {
            this.isPropagationStopped = bb;
            var a = this.originalEvent;
            if (!a) {
                return
            }
            a.stopPropagation && a.stopPropagation(),
            a.cancelBubble = !0
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = bb,
            this.stopPropagation()
        },
        isDefaultPrevented: ba,
        isPropagationStopped: ba,
        isImmediatePropagationStopped: ba
    },
    p.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    },
    function(a, b) {
        p.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this,
                e = a.relatedTarget,
                f = a.handleObj,
                g = f.selector;
                if (!e || e !== d && !p.contains(d, e)) {
                    a.type = f.origType,
                    c = f.handler.apply(this, arguments),
                    a.type = b
                }
                return c
            }
        }
    }),
    p.support.submitBubbles || (p.event.special.submit = {
        setup: function() {
            if (p.nodeName(this, "form")) {
                return ! 1
            }
            p.event.add(this, "click._submit keypress._submit",
            function(a) {
                var c = a.target,
                d = p.nodeName(c, "input") || p.nodeName(c, "button") ? c.form: b;
                d && !p._data(d, "_submit_attached") && (p.event.add(d, "submit._submit",
                function(a) {
                    a._submit_bubble = !0
                }), p._data(d, "_submit_attached", !0))
            })
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && p.event.simulate("submit", this.parentNode, a, !0))
        },
        teardown: function() {
            if (p.nodeName(this, "form")) {
                return ! 1
            }
            p.event.remove(this, "._submit")
        }
    }),
    p.support.changeBubbles || (p.event.special.change = {
        setup: function() {
            if (V.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") {
                    p.event.add(this, "propertychange._change",
                    function(a) {
                        a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                    }),
                    p.event.add(this, "click._change",
                    function(a) {
                        this._just_changed && !a.isTrigger && (this._just_changed = !1),
                        p.event.simulate("change", this, a, !0)
                    })
                }
                return ! 1
            }
            p.event.add(this, "beforeactivate._change",
            function(a) {
                var b = a.target;
                V.test(b.nodeName) && !p._data(b, "_change_attached") && (p.event.add(b, "change._change",
                function(a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && p.event.simulate("change", this.parentNode, a, !0)
                }), p._data(b, "_change_attached", !0))
            })
        },
        handle: function(a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") {
                return a.handleObj.handler.apply(this, arguments)
            }
        },
        teardown: function() {
            return p.event.remove(this, "._change"),
            V.test(this.nodeName)
        }
    }),
    p.support.focusinBubbles || p.each({
        focus: "focusin",
        blur: "focusout"
    },
    function(a, b) {
        var c = 0,
        d = function(a) {
            p.event.simulate(b, a.target, p.event.fix(a), !0)
        };
        p.event.special[b] = {
            setup: function() {
                c++===0 && e.addEventListener(a, d, !0)
            },
            teardown: function() {--c === 0 && e.removeEventListener(a, d, !0)
            }
        }
    }),
    p.fn.extend({
        on: function(a, c, d, e, f) {
            var g, h;
            if (typeof a == "object") {
                typeof c != "string" && (d = d || c, c = b);
                for (h in a) {
                    this.on(h, c, d, a[h], f)
                }
                return this
            }
            d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
            if (e === !1) {
                e = ba
            } else {
                if (!e) {
                    return this
                }
            }
            return f === 1 && (g = e, e = function(a) {
                return p().off(a),
                g.apply(this, arguments)
            },
            e.guid = g.guid || (g.guid = p.guid++)),
            this.each(function() {
                p.event.add(this, a, e, d, c)
            })
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function(a, c, d) {
            var e, f;
            if (a && a.preventDefault && a.handleObj) {
                return e = a.handleObj,
                p(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace: e.origType, e.selector, e.handler),
                this
            }
            if (typeof a == "object") {
                for (f in a) {
                    this.off(f, c, a[f])
                }
                return this
            }
            if (c === !1 || typeof c == "function") {
                d = c,
                c = b
            }
            return d === !1 && (d = ba),
            this.each(function() {
                p.event.remove(this, a, d, c)
            })
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        live: function(a, b, c) {
            return p(this.context).on(a, this.selector, b, c),
            this
        },
        die: function(a, b) {
            return p(this.context).off(a, this.selector || "**", b),
            this
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return arguments.length == 1 ? this.off(a, "**") : this.off(b, a || "**", c)
        },
        trigger: function(a, b) {
            return this.each(function() {
                p.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            if (this[0]) {
                return p.event.trigger(a, b, this[0], !0)
            }
        },
        toggle: function(a) {
            var b = arguments,
            c = a.guid || p.guid++,
            d = 0,
            e = function(c) {
                var e = (p._data(this, "lastToggle" + a.guid) || 0) % d;
                return p._data(this, "lastToggle" + a.guid, e + 1),
                c.preventDefault(),
                b[e].apply(this, arguments) || !1
            };
            e.guid = c;
            while (d < b.length) {
                b[d++].guid = c
            }
            return this.click(e)
        },
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }),
    p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
    function(a, b) {
        p.fn[b] = function(a, c) {
            return c == null && (c = a, a = null),
            arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        },
        Y.test(b) && (p.event.fixHooks[b] = p.event.keyHooks),
        Z.test(b) && (p.event.fixHooks[b] = p.event.mouseHooks)
    }),
    function(a, b) {
        function bd(a, b, c, d) {
            var e = 0,
            f = b.length;
            for (; e < f; e++) {
                Z(a, b[e], c, d)
            }
        }
        function be(a, b, c, d, e, f) {
            var g, h = $.setFilters[b.toLowerCase()];
            return h || Z.error(b),
            (a || !(g = e)) && bd(a || "*", d, g = [], e),
            g.length > 0 ? h(g, c, f) : []
        }
        function bf(a, c, d, e, f) {
            var g, h, i, j, k, l, m, n, p = 0,
            q = f.length,
            s = L.POS,
            t = new RegExp("^" + s.source + "(?!" + r + ")", "i"),
            u = function() {
                var a = 1,
                c = arguments.length - 2;
                for (; a < c; a++) {
                    arguments[a] === b && (g[a] = b)
                }
            };
            for (; p < q; p++) {
                s.exec(""),
                a = f[p],
                j = [],
                i = 0,
                k = e;
                while (g = s.exec(a)) {
                    n = s.lastIndex = g.index + g[0].length;
                    if (n > i) {
                        m = a.slice(i, g.index),
                        i = n,
                        l = [c],
                        B.test(m) && (k && (l = k), k = e);
                        if (h = H.test(m)) {
                            m = m.slice(0, -5).replace(B, "$&*")
                        }
                        g.length > 1 && g[0].replace(t, u),
                        k = be(m, g[1], g[2], l, k, h)
                    }
                }
                k ? (j = j.concat(k), (m = a.slice(i)) && m !== ")" ? B.test(m) ? bd(m, j, d, e) : Z(m, c, d, e ? e.concat(k) : k) : o.apply(d, j)) : Z(a, c, d, e)
            }
            return q === 1 ? d: Z.uniqueSort(d)
        }
        function bg(a, b, c) {
            var d, e, f, g = [],
            i = 0,
            j = D.exec(a),
            k = !j.pop() && !j.pop(),
            l = k && a.match(C) || [""],
            m = $.preFilter,
            n = $.filter,
            o = !c && b !== h;
            for (; (e = l[i]) != null && k; i++) {
                g.push(d = []),
                o && (e = " " + e);
                while (e) {
                    k = !1;
                    if (j = B.exec(e)) {
                        e = e.slice(j[0].length),
                        k = d.push({
                            part: j.pop().replace(A, " "),
                            captures: j
                        })
                    }
                    for (f in n) { (j = L[f].exec(e)) && (!m[f] || (j = m[f](j, b, c))) && (e = e.slice(j.shift().length), k = d.push({
                            part: f,
                            captures: j
                        }))
                    }
                    if (!k) {
                        break
                    }
                }
            }
            return k || Z.error(a),
            g
        }
        function bh(a, b, e) {
            var f = b.dir,
            g = m++;
            return a || (a = function(a) {
                return a === e
            }),
            b.first ?
            function(b, c) {
                while (b = b[f]) {
                    if (b.nodeType === 1) {
                        return a(b, c) && b
                    }
                }
            }: function(b, e) {
                var h, i = g + "." + d,
                j = i + "." + c;
                while (b = b[f]) {
                    if (b.nodeType === 1) {
                        if ((h = b[q]) === j) {
                            return b.sizset
                        }
                        if (typeof h == "string" && h.indexOf(i) === 0) {
                            if (b.sizset) {
                                return b
                            }
                        } else {
                            b[q] = j;
                            if (a(b, e)) {
                                return b.sizset = !0,
                                b
                            }
                            b.sizset = !1
                        }
                    }
                }
            }
        }
        function bi(a, b) {
            return a ?
            function(c, d) {
                var e = b(c, d);
                return e && a(e === !0 ? c: e, d)
            }: b
        }
        function bj(a, b, c) {
            var d, e, f = 0;
            for (; d = a[f]; f++) {
                $.relative[d.part] ? e = bh(e, $.relative[d.part], b) : (d.captures.push(b, c), e = bi(e, $.filter[d.part].apply(null, d.captures)))
            }
            return e
        }
        function bk(a) {
            return function(b, c) {
                var d, e = 0;
                for (; d = a[e]; e++) {
                    if (d(b, c)) {
                        return ! 0
                    }
                }
                return ! 1
            }
        }
        var c, d, e, f, g, h = a.document,
        i = h.documentElement,
        j = "undefined",
        k = !1,
        l = !0,
        m = 0,
        n = [].slice,
        o = [].push,
        q = ("sizcache" + Math.random()).replace(".", ""),
        r = "[\\x20\\t\\r\\n\\f]",
        s = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
        t = s.replace("w", "w#"),
        u = "([*^$|!~]?=)",
        v = "\\[" + r + "*(" + s + ")" + r + "*(?:" + u + r + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + t + ")|)|)" + r + "*\\]",
        w = ":(" + s + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)",
        x = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",
        y = r + "*([\\x20\\t\\r\\n\\f>+~])" + r + "*",
        z = "(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|" + v + "|" + w.replace(2, 7) + "|[^\\\\(),])+",
        A = new RegExp("^" + r + "+|((?:^|[^\\\\])(?:\\\\.)*)" + r + "+$", "g"),
        B = new RegExp("^" + y),
        C = new RegExp(z + "?(?=" + r + "*,|$)", "g"),
        D = new RegExp("^(?:(?!,)(?:(?:^|,)" + r + "*" + z + ")*?|" + r + "*(.*?))(\\)|$)"),
        E = new RegExp(z.slice(19, -6) + "\\x20\\t\\r\\n\\f>+~])+|" + y, "g"),
        F = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
        G = /[\x20\t\r\n\f]*[+~]/,
        H = /:not\($/,
        I = /h\d/i,
        J = /input|select|textarea|button/i,
        K = /\\(?!\\)/g,
        L = {
            ID: new RegExp("^#(" + s + ")"),
            CLASS: new RegExp("^\\.(" + s + ")"),
            NAME: new RegExp("^\\[name=['\"]?(" + s + ")['\"]?\\]"),
            TAG: new RegExp("^(" + s.replace("[-", "[-\\*") + ")"),
            ATTR: new RegExp("^" + v),
            PSEUDO: new RegExp("^" + w),
            CHILD: new RegExp("^:(only|nth|last|first)-child(?:\\(" + r + "*(even|odd|(([+-]|)(\\d*)n|)" + r + "*(?:([+-]|)" + r + "*(\\d+)|))" + r + "*\\)|)", "i"),
            POS: new RegExp(x, "ig"),
            needsContext: new RegExp("^" + r + "*[>+~]|" + x, "i")
        },
        M = {},
        N = [],
        O = {},
        P = [],
        Q = function(a) {
            return a.sizzleFilter = !0,
            a
        },
        R = function(a) {
            return function(b) {
                return b.nodeName.toLowerCase() === "input" && b.type === a
            }
        },
        S = function(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return (c === "input" || c === "button") && b.type === a
            }
        },
        T = function(a) {
            var b = !1,
            c = h.createElement("div");
            try {
                b = a(c)
            } catch(d) {}
            return c = null,
            b
        },
        U = T(function(a) {
            a.innerHTML = "<select></select>";
            var b = typeof a.lastChild.getAttribute("multiple");
            return b !== "boolean" && b !== "string"
        }),
        V = T(function(a) {
            a.id = q + 0,
            a.innerHTML = "<a name='" + q + "'></a><div name='" + q + "'></div>",
            i.insertBefore(a, i.firstChild);
            var b = h.getElementsByName && h.getElementsByName(q).length === 2 + h.getElementsByName(q + 0).length;
            return g = !h.getElementById(q),
            i.removeChild(a),
            b
        }),
        W = T(function(a) {
            return a.appendChild(h.createComment("")),
            a.getElementsByTagName("*").length === 0
        }),
        X = T(function(a) {
            return a.innerHTML = "<a href='#'></a>",
            a.firstChild && typeof a.firstChild.getAttribute !== j && a.firstChild.getAttribute("href") === "#"
        }),
        Y = T(function(a) {
            return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>",
            !a.getElementsByClassName || a.getElementsByClassName("e").length === 0 ? !1 : (a.lastChild.className = "e", a.getElementsByClassName("e").length !== 1)
        }),
        Z = function(a, b, c, d) {
            c = c || [],
            b = b || h;
            var e, f, g, i, j = b.nodeType;
            if (j !== 1 && j !== 9) {
                return []
            }
            if (!a || typeof a != "string") {
                return c
            }
            g = ba(b);
            if (!g && !d) {
                if (e = F.exec(a)) {
                    if (i = e[1]) {
                        if (j === 9) {
                            f = b.getElementById(i);
                            if (!f || !f.parentNode) {
                                return c
                            }
                            if (f.id === i) {
                                return c.push(f),
                                c
                            }
                        } else {
                            if (b.ownerDocument && (f = b.ownerDocument.getElementById(i)) && bb(b, f) && f.id === i) {
                                return c.push(f),
                                c
                            }
                        }
                    } else {
                        if (e[2]) {
                            return o.apply(c, n.call(b.getElementsByTagName(a), 0)),
                            c
                        }
                        if ((i = e[3]) && Y && b.getElementsByClassName) {
                            return o.apply(c, n.call(b.getElementsByClassName(i), 0)),
                            c
                        }
                    }
                }
            }
            return bm(a, b, c, d, g)
        },
        $ = Z.selectors = {
            cacheLength: 50,
            match: L,
            order: ["ID", "TAG"],
            attrHandle: {},
            createPseudo: Q,
            find: {
                ID: g ?
                function(a, b, c) {
                    if (typeof b.getElementById !== j && !c) {
                        var d = b.getElementById(a);
                        return d && d.parentNode ? [d] : []
                    }
                }: function(a, c, d) {
                    if (typeof c.getElementById !== j && !d) {
                        var e = c.getElementById(a);
                        return e ? e.id === a || typeof e.getAttributeNode !== j && e.getAttributeNode("id").value === a ? [e] : b: []
                    }
                },
                TAG: W ?
                function(a, b) {
                    if (typeof b.getElementsByTagName !== j) {
                        return b.getElementsByTagName(a)
                    }
                }: function(a, b) {
                    var c = b.getElementsByTagName(a);
                    if (a === "*") {
                        var d, e = [],
                        f = 0;
                        for (; d = c[f]; f++) {
                            d.nodeType === 1 && e.push(d)
                        }
                        return e
                    }
                    return c
                }
            },
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(K, ""),
                    a[3] = (a[4] || a[5] || "").replace(K, ""),
                    a[2] === "~=" && (a[3] = " " + a[3] + " "),
                    a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(),
                    a[1] === "nth" ? (a[2] || Z.error(a[0]), a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * (a[2] === "even" || a[2] === "odd")), a[4] = +(a[6] + a[7] || a[2] === "odd")) : a[2] && Z.error(a[0]),
                    a
                },
                PSEUDO: function(a) {
                    var b, c = a[4];
                    return L.CHILD.test(a[0]) ? null: (c && (b = D.exec(c)) && b.pop() && (a[0] = a[0].slice(0, b[0].length - c.length - 1), c = b[0].slice(0, -1)), a.splice(2, 3, c || a[3]), a)
                }
            },
            filter: {
                ID: g ?
                function(a) {
                    return a = a.replace(K, ""),
                    function(b) {
                        return b.getAttribute("id") === a
                    }
                }: function(a) {
                    return a = a.replace(K, ""),
                    function(b) {
                        var c = typeof b.getAttributeNode !== j && b.getAttributeNode("id");
                        return c && c.value === a
                    }
                },
                TAG: function(a) {
                    return a === "*" ?
                    function() {
                        return ! 0
                    }: (a = a.replace(K, "").toLowerCase(),
                    function(b) {
                        return b.nodeName && b.nodeName.toLowerCase() === a
                    })
                },
                CLASS: function(a) {
                    var b = M[a];
                    return b || (b = M[a] = new RegExp("(^|" + r + ")" + a + "(" + r + "|$)"), N.push(a), N.length > $.cacheLength && delete M[N.shift()]),
                    function(a) {
                        return b.test(a.className || typeof a.getAttribute !== j && a.getAttribute("class") || "")
                    }
                },
                ATTR: function(a, b, c) {
                    return b ?
                    function(d) {
                        var e = Z.attr(d, a),
                        f = e + "";
                        if (e == null) {
                            return b === "!="
                        }
                        switch (b) {
                        case "=":
                            return f === c;
                        case "!=":
                            return f !== c;
                        case "^=":
                            return c && f.indexOf(c) === 0;
                        case "*=":
                            return c && f.indexOf(c) > -1;
                        case "$=":
                            return c && f.substr(f.length - c.length) === c;
                        case "~=":
                            return (" " + f + " ").indexOf(c) > -1;
                        case "|=":
                            return f === c || f.substr(0, c.length + 1) === c + "-"
                        }
                    }: function(b) {
                        return Z.attr(b, a) != null
                    }
                },
                CHILD: function(a, b, c, d) {
                    if (a === "nth") {
                        var e = m++;
                        return function(a) {
                            var b, f, g = 0,
                            h = a;
                            if (c === 1 && d === 0) {
                                return ! 0
                            }
                            b = a.parentNode;
                            if (b && (b[q] !== e || !a.sizset)) {
                                for (h = b.firstChild; h; h = h.nextSibling) {
                                    if (h.nodeType === 1) {
                                        h.sizset = ++g;
                                        if (h === a) {
                                            break
                                        }
                                    }
                                }
                                b[q] = e
                            }
                            return f = a.sizset - d,
                            c === 0 ? f === 0 : f % c === 0 && f / c >= 0
                        }
                    }
                    return function(b) {
                        var c = b;
                        switch (a) {
                        case "only":
                        case "first":
                            while (c = c.previousSibling) {
                                if (c.nodeType === 1) {
                                    return ! 1
                                }
                            }
                            if (a === "first") {
                                return ! 0
                            }
                            c = b;
                        case "last":
                            while (c = c.nextSibling) {
                                if (c.nodeType === 1) {
                                    return ! 1
                                }
                            }
                            return ! 0
                        }
                    }
                },
                PSEUDO: function(a, b, c, d) {
                    var e = $.pseudos[a] || $.pseudos[a.toLowerCase()];
                    return e || Z.error("unsupported pseudo: " + a),
                    e.sizzleFilter ? e(b, c, d) : e
                }
            },
            pseudos: {
                not: Q(function(a, b, c) {
                    var d = bl(a.replace(A, "$1"), b, c);
                    return function(a) {
                        return ! d(a)
                    }
                }),
                enabled: function(a) {
                    return a.disabled === !1
                },
                disabled: function(a) {
                    return a.disabled === !0
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return b === "input" && !!a.checked || b === "option" && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex,
                    a.selected === !0
                },
                parent: function(a) {
                    return ! $.pseudos.empty(a)
                },
                empty: function(a) {
                    var b;
                    a = a.firstChild;
                    while (a) {
                        if (a.nodeName > "@" || (b = a.nodeType) === 3 || b === 4) {
                            return ! 1
                        }
                        a = a.nextSibling
                    }
                    return ! 0
                },
                contains: Q(function(a) {
                    return function(b) {
                        return (b.textContent || b.innerText || bc(b)).indexOf(a) > -1
                    }
                }),
                has: Q(function(a) {
                    return function(b) {
                        return Z(a, b).length > 0
                    }
                }),
                header: function(a) {
                    return I.test(a.nodeName)
                },
                text: function(a) {
                    var b, c;
                    return a.nodeName.toLowerCase() === "input" && (b = a.type) === "text" && ((c = a.getAttribute("type")) == null || c.toLowerCase() === b)
                },
                radio: R("radio"),
                checkbox: R("checkbox"),
                file: R("file"),
                password: R("password"),
                image: R("image"),
                submit: S("submit"),
                reset: S("reset"),
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return b === "input" && a.type === "button" || b === "button"
                },
                input: function(a) {
                    return J.test(a.nodeName)
                },
                focus: function(a) {
                    var b = a.ownerDocument;
                    return a === b.activeElement && (!b.hasFocus || b.hasFocus()) && ( !! a.type || !!a.href)
                },
                active: function(a) {
                    return a === a.ownerDocument.activeElement
                }
            },
            setFilters: {
                first: function(a, b, c) {
                    return c ? a.slice(1) : [a[0]]
                },
                last: function(a, b, c) {
                    var d = a.pop();
                    return c ? a: [d]
                },
                even: function(a, b, c) {
                    var d = [],
                    e = c ? 1 : 0,
                    f = a.length;
                    for (; e < f; e = e + 2) {
                        d.push(a[e])
                    }
                    return d
                },
                odd: function(a, b, c) {
                    var d = [],
                    e = c ? 0 : 1,
                    f = a.length;
                    for (; e < f; e = e + 2) {
                        d.push(a[e])
                    }
                    return d
                },
                lt: function(a, b, c) {
                    return c ? a.slice( + b) : a.slice(0, +b)
                },
                gt: function(a, b, c) {
                    return c ? a.slice(0, +b + 1) : a.slice( + b + 1)
                },
                eq: function(a, b, c) {
                    var d = a.splice( + b, 1);
                    return c ? a: d
                }
            }
        };
        $.setFilters.nth = $.setFilters.eq,
        $.filters = $.pseudos,
        X || ($.attrHandle = {
            href: function(a) {
                return a.getAttribute("href", 2)
            },
            type: function(a) {
                return a.getAttribute("type")
            }
        }),
        V && ($.order.push("NAME"), $.find.NAME = function(a, b) {
            if (typeof b.getElementsByName !== j) {
                return b.getElementsByName(a)
            }
        }),
        Y && ($.order.splice(1, 0, "CLASS"), $.find.CLASS = function(a, b, c) {
            if (typeof b.getElementsByClassName !== j && !c) {
                return b.getElementsByClassName(a)
            }
        });
        try {
            n.call(i.childNodes, 0)[0].nodeType
        } catch(_) {
            n = function(a) {
                var b, c = [];
                for (; b = this[a]; a++) {
                    c.push(b)
                }
                return c
            }
        }
        var ba = Z.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? b.nodeName !== "HTML": !1
        },
        bb = Z.contains = i.compareDocumentPosition ?
        function(a, b) {
            return !! (a.compareDocumentPosition(b) & 16)
        }: i.contains ?
        function(a, b) {
            var c = a.nodeType === 9 ? a.documentElement: a,
            d = b.parentNode;
            return a === d || !!(d && d.nodeType === 1 && c.contains && c.contains(d))
        }: function(a, b) {
            while (b = b.parentNode) {
                if (b === a) {
                    return ! 0
                }
            }
            return ! 1
        },
        bc = Z.getText = function(a) {
            var b, c = "",
            d = 0,
            e = a.nodeType;
            if (e) {
                if (e === 1 || e === 9 || e === 11) {
                    if (typeof a.textContent == "string") {
                        return a.textContent
                    }
                    for (a = a.firstChild; a; a = a.nextSibling) {
                        c += bc(a)
                    }
                } else {
                    if (e === 3 || e === 4) {
                        return a.nodeValue
                    }
                }
            } else {
                for (; b = a[d]; d++) {
                    c += bc(b)
                }
            }
            return c
        };
        Z.attr = function(a, b) {
            var c, d = ba(a);
            return d || (b = b.toLowerCase()),
            $.attrHandle[b] ? $.attrHandle[b](a) : U || d ? a.getAttribute(b) : (c = a.getAttributeNode(b), c ? typeof a[b] == "boolean" ? a[b] ? b: null: c.specified ? c.value: null: null)
        },
        Z.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        },
        [0, 0].sort(function() {
            return l = 0
        }),
        i.compareDocumentPosition ? e = function(a, b) {
            return a === b ? (k = !0, 0) : (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition: a.compareDocumentPosition(b) & 4) ? -1 : 1
        }: (e = function(a, b) {
            if (a === b) {
                return k = !0,
                0
            }
            if (a.sourceIndex && b.sourceIndex) {
                return a.sourceIndex - b.sourceIndex
            }
            var c, d, e = [],
            g = [],
            h = a.parentNode,
            i = b.parentNode,
            j = h;
            if (h === i) {
                return f(a, b)
            }
            if (!h) {
                return - 1
            }
            if (!i) {
                return 1
            }
            while (j) {
                e.unshift(j),
                j = j.parentNode
            }
            j = i;
            while (j) {
                g.unshift(j),
                j = j.parentNode
            }
            c = e.length,
            d = g.length;
            for (var l = 0; l < c && l < d; l++) {
                if (e[l] !== g[l]) {
                    return f(e[l], g[l])
                }
            }
            return l === c ? f(a, g[l], -1) : f(e[l], b, 1)
        },
        f = function(a, b, c) {
            if (a === b) {
                return c
            }
            var d = a.nextSibling;
            while (d) {
                if (d === b) {
                    return - 1
                }
                d = d.nextSibling
            }
            return 1
        }),
        Z.uniqueSort = function(a) {
            var b, c = 1;
            if (e) {
                k = l,
                a.sort(e);
                if (k) {
                    for (; b = a[c]; c++) {
                        b === a[c - 1] && a.splice(c--, 1)
                    }
                }
            }
            return a
        };
        var bl = Z.compile = function(a, b, c) {
            var d, e, f, g = O[a];
            if (g && g.context === b) {
                return g
            }
            e = bg(a, b, c);
            for (f = 0; d = e[f]; f++) {
                e[f] = bj(d, b, c)
            }
            return g = O[a] = bk(e),
            g.context = b,
            g.runs = g.dirruns = 0,
            P.push(a),
            P.length > $.cacheLength && delete O[P.shift()],
            g
        };
        Z.matches = function(a, b) {
            return Z(a, null, null, b)
        },
        Z.matchesSelector = function(a, b) {
            return Z(b, null, null, [a]).length > 0
        };
        var bm = function(a, b, e, f, g) {
            a = a.replace(A, "$1");
            var h, i, j, k, l, m, p, q, r, s = a.match(C),
            t = a.match(E),
            u = b.nodeType;
            if (L.POS.test(a)) {
                return bf(a, b, e, f, s)
            }
            if (f) {
                h = n.call(f, 0)
            } else {
                if (s && s.length === 1) {
                    if (t.length > 1 && u === 9 && !g && (s = L.ID.exec(t[0]))) {
                        b = $.find.ID(s[1], b, g)[0];
                        if (!b) {
                            return e
                        }
                        a = a.slice(t.shift().length)
                    }
                    q = (s = G.exec(t[0])) && !s.index && b.parentNode || b,
                    r = t.pop(),
                    m = r.split(":not")[0];
                    for (j = 0, k = $.order.length; j < k; j++) {
                        p = $.order[j];
                        if (s = L[p].exec(m)) {
                            h = $.find[p]((s[1] || "").replace(K, ""), q, g);
                            if (h == null) {
                                continue
                            }
                            m === r && (a = a.slice(0, a.length - r.length) + m.replace(L[p], ""), a || o.apply(e, n.call(h, 0)));
                            break
                        }
                    }
                }
            }
            if (a) {
                i = bl(a, b, g),
                d = i.dirruns++,
                h == null && (h = $.find.TAG("*", G.test(a) && b.parentNode || b));
                for (j = 0; l = h[j]; j++) {
                    c = i.runs++,
                    i(l, b) && e.push(l)
                }
            }
            return e
        };
        h.querySelectorAll &&
        function() {
            var a, b = bm,
            c = /'|\\/g,
            d = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
            e = [],
            f = [":active"],
            g = i.matchesSelector || i.mozMatchesSelector || i.webkitMatchesSelector || i.oMatchesSelector || i.msMatchesSelector;
            T(function(a) {
                a.innerHTML = "<select><option selected></option></select>",
                a.querySelectorAll("[selected]").length || e.push("\\[" + r + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),
                a.querySelectorAll(":checked").length || e.push(":checked")
            }),
            T(function(a) {
                a.innerHTML = "<p test=''></p>",
                a.querySelectorAll("[test^='']").length && e.push("[*^$]=" + r + "*(?:\"\"|'')"),
                a.innerHTML = "<input type='hidden'>",
                a.querySelectorAll(":enabled").length || e.push(":enabled", ":disabled")
            }),
            e = e.length && new RegExp(e.join("|")),
            bm = function(a, d, f, g, h) {
                if (!g && !h && (!e || !e.test(a))) {
                    if (d.nodeType === 9) {
                        try {
                            return o.apply(f, n.call(d.querySelectorAll(a), 0)),
                            f
                        } catch(i) {}
                    } else {
                        if (d.nodeType === 1 && d.nodeName.toLowerCase() !== "object") {
                            var j = d.getAttribute("id"),
                            k = j || q,
                            l = G.test(a) && d.parentNode || d;
                            j ? k = k.replace(c, "\\$&") : d.setAttribute("id", k);
                            try {
                                return o.apply(f, n.call(l.querySelectorAll(a.replace(C, "[id='" + k + "'] $&")), 0)),
                                f
                            } catch(i) {} finally {
                                j || d.removeAttribute("id")
                            }
                        }
                    }
                }
                return b(a, d, f, g, h)
            },
            g && (T(function(b) {
                a = g.call(b, "div");
                try {
                    g.call(b, "[test!='']:sizzle"),
                    f.push($.match.PSEUDO)
                } catch(c) {}
            }), f = new RegExp(f.join("|")), Z.matchesSelector = function(b, c) {
                c = c.replace(d, "='$1']");
                if (!ba(b) && !f.test(c) && (!e || !e.test(c))) {
                    try {
                        var h = g.call(b, c);
                        if (h || a || b.document && b.document.nodeType !== 11) {
                            return h
                        }
                    } catch(i) {}
                }
                return Z(c, null, null, [b]).length > 0
            })
        } (),
        Z.attr = p.attr,
        p.find = Z,
        p.expr = Z.selectors,
        p.expr[":"] = p.expr.pseudos,
        p.unique = Z.uniqueSort,
        p.text = Z.getText,
        p.isXMLDoc = Z.isXML,
        p.contains = Z.contains
    } (a);
    var bc = /Until$/,
    bd = /^(?:parents|prev(?:Until|All))/,
    be = /^.[^:#\[\.,]*$/,
    bf = p.expr.match.needsContext,
    bg = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    p.fn.extend({
        find: function(a) {
            var b, c, d, e, f, g, h = this;
            if (typeof a != "string") {
                return p(a).filter(function() {
                    for (b = 0, c = h.length; b < c; b++) {
                        if (p.contains(h[b], this)) {
                            return ! 0
                        }
                    }
                })
            }
            g = this.pushStack("", "find", a);
            for (b = 0, c = this.length; b < c; b++) {
                d = g.length,
                p.find(a, this[b], g);
                if (b > 0) {
                    for (e = d; e < g.length; e++) {
                        for (f = 0; f < d; f++) {
                            if (g[f] === g[e]) {
                                g.splice(e--, 1);
                                break
                            }
                        }
                    }
                }
            }
            return g
        },
        has: function(a) {
            var b, c = p(a, this),
            d = c.length;
            return this.filter(function() {
                for (b = 0; b < d; b++) {
                    if (p.contains(this, c[b])) {
                        return ! 0
                    }
                }
            })
        },
        not: function(a) {
            return this.pushStack(bj(this, a, !1), "not", a)
        },
        filter: function(a) {
            return this.pushStack(bj(this, a, !0), "filter", a)
        },
        is: function(a) {
            return !! a && (typeof a == "string" ? bf.test(a) ? p(a, this.context).index(this[0]) >= 0 : p.filter(a, this).length > 0 : this.filter(a).length > 0)
        },
        closest: function(a, b) {
            var c, d = 0,
            e = this.length,
            f = [],
            g = bf.test(a) || typeof a != "string" ? p(a, b || this.context) : 0;
            for (; d < e; d++) {
                c = this[d];
                while (c && c.ownerDocument && c !== b && c.nodeType !== 11) {
                    if (g ? g.index(c) > -1 : p.find.matchesSelector(c, a)) {
                        f.push(c);
                        break
                    }
                    c = c.parentNode
                }
            }
            return f = f.length > 1 ? p.unique(f) : f,
            this.pushStack(f, "closest", a)
        },
        index: function(a) {
            return a ? typeof a == "string" ? p.inArray(this[0], p(a)) : p.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length: -1
        },
        add: function(a, b) {
            var c = typeof a == "string" ? p(a, b) : p.makeArray(a && a.nodeType ? [a] : a),
            d = p.merge(this.get(), c);
            return this.pushStack(bh(c[0]) || bh(d[0]) ? d: p.unique(d))
        },
        addBack: function(a) {
            return this.add(a == null ? this.prevObject: this.prevObject.filter(a))
        }
    }),
    p.fn.andSelf = p.fn.addBack,
    p.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b: null
        },
        parents: function(a) {
            return p.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return p.dir(a, "parentNode", c)
        },
        next: function(a) {
            return bi(a, "nextSibling")
        },
        prev: function(a) {
            return bi(a, "previousSibling")
        },
        nextAll: function(a) {
            return p.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return p.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return p.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return p.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return p.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return p.sibling(a.firstChild)
        },
        contents: function(a) {
            return p.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document: p.merge([], a.childNodes)
        }
    },
    function(a, b) {
        p.fn[a] = function(c, d) {
            var e = p.map(this, b, c);
            return bc.test(a) || (d = c),
            d && typeof d == "string" && (e = p.filter(d, e)),
            e = this.length > 1 && !bg[a] ? p.unique(e) : e,
            this.length > 1 && bd.test(a) && (e = e.reverse()),
            this.pushStack(e, a, k.call(arguments).join(","))
        }
    }),
    p.extend({
        filter: function(a, b, c) {
            return c && (a = ":not(" + a + ")"),
            b.length === 1 ? p.find.matchesSelector(b[0], a) ? [b[0]] : [] : p.find.matches(a, b)
        },
        dir: function(a, c, d) {
            var e = [],
            f = a[c];
            while (f && f.nodeType !== 9 && (d === b || f.nodeType !== 1 || !p(f).is(d))) {
                f.nodeType === 1 && e.push(f),
                f = f[c]
            }
            return e
        },
        sibling: function(a, b) {
            var c = [];
            for (; a; a = a.nextSibling) {
                a.nodeType === 1 && a !== b && c.push(a)
            }
            return c
        }
    });
    var bl = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    bm = / jQuery\d+="(?:null|\d+)"/g,
    bn = /^\s+/,
    bo = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    bp = /<([\w:]+)/,
    bq = /<tbody/i,
    br = /<|&#?\w+;/,
    bs = /<(?:script|style|link)/i,
    bt = /<(?:script|object|embed|option|style)/i,
    bu = new RegExp("<(?:" + bl + ")[\\s/>]", "i"),
    bv = /^(?:checkbox|radio)$/,
    bw = /checked\s*(?:[^=]|=\s*.checked.)/i,
    bx = /\/(java|ecma)script/i,
    by = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
    bz = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    },
    bA = bk(e),
    bB = bA.appendChild(e.createElement("div"));
    bz.optgroup = bz.option,
    bz.tbody = bz.tfoot = bz.colgroup = bz.caption = bz.thead,
    bz.th = bz.td,
    p.support.htmlSerialize || (bz._default = [1, "X<div>", "</div>"]),
    p.fn.extend({
        text: function(a) {
            return p.access(this,
            function(a) {
                return a === b ? p.text(this) : this.empty().append((this[0] && this[0].ownerDocument || e).createTextNode(a))
            },
            null, a, arguments.length)
        },
        wrapAll: function(a) {
            if (p.isFunction(a)) {
                return this.each(function(b) {
                    p(this).wrapAll(a.call(this, b))
                })
            }
            if (this[0]) {
                var b = p(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]),
                b.map(function() {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1) {
                        a = a.firstChild
                    }
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return p.isFunction(a) ? this.each(function(b) {
                p(this).wrapInner(a.call(this, b))
            }) : this.each(function() {
                var b = p(this),
                c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = p.isFunction(a);
            return this.each(function(c) {
                p(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                p.nodeName(this, "body") || p(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0,
            function(a) { (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0,
            function(a) { (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(a, this.firstChild)
            })
        },
        before: function() {
            if (!bh(this[0])) {
                return this.domManip(arguments, !1,
                function(a) {
                    this.parentNode.insertBefore(a, this)
                })
            }
            if (arguments.length) {
                var a = p.clean(arguments);
                return this.pushStack(p.merge(a, this), "before", this.selector)
            }
        },
        after: function() {
            if (!bh(this[0])) {
                return this.domManip(arguments, !1,
                function(a) {
                    this.parentNode.insertBefore(a, this.nextSibling)
                })
            }
            if (arguments.length) {
                var a = p.clean(arguments);
                return this.pushStack(p.merge(this, a), "after", this.selector)
            }
        },
        remove: function(a, b) {
            var c, d = 0;
            for (; (c = this[d]) != null; d++) {
                if (!a || p.filter(a, [c]).length) { ! b && c.nodeType === 1 && (p.cleanData(c.getElementsByTagName("*")), p.cleanData([c])),
                    c.parentNode && c.parentNode.removeChild(c)
                }
            }
            return this
        },
        empty: function() {
            var a, b = 0;
            for (; (a = this[b]) != null; b++) {
                a.nodeType === 1 && p.cleanData(a.getElementsByTagName("*"));
                while (a.firstChild) {
                    a.removeChild(a.firstChild)
                }
            }
            return this
        },
        clone: function(a, b) {
            return a = a == null ? !1 : a,
            b = b == null ? a: b,
            this.map(function() {
                return p.clone(this, a, b)
            })
        },
        html: function(a) {
            return p.access(this,
            function(a) {
                var c = this[0] || {},
                d = 0,
                e = this.length;
                if (a === b) {
                    return c.nodeType === 1 ? c.innerHTML.replace(bm, "") : b
                }
                if (typeof a == "string" && !bs.test(a) && (p.support.htmlSerialize || !bu.test(a)) && (p.support.leadingWhitespace || !bn.test(a)) && !bz[(bp.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(bo, "<$1></$2>");
                    try {
                        for (; d < e; d++) {
                            c = this[d] || {},
                            c.nodeType === 1 && (p.cleanData(c.getElementsByTagName("*")), c.innerHTML = a)
                        }
                        c = 0
                    } catch(f) {}
                }
                c && this.empty().append(a)
            },
            null, a, arguments.length)
        },
        replaceWith: function(a) {
            return bh(this[0]) ? this.length ? this.pushStack(p(p.isFunction(a) ? a() : a), "replaceWith", a) : this: p.isFunction(a) ? this.each(function(b) {
                var c = p(this),
                d = c.html();
                c.replaceWith(a.call(this, b, d))
            }) : (typeof a != "string" && (a = p(a).detach()), this.each(function() {
                var b = this.nextSibling,
                c = this.parentNode;
                p(this).remove(),
                b ? p(b).before(a) : p(c).append(a)
            }))
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, c, d) {
            a = [].concat.apply([], a);
            var e, f, g, h, i = 0,
            j = a[0],
            k = [],
            l = this.length;
            if (!p.support.checkClone && l > 1 && typeof j == "string" && bw.test(j)) {
                return this.each(function() {
                    p(this).domManip(a, c, d)
                })
            }
            if (p.isFunction(j)) {
                return this.each(function(e) {
                    var f = p(this);
                    a[0] = j.call(this, e, c ? f.html() : b),
                    f.domManip(a, c, d)
                })
            }
            if (this[0]) {
                e = p.buildFragment(a, this, k),
                g = e.fragment,
                f = g.firstChild,
                g.childNodes.length === 1 && (g = f);
                if (f) {
                    c = c && p.nodeName(f, "tr");
                    for (h = e.cacheable || l - 1; i < l; i++) {
                        d.call(c && p.nodeName(this[i], "table") ? bC(this[i], "tbody") : this[i], i === h ? g: p.clone(g, !0, !0))
                    }
                }
                g = f = null,
                k.length && p.each(k,
                function(a, b) {
                    b.src ? p.ajax ? p.ajax({
                        url: b.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : p.error("no ajax") : p.globalEval((b.text || b.textContent || b.innerHTML || "").replace(by, "")),
                    b.parentNode && b.parentNode.removeChild(b)
                })
            }
            return this
        }
    }),
    p.buildFragment = function(a, c, d) {
        var f, g, h, i = a[0];
        return c = c || e,
        c = (c[0] || c).ownerDocument || c[0] || c,
        typeof c.createDocumentFragment == "undefined" && (c = e),
        a.length === 1 && typeof i == "string" && i.length < 512 && c === e && i.charAt(0) === "<" && !bt.test(i) && (p.support.checkClone || !bw.test(i)) && (p.support.html5Clone || !bu.test(i)) && (g = !0, f = p.fragments[i], h = f !== b),
        f || (f = c.createDocumentFragment(), p.clean(a, c, f, d), g && (p.fragments[i] = h && f)),
        {
            fragment: f,
            cacheable: g
        }
    },
    p.fragments = {},
    p.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    },
    function(a, b) {
        p.fn[a] = function(c) {
            var d, e = 0,
            f = [],
            g = p(c),
            h = g.length,
            i = this.length === 1 && this[0].parentNode;
            if ((i == null || i && i.nodeType === 11 && i.childNodes.length === 1) && h === 1) {
                return g[b](this[0]),
                this
            }
            for (; e < h; e++) {
                d = (e > 0 ? this.clone(!0) : this).get(),
                p(g[e])[b](d),
                f = f.concat(d)
            }
            return this.pushStack(f, a, g.selector)
        }
    }),
    p.extend({
        clone: function(a, b, c) {
            var d, e, f, g;
            p.support.html5Clone || p.isXMLDoc(a) || !bu.test("<" + a.nodeName + ">") ? g = a.cloneNode(!0) : (bB.innerHTML = a.outerHTML, bB.removeChild(g = bB.firstChild));
            if ((!p.support.noCloneEvent || !p.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !p.isXMLDoc(a)) {
                bE(a, g),
                d = bF(a),
                e = bF(g);
                for (f = 0; d[f]; ++f) {
                    e[f] && bE(d[f], e[f])
                }
            }
            if (b) {
                bD(a, g);
                if (c) {
                    d = bF(a),
                    e = bF(g);
                    for (f = 0; d[f]; ++f) {
                        bD(d[f], e[f])
                    }
                }
            }
            return d = e = null,
            g
        },
        clean: function(a, b, c, d) {
            var f, g, h, i, j, k, l, m, n, o, q, r, s = 0,
            t = [];
            if (!b || typeof b.createDocumentFragment == "undefined") {
                b = e
            }
            for (g = b === e && bA; (h = a[s]) != null; s++) {
                typeof h == "number" && (h += "");
                if (!h) {
                    continue
                }
                if (typeof h == "string") {
                    if (!br.test(h)) {
                        h = b.createTextNode(h)
                    } else {
                        g = g || bk(b),
                        l = l || g.appendChild(b.createElement("div")),
                        h = h.replace(bo, "<$1></$2>"),
                        i = (bp.exec(h) || ["", ""])[1].toLowerCase(),
                        j = bz[i] || bz._default,
                        k = j[0],
                        l.innerHTML = j[1] + h + j[2];
                        while (k--) {
                            l = l.lastChild
                        }
                        if (!p.support.tbody) {
                            m = bq.test(h),
                            n = i === "table" && !m ? l.firstChild && l.firstChild.childNodes: j[1] === "<table>" && !m ? l.childNodes: [];
                            for (f = n.length - 1; f >= 0; --f) {
                                p.nodeName(n[f], "tbody") && !n[f].childNodes.length && n[f].parentNode.removeChild(n[f])
                            }
                        } ! p.support.leadingWhitespace && bn.test(h) && l.insertBefore(b.createTextNode(bn.exec(h)[0]), l.firstChild),
                        h = l.childNodes,
                        l = g.lastChild
                    }
                }
                h.nodeType ? t.push(h) : t = p.merge(t, h)
            }
            l && (g.removeChild(l), h = l = g = null);
            if (!p.support.appendChecked) {
                for (s = 0; (h = t[s]) != null; s++) {
                    p.nodeName(h, "input") ? bG(h) : typeof h.getElementsByTagName != "undefined" && p.grep(h.getElementsByTagName("input"), bG)
                }
            }
            if (c) {
                q = function(a) {
                    if (!a.type || bx.test(a.type)) {
                        return d ? d.push(a.parentNode ? a.parentNode.removeChild(a) : a) : c.appendChild(a)
                    }
                };
                for (s = 0; (h = t[s]) != null; s++) {
                    if (!p.nodeName(h, "script") || !q(h)) {
                        c.appendChild(h),
                        typeof h.getElementsByTagName != "undefined" && (r = p.grep(p.merge([], h.getElementsByTagName("script")), q), t.splice.apply(t, [s + 1, 0].concat(r)), s += r.length)
                    }
                }
            }
            return t
        },
        cleanData: function(a, b) {
            var c, d, e, f, g = 0,
            h = p.expando,
            i = p.cache,
            j = p.support.deleteExpando,
            k = p.event.special;
            for (; (e = a[g]) != null; g++) {
                if (b || p.acceptData(e)) {
                    d = e[h],
                    c = d && i[d];
                    if (c) {
                        if (c.events) {
                            for (f in c.events) {
                                k[f] ? p.event.remove(e, f) : p.removeEvent(e, f, c.handle)
                            }
                        }
                        i[d] && (delete i[d], j ? delete e[h] : e.removeAttribute ? e.removeAttribute(h) : e[h] = null, p.deletedIds.push(d))
                    }
                }
            }
        }
    }),
    function() {
        var a, b;
        p.uaMatch = function(a) {
            a = a.toLowerCase();
            var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
            return {
                browser: b[1] || "",
                version: b[2] || "0"
            }
        },
        a = p.uaMatch(g.userAgent),
        b = {},
        a.browser && (b[a.browser] = !0, b.version = a.version),
        b.webkit && (b.safari = !0),
        p.browser = b,
        p.sub = function() {
            function a(b, c) {
                return new a.fn.init(b, c)
            }
            p.extend(!0, a, this),
            a.superclass = this,
            a.fn = a.prototype = this(),
            a.fn.constructor = a,
            a.sub = this.sub,
            a.fn.init = function c(c, d) {
                return d && d instanceof p && !(d instanceof a) && (d = a(d)),
                p.fn.init.call(this, c, d, b)
            },
            a.fn.init.prototype = a.fn;
            var b = a(e);
            return a
        }
    } ();
    var bH, bI, bJ, bK = /alpha\([^)]*\)/i,
    bL = /opacity=([^)]*)/,
    bM = /^(top|right|bottom|left)$/,
    bN = /^margin/,
    bO = new RegExp("^(" + q + ")(.*)$", "i"),
    bP = new RegExp("^(" + q + ")(?!px)[a-z%]+$", "i"),
    bQ = new RegExp("^([-+])=(" + q + ")", "i"),
    bR = {},
    bS = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    },
    bT = {
        letterSpacing: 0,
        fontWeight: 400,
        lineHeight: 1
    },
    bU = ["Top", "Right", "Bottom", "Left"],
    bV = ["Webkit", "O", "Moz", "ms"],
    bW = p.fn.toggle;
    p.fn.extend({
        css: function(a, c) {
            return p.access(this,
            function(a, c, d) {
                return d !== b ? p.style(a, c, d) : p.css(a, c)
            },
            a, c, arguments.length > 1)
        },
        show: function() {
            return bZ(this, !0)
        },
        hide: function() {
            return bZ(this)
        },
        toggle: function(a, b) {
            var c = typeof a == "boolean";
            return p.isFunction(a) && p.isFunction(b) ? bW.apply(this, arguments) : this.each(function() { (c ? a: bY(this)) ? p(this).show() : p(this).hide()
            })
        }
    }),
    p.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = bH(a, "opacity");
                        return c === "" ? "1": c
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": p.support.cssFloat ? "cssFloat": "styleFloat"
        },
        style: function(a, c, d, e) {
            if (!a || a.nodeType === 3 || a.nodeType === 8 || !a.style) {
                return
            }
            var f, g, h, i = p.camelCase(c),
            j = a.style;
            c = p.cssProps[i] || (p.cssProps[i] = bX(j, i)),
            h = p.cssHooks[c] || p.cssHooks[i];
            if (d === b) {
                return h && "get" in h && (f = h.get(a, !1, e)) !== b ? f: j[c]
            }
            g = typeof d,
            g === "string" && (f = bQ.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat(p.css(a, c)), g = "number");
            if (d == null || g === "number" && isNaN(d)) {
                return
            }
            g === "number" && !p.cssNumber[i] && (d += "px");
            if (!h || !("set" in h) || (d = h.set(a, d, e)) !== b) {
                try {
                    j[c] = d
                } catch(k) {}
            }
        },
        css: function(a, c, d, e) {
            var f, g, h, i = p.camelCase(c);
            return c = p.cssProps[i] || (p.cssProps[i] = bX(a.style, i)),
            h = p.cssHooks[c] || p.cssHooks[i],
            h && "get" in h && (f = h.get(a, !0, e)),
            f === b && (f = bH(a, c)),
            f === "normal" && c in bT && (f = bT[c]),
            d || e !== b ? (g = parseFloat(f), d || p.isNumeric(g) ? g || 0 : f) : f
        },
        swap: function(a, b, c) {
            var d, e, f = {};
            for (e in b) {
                f[e] = a.style[e],
                a.style[e] = b[e]
            }
            d = c.call(a);
            for (e in b) {
                a.style[e] = f[e]
            }
            return d
        }
    }),
    a.getComputedStyle ? bH = function(a, b) {
        var c, d, e, f, g = getComputedStyle(a, null),
        h = a.style;
        return g && (c = g[b], c === "" && !p.contains(a.ownerDocument.documentElement, a) && (c = p.style(a, b)), bP.test(c) && bN.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = c, c = g.width, h.width = d, h.minWidth = e, h.maxWidth = f)),
        c
    }: e.documentElement.currentStyle && (bH = function(a, b) {
        var c, d, e = a.currentStyle && a.currentStyle[b],
        f = a.style;
        return e == null && f && f[b] && (e = f[b]),
        bP.test(e) && !bM.test(b) && (c = f.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), f.left = b === "fontSize" ? "1em": e, e = f.pixelLeft + "px", f.left = c, d && (a.runtimeStyle.left = d)),
        e === "" ? "auto": e
    }),
    p.each(["height", "width"],
    function(a, b) {
        p.cssHooks[b] = {
            get: function(a, c, d) {
                if (c) {
                    return a.offsetWidth !== 0 || bH(a, "display") !== "none" ? ca(a, b, d) : p.swap(a, bS,
                    function() {
                        return ca(a, b, d)
                    })
                }
            },
            set: function(a, c, d) {
                return b$(a, c, d ? b_(a, b, d, p.support.boxSizing && p.css(a, "boxSizing") === "border-box") : 0)
            }
        }
    }),
    p.support.opacity || (p.cssHooks.opacity = {
        get: function(a, b) {
            return bL.test((b && a.currentStyle ? a.currentStyle.filter: a.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "": b ? "1": ""
        },
        set: function(a, b) {
            var c = a.style,
            d = a.currentStyle,
            e = p.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")": "",
            f = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && p.trim(f.replace(bK, "")) === "" && c.removeAttribute) {
                c.removeAttribute("filter");
                if (d && !d.filter) {
                    return
                }
            }
            c.filter = bK.test(f) ? f.replace(bK, e) : f + " " + e
        }
    }),
    p(function() {
        p.support.reliableMarginRight || (p.cssHooks.marginRight = {
            get: function(a, b) {
                return p.swap(a, {
                    display: "inline-block"
                },
                function() {
                    if (b) {
                        return bH(a, "marginRight")
                    }
                })
            }
        }),
        !p.support.pixelPosition && p.fn.position && p.each(["top", "left"],
        function(a, b) {
            p.cssHooks[b] = {
                get: function(a, c) {
                    if (c) {
                        var d = bH(a, b);
                        return bP.test(d) ? p(a).position()[b] + "px": d
                    }
                }
            }
        })
    }),
    p.expr && p.expr.filters && (p.expr.filters.hidden = function(a) {
        return a.offsetWidth === 0 && a.offsetHeight === 0 || !p.support.reliableHiddenOffsets && (a.style && a.style.display || bH(a, "display")) === "none"
    },
    p.expr.filters.visible = function(a) {
        return ! p.expr.filters.hidden(a)
    }),
    p.each({
        margin: "",
        padding: "",
        border: "Width"
    },
    function(a, b) {
        p.cssHooks[a + b] = {
            expand: function(c) {
                var d, e = typeof c == "string" ? c.split(" ") : [c],
                f = {};
                for (d = 0; d < 4; d++) {
                    f[a + bU[d] + b] = e[d] || e[d - 2] || e[0]
                }
                return f
            }
        },
        bN.test(a) || (p.cssHooks[a + b].set = b$)
    });
    var cc = /%20/g,
    cd = /\[\]$/,
    ce = /\r?\n/g,
    cf = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
    cg = /^(?:select|textarea)/i;
    p.fn.extend({
        serialize: function() {
            return p.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? p.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || cg.test(this.nodeName) || cf.test(this.type))
            }).map(function(a, b) {
                var c = p(this).val();
                return c == null ? null: p.isArray(c) ? p.map(c,
                function(a, c) {
                    return {
                        name: b.name,
                        value: a.replace(ce, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(ce, "\r\n")
                }
            }).get()
        }
    }),
    p.param = function(a, c) {
        var d, e = [],
        f = function(a, b) {
            b = p.isFunction(b) ? b() : b == null ? "": b,
            e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        c === b && (c = p.ajaxSettings && p.ajaxSettings.traditional);
        if (p.isArray(a) || a.jquery && !p.isPlainObject(a)) {
            p.each(a,
            function() {
                f(this.name, this.value)
            })
        } else {
            for (d in a) {
                ch(d, a[d], c, f)
            }
        }
        return e.join("&").replace(cc, "+")
    };
    var ci, cj, ck = /#.*$/,
    cl = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
    cm = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
    cn = /^(?:GET|HEAD)$/,
    co = /^\/\//,
    cp = /\?/,
    cq = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    cr = /([?&])_=[^&]*/,
    cs = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
    ct = p.fn.load,
    cu = {},
    cv = {},
    cw = ["*/"] + ["*"];
    try {
        ci = f.href
    } catch(cx) {
        ci = e.createElement("a"),
        ci.href = "",
        ci = ci.href
    }
    cj = cs.exec(ci.toLowerCase()) || [],
    p.fn.load = function(a, c, d) {
        if (typeof a != "string" && ct) {
            return ct.apply(this, arguments)
        }
        if (!this.length) {
            return this
        }
        var e, f, g, h = this,
        i = a.indexOf(" ");
        return i >= 0 && (e = a.slice(i, a.length), a = a.slice(0, i)),
        p.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (f = "POST"),
        p.ajax({
            url: a,
            type: f,
            dataType: "html",
            data: c,
            complete: function(a, b) {
                d && h.each(d, g || [a.responseText, b, a])
            }
        }).done(function(a) {
            g = arguments,
            h.html(e ? p("<div>").append(a.replace(cq, "")).find(e) : a)
        }),
        this
    },
    p.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
    function(a, b) {
        p.fn[b] = function(a) {
            return this.on(b, a)
        }
    }),
    p.each(["get", "post"],
    function(a, c) {
        p[c] = function(a, d, e, f) {
            return p.isFunction(d) && (f = f || e, e = d, d = b),
            p.ajax({
                type: c,
                url: a,
                data: d,
                success: e,
                dataType: f
            })
        }
    }),
    p.extend({
        getScript: function(a, c) {
            return p.get(a, b, c, "script")
        },
        getJSON: function(a, b, c) {
            return p.get(a, b, c, "json")
        },
        ajaxSetup: function(a, b) {
            return b ? cA(a, p.ajaxSettings) : (b = a, a = p.ajaxSettings),
            cA(a, b),
            a
        },
        ajaxSettings: {
            url: ci,
            isLocal: cm.test(cj[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": cw
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": p.parseJSON,
                "text xml": p.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: cy(cu),
        ajaxTransport: cy(cv),
        ajax: function(a, c) {
            function y(a, c, f, i) {
                var k, s, t, u, w, y = c;
                if (v === 2) {
                    return
                }
                v = 2,
                h && clearTimeout(h),
                g = b,
                e = i || "",
                x.readyState = a > 0 ? 4 : 0,
                f && (u = cB(l, x, f));
                if (a >= 200 && a < 300 || a === 304) {
                    l.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (p.lastModified[d] = w), w = x.getResponseHeader("Etag"), w && (p.etag[d] = w)),
                    a === 304 ? (y = "notmodified", k = !0) : (k = cC(l, u), y = k.state, s = k.data, t = k.error, k = !t)
                } else {
                    t = y;
                    if (!y || a) {
                        y = "error",
                        a < 0 && (a = 0)
                    }
                }
                x.status = a,
                x.statusText = "" + (c || y),
                k ? o.resolveWith(m, [s, y, x]) : o.rejectWith(m, [x, y, t]),
                x.statusCode(r),
                r = b,
                j && n.trigger("ajax" + (k ? "Success": "Error"), [x, l, k ? s: t]),
                q.fireWith(m, [x, y]),
                j && (n.trigger("ajaxComplete", [x, l]), --p.active || p.event.trigger("ajaxStop"))
            }
            typeof a == "object" && (c = a, a = b),
            c = c || {};
            var d, e, f, g, h, i, j, k, l = p.ajaxSetup({},
            c),
            m = l.context || l,
            n = m !== l && (m.nodeType || m instanceof p) ? p(m) : p.event,
            o = p.Deferred(),
            q = p.Callbacks("once memory"),
            r = l.statusCode || {},
            t = {},
            u = {},
            v = 0,
            w = "canceled",
            x = {
                readyState: 0,
                setRequestHeader: function(a, b) {
                    if (!v) {
                        var c = a.toLowerCase();
                        a = u[c] = u[c] || a,
                        t[a] = b
                    }
                    return this
                },
                getAllResponseHeaders: function() {
                    return v === 2 ? e: null
                },
                getResponseHeader: function(a) {
                    var c;
                    if (v === 2) {
                        if (!f) {
                            f = {};
                            while (c = cl.exec(e)) {
                                f[c[1].toLowerCase()] = c[2]
                            }
                        }
                        c = f[a.toLowerCase()]
                    }
                    return c === b ? null: c
                },
                overrideMimeType: function(a) {
                    return v || (l.mimeType = a),
                    this
                },
                abort: function(a) {
                    return a = a || w,
                    g && g.abort(a),
                    y(0, a),
                    this
                }
            };
            o.promise(x),
            x.success = x.done,
            x.error = x.fail,
            x.complete = q.add,
            x.statusCode = function(a) {
                if (a) {
                    var b;
                    if (v < 2) {
                        for (b in a) {
                            r[b] = [r[b], a[b]]
                        }
                    } else {
                        b = a[x.status],
                        x.always(b)
                    }
                }
                return this
            },
            l.url = ((a || l.url) + "").replace(ck, "").replace(co, cj[1] + "//"),
            l.dataTypes = p.trim(l.dataType || "*").toLowerCase().split(s),
            l.crossDomain == null && (i = cs.exec(l.url.toLowerCase()), l.crossDomain = !(!i || i[1] == cj[1] && i[2] == cj[2] && (i[3] || (i[1] === "http:" ? 80 : 443)) == (cj[3] || (cj[1] === "http:" ? 80 : 443)))),
            l.data && l.processData && typeof l.data != "string" && (l.data = p.param(l.data, l.traditional)),
            cz(cu, l, c, x);
            if (v === 2) {
                return x
            }
            j = l.global,
            l.type = l.type.toUpperCase(),
            l.hasContent = !cn.test(l.type),
            j && p.active++===0 && p.event.trigger("ajaxStart");
            if (!l.hasContent) {
                l.data && (l.url += (cp.test(l.url) ? "&": "?") + l.data, delete l.data),
                d = l.url;
                if (l.cache === !1) {
                    var z = p.now(),
                    A = l.url.replace(cr, "$1_=" + z);
                    l.url = A + (A === l.url ? (cp.test(l.url) ? "&": "?") + "_=" + z: "")
                }
            } (l.data && l.hasContent && l.contentType !== !1 || c.contentType) && x.setRequestHeader("Content-Type", l.contentType),
            l.ifModified && (d = d || l.url, p.lastModified[d] && x.setRequestHeader("If-Modified-Since", p.lastModified[d]), p.etag[d] && x.setRequestHeader("If-None-Match", p.etag[d])),
            x.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + (l.dataTypes[0] !== "*" ? ", " + cw + "; q=0.01": "") : l.accepts["*"]);
            for (k in l.headers) {
                x.setRequestHeader(k, l.headers[k])
            }
            if (!l.beforeSend || l.beforeSend.call(m, x, l) !== !1 && v !== 2) {
                w = "abort";
                for (k in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) {
                    x[k](l[k])
                }
                g = cz(cv, l, c, x);
                if (!g) {
                    y( - 1, "No Transport")
                } else {
                    x.readyState = 1,
                    j && n.trigger("ajaxSend", [x, l]),
                    l.async && l.timeout > 0 && (h = setTimeout(function() {
                        x.abort("timeout")
                    },
                    l.timeout));
                    try {
                        v = 1,
                        g.send(t, y)
                    } catch(B) {
                        if (v < 2) {
                            y( - 1, B)
                        } else {
                            throw B
                        }
                    }
                }
                return x
            }
            return x.abort()
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var cD = [],
    cE = /\?/,
    cF = /(=)\?(?=&|$)|\?\?/,
    cG = p.now();
    p.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = cD.pop() || p.expando + "_" + cG++;
            return this[a] = !0,
            a
        }
    }),
    p.ajaxPrefilter("json jsonp",
    function(c, d, e) {
        var f, g, h, i = c.data,
        j = c.url,
        k = c.jsonp !== !1,
        l = k && cF.test(j),
        m = k && !l && typeof i == "string" && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && cF.test(i);
        if (c.dataTypes[0] === "jsonp" || l || m) {
            return f = c.jsonpCallback = p.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback,
            g = a[f],
            l ? c.url = j.replace(cF, "$1" + f) : m ? c.data = i.replace(cF, "$1" + f) : k && (c.url += (cE.test(j) ? "&": "?") + c.jsonp + "=" + f),
            c.converters["script json"] = function() {
                return h || p.error(f + " was not called"),
                h[0]
            },
            c.dataTypes[0] = "json",
            a[f] = function() {
                h = arguments
            },
            e.always(function() {
                a[f] = g,
                c[f] && (c.jsonpCallback = d.jsonpCallback, cD.push(f)),
                h && p.isFunction(g) && g(h[0]),
                h = g = b
            }),
            "script"
        }
    }),
    p.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(a) {
                return p.globalEval(a),
                a
            }
        }
    }),
    p.ajaxPrefilter("script",
    function(a) {
        a.cache === b && (a.cache = !1),
        a.crossDomain && (a.type = "GET", a.global = !1)
    }),
    p.ajaxTransport("script",
    function(a) {
        if (a.crossDomain) {
            var c, d = e.head || e.getElementsByTagName("head")[0] || e.documentElement;
            return {
                send: function(f, g) {
                    c = e.createElement("script"),
                    c.async = "async",
                    a.scriptCharset && (c.charset = a.scriptCharset),
                    c.src = a.url,
                    c.onload = c.onreadystatechange = function(a, e) {
                        if (e || !c.readyState || /loaded|complete/.test(c.readyState)) {
                            c.onload = c.onreadystatechange = null,
                            d && c.parentNode && d.removeChild(c),
                            c = b,
                            e || g(200, "success")
                        }
                    },
                    d.insertBefore(c, d.firstChild)
                },
                abort: function() {
                    c && c.onload(0, 1)
                }
            }
        }
    });
    var cH, cI = a.ActiveXObject ?
    function() {
        for (var a in cH) {
            cH[a](0, 1)
        }
    }: !1,
    cJ = 0;
    p.ajaxSettings.xhr = a.ActiveXObject ?
    function() {
        return ! this.isLocal && cK() || cL()
    }: cK,
    function(a) {
        p.extend(p.support, {
            ajax: !!a,
            cors: !!a && "withCredentials" in a
        })
    } (p.ajaxSettings.xhr()),
    p.support.ajax && p.ajaxTransport(function(c) {
        if (!c.crossDomain || p.support.cors) {
            var d;
            return {
                send: function(e, f) {
                    var g, h, i = c.xhr();
                    c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async);
                    if (c.xhrFields) {
                        for (h in c.xhrFields) {
                            i[h] = c.xhrFields[h]
                        }
                    }
                    c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType),
                    !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (h in e) {
                            i.setRequestHeader(h, e[h])
                        }
                    } catch(j) {}
                    i.send(c.hasContent && c.data || null),
                    d = function(a, e) {
                        var h, j, k, l, m;
                        try {
                            if (d && (e || i.readyState === 4)) {
                                d = b,
                                g && (i.onreadystatechange = p.noop, cI && delete cH[g]);
                                if (e) {
                                    i.readyState !== 4 && i.abort()
                                } else {
                                    h = i.status,
                                    k = i.getAllResponseHeaders(),
                                    l = {},
                                    m = i.responseXML,
                                    m && m.documentElement && (l.xml = m);
                                    try {
                                        l.text = i.responseText
                                    } catch(a) {}
                                    try {
                                        j = i.statusText
                                    } catch(n) {
                                        j = ""
                                    } ! h && c.isLocal && !c.crossDomain ? h = l.text ? 200 : 404 : h === 1223 && (h = 204)
                                }
                            }
                        } catch(o) {
                            e || f( - 1, o)
                        }
                        l && f(h, j, l, k)
                    },
                    c.async ? i.readyState === 4 ? setTimeout(d, 0) : (g = ++cJ, cI && (cH || (cH = {},
                    p(a).unload(cI)), cH[g] = d), i.onreadystatechange = d) : d()
                },
                abort: function() {
                    d && d(0, 1)
                }
            }
        }
    });
    var cM, cN, cO = /^(?:toggle|show|hide)$/,
    cP = new RegExp("^(?:([-+])=|)(" + q + ")([a-z%]*)$", "i"),
    cQ = /queueHooks$/,
    cR = [cX],
    cS = {
        "*": [function(a, b) {
            var c, d, e, f = this.createTween(a, b),
            g = cP.exec(b),
            h = f.cur(),
            i = +h || 0,
            j = 1;
            if (g) {
                c = +g[2],
                d = g[3] || (p.cssNumber[a] ? "": "px");
                if (d !== "px" && i) {
                    i = p.css(f.elem, a, !0) || c || 1;
                    do {
                        e = j = j || ".5", i = i / j, p.style(f.elem, a, i + d), j = f.cur() / h
                    } while ( j !== 1 && j !== e )
                }
                f.unit = d,
                f.start = i,
                f.end = g[1] ? i + (g[1] + 1) * c: c
            }
            return f
        }]
    };
    p.Animation = p.extend(cV, {
        tweener: function(a, b) {
            p.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
            var c, d = 0,
            e = a.length;
            for (; d < e; d++) {
                c = a[d],
                cS[c] = cS[c] || [],
                cS[c].unshift(b)
            }
        },
        prefilter: function(a, b) {
            b ? cR.unshift(a) : cR.push(a)
        }
    }),
    p.Tween = cY,
    cY.prototype = {
        constructor: cY,
        init: function(a, b, c, d, e, f) {
            this.elem = a,
            this.prop = c,
            this.easing = e || "swing",
            this.options = b,
            this.start = this.now = this.cur(),
            this.end = d,
            this.unit = f || (p.cssNumber[c] ? "": "px")
        },
        cur: function() {
            var a = cY.propHooks[this.prop];
            return a && a.get ? a.get(this) : cY.propHooks._default.get(this)
        },
        run: function(a) {
            var b, c = cY.propHooks[this.prop];
            return this.pos = b = p.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration),
            this.now = (this.end - this.start) * b + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            c && c.set ? c.set(this) : cY.propHooks._default.set(this),
            this
        }
    },
    cY.prototype.init.prototype = cY.prototype,
    cY.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return a.elem[a.prop] == null || !!a.elem.style && a.elem.style[a.prop] != null ? (b = p.css(a.elem, a.prop, !1, ""), !b || b === "auto" ? 0 : b) : a.elem[a.prop]
            },
            set: function(a) {
                p.fx.step[a.prop] ? p.fx.step[a.prop](a) : a.elem.style && (a.elem.style[p.cssProps[a.prop]] != null || p.cssHooks[a.prop]) ? p.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    },
    cY.propHooks.scrollTop = cY.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    },
    p.each(["toggle", "show", "hide"],
    function(a, b) {
        var c = p.fn[b];
        p.fn[b] = function(d, e, f) {
            return d == null || typeof d == "boolean" || !a && p.isFunction(d) && p.isFunction(e) ? c.apply(this, arguments) : this.animate(cZ(b, !0), d, e, f)
        }
    }),
    p.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(bY).css("opacity", 0).show().end().animate({
                opacity: b
            },
            a, c, d)
        },
        animate: function(a, b, c, d) {
            var e = p.isEmptyObject(a),
            f = p.speed(b, c, d),
            g = function() {
                var b = cV(this, p.extend({},
                a), f);
                e && b.stop(!0)
            };
            return e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        },
        stop: function(a, c, d) {
            var e = function(a) {
                var b = a.stop;
                delete a.stop,
                b(d)
            };
            return typeof a != "string" && (d = c, c = a, a = b),
            c && a !== !1 && this.queue(a || "fx", []),
            this.each(function() {
                var b = !0,
                c = a != null && a + "queueHooks",
                f = p.timers,
                g = p._data(this);
                if (c) {
                    g[c] && g[c].stop && e(g[c])
                } else {
                    for (c in g) {
                        g[c] && g[c].stop && cQ.test(c) && e(g[c])
                    }
                }
                for (c = f.length; c--;) {
                    f[c].elem === this && (a == null || f[c].queue === a) && (f[c].anim.stop(d), b = !1, f.splice(c, 1))
                } (b || !d) && p.dequeue(this, a)
            })
        }
    }),
    p.each({
        slideDown: cZ("show"),
        slideUp: cZ("hide"),
        slideToggle: cZ("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    },
    function(a, b) {
        p.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d)
        }
    }),
    p.speed = function(a, b, c) {
        var d = a && typeof a == "object" ? p.extend({},
        a) : {
            complete: c || !c && b || p.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !p.isFunction(b) && b
        };
        d.duration = p.fx.off ? 0 : typeof d.duration == "number" ? d.duration: d.duration in p.fx.speeds ? p.fx.speeds[d.duration] : p.fx.speeds._default;
        if (d.queue == null || d.queue === !0) {
            d.queue = "fx"
        }
        return d.old = d.complete,
        d.complete = function() {
            p.isFunction(d.old) && d.old.call(this),
            d.queue && p.dequeue(this, d.queue)
        },
        d
    },
    p.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return 0.5 - Math.cos(a * Math.PI) / 2
        }
    },
    p.timers = [],
    p.fx = cY.prototype.init,
    p.fx.tick = function() {
        var a, b = p.timers,
        c = 0;
        for (; c < b.length; c++) {
            a = b[c],
            !a() && b[c] === a && b.splice(c--, 1)
        }
        b.length || p.fx.stop()
    },
    p.fx.timer = function(a) {
        a() && p.timers.push(a) && !cN && (cN = setInterval(p.fx.tick, p.fx.interval))
    },
    p.fx.interval = 13,
    p.fx.stop = function() {
        clearInterval(cN),
        cN = null
    },
    p.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    p.fx.step = {},
    p.expr && p.expr.filters && (p.expr.filters.animated = function(a) {
        return p.grep(p.timers,
        function(b) {
            return a === b.elem
        }).length
    });
    var c$ = /^(?:body|html)$/i;
    p.fn.offset = function(a) {
        if (arguments.length) {
            return a === b ? this: this.each(function(b) {
                p.offset.setOffset(this, a, b)
            })
        }
        var c, d, e, f, g, h, i, j, k, l, m = this[0],
        n = m && m.ownerDocument;
        if (!n) {
            return
        }
        return (e = n.body) === m ? p.offset.bodyOffset(m) : (d = n.documentElement, p.contains(d, m) ? (c = m.getBoundingClientRect(), f = c_(n), g = d.clientTop || e.clientTop || 0, h = d.clientLeft || e.clientLeft || 0, i = f.pageYOffset || d.scrollTop, j = f.pageXOffset || d.scrollLeft, k = c.top + i - g, l = c.left + j - h, {
            top: k,
            left: l
        }) : {
            top: 0,
            left: 0
        })
    },
    p.offset = {
        bodyOffset: function(a) {
            var b = a.offsetTop,
            c = a.offsetLeft;
            return p.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(p.css(a, "marginTop")) || 0, c += parseFloat(p.css(a, "marginLeft")) || 0),
            {
                top: b,
                left: c
            }
        },
        setOffset: function(a, b, c) {
            var d = p.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = p(a),
            f = e.offset(),
            g = p.css(a, "top"),
            h = p.css(a, "left"),
            i = (d === "absolute" || d === "fixed") && p.inArray("auto", [g, h]) > -1,
            j = {},
            k = {},
            l,
            m;
            i ? (k = e.position(), l = k.top, m = k.left) : (l = parseFloat(g) || 0, m = parseFloat(h) || 0),
            p.isFunction(b) && (b = b.call(a, c, f)),
            b.top != null && (j.top = b.top - f.top + l),
            b.left != null && (j.left = b.left - f.left + m),
            "using" in b ? b.using.call(a, j) : e.css(j)
        }
    },
    p.fn.extend({
        position: function() {
            if (!this[0]) {
                return
            }
            var a = this[0],
            b = this.offsetParent(),
            c = this.offset(),
            d = c$.test(b[0].nodeName) ? {
                top: 0,
                left: 0
            }: b.offset();
            return c.top -= parseFloat(p.css(a, "marginTop")) || 0,
            c.left -= parseFloat(p.css(a, "marginLeft")) || 0,
            d.top += parseFloat(p.css(b[0], "borderTopWidth")) || 0,
            d.left += parseFloat(p.css(b[0], "borderLeftWidth")) || 0,
            {
                top: c.top - d.top,
                left: c.left - d.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || e.body;
                while (a && !c$.test(a.nodeName) && p.css(a, "position") === "static") {
                    a = a.offsetParent
                }
                return a || e.body
            })
        }
    }),
    p.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    },
    function(a, c) {
        var d = /Y/.test(c);
        p.fn[a] = function(e) {
            return p.access(this,
            function(a, e, f) {
                var g = c_(a);
                if (f === b) {
                    return g ? c in g ? g[c] : g.document.documentElement[e] : a[e]
                }
                g ? g.scrollTo(d ? p(g).scrollLeft() : f, d ? f: p(g).scrollTop()) : a[e] = f
            },
            a, e, arguments.length, null)
        }
    }),
    p.each({
        Height: "height",
        Width: "width"
    },
    function(a, c) {
        p.each({
            padding: "inner" + a,
            content: c,
            "": "outer" + a
        },
        function(d, e) {
            p.fn[e] = function(e, f) {
                var g = arguments.length && (d || typeof e != "boolean"),
                h = d || (e === !0 || f === !0 ? "margin": "border");
                return p.access(this,
                function(c, d, e) {
                    var f;
                    return p.isWindow(c) ? c.document.documentElement["client" + a] : c.nodeType === 9 ? (f = c.documentElement, Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? p.css(c, d, e, h) : p.style(c, d, e, h)
                },
                c, g ? e: b, g)
            }
        })
    }),
    a.jQuery = a.$ = p,
    typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [],
    function() {
        return p
    })
})(window); (function($) {
    $.fn.ajaxSubmit = function(options) {
        if (!this.length) {
            log("ajaxSubmit: skipping submit process - no element selected");
            return this
        }
        var method, action, url, $form = this;
        if (typeof options == "function") {
            options = {
                success: options
            }
        }
        method = this.attr("method");
        action = this.attr("action");
        url = (typeof action === "string") ? $.trim(action) : "";
        url = url || window.location.href || "";
        if (url) {
            url = (url.match(/^([^#]+)/) || [])[1]
        }
        options = $.extend(true, {
            url: url,
            success: $.ajaxSettings.success,
            type: method || "GET",
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false": "about:blank"
        },
        options);
        var veto = {};
        this.trigger("form-pre-serialize", [this, options, veto]);
        if (veto.veto) {
            log("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
            return this
        }
        if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
            log("ajaxSubmit: submit aborted via beforeSerialize callback");
            return this
        }
        var n, v, a = this.formToArray(options.semantic);
        if (options.data) {
            options.extraData = options.data;
            for (n in options.data) {
                if (options.data[n] instanceof Array) {
                    for (var k in options.data[n]) {
                        a.push({
                            name: n,
                            value: options.data[n][k]
                        })
                    }
                } else {
                    v = options.data[n];
                    v = $.isFunction(v) ? v() : v;
                    a.push({
                        name: n,
                        value: v
                    })
                }
            }
        }
        if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
            log("ajaxSubmit: submit aborted via beforeSubmit callback");
            return this
        }
        this.trigger("form-submit-validate", [a, this, options, veto]);
        if (veto.veto) {
            log("ajaxSubmit: submit vetoed via form-submit-validate trigger");
            return this
        }
        var q = $.param(a);
        if (options.type.toUpperCase() == "GET") {
            options.url += (options.url.indexOf("?") >= 0 ? "&": "?") + q;
            options.data = null
        } else {
            options.data = q
        }
        var callbacks = [];
        if (options.resetForm) {
            callbacks.push(function() {
                $form.resetForm()
            })
        }
        if (options.clearForm) {
            callbacks.push(function() {
                $form.clearForm()
            })
        }
        if (!options.dataType && options.target) {
            var oldSuccess = options.success ||
            function() {};
            callbacks.push(function(data) {
                var fn = options.replaceTarget ? "replaceWith": "html";
                $(options.target)[fn](data).each(oldSuccess, arguments)
            })
        } else {
            if (options.success) {
                callbacks.push(options.success)
            }
        }
        options.success = function(data, status, xhr) {
            var context = options.context || options;
            for (var i = 0,
            max = callbacks.length; i < max; i++) {
                callbacks[i].apply(context, [data, status, xhr || $form, $form])
            }
        };
        var fileInputs = $("input:file", this).length > 0;
        var mp = "multipart/form-data";
        var multipart = ($form.attr("enctype") == mp || $form.attr("encoding") == mp);
        if (options.iframe !== false && (fileInputs || options.iframe || multipart)) {
            if (options.closeKeepAlive) {
                $.get(options.closeKeepAlive,
                function() {
                    fileUpload(a)
                })
            } else {
                fileUpload(a)
            }
        } else {
            if ($.browser.msie && method == "get") {
                var ieMeth = $form[0].getAttribute("method");
                if (typeof ieMeth === "string") {
                    options.type = ieMeth
                }
            }
            $.ajax(options)
        }
        this.trigger("form-submit-notify", [this, options]);
        return this;
        function fileUpload(a) {
            var form = $form[0],
            i,
            s,
            g,
            id,
            $io,
            io,
            xhr,
            sub,
            n,
            timedOut,
            timeoutHandle;
            if (a) {
                for (i = 0; i < a.length; i++) {
                    $(form[a[i].name]).attr("disabled", false)
                }
            }
            if ($(":input[name=submit],:input[id=submit]", form).length) {
                alert('Error: Form elements must not have name or id of "submit".');
                return
            }
            s = $.extend(true, {},
            $.ajaxSettings, options);
            s.context = s.context || s;
            id = "jqFormIO" + (new Date().getTime());
            if (s.iframeTarget) {
                $io = $(s.iframeTarget);
                n = $io.attr("name");
                if (n == null) {
                    $io.attr("name", id)
                } else {
                    id = n
                }
            } else {
                $io = $('<iframe name="' + id + '" src="' + s.iframeSrc + '" />');
                $io.css({
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px"
                })
            }
            io = $io[0];
            xhr = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: "n/a",
                getAllResponseHeaders: function() {},
                getResponseHeader: function() {},
                setRequestHeader: function() {},
                abort: function(status) {
                    var e = (status === "timeout" ? "timeout": "aborted");
                    log("aborting upload... " + e);
                    this.aborted = 1;
                    $io.attr("src", s.iframeSrc);
                    xhr.error = e;
                    s.error && s.error.call(s.context, xhr, e, status);
                    g && $.event.trigger("ajaxError", [xhr, s, e]);
                    s.complete && s.complete.call(s.context, xhr, e)
                }
            };
            g = s.global;
            if (g && !$.active++) {
                $.event.trigger("ajaxStart")
            }
            if (g) {
                $.event.trigger("ajaxSend", [xhr, s])
            }
            if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
                if (s.global) {
                    $.active--
                }
                return
            }
            if (xhr.aborted) {
                return
            }
            sub = form.clk;
            if (sub) {
                n = sub.name;
                if (n && !sub.disabled) {
                    s.extraData = s.extraData || {};
                    s.extraData[n] = sub.value;
                    if (sub.type == "image") {
                        s.extraData[n + ".x"] = form.clk_x;
                        s.extraData[n + ".y"] = form.clk_y
                    }
                }
            }
            var CLIENT_TIMEOUT_ABORT = 1;
            var SERVER_ABORT = 2;
            function getDoc(frame) {
                var doc = frame.contentWindow ? frame.contentWindow.document: frame.contentDocument ? frame.contentDocument: frame.document;
                return doc
            }
            function doSubmit() {
                var t = $form.attr("target"),
                a = $form.attr("action");
                form.setAttribute("target", id);
                if (!method) {
                    form.setAttribute("method", "POST")
                }
                if (a != s.url) {
                    form.setAttribute("action", s.url)
                }
                if (!s.skipEncodingOverride && (!method || /post/i.test(method))) {
                    $form.attr({
                        encoding: "multipart/form-data",
                        enctype: "multipart/form-data"
                    })
                }
                if (s.timeout) {
                    timeoutHandle = setTimeout(function() {
                        timedOut = true;
                        cb(CLIENT_TIMEOUT_ABORT)
                    },
                    s.timeout)
                }
                function checkState() {
                    try {
                        var state = getDoc(io).readyState;
                        log("state = " + state);
                        if (state.toLowerCase() == "uninitialized") {
                            setTimeout(checkState, 50)
                        }
                    } catch(e) {
                        log("Server abort: ", e, " (", e.name, ")");
                        cb(SERVER_ABORT);
                        timeoutHandle && clearTimeout(timeoutHandle);
                        timeoutHandle = undefined
                    }
                }
                var extraInputs = [];
                try {
                    if (s.extraData) {
                        for (var n in s.extraData) {
                            extraInputs.push($('<input type="hidden" name="' + n + '" />').attr("value", s.extraData[n]).appendTo(form)[0])
                        }
                    }
                    if (!s.iframeTarget) {
                        $io.appendTo("body");
                        io.attachEvent ? io.attachEvent("onload", cb) : io.addEventListener("load", cb, false)
                    }
                    setTimeout(checkState, 15);
                    form.submit()
                } finally {
                    form.setAttribute("action", a);
                    if (t) {
                        form.setAttribute("target", t)
                    } else {
                        $form.removeAttr("target")
                    }
                    $(extraInputs).remove()
                }
            }
            if (s.forceSync) {
                doSubmit()
            } else {
                setTimeout(doSubmit, 10)
            }
            var data, doc, domCheckCount = 50,
            callbackProcessed;
            function cb(e) {
                if (xhr.aborted || callbackProcessed) {
                    return
                }
                try {
                    doc = getDoc(io)
                } catch(ex) {
                    log("cannot access response document: ", ex);
                    e = SERVER_ABORT
                }
                if (e === CLIENT_TIMEOUT_ABORT && xhr) {
                    xhr.abort("timeout");
                    return
                } else {
                    if (e == SERVER_ABORT && xhr) {
                        xhr.abort("server abort");
                        return
                    }
                }
                if (!doc || doc.location.href == s.iframeSrc) {
                    if (!timedOut) {
                        return
                    }
                }
                io.detachEvent ? io.detachEvent("onload", cb) : io.removeEventListener("load", cb, false);
                var status = "success",
                errMsg;
                try {
                    if (timedOut) {
                        throw "timeout"
                    }
                    var isXml = s.dataType == "xml" || doc.XMLDocument || $.isXMLDoc(doc);
                    log("isXml=" + isXml);
                    if (!isXml && window.opera && (doc.body == null || doc.body.innerHTML == "")) {
                        if (--domCheckCount) {
                            log("requeing onLoad callback, DOM not available");
                            setTimeout(cb, 250);
                            return
                        }
                    }
                    var docRoot = doc.body ? doc.body: doc.documentElement;
                    xhr.responseText = docRoot ? docRoot.innerHTML: null;
                    xhr.responseXML = doc.XMLDocument ? doc.XMLDocument: doc;
                    if (isXml) {
                        s.dataType = "xml"
                    }
                    xhr.getResponseHeader = function(header) {
                        var headers = {
                            "content-type": s.dataType
                        };
                        return headers[header]
                    };
                    if (docRoot) {
                        xhr.status = Number(docRoot.getAttribute("status")) || xhr.status;
                        xhr.statusText = docRoot.getAttribute("statusText") || xhr.statusText
                    }
                    var dt = s.dataType || "";
                    var scr = /(json|script|text)/.test(dt.toLowerCase());
                    if (scr || s.textarea) {
                        var ta = doc.getElementsByTagName("textarea")[0];
                        if (ta) {
                            xhr.responseText = ta.value;
                            xhr.status = Number(ta.getAttribute("status")) || xhr.status;
                            xhr.statusText = ta.getAttribute("statusText") || xhr.statusText
                        } else {
                            if (scr) {
                                var pre = doc.getElementsByTagName("pre")[0];
                                var b = doc.getElementsByTagName("body")[0];
                                if (pre) {
                                    xhr.responseText = pre.textContent ? pre.textContent: pre.innerHTML
                                } else {
                                    if (b) {
                                        xhr.responseText = b.innerHTML
                                    }
                                }
                            }
                        }
                    } else {
                        if (s.dataType == "xml" && !xhr.responseXML && xhr.responseText != null) {
                            xhr.responseXML = toXml(xhr.responseText)
                        }
                    }
                    try {
                        data = httpData(xhr, s.dataType, s)
                    } catch(e) {
                        status = "parsererror";
                        xhr.error = errMsg = (e || status)
                    }
                } catch(e) {
                    log("error caught: ", e);
                    status = "error";
                    xhr.error = errMsg = (e || status)
                }
                if (xhr.aborted) {
                    log("upload aborted");
                    status = null
                }
                if (xhr.status) {
                    status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? "success": "error"
                }
                if (status === "success") {
                    s.success && s.success.call(s.context, data, "success", xhr);
                    g && $.event.trigger("ajaxSuccess", [xhr, s])
                } else {
                    if (status) {
                        if (errMsg == undefined) {
                            errMsg = xhr.statusText
                        }
                        s.error && s.error.call(s.context, xhr, status, errMsg);
                        g && $.event.trigger("ajaxError", [xhr, s, errMsg])
                    }
                }
                g && $.event.trigger("ajaxComplete", [xhr, s]);
                if (g && !--$.active) {
                    $.event.trigger("ajaxStop")
                }
                s.complete && s.complete.call(s.context, xhr, status);
                callbackProcessed = true;
                if (s.timeout) {
                    clearTimeout(timeoutHandle)
                }
                setTimeout(function() {
                    if (!s.iframeTarget) {
                        $io.remove()
                    }
                    xhr.responseXML = null
                },
                100)
            }
            var toXml = $.parseXML ||
            function(s, doc) {
                if (window.ActiveXObject) {
                    doc = new ActiveXObject("Microsoft.XMLDOM");
                    doc.async = "false";
                    doc.loadXML(s)
                } else {
                    doc = (new DOMParser()).parseFromString(s, "text/xml")
                }
                return (doc && doc.documentElement && doc.documentElement.nodeName != "parsererror") ? doc: null
            };
            var parseJSON = $.parseJSON ||
            function(s) {
                return window["eval"]("(" + s + ")")
            };
            var httpData = function(xhr, type, s) {
                var ct = xhr.getResponseHeader("content-type") || "",
                xml = type === "xml" || !type && ct.indexOf("xml") >= 0,
                data = xml ? xhr.responseXML: xhr.responseText;
                if (xml && data.documentElement.nodeName === "parsererror") {
                    $.error && $.error("parsererror")
                }
                if (s && s.dataFilter) {
                    data = s.dataFilter(data, type)
                }
                if (typeof data === "string") {
                    if (type === "json" || !type && ct.indexOf("json") >= 0) {
                        data = parseJSON(data)
                    } else {
                        if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                            $.globalEval(data)
                        }
                    }
                }
                return data
            }
        }
    };
    $.fn.ajaxForm = function(options) {
        if (this.length === 0) {
            var o = {
                s: this.selector,
                c: this.context
            };
            if (!$.isReady && o.s) {
                log("DOM not ready, queuing ajaxForm");
                $(function() {
                    $(o.s, o.c).ajaxForm(options)
                });
                return this
            }
            log("terminating; zero elements found by selector" + ($.isReady ? "": " (DOM not ready)"));
            return this
        }
        return this.ajaxFormUnbind().bind("submit.form-plugin",
        function(e) {
            if (!e.isDefaultPrevented()) {
                e.preventDefault();
                $(this).ajaxSubmit(options)
            }
        }).bind("click.form-plugin",
        function(e) {
            var target = e.target;
            var $el = $(target);
            if (! ($el.is(":submit,input:image"))) {
                var t = $el.closest(":submit");
                if (t.length == 0) {
                    return
                }
                target = t[0]
            }
            var form = this;
            form.clk = target;
            if (target.type == "image") {
                if (e.offsetX != undefined) {
                    form.clk_x = e.offsetX;
                    form.clk_y = e.offsetY
                } else {
                    if (typeof $.fn.offset == "function") {
                        var offset = $el.offset();
                        form.clk_x = e.pageX - offset.left;
                        form.clk_y = e.pageY - offset.top
                    } else {
                        form.clk_x = e.pageX - target.offsetLeft;
                        form.clk_y = e.pageY - target.offsetTop
                    }
                }
            }
            setTimeout(function() {
                form.clk = form.clk_x = form.clk_y = null
            },
            100)
        })
    };
    $.fn.ajaxFormUnbind = function() {
        return this.unbind("submit.form-plugin click.form-plugin")
    };
    $.fn.formToArray = function(semantic) {
        var a = [];
        if (this.length === 0) {
            return a
        }
        var form = this[0];
        var els = semantic ? form.getElementsByTagName("*") : form.elements;
        if (!els) {
            return a
        }
        var i, j, n, v, el, max, jmax;
        for (i = 0, max = els.length; i < max; i++) {
            el = els[i];
            n = el.name;
            if (!n) {
                continue
            }
            if (semantic && form.clk && el.type == "image") {
                if (!el.disabled && form.clk == el) {
                    a.push({
                        name: n,
                        value: $(el).val()
                    });
                    a.push({
                        name: n + ".x",
                        value: form.clk_x
                    },
                    {
                        name: n + ".y",
                        value: form.clk_y
                    })
                }
                continue
            }
            v = $.fieldValue(el, true);
            if (v && v.constructor == Array) {
                for (j = 0, jmax = v.length; j < jmax; j++) {
                    a.push({
                        name: n,
                        value: v[j]
                    })
                }
            } else {
                if (v !== null && typeof v != "undefined") {
                    a.push({
                        name: n,
                        value: v
                    })
                }
            }
        }
        if (!semantic && form.clk) {
            var $input = $(form.clk),
            input = $input[0];
            n = input.name;
            if (n && !input.disabled && input.type == "image") {
                a.push({
                    name: n,
                    value: $input.val()
                });
                a.push({
                    name: n + ".x",
                    value: form.clk_x
                },
                {
                    name: n + ".y",
                    value: form.clk_y
                })
            }
        }
        return a
    };
    $.fn.formSerialize = function(semantic) {
        return $.param(this.formToArray(semantic))
    };
    $.fn.fieldSerialize = function(successful) {
        var a = [];
        this.each(function() {
            var n = this.name;
            if (!n) {
                return
            }
            var v = $.fieldValue(this, successful);
            if (v && v.constructor == Array) {
                for (var i = 0,
                max = v.length; i < max; i++) {
                    a.push({
                        name: n,
                        value: v[i]
                    })
                }
            } else {
                if (v !== null && typeof v != "undefined") {
                    a.push({
                        name: this.name,
                        value: v
                    })
                }
            }
        });
        return $.param(a)
    };
    $.fn.fieldValue = function(successful) {
        for (var val = [], i = 0, max = this.length; i < max; i++) {
            var el = this[i];
            var v = $.fieldValue(el, successful);
            if (v === null || typeof v == "undefined" || (v.constructor == Array && !v.length)) {
                continue
            }
            v.constructor == Array ? $.merge(val, v) : val.push(v)
        }
        return val
    };
    $.fieldValue = function(el, successful) {
        var n = el.name,
        t = el.type,
        tag = el.tagName.toLowerCase();
        if (successful === undefined) {
            successful = true
        }
        if (successful && (!n || el.disabled || t == "reset" || t == "button" || (t == "checkbox" || t == "radio") && !el.checked || (t == "submit" || t == "image") && el.form && el.form.clk != el || tag == "select" && el.selectedIndex == -1)) {
            return null
        }
        if (tag == "select") {
            var index = el.selectedIndex;
            if (index < 0) {
                return null
            }
            var a = [],
            ops = el.options;
            var one = (t == "select-one");
            var max = (one ? index + 1 : ops.length);
            for (var i = (one ? index: 0); i < max; i++) {
                var op = ops[i];
                if (op.selected) {
                    var v = op.value;
                    if (!v) {
                        v = (op.attributes && op.attributes["value"] && !(op.attributes["value"].specified)) ? op.text: op.value
                    }
                    if (one) {
                        return v
                    }
                    a.push(v)
                }
            }
            return a
        }
        return $(el).val()
    };
    $.fn.clearForm = function() {
        return this.each(function() {
            $("input,select,textarea", this).clearFields()
        })
    };
    $.fn.clearFields = $.fn.clearInputs = function() {
        var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var t = this.type,
            tag = this.tagName.toLowerCase();
            if (re.test(t) || tag == "textarea") {
                this.value = ""
            } else {
                if (t == "checkbox" || t == "radio") {
                    this.checked = false
                } else {
                    if (tag == "select") {
                        this.selectedIndex = -1
                    }
                }
            }
        })
    };
    $.fn.resetForm = function() {
        return this.each(function() {
            if (typeof this.reset == "function" || (typeof this.reset == "object" && !this.reset.nodeType)) {
                this.reset()
            }
        })
    };
    $.fn.enable = function(b) {
        if (b === undefined) {
            b = true
        }
        return this.each(function() {
            this.disabled = !b
        })
    };
    $.fn.selected = function(select) {
        if (select === undefined) {
            select = true
        }
        return this.each(function() {
            var t = this.type;
            if (t == "checkbox" || t == "radio") {
                this.checked = select
            } else {
                if (this.tagName.toLowerCase() == "option") {
                    var $sel = $(this).parent("select");
                    if (select && $sel[0] && $sel[0].type == "select-one") {
                        $sel.find("option").selected(false)
                    }
                    this.selected = select
                }
            }
        })
    };
    function log() {
        var msg = "[jquery.form] " + Array.prototype.join.call(arguments, "");
        if (window.console && window.console.log) {
            window.console.log(msg)
        } else {
            if (window.opera && window.opera.postError) {
                window.opera.postError(msg)
            }
        }
    }
})(jQuery);
var CodeMirror = (function() {
    function CodeMirror(place, givenOptions) {
        var options = {},
        defaults = CodeMirror.defaults;
        for (var opt in defaults) {
            if (defaults.hasOwnProperty(opt)) {
                options[opt] = (givenOptions && givenOptions.hasOwnProperty(opt) ? givenOptions: defaults)[opt]
            }
        }
        var wrapper = document.createElement("div");
        wrapper.className = "CodeMirror" + (options.lineWrapping ? " CodeMirror-wrap": "");
        wrapper.innerHTML = '<div style="overflow: hidden; position: relative; width: 3px; height: 0px;">' + '<textarea style="position: absolute; padding: 0; width: 1px; height: 1em" wrap="off" ' + 'autocorrect="off" autocapitalize="off"></textarea></div>' + '<div class="CodeMirror-scroll" tabindex="-1">' + '<div style="position: relative">' + '<div style="position: relative">' + '<div class="CodeMirror-gutter"><div class="CodeMirror-gutter-text"></div></div>' + '<div class="CodeMirror-lines"><div style="position: relative; z-index: 0">' + '<div style="position: absolute; width: 100%; height: 0; overflow: hidden; visibility: hidden;"></div>' + '<pre class="CodeMirror-cursor">&#160;</pre>' + '<div style="position: relative; z-index: -1"></div><div></div>' + "</div></div></div></div></div>";
        if (place.appendChild) {
            place.appendChild(wrapper)
        } else {
            place(wrapper)
        }
        var inputDiv = wrapper.firstChild,
        input = inputDiv.firstChild,
        scroller = wrapper.lastChild,
        code = scroller.firstChild,
        mover = code.firstChild,
        gutter = mover.firstChild,
        gutterText = gutter.firstChild,
        lineSpace = gutter.nextSibling.firstChild,
        measure = lineSpace.firstChild,
        cursor = measure.nextSibling,
        selectionDiv = cursor.nextSibling,
        lineDiv = selectionDiv.nextSibling;
        themeChanged();
        keyMapChanged();
        if (ios) {
            input.style.width = "0px"
        }
        if (!webkit) {
            lineSpace.draggable = true
        }
        lineSpace.style.outline = "none";
        if (options.tabindex != null) {
            input.tabIndex = options.tabindex
        }
        if (options.autofocus) {
            focusInput()
        }
        if (!options.gutter && !options.lineNumbers) {
            gutter.style.display = "none"
        }
        if (khtml) {
            inputDiv.style.height = "1px",
            inputDiv.style.position = "absolute"
        }
        try {
            stringWidth("x")
        } catch(e) {
            if (e.message.match(/runtime/i)) {
                e = new Error("A CodeMirror inside a P-style element does not work in Internet Explorer. (innerHTML bug)")
            }
            throw e
        }
        var poll = new Delayed(),
        highlight = new Delayed(),
        blinker;
        var mode, doc = new BranchChunk([new LeafChunk([new Line("")])]),
        work,
        focused;
        loadMode();
        var sel = {
            from: {
                line: 0,
                ch: 0
            },
            to: {
                line: 0,
                ch: 0
            },
            inverted: false
        };
        var shiftSelecting, lastClick, lastDoubleClick, lastScrollPos = 0,
        draggingText, overwrite = false,
        suppressEdits = false;
        var updateInput, userSelChange, changes, textChanged, selectionChanged, leaveInputAlone, gutterDirty, callbacks, maxLengthChanged;
        var displayOffset = 0,
        showingFrom = 0,
        showingTo = 0,
        lastSizeC = 0;
        var bracketHighlighted;
        var maxLine = "",
        maxWidth;
        var tabCache = {};
        operation(function() {
            setValue(options.value || "");
            updateInput = false
        })();
        var history = new History();
        connect(scroller, "mousedown", operation(onMouseDown));
        connect(scroller, "dblclick", operation(onDoubleClick));
        connect(lineSpace, "selectstart", e_preventDefault);
        if (!gecko) {
            connect(scroller, "contextmenu", onContextMenu)
        }
        connect(scroller, "scroll",
        function() {
            lastScrollPos = scroller.scrollTop;
            updateDisplay([]);
            if (options.fixedGutter) {
                gutter.style.left = scroller.scrollLeft + "px"
            }
            if (options.onScroll) {
                options.onScroll(instance)
            }
        });
        connect(window, "resize",
        function() {
            updateDisplay(true)
        });
        connect(input, "keyup", operation(onKeyUp));
        connect(input, "input", fastPoll);
        connect(input, "keydown", operation(onKeyDown));
        connect(input, "keypress", operation(onKeyPress));
        connect(input, "focus", onFocus);
        connect(input, "blur", onBlur);
        if (options.dragDrop) {
            connect(lineSpace, "dragstart", onDragStart);
            function drag_(e) {
                if (options.onDragEvent && options.onDragEvent(instance, addStop(e))) {
                    return
                }
                e_stop(e)
            }
            connect(scroller, "dragenter", drag_);
            connect(scroller, "dragover", drag_);
            connect(scroller, "drop", operation(onDrop))
        }
        connect(scroller, "paste",
        function() {
            focusInput();
            fastPoll()
        });
        connect(input, "paste", fastPoll);
        connect(input, "cut", operation(function() {
            if (!options.readOnly) {
                replaceSelection("")
            }
        }));
        if (khtml) {
            connect(code, "mouseup",
            function() {
                if (document.activeElement == input) {
                    input.blur()
                }
                focusInput()
            })
        }
        var hasFocus;
        try {
            hasFocus = (document.activeElement == input)
        } catch(e) {}
        if (hasFocus || options.autofocus) {
            setTimeout(onFocus, 20)
        } else {
            onBlur()
        }
        function isLine(l) {
            return l >= 0 && l < doc.size
        }
        var instance = wrapper.CodeMirror = {
            getValue: getValue,
            setValue: operation(setValue),
            getSelection: getSelection,
            replaceSelection: operation(replaceSelection),
            focus: function() {
                window.focus();
                focusInput();
                onFocus();
                fastPoll()
            },
            setOption: function(option, value) {
                var oldVal = options[option];
                options[option] = value;
                if (option == "mode" || option == "indentUnit") {
                    loadMode()
                } else {
                    if (option == "readOnly" && value == "nocursor") {
                        onBlur();
                        input.blur()
                    } else {
                        if (option == "readOnly" && !value) {
                            resetInput(true)
                        } else {
                            if (option == "theme") {
                                themeChanged()
                            } else {
                                if (option == "lineWrapping" && oldVal != value) {
                                    operation(wrappingChanged)()
                                } else {
                                    if (option == "tabSize") {
                                        updateDisplay(true)
                                    } else {
                                        if (option == "keyMap") {
                                            keyMapChanged()
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (option == "lineNumbers" || option == "gutter" || option == "firstLineNumber" || option == "theme") {
                    gutterChanged();
                    updateDisplay(true)
                }
            },
            getOption: function(option) {
                return options[option]
            },
            undo: operation(undo),
            redo: operation(redo),
            indentLine: operation(function(n, dir) {
                if (typeof dir != "string") {
                    if (dir == null) {
                        dir = options.smartIndent ? "smart": "prev"
                    } else {
                        dir = dir ? "add": "subtract"
                    }
                }
                if (isLine(n)) {
                    indentLine(n, dir)
                }
            }),
            indentSelection: operation(indentSelected),
            historySize: function() {
                return {
                    undo: history.done.length,
                    redo: history.undone.length
                }
            },
            clearHistory: function() {
                history = new History()
            },
            matchBrackets: operation(function() {
                matchBrackets(true)
            }),
            getTokenAt: operation(function(pos) {
                pos = clipPos(pos);
                return getLine(pos.line).getTokenAt(mode, getStateBefore(pos.line), pos.ch)
            }),
            getStateAfter: function(line) {
                line = clipLine(line == null ? doc.size - 1 : line);
                return getStateBefore(line + 1)
            },
            cursorCoords: function(start, mode) {
                if (start == null) {
                    start = sel.inverted
                }
                return this.charCoords(start ? sel.from: sel.to, mode)
            },
            charCoords: function(pos, mode) {
                pos = clipPos(pos);
                if (mode == "local") {
                    return localCoords(pos, false)
                }
                if (mode == "div") {
                    return localCoords(pos, true)
                }
                return pageCoords(pos)
            },
            coordsChar: function(coords) {
                var off = eltOffset(lineSpace);
                return coordsChar(coords.x - off.left, coords.y - off.top)
            },
            markText: operation(markText),
            setBookmark: setBookmark,
            findMarksAt: findMarksAt,
            setMarker: operation(addGutterMarker),
            clearMarker: operation(removeGutterMarker),
            setLineClass: operation(setLineClass),
            hideLine: operation(function(h) {
                return setLineHidden(h, true)
            }),
            showLine: operation(function(h) {
                return setLineHidden(h, false)
            }),
            onDeleteLine: function(line, f) {
                if (typeof line == "number") {
                    if (!isLine(line)) {
                        return null
                    }
                    line = getLine(line)
                } (line.handlers || (line.handlers = [])).push(f);
                return line
            },
            lineInfo: lineInfo,
            addWidget: function(pos, node, scroll, vert, horiz) {
                pos = localCoords(clipPos(pos));
                var top = pos.yBot,
                left = pos.x;
                node.style.position = "absolute";
                code.appendChild(node);
                if (vert == "over") {
                    top = pos.y
                } else {
                    if (vert == "near") {
                        var vspace = Math.max(scroller.offsetHeight, doc.height * textHeight()),
                        hspace = Math.max(code.clientWidth, lineSpace.clientWidth) - paddingLeft();
                        if (pos.yBot + node.offsetHeight > vspace && pos.y > node.offsetHeight) {
                            top = pos.y - node.offsetHeight
                        }
                        if (left + node.offsetWidth > hspace) {
                            left = hspace - node.offsetWidth
                        }
                    }
                }
                node.style.top = (top + paddingTop()) + "px";
                node.style.left = node.style.right = "";
                if (horiz == "right") {
                    left = code.clientWidth - node.offsetWidth;
                    node.style.right = "0px"
                } else {
                    if (horiz == "left") {
                        left = 0
                    } else {
                        if (horiz == "middle") {
                            left = (code.clientWidth - node.offsetWidth) / 2
                        }
                    }
                    node.style.left = (left + paddingLeft()) + "px"
                }
                if (scroll) {
                    scrollIntoView(left, top, left + node.offsetWidth, top + node.offsetHeight)
                }
            },
            lineCount: function() {
                return doc.size
            },
            clipPos: clipPos,
            getCursor: function(start) {
                if (start == null) {
                    start = sel.inverted
                }
                return copyPos(start ? sel.from: sel.to)
            },
            somethingSelected: function() {
                return ! posEq(sel.from, sel.to)
            },
            setCursor: operation(function(line, ch, user) {
                if (ch == null && typeof line.line == "number") {
                    setCursor(line.line, line.ch, user)
                } else {
                    setCursor(line, ch, user)
                }
            }),
            setSelection: operation(function(from, to, user) { (user ? setSelectionUser: setSelection)(clipPos(from), clipPos(to || from))
            }),
            getLine: function(line) {
                if (isLine(line)) {
                    return getLine(line).text
                }
            },
            getLineHandle: function(line) {
                if (isLine(line)) {
                    return getLine(line)
                }
            },
            setLine: operation(function(line, text) {
                if (isLine(line)) {
                    replaceRange(text, {
                        line: line,
                        ch: 0
                    },
                    {
                        line: line,
                        ch: getLine(line).text.length
                    })
                }
            }),
            removeLine: operation(function(line) {
                if (isLine(line)) {
                    replaceRange("", {
                        line: line,
                        ch: 0
                    },
                    clipPos({
                        line: line + 1,
                        ch: 0
                    }))
                }
            }),
            replaceRange: operation(replaceRange),
            getRange: function(from, to) {
                return getRange(clipPos(from), clipPos(to))
            },
            triggerOnKeyDown: operation(onKeyDown),
            execCommand: function(cmd) {
                return commands[cmd](instance)
            },
            moveH: operation(moveH),
            deleteH: operation(deleteH),
            moveV: operation(moveV),
            toggleOverwrite: function() {
                if (overwrite) {
                    overwrite = false;
                    cursor.className = cursor.className.replace(" CodeMirror-overwrite", "")
                } else {
                    overwrite = true;
                    cursor.className += " CodeMirror-overwrite"
                }
            },
            posFromIndex: function(off) {
                var lineNo = 0,
                ch;
                doc.iter(0, doc.size,
                function(line) {
                    var sz = line.text.length + 1;
                    if (sz > off) {
                        ch = off;
                        return true
                    }
                    off -= sz; ++lineNo
                });
                return clipPos({
                    line: lineNo,
                    ch: ch
                })
            },
            indexFromPos: function(coords) {
                if (coords.line < 0 || coords.ch < 0) {
                    return 0
                }
                var index = coords.ch;
                doc.iter(0, coords.line,
                function(line) {
                    index += line.text.length + 1
                });
                return index
            },
            scrollTo: function(x, y) {
                if (x != null) {
                    scroller.scrollLeft = x
                }
                if (y != null) {
                    scroller.scrollTop = y
                }
                updateDisplay([])
            },
            operation: function(f) {
                return operation(f)()
            },
            compoundChange: function(f) {
                return compoundChange(f)
            },
            refresh: function() {
                updateDisplay(true);
                if (scroller.scrollHeight > lastScrollPos) {
                    scroller.scrollTop = lastScrollPos
                }
            },
            getInputField: function() {
                return input
            },
            getWrapperElement: function() {
                return wrapper
            },
            getScrollerElement: function() {
                return scroller
            },
            getGutterElement: function() {
                return gutter
            }
        };
        function getLine(n) {
            return getLineAt(doc, n)
        }
        function updateLineHeight(line, height) {
            gutterDirty = true;
            var diff = height - line.height;
            for (var n = line; n; n = n.parent) {
                n.height += diff
            }
        }
        function setValue(code) {
            var top = {
                line: 0,
                ch: 0
            };
            updateLines(top, {
                line: doc.size - 1,
                ch: getLine(doc.size - 1).text.length
            },
            splitLines(code), top, top);
            updateInput = true
        }
        function getValue() {
            var text = [];
            doc.iter(0, doc.size,
            function(line) {
                text.push(line.text)
            });
            return text.join("\n")
        }
        function onMouseDown(e) {
            setShift(e_prop(e, "shiftKey"));
            for (var n = e_target(e); n != wrapper; n = n.parentNode) {
                if (n.parentNode == code && n != mover) {
                    return
                }
            }
            for (var n = e_target(e); n != wrapper; n = n.parentNode) {
                if (n.parentNode == gutterText) {
                    if (options.onGutterClick) {
                        options.onGutterClick(instance, indexOf(gutterText.childNodes, n) + showingFrom, e)
                    }
                    return e_preventDefault(e)
                }
            }
            var start = posFromMouse(e);
            switch (e_button(e)) {
            case 3:
                if (gecko && !mac) {
                    onContextMenu(e)
                }
                return;
            case 2:
                if (start) {
                    setCursor(start.line, start.ch, true)
                }
                setTimeout(focusInput, 20);
                return
            }
            if (!start) {
                if (e_target(e) == scroller) {
                    e_preventDefault(e)
                }
                return
            }
            if (!focused) {
                onFocus()
            }
            var now = +new Date;
            if (lastDoubleClick && lastDoubleClick.time > now - 400 && posEq(lastDoubleClick.pos, start)) {
                e_preventDefault(e);
                setTimeout(focusInput, 20);
                return selectLine(start.line)
            } else {
                if (lastClick && lastClick.time > now - 400 && posEq(lastClick.pos, start)) {
                    lastDoubleClick = {
                        time: now,
                        pos: start
                    };
                    e_preventDefault(e);
                    return selectWordAt(start)
                } else {
                    lastClick = {
                        time: now,
                        pos: start
                    }
                }
            }
            var last = start,
            going;
            if (options.dragDrop && dragAndDrop && !options.readOnly && !posEq(sel.from, sel.to) && !posLess(start, sel.from) && !posLess(sel.to, start)) {
                if (webkit) {
                    lineSpace.draggable = true
                }
                function dragEnd(e2) {
                    if (webkit) {
                        lineSpace.draggable = false
                    }
                    draggingText = false;
                    up();
                    drop();
                    if (Math.abs(e.clientX - e2.clientX) + Math.abs(e.clientY - e2.clientY) < 10) {
                        e_preventDefault(e2);
                        setCursor(start.line, start.ch, true);
                        focusInput()
                    }
                }
                var up = connect(document, "mouseup", operation(dragEnd), true);
                var drop = connect(scroller, "drop", operation(dragEnd), true);
                draggingText = true;
                if (lineSpace.dragDrop) {
                    lineSpace.dragDrop()
                }
                return
            }
            e_preventDefault(e);
            setCursor(start.line, start.ch, true);
            function extend(e) {
                var cur = posFromMouse(e, true);
                if (cur && !posEq(cur, last)) {
                    if (!focused) {
                        onFocus()
                    }
                    last = cur;
                    setSelectionUser(start, cur);
                    updateInput = false;
                    var visible = visibleLines();
                    if (cur.line >= visible.to || cur.line < visible.from) {
                        going = setTimeout(operation(function() {
                            extend(e)
                        }), 150)
                    }
                }
            }
            function done(e) {
                clearTimeout(going);
                var cur = posFromMouse(e);
                if (cur) {
                    setSelectionUser(start, cur)
                }
                e_preventDefault(e);
                focusInput();
                updateInput = true;
                move();
                up()
            }
            var move = connect(document, "mousemove", operation(function(e) {
                clearTimeout(going);
                e_preventDefault(e);
                if (!ie && !e_button(e)) {
                    done(e)
                } else {
                    extend(e)
                }
            }), true);
            var up = connect(document, "mouseup", operation(done), true)
        }
        function onDoubleClick(e) {
            for (var n = e_target(e); n != wrapper; n = n.parentNode) {
                if (n.parentNode == gutterText) {
                    return e_preventDefault(e)
                }
            }
            var start = posFromMouse(e);
            if (!start) {
                return
            }
            lastDoubleClick = {
                time: +new Date,
                pos: start
            };
            e_preventDefault(e);
            selectWordAt(start)
        }
        function onDrop(e) {
            if (options.onDragEvent && options.onDragEvent(instance, addStop(e))) {
                return
            }
            e.preventDefault();
            var pos = posFromMouse(e, true),
            files = e.dataTransfer.files;
            if (!pos || options.readOnly) {
                return
            }
            if (files && files.length && window.FileReader && window.File) {
                function loadFile(file, i) {
                    var reader = new FileReader;
                    reader.onload = function() {
                        text[i] = reader.result;
                        if (++read == n) {
                            pos = clipPos(pos);
                            operation(function() {
                                var end = replaceRange(text.join(""), pos, pos);
                                setSelectionUser(pos, end)
                            })()
                        }
                    };
                    reader.readAsText(file)
                }
                var n = files.length,
                text = Array(n),
                read = 0;
                for (var i = 0; i < n; ++i) {
                    loadFile(files[i], i)
                }
            } else {
                try {
                    var text = e.dataTransfer.getData("Text");
                    if (text) {
                        compoundChange(function() {
                            var curFrom = sel.from,
                            curTo = sel.to;
                            setSelectionUser(pos, pos);
                            if (draggingText) {
                                replaceRange("", curFrom, curTo)
                            }
                            replaceSelection(text);
                            focusInput()
                        })
                    }
                } catch(e) {}
            }
        }
        function onDragStart(e) {
            var txt = getSelection();
            e.dataTransfer.setData("Text", txt);
            if (gecko || chrome) {
                var img = document.createElement("img");
                img.scr = "data:image/gif;base64,R0lGODdhAgACAIAAAAAAAP///ywAAAAAAgACAAACAoRRADs=";
                e.dataTransfer.setDragImage(img, 0, 0)
            }
        }
        function doHandleBinding(bound, dropShift) {
            if (typeof bound == "string") {
                bound = commands[bound];
                if (!bound) {
                    return false
                }
            }
            var prevShift = shiftSelecting;
            try {
                if (options.readOnly) {
                    suppressEdits = true
                }
                if (dropShift) {
                    shiftSelecting = null
                }
                bound(instance)
            } catch(e) {
                if (e != Pass) {
                    throw e
                }
                return false
            } finally {
                shiftSelecting = prevShift;
                suppressEdits = false
            }
            return true
        }
        function handleKeyBinding(e) {
            var startMap = getKeyMap(options.keyMap),
            next = startMap.auto;
            clearTimeout(maybeTransition);
            if (next && !isModifierKey(e)) {
                maybeTransition = setTimeout(function() {
                    if (getKeyMap(options.keyMap) == startMap) {
                        options.keyMap = (next.call ? next.call(null, instance) : next)
                    }
                },
                50)
            }
            var name = keyNames[e_prop(e, "keyCode")],
            handled = false;
            if (name == null || e.altGraphKey) {
                return false
            }
            if (e_prop(e, "altKey")) {
                name = "Alt-" + name
            }
            if (e_prop(e, "ctrlKey")) {
                name = "Ctrl-" + name
            }
            if (e_prop(e, "metaKey")) {
                name = "Cmd-" + name
            }
            var stopped = false;
            function stop() {
                stopped = true
            }
            if (e_prop(e, "shiftKey")) {
                handled = lookupKey("Shift-" + name, options.extraKeys, options.keyMap,
                function(b) {
                    return doHandleBinding(b, true)
                },
                stop) || lookupKey(name, options.extraKeys, options.keyMap,
                function(b) {
                    if (typeof b == "string" && /^go[A-Z]/.test(b)) {
                        return doHandleBinding(b)
                    }
                },
                stop)
            } else {
                handled = lookupKey(name, options.extraKeys, options.keyMap, doHandleBinding, stop)
            }
            if (stopped) {
                handled = false
            }
            if (handled) {
                e_preventDefault(e);
                restartBlink();
                if (ie) {
                    e.oldKeyCode = e.keyCode;
                    e.keyCode = 0
                }
            }
            return handled
        }
        function handleCharBinding(e, ch) {
            var handled = lookupKey("'" + ch + "'", options.extraKeys, options.keyMap,
            function(b) {
                return doHandleBinding(b, true)
            });
            if (handled) {
                e_preventDefault(e);
                restartBlink()
            }
            return handled
        }
        var lastStoppedKey = null,
        maybeTransition;
        function onKeyDown(e) {
            if (!focused) {
                onFocus()
            }
            if (ie && e.keyCode == 27) {
                e.returnValue = false
            }
            if (pollingFast) {
                if (readInput()) {
                    pollingFast = false
                }
            }
            if (options.onKeyEvent && options.onKeyEvent(instance, addStop(e))) {
                return
            }
            var code = e_prop(e, "keyCode");
            setShift(code == 16 || e_prop(e, "shiftKey"));
            var handled = handleKeyBinding(e);
            if (window.opera) {
                lastStoppedKey = handled ? code: null;
                if (!handled && code == 88 && e_prop(e, mac ? "metaKey": "ctrlKey")) {
                    replaceSelection("")
                }
            }
        }
        function onKeyPress(e) {
            if (pollingFast) {
                readInput()
            }
            if (options.onKeyEvent && options.onKeyEvent(instance, addStop(e))) {
                return
            }
            var keyCode = e_prop(e, "keyCode"),
            charCode = e_prop(e, "charCode");
            if (window.opera && keyCode == lastStoppedKey) {
                lastStoppedKey = null;
                e_preventDefault(e);
                return
            }
            if (((window.opera && (!e.which || e.which < 10)) || khtml) && handleKeyBinding(e)) {
                return
            }
            var ch = String.fromCharCode(charCode == null ? keyCode: charCode);
            if (options.electricChars && mode.electricChars && options.smartIndent && !options.readOnly) {
                if (mode.electricChars.indexOf(ch) > -1) {
                    setTimeout(operation(function() {
                        indentLine(sel.to.line, "smart")
                    }), 75)
                }
            }
            if (handleCharBinding(e, ch)) {
                return
            }
            fastPoll()
        }
        function onKeyUp(e) {
            if (options.onKeyEvent && options.onKeyEvent(instance, addStop(e))) {
                return
            }
            if (e_prop(e, "keyCode") == 16) {
                shiftSelecting = null
            }
        }
        function onFocus() {
            if (options.readOnly == "nocursor") {
                return
            }
            if (!focused) {
                if (options.onFocus) {
                    options.onFocus(instance)
                }
                focused = true;
                if (wrapper.className.search(/\bCodeMirror-focused\b/) == -1) {
                    wrapper.className += " CodeMirror-focused"
                }
                if (!leaveInputAlone) {
                    resetInput(true)
                }
            }
            slowPoll();
            restartBlink()
        }
        function onBlur() {
            if (focused) {
                if (options.onBlur) {
                    options.onBlur(instance)
                }
                focused = false;
                if (bracketHighlighted) {
                    operation(function() {
                        if (bracketHighlighted) {
                            bracketHighlighted();
                            bracketHighlighted = null
                        }
                    })()
                }
                wrapper.className = wrapper.className.replace(" CodeMirror-focused", "")
            }
            clearInterval(blinker);
            setTimeout(function() {
                if (!focused) {
                    shiftSelecting = null
                }
            },
            150)
        }
        function updateLines(from, to, newText, selFrom, selTo) {
            if (suppressEdits) {
                return
            }
            if (history) {
                var old = [];
                doc.iter(from.line, to.line + 1,
                function(line) {
                    old.push(line.text)
                });
                history.addChange(from.line, newText.length, old);
                while (history.done.length > options.undoDepth) {
                    history.done.shift()
                }
            }
            updateLinesNoUndo(from, to, newText, selFrom, selTo)
        }
        function unredoHelper(from, to) {
            if (!from.length) {
                return
            }
            var set = from.pop(),
            out = [];
            for (var i = set.length - 1; i >= 0; i -= 1) {
                var change = set[i];
                var replaced = [],
                end = change.start + change.added;
                doc.iter(change.start, end,
                function(line) {
                    replaced.push(line.text)
                });
                out.push({
                    start: change.start,
                    added: change.old.length,
                    old: replaced
                });
                var pos = clipPos({
                    line: change.start + change.old.length - 1,
                    ch: editEnd(replaced[replaced.length - 1], change.old[change.old.length - 1])
                });
                updateLinesNoUndo({
                    line: change.start,
                    ch: 0
                },
                {
                    line: end - 1,
                    ch: getLine(end - 1).text.length
                },
                change.old, pos, pos)
            }
            updateInput = true;
            to.push(out)
        }
        function undo() {
            unredoHelper(history.done, history.undone)
        }
        function redo() {
            unredoHelper(history.undone, history.done)
        }
        function updateLinesNoUndo(from, to, newText, selFrom, selTo) {
            if (suppressEdits) {
                return
            }
            var recomputeMaxLength = false,
            maxLineLength = maxLine.length;
            if (!options.lineWrapping) {
                doc.iter(from.line, to.line + 1,
                function(line) {
                    if (!line.hidden && line.text.length == maxLineLength) {
                        recomputeMaxLength = true;
                        return true
                    }
                })
            }
            if (from.line != to.line || newText.length > 1) {
                gutterDirty = true
            }
            var nlines = to.line - from.line,
            firstLine = getLine(from.line),
            lastLine = getLine(to.line);
            if (from.ch == 0 && to.ch == 0 && newText[newText.length - 1] == "") {
                var added = [],
                prevLine = null;
                if (from.line) {
                    prevLine = getLine(from.line - 1);
                    prevLine.fixMarkEnds(lastLine)
                } else {
                    lastLine.fixMarkStarts()
                }
                for (var i = 0,
                e = newText.length - 1; i < e; ++i) {
                    added.push(Line.inheritMarks(newText[i], prevLine))
                }
                if (nlines) {
                    doc.remove(from.line, nlines, callbacks)
                }
                if (added.length) {
                    doc.insert(from.line, added)
                }
            } else {
                if (firstLine == lastLine) {
                    if (newText.length == 1) {
                        firstLine.replace(from.ch, to.ch, newText[0])
                    } else {
                        lastLine = firstLine.split(to.ch, newText[newText.length - 1]);
                        firstLine.replace(from.ch, null, newText[0]);
                        firstLine.fixMarkEnds(lastLine);
                        var added = [];
                        for (var i = 1,
                        e = newText.length - 1; i < e; ++i) {
                            added.push(Line.inheritMarks(newText[i], firstLine))
                        }
                        added.push(lastLine);
                        doc.insert(from.line + 1, added)
                    }
                } else {
                    if (newText.length == 1) {
                        firstLine.replace(from.ch, null, newText[0]);
                        lastLine.replace(null, to.ch, "");
                        firstLine.append(lastLine);
                        doc.remove(from.line + 1, nlines, callbacks)
                    } else {
                        var added = [];
                        firstLine.replace(from.ch, null, newText[0]);
                        lastLine.replace(null, to.ch, newText[newText.length - 1]);
                        firstLine.fixMarkEnds(lastLine);
                        for (var i = 1,
                        e = newText.length - 1; i < e; ++i) {
                            added.push(Line.inheritMarks(newText[i], firstLine))
                        }
                        if (nlines > 1) {
                            doc.remove(from.line + 1, nlines - 1, callbacks)
                        }
                        doc.insert(from.line + 1, added)
                    }
                }
            }
            if (options.lineWrapping) {
                var perLine = Math.max(5, scroller.clientWidth / charWidth() - 3);
                doc.iter(from.line, from.line + newText.length,
                function(line) {
                    if (line.hidden) {
                        return
                    }
                    var guess = Math.ceil(line.text.length / perLine) || 1;
                    if (guess != line.height) {
                        updateLineHeight(line, guess)
                    }
                })
            } else {
                doc.iter(from.line, from.line + newText.length,
                function(line) {
                    var l = line.text;
                    if (!line.hidden && l.length > maxLineLength) {
                        maxLine = l;
                        maxLineLength = l.length;
                        maxWidth = null;
                        recomputeMaxLength = false
                    }
                });
                if (recomputeMaxLength) {
                    maxLengthChanged = true
                }
            }
            var newWork = [],
            lendiff = newText.length - nlines - 1;
            for (var i = 0,
            l = work.length; i < l; ++i) {
                var task = work[i];
                if (task < from.line) {
                    newWork.push(task)
                } else {
                    if (task > to.line) {
                        newWork.push(task + lendiff)
                    }
                }
            }
            var hlEnd = from.line + Math.min(newText.length, 500);
            highlightLines(from.line, hlEnd);
            newWork.push(hlEnd);
            work = newWork;
            startWorker(100);
            changes.push({
                from: from.line,
                to: to.line + 1,
                diff: lendiff
            });
            var changeObj = {
                from: from,
                to: to,
                text: newText
            };
            if (textChanged) {
                for (var cur = textChanged; cur.next; cur = cur.next) {}
                cur.next = changeObj
            } else {
                textChanged = changeObj
            }
            function updateLine(n) {
                return n <= Math.min(to.line, to.line + lendiff) ? n: n + lendiff
            }
            setSelection(selFrom, selTo, updateLine(sel.from.line), updateLine(sel.to.line));
            if (scroller.clientHeight) {
                code.style.height = (doc.height * textHeight() + 2 * paddingTop()) + "px"
            }
        }
        function computeMaxLength() {
            var maxLineLength = 0;
            maxLine = "";
            maxWidth = null;
            doc.iter(0, doc.size,
            function(line) {
                var l = line.text;
                if (!line.hidden && l.length > maxLineLength) {
                    maxLineLength = l.length;
                    maxLine = l
                }
            });
            maxLengthChanged = false
        }
        function replaceRange(code, from, to) {
            from = clipPos(from);
            if (!to) {
                to = from
            } else {
                to = clipPos(to)
            }
            code = splitLines(code);
            function adjustPos(pos) {
                if (posLess(pos, from)) {
                    return pos
                }
                if (!posLess(to, pos)) {
                    return end
                }
                var line = pos.line + code.length - (to.line - from.line) - 1;
                var ch = pos.ch;
                if (pos.line == to.line) {
                    ch += code[code.length - 1].length - (to.ch - (to.line == from.line ? from.ch: 0))
                }
                return {
                    line: line,
                    ch: ch
                }
            }
            var end;
            replaceRange1(code, from, to,
            function(end1) {
                end = end1;
                return {
                    from: adjustPos(sel.from),
                    to: adjustPos(sel.to)
                }
            });
            return end
        }
        function replaceSelection(code, collapse) {
            replaceRange1(splitLines(code), sel.from, sel.to,
            function(end) {
                if (collapse == "end") {
                    return {
                        from: end,
                        to: end
                    }
                } else {
                    if (collapse == "start") {
                        return {
                            from: sel.from,
                            to: sel.from
                        }
                    } else {
                        return {
                            from: sel.from,
                            to: end
                        }
                    }
                }
            })
        }
        function replaceRange1(code, from, to, computeSel) {
            var endch = code.length == 1 ? code[0].length + from.ch: code[code.length - 1].length;
            var newSel = computeSel({
                line: from.line + code.length - 1,
                ch: endch
            });
            updateLines(from, to, code, newSel.from, newSel.to)
        }
        function getRange(from, to) {
            var l1 = from.line,
            l2 = to.line;
            if (l1 == l2) {
                return getLine(l1).text.slice(from.ch, to.ch)
            }
            var code = [getLine(l1).text.slice(from.ch)];
            doc.iter(l1 + 1, l2,
            function(line) {
                code.push(line.text)
            });
            code.push(getLine(l2).text.slice(0, to.ch));
            return code.join("\n")
        }
        function getSelection() {
            return getRange(sel.from, sel.to)
        }
        var pollingFast = false;
        function slowPoll() {
            if (pollingFast) {
                return
            }
            poll.set(options.pollInterval,
            function() {
                startOperation();
                readInput();
                if (focused) {
                    slowPoll()
                }
                endOperation()
            })
        }
        function fastPoll() {
            var missed = false;
            pollingFast = true;
            function p() {
                startOperation();
                var changed = readInput();
                if (!changed && !missed) {
                    missed = true;
                    poll.set(60, p)
                } else {
                    pollingFast = false;
                    slowPoll()
                }
                endOperation()
            }
            poll.set(20, p)
        }
        var prevInput = "";
        function readInput() {
            if (leaveInputAlone || !focused || hasSelection(input) || options.readOnly) {
                return false
            }
            var text = input.value;
            if (text == prevInput) {
                return false
            }
            shiftSelecting = null;
            var same = 0,
            l = Math.min(prevInput.length, text.length);
            while (same < l && prevInput[same] == text[same]) {++same
            }
            if (same < prevInput.length) {
                sel.from = {
                    line: sel.from.line,
                    ch: sel.from.ch - (prevInput.length - same)
                }
            } else {
                if (overwrite && posEq(sel.from, sel.to)) {
                    sel.to = {
                        line: sel.to.line,
                        ch: Math.min(getLine(sel.to.line).text.length, sel.to.ch + (text.length - same))
                    }
                }
            }
            replaceSelection(text.slice(same), "end");
            if (text.length > 1000) {
                input.value = prevInput = ""
            } else {
                prevInput = text
            }
            return true
        }
        function resetInput(user) {
            if (!posEq(sel.from, sel.to)) {
                prevInput = "";
                input.value = getSelection();
                selectInput(input)
            } else {
                if (user) {
                    prevInput = input.value = ""
                }
            }
        }
        function focusInput() {
            if (options.readOnly != "nocursor") {
                input.focus()
            }
        }
        function scrollEditorIntoView() {
            if (!cursor.getBoundingClientRect) {
                return
            }
            var rect = cursor.getBoundingClientRect();
            if (ie && rect.top == rect.bottom) {
                return
            }
            var winH = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
            if (rect.top < 0 || rect.bottom > winH) {
                cursor.scrollIntoView()
            }
        }
        function scrollCursorIntoView() {
            var cursor = localCoords(sel.inverted ? sel.from: sel.to);
            var x = options.lineWrapping ? Math.min(cursor.x, lineSpace.offsetWidth) : cursor.x;
            return scrollIntoView(x, cursor.y, x, cursor.yBot)
        }
        function scrollIntoView(x1, y1, x2, y2) {
            var pl = paddingLeft(),
            pt = paddingTop();
            y1 += pt;
            y2 += pt;
            x1 += pl;
            x2 += pl;
            var screen = scroller.clientHeight,
            screentop = scroller.scrollTop,
            scrolled = false,
            result = true;
            if (y1 < screentop) {
                scroller.scrollTop = Math.max(0, y1);
                scrolled = true
            } else {
                if (y2 > screentop + screen) {
                    scroller.scrollTop = y2 - screen;
                    scrolled = true
                }
            }
            var screenw = scroller.clientWidth,
            screenleft = scroller.scrollLeft;
            var gutterw = options.fixedGutter ? gutter.clientWidth: 0;
            var atLeft = x1 < gutterw + pl + 10;
            if (x1 < screenleft + gutterw || atLeft) {
                if (atLeft) {
                    x1 = 0
                }
                scroller.scrollLeft = Math.max(0, x1 - 10 - gutterw);
                scrolled = true
            } else {
                if (x2 > screenw + screenleft - 3) {
                    scroller.scrollLeft = x2 + 10 - screenw;
                    scrolled = true;
                    if (x2 > code.clientWidth) {
                        result = false
                    }
                }
            }
            if (scrolled && options.onScroll) {
                options.onScroll(instance)
            }
            return result
        }
        function visibleLines() {
            var lh = textHeight(),
            top = scroller.scrollTop - paddingTop();
            var fromHeight = Math.max(0, Math.floor(top / lh));
            var toHeight = Math.ceil((top + scroller.clientHeight) / lh);
            return {
                from: lineAtHeight(doc, fromHeight),
                to: lineAtHeight(doc, toHeight)
            }
        }
        function updateDisplay(changes, suppressCallback) {
            if (!scroller.clientWidth) {
                showingFrom = showingTo = displayOffset = 0;
                return
            }
            var visible = visibleLines();
            if (changes !== true && changes.length == 0 && visible.from > showingFrom && visible.to < showingTo) {
                return
            }
            var from = Math.max(visible.from - 100, 0),
            to = Math.min(doc.size, visible.to + 100);
            if (showingFrom < from && from - showingFrom < 20) {
                from = showingFrom
            }
            if (showingTo > to && showingTo - to < 20) {
                to = Math.min(doc.size, showingTo)
            }
            var intact = changes === true ? [] : computeIntact([{
                from: showingFrom,
                to: showingTo,
                domStart: 0
            }], changes);
            var intactLines = 0;
            for (var i = 0; i < intact.length; ++i) {
                var range = intact[i];
                if (range.from < from) {
                    range.domStart += (from - range.from);
                    range.from = from
                }
                if (range.to > to) {
                    range.to = to
                }
                if (range.from >= range.to) {
                    intact.splice(i--, 1)
                } else {
                    intactLines += range.to - range.from
                }
            }
            if (intactLines == to - from && from == showingFrom && to == showingTo) {
                return
            }
            intact.sort(function(a, b) {
                return a.domStart - b.domStart
            });
            var th = textHeight(),
            gutterDisplay = gutter.style.display;
            lineDiv.style.display = "none";
            patchDisplay(from, to, intact);
            lineDiv.style.display = gutter.style.display = "";
            var different = from != showingFrom || to != showingTo || lastSizeC != scroller.clientHeight + th;
            if (different) {
                lastSizeC = scroller.clientHeight + th
            }
            showingFrom = from;
            showingTo = to;
            displayOffset = heightAtLine(doc, from);
            mover.style.top = (displayOffset * th) + "px";
            if (scroller.clientHeight) {
                code.style.height = (doc.height * th + 2 * paddingTop()) + "px"
            }
            if (lineDiv.childNodes.length != showingTo - showingFrom) {
                throw new Error("BAD PATCH! " + JSON.stringify(intact) + " size=" + (showingTo - showingFrom) + " nodes=" + lineDiv.childNodes.length)
            }
            function checkHeights() {
                maxWidth = scroller.clientWidth;
                var curNode = lineDiv.firstChild,
                heightChanged = false;
                doc.iter(showingFrom, showingTo,
                function(line) {
                    if (!line.hidden) {
                        var height = Math.round(curNode.offsetHeight / th) || 1;
                        if (line.height != height) {
                            updateLineHeight(line, height);
                            gutterDirty = heightChanged = true
                        }
                    }
                    curNode = curNode.nextSibling
                });
                if (heightChanged) {
                    code.style.height = (doc.height * th + 2 * paddingTop()) + "px"
                }
                return heightChanged
            }
            if (options.lineWrapping) {
                checkHeights()
            } else {
                if (maxWidth == null) {
                    maxWidth = stringWidth(maxLine)
                }
                if (maxWidth > scroller.clientWidth) {
                    lineSpace.style.width = maxWidth + "px";
                    code.style.width = "";
                    code.style.width = scroller.scrollWidth + "px"
                } else {
                    lineSpace.style.width = code.style.width = ""
                }
            }
            gutter.style.display = gutterDisplay;
            if (different || gutterDirty) {
                updateGutter() && options.lineWrapping && checkHeights() && updateGutter()
            }
            updateSelection();
            if (!suppressCallback && options.onUpdate) {
                options.onUpdate(instance)
            }
            return true
        }
        function computeIntact(intact, changes) {
            for (var i = 0,
            l = changes.length || 0; i < l; ++i) {
                var change = changes[i],
                intact2 = [],
                diff = change.diff || 0;
                for (var j = 0,
                l2 = intact.length; j < l2; ++j) {
                    var range = intact[j];
                    if (change.to <= range.from && change.diff) {
                        intact2.push({
                            from: range.from + diff,
                            to: range.to + diff,
                            domStart: range.domStart
                        })
                    } else {
                        if (change.to <= range.from || change.from >= range.to) {
                            intact2.push(range)
                        } else {
                            if (change.from > range.from) {
                                intact2.push({
                                    from: range.from,
                                    to: change.from,
                                    domStart: range.domStart
                                })
                            }
                            if (change.to < range.to) {
                                intact2.push({
                                    from: change.to + diff,
                                    to: range.to + diff,
                                    domStart: range.domStart + (change.to - range.from)
                                })
                            }
                        }
                    }
                }
                intact = intact2
            }
            return intact
        }
        function patchDisplay(from, to, intact) {
            if (!intact.length) {
                lineDiv.innerHTML = ""
            } else {
                function killNode(node) {
                    var tmp = node.nextSibling;
                    node.parentNode.removeChild(node);
                    return tmp
                }
                var domPos = 0,
                curNode = lineDiv.firstChild,
                n;
                for (var i = 0; i < intact.length; ++i) {
                    var cur = intact[i];
                    while (cur.domStart > domPos) {
                        curNode = killNode(curNode);
                        domPos++
                    }
                    for (var j = 0,
                    e = cur.to - cur.from; j < e; ++j) {
                        curNode = curNode.nextSibling;
                        domPos++
                    }
                }
                while (curNode) {
                    curNode = killNode(curNode)
                }
            }
            var nextIntact = intact.shift(),
            curNode = lineDiv.firstChild,
            j = from;
            var scratch = document.createElement("div");
            doc.iter(from, to,
            function(line) {
                if (nextIntact && nextIntact.to == j) {
                    nextIntact = intact.shift()
                }
                if (!nextIntact || nextIntact.from > j) {
                    if (line.hidden) {
                        var html = scratch.innerHTML = "<pre></pre>"
                    } else {
                        var html = "<pre" + (line.className ? ' class="' + line.className + '"': "") + ">" + line.getHTML(makeTab) + "</pre>";
                        if (line.bgClassName) {
                            html = '<div style="position: relative"><pre class="' + line.bgClassName + '" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: -2">&#160;</pre>' + html + "</div>"
                        }
                    }
                    scratch.innerHTML = html;
                    lineDiv.insertBefore(scratch.firstChild, curNode)
                } else {
                    curNode = curNode.nextSibling
                }++j
            })
        }
        function updateGutter() {
            if (!options.gutter && !options.lineNumbers) {
                return
            }
            var hText = mover.offsetHeight,
            hEditor = scroller.clientHeight;
            gutter.style.height = (hText - hEditor < 2 ? hEditor: hText) + "px";
            var html = [],
            i = showingFrom,
            normalNode;
            doc.iter(showingFrom, Math.max(showingTo, showingFrom + 1),
            function(line) {
                if (line.hidden) {
                    html.push("<pre></pre>")
                } else {
                    var marker = line.gutterMarker;
                    var text = options.lineNumbers ? i + options.firstLineNumber: null;
                    if (marker && marker.text) {
                        text = marker.text.replace("%N%", text != null ? text: "")
                    } else {
                        if (text == null) {
                            text = "\u00a0"
                        }
                    }
                    html.push((marker && marker.style ? '<pre class="' + marker.style + '">': "<pre>"), text);
                    for (var j = 1; j < line.height; ++j) {
                        html.push("<br/>&#160;")
                    }
                    html.push("</pre>");
                    if (!marker) {
                        normalNode = i
                    }
                }++i
            });
            gutter.style.display = "none";
            gutterText.innerHTML = html.join("");
            if (normalNode != null) {
                var node = gutterText.childNodes[normalNode - showingFrom];
                var minwidth = String(doc.size).length,
                val = eltText(node),
                pad = "";
                while (val.length + pad.length < minwidth) {
                    pad += "\u00a0"
                }
                if (pad) {
                    node.insertBefore(document.createTextNode(pad), node.firstChild)
                }
            }
            gutter.style.display = "";
            var resized = Math.abs((parseInt(lineSpace.style.marginLeft) || 0) - gutter.offsetWidth) > 2;
            lineSpace.style.marginLeft = gutter.offsetWidth + "px";
            gutterDirty = false;
            return resized
        }
        function updateSelection() {
            var collapsed = posEq(sel.from, sel.to);
            var fromPos = localCoords(sel.from, true);
            var toPos = collapsed ? fromPos: localCoords(sel.to, true);
            var headPos = sel.inverted ? fromPos: toPos,
            th = textHeight();
            var wrapOff = eltOffset(wrapper),
            lineOff = eltOffset(lineDiv);
            inputDiv.style.top = Math.max(0, Math.min(scroller.offsetHeight, headPos.y + lineOff.top - wrapOff.top)) + "px";
            inputDiv.style.left = Math.max(0, Math.min(scroller.offsetWidth, headPos.x + lineOff.left - wrapOff.left)) + "px";
            if (collapsed) {
                cursor.style.top = headPos.y + "px";
                cursor.style.left = (options.lineWrapping ? Math.min(headPos.x, lineSpace.offsetWidth) : headPos.x) + "px";
                cursor.style.display = "";
                selectionDiv.style.display = "none"
            } else {
                var sameLine = fromPos.y == toPos.y,
                html = "";
                var clientWidth = lineSpace.clientWidth || lineSpace.offsetWidth;
                var clientHeight = lineSpace.clientHeight || lineSpace.offsetHeight;
                function add(left, top, right, height) {
                    var rstyle = quirksMode ? "width: " + (!right ? clientWidth: clientWidth - right - left) + "px": "right: " + right + "px";
                    html += '<div class="CodeMirror-selected" style="position: absolute; left: ' + left + "px; top: " + top + "px; " + rstyle + "; height: " + height + 'px"></div>'
                }
                if (sel.from.ch && fromPos.y >= 0) {
                    var right = sameLine ? clientWidth - toPos.x: 0;
                    add(fromPos.x, fromPos.y, right, th)
                }
                var middleStart = Math.max(0, fromPos.y + (sel.from.ch ? th: 0));
                var middleHeight = Math.min(toPos.y, clientHeight) - middleStart;
                if (middleHeight > 0.2 * th) {
                    add(0, middleStart, 0, middleHeight)
                }
                if ((!sameLine || !sel.from.ch) && toPos.y < clientHeight - 0.5 * th) {
                    add(0, toPos.y, clientWidth - toPos.x, th)
                }
                selectionDiv.innerHTML = html;
                cursor.style.display = "none";
                selectionDiv.style.display = ""
            }
        }
        function setShift(val) {
            if (val) {
                shiftSelecting = shiftSelecting || (sel.inverted ? sel.to: sel.from)
            } else {
                shiftSelecting = null
            }
        }
        function setSelectionUser(from, to) {
            var sh = shiftSelecting && clipPos(shiftSelecting);
            if (sh) {
                if (posLess(sh, from)) {
                    from = sh
                } else {
                    if (posLess(to, sh)) {
                        to = sh
                    }
                }
            }
            setSelection(from, to);
            userSelChange = true
        }
        function setSelection(from, to, oldFrom, oldTo) {
            goalColumn = null;
            if (oldFrom == null) {
                oldFrom = sel.from.line;
                oldTo = sel.to.line
            }
            if (posEq(sel.from, from) && posEq(sel.to, to)) {
                return
            }
            if (posLess(to, from)) {
                var tmp = to;
                to = from;
                from = tmp
            }
            if (from.line != oldFrom) {
                var from1 = skipHidden(from, oldFrom, sel.from.ch);
                if (!from1) {
                    setLineHidden(from.line, false)
                } else {
                    from = from1
                }
            }
            if (to.line != oldTo) {
                to = skipHidden(to, oldTo, sel.to.ch)
            }
            if (posEq(from, to)) {
                sel.inverted = false
            } else {
                if (posEq(from, sel.to)) {
                    sel.inverted = false
                } else {
                    if (posEq(to, sel.from)) {
                        sel.inverted = true
                    }
                }
            }
            if (options.autoClearEmptyLines && posEq(sel.from, sel.to)) {
                var head = sel.inverted ? from: to;
                if (head.line != sel.from.line && sel.from.line < doc.size) {
                    var oldLine = getLine(sel.from.line);
                    if (/^\s+$/.test(oldLine.text)) {
                        setTimeout(operation(function() {
                            if (oldLine.parent && /^\s+$/.test(oldLine.text)) {
                                var no = lineNo(oldLine);
                                replaceRange("", {
                                    line: no,
                                    ch: 0
                                },
                                {
                                    line: no,
                                    ch: oldLine.text.length
                                })
                            }
                        },
                        10))
                    }
                }
            }
            sel.from = from;
            sel.to = to;
            selectionChanged = true
        }
        function skipHidden(pos, oldLine, oldCh) {
            function getNonHidden(dir) {
                var lNo = pos.line + dir,
                end = dir == 1 ? doc.size: -1;
                while (lNo != end) {
                    var line = getLine(lNo);
                    if (!line.hidden) {
                        var ch = pos.ch;
                        if (toEnd || ch > oldCh || ch > line.text.length) {
                            ch = line.text.length
                        }
                        return {
                            line: lNo,
                            ch: ch
                        }
                    }
                    lNo += dir
                }
            }
            var line = getLine(pos.line);
            var toEnd = pos.ch == line.text.length && pos.ch != oldCh;
            if (!line.hidden) {
                return pos
            }
            if (pos.line >= oldLine) {
                return getNonHidden(1) || getNonHidden( - 1)
            } else {
                return getNonHidden( - 1) || getNonHidden(1)
            }
        }
        function setCursor(line, ch, user) {
            var pos = clipPos({
                line: line,
                ch: ch || 0
            }); (user ? setSelectionUser: setSelection)(pos, pos)
        }
        function clipLine(n) {
            return Math.max(0, Math.min(n, doc.size - 1))
        }
        function clipPos(pos) {
            if (pos.line < 0) {
                return {
                    line: 0,
                    ch: 0
                }
            }
            if (pos.line >= doc.size) {
                return {
                    line: doc.size - 1,
                    ch: getLine(doc.size - 1).text.length
                }
            }
            var ch = pos.ch,
            linelen = getLine(pos.line).text.length;
            if (ch == null || ch > linelen) {
                return {
                    line: pos.line,
                    ch: linelen
                }
            } else {
                if (ch < 0) {
                    return {
                        line: pos.line,
                        ch: 0
                    }
                } else {
                    return pos
                }
            }
        }
        function findPosH(dir, unit) {
            var end = sel.inverted ? sel.from: sel.to,
            line = end.line,
            ch = end.ch;
            var lineObj = getLine(line);
            function findNextLine() {
                for (var l = line + dir,
                e = dir < 0 ? -1 : doc.size; l != e; l += dir) {
                    var lo = getLine(l);
                    if (!lo.hidden) {
                        line = l;
                        lineObj = lo;
                        return true
                    }
                }
            }
            function moveOnce(boundToLine) {
                if (ch == (dir < 0 ? 0 : lineObj.text.length)) {
                    if (!boundToLine && findNextLine()) {
                        ch = dir < 0 ? lineObj.text.length: 0
                    } else {
                        return false
                    }
                } else {
                    ch += dir
                }
                return true
            }
            if (unit == "char") {
                moveOnce()
            } else {
                if (unit == "column") {
                    moveOnce(true)
                } else {
                    if (unit == "word") {
                        var sawWord = false;
                        for (;;) {
                            if (dir < 0) {
                                if (!moveOnce()) {
                                    break
                                }
                            }
                            if (isWordChar(lineObj.text.charAt(ch))) {
                                sawWord = true
                            } else {
                                if (sawWord) {
                                    if (dir < 0) {
                                        dir = 1;
                                        moveOnce()
                                    }
                                    break
                                }
                            }
                            if (dir > 0) {
                                if (!moveOnce()) {
                                    break
                                }
                            }
                        }
                    }
                }
            }
            return {
                line: line,
                ch: ch
            }
        }
        function moveH(dir, unit) {
            var pos = dir < 0 ? sel.from: sel.to;
            if (shiftSelecting || posEq(sel.from, sel.to)) {
                pos = findPosH(dir, unit)
            }
            setCursor(pos.line, pos.ch, true)
        }
        function deleteH(dir, unit) {
            if (!posEq(sel.from, sel.to)) {
                replaceRange("", sel.from, sel.to)
            } else {
                if (dir < 0) {
                    replaceRange("", findPosH(dir, unit), sel.to)
                } else {
                    replaceRange("", sel.from, findPosH(dir, unit))
                }
            }
            userSelChange = true
        }
        var goalColumn = null;
        function moveV(dir, unit) {
            var dist = 0,
            pos = localCoords(sel.inverted ? sel.from: sel.to, true);
            if (goalColumn != null) {
                pos.x = goalColumn
            }
            if (unit == "page") {
                dist = Math.min(scroller.clientHeight, window.innerHeight || document.documentElement.clientHeight)
            } else {
                if (unit == "line") {
                    dist = textHeight()
                }
            }
            var target = coordsChar(pos.x, pos.y + dist * dir + 2);
            if (unit == "page") {
                scroller.scrollTop += localCoords(target, true).y - pos.y
            }
            setCursor(target.line, target.ch, true);
            goalColumn = pos.x
        }
        function selectWordAt(pos) {
            var line = getLine(pos.line).text;
            var start = pos.ch,
            end = pos.ch;
            while (start > 0 && isWordChar(line.charAt(start - 1))) {--start
            }
            while (end < line.length && isWordChar(line.charAt(end))) {++end
            }
            setSelectionUser({
                line: pos.line,
                ch: start
            },
            {
                line: pos.line,
                ch: end
            })
        }
        function selectLine(line) {
            setSelectionUser({
                line: line,
                ch: 0
            },
            clipPos({
                line: line + 1,
                ch: 0
            }))
        }
        function indentSelected(mode) {
            if (posEq(sel.from, sel.to)) {
                return indentLine(sel.from.line, mode)
            }
            var e = sel.to.line - (sel.to.ch ? 0 : 1);
            for (var i = sel.from.line; i <= e; ++i) {
                indentLine(i, mode)
            }
        }
        function indentLine(n, how) {
            if (!how) {
                how = "add"
            }
            if (how == "smart") {
                if (!mode.indent) {
                    how = "prev"
                } else {
                    var state = getStateBefore(n)
                }
            }
            var line = getLine(n),
            curSpace = line.indentation(options.tabSize),
            curSpaceString = line.text.match(/^\s*/)[0],
            indentation;
            if (how == "prev") {
                if (n) {
                    indentation = getLine(n - 1).indentation(options.tabSize)
                } else {
                    indentation = 0
                }
            } else {
                if (how == "smart") {
                    indentation = mode.indent(state, line.text.slice(curSpaceString.length), line.text)
                } else {
                    if (how == "add") {
                        indentation = curSpace + options.indentUnit
                    } else {
                        if (how == "subtract") {
                            indentation = curSpace - options.indentUnit
                        }
                    }
                }
            }
            indentation = Math.max(0, indentation);
            var diff = indentation - curSpace;
            if (!diff) {
                if (sel.from.line != n && sel.to.line != n) {
                    return
                }
                var indentString = curSpaceString
            } else {
                var indentString = "",
                pos = 0;
                if (options.indentWithTabs) {
                    for (var i = Math.floor(indentation / options.tabSize); i; --i) {
                        pos += options.tabSize;
                        indentString += "\t"
                    }
                }
                while (pos < indentation) {++pos;
                    indentString += " "
                }
            }
            replaceRange(indentString, {
                line: n,
                ch: 0
            },
            {
                line: n,
                ch: curSpaceString.length
            })
        }
        function loadMode() {
            mode = CodeMirror.getMode(options, options.mode);
            doc.iter(0, doc.size,
            function(line) {
                line.stateAfter = null
            });
            work = [0];
            startWorker()
        }
        function gutterChanged() {
            var visible = options.gutter || options.lineNumbers;
            gutter.style.display = visible ? "": "none";
            if (visible) {
                gutterDirty = true
            } else {
                lineDiv.parentNode.style.marginLeft = 0
            }
        }
        function wrappingChanged(from, to) {
            if (options.lineWrapping) {
                wrapper.className += " CodeMirror-wrap";
                var perLine = scroller.clientWidth / charWidth() - 3;
                doc.iter(0, doc.size,
                function(line) {
                    if (line.hidden) {
                        return
                    }
                    var guess = Math.ceil(line.text.length / perLine) || 1;
                    if (guess != 1) {
                        updateLineHeight(line, guess)
                    }
                });
                lineSpace.style.width = code.style.width = ""
            } else {
                wrapper.className = wrapper.className.replace(" CodeMirror-wrap", "");
                maxWidth = null;
                maxLine = "";
                doc.iter(0, doc.size,
                function(line) {
                    if (line.height != 1 && !line.hidden) {
                        updateLineHeight(line, 1)
                    }
                    if (line.text.length > maxLine.length) {
                        maxLine = line.text
                    }
                })
            }
            changes.push({
                from: 0,
                to: doc.size
            })
        }
        function makeTab(col) {
            var w = options.tabSize - col % options.tabSize,
            cached = tabCache[w];
            if (cached) {
                return cached
            }
            for (var str = '<span class="cm-tab">',
            i = 0; i < w; ++i) {
                str += " "
            }
            return (tabCache[w] = {
                html: str + "</span>",
                width: w
            })
        }
        function themeChanged() {
            scroller.className = scroller.className.replace(/\s*cm-s-\S+/g, "") + options.theme.replace(/(^|\s)\s*/g, " cm-s-")
        }
        function keyMapChanged() {
            var style = keyMap[options.keyMap].style;
            wrapper.className = wrapper.className.replace(/\s*cm-keymap-\S+/g, "") + (style ? " cm-keymap-" + style: "")
        }
        function TextMarker() {
            this.set = []
        }
        TextMarker.prototype.clear = operation(function() {
            var min = Infinity,
            max = -Infinity;
            for (var i = 0,
            e = this.set.length; i < e; ++i) {
                var line = this.set[i],
                mk = line.marked;
                if (!mk || !line.parent) {
                    continue
                }
                var lineN = lineNo(line);
                min = Math.min(min, lineN);
                max = Math.max(max, lineN);
                for (var j = 0; j < mk.length; ++j) {
                    if (mk[j].marker == this) {
                        mk.splice(j--, 1)
                    }
                }
            }
            if (min != Infinity) {
                changes.push({
                    from: min,
                    to: max + 1
                })
            }
        });
        TextMarker.prototype.find = function() {
            var from, to;
            for (var i = 0,
            e = this.set.length; i < e; ++i) {
                var line = this.set[i],
                mk = line.marked;
                for (var j = 0; j < mk.length; ++j) {
                    var mark = mk[j];
                    if (mark.marker == this) {
                        if (mark.from != null || mark.to != null) {
                            var found = lineNo(line);
                            if (found != null) {
                                if (mark.from != null) {
                                    from = {
                                        line: found,
                                        ch: mark.from
                                    }
                                }
                                if (mark.to != null) {
                                    to = {
                                        line: found,
                                        ch: mark.to
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return {
                from: from,
                to: to
            }
        };
        function markText(from, to, className) {
            from = clipPos(from);
            to = clipPos(to);
            var tm = new TextMarker();
            if (!posLess(from, to)) {
                return tm
            }
            function add(line, from, to, className) {
                getLine(line).addMark(new MarkedText(from, to, className, tm))
            }
            if (from.line == to.line) {
                add(from.line, from.ch, to.ch, className)
            } else {
                add(from.line, from.ch, null, className);
                for (var i = from.line + 1,
                e = to.line; i < e; ++i) {
                    add(i, null, null, className)
                }
                add(to.line, null, to.ch, className)
            }
            changes.push({
                from: from.line,
                to: to.line + 1
            });
            return tm
        }
        function setBookmark(pos) {
            pos = clipPos(pos);
            var bm = new Bookmark(pos.ch);
            getLine(pos.line).addMark(bm);
            return bm
        }
        function findMarksAt(pos) {
            pos = clipPos(pos);
            var markers = [],
            marked = getLine(pos.line).marked;
            if (!marked) {
                return markers
            }
            for (var i = 0,
            e = marked.length; i < e; ++i) {
                var m = marked[i];
                if ((m.from == null || m.from <= pos.ch) && (m.to == null || m.to >= pos.ch)) {
                    markers.push(m.marker || m)
                }
            }
            return markers
        }
        function addGutterMarker(line, text, className) {
            if (typeof line == "number") {
                line = getLine(clipLine(line))
            }
            line.gutterMarker = {
                text: text,
                style: className
            };
            gutterDirty = true;
            return line
        }
        function removeGutterMarker(line) {
            if (typeof line == "number") {
                line = getLine(clipLine(line))
            }
            line.gutterMarker = null;
            gutterDirty = true
        }
        function changeLine(handle, op) {
            var no = handle,
            line = handle;
            if (typeof handle == "number") {
                line = getLine(clipLine(handle))
            } else {
                no = lineNo(handle)
            }
            if (no == null) {
                return null
            }
            if (op(line, no)) {
                changes.push({
                    from: no,
                    to: no + 1
                })
            } else {
                return null
            }
            return line
        }
        function setLineClass(handle, className, bgClassName) {
            return changeLine(handle,
            function(line) {
                if (line.className != className || line.bgClassName != bgClassName) {
                    line.className = className;
                    line.bgClassName = bgClassName;
                    return true
                }
            })
        }
        function setLineHidden(handle, hidden) {
            return changeLine(handle,
            function(line, no) {
                if (line.hidden != hidden) {
                    line.hidden = hidden;
                    if (!options.lineWrapping) {
                        var l = line.text;
                        if (hidden && l.length == maxLine.length) {
                            maxLengthChanged = true
                        } else {
                            if (!hidden && l.length > maxLine.length) {
                                maxLine = l;
                                maxWidth = null;
                                maxLengthChanged = false
                            }
                        }
                    }
                    updateLineHeight(line, hidden ? 0 : 1);
                    var fline = sel.from.line,
                    tline = sel.to.line;
                    if (hidden && (fline == no || tline == no)) {
                        var from = fline == no ? skipHidden({
                            line: fline,
                            ch: 0
                        },
                        fline, 0) : sel.from;
                        var to = tline == no ? skipHidden({
                            line: tline,
                            ch: 0
                        },
                        tline, 0) : sel.to;
                        if (!to) {
                            return
                        }
                        setSelection(from, to)
                    }
                    return (gutterDirty = true)
                }
            })
        }
        function lineInfo(line) {
            if (typeof line == "number") {
                if (!isLine(line)) {
                    return null
                }
                var n = line;
                line = getLine(line);
                if (!line) {
                    return null
                }
            } else {
                var n = lineNo(line);
                if (n == null) {
                    return null
                }
            }
            var marker = line.gutterMarker;
            return {
                line: n,
                handle: line,
                text: line.text,
                markerText: marker && marker.text,
                markerClass: marker && marker.style,
                lineClass: line.className,
                bgClass: line.bgClassName
            }
        }
        function stringWidth(str) {
            measure.innerHTML = "<pre><span>x</span></pre>";
            measure.firstChild.firstChild.firstChild.nodeValue = str;
            return measure.firstChild.firstChild.offsetWidth || 10
        }
        function charFromX(line, x) {
            if (x <= 0) {
                return 0
            }
            var lineObj = getLine(line),
            text = lineObj.text;
            function getX(len) {
                return measureLine(lineObj, len).left
            }
            var from = 0,
            fromX = 0,
            to = text.length,
            toX;
            var estimated = Math.min(to, Math.ceil(x / charWidth()));
            for (;;) {
                var estX = getX(estimated);
                if (estX <= x && estimated < to) {
                    estimated = Math.min(to, Math.ceil(estimated * 1.2))
                } else {
                    toX = estX;
                    to = estimated;
                    break
                }
            }
            if (x > toX) {
                return to
            }
            estimated = Math.floor(to * 0.8);
            estX = getX(estimated);
            if (estX < x) {
                from = estimated;
                fromX = estX
            }
            for (;;) {
                if (to - from <= 1) {
                    return (toX - x > x - fromX) ? from: to
                }
                var middle = Math.ceil((from + to) / 2),
                middleX = getX(middle);
                if (middleX > x) {
                    to = middle;
                    toX = middleX
                } else {
                    from = middle;
                    fromX = middleX
                }
            }
        }
        var tempId = "CodeMirror-temp-" + Math.floor(Math.random() * 16777215).toString(16);
        function measureLine(line, ch) {
            if (ch == 0) {
                return {
                    top: 0,
                    left: 0
                }
            }
            var wbr = options.lineWrapping && ch < line.text.length && spanAffectsWrapping.test(line.text.slice(ch - 1, ch + 1));
            measure.innerHTML = "<pre>" + line.getHTML(makeTab, ch, tempId, wbr) + "</pre>";
            var elt = document.getElementById(tempId);
            var top = elt.offsetTop,
            left = elt.offsetLeft;
            if (ie && top == 0 && left == 0) {
                var backup = document.createElement("span");
                backup.innerHTML = "x";
                elt.parentNode.insertBefore(backup, elt.nextSibling);
                top = backup.offsetTop
            }
            return {
                top: top,
                left: left
            }
        }
        function localCoords(pos, inLineWrap) {
            var x, lh = textHeight(),
            y = lh * (heightAtLine(doc, pos.line) - (inLineWrap ? displayOffset: 0));
            if (pos.ch == 0) {
                x = 0
            } else {
                var sp = measureLine(getLine(pos.line), pos.ch);
                x = sp.left;
                if (options.lineWrapping) {
                    y += Math.max(0, sp.top)
                }
            }
            return {
                x: x,
                y: y,
                yBot: y + lh
            }
        }
        function coordsChar(x, y) {
            if (y < 0) {
                y = 0
            }
            var th = textHeight(),
            cw = charWidth(),
            heightPos = displayOffset + Math.floor(y / th);
            var lineNo = lineAtHeight(doc, heightPos);
            if (lineNo >= doc.size) {
                return {
                    line: doc.size - 1,
                    ch: getLine(doc.size - 1).text.length
                }
            }
            var lineObj = getLine(lineNo),
            text = lineObj.text;
            var tw = options.lineWrapping,
            innerOff = tw ? heightPos - heightAtLine(doc, lineNo) : 0;
            if (x <= 0 && innerOff == 0) {
                return {
                    line: lineNo,
                    ch: 0
                }
            }
            function getX(len) {
                var sp = measureLine(lineObj, len);
                if (tw) {
                    var off = Math.round(sp.top / th);
                    return Math.max(0, sp.left + (off - innerOff) * scroller.clientWidth)
                }
                return sp.left
            }
            var from = 0,
            fromX = 0,
            to = text.length,
            toX;
            var estimated = Math.min(to, Math.ceil((x + innerOff * scroller.clientWidth * 0.9) / cw));
            for (;;) {
                var estX = getX(estimated);
                if (estX <= x && estimated < to) {
                    estimated = Math.min(to, Math.ceil(estimated * 1.2))
                } else {
                    toX = estX;
                    to = estimated;
                    break
                }
            }
            if (x > toX) {
                return {
                    line: lineNo,
                    ch: to
                }
            }
            estimated = Math.floor(to * 0.8);
            estX = getX(estimated);
            if (estX < x) {
                from = estimated;
                fromX = estX
            }
            for (;;) {
                if (to - from <= 1) {
                    return {
                        line: lineNo,
                        ch: (toX - x > x - fromX) ? from: to
                    }
                }
                var middle = Math.ceil((from + to) / 2),
                middleX = getX(middle);
                if (middleX > x) {
                    to = middle;
                    toX = middleX
                } else {
                    from = middle;
                    fromX = middleX
                }
            }
        }
        function pageCoords(pos) {
            var local = localCoords(pos, true),
            off = eltOffset(lineSpace);
            return {
                x: off.left + local.x,
                y: off.top + local.y,
                yBot: off.top + local.yBot
            }
        }
        var cachedHeight, cachedHeightFor, measureText;
        function textHeight() {
            if (measureText == null) {
                measureText = "<pre>";
                for (var i = 0; i < 49; ++i) {
                    measureText += "x<br/>"
                }
                measureText += "x</pre>"
            }
            var offsetHeight = lineDiv.clientHeight;
            if (offsetHeight == cachedHeightFor) {
                return cachedHeight
            }
            cachedHeightFor = offsetHeight;
            measure.innerHTML = measureText;
            cachedHeight = measure.firstChild.offsetHeight / 50 || 1;
            measure.innerHTML = "";
            return cachedHeight
        }
        var cachedWidth, cachedWidthFor = 0;
        function charWidth() {
            if (scroller.clientWidth == cachedWidthFor) {
                return cachedWidth
            }
            cachedWidthFor = scroller.clientWidth;
            return (cachedWidth = stringWidth("x"))
        }
        function paddingTop() {
            return lineSpace.offsetTop
        }
        function paddingLeft() {
            return lineSpace.offsetLeft
        }
        function posFromMouse(e, liberal) {
            var offW = eltOffset(scroller, true),
            x,
            y;
            try {
                x = e.clientX;
                y = e.clientY
            } catch(e) {
                return null
            }
            if (!liberal && (x - offW.left > scroller.clientWidth || y - offW.top > scroller.clientHeight)) {
                return null
            }
            var offL = eltOffset(lineSpace, true);
            return coordsChar(x - offL.left, y - offL.top)
        }
        function onContextMenu(e) {
            var pos = posFromMouse(e),
            scrollPos = scroller.scrollTop;
            if (!pos || window.opera) {
                return
            }
            if (posEq(sel.from, sel.to) || posLess(pos, sel.from) || !posLess(pos, sel.to)) {
                operation(setCursor)(pos.line, pos.ch)
            }
            var oldCSS = input.style.cssText;
            inputDiv.style.position = "absolute";
            input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (e.clientY - 5) + "px; left: " + (e.clientX - 5) + "px; z-index: 1000; background: white; " + "border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
            leaveInputAlone = true;
            var val = input.value = getSelection();
            focusInput();
            selectInput(input);
            function rehide() {
                var newVal = splitLines(input.value).join("\n");
                if (newVal != val) {
                    operation(replaceSelection)(newVal, "end")
                }
                inputDiv.style.position = "relative";
                input.style.cssText = oldCSS;
                if (ie_lt9) {
                    scroller.scrollTop = scrollPos
                }
                leaveInputAlone = false;
                resetInput(true);
                slowPoll()
            }
            if (gecko) {
                e_stop(e);
                var mouseup = connect(window, "mouseup",
                function() {
                    mouseup();
                    setTimeout(rehide, 20)
                },
                true)
            } else {
                setTimeout(rehide, 50)
            }
        }
        function restartBlink() {
            clearInterval(blinker);
            var on = true;
            cursor.style.visibility = "";
            blinker = setInterval(function() {
                cursor.style.visibility = (on = !on) ? "": "hidden"
            },
            650)
        }
        var matching = {
            "(": ")>",
            ")": "(<",
            "[": "]>",
            "]": "[<",
            "{": "}>",
            "}": "{<"
        };
        function matchBrackets(autoclear) {
            var head = sel.inverted ? sel.from: sel.to,
            line = getLine(head.line),
            pos = head.ch - 1;
            var match = (pos >= 0 && matching[line.text.charAt(pos)]) || matching[line.text.charAt(++pos)];
            if (!match) {
                return
            }
            var ch = match.charAt(0),
            forward = match.charAt(1) == ">",
            d = forward ? 1 : -1,
            st = line.styles;
            for (var off = pos + 1,
            i = 0,
            e = st.length; i < e; i += 2) {
                if ((off -= st[i].length) <= 0) {
                    var style = st[i + 1];
                    break
                }
            }
            var stack = [line.text.charAt(pos)],
            re = /[(){}[\]]/;
            function scan(line, from, to) {
                if (!line.text) {
                    return
                }
                var st = line.styles,
                pos = forward ? 0 : line.text.length - 1,
                cur;
                for (var i = forward ? 0 : st.length - 2, e = forward ? st.length: -2; i != e; i += 2 * d) {
                    var text = st[i];
                    if (st[i + 1] != null && st[i + 1] != style) {
                        pos += d * text.length;
                        continue
                    }
                    for (var j = forward ? 0 : text.length - 1, te = forward ? text.length: -1; j != te; j += d, pos += d) {
                        if (pos >= from && pos < to && re.test(cur = text.charAt(j))) {
                            var match = matching[cur];
                            if (match.charAt(1) == ">" == forward) {
                                stack.push(cur)
                            } else {
                                if (stack.pop() != match.charAt(0)) {
                                    return {
                                        pos: pos,
                                        match: false
                                    }
                                } else {
                                    if (!stack.length) {
                                        return {
                                            pos: pos,
                                            match: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            for (var i = head.line,
            e = forward ? Math.min(i + 100, doc.size) : Math.max( - 1, i - 100); i != e; i += d) {
                var line = getLine(i),
                first = i == head.line;
                var found = scan(line, first && forward ? pos + 1 : 0, first && !forward ? pos: line.text.length);
                if (found) {
                    break
                }
            }
            if (!found) {
                found = {
                    pos: null,
                    match: false
                }
            }
            var style = found.match ? "CodeMirror-matchingbracket": "CodeMirror-nonmatchingbracket";
            var one = markText({
                line: head.line,
                ch: pos
            },
            {
                line: head.line,
                ch: pos + 1
            },
            style),
            two = found.pos != null && markText({
                line: i,
                ch: found.pos
            },
            {
                line: i,
                ch: found.pos + 1
            },
            style);
            var clear = operation(function() {
                one.clear();
                two && two.clear()
            });
            if (autoclear) {
                setTimeout(clear, 800)
            } else {
                bracketHighlighted = clear
            }
        }
        function findStartLine(n) {
            var minindent, minline;
            for (var search = n,
            lim = n - 40; search > lim; --search) {
                if (search == 0) {
                    return 0
                }
                var line = getLine(search - 1);
                if (line.stateAfter) {
                    return search
                }
                var indented = line.indentation(options.tabSize);
                if (minline == null || minindent > indented) {
                    minline = search - 1;
                    minindent = indented
                }
            }
            return minline
        }
        function getStateBefore(n) {
            var start = findStartLine(n),
            state = start && getLine(start - 1).stateAfter;
            if (!state) {
                state = startState(mode)
            } else {
                state = copyState(mode, state)
            }
            doc.iter(start, n,
            function(line) {
                line.highlight(mode, state, options.tabSize);
                line.stateAfter = copyState(mode, state)
            });
            if (start < n) {
                changes.push({
                    from: start,
                    to: n
                })
            }
            if (n < doc.size && !getLine(n).stateAfter) {
                work.push(n)
            }
            return state
        }
        function highlightLines(start, end) {
            var state = getStateBefore(start);
            doc.iter(start, end,
            function(line) {
                line.highlight(mode, state, options.tabSize);
                line.stateAfter = copyState(mode, state)
            })
        }
        function highlightWorker() {
            var end = +new Date + options.workTime;
            var foundWork = work.length;
            while (work.length) {
                if (!getLine(showingFrom).stateAfter) {
                    var task = showingFrom
                } else {
                    var task = work.pop()
                }
                if (task >= doc.size) {
                    continue
                }
                var start = findStartLine(task),
                state = start && getLine(start - 1).stateAfter;
                if (state) {
                    state = copyState(mode, state)
                } else {
                    state = startState(mode)
                }
                var unchanged = 0,
                compare = mode.compareStates,
                realChange = false,
                i = start,
                bail = false;
                doc.iter(i, doc.size,
                function(line) {
                    var hadState = line.stateAfter;
                    if ( + new Date > end) {
                        work.push(i);
                        startWorker(options.workDelay);
                        if (realChange) {
                            changes.push({
                                from: task,
                                to: i + 1
                            })
                        }
                        return (bail = true)
                    }
                    var changed = line.highlight(mode, state, options.tabSize);
                    if (changed) {
                        realChange = true
                    }
                    line.stateAfter = copyState(mode, state);
                    var done = null;
                    if (compare) {
                        var same = hadState && compare(hadState, state);
                        if (same != Pass) {
                            done = !!same
                        }
                    }
                    if (done == null) {
                        if (changed !== false || !hadState) {
                            unchanged = 0
                        } else {
                            if (++unchanged > 3 && (!mode.indent || mode.indent(hadState, "") == mode.indent(state, ""))) {
                                done = true
                            }
                        }
                    }
                    if (done) {
                        return true
                    }++i
                });
                if (bail) {
                    return
                }
                if (realChange) {
                    changes.push({
                        from: task,
                        to: i + 1
                    })
                }
            }
            if (foundWork && options.onHighlightComplete) {
                options.onHighlightComplete(instance)
            }
        }
        function startWorker(time) {
            if (!work.length) {
                return
            }
            highlight.set(time, operation(highlightWorker))
        }
        function startOperation() {
            updateInput = userSelChange = textChanged = null;
            changes = [];
            selectionChanged = false;
            callbacks = []
        }
        function endOperation() {
            var reScroll = false,
            updated;
            if (maxLengthChanged) {
                computeMaxLength()
            }
            if (selectionChanged) {
                reScroll = !scrollCursorIntoView()
            }
            if (changes.length) {
                updated = updateDisplay(changes, true)
            } else {
                if (selectionChanged) {
                    updateSelection()
                }
                if (gutterDirty) {
                    updateGutter()
                }
            }
            if (reScroll) {
                scrollCursorIntoView()
            }
            if (selectionChanged) {
                scrollEditorIntoView();
                restartBlink()
            }
            if (focused && !leaveInputAlone && (updateInput === true || (updateInput !== false && selectionChanged))) {
                resetInput(userSelChange)
            }
            if (selectionChanged && options.matchBrackets) {
                setTimeout(operation(function() {
                    if (bracketHighlighted) {
                        bracketHighlighted();
                        bracketHighlighted = null
                    }
                    if (posEq(sel.from, sel.to)) {
                        matchBrackets(false)
                    }
                }), 20)
            }
            var tc = textChanged,
            cbs = callbacks;
            if (selectionChanged && options.onCursorActivity) {
                options.onCursorActivity(instance)
            }
            if (tc && options.onChange && instance) {
                options.onChange(instance, tc)
            }
            for (var i = 0; i < cbs.length; ++i) {
                cbs[i](instance)
            }
            if (updated && options.onUpdate) {
                options.onUpdate(instance)
            }
        }
        var nestedOperation = 0;
        function operation(f) {
            return function() {
                if (!nestedOperation++) {
                    startOperation()
                }
                try {
                    var result = f.apply(this, arguments)
                } finally {
                    if (!--nestedOperation) {
                        endOperation()
                    }
                }
                return result
            }
        }
        function compoundChange(f) {
            history.startCompound();
            try {
                return f()
            } finally {
                history.endCompound()
            }
        }
        for (var ext in extensions) {
            if (extensions.propertyIsEnumerable(ext) && !instance.propertyIsEnumerable(ext)) {
                instance[ext] = extensions[ext]
            }
        }
        return instance
    }
    CodeMirror.defaults = {
        value: "",
        mode: null,
        theme: "default",
        indentUnit: 2,
        indentWithTabs: false,
        smartIndent: true,
        tabSize: 4,
        keyMap: "default",
        extraKeys: null,
        electricChars: true,
        autoClearEmptyLines: false,
        onKeyEvent: null,
        onDragEvent: null,
        lineWrapping: false,
        lineNumbers: false,
        gutter: false,
        fixedGutter: false,
        firstLineNumber: 1,
        readOnly: false,
        dragDrop: true,
        onChange: null,
        onCursorActivity: null,
        onGutterClick: null,
        onHighlightComplete: null,
        onUpdate: null,
        onFocus: null,
        onBlur: null,
        onScroll: null,
        matchBrackets: false,
        workTime: 100,
        workDelay: 200,
        pollInterval: 100,
        undoDepth: 40,
        tabindex: null,
        autofocus: null
    };
    var ios = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
    var mac = ios || /Mac/.test(navigator.platform);
    var win = /Win/.test(navigator.platform);
    var modes = CodeMirror.modes = {},
    mimeModes = CodeMirror.mimeModes = {};
    CodeMirror.defineMode = function(name, mode) {
        if (!CodeMirror.defaults.mode && name != "null") {
            CodeMirror.defaults.mode = name
        }
        if (arguments.length > 2) {
            mode.dependencies = [];
            for (var i = 2; i < arguments.length; ++i) {
                mode.dependencies.push(arguments[i])
            }
        }
        modes[name] = mode
    };
    CodeMirror.defineMIME = function(mime, spec) {
        mimeModes[mime] = spec
    };
    CodeMirror.resolveMode = function(spec) {
        if (typeof spec == "string" && mimeModes.hasOwnProperty(spec)) {
            spec = mimeModes[spec]
        } else {
            if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) {
                return CodeMirror.resolveMode("application/xml")
            }
        }
        if (typeof spec == "string") {
            return {
                name: spec
            }
        } else {
            return spec || {
                name: "null"
            }
        }
    };
    CodeMirror.getMode = function(options, spec) {
        var spec = CodeMirror.resolveMode(spec);
        var mfactory = modes[spec.name];
        if (!mfactory) {
            return CodeMirror.getMode(options, "text/plain")
        }
        return mfactory(options, spec)
    };
    CodeMirror.listModes = function() {
        var list = [];
        for (var m in modes) {
            if (modes.propertyIsEnumerable(m)) {
                list.push(m)
            }
        }
        return list
    };
    CodeMirror.listMIMEs = function() {
        var list = [];
        for (var m in mimeModes) {
            if (mimeModes.propertyIsEnumerable(m)) {
                list.push({
                    mime: m,
                    mode: mimeModes[m]
                })
            }
        }
        return list
    };
    var extensions = CodeMirror.extensions = {};
    CodeMirror.defineExtension = function(name, func) {
        extensions[name] = func
    };
    var commands = CodeMirror.commands = {
        selectAll: function(cm) {
            cm.setSelection({
                line: 0,
                ch: 0
            },
            {
                line: cm.lineCount() - 1
            })
        },
        killLine: function(cm) {
            var from = cm.getCursor(true),
            to = cm.getCursor(false),
            sel = !posEq(from, to);
            if (!sel && cm.getLine(from.line).length == from.ch) {
                cm.replaceRange("", from, {
                    line: from.line + 1,
                    ch: 0
                })
            } else {
                cm.replaceRange("", from, sel ? to: {
                    line: from.line
                })
            }
        },
        deleteLine: function(cm) {
            var l = cm.getCursor().line;
            cm.replaceRange("", {
                line: l,
                ch: 0
            },
            {
                line: l
            })
        },
        undo: function(cm) {
            cm.undo()
        },
        redo: function(cm) {
            cm.redo()
        },
        goDocStart: function(cm) {
            cm.setCursor(0, 0, true)
        },
        goDocEnd: function(cm) {
            cm.setSelection({
                line: cm.lineCount() - 1
            },
            null, true)
        },
        goLineStart: function(cm) {
            cm.setCursor(cm.getCursor().line, 0, true)
        },
        goLineStartSmart: function(cm) {
            var cur = cm.getCursor();
            var text = cm.getLine(cur.line),
            firstNonWS = Math.max(0, text.search(/\S/));
            cm.setCursor(cur.line, cur.ch <= firstNonWS && cur.ch ? 0 : firstNonWS, true)
        },
        goLineEnd: function(cm) {
            cm.setSelection({
                line: cm.getCursor().line
            },
            null, true)
        },
        goLineUp: function(cm) {
            cm.moveV( - 1, "line")
        },
        goLineDown: function(cm) {
            cm.moveV(1, "line")
        },
        goPageUp: function(cm) {
            cm.moveV( - 1, "page")
        },
        goPageDown: function(cm) {
            cm.moveV(1, "page")
        },
        goCharLeft: function(cm) {
            cm.moveH( - 1, "char")
        },
        goCharRight: function(cm) {
            cm.moveH(1, "char")
        },
        goColumnLeft: function(cm) {
            cm.moveH( - 1, "column")
        },
        goColumnRight: function(cm) {
            cm.moveH(1, "column")
        },
        goWordLeft: function(cm) {
            cm.moveH( - 1, "word")
        },
        goWordRight: function(cm) {
            cm.moveH(1, "word")
        },
        delCharLeft: function(cm) {
            cm.deleteH( - 1, "char")
        },
        delCharRight: function(cm) {
            cm.deleteH(1, "char")
        },
        delWordLeft: function(cm) {
            cm.deleteH( - 1, "word")
        },
        delWordRight: function(cm) {
            cm.deleteH(1, "word")
        },
        indentAuto: function(cm) {
            cm.indentSelection("smart")
        },
        indentMore: function(cm) {
            cm.indentSelection("add")
        },
        indentLess: function(cm) {
            cm.indentSelection("subtract")
        },
        insertTab: function(cm) {
            cm.replaceSelection("\t", "end")
        },
        defaultTab: function(cm) {
            if (cm.somethingSelected()) {
                cm.indentSelection("add")
            } else {
                cm.replaceSelection("\t", "end")
            }
        },
        transposeChars: function(cm) {
            var cur = cm.getCursor(),
            line = cm.getLine(cur.line);
            if (cur.ch > 0 && cur.ch < line.length - 1) {
                cm.replaceRange(line.charAt(cur.ch) + line.charAt(cur.ch - 1), {
                    line: cur.line,
                    ch: cur.ch - 1
                },
                {
                    line: cur.line,
                    ch: cur.ch + 1
                })
            }
        },
        newlineAndIndent: function(cm) {
            cm.replaceSelection("\n", "end");
            cm.indentLine(cm.getCursor().line)
        },
        toggleOverwrite: function(cm) {
            cm.toggleOverwrite()
        }
    };
    var keyMap = CodeMirror.keyMap = {};
    keyMap.basic = {
        "Left": "goCharLeft",
        "Right": "goCharRight",
        "Up": "goLineUp",
        "Down": "goLineDown",
        "End": "goLineEnd",
        "Home": "goLineStartSmart",
        "PageUp": "goPageUp",
        "PageDown": "goPageDown",
        "Delete": "delCharRight",
        "Backspace": "delCharLeft",
        "Tab": "defaultTab",
        "Shift-Tab": "indentAuto",
        "Enter": "newlineAndIndent",
        "Insert": "toggleOverwrite"
    };
    keyMap.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Alt-Up": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Down": "goDocEnd",
        "Ctrl-Left": "goWordLeft",
        "Ctrl-Right": "goWordRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delWordLeft",
        "Ctrl-Delete": "delWordRight",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        fallthrough: "basic"
    };
    keyMap.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goWordLeft",
        "Alt-Right": "goWordRight",
        "Cmd-Left": "goLineStart",
        "Cmd-Right": "goLineEnd",
        "Alt-Backspace": "delWordLeft",
        "Ctrl-Alt-Backspace": "delWordRight",
        "Alt-Delete": "delWordRight",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        fallthrough: ["basic", "emacsy"]
    };
    keyMap["default"] = mac ? keyMap.macDefault: keyMap.pcDefault;
    keyMap.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageUp",
        "Shift-Ctrl-V": "goPageDown",
        "Ctrl-D": "delCharRight",
        "Ctrl-H": "delCharLeft",
        "Alt-D": "delWordRight",
        "Alt-Backspace": "delWordLeft",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars"
    };
    function getKeyMap(val) {
        if (typeof val == "string") {
            return keyMap[val]
        } else {
            return val
        }
    }
    function lookupKey(name, extraMap, map, handle, stop) {
        function lookup(map) {
            map = getKeyMap(map);
            var found = map[name];
            if (found != null && handle(found)) {
                return true
            }
            if (map.nofallthrough) {
                if (stop) {
                    stop()
                }
                return true
            }
            var fallthrough = map.fallthrough;
            if (fallthrough == null) {
                return false
            }
            if (Object.prototype.toString.call(fallthrough) != "[object Array]") {
                return lookup(fallthrough)
            }
            for (var i = 0,
            e = fallthrough.length; i < e; ++i) {
                if (lookup(fallthrough[i])) {
                    return true
                }
            }
            return false
        }
        if (extraMap && lookup(extraMap)) {
            return true
        }
        return lookup(map)
    }
    function isModifierKey(event) {
        var name = keyNames[e_prop(event, "keyCode")];
        return name == "Ctrl" || name == "Alt" || name == "Shift" || name == "Mod"
    }
    CodeMirror.fromTextArea = function(textarea, options) {
        if (!options) {
            options = {}
        }
        options.value = textarea.value;
        if (!options.tabindex && textarea.tabindex) {
            options.tabindex = textarea.tabindex
        }
        if (options.autofocus == null && textarea.getAttribute("autofocus") != null) {
            options.autofocus = true
        }
        function save() {
            textarea.value = instance.getValue()
        }
        if (textarea.form) {
            var rmSubmit = connect(textarea.form, "submit", save, true);
            if (typeof textarea.form.submit == "function") {
                var realSubmit = textarea.form.submit;
                function wrappedSubmit() {
                    save();
                    textarea.form.submit = realSubmit;
                    textarea.form.submit();
                    textarea.form.submit = wrappedSubmit
                }
                textarea.form.submit = wrappedSubmit
            }
        }
        textarea.style.display = "none";
        var instance = CodeMirror(function(node) {
            textarea.parentNode.insertBefore(node, textarea.nextSibling)
        },
        options);
        instance.save = save;
        instance.getTextArea = function() {
            return textarea
        };
        instance.toTextArea = function() {
            save();
            textarea.parentNode.removeChild(instance.getWrapperElement());
            textarea.style.display = "";
            if (textarea.form) {
                rmSubmit();
                if (typeof textarea.form.submit == "function") {
                    textarea.form.submit = realSubmit
                }
            }
        };
        return instance
    };
    function copyState(mode, state) {
        if (state === true) {
            return state
        }
        if (mode.copyState) {
            return mode.copyState(state)
        }
        var nstate = {};
        for (var n in state) {
            var val = state[n];
            if (val instanceof Array) {
                val = val.concat([])
            }
            nstate[n] = val
        }
        return nstate
    }
    CodeMirror.copyState = copyState;
    function startState(mode, a1, a2) {
        return mode.startState ? mode.startState(a1, a2) : true
    }
    CodeMirror.startState = startState;
    function StringStream(string, tabSize) {
        this.pos = this.start = 0;
        this.string = string;
        this.tabSize = tabSize || 8
    }
    StringStream.prototype = {
        eol: function() {
            return this.pos >= this.string.length
        },
        sol: function() {
            return this.pos == 0
        },
        peek: function() {
            return this.string.charAt(this.pos)
        },
        next: function() {
            if (this.pos < this.string.length) {
                return this.string.charAt(this.pos++)
            }
        },
        eat: function(match) {
            var ch = this.string.charAt(this.pos);
            if (typeof match == "string") {
                var ok = ch == match
            } else {
                var ok = ch && (match.test ? match.test(ch) : match(ch))
            }
            if (ok) {++this.pos;
                return ch
            }
        },
        eatWhile: function(match) {
            var start = this.pos;
            while (this.eat(match)) {}
            return this.pos > start
        },
        eatSpace: function() {
            var start = this.pos;
            while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) {++this.pos
            }
            return this.pos > start
        },
        skipToEnd: function() {
            this.pos = this.string.length
        },
        skipTo: function(ch) {
            var found = this.string.indexOf(ch, this.pos);
            if (found > -1) {
                this.pos = found;
                return true
            }
        },
        backUp: function(n) {
            this.pos -= n
        },
        column: function() {
            return countColumn(this.string, this.start, this.tabSize)
        },
        indentation: function() {
            return countColumn(this.string, null, this.tabSize)
        },
        match: function(pattern, consume, caseInsensitive) {
            if (typeof pattern == "string") {
                function cased(str) {
                    return caseInsensitive ? str.toLowerCase() : str
                }
                if (cased(this.string).indexOf(cased(pattern), this.pos) == this.pos) {
                    if (consume !== false) {
                        this.pos += pattern.length
                    }
                    return true
                }
            } else {
                var match = this.string.slice(this.pos).match(pattern);
                if (match && consume !== false) {
                    this.pos += match[0].length
                }
                return match
            }
        },
        current: function() {
            return this.string.slice(this.start, this.pos)
        }
    };
    CodeMirror.StringStream = StringStream;
    function MarkedText(from, to, className, marker) {
        this.from = from;
        this.to = to;
        this.style = className;
        this.marker = marker
    }
    MarkedText.prototype = {
        attach: function(line) {
            this.marker.set.push(line)
        },
        detach: function(line) {
            var ix = indexOf(this.marker.set, line);
            if (ix > -1) {
                this.marker.set.splice(ix, 1)
            }
        },
        split: function(pos, lenBefore) {
            if (this.to <= pos && this.to != null) {
                return null
            }
            var from = this.from < pos || this.from == null ? null: this.from - pos + lenBefore;
            var to = this.to == null ? null: this.to - pos + lenBefore;
            return new MarkedText(from, to, this.style, this.marker)
        },
        dup: function() {
            return new MarkedText(null, null, this.style, this.marker)
        },
        clipTo: function(fromOpen, from, toOpen, to, diff) {
            if (fromOpen && to > this.from && (to < this.to || this.to == null)) {
                this.from = null
            } else {
                if (this.from != null && this.from >= from) {
                    this.from = Math.max(to, this.from) + diff
                }
            }
            if (toOpen && (from < this.to || this.to == null) && (from > this.from || this.from == null)) {
                this.to = null
            } else {
                if (this.to != null && this.to > from) {
                    this.to = to < this.to ? this.to + diff: from
                }
            }
        },
        isDead: function() {
            return this.from != null && this.to != null && this.from >= this.to
        },
        sameSet: function(x) {
            return this.marker == x.marker
        }
    };
    function Bookmark(pos) {
        this.from = pos;
        this.to = pos;
        this.line = null
    }
    Bookmark.prototype = {
        attach: function(line) {
            this.line = line
        },
        detach: function(line) {
            if (this.line == line) {
                this.line = null
            }
        },
        split: function(pos, lenBefore) {
            if (pos < this.from) {
                this.from = this.to = (this.from - pos) + lenBefore;
                return this
            }
        },
        isDead: function() {
            return this.from > this.to
        },
        clipTo: function(fromOpen, from, toOpen, to, diff) {
            if ((fromOpen || from < this.from) && (toOpen || to > this.to)) {
                this.from = 0;
                this.to = -1
            } else {
                if (this.from > from) {
                    this.from = this.to = Math.max(to, this.from) + diff
                }
            }
        },
        sameSet: function(x) {
            return false
        },
        find: function() {
            if (!this.line || !this.line.parent) {
                return null
            }
            return {
                line: lineNo(this.line),
                ch: this.from
            }
        },
        clear: function() {
            if (this.line) {
                var found = indexOf(this.line.marked, this);
                if (found != -1) {
                    this.line.marked.splice(found, 1)
                }
                this.line = null
            }
        }
    };
    function Line(text, styles) {
        this.styles = styles || [text, null];
        this.text = text;
        this.height = 1;
        this.marked = this.gutterMarker = this.className = this.bgClassName = this.handlers = null;
        this.stateAfter = this.parent = this.hidden = null
    }
    Line.inheritMarks = function(text, orig) {
        var ln = new Line(text),
        mk = orig && orig.marked;
        if (mk) {
            for (var i = 0; i < mk.length; ++i) {
                if (mk[i].to == null && mk[i].style) {
                    var newmk = ln.marked || (ln.marked = []),
                    mark = mk[i];
                    var nmark = mark.dup();
                    newmk.push(nmark);
                    nmark.attach(ln)
                }
            }
        }
        return ln
    };
    Line.prototype = {
        replace: function(from, to_, text) {
            var st = [],
            mk = this.marked,
            to = to_ == null ? this.text.length: to_;
            copyStyles(0, from, this.styles, st);
            if (text) {
                st.push(text, null)
            }
            copyStyles(to, this.text.length, this.styles, st);
            this.styles = st;
            this.text = this.text.slice(0, from) + text + this.text.slice(to);
            this.stateAfter = null;
            if (mk) {
                var diff = text.length - (to - from);
                for (var i = 0; i < mk.length; ++i) {
                    var mark = mk[i];
                    mark.clipTo(from == null, from || 0, to_ == null, to, diff);
                    if (mark.isDead()) {
                        mark.detach(this);
                        mk.splice(i--, 1)
                    }
                }
            }
        },
        split: function(pos, textBefore) {
            var st = [textBefore, null],
            mk = this.marked;
            copyStyles(pos, this.text.length, this.styles, st);
            var taken = new Line(textBefore + this.text.slice(pos), st);
            if (mk) {
                for (var i = 0; i < mk.length; ++i) {
                    var mark = mk[i];
                    var newmark = mark.split(pos, textBefore.length);
                    if (newmark) {
                        if (!taken.marked) {
                            taken.marked = []
                        }
                        taken.marked.push(newmark);
                        newmark.attach(taken);
                        if (newmark == mark) {
                            mk.splice(i--, 1)
                        }
                    }
                }
            }
            return taken
        },
        append: function(line) {
            var mylen = this.text.length,
            mk = line.marked,
            mymk = this.marked;
            this.text += line.text;
            copyStyles(0, line.text.length, line.styles, this.styles);
            if (mymk) {
                for (var i = 0; i < mymk.length; ++i) {
                    if (mymk[i].to == null) {
                        mymk[i].to = mylen
                    }
                }
            }
            if (mk && mk.length) {
                if (!mymk) {
                    this.marked = mymk = []
                }
                outer: for (var i = 0; i < mk.length; ++i) {
                    var mark = mk[i];
                    if (!mark.from) {
                        for (var j = 0; j < mymk.length; ++j) {
                            var mymark = mymk[j];
                            if (mymark.to == mylen && mymark.sameSet(mark)) {
                                mymark.to = mark.to == null ? null: mark.to + mylen;
                                if (mymark.isDead()) {
                                    mymark.detach(this);
                                    mk.splice(i--, 1)
                                }
                                continue outer
                            }
                        }
                    }
                    mymk.push(mark);
                    mark.attach(this);
                    mark.from += mylen;
                    if (mark.to != null) {
                        mark.to += mylen
                    }
                }
            }
        },
        fixMarkEnds: function(other) {
            var mk = this.marked,
            omk = other.marked;
            if (!mk) {
                return
            }
            for (var i = 0; i < mk.length; ++i) {
                var mark = mk[i],
                close = mark.to == null;
                if (close && omk) {
                    for (var j = 0; j < omk.length; ++j) {
                        if (omk[j].sameSet(mark)) {
                            close = false;
                            break
                        }
                    }
                }
                if (close) {
                    mark.to = this.text.length
                }
            }
        },
        fixMarkStarts: function() {
            var mk = this.marked;
            if (!mk) {
                return
            }
            for (var i = 0; i < mk.length; ++i) {
                if (mk[i].from == null) {
                    mk[i].from = 0
                }
            }
        },
        addMark: function(mark) {
            mark.attach(this);
            if (this.marked == null) {
                this.marked = []
            }
            this.marked.push(mark);
            this.marked.sort(function(a, b) {
                return (a.from || 0) - (b.from || 0)
            })
        },
        highlight: function(mode, state, tabSize) {
            var stream = new StringStream(this.text, tabSize),
            st = this.styles,
            pos = 0;
            var changed = false,
            curWord = st[0],
            prevWord;
            if (this.text == "" && mode.blankLine) {
                mode.blankLine(state)
            }
            while (!stream.eol()) {
                var style = mode.token(stream, state);
                var substr = this.text.slice(stream.start, stream.pos);
                stream.start = stream.pos;
                if (pos && st[pos - 1] == style) {
                    st[pos - 2] += substr
                } else {
                    if (substr) {
                        if (!changed && (st[pos + 1] != style || (pos && st[pos - 2] != prevWord))) {
                            changed = true
                        }
                        st[pos++] = substr;
                        st[pos++] = style;
                        prevWord = curWord;
                        curWord = st[pos]
                    }
                }
                if (stream.pos > 5000) {
                    st[pos++] = this.text.slice(stream.pos);
                    st[pos++] = null;
                    break
                }
            }
            if (st.length != pos) {
                st.length = pos;
                changed = true
            }
            if (pos && st[pos - 2] != prevWord) {
                changed = true
            }
            return changed || (st.length < 5 && this.text.length < 10 ? null: false)
        },
        getTokenAt: function(mode, state, ch) {
            var txt = this.text,
            stream = new StringStream(txt);
            while (stream.pos < ch && !stream.eol()) {
                stream.start = stream.pos;
                var style = mode.token(stream, state)
            }
            return {
                start: stream.start,
                end: stream.pos,
                string: stream.current(),
                className: style || null,
                state: state
            }
        },
        indentation: function(tabSize) {
            return countColumn(this.text, null, tabSize)
        },
        getHTML: function(makeTab, wrapAt, wrapId, wrapWBR) {
            var html = [],
            first = true,
            col = 0;
            function span_(text, style) {
                if (!text) {
                    return
                }
                if (first && ie && text.charAt(0) == " ") {
                    text = "\u00a0" + text.slice(1)
                }
                first = false;
                if (text.indexOf("\t") == -1) {
                    col += text.length;
                    var escaped = htmlEscape(text)
                } else {
                    var escaped = "";
                    for (var pos = 0;;) {
                        var idx = text.indexOf("\t", pos);
                        if (idx == -1) {
                            escaped += htmlEscape(text.slice(pos));
                            col += text.length - pos;
                            break
                        } else {
                            col += idx - pos;
                            var tab = makeTab(col);
                            escaped += htmlEscape(text.slice(pos, idx)) + tab.html;
                            col += tab.width;
                            pos = idx + 1
                        }
                    }
                }
                if (style) {
                    html.push('<span class="', style, '">', escaped, "</span>")
                } else {
                    html.push(escaped)
                }
            }
            var span = span_;
            if (wrapAt != null) {
                var outPos = 0,
                open = '<span id="' + wrapId + '">';
                span = function(text, style) {
                    var l = text.length;
                    if (wrapAt >= outPos && wrapAt < outPos + l) {
                        if (wrapAt > outPos) {
                            span_(text.slice(0, wrapAt - outPos), style);
                            if (wrapWBR) {
                                html.push("<wbr>")
                            }
                        }
                        html.push(open);
                        var cut = wrapAt - outPos;
                        span_(window.opera ? text.slice(cut, cut + 1) : text.slice(cut), style);
                        html.push("</span>");
                        if (window.opera) {
                            span_(text.slice(cut + 1), style)
                        }
                        wrapAt--;
                        outPos += l
                    } else {
                        outPos += l;
                        span_(text, style);
                        if (outPos == wrapAt && outPos == len) {
                            html.push(open + " </span>")
                        } else {
                            if (outPos > wrapAt + 10 && /\s/.test(text)) {
                                span = function() {}
                            }
                        }
                    }
                }
            }
            var st = this.styles,
            allText = this.text,
            marked = this.marked;
            var len = allText.length;
            function styleToClass(style) {
                if (!style) {
                    return null
                }
                return "cm-" + style.replace(/ +/g, " cm-")
            }
            if (!allText && wrapAt == null) {
                span(" ")
            } else {
                if (!marked || !marked.length) {
                    for (var i = 0,
                    ch = 0; ch < len; i += 2) {
                        var str = st[i],
                        style = st[i + 1],
                        l = str.length;
                        if (ch + l > len) {
                            str = str.slice(0, len - ch)
                        }
                        ch += l;
                        span(str, styleToClass(style))
                    }
                } else {
                    var pos = 0,
                    i = 0,
                    text = "",
                    style, sg = 0;
                    var nextChange = marked[0].from || 0,
                    marks = [],
                    markpos = 0;
                    function advanceMarks() {
                        var m;
                        while (markpos < marked.length && ((m = marked[markpos]).from == pos || m.from == null)) {
                            if (m.style != null) {
                                marks.push(m)
                            }++markpos
                        }
                        nextChange = markpos < marked.length ? marked[markpos].from: Infinity;
                        for (var i = 0; i < marks.length; ++i) {
                            var to = marks[i].to || Infinity;
                            if (to == pos) {
                                marks.splice(i--, 1)
                            } else {
                                nextChange = Math.min(to, nextChange)
                            }
                        }
                    }
                    var m = 0;
                    while (pos < len) {
                        if (nextChange == pos) {
                            advanceMarks()
                        }
                        var upto = Math.min(len, nextChange);
                        while (true) {
                            if (text) {
                                var end = pos + text.length;
                                var appliedStyle = style;
                                for (var j = 0; j < marks.length; ++j) {
                                    appliedStyle = (appliedStyle ? appliedStyle + " ": "") + marks[j].style
                                }
                                span(end > upto ? text.slice(0, upto - pos) : text, appliedStyle);
                                if (end >= upto) {
                                    text = text.slice(upto - pos);
                                    pos = upto;
                                    break
                                }
                                pos = end
                            }
                            text = st[i++];
                            style = styleToClass(st[i++])
                        }
                    }
                }
            }
            return html.join("")
        },
        cleanUp: function() {
            this.parent = null;
            if (this.marked) {
                for (var i = 0,
                e = this.marked.length; i < e; ++i) {
                    this.marked[i].detach(this)
                }
            }
        }
    };
    function copyStyles(from, to, source, dest) {
        for (var i = 0,
        pos = 0,
        state = 0; pos < to; i += 2) {
            var part = source[i],
            end = pos + part.length;
            if (state == 0) {
                if (end > from) {
                    dest.push(part.slice(from - pos, Math.min(part.length, to - pos)), source[i + 1])
                }
                if (end >= from) {
                    state = 1
                }
            } else {
                if (state == 1) {
                    if (end > to) {
                        dest.push(part.slice(0, to - pos), source[i + 1])
                    } else {
                        dest.push(part, source[i + 1])
                    }
                }
            }
            pos = end
        }
    }
    function LeafChunk(lines) {
        this.lines = lines;
        this.parent = null;
        for (var i = 0,
        e = lines.length,
        height = 0; i < e; ++i) {
            lines[i].parent = this;
            height += lines[i].height
        }
        this.height = height
    }
    LeafChunk.prototype = {
        chunkSize: function() {
            return this.lines.length
        },
        remove: function(at, n, callbacks) {
            for (var i = at,
            e = at + n; i < e; ++i) {
                var line = this.lines[i];
                this.height -= line.height;
                line.cleanUp();
                if (line.handlers) {
                    for (var j = 0; j < line.handlers.length; ++j) {
                        callbacks.push(line.handlers[j])
                    }
                }
            }
            this.lines.splice(at, n)
        },
        collapse: function(lines) {
            lines.splice.apply(lines, [lines.length, 0].concat(this.lines))
        },
        insertHeight: function(at, lines, height) {
            this.height += height;
            this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
            for (var i = 0,
            e = lines.length; i < e; ++i) {
                lines[i].parent = this
            }
        },
        iterN: function(at, n, op) {
            for (var e = at + n; at < e; ++at) {
                if (op(this.lines[at])) {
                    return true
                }
            }
        }
    };
    function BranchChunk(children) {
        this.children = children;
        var size = 0,
        height = 0;
        for (var i = 0,
        e = children.length; i < e; ++i) {
            var ch = children[i];
            size += ch.chunkSize();
            height += ch.height;
            ch.parent = this
        }
        this.size = size;
        this.height = height;
        this.parent = null
    }
    BranchChunk.prototype = {
        chunkSize: function() {
            return this.size
        },
        remove: function(at, n, callbacks) {
            this.size -= n;
            for (var i = 0; i < this.children.length; ++i) {
                var child = this.children[i],
                sz = child.chunkSize();
                if (at < sz) {
                    var rm = Math.min(n, sz - at),
                    oldHeight = child.height;
                    child.remove(at, rm, callbacks);
                    this.height -= oldHeight - child.height;
                    if (sz == rm) {
                        this.children.splice(i--, 1);
                        child.parent = null
                    }
                    if ((n -= rm) == 0) {
                        break
                    }
                    at = 0
                } else {
                    at -= sz
                }
            }
            if (this.size - n < 25) {
                var lines = [];
                this.collapse(lines);
                this.children = [new LeafChunk(lines)];
                this.children[0].parent = this
            }
        },
        collapse: function(lines) {
            for (var i = 0,
            e = this.children.length; i < e; ++i) {
                this.children[i].collapse(lines)
            }
        },
        insert: function(at, lines) {
            var height = 0;
            for (var i = 0,
            e = lines.length; i < e; ++i) {
                height += lines[i].height
            }
            this.insertHeight(at, lines, height)
        },
        insertHeight: function(at, lines, height) {
            this.size += lines.length;
            this.height += height;
            for (var i = 0,
            e = this.children.length; i < e; ++i) {
                var child = this.children[i],
                sz = child.chunkSize();
                if (at <= sz) {
                    child.insertHeight(at, lines, height);
                    if (child.lines && child.lines.length > 50) {
                        while (child.lines.length > 50) {
                            var spilled = child.lines.splice(child.lines.length - 25, 25);
                            var newleaf = new LeafChunk(spilled);
                            child.height -= newleaf.height;
                            this.children.splice(i + 1, 0, newleaf);
                            newleaf.parent = this
                        }
                        this.maybeSpill()
                    }
                    break
                }
                at -= sz
            }
        },
        maybeSpill: function() {
            if (this.children.length <= 10) {
                return
            }
            var me = this;
            do {
                var spilled = me.children.splice(me.children.length - 5, 5);
                var sibling = new BranchChunk(spilled);
                if (!me.parent) {
                    var copy = new BranchChunk(me.children);
                    copy.parent = me;
                    me.children = [copy, sibling];
                    me = copy
                } else {
                    me.size -= sibling.size;
                    me.height -= sibling.height;
                    var myIndex = indexOf(me.parent.children, me);
                    me.parent.children.splice(myIndex + 1, 0, sibling)
                }
                sibling.parent = me.parent
            } while ( me . children . length > 10 );
            me.parent.maybeSpill()
        },
        iter: function(from, to, op) {
            this.iterN(from, to - from, op)
        },
        iterN: function(at, n, op) {
            for (var i = 0,
            e = this.children.length; i < e; ++i) {
                var child = this.children[i],
                sz = child.chunkSize();
                if (at < sz) {
                    var used = Math.min(n, sz - at);
                    if (child.iterN(at, used, op)) {
                        return true
                    }
                    if ((n -= used) == 0) {
                        break
                    }
                    at = 0
                } else {
                    at -= sz
                }
            }
        }
    };
    function getLineAt(chunk, n) {
        while (!chunk.lines) {
            for (var i = 0;; ++i) {
                var child = chunk.children[i],
                sz = child.chunkSize();
                if (n < sz) {
                    chunk = child;
                    break
                }
                n -= sz
            }
        }
        return chunk.lines[n]
    }
    function lineNo(line) {
        if (line.parent == null) {
            return null
        }
        var cur = line.parent,
        no = indexOf(cur.lines, line);
        for (var chunk = cur.parent; chunk; cur = chunk, chunk = chunk.parent) {
            for (var i = 0,
            e = chunk.children.length;; ++i) {
                if (chunk.children[i] == cur) {
                    break
                }
                no += chunk.children[i].chunkSize()
            }
        }
        return no
    }
    function lineAtHeight(chunk, h) {
        var n = 0;
        outer: do {
            for (var i = 0,
            e = chunk.children.length; i < e; ++i) {
                var child = chunk.children[i],
                ch = child.height;
                if (h < ch) {
                    chunk = child;
                    continue outer
                }
                h -= ch;
                n += child.chunkSize()
            }
            return n
        } while (! chunk . lines );
        for (var i = 0,
        e = chunk.lines.length; i < e; ++i) {
            var line = chunk.lines[i],
            lh = line.height;
            if (h < lh) {
                break
            }
            h -= lh
        }
        return n + i
    }
    function heightAtLine(chunk, n) {
        var h = 0;
        outer: do {
            for (var i = 0,
            e = chunk.children.length; i < e; ++i) {
                var child = chunk.children[i],
                sz = child.chunkSize();
                if (n < sz) {
                    chunk = child;
                    continue outer
                }
                n -= sz;
                h += child.height
            }
            return h
        } while (! chunk . lines );
        for (var i = 0; i < n; ++i) {
            h += chunk.lines[i].height
        }
        return h
    }
    function History() {
        this.time = 0;
        this.done = [];
        this.undone = [];
        this.compound = 0;
        this.closed = false
    }
    History.prototype = {
        addChange: function(start, added, old) {
            this.undone.length = 0;
            var time = +new Date,
            cur = this.done[this.done.length - 1],
            last = cur && cur[cur.length - 1];
            var dtime = time - this.time;
            if (this.compound && cur && !this.closed) {
                cur.push({
                    start: start,
                    added: added,
                    old: old
                })
            } else {
                if (dtime > 400 || !last || this.closed || last.start > start + old.length || last.start + last.added < start) {
                    this.done.push([{
                        start: start,
                        added: added,
                        old: old
                    }]);
                    this.closed = false
                } else {
                    var startBefore = Math.max(0, last.start - start),
                    endAfter = Math.max(0, (start + old.length) - (last.start + last.added));
                    for (var i = startBefore; i > 0; --i) {
                        last.old.unshift(old[i - 1])
                    }
                    for (var i = endAfter; i > 0; --i) {
                        last.old.push(old[old.length - i])
                    }
                    if (startBefore) {
                        last.start = start
                    }
                    last.added += added - (old.length - startBefore - endAfter)
                }
            }
            this.time = time
        },
        startCompound: function() {
            if (!this.compound++) {
                this.closed = true
            }
        },
        endCompound: function() {
            if (!--this.compound) {
                this.closed = true
            }
        }
    };
    function stopMethod() {
        e_stop(this)
    }
    function addStop(event) {
        if (!event.stop) {
            event.stop = stopMethod
        }
        return event
    }
    function e_preventDefault(e) {
        if (e.preventDefault) {
            e.preventDefault()
        } else {
            e.returnValue = false
        }
    }
    function e_stopPropagation(e) {
        if (e.stopPropagation) {
            e.stopPropagation()
        } else {
            e.cancelBubble = true
        }
    }
    function e_stop(e) {
        e_preventDefault(e);
        e_stopPropagation(e)
    }
    CodeMirror.e_stop = e_stop;
    CodeMirror.e_preventDefault = e_preventDefault;
    CodeMirror.e_stopPropagation = e_stopPropagation;
    function e_target(e) {
        return e.target || e.srcElement
    }
    function e_button(e) {
        if (e.which) {
            return e.which
        } else {
            if (e.button & 1) {
                return 1
            } else {
                if (e.button & 2) {
                    return 3
                } else {
                    if (e.button & 4) {
                        return 2
                    }
                }
            }
        }
    }
    function e_prop(e, prop) {
        var overridden = e.override && e.override.hasOwnProperty(prop);
        return overridden ? e.override[prop] : e[prop]
    }
    function connect(node, type, handler, disconnect) {
        if (typeof node.addEventListener == "function") {
            node.addEventListener(type, handler, false);
            if (disconnect) {
                return function() {
                    node.removeEventListener(type, handler, false)
                }
            }
        } else {
            var wrapHandler = function(event) {
                handler(event || window.event)
            };
            node.attachEvent("on" + type, wrapHandler);
            if (disconnect) {
                return function() {
                    node.detachEvent("on" + type, wrapHandler)
                }
            }
        }
    }
    CodeMirror.connect = connect;
    function Delayed() {
        this.id = null
    }
    Delayed.prototype = {
        set: function(ms, f) {
            clearTimeout(this.id);
            this.id = setTimeout(f, ms)
        }
    };
    var Pass = CodeMirror.Pass = {
        toString: function() {
            return "CodeMirror.Pass"
        }
    };
    var gecko = /gecko\/\d{7}/i.test(navigator.userAgent);
    var ie = /MSIE \d/.test(navigator.userAgent);
    var ie_lt9 = /MSIE [1-8]\b/.test(navigator.userAgent);
    var quirksMode = ie && document.documentMode == 5;
    var webkit = /WebKit\//.test(navigator.userAgent);
    var chrome = /Chrome\//.test(navigator.userAgent);
    var safari = /Apple Computer/.test(navigator.vendor);
    var khtml = /KHTML\//.test(navigator.userAgent);
    var dragAndDrop = function() {
        if (ie_lt9) {
            return false
        }
        var div = document.createElement("div");
        return "draggable" in div || "dragDrop" in div
    } ();
    var lineSep = function() {
        var te = document.createElement("textarea");
        te.value = "foo\nbar";
        if (te.value.indexOf("\r") > -1) {
            return "\r\n"
        }
        return "\n"
    } ();
    var spanAffectsWrapping = /^$/;
    if (gecko) {
        spanAffectsWrapping = /$'/
    } else {
        if (safari) {
            spanAffectsWrapping = /\-[^ \-?]|\?[^ !'\"\),.\-\/:;\?\]\}]/
        } else {
            if (chrome) {
                spanAffectsWrapping = /\-[^ \-\.?]|\?[^ \-\.?\]\}:;!'\"\),\/]|[\.!\"#&%\)*+,:;=>\]|\}~][\(\{\[<]|\$'/
            }
        }
    }
    function countColumn(string, end, tabSize) {
        if (end == null) {
            end = string.search(/[^\s\u00a0]/);
            if (end == -1) {
                end = string.length
            }
        }
        for (var i = 0,
        n = 0; i < end; ++i) {
            if (string.charAt(i) == "\t") {
                n += tabSize - (n % tabSize)
            } else {++n
            }
        }
        return n
    }
    function computedStyle(elt) {
        if (elt.currentStyle) {
            return elt.currentStyle
        }
        return window.getComputedStyle(elt, null)
    }
    function eltOffset(node, screen) {
        var bod = node.ownerDocument.body;
        var x = 0,
        y = 0,
        skipBody = false;
        for (var n = node; n; n = n.offsetParent) {
            var ol = n.offsetLeft,
            ot = n.offsetTop;
            if (n == bod) {
                x += Math.abs(ol);
                y += Math.abs(ot)
            } else {
                x += ol,
                y += ot
            }
            if (screen && computedStyle(n).position == "fixed") {
                skipBody = true
            }
        }
        var e = screen && !skipBody ? null: bod;
        for (var n = node.parentNode; n != e; n = n.parentNode) {
            if (n.scrollLeft != null) {
                x -= n.scrollLeft;
                y -= n.scrollTop
            }
        }
        return {
            left: x,
            top: y
        }
    }
    if (document.documentElement.getBoundingClientRect != null) {
        eltOffset = function(node, screen) {
            try {
                var box = node.getBoundingClientRect();
                box = {
                    top: box.top,
                    left: box.left
                }
            } catch(e) {
                box = {
                    top: 0,
                    left: 0
                }
            }
            if (!screen) {
                if (window.pageYOffset == null) {
                    var t = document.documentElement || document.body.parentNode;
                    if (t.scrollTop == null) {
                        t = document.body
                    }
                    box.top += t.scrollTop;
                    box.left += t.scrollLeft
                } else {
                    box.top += window.pageYOffset;
                    box.left += window.pageXOffset
                }
            }
            return box
        }
    }
    function eltText(node) {
        return node.textContent || node.innerText || node.nodeValue || ""
    }
    function selectInput(node) {
        if (ios) {
            node.selectionStart = 0;
            node.selectionEnd = node.value.length
        } else {
            node.select()
        }
    }
    function posEq(a, b) {
        return a.line == b.line && a.ch == b.ch
    }
    function posLess(a, b) {
        return a.line < b.line || (a.line == b.line && a.ch < b.ch)
    }
    function copyPos(x) {
        return {
            line: x.line,
            ch: x.ch
        }
    }
    var escapeElement = document.createElement("pre");
    function htmlEscape(str) {
        escapeElement.textContent = str;
        return escapeElement.innerHTML
    }
    if (htmlEscape("a") == "\na") {
        htmlEscape = function(str) {
            escapeElement.textContent = str;
            return escapeElement.innerHTML.slice(1)
        }
    } else {
        if (htmlEscape("\t") != "\t") {
            htmlEscape = function(str) {
                escapeElement.innerHTML = "";
                escapeElement.appendChild(document.createTextNode(str));
                return escapeElement.innerHTML
            }
        }
    }
    CodeMirror.htmlEscape = htmlEscape;
    function editEnd(from, to) {
        if (!to) {
            return 0
        }
        if (!from) {
            return to.length
        }
        for (var i = from.length,
        j = to.length; i >= 0 && j >= 0; --i, --j) {
            if (from.charAt(i) != to.charAt(j)) {
                break
            }
        }
        return j + 1
    }
    function indexOf(collection, elt) {
        if (collection.indexOf) {
            return collection.indexOf(elt)
        }
        for (var i = 0,
        e = collection.length; i < e; ++i) {
            if (collection[i] == elt) {
                return i
            }
        }
        return - 1
    }
    function isWordChar(ch) {
        return /\w/.test(ch) || ch.toUpperCase() != ch.toLowerCase()
    }
    var splitLines = "\n\nb".split(/\n/).length != 3 ?
    function(string) {
        var pos = 0,
        nl, result = [];
        while ((nl = string.indexOf("\n", pos)) > -1) {
            result.push(string.slice(pos, string.charAt(nl - 1) == "\r" ? nl - 1 : nl));
            pos = nl + 1
        }
        result.push(string.slice(pos));
        return result
    }: function(string) {
        return string.split(/\r?\n/)
    };
    CodeMirror.splitLines = splitLines;
    var hasSelection = window.getSelection ?
    function(te) {
        try {
            return te.selectionStart != te.selectionEnd
        } catch(e) {
            return false
        }
    }: function(te) {
        try {
            var range = te.ownerDocument.selection.createRange()
        } catch(e) {}
        if (!range || range.parentElement() != te) {
            return false
        }
        return range.compareEndPoints("StartToEnd", range) != 0
    };
    CodeMirror.defineMode("null",
    function() {
        return {
            token: function(stream) {
                stream.skipToEnd()
            }
        }
    });
    CodeMirror.defineMIME("text/plain", "null");
    var keyNames = {
        3 : "Enter",
        8 : "Backspace",
        9 : "Tab",
        13 : "Enter",
        16 : "Shift",
        17 : "Ctrl",
        18 : "Alt",
        19 : "Pause",
        20 : "CapsLock",
        27 : "Esc",
        32 : "Space",
        33 : "PageUp",
        34 : "PageDown",
        35 : "End",
        36 : "Home",
        37 : "Left",
        38 : "Up",
        39 : "Right",
        40 : "Down",
        44 : "PrintScrn",
        45 : "Insert",
        46 : "Delete",
        59 : ";",
        91 : "Mod",
        92 : "Mod",
        93 : "Mod",
        127 : "Delete",
        186 : ";",
        187 : "=",
        188 : ",",
        189 : "-",
        190 : ".",
        191 : "/",
        192 : "`",
        219 : "[",
        220 : "\\",
        221 : "]",
        222 : "'",
        63276 : "PageUp",
        63277 : "PageDown",
        63275 : "End",
        63273 : "Home",
        63234 : "Left",
        63232 : "Up",
        63235 : "Right",
        63233 : "Down",
        63302 : "Insert",
        63272 : "Delete"
    };
    CodeMirror.keyNames = keyNames; (function() {
        for (var i = 0; i < 10; i++) {
            keyNames[i + 48] = String(i)
        }
        for (var i = 65; i <= 90; i++) {
            keyNames[i] = String.fromCharCode(i)
        }
        for (var i = 1; i <= 12; i++) {
            keyNames[i + 111] = keyNames[i + 63235] = "F" + i
        }
    })();
    return CodeMirror
})();
CodeMirror.defineMode("htmlmixed",
function(config, parserConfig) {
    var htmlMode = CodeMirror.getMode(config, {
        name: "xml",
        htmlMode: true
    });
    var jsMode = CodeMirror.getMode(config, "javascript");
    var cssMode = CodeMirror.getMode(config, "css");
    function html(stream, state) {
        var style = htmlMode.token(stream, state.htmlState);
        if (style == "tag" && stream.current() == ">" && state.htmlState.context) {
            if (/^script$/i.test(state.htmlState.context.tagName)) {
                state.token = javascript;
                state.localState = jsMode.startState(htmlMode.indent(state.htmlState, ""));
                state.mode = "javascript"
            } else {
                if (/^style$/i.test(state.htmlState.context.tagName)) {
                    state.token = css;
                    state.localState = cssMode.startState(htmlMode.indent(state.htmlState, ""));
                    state.mode = "css"
                }
            }
        }
        return style
    }
    function maybeBackup(stream, pat, style) {
        var cur = stream.current();
        var close = cur.search(pat);
        if (close > -1) {
            stream.backUp(cur.length - close)
        }
        return style
    }
    function javascript(stream, state) {
        if (stream.match(/^<\/\s*script\s*>/i, false)) {
            state.token = html;
            state.localState = null;
            state.mode = "html";
            return html(stream, state)
        }
        return maybeBackup(stream, /<\/\s*script\s*>/, jsMode.token(stream, state.localState))
    }
    function css(stream, state) {
        if (stream.match(/^<\/\s*style\s*>/i, false)) {
            state.token = html;
            state.localState = null;
            state.mode = "html";
            return html(stream, state)
        }
        return maybeBackup(stream, /<\/\s*style\s*>/, cssMode.token(stream, state.localState))
    }
    return {
        startState: function() {
            var state = htmlMode.startState();
            return {
                token: html,
                localState: null,
                mode: "html",
                htmlState: state
            }
        },
        copyState: function(state) {
            if (state.localState) {
                var local = CodeMirror.copyState(state.token == css ? cssMode: jsMode, state.localState)
            }
            return {
                token: state.token,
                localState: local,
                mode: state.mode,
                htmlState: CodeMirror.copyState(htmlMode, state.htmlState)
            }
        },
        token: function(stream, state) {
            return state.token(stream, state)
        },
        indent: function(state, textAfter) {
            if (state.token == html || /^\s*<\//.test(textAfter)) {
                return htmlMode.indent(state.htmlState, textAfter)
            } else {
                if (state.token == javascript) {
                    return jsMode.indent(state.localState, textAfter)
                } else {
                    return cssMode.indent(state.localState, textAfter)
                }
            }
        },
        compareStates: function(a, b) {
            if (a.mode != b.mode) {
                return false
            }
            if (a.localState) {
                return CodeMirror.Pass
            }
            return htmlMode.compareStates(a.htmlState, b.htmlState)
        },
        electricChars: "/{}:"
    }
},
"xml", "javascript", "css");
CodeMirror.defineMIME("text/html", "htmlmixed");
CodeMirror.defineMode("xml",
function(config, parserConfig) {
    var indentUnit = config.indentUnit;
    var Kludges = parserConfig.htmlMode ? {
        autoSelfClosers: {
            "area": true,
            "base": true,
            "br": true,
            "col": true,
            "command": true,
            "embed": true,
            "frame": true,
            "hr": true,
            "img": true,
            "input": true,
            "keygen": true,
            "link": true,
            "meta": true,
            "param": true,
            "source": true,
            "track": true,
            "wbr": true
        },
        implicitlyClosed: {
            "dd": true,
            "li": true,
            "optgroup": true,
            "option": true,
            "p": true,
            "rp": true,
            "rt": true,
            "tbody": true,
            "td": true,
            "tfoot": true,
            "th": true,
            "tr": true
        },
        contextGrabbers: {
            "dd": {
                "dd": true,
                "dt": true
            },
            "dt": {
                "dd": true,
                "dt": true
            },
            "li": {
                "li": true
            },
            "option": {
                "option": true,
                "optgroup": true
            },
            "optgroup": {
                "optgroup": true
            },
            "p": {
                "address": true,
                "article": true,
                "aside": true,
                "blockquote": true,
                "dir": true,
                "div": true,
                "dl": true,
                "fieldset": true,
                "footer": true,
                "form": true,
                "h1": true,
                "h2": true,
                "h3": true,
                "h4": true,
                "h5": true,
                "h6": true,
                "header": true,
                "hgroup": true,
                "hr": true,
                "menu": true,
                "nav": true,
                "ol": true,
                "p": true,
                "pre": true,
                "section": true,
                "table": true,
                "ul": true
            },
            "rp": {
                "rp": true,
                "rt": true
            },
            "rt": {
                "rp": true,
                "rt": true
            },
            "tbody": {
                "tbody": true,
                "tfoot": true
            },
            "td": {
                "td": true,
                "th": true
            },
            "tfoot": {
                "tbody": true
            },
            "th": {
                "td": true,
                "th": true
            },
            "thead": {
                "tbody": true,
                "tfoot": true
            },
            "tr": {
                "tr": true
            }
        },
        doNotIndent: {
            "pre": true
        },
        allowUnquoted: true,
        allowMissing: false
    }: {
        autoSelfClosers: {},
        implicitlyClosed: {},
        contextGrabbers: {},
        doNotIndent: {},
        allowUnquoted: false,
        allowMissing: false
    };
    var alignCDATA = parserConfig.alignCDATA;
    var tagName, type;
    function inText(stream, state) {
        function chain(parser) {
            state.tokenize = parser;
            return parser(stream, state)
        }
        var ch = stream.next();
        if (ch == "<") {
            if (stream.eat("!")) {
                if (stream.eat("[")) {
                    if (stream.match("CDATA[")) {
                        return chain(inBlock("atom", "]]>"))
                    } else {
                        return null
                    }
                } else {
                    if (stream.match("--")) {
                        return chain(inBlock("comment", "-->"))
                    } else {
                        if (stream.match("DOCTYPE", true, true)) {
                            stream.eatWhile(/[\w\._\-]/);
                            return chain(doctype(1))
                        } else {
                            return null
                        }
                    }
                }
            } else {
                if (stream.eat("?")) {
                    stream.eatWhile(/[\w\._\-]/);
                    state.tokenize = inBlock("meta", "?>");
                    return "meta"
                } else {
                    type = stream.eat("/") ? "closeTag": "openTag";
                    stream.eatSpace();
                    tagName = "";
                    var c;
                    while ((c = stream.eat(/[^\s\u00a0=<>\"\'\/?]/))) {
                        tagName += c
                    }
                    state.tokenize = inTag;
                    return "tag"
                }
            }
        } else {
            if (ch == "&") {
                var ok;
                if (stream.eat("#")) {
                    if (stream.eat("x")) {
                        ok = stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";")
                    } else {
                        ok = stream.eatWhile(/[\d]/) && stream.eat(";")
                    }
                } else {
                    ok = stream.eatWhile(/[\w\.\-:]/) && stream.eat(";")
                }
                return ok ? "atom": "error"
            } else {
                stream.eatWhile(/[^&<]/);
                return null
            }
        }
    }
    function inTag(stream, state) {
        var ch = stream.next();
        if (ch == ">" || (ch == "/" && stream.eat(">"))) {
            state.tokenize = inText;
            type = ch == ">" ? "endTag": "selfcloseTag";
            return "tag"
        } else {
            if (ch == "=") {
                type = "equals";
                return null
            } else {
                if (/[\'\"]/.test(ch)) {
                    state.tokenize = inAttribute(ch);
                    return state.tokenize(stream, state)
                } else {
                    stream.eatWhile(/[^\s\u00a0=<>\"\'\/?]/);
                    return "word"
                }
            }
        }
    }
    function inAttribute(quote) {
        return function(stream, state) {
            while (!stream.eol()) {
                if (stream.next() == quote) {
                    state.tokenize = inTag;
                    break
                }
            }
            return "string"
        }
    }
    function inBlock(style, terminator) {
        return function(stream, state) {
            while (!stream.eol()) {
                if (stream.match(terminator)) {
                    state.tokenize = inText;
                    break
                }
                stream.next()
            }
            return style
        }
    }
    function doctype(depth) {
        return function(stream, state) {
            var ch;
            while ((ch = stream.next()) != null) {
                if (ch == "<") {
                    state.tokenize = doctype(depth + 1);
                    return state.tokenize(stream, state)
                } else {
                    if (ch == ">") {
                        if (depth == 1) {
                            state.tokenize = inText;
                            break
                        } else {
                            state.tokenize = doctype(depth - 1);
                            return state.tokenize(stream, state)
                        }
                    }
                }
            }
            return "meta"
        }
    }
    var curState, setStyle;
    function pass() {
        for (var i = arguments.length - 1; i >= 0; i--) {
            curState.cc.push(arguments[i])
        }
    }
    function cont() {
        pass.apply(null, arguments);
        return true
    }
    function pushContext(tagName, startOfLine) {
        var noIndent = Kludges.doNotIndent.hasOwnProperty(tagName) || (curState.context && curState.context.noIndent);
        curState.context = {
            prev: curState.context,
            tagName: tagName,
            indent: curState.indented,
            startOfLine: startOfLine,
            noIndent: noIndent
        }
    }
    function popContext() {
        if (curState.context) {
            curState.context = curState.context.prev
        }
    }
    function element(type) {
        if (type == "openTag") {
            curState.tagName = tagName;
            return cont(attributes, endtag(curState.startOfLine))
        } else {
            if (type == "closeTag") {
                var err = false;
                if (curState.context) {
                    if (curState.context.tagName != tagName) {
                        if (Kludges.implicitlyClosed.hasOwnProperty(curState.context.tagName.toLowerCase())) {
                            popContext()
                        }
                        err = !curState.context || curState.context.tagName != tagName
                    }
                } else {
                    err = true
                }
                if (err) {
                    setStyle = "error"
                }
                return cont(endclosetag(err))
            }
        }
        return cont()
    }
    function endtag(startOfLine) {
        return function(type) {
            if (type == "selfcloseTag" || (type == "endTag" && Kludges.autoSelfClosers.hasOwnProperty(curState.tagName.toLowerCase()))) {
                maybePopContext(curState.tagName.toLowerCase());
                return cont()
            }
            if (type == "endTag") {
                maybePopContext(curState.tagName.toLowerCase());
                pushContext(curState.tagName, startOfLine);
                return cont()
            }
            return cont()
        }
    }
    function endclosetag(err) {
        return function(type) {
            if (err) {
                setStyle = "error"
            }
            if (type == "endTag") {
                popContext();
                return cont()
            }
            setStyle = "error";
            return cont(arguments.callee)
        }
    }
    function maybePopContext(nextTagName) {
        var parentTagName;
        while (true) {
            if (!curState.context) {
                return
            }
            parentTagName = curState.context.tagName.toLowerCase();
            if (!Kludges.contextGrabbers.hasOwnProperty(parentTagName) || !Kludges.contextGrabbers[parentTagName].hasOwnProperty(nextTagName)) {
                return
            }
            popContext()
        }
    }
    function attributes(type) {
        if (type == "word") {
            setStyle = "attribute";
            return cont(attribute, attributes)
        }
        if (type == "endTag" || type == "selfcloseTag") {
            return pass()
        }
        setStyle = "error";
        return cont(attributes)
    }
    function attribute(type) {
        if (type == "equals") {
            return cont(attvalue, attributes)
        }
        if (!Kludges.allowMissing) {
            setStyle = "error"
        }
        return (type == "endTag" || type == "selfcloseTag") ? pass() : cont()
    }
    function attvalue(type) {
        if (type == "string") {
            return cont(attvaluemaybe)
        }
        if (type == "word" && Kludges.allowUnquoted) {
            setStyle = "string";
            return cont()
        }
        setStyle = "error";
        return (type == "endTag" || type == "selfCloseTag") ? pass() : cont()
    }
    function attvaluemaybe(type) {
        if (type == "string") {
            return cont(attvaluemaybe)
        } else {
            return pass()
        }
    }
    return {
        startState: function() {
            return {
                tokenize: inText,
                cc: [],
                indented: 0,
                startOfLine: true,
                tagName: null,
                context: null
            }
        },
        token: function(stream, state) {
            if (stream.sol()) {
                state.startOfLine = true;
                state.indented = stream.indentation()
            }
            if (stream.eatSpace()) {
                return null
            }
            setStyle = type = tagName = null;
            var style = state.tokenize(stream, state);
            state.type = type;
            if ((style || type) && style != "comment") {
                curState = state;
                while (true) {
                    var comb = state.cc.pop() || element;
                    if (comb(type || style)) {
                        break
                    }
                }
            }
            state.startOfLine = false;
            return setStyle || style
        },
        indent: function(state, textAfter, fullLine) {
            var context = state.context;
            if ((state.tokenize != inTag && state.tokenize != inText) || context && context.noIndent) {
                return fullLine ? fullLine.match(/^(\s*)/)[0].length: 0
            }
            if (alignCDATA && /<!\[CDATA\[/.test(textAfter)) {
                return 0
            }
            if (context && /^<\//.test(textAfter)) {
                context = context.prev
            }
            while (context && !context.startOfLine) {
                context = context.prev
            }
            if (context) {
                return context.indent + indentUnit
            } else {
                return 0
            }
        },
        compareStates: function(a, b) {
            if (a.indented != b.indented || a.tokenize != b.tokenize) {
                return false
            }
            for (var ca = a.context,
            cb = b.context;; ca = ca.prev, cb = cb.prev) {
                if (!ca || !cb) {
                    return ca == cb
                }
                if (ca.tagName != cb.tagName) {
                    return false
                }
            }
        },
        electricChars: "/"
    }
});
CodeMirror.defineMIME("application/xml", "xml");
if (!CodeMirror.mimeModes.hasOwnProperty("text/html")) {
    CodeMirror.defineMIME("text/html", {
        name: "xml",
        htmlMode: true
    })
}
CodeMirror.defineMode("javascript",
function(config, parserConfig) {
    var indentUnit = config.indentUnit;
    var jsonMode = parserConfig.json;
    var keywords = function() {
        function kw(type) {
            return {
                type: type,
                style: "keyword"
            }
        }
        var A = kw("keyword a"),
        B = kw("keyword b"),
        C = kw("keyword c");
        var operator = kw("operator"),
        atom = {
            type: "atom",
            style: "atom"
        };
        return {
            "if": A,
            "while": A,
            "with": A,
            "else": B,
            "do": B,
            "try": B,
            "finally": B,
            "return": C,
            "break": C,
            "continue": C,
            "new": C,
            "delete": C,
            "throw": C,
            "var": kw("var"),
            "const": kw("var"),
            "let": kw("var"),
            "function": kw("function"),
            "catch": kw("catch"),
            "for": kw("for"),
            "switch": kw("switch"),
            "case": kw("case"),
            "default": kw("default"),
            "in": operator,
            "typeof": operator,
            "instanceof": operator,
            "true": atom,
            "false": atom,
            "null": atom,
            "undefined": atom,
            "NaN": atom,
            "Infinity": atom
        }
    } ();
    var isOperatorChar = /[+\-*&%=<>!?|]/;
    function chain(stream, state, f) {
        state.tokenize = f;
        return f(stream, state)
    }
    function nextUntilUnescaped(stream, end) {
        var escaped = false,
        next;
        while ((next = stream.next()) != null) {
            if (next == end && !escaped) {
                return false
            }
            escaped = !escaped && next == "\\"
        }
        return escaped
    }
    var type, content;
    function ret(tp, style, cont) {
        type = tp;
        content = cont;
        return style
    }
    function jsTokenBase(stream, state) {
        var ch = stream.next();
        if (ch == '"' || ch == "'") {
            return chain(stream, state, jsTokenString(ch))
        } else {
            if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
                return ret(ch)
            } else {
                if (ch == "0" && stream.eat(/x/i)) {
                    stream.eatWhile(/[\da-f]/i);
                    return ret("number", "number")
                } else {
                    if (/\d/.test(ch) || ch == "-" && stream.eat(/\d/)) {
                        stream.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
                        return ret("number", "number")
                    } else {
                        if (ch == "/") {
                            if (stream.eat("*")) {
                                return chain(stream, state, jsTokenComment)
                            } else {
                                if (stream.eat("/")) {
                                    stream.skipToEnd();
                                    return ret("comment", "comment")
                                } else {
                                    if (state.reAllowed) {
                                        nextUntilUnescaped(stream, "/");
                                        stream.eatWhile(/[gimy]/);
                                        return ret("regexp", "string-2")
                                    } else {
                                        stream.eatWhile(isOperatorChar);
                                        return ret("operator", null, stream.current())
                                    }
                                }
                            }
                        } else {
                            if (ch == "#") {
                                stream.skipToEnd();
                                return ret("error", "error")
                            } else {
                                if (isOperatorChar.test(ch)) {
                                    stream.eatWhile(isOperatorChar);
                                    return ret("operator", null, stream.current())
                                } else {
                                    stream.eatWhile(/[\w\$_]/);
                                    var word = stream.current(),
                                    known = keywords.propertyIsEnumerable(word) && keywords[word];
                                    return (known && state.kwAllowed) ? ret(known.type, known.style, word) : ret("variable", "variable", word)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    function jsTokenString(quote) {
        return function(stream, state) {
            if (!nextUntilUnescaped(stream, quote)) {
                state.tokenize = jsTokenBase
            }
            return ret("string", "string")
        }
    }
    function jsTokenComment(stream, state) {
        var maybeEnd = false,
        ch;
        while (ch = stream.next()) {
            if (ch == "/" && maybeEnd) {
                state.tokenize = jsTokenBase;
                break
            }
            maybeEnd = (ch == "*")
        }
        return ret("comment", "comment")
    }
    var atomicTypes = {
        "atom": true,
        "number": true,
        "variable": true,
        "string": true,
        "regexp": true
    };
    function JSLexical(indented, column, type, align, prev, info) {
        this.indented = indented;
        this.column = column;
        this.type = type;
        this.prev = prev;
        this.info = info;
        if (align != null) {
            this.align = align
        }
    }
    function inScope(state, varname) {
        for (var v = state.localVars; v; v = v.next) {
            if (v.name == varname) {
                return true
            }
        }
    }
    function parseJS(state, style, type, content, stream) {
        var cc = state.cc;
        cx.state = state;
        cx.stream = stream;
        cx.marked = null,
        cx.cc = cc;
        if (!state.lexical.hasOwnProperty("align")) {
            state.lexical.align = true
        }
        while (true) {
            var combinator = cc.length ? cc.pop() : jsonMode ? expression: statement;
            if (combinator(type, content)) {
                while (cc.length && cc[cc.length - 1].lex) {
                    cc.pop()()
                }
                if (cx.marked) {
                    return cx.marked
                }
                if (type == "variable" && inScope(state, content)) {
                    return "variable-2"
                }
                return style
            }
        }
    }
    var cx = {
        state: null,
        column: null,
        marked: null,
        cc: null
    };
    function pass() {
        for (var i = arguments.length - 1; i >= 0; i--) {
            cx.cc.push(arguments[i])
        }
    }
    function cont() {
        pass.apply(null, arguments);
        return true
    }
    function register(varname) {
        var state = cx.state;
        if (state.context) {
            cx.marked = "def";
            for (var v = state.localVars; v; v = v.next) {
                if (v.name == varname) {
                    return
                }
            }
            state.localVars = {
                name: varname,
                next: state.localVars
            }
        }
    }
    var defaultVars = {
        name: "this",
        next: {
            name: "arguments"
        }
    };
    function pushcontext() {
        if (!cx.state.context) {
            cx.state.localVars = defaultVars
        }
        cx.state.context = {
            prev: cx.state.context,
            vars: cx.state.localVars
        }
    }
    function popcontext() {
        cx.state.localVars = cx.state.context.vars;
        cx.state.context = cx.state.context.prev
    }
    function pushlex(type, info) {
        var result = function() {
            var state = cx.state;
            state.lexical = new JSLexical(state.indented, cx.stream.column(), type, null, state.lexical, info)
        };
        result.lex = true;
        return result
    }
    function poplex() {
        var state = cx.state;
        if (state.lexical.prev) {
            if (state.lexical.type == ")") {
                state.indented = state.lexical.indented
            }
            state.lexical = state.lexical.prev
        }
    }
    poplex.lex = true;
    function expect(wanted) {
        return function expecting(type) {
            if (type == wanted) {
                return cont()
            } else {
                if (wanted == ";") {
                    return pass()
                } else {
                    return cont(arguments.callee)
                }
            }
        }
    }
    function statement(type) {
        if (type == "var") {
            return cont(pushlex("vardef"), vardef1, expect(";"), poplex)
        }
        if (type == "keyword a") {
            return cont(pushlex("form"), expression, statement, poplex)
        }
        if (type == "keyword b") {
            return cont(pushlex("form"), statement, poplex)
        }
        if (type == "{") {
            return cont(pushlex("}"), block, poplex)
        }
        if (type == ";") {
            return cont()
        }
        if (type == "function") {
            return cont(functiondef)
        }
        if (type == "for") {
            return cont(pushlex("form"), expect("("), pushlex(")"), forspec1, expect(")"), poplex, statement, poplex)
        }
        if (type == "variable") {
            return cont(pushlex("stat"), maybelabel)
        }
        if (type == "switch") {
            return cont(pushlex("form"), expression, pushlex("}", "switch"), expect("{"), block, poplex, poplex)
        }
        if (type == "case") {
            return cont(expression, expect(":"))
        }
        if (type == "default") {
            return cont(expect(":"))
        }
        if (type == "catch") {
            return cont(pushlex("form"), pushcontext, expect("("), funarg, expect(")"), statement, poplex, popcontext)
        }
        return pass(pushlex("stat"), expression, expect(";"), poplex)
    }
    function expression(type) {
        if (atomicTypes.hasOwnProperty(type)) {
            return cont(maybeoperator)
        }
        if (type == "function") {
            return cont(functiondef)
        }
        if (type == "keyword c") {
            return cont(maybeexpression)
        }
        if (type == "(") {
            return cont(pushlex(")"), maybeexpression, expect(")"), poplex, maybeoperator)
        }
        if (type == "operator") {
            return cont(expression)
        }
        if (type == "[") {
            return cont(pushlex("]"), commasep(expression, "]"), poplex, maybeoperator)
        }
        if (type == "{") {
            return cont(pushlex("}"), commasep(objprop, "}"), poplex, maybeoperator)
        }
        return cont()
    }
    function maybeexpression(type) {
        if (type.match(/[;\}\)\],]/)) {
            return pass()
        }
        return pass(expression)
    }
    function maybeoperator(type, value) {
        if (type == "operator" && /\+\+|--/.test(value)) {
            return cont(maybeoperator)
        }
        if (type == "operator" || type == ":") {
            return cont(expression)
        }
        if (type == ";") {
            return
        }
        if (type == "(") {
            return cont(pushlex(")"), commasep(expression, ")"), poplex, maybeoperator)
        }
        if (type == ".") {
            return cont(property, maybeoperator)
        }
        if (type == "[") {
            return cont(pushlex("]"), expression, expect("]"), poplex, maybeoperator)
        }
    }
    function maybelabel(type) {
        if (type == ":") {
            return cont(poplex, statement)
        }
        return pass(maybeoperator, expect(";"), poplex)
    }
    function property(type) {
        if (type == "variable") {
            cx.marked = "property";
            return cont()
        }
    }
    function objprop(type) {
        if (type == "variable") {
            cx.marked = "property"
        }
        if (atomicTypes.hasOwnProperty(type)) {
            return cont(expect(":"), expression)
        }
    }
    function commasep(what, end) {
        function proceed(type) {
            if (type == ",") {
                return cont(what, proceed)
            }
            if (type == end) {
                return cont()
            }
            return cont(expect(end))
        }
        return function commaSeparated(type) {
            if (type == end) {
                return cont()
            } else {
                return pass(what, proceed)
            }
        }
    }
    function block(type) {
        if (type == "}") {
            return cont()
        }
        return pass(statement, block)
    }
    function vardef1(type, value) {
        if (type == "variable") {
            register(value);
            return cont(vardef2)
        }
        return cont()
    }
    function vardef2(type, value) {
        if (value == "=") {
            return cont(expression, vardef2)
        }
        if (type == ",") {
            return cont(vardef1)
        }
    }
    function forspec1(type) {
        if (type == "var") {
            return cont(vardef1, forspec2)
        }
        if (type == ";") {
            return pass(forspec2)
        }
        if (type == "variable") {
            return cont(formaybein)
        }
        return pass(forspec2)
    }
    function formaybein(type, value) {
        if (value == "in") {
            return cont(expression)
        }
        return cont(maybeoperator, forspec2)
    }
    function forspec2(type, value) {
        if (type == ";") {
            return cont(forspec3)
        }
        if (value == "in") {
            return cont(expression)
        }
        return cont(expression, expect(";"), forspec3)
    }
    function forspec3(type) {
        if (type != ")") {
            cont(expression)
        }
    }
    function functiondef(type, value) {
        if (type == "variable") {
            register(value);
            return cont(functiondef)
        }
        if (type == "(") {
            return cont(pushlex(")"), pushcontext, commasep(funarg, ")"), poplex, statement, popcontext)
        }
    }
    function funarg(type, value) {
        if (type == "variable") {
            register(value);
            return cont()
        }
    }
    return {
        startState: function(basecolumn) {
            return {
                tokenize: jsTokenBase,
                reAllowed: true,
                kwAllowed: true,
                cc: [],
                lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
                localVars: parserConfig.localVars,
                context: parserConfig.localVars && {
                    vars: parserConfig.localVars
                },
                indented: 0
            }
        },
        token: function(stream, state) {
            if (stream.sol()) {
                if (!state.lexical.hasOwnProperty("align")) {
                    state.lexical.align = false
                }
                state.indented = stream.indentation()
            }
            if (stream.eatSpace()) {
                return null
            }
            var style = state.tokenize(stream, state);
            if (type == "comment") {
                return style
            }
            state.reAllowed = !!(type == "operator" || type == "keyword c" || type.match(/^[\[{}\(,;:]$/));
            state.kwAllowed = type != ".";
            return parseJS(state, style, type, content, stream)
        },
        indent: function(state, textAfter) {
            if (state.tokenize != jsTokenBase) {
                return 0
            }
            var firstChar = textAfter && textAfter.charAt(0),
            lexical = state.lexical;
            if (lexical.type == "stat" && firstChar == "}") {
                lexical = lexical.prev
            }
            var type = lexical.type,
            closing = firstChar == type;
            if (type == "vardef") {
                return lexical.indented + 4
            } else {
                if (type == "form" && firstChar == "{") {
                    return lexical.indented
                } else {
                    if (type == "stat" || type == "form") {
                        return lexical.indented + indentUnit
                    } else {
                        if (lexical.info == "switch" && !closing) {
                            return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit: 2 * indentUnit)
                        } else {
                            if (lexical.align) {
                                return lexical.column + (closing ? 0 : 1)
                            } else {
                                return lexical.indented + (closing ? 0 : indentUnit)
                            }
                        }
                    }
                }
            }
        },
        electricChars: ":{}"
    }
});
CodeMirror.defineMIME("text/javascript", "javascript");
CodeMirror.defineMIME("application/json", {
    name: "javascript",
    json: true
});
CodeMirror.defineMode("css",
function(config) {
    var indentUnit = config.indentUnit,
    type;
    function ret(style, tp) {
        type = tp;
        return style
    }
    function tokenBase(stream, state) {
        var ch = stream.next();
        if (ch == "@") {
            stream.eatWhile(/[\w\\\-]/);
            return ret("meta", stream.current())
        } else {
            if (ch == "/" && stream.eat("*")) {
                state.tokenize = tokenCComment;
                return tokenCComment(stream, state)
            } else {
                if (ch == "<" && stream.eat("!")) {
                    state.tokenize = tokenSGMLComment;
                    return tokenSGMLComment(stream, state)
                } else {
                    if (ch == "=") {
                        ret(null, "compare")
                    } else {
                        if ((ch == "~" || ch == "|") && stream.eat("=")) {
                            return ret(null, "compare")
                        } else {
                            if (ch == '"' || ch == "'") {
                                state.tokenize = tokenString(ch);
                                return state.tokenize(stream, state)
                            } else {
                                if (ch == "#") {
                                    stream.eatWhile(/[\w\\\-]/);
                                    return ret("atom", "hash")
                                } else {
                                    if (ch == "!") {
                                        stream.match(/^\s*\w*/);
                                        return ret("keyword", "important")
                                    } else {
                                        if (/\d/.test(ch)) {
                                            stream.eatWhile(/[\w.%]/);
                                            return ret("number", "unit")
                                        } else {
                                            if (/[,.+>*\/]/.test(ch)) {
                                                return ret(null, "select-op")
                                            } else {
                                                if (/[;{}:\[\]]/.test(ch)) {
                                                    return ret(null, ch)
                                                } else {
                                                    stream.eatWhile(/[\w\\\-]/);
                                                    return ret("variable", "variable")
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    function tokenCComment(stream, state) {
        var maybeEnd = false,
        ch;
        while ((ch = stream.next()) != null) {
            if (maybeEnd && ch == "/") {
                state.tokenize = tokenBase;
                break
            }
            maybeEnd = (ch == "*")
        }
        return ret("comment", "comment")
    }
    function tokenSGMLComment(stream, state) {
        var dashes = 0,
        ch;
        while ((ch = stream.next()) != null) {
            if (dashes >= 2 && ch == ">") {
                state.tokenize = tokenBase;
                break
            }
            dashes = (ch == "-") ? dashes + 1 : 0
        }
        return ret("comment", "comment")
    }
    function tokenString(quote) {
        return function(stream, state) {
            var escaped = false,
            ch;
            while ((ch = stream.next()) != null) {
                if (ch == quote && !escaped) {
                    break
                }
                escaped = !escaped && ch == "\\"
            }
            if (!escaped) {
                state.tokenize = tokenBase
            }
            return ret("string", "string")
        }
    }
    return {
        startState: function(base) {
            return {
                tokenize: tokenBase,
                baseIndent: base || 0,
                stack: []
            }
        },
        token: function(stream, state) {
            if (stream.eatSpace()) {
                return null
            }
            var style = state.tokenize(stream, state);
            var context = state.stack[state.stack.length - 1];
            if (type == "hash" && context != "rule") {
                style = "string-2"
            } else {
                if (style == "variable") {
                    if (context == "rule") {
                        style = "number"
                    } else {
                        if (!context || context == "@media{") {
                            style = "tag"
                        }
                    }
                }
            }
            if (context == "rule" && /^[\{\};]$/.test(type)) {
                state.stack.pop()
            }
            if (type == "{") {
                if (context == "@media") {
                    state.stack[state.stack.length - 1] = "@media{"
                } else {
                    state.stack.push("{")
                }
            } else {
                if (type == "}") {
                    state.stack.pop()
                } else {
                    if (type == "@media") {
                        state.stack.push("@media")
                    } else {
                        if (context == "{" && type != "comment") {
                            state.stack.push("rule")
                        }
                    }
                }
            }
            return style
        },
        indent: function(state, textAfter) {
            var n = state.stack.length;
            if (/^\}/.test(textAfter)) {
                n -= state.stack[state.stack.length - 1] == "rule" ? 2 : 1
            }
            return state.baseIndent + n * indentUnit
        },
        electricChars: "}"
    }
});
CodeMirror.defineMIME("text/css", "css"); (function() {
    CodeMirror.defaults["closeTagEnabled"] = true;
    CodeMirror.defaults["closeTagIndent"] = ["applet", "blockquote", "body", "button", "div", "dl", "fieldset", "form", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "html", "iframe", "layer", "legend", "object", "ol", "p", "select", "table", "ul"];
    CodeMirror.defineExtension("closeTag",
    function(cm, ch, indent) {
        if (!cm.getOption("closeTagEnabled")) {
            throw CodeMirror.Pass
        }
        var mode = cm.getOption("mode");
        if (mode == "text/html") {
            var pos = cm.getCursor();
            var tok = cm.getTokenAt(pos);
            var state = tok.state;
            if (state.mode && state.mode != "html") {
                throw CodeMirror.Pass
            }
            if (ch == ">") {
                var type = state.htmlState ? state.htmlState.type: state.type;
                if (tok.className == "tag" && type == "closeTag") {
                    throw CodeMirror.Pass
                }
                cm.replaceSelection(">");
                pos = {
                    line: pos.line,
                    ch: pos.ch + 1
                };
                cm.setCursor(pos);
                tok = cm.getTokenAt(cm.getCursor());
                state = tok.state;
                type = state.htmlState ? state.htmlState.type: state.type;
                if (tok.className == "tag" && type != "selfcloseTag") {
                    var tagName = state.htmlState ? state.htmlState.context.tagName: state.tagName;
                    if (tagName.length > 0) {
                        insertEndTag(cm, indent, pos, tagName)
                    }
                    return
                }
                cm.setSelection({
                    line: pos.line,
                    ch: pos.ch - 1
                },
                pos);
                cm.replaceSelection("")
            } else {
                if (ch == "/") {
                    if (tok.className == "tag" && tok.string == "<") {
                        var tagName = state.htmlState ? (state.htmlState.context ? state.htmlState.context.tagName: "") : state.context.tagName;
                        if (tagName.length > 0) {
                            completeEndTag(cm, pos, tagName);
                            return
                        }
                    }
                }
            }
        }
        throw CodeMirror.Pass
    });
    function insertEndTag(cm, indent, pos, tagName) {
        if (shouldIndent(cm, indent, tagName)) {
            cm.replaceSelection("\n\n</" + tagName + ">", "end");
            cm.indentLine(pos.line + 1);
            cm.indentLine(pos.line + 2);
            cm.setCursor({
                line: pos.line + 1,
                ch: cm.getLine(pos.line + 1).length
            })
        } else {
            cm.replaceSelection("</" + tagName + ">");
            cm.setCursor(pos)
        }
    }
    function shouldIndent(cm, indent, tagName) {
        if (typeof indent == "undefined" || indent == null || indent == true) {
            indent = cm.getOption("closeTagIndent")
        }
        if (!indent) {
            indent = []
        }
        return indexOf(indent, tagName.toLowerCase()) != -1
    }
    function indexOf(collection, elt) {
        if (collection.indexOf) {
            return collection.indexOf(elt)
        }
        for (var i = 0,
        e = collection.length; i < e; ++i) {
            if (collection[i] == elt) {
                return i
            }
        }
        return - 1
    }
    function completeEndTag(cm, pos, tagName) {
        cm.replaceSelection("/" + tagName + ">");
        cm.setCursor({
            line: pos.line,
            ch: pos.ch + tagName.length + 2
        })
    }
})();
CodeMirror.tagRangeFinder = function(cm, line, hideEnd) {
    var nameStartChar = "A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
    var nameChar = nameStartChar + "-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
    var xmlNAMERegExp = new RegExp("^[" + nameStartChar + "][" + nameChar + "]*");
    var lineText = cm.getLine(line);
    var found = false;
    var tag = null;
    var pos = 0;
    while (!found) {
        pos = lineText.indexOf("<", pos);
        if ( - 1 == pos) {
            return
        }
        if (pos + 1 < lineText.length && lineText[pos + 1] == "/") {
            pos++;
            continue
        }
        if (!lineText.substr(pos + 1).match(xmlNAMERegExp)) {
            pos++;
            continue
        }
        var gtPos = lineText.indexOf(">", pos + 1);
        if ( - 1 == gtPos) {
            var l = line + 1;
            var foundGt = false;
            var lastLine = cm.lineCount();
            while (l < lastLine && !foundGt) {
                var lt = cm.getLine(l);
                var gt = lt.indexOf(">");
                if ( - 1 != gt) {
                    foundGt = true;
                    var slash = lt.lastIndexOf("/", gt);
                    if ( - 1 != slash && slash < gt) {
                        var str = lineText.substr(slash, gt - slash + 1);
                        if (!str.match(/\/\s*\>/)) {
                            if (hideEnd === true) {
                                l++
                            }
                            return l
                        }
                    }
                }
                l++
            }
            found = true
        } else {
            var slashPos = lineText.lastIndexOf("/", gtPos);
            if ( - 1 == slashPos) {
                found = true
            } else {
                var str = lineText.substr(slashPos, gtPos - slashPos + 1);
                if (!str.match(/\/\s*\>/)) {
                    found = true
                }
            }
        }
        if (found) {
            var subLine = lineText.substr(pos + 1);
            tag = subLine.match(xmlNAMERegExp);
            if (tag) {
                tag = tag[0];
                if ( - 1 != lineText.indexOf("</" + tag + ">", pos)) {
                    found = false
                }
            } else {
                found = false
            }
        }
        if (!found) {
            pos++
        }
    }
    if (found) {
        var startTag = "(\\<\\/" + tag + "\\>)|(\\<" + tag + "\\>)|(\\<" + tag + "\\s)|(\\<" + tag + "$)";
        var startTagRegExp = new RegExp(startTag, "g");
        var endTag = "</" + tag + ">";
        var depth = 1;
        var l = line + 1;
        var lastLine = cm.lineCount();
        while (l < lastLine) {
            lineText = cm.getLine(l);
            var match = lineText.match(startTagRegExp);
            if (match) {
                for (var i = 0; i < match.length; i++) {
                    if (match[i] == endTag) {
                        depth--
                    } else {
                        depth++
                    }
                    if (!depth) {
                        if (hideEnd === true) {
                            l++
                        }
                        return l
                    }
                }
            }
            l++
        }
        return
    }
};
CodeMirror.braceRangeFinder = function(cm, line, hideEnd) {
    var lineText = cm.getLine(line);
    var startChar = lineText.lastIndexOf("{");
    if (startChar < 0 || lineText.lastIndexOf("}") > startChar) {
        return
    }
    var tokenType = cm.getTokenAt({
        line: line,
        ch: startChar
    }).className;
    var count = 1,
    lastLine = cm.lineCount(),
    end;
    outer: for (var i = line + 1; i < lastLine; ++i) {
        var text = cm.getLine(i),
        pos = 0;
        for (;;) {
            var nextOpen = text.indexOf("{", pos),
            nextClose = text.indexOf("}", pos);
            if (nextOpen < 0) {
                nextOpen = text.length
            }
            if (nextClose < 0) {
                nextClose = text.length
            }
            pos = Math.min(nextOpen, nextClose);
            if (pos == text.length) {
                break
            }
            if (cm.getTokenAt({
                line: i,
                ch: pos + 1
            }).className == tokenType) {
                if (pos == nextOpen) {++count
                } else {
                    if (!--count) {
                        end = i;
                        break outer
                    }
                }
            }++pos
        }
    }
    if (end == null || end == line + 1) {
        return
    }
    if (hideEnd === true) {
        end++
    }
    return end
};
CodeMirror.indentRangeFinder = function(cm, line) {
    var tabSize = cm.getOption("tabSize");
    var myIndent = cm.getLineHandle(line).indentation(tabSize),
    last;
    for (var i = line + 1,
    end = cm.lineCount(); i < end; ++i) {
        var handle = cm.getLineHandle(i);
        if (!/^\s*$/.test(handle.text)) {
            if (handle.indentation(tabSize) <= myIndent) {
                break
            }
            last = i
        }
    }
    if (!last) {
        return null
    }
    return last + 1
};
CodeMirror.newFoldFunction = function(rangeFinder, markText, hideEnd) {
    var folded = [];
    if (markText == null) {
        markText = '<div style="position: absolute; left: 2px; color:#600">&#x25bc;</div>%N%'
    }
    function isFolded(cm, n) {
        for (var i = 0; i < folded.length; ++i) {
            var start = cm.lineInfo(folded[i].start);
            if (!start) {
                folded.splice(i--, 1)
            } else {
                if (start.line == n) {
                    return {
                        pos: i,
                        region: folded[i]
                    }
                }
            }
        }
    }
    function expand(cm, region) {
        cm.clearMarker(region.start);
        for (var i = 0; i < region.hidden.length; ++i) {
            cm.showLine(region.hidden[i])
        }
    }
    return function(cm, line) {
        cm.operation(function() {
            var known = isFolded(cm, line);
            if (known) {
                folded.splice(known.pos, 1);
                expand(cm, known.region)
            } else {
                var end = rangeFinder(cm, line, hideEnd);
                if (end == null) {
                    return
                }
                var hidden = [];
                for (var i = line + 1; i < end; ++i) {
                    var handle = cm.hideLine(i);
                    if (handle) {
                        hidden.push(handle)
                    }
                }
                var first = cm.setMarker(line, markText);
                var region = {
                    start: first,
                    hidden: hidden
                };
                cm.onDeleteLine(first,
                function() {
                    expand(cm, region)
                });
                folded.push(region)
            }
        })
    }
};
if (!CodeMirror.modeExtensions) {
    CodeMirror.modeExtensions = {}
}
CodeMirror.defineExtension("getModeExt",
function() {
    var mname = CodeMirror.resolveMode(this.getOption("mode")).name;
    var ext = CodeMirror.modeExtensions[mname];
    if (!ext) {
        throw new Error("No extensions found for mode " + mname)
    }
    return ext
});
CodeMirror.defineExtension("getModeExtAtPos",
function(pos) {
    var token = this.getTokenAt(pos);
    if (token && token.state && token.state.mode) {
        return CodeMirror.modeExtensions[token.state.mode == "html" ? "htmlmixed": token.state.mode]
    } else {
        return this.getModeExt()
    }
});
CodeMirror.defineExtension("commentRange",
function(isComment, from, to) {
    var curMode = this.getModeExtAtPos(this.getCursor());
    if (isComment) {
        var commentedText = this.getRange(from, to);
        this.replaceRange(curMode.commentStart + this.getRange(from, to) + curMode.commentEnd, from, to);
        if (from.line == to.line && from.ch == to.ch) {
            this.setCursor(from.line, from.ch + curMode.commentStart.length)
        }
    } else {
        var selText = this.getRange(from, to);
        var startIndex = selText.indexOf(curMode.commentStart);
        var endIndex = selText.lastIndexOf(curMode.commentEnd);
        if (startIndex > -1 && endIndex > -1 && endIndex > startIndex) {
            selText = selText.substr(0, startIndex) + selText.substring(startIndex + curMode.commentStart.length, endIndex) + selText.substr(endIndex + curMode.commentEnd.length)
        }
        this.replaceRange(selText, from, to)
    }
});
CodeMirror.defineExtension("autoIndentRange",
function(from, to) {
    var cmInstance = this;
    this.operation(function() {
        for (var i = from.line; i <= to.line; i++) {
            cmInstance.indentLine(i, "smart")
        }
    })
});
CodeMirror.defineExtension("autoFormatRange",
function(from, to) {
    var absStart = this.indexFromPos(from);
    var absEnd = this.indexFromPos(to);
    var res = this.getModeExt().autoFormatLineBreaks(this.getValue(), absStart, absEnd);
    var cmInstance = this;
    this.operation(function() {
        cmInstance.replaceRange(res, from, to);
        var startLine = cmInstance.posFromIndex(absStart).line;
        var endLine = cmInstance.posFromIndex(absStart + res.length).line;
        for (var i = startLine; i <= endLine; i++) {
            cmInstance.indentLine(i, "smart")
        }
    })
});
CodeMirror.modeExtensions["css"] = {
    commentStart: "/*",
    commentEnd: "*/",
    wordWrapChars: [";", "\\{", "\\}"],
    autoFormatLineBreaks: function(text) {
        return text.replace(new RegExp("(;|\\{|\\})([^\r\n])", "g"), "$1\n$2")
    }
};
CodeMirror.modeExtensions["javascript"] = {
    commentStart: "/*",
    commentEnd: "*/",
    wordWrapChars: [";", "\\{", "\\}"],
    getNonBreakableBlocks: function(text) {
        var nonBreakableRegexes = [new RegExp("for\\s*?\\(([\\s\\S]*?)\\)"), new RegExp("'([\\s\\S]*?)('|$)"), new RegExp('"([\\s\\S]*?)("|$)'), new RegExp("//.*([\r\n]|$)")];
        var nonBreakableBlocks = new Array();
        for (var i = 0; i < nonBreakableRegexes.length; i++) {
            var curPos = 0;
            while (curPos < text.length) {
                var m = text.substr(curPos).match(nonBreakableRegexes[i]);
                if (m != null) {
                    nonBreakableBlocks.push({
                        start: curPos + m.index,
                        end: curPos + m.index + m[0].length
                    });
                    curPos += m.index + Math.max(1, m[0].length)
                } else {
                    break
                }
            }
        }
        nonBreakableBlocks.sort(function(a, b) {
            return a.start - b.start
        });
        return nonBreakableBlocks
    },
    autoFormatLineBreaks: function(text) {
        var curPos = 0;
        var reLinesSplitter = new RegExp("(;|\\{|\\})([^\r\n])", "g");
        var nonBreakableBlocks = this.getNonBreakableBlocks(text);
        if (nonBreakableBlocks != null) {
            var res = "";
            for (var i = 0; i < nonBreakableBlocks.length; i++) {
                if (nonBreakableBlocks[i].start > curPos) {
                    res += text.substring(curPos, nonBreakableBlocks[i].start).replace(reLinesSplitter, "$1\n$2");
                    curPos = nonBreakableBlocks[i].start
                }
                if (nonBreakableBlocks[i].start <= curPos && nonBreakableBlocks[i].end >= curPos) {
                    res += text.substring(curPos, nonBreakableBlocks[i].end);
                    curPos = nonBreakableBlocks[i].end
                }
            }
            if (curPos < text.length - 1) {
                res += text.substr(curPos).replace(reLinesSplitter, "$1\n$2")
            }
            return res
        } else {
            return text.replace(reLinesSplitter, "$1\n$2")
        }
    }
};
CodeMirror.modeExtensions["xml"] = {
    commentStart: "<!--",
    commentEnd: "-->",
    wordWrapChars: [">"],
    autoFormatLineBreaks: function(text) {
        var lines = text.split("\n");
        var reProcessedPortion = new RegExp("(^\\s*?<|^[^<]*?)(.+)(>\\s*?$|[^>]*?$)");
        var reOpenBrackets = new RegExp("<", "g");
        var reCloseBrackets = new RegExp("(>)([^\r\n])", "g");
        for (var i = 0; i < lines.length; i++) {
            var mToProcess = lines[i].match(reProcessedPortion);
            if (mToProcess != null && mToProcess.length > 3) {
                lines[i] = mToProcess[1] + mToProcess[2].replace(reOpenBrackets, "\n$&").replace(reCloseBrackets, "$1\n$2") + mToProcess[3];
                continue
            }
        }
        return lines.join("\n")
    }
};
CodeMirror.modeExtensions["htmlmixed"] = {
    commentStart: "<!--",
    commentEnd: "-->",
    wordWrapChars: [">", ";", "\\{", "\\}"],
    getModeInfos: function(text, absPos) {
        var modeInfos = new Array();
        modeInfos[0] = {
            pos: 0,
            modeExt: CodeMirror.modeExtensions["xml"],
            modeName: "xml"
        };
        var modeMatchers = new Array();
        modeMatchers[0] = {
            regex: new RegExp("<style[^>]*>([\\s\\S]*?)(</style[^>]*>|$)", "i"),
            modeExt: CodeMirror.modeExtensions["css"],
            modeName: "css"
        };
        modeMatchers[1] = {
            regex: new RegExp("<script[^>]*>([\\s\\S]*?)(<\/script[^>]*>|$)", "i"),
            modeExt: CodeMirror.modeExtensions["javascript"],
            modeName: "javascript"
        };
        var lastCharPos = (typeof(absPos) !== "undefined" ? absPos: text.length - 1);
        for (var i = 0; i < modeMatchers.length; i++) {
            var curPos = 0;
            while (curPos <= lastCharPos) {
                var m = text.substr(curPos).match(modeMatchers[i].regex);
                if (m != null) {
                    if (m.length > 1 && m[1].length > 0) {
                        var blockBegin = curPos + m.index + m[0].indexOf(m[1]);
                        modeInfos.push({
                            pos: blockBegin,
                            modeExt: modeMatchers[i].modeExt,
                            modeName: modeMatchers[i].modeName
                        });
                        modeInfos.push({
                            pos: blockBegin + m[1].length,
                            modeExt: modeInfos[0].modeExt,
                            modeName: modeInfos[0].modeName
                        });
                        curPos += m.index + m[0].length;
                        continue
                    } else {
                        curPos += m.index + Math.max(m[0].length, 1)
                    }
                } else {
                    break
                }
            }
        }
        modeInfos.sort(function sortModeInfo(a, b) {
            return a.pos - b.pos
        });
        return modeInfos
    },
    autoFormatLineBreaks: function(text, startPos, endPos) {
        var modeInfos = this.getModeInfos(text);
        var reBlockStartsWithNewline = new RegExp("^\\s*?\n");
        var reBlockEndsWithNewline = new RegExp("\n\\s*?$");
        var res = "";
        if (modeInfos.length > 1) {
            for (var i = 1; i <= modeInfos.length; i++) {
                var selStart = modeInfos[i - 1].pos;
                var selEnd = (i < modeInfos.length ? modeInfos[i].pos: endPos);
                if (selStart >= endPos) {
                    break
                }
                if (selStart < startPos) {
                    if (selEnd <= startPos) {
                        continue
                    }
                    selStart = startPos
                }
                if (selEnd > endPos) {
                    selEnd = endPos
                }
                var textPortion = text.substring(selStart, selEnd);
                if (modeInfos[i - 1].modeName != "xml") {
                    if (!reBlockStartsWithNewline.test(textPortion) && selStart > 0) {
                        textPortion = "\n" + textPortion
                    }
                    if (!reBlockEndsWithNewline.test(textPortion) && selEnd < text.length - 1) {
                        textPortion += "\n"
                    }
                }
                res += modeInfos[i - 1].modeExt.autoFormatLineBreaks(textPortion)
            }
        } else {
            res = modeInfos[0].modeExt.autoFormatLineBreaks(text.substring(startPos, endPos))
        }
        return res
    }
}; (function() {
    function forEach(arr, f) {
        for (var i = 0,
        e = arr.length; i < e; ++i) {
            f(arr[i])
        }
    }
    function arrayContains(arr, item) {
        if (!Array.prototype.indexOf) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === item) {
                    return true
                }
            }
            return false
        }
        return arr.indexOf(item) != -1
    }
    function scriptHint(editor, keywords, getToken) {
        var cur = editor.getCursor(),
        token = getToken(editor, cur),
        tprop = token;
        if (!/^[\w$_]*$/.test(token.string)) {
            token = tprop = {
                start: cur.ch,
                end: cur.ch,
                string: "",
                state: token.state,
                className: token.string == "." ? "property": null
            }
        }
        while (tprop.className == "property") {
            tprop = getToken(editor, {
                line: cur.line,
                ch: tprop.start
            });
            if (tprop.string != ".") {
                return
            }
            tprop = getToken(editor, {
                line: cur.line,
                ch: tprop.start
            });
            if (tprop.string == ")") {
                var level = 1;
                do {
                    tprop = getToken(editor, {
                        line: cur.line,
                        ch: tprop.start
                    });
                    switch (tprop.string) {
                    case ")":
                        level++;
                        break;
                    case "(":
                        level--;
                        break;
                    default:
                        break
                    }
                } while ( level > 0 );
                tprop = getToken(editor, {
                    line: cur.line,
                    ch: tprop.start
                });
                if (tprop.className == "variable") {
                    tprop.className = "function"
                } else {
                    return
                }
            }
            if (!context) {
                var context = []
            }
            context.push(tprop)
        }
        return {
            list: getCompletions(token, context, keywords),
            from: {
                line: cur.line,
                ch: token.start
            },
            to: {
                line: cur.line,
                ch: token.end
            }
        }
    }
    CodeMirror.javascriptHint = function(editor) {
        return scriptHint(editor, javascriptKeywords,
        function(e, cur) {
            return e.getTokenAt(cur)
        })
    };
    function getCoffeeScriptToken(editor, cur) {
        var token = editor.getTokenAt(cur);
        if (cur.ch == token.start + 1 && token.string.charAt(0) == ".") {
            token.end = token.start;
            token.string = ".";
            token.className = "property"
        } else {
            if (/^\.[\w$_]*$/.test(token.string)) {
                token.className = "property";
                token.start++;
                token.string = token.string.replace(/\./, "")
            }
        }
        return token
    }
    CodeMirror.coffeescriptHint = function(editor) {
        return scriptHint(editor, coffeescriptKeywords, getCoffeeScriptToken)
    };
    var stringProps = ("charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight " + "toUpperCase toLowerCase split concat match replace search").split(" ");
    var arrayProps = ("length concat join splice push pop shift unshift slice reverse sort indexOf " + "lastIndexOf every some filter forEach map reduce reduceRight ").split(" ");
    var funcProps = "prototype apply call bind".split(" ");
    var javascriptKeywords = ("break case catch continue debugger default delete do else false finally for function " + "if in instanceof new null return switch throw true try typeof var void while with").split(" ");
    var coffeescriptKeywords = ("and break catch class continue delete do else extends false finally for " + "if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes").split(" ");
    function getCompletions(token, context, keywords) {
        var found = [],
        start = token.string;
        function maybeAdd(str) {
            if (str.indexOf(start) == 0 && !arrayContains(found, str)) {
                found.push(str)
            }
        }
        function gatherCompletions(obj) {
            if (typeof obj == "string") {
                forEach(stringProps, maybeAdd)
            } else {
                if (obj instanceof Array) {
                    forEach(arrayProps, maybeAdd)
                } else {
                    if (obj instanceof Function) {
                        forEach(funcProps, maybeAdd)
                    }
                }
            }
            for (var name in obj) {
                maybeAdd(name)
            }
        }
        if (context) {
            var obj = context.pop(),
            base;
            if (obj.className == "variable") {
                base = window[obj.string]
            } else {
                if (obj.className == "string") {
                    base = ""
                } else {
                    if (obj.className == "atom") {
                        base = 1
                    } else {
                        if (obj.className == "function") {
                            if (window.jQuery != null && (obj.string == "$" || obj.string == "jQuery") && (typeof window.jQuery == "function")) {
                                base = window.jQuery()
                            } else {
                                if (window._ != null && (obj.string == "_") && (typeof window._ == "function")) {
                                    base = window._()
                                }
                            }
                        }
                    }
                }
            }
            while (base != null && context.length) {
                base = base[context.pop().string]
            }
            if (base != null) {
                gatherCompletions(base)
            }
        } else {
            for (var v = token.state.localVars; v; v = v.next) {
                maybeAdd(v.name)
            }
            gatherCompletions(window);
            forEach(keywords, maybeAdd)
        }
        return found
    }
})(); (function() {
    CodeMirror.simpleHint = function(editor, getHints) {
        if (editor.somethingSelected()) {
            return
        }
        var result = getHints(editor);
        if (!result || !result.list.length) {
            return
        }
        var completions = result.list;
        function insert(str) {
            editor.replaceRange(str, result.from, result.to)
        }
        if (completions.length == 1) {
            insert(completions[0]);
            return true
        }
        var complete = document.createElement("div");
        complete.className = "CodeMirror-completions";
        var sel = complete.appendChild(document.createElement("select"));
        if (!window.opera) {
            sel.multiple = true
        }
        for (var i = 0; i < completions.length; ++i) {
            var opt = sel.appendChild(document.createElement("option"));
            opt.appendChild(document.createTextNode(completions[i]))
        }
        sel.firstChild.selected = true;
        sel.size = Math.min(10, completions.length);
        var pos = editor.cursorCoords();
        complete.style.left = pos.x + "px";
        complete.style.top = pos.yBot + "px";
        document.body.appendChild(complete);
        var winW = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth);
        if (winW - pos.x < sel.clientWidth) {
            complete.style.left = (pos.x - sel.clientWidth) + "px"
        }
        if (completions.length <= 10) {
            complete.style.width = (sel.clientWidth - 1) + "px"
        }
        var done = false;
        function close() {
            if (done) {
                return
            }
            done = true;
            complete.parentNode.removeChild(complete)
        }
        function pick() {
            insert(completions[sel.selectedIndex]);
            close();
            setTimeout(function() {
                editor.focus()
            },
            50)
        }
        CodeMirror.connect(sel, "blur", close);
        CodeMirror.connect(sel, "keydown",
        function(event) {
            var code = event.keyCode;
            if (code == 13) {
                CodeMirror.e_stop(event);
                pick()
            } else {
                if (code == 27) {
                    CodeMirror.e_stop(event);
                    close();
                    editor.focus()
                } else {
                    if (code != 38 && code != 40) {
                        close();
                        editor.focus();
                        editor.triggerOnKeyDown(event);
                        setTimeout(function() {
                            CodeMirror.simpleHint(editor, getHints)
                        },
                        50)
                    }
                }
            }
        });
        CodeMirror.connect(sel, "dblclick", pick);
        sel.focus();
        if (window.opera) {
            setTimeout(function() {
                if (!done) {
                    sel.focus()
                }
            },
            100)
        }
        return true
    }
})();
var CryptoJS = CryptoJS ||
function(h, o) {
    var f = {},
    j = f.lib = {},
    k = j.Base = function() {
        function a() {}
        return {
            extend: function(b) {
                a.prototype = this;
                var c = new a;
                b && c.mixIn(b);
                c.$super = this;
                return c
            },
            create: function() {
                var a = this.extend();
                a.init.apply(a, arguments);
                return a
            },
            init: function() {},
            mixIn: function(a) {
                for (var c in a) {
                    a.hasOwnProperty(c) && (this[c] = a[c])
                }
                a.hasOwnProperty("toString") && (this.toString = a.toString)
            },
            clone: function() {
                return this.$super.extend(this)
            }
        }
    } (),
    i = j.WordArray = k.extend({
        init: function(a, b) {
            a = this.words = a || [];
            this.sigBytes = b != o ? b: 4 * a.length
        },
        toString: function(a) {
            return (a || p).stringify(this)
        },
        concat: function(a) {
            var b = this.words,
            c = a.words,
            d = this.sigBytes,
            a = a.sigBytes;
            this.clamp();
            if (d % 4) {
                for (var e = 0; e < a; e++) {
                    b[d + e >>> 2] |= (c[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 24 - 8 * ((d + e) % 4)
                }
            } else {
                if (65535 < c.length) {
                    for (e = 0; e < a; e += 4) {
                        b[d + e >>> 2] = c[e >>> 2]
                    }
                } else {
                    b.push.apply(b, c)
                }
            }
            this.sigBytes += a;
            return this
        },
        clamp: function() {
            var a = this.words,
            b = this.sigBytes;
            a[b >>> 2] &= 4294967295 << 32 - 8 * (b % 4);
            a.length = h.ceil(b / 4)
        },
        clone: function() {
            var a = k.clone.call(this);
            a.words = this.words.slice(0);
            return a
        },
        random: function(a) {
            for (var b = [], c = 0; c < a; c += 4) {
                b.push(4294967296 * h.random() | 0)
            }
            return i.create(b, a)
        }
    }),
    l = f.enc = {},
    p = l.Hex = {
        stringify: function(a) {
            for (var b = a.words,
            a = a.sigBytes,
            c = [], d = 0; d < a; d++) {
                var e = b[d >>> 2] >>> 24 - 8 * (d % 4) & 255;
                c.push((e >>> 4).toString(16));
                c.push((e & 15).toString(16))
            }
            return c.join("")
        },
        parse: function(a) {
            for (var b = a.length,
            c = [], d = 0; d < b; d += 2) {
                c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8)
            }
            return i.create(c, b / 2)
        }
    },
    n = l.Latin1 = {
        stringify: function(a) {
            for (var b = a.words,
            a = a.sigBytes,
            c = [], d = 0; d < a; d++) {
                c.push(String.fromCharCode(b[d >>> 2] >>> 24 - 8 * (d % 4) & 255))
            }
            return c.join("")
        },
        parse: function(a) {
            for (var b = a.length,
            c = [], d = 0; d < b; d++) {
                c[d >>> 2] |= (a.charCodeAt(d) & 255) << 24 - 8 * (d % 4)
            }
            return i.create(c, b)
        }
    },
    q = l.Utf8 = {
        stringify: function(a) {
            try {
                return decodeURIComponent(escape(n.stringify(a)))
            } catch(b) {
                throw Error("Malformed UTF-8 data")
            }
        },
        parse: function(a) {
            return n.parse(unescape(encodeURIComponent(a)))
        }
    },
    m = j.BufferedBlockAlgorithm = k.extend({
        reset: function() {
            this._data = i.create();
            this._nDataBytes = 0
        },
        _append: function(a) {
            "string" == typeof a && (a = q.parse(a));
            this._data.concat(a);
            this._nDataBytes += a.sigBytes
        },
        _process: function(a) {
            var b = this._data,
            c = b.words,
            d = b.sigBytes,
            e = this.blockSize,
            f = d / (4 * e),
            f = a ? h.ceil(f) : h.max((f | 0) - this._minBufferSize, 0),
            a = f * e,
            d = h.min(4 * a, d);
            if (a) {
                for (var g = 0; g < a; g += e) {
                    this._doProcessBlock(c, g)
                }
                g = c.splice(0, a);
                b.sigBytes -= d
            }
            return i.create(g, d)
        },
        clone: function() {
            var a = k.clone.call(this);
            a._data = this._data.clone();
            return a
        },
        _minBufferSize: 0
    });
    j.Hasher = m.extend({
        init: function() {
            this.reset()
        },
        reset: function() {
            m.reset.call(this);
            this._doReset()
        },
        update: function(a) {
            this._append(a);
            this._process();
            return this
        },
        finalize: function(a) {
            a && this._append(a);
            this._doFinalize();
            return this._hash
        },
        clone: function() {
            var a = m.clone.call(this);
            a._hash = this._hash.clone();
            return a
        },
        blockSize: 16,
        _createHelper: function(a) {
            return function(b, c) {
                return a.create(c).finalize(b)
            }
        },
        _createHmacHelper: function(a) {
            return function(b, c) {
                return r.HMAC.create(a, c).finalize(b)
            }
        }
    });
    var r = f.algo = {};
    return f
} (Math);
var CryptoJS = CryptoJS ||
function(o, q) {
    var l = {},
    m = l.lib = {},
    n = m.Base = function() {
        function a() {}
        return {
            extend: function(e) {
                a.prototype = this;
                var c = new a;
                e && c.mixIn(e);
                c.$super = this;
                return c
            },
            create: function() {
                var a = this.extend();
                a.init.apply(a, arguments);
                return a
            },
            init: function() {},
            mixIn: function(a) {
                for (var c in a) {
                    a.hasOwnProperty(c) && (this[c] = a[c])
                }
                a.hasOwnProperty("toString") && (this.toString = a.toString)
            },
            clone: function() {
                return this.$super.extend(this)
            }
        }
    } (),
    j = m.WordArray = n.extend({
        init: function(a, e) {
            a = this.words = a || [];
            this.sigBytes = e != q ? e: 4 * a.length
        },
        toString: function(a) {
            return (a || r).stringify(this)
        },
        concat: function(a) {
            var e = this.words,
            c = a.words,
            d = this.sigBytes,
            a = a.sigBytes;
            this.clamp();
            if (d % 4) {
                for (var b = 0; b < a; b++) {
                    e[d + b >>> 2] |= (c[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((d + b) % 4)
                }
            } else {
                if (65535 < c.length) {
                    for (b = 0; b < a; b += 4) {
                        e[d + b >>> 2] = c[b >>> 2]
                    }
                } else {
                    e.push.apply(e, c)
                }
            }
            this.sigBytes += a;
            return this
        },
        clamp: function() {
            var a = this.words,
            e = this.sigBytes;
            a[e >>> 2] &= 4294967295 << 32 - 8 * (e % 4);
            a.length = o.ceil(e / 4)
        },
        clone: function() {
            var a = n.clone.call(this);
            a.words = this.words.slice(0);
            return a
        },
        random: function(a) {
            for (var e = [], c = 0; c < a; c += 4) {
                e.push(4294967296 * o.random() | 0)
            }
            return j.create(e, a)
        }
    }),
    k = l.enc = {},
    r = k.Hex = {
        stringify: function(a) {
            for (var e = a.words,
            a = a.sigBytes,
            c = [], d = 0; d < a; d++) {
                var b = e[d >>> 2] >>> 24 - 8 * (d % 4) & 255;
                c.push((b >>> 4).toString(16));
                c.push((b & 15).toString(16))
            }
            return c.join("")
        },
        parse: function(a) {
            for (var b = a.length,
            c = [], d = 0; d < b; d += 2) {
                c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8)
            }
            return j.create(c, b / 2)
        }
    },
    p = k.Latin1 = {
        stringify: function(a) {
            for (var b = a.words,
            a = a.sigBytes,
            c = [], d = 0; d < a; d++) {
                c.push(String.fromCharCode(b[d >>> 2] >>> 24 - 8 * (d % 4) & 255))
            }
            return c.join("")
        },
        parse: function(a) {
            for (var b = a.length,
            c = [], d = 0; d < b; d++) {
                c[d >>> 2] |= (a.charCodeAt(d) & 255) << 24 - 8 * (d % 4)
            }
            return j.create(c, b)
        }
    },
    h = k.Utf8 = {
        stringify: function(a) {
            try {
                return decodeURIComponent(escape(p.stringify(a)))
            } catch(b) {
                throw Error("Malformed UTF-8 data")
            }
        },
        parse: function(a) {
            return p.parse(unescape(encodeURIComponent(a)))
        }
    },
    b = m.BufferedBlockAlgorithm = n.extend({
        reset: function() {
            this._data = j.create();
            this._nDataBytes = 0
        },
        _append: function(a) {
            "string" == typeof a && (a = h.parse(a));
            this._data.concat(a);
            this._nDataBytes += a.sigBytes
        },
        _process: function(a) {
            var b = this._data,
            c = b.words,
            d = b.sigBytes,
            f = this.blockSize,
            i = d / (4 * f),
            i = a ? o.ceil(i) : o.max((i | 0) - this._minBufferSize, 0),
            a = i * f,
            d = o.min(4 * a, d);
            if (a) {
                for (var h = 0; h < a; h += f) {
                    this._doProcessBlock(c, h)
                }
                h = c.splice(0, a);
                b.sigBytes -= d
            }
            return j.create(h, d)
        },
        clone: function() {
            var a = n.clone.call(this);
            a._data = this._data.clone();
            return a
        },
        _minBufferSize: 0
    });
    m.Hasher = b.extend({
        init: function() {
            this.reset()
        },
        reset: function() {
            b.reset.call(this);
            this._doReset()
        },
        update: function(a) {
            this._append(a);
            this._process();
            return this
        },
        finalize: function(a) {
            a && this._append(a);
            this._doFinalize();
            return this._hash
        },
        clone: function() {
            var a = b.clone.call(this);
            a._hash = this._hash.clone();
            return a
        },
        blockSize: 16,
        _createHelper: function(a) {
            return function(b, c) {
                return a.create(c).finalize(b)
            }
        },
        _createHmacHelper: function(a) {
            return function(b, c) {
                return f.HMAC.create(a, c).finalize(b)
            }
        }
    });
    var f = l.algo = {};
    return l
} (Math); (function(o) {
    function q(b, f, a, e, c, d, g) {
        b = b + (f & a | ~f & e) + c + g;
        return (b << d | b >>> 32 - d) + f
    }
    function l(b, f, a, e, c, d, g) {
        b = b + (f & e | a & ~e) + c + g;
        return (b << d | b >>> 32 - d) + f
    }
    function m(b, f, a, e, c, d, g) {
        b = b + (f ^ a ^ e) + c + g;
        return (b << d | b >>> 32 - d) + f
    }
    function n(b, f, a, e, c, d, g) {
        b = b + (a ^ (f | ~e)) + c + g;
        return (b << d | b >>> 32 - d) + f
    }
    var j = CryptoJS,
    k = j.lib,
    r = k.WordArray,
    k = k.Hasher,
    p = j.algo,
    h = []; (function() {
        for (var b = 0; 64 > b; b++) {
            h[b] = 4294967296 * o.abs(o.sin(b + 1)) | 0
        }
    })();
    p = p.MD5 = k.extend({
        _doReset: function() {
            this._hash = r.create([1732584193, 4023233417, 2562383102, 271733878])
        },
        _doProcessBlock: function(b, f) {
            for (var a = 0; 16 > a; a++) {
                var e = f + a,
                c = b[e];
                b[e] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360
            }
            for (var e = this._hash.words,
            c = e[0], d = e[1], g = e[2], i = e[3], a = 0; 64 > a; a += 4) {
                16 > a ? (c = q(c, d, g, i, b[f + a], 7, h[a]), i = q(i, c, d, g, b[f + a + 1], 12, h[a + 1]), g = q(g, i, c, d, b[f + a + 2], 17, h[a + 2]), d = q(d, g, i, c, b[f + a + 3], 22, h[a + 3])) : 32 > a ? (c = l(c, d, g, i, b[f + (a + 1) % 16], 5, h[a]), i = l(i, c, d, g, b[f + (a + 6) % 16], 9, h[a + 1]), g = l(g, i, c, d, b[f + (a + 11) % 16], 14, h[a + 2]), d = l(d, g, i, c, b[f + a % 16], 20, h[a + 3])) : 48 > a ? (c = m(c, d, g, i, b[f + (3 * a + 5) % 16], 4, h[a]), i = m(i, c, d, g, b[f + (3 * a + 8) % 16], 11, h[a + 1]), g = m(g, i, c, d, b[f + (3 * a + 11) % 16], 16, h[a + 2]), d = m(d, g, i, c, b[f + (3 * a + 14) % 16], 23, h[a + 3])) : (c = n(c, d, g, i, b[f + 3 * a % 16], 6, h[a]), i = n(i, c, d, g, b[f + (3 * a + 7) % 16], 10, h[a + 1]), g = n(g, i, c, d, b[f + (3 * a + 14) % 16], 15, h[a + 2]), d = n(d, g, i, c, b[f + (3 * a + 5) % 16], 21, h[a + 3]))
            }
            e[0] = e[0] + c | 0;
            e[1] = e[1] + d | 0;
            e[2] = e[2] + g | 0;
            e[3] = e[3] + i | 0
        },
        _doFinalize: function() {
            var b = this._data,
            f = b.words,
            a = 8 * this._nDataBytes,
            e = 8 * b.sigBytes;
            f[e >>> 5] |= 128 << 24 - e % 32;
            f[(e + 64 >>> 9 << 4) + 14] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360;
            b.sigBytes = 4 * (f.length + 1);
            this._process();
            b = this._hash.words;
            for (f = 0; 4 > f; f++) {
                a = b[f],
                b[f] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360
            }
        }
    });
    j.MD5 = k._createHelper(p);
    j.HmacMD5 = k._createHmacHelper(p)
})(Math);
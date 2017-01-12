Utils = (function() {
    var instance;
    function Utils() {
        instance = this;
        return this
    }
    Utils.prototype.binder = function() {
        var cur = this;
        var events = this.Events;
        if (isEmpty(events)) {
            return
        }
        var clazz = className(this);
        if (isEmpty(clazz)) {
            this.clazz = clazz = "Plugin"
        }
        Console.log("[" + clazz + "]Binding events");
        try {
            $.each(events,
            function(key, handler) {
                if (isEmpty(events)) {
                    return
                }
                var handler = events[key];
                if (isEmpty(key)) {
                    return
                }
                var sp = key.split("->");
                var evt = sp[0];
                var sel = sp[1];
                if (isEmpty(evt) || isEmpty(sel) || isNotFunc(cur[handler]) && isNotFunc(handler)) {
                    return
                }
                var one = function(event) {
                    if (isNotFunc(handler)) {
                        cur[handler].call(this, cur, event)
                    } else {
                        handler.call(this, cur, event)
                    }
                };
                var hasWindowObj = sel.indexOf("[window]") != -1;
                var hasDocumentObj = sel.indexOf("[document]") != -1;
                if (hasWindowObj) {
                    $(window).unbind(evt, one);
                    $(window).bind(evt, one);
                    sel = sel.replace(/[\[window\]]/g, "")
                }
                if (hasDocumentObj) {
                    $(document).unbind(evt, one);
                    $(document).bind(evt, one);
                    sel = sel.replace(/[\[document\]]/g, "")
                }
                if (isEmpty(sel)) {
                    return
                }
                Console.log("\t[" + clazz + "]Binding event[" + handler + "]");
                $(sel).die(evt).live(evt, one)
            })
        } catch(e) {
            Console.log("Error Occured When Binding Events:" + e)
        }
    };
    Utils.prototype.initParams = function(params) {
        var clazz = className(this);
        if (isNotEmpty(params)) {
            Console.log("[" + clazz + "]Initializing Params with outer params");
            for (var key in params) {
                this[key] = params[key]
            }
        }
        if (isNotEmpty(this.arg) && isNotEmpty(this.arg[0])) {
            Console.log("[" + clazz + "]Initializing Params with arguments[0]");
            var opt = this.arg[0];
            for (var key in opt) {
                if (isNotEmpty(opt[key])) {
                    this[key] = opt[key]
                }
            }
        }
    };
    Utils.prototype.initView = function(ident, afterInit, async) {
        var cur = this;
        var clazz = className(this);
        var func = "on" + clazz + "ViewInit";
        if (g_status.once) {
            afterInit.call(cur, ident, $(this.target).html());
            plugins.fireEvent(func, cur);
            return
        }
        if (isEmpty(ident)) {
            ident = g_status.ident
        }
        Console.log("[" + this.clazz + "]Initializing View with ident:[" + ident + "] " + (isFunc(afterInit) ? "and callback": ""));
        //by 陈旭：把 ident 当做例子id传递
        var link = this.viewLink + "/?example=" + ident + "&ts=" + new Date().getTime();
        if (isEmpty(async) || async) {
            $.get(link,
            function(e) {
                cur.view = $(e);
                Console.log("[" + cur.clazz + "]View Loaded in async");
                if (isNotEmpty(cur.target) && isNotEmpty(e)) {
                    cur.target.html(e);
                    afterInit.call(cur, ident, cur.view);
                    plugins.fireEvent(func, cur)
                }
            })
        } else {
            var e = instance.load(link, async);
            cur.view = $(e);
            Console.log("[" + cur.clazz + "]View Loaded in syn");
            if (isNotEmpty(cur.target) && isNotEmpty(e)) {
                cur.target.html(e);
                afterInit.call(cur, ident, cur.view);
                plugins.fireEvent(func, cur)
            }
        }
    };
    Utils.prototype.load = function(link, async, callback, data) {
        var cur = this;
        return $.ajax({
            url: link,
            success: function(html) {
                if (isFunc(callback)) {
                    callback.call(cur, html)
                }
            },
            data: data,
            async: async,
            type: "post"
        }).responseText
    };
    Utils.prototype.errorHandler = function(msg, success, error, diy) {
        try {
            var msg = eval("(" + msg + ")");
            if (msg.error) {
                if (isEmpty(diy) || !diy) {
                    dialog.get("error", msg.msg);
                    if (typeof error != "undefined") {
                        setTimeout(function() {
                            error(msg)
                        },
                        2000)
                    }
                    return false
                } else {
                    if (typeof error != "undefined") {
                        return error(msg)
                    }
                }
            }
            return success(msg)
        } catch(e) {
            if (typeof e.stack != "undefined") {
                dialog.get("jserror", e.stack.substring(0, 50))
            } else {
                dialog.get("jserror", e.message)
            }
            return
        }
    };
    Utils.prototype.stopDefault = function(event) {
        event.preventDefault();
        event.returnvalue = false
    };
    Utils.prototype.initStatus = function(link) {
        var status = this.load(link, false);
        if (isNotEmpty(status)) {
            eval(status)
        }
    };
    Utils.prototype.getHttpLink = function(link) {
        if (isEmpty(link)) {
            return
        }
        if (link.indexOf("http") == -1) {
            if (link.indexOf("/") == 0) {
                link = g_status.host + link
            } else {
                link = g_status.host + "/" + link
            }
        }
        return link
    };
    return Utils
})();
g_utils = new Utils();
window.isEmpty = function(obj) {
    return (obj == null || typeof obj == "undefined" || obj.length == 0)
};
window.isNotEmpty = function(obj) {
    return ! isEmpty(obj)
};
window.isFunc = function(fun) {
    return (fun != null && typeof fun == "function")
};
window.isNotFunc = function(fun) {
    return ! isFunc(fun)
};
window.typeOf = function(cur, type) {
    if (typeof type != "string") {
        return false
    }
    return typeof cur == type
};
window.isArray = function(array) {
    return isNotEmpty(array) && className(array) == "Array"
};
window.isNotArray = function(arr) {
    return ! isArray(arr)
};
window.className = function(obj) {
    if (obj && obj.constructor && obj.constructor.toString) {
        var arr = obj.constructor.toString().match(/function\s*(\w+)/);
        if (arr && arr.length == 2) {
            obj.clazz = arr[1];
            return arr[1]
        }
    }
    return undefined
};
window.isSameClass = function(cur, cur2) {
    if (isNotEmpty(cur) && isNotEmpty(cur2)) {
        return className(cur) == className(cur2)
    }
    return false
};
window.isDifClass = function(cur, cur2) {
    return ! isSameClass(cur, cur2)
};
window.openwindow = function(url, name, iWidth, iHeight) {
    var url;
    var name;
    var iWidth;
    var iHeight;
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
    window.open(url, name, "height=" + iHeight + ",,innerHeight=" + iHeight + ",width=" + iWidth + ",innerWidth=" + iWidth + ",top=" + iTop + ",left=" + iLeft + ",toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no")
};
window.doNothing = function() {
    return true
};
window.updateUrl = function(url) {
    if (window.history && window.history.pushState) {
        window.history.pushState(null, url, url)
    }
};
window.isIframe = function() {
    return top.location != self.location
};
window.isNotIframe = function() {
    return ! isIframe()
};
window.console = window.console || {};
console.log || (console.log = typeof opera != "undefined" ? opera.postError: function(msg) {});
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) {
            from += len
        }
        for (; from < len; from++) {
            if (from in this && this[from] === elt) {
                return from
            }
        }
        return - 1
    }
}
ConsoleUtils = (function() {
    var open = false;
    function ConsoleUtils(op) {
        open = op
    }
    ConsoleUtils.prototype.toggle = function() {
        open = !open
    };
    ConsoleUtils.prototype.open = function() {
        open = true
    };
    ConsoleUtils.prototype.close = function() {
        open = false
    };
    ConsoleUtils.prototype.log = function(msg) {
        if (open) {
            console.log(msg)
        }
    };
    return ConsoleUtils
})();
Console = new ConsoleUtils(false);
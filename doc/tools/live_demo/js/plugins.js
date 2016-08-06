Plugins = (function() {
    var _plugins_ = {},
    instance;
    var onEvents = Plugins.prototype.onEvents = ["onEditorViewInit", "onExplorerViewInit", "onMenuViewInit", "onContextMenuLoad", "onContextMenuRemove", "beforeContextMenuLoad", "onDialogLoad", "onScriptImport", "onHtmlEditorChange", "onJsEditorChange", "onCssEditorChange", "onHtmlCursorActivity", "onJsCursorActivity", "onCssCursorActivity"];
    Plugins.prototype.onEventsDescription = ["当编辑器视图初始化或重置后时调用", "当左边的资源管理器初始化或重置后调用", "当顶部菜单视图初始化或重置后调用", "上下文菜单加载后调用", "上下文菜单消失后调用", "上下文菜单显示前调用", "当对话框弹出后调用", "当引入脚本时调用", "当HTML编辑器内容有改变时调用", "当JavaScript编辑器视图内容变化时调用", "当CSS编辑器内容变化时调用", "当Html编辑器中光标变动时调用", "当Js编辑器中光标变动时调用", "当Css编辑器中光标变动时调用"];
    var events_stack = {};
    function Plugins() {
        instance = this;
        initEventsStack()
    }
    var initEventsStack = function() {
        $.each(onEvents,
        function(i, event) {
            events_stack[event] = []
        })
    };
    Plugins.prototype.importJavaScript = function(link) {
        var head = document.getElementsByTagName("head").item(0);
        var script = document.createElement("script");
        script.language = "javascript";
        script.type = "text/javascript";
        script.src = g_utils.getHttpLink(link);
        head.appendChild(script)
    };
    Plugins.prototype.importCss = function(link) {
        var head = document.getElementsByTagName("head").item(0);
        var css = document.createElement("link");
        css.rel = "stylesheet";
        css.type = "text/css";
        css.href = g_utils.getHttpLink(link);
        head.appendChild(css)
    };
    Plugins.prototype.newPlugin = function(ident, plugin, opt) {
        if (isNotEmpty(ident) && typeOf(ident, "string") && isFunc(plugin)) {
            _plugins_[ident] = {
                plugin: plugin,
                opt: opt
            };
            return _plugins_[ident]
        }
        return false
    };
    Plugins.prototype.init = function() {
        initEventsStack();
        $.each(_plugins_,
        function(ident, plugin) {
            try {
                var cur = _plugins_[ident] = $.extend(new Plugin(ident), new _plugins_[ident].plugin(_plugins_[ident].opt));
                cur.init();
                Console.log("Plugin[" + ident + "] inited!");
                g_utils.binder.call(cur)
            } catch(e) {
                $.error(e)
            }
        })
    };
    Plugins.prototype.getPlugin = function(ident) {
        if (isNotEmpty(ident)) {
            return _plugins_[ident]
        }
    };
    var isValidOnEvent = function(name) {
        return onEvents.indexOf(name) > -1
    };
    var isInvalidOnEvent = function(name) {
        return ! isValidOnEvent(name)
    };
    Plugins.prototype.getEvents = function(name) {
        if (isValidOnEvent(name)) {
            return events_stack[name]
        }
    };
    Plugins.prototype.addEvent = function(plugin, name, event) {
        if (isNotEmpty(plugin) && isValidOnEvent(name) && isFunc(event)) {
            events_stack[name].push(event);
            events_stack[name] = $.unique($.unique(events_stack[name]))
        }
    };
    Plugins.prototype.fireEvent = function(event, data) {
        var cur = this;
        if (isInvalidOnEvent(event)) {
            return
        }
        $.each(_plugins_,
        function(ident, plugin) {
            var e = plugin[event];
            if (isFunc(e)) {
                e.call(cur, data);
                Console.log("Plugin[" + ident + "] event:" + event + " called!")
            }
            var events = instance.getEvents(event);
            $.each(events,
            function(i, evt) {
                evt.call(cur, data)
            })
        });
        return true
    };
    return Plugins
})();
plugins = new Plugins();
Plugin = (function() {
    var PT = Plugin.prototype;
    var instance;
    function Plugin(id) {
        PT.ident = id;
        instance = this
    }
    PT.init = function() {
        Console.log("Default Init Called Plugin[" + PT.ident + "]!")
    };
    PT.addEvent = function(name, event) {
        plugins.addEvent(instance, name, event)
    };
    return Plugin
})();
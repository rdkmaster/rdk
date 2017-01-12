Editor = (function() {
    var PT = Editor.prototype;
    var instance;
    PT.defaultParams = {
        viewLink: editor_path + "/editor",
        tplLink: editor_path + "/template",
        pluginTplLink: editor_path + "/plugin_tpl",
        ident: "",
        theme: "night"
    };
    PT.Events = {
        "mouseover->.editor": "show_quick_tools",
        "mouseout->.editor": "hide_quick_tools"
    };
    PT.show_quick_tools = function() {
        $(this).find(".quick_tools").show()
    };
    PT.hide_quick_tools = function() {
        $(this).find(".quick_tools").hide()
    };
    function Editor() {
        instance = this;
        this.arg = arguments;
        this.clazz = className(this);
        g_utils.initParams.call(this, this.defaultParams);
        this.initView.call(this, this.arg[0].example);
        return this
    }
    //by 陈旭：把 ident 当做例子id传递
    PT.initView = function(ident, async) {
        if (isEmpty(ident)) {
            ident = g_status.ident
        }
        g_utils.initView.call(this, ident,
        function(ident, view) {
            this.initCodeMirror(view);
            this.editorSets = $(".editorSet");
            this.setTheme(Setting.theme);
            this.setCMFont();
            $(window).resize();
            this.updatePreview("", true);
            instance.refreshEditors()
        },
        async);
        g_utils.binder.call(this);
        if (isNotEmpty(g_status.codename)) {
            $("title").html(g_status.codename + "-RunJS")
        }
    };
    PT.chooseJsType = function() {
        var doNow = function(d, rd) {
            var jstype = dialog.getField(d, "input[name='choose_js_type']:checked", 0);
            if (jstype.length == 0) {
                dialog.errorMsg(d, "请选择其中一个类别");
                return false
            }
            var success = function(msg) {
                runjs.initStatus(g_status.ident);
                instance.initView(g_status.ident);
                rd.close()
            };
            var fail = function(msg) {
                dialog.errorMsg(d, msg.msg)
            };
            var callback = function(msg) {
                g_utils.errorHandler(msg, success, fail, true)
            };
            Api.ajax.set_code_type(g_status.codeid, "js", jstype.val(), callback);
            return false
        };
        dialog.get("choose_code_type/js/" + g_status.ident, doNothing, doNow)
    };
    PT.chooseCssType = function() {
        var doNow = function(d, rd) {
            var csstype = dialog.getField(d, "input[name='choose_css_type']:checked", 0);
            if (csstype.length == 0) {
                dialog.errorMsg(d, "请选择其中一个类别");
                return false
            }
            var success = function(msg) {
                runjs.initStatus(g_status.ident);
                instance.initView(g_status.ident);
                rd.close()
            };
            var fail = function(msg) {
                dialog.errorMsg(d, msg.msg)
            };
            var callback = function(msg) {
                g_utils.errorHandler(msg, success, fail, true)
            };
            Api.ajax.set_code_type(g_status.codeid, "css", csstype.val(), callback);
            return false
        };
        dialog.get("choose_code_type/css/" + g_status.ident, doNothing, doNow)
    };
    PT.codeMD5 = function() {
        return CryptoJS.MD5(instance.editorHtml.getValue() + instance.editorJs.getValue() + instance.editorCss.getValue()).toString()
    };
    PT.loadTemplate = function(ident) {
        var cur = this;
        if (isEmpty(ident) && isEmpty(g_status.ident)) {
            ident = ""
        } else {
            ident = g_status.ident
        }
        $.get(this.tplLink + "/html/" + ident,
        function(html) {
            cur.editorHtml.setValue(html)
        });
        $.get(this.tplLink + "/css/" + ident,
        function(css) {
            cur.editorCss.setValue(css)
        });
        $.get(this.tplLink + "/js/" + ident,
        function(js) {
            cur.editorJs.setValue(js)
        })
    };
    PT.loadPlugin = function(ident, pname, onMethod) {
        if (isEmpty(ident)) {
            ident = "noident"
        }
        var js = g_utils.load(this.pluginTplLink + "/" + ident + "/" + pname + "/" + onMethod, false);
        return {
            html: "",
            css: "",
            js: js
        }
    };
    PT.loadPluginTpl = function(ident, onMethod) {
        var codes = instance.loadPlugin(ident, "PluginName", onMethod);
        instance.editorJs.setValue(codes.js);
        instance.editorHtml.setValue(codes.html);
        instance.editorCss.setValue(codes.css)
    };
    PT.setEditedStatus = function() {
        var curHash = instance.codeMD5();
        if (isEmpty(instance.contentHash) || instance.contentHash.length == 0) {
            instance.contentHash = curHash + "_" + g_status.ident;
            instance.edited = false
        } else {
            var ident = instance.contentHash.split("_")[1];
            var hash = instance.contentHash.split("_")[0];
            if (ident == g_status.ident && hash != curHash) {
                instance.edited = true;
                $("title").html("*" + $("title").html().replace(/[*]/g, ""))
            } else {
                if (ident != g_status.ident) {
                    instance.contentHash = curHash + "_" + g_status.ident
                }
                instance.edited = false;
                $("title").html($("title").html().replace(/[*]/g, ""))
            }
        }
    };
    PT.removeEditedStatus = function() {
        instance.edited = false;
        instance.contentHash = instance.codeMD5() + "_" + g_status.ident;
        $("title").html($("title").html().replace(/[*]/g, ""))
    };
    PT.getRemoteCode = function(ident, type) {
        return this.loadTplSnippet(ident, type, false)
    };
    PT.loadTplSnippet = function(ident, type, async, callback) {
        var cur = this;
        if (isEmpty(ident)) {
            ident = ""
        }
        if (isEmpty(async)) {
            async = true
        }
        switch (type) {
        case "html":
        case "css":
        case "js":
            return $.ajax({
                url:
                this.tplLink + "/" + type + "/" + ident,
                success: function(html) {
                    if (isFunc(callback)) {
                        callback.call(cur, html)
                    }
                },
                async: async
            }).responseText;
            break;
        default:
            return {
                html:
                this.loadTplSnippet(ident, "html", async),
                css: this.loadTplSnippet(ident, "css", async),
                js: this.loadTplSnippet(ident, "js", async)
            }
        }
    };
    PT.getCodeOfView = function(view, type) {
        if (isNotEmpty(view) && isNotEmpty(type)) {
            return view.find("#code_" + type).val()
        }
    };
    PT.initCodeMirror = function(view, defCode) {
        var cur = this;
        var delay;
        var html, css, js;
        if (isEmpty(defCode) || defCode) {
            html = this.getDefaultEditorValue("html");
            css = this.getDefaultEditorValue("css");
            js = this.getDefaultEditorValue("js")
        } else {
            html = this.getCodeOfView(view, "html");
            css = this.getCodeOfView(view, "css");
            js = this.getCodeOfView(view, "js")
        }
        if (isNotEmpty(view)) {
            this.editorHtml = new CodeMirror(document.getElementById("code_html").parentElement, {
                mode: "text/html",
                tabSize: 2,
                indentWithTabs: true,
                value: html,
                lineNumbers: true,
                lineWrapping: true,
                matchBrackets: true,
                onChange: function(cm) {
                    if (isNotEmpty(delay)) {
                        clearTimeout(delay)
                    }
                    delay = setTimeout(function() {
                        cur.updatePreview()
                    },
                    300);
                    if (isFunc(instance.onEditorHtmlChange)) {
                        instance.onEditorHtmlChange(cm)
                    }
                    plugins.fireEvent.call(cm, "onHtmlEditorChange", cm)
                },
                onCursorActivity: function(cm) {
                    plugins.fireEvent.call(cm, "onHtmlCursorActivity", cm)
                }
            });
            this.editorCss = new CodeMirror(document.getElementById("code_css").parentElement, {
                mode: g_status.cssType == 1 ? "css": "less",
                tabSize: 2,
                indentWithTabs: true,
                value: css,
                lineNumbers: true,
                lineWrapping: true,
                matchBrackets: true,
                onChange: function(cm) {
                    if (isNotEmpty(delay)) {
                        clearTimeout(delay)
                    }
                    delay = setTimeout(function() {
                        cur.updatePreview()
                    },
                    300);
                    if (isFunc(instance.onEditorCssChange)) {
                        instance.onEditorCssChange(cm)
                    }
                    plugins.fireEvent.call(cm, "onCssEditorChange", cm)
                },
                onCursorActivity: function(cm) {
                    plugins.fireEvent.call(cm, "onCssCursorActivity", cm)
                }
            });
            this.editorJs = new CodeMirror(document.getElementById("code_js").parentElement, {
                mode: g_status.jsType == 1 ? "javascript": "coffeescript",
                tabSize: 2,
                indentWithTabs: true,
                value: js,
                lineNumbers: true,
                lineWrapping: true,
                matchBrackets: true,
                onChange: function(cm) {
                    if (isNotEmpty(delay)) {
                        clearTimeout(delay)
                    }
                    delay = setTimeout(function() {
                        cur.updatePreview()
                    },
                    300);
                    if (isFunc(instance.onEditorJsChange)) {
                        instance.onEditorJsChange(cm)
                    }
                    plugins.fireEvent.call(cm, "onJsEditorChange", cm)
                },
                onCursorActivity: function(cm) {
                    plugins.fireEvent.call(cm, "onJsCursorActivity", cm)
                }
            });
            this.target.find("textarea").attr("style", "position: absolute; left: -10000px; width: 10px;");
            this.h_handler = $(".handler_horizontal").TextAreaResizer({
                vertical: false,
                html: this.editorHtml,
                css: this.editorCss,
                js: this.editorJs
            });
            this.v_handler = $(".handler_vertical").TextAreaResizer({
                vertical: true,
                html: this.editorHtml,
                css: this.editorCss,
                js: this.editorJs
            })
        } else {}
    };
    PT.getEditorCode = function(type) {
        switch (type) {
        case "html":
            return this.editorHtml.getValue();
        case "css":
            return this.editorCss.getValue();
        case "js":
            return this.editorJs.getValue();
        default:
            return {
                html:
                this.getEditorCode("html"),
                css: this.getEditorCode("css"),
                js: this.getEditorCode("js")
            }
        }
    };
    PT.getCombinedHtml = function() {
        var js = "",
        css = "";
        var html = this.editorHtml.getValue();
        var temp = "";
        if (html.indexOf("</body>") > -1) {
            var body = [];
            body.push(html.substring(0, html.lastIndexOf("</body>")));
            body.push(html.substring(html.lastIndexOf("</body>")));
            html = body[0];
            temp = body.length == 2 && body[1] ? body[1] : ""
        }
        try {
            if (g_status.cssType == 1) {
                css = this.editorCss.getValue()
            } else {
                if (g_status.cssType == 2) {
                    css = g_utils.load("/action/ajax/less_compile", false, undefined, this.editorCss.getValue())
                }
            }
        } catch(e) {
            return html + temp
        }
        try {
            if (g_status.jsType == 1) {
                js = this.editorJs.getValue()
            } else {
                if (g_status.jsType == 2) {
                    js = CoffeeScript.compile(this.editorJs.getValue())
                }
            }
        } catch(e) {
            return html + "<style>" + css + "</style>" + temp
        }
        return html + "<script>try{\n" + js + "\n}catch(e){\n}<\/script>" + "<style>" + css + "</style>" + temp
    };
    var update_delay;
    PT.updatePreview = function(chtml, update) {
        instance.setEditedStatus();
        if (isNotEmpty(update_delay) && g_status.cssType == 2) {
            Console.log("clear timeout(" + update_delay + ")");
            clearTimeout(update_delay)
        }
        update_delay = setTimeout(function() {
            if (!g_status.isOtherCode && (g_status.mode == "plugin" && isNotEmpty(update) || g_status.mode == "code")) {
                var pre_wrapper = $(".preview");
                pre_wrapper.find("iframe").remove();
                var previewFrame;
                if (g_status.mode == "plugin" && g_mode == "code" && isNotEmpty(update)) {
                    var src = g_status.host + editor_path + "/" + g_status.ident + "?mode=plugin";
                    previewFrame = pre_wrapper.append('<iframe id="preview" src="' + src + '" frameborder="0"></iframe>').find("iframe")[0]
                } else {
                    previewFrame = pre_wrapper.append('<iframe id="preview" frameborder="0"></iframe>').find("iframe")[0];
                    var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
                    preview.open();
                    var html = isNotEmpty(chtml) && typeOf(chtml, "string") ? chtml: instance.getCombinedHtml();
                    preview.write(html);
                    preview.close()
                }
            }
        },
        g_status.cssType == 2 ? 1000 : 1)
    };
    PT.getDefaultEditorValue = function(type) {
        return isNotEmpty(this[type]) ? this[type] : $("#code_" + type).val()
    };
    PT.setTheme = function() {
        if (isNotEmpty(Setting.theme) && (Setting.theme == "default" || Setting.theme == "night")) {
            this.editorHtml.setOption("theme", Setting.theme);
            this.editorCss.setOption("theme", Setting.theme);
            this.editorJs.setOption("theme", Setting.theme);
            if (Setting.theme == "night") {
                $("body").attr("class", "NightTheme")
            } else {
                $("body").attr("class", "DefaultTheme")
            }
        }
    };
    PT.setCMFont = function() {
        $(".CodeMirror").ready(function() {
            var fontsize = 12;
            var fontfamily = "consolas";
            if (typeof Setting.fontsize != "undefined") {
                fontsize = Setting.fontsize
            } else {
                Setting.fontsize = fontsize
            }
            if (typeof Setting.fontfamily != "undefined") {
                fontfamily = Setting.fontfamily
            } else {
                Setting.fontfamily = fontfamily
            }
            $(".CodeMirror").css({
                "font-family": fontfamily,
                "font-size": fontsize + "px"
            });
            instance.refreshEditors()
        })
    };
    PT.refreshEditors = function() {
        this.editorHtml.refresh();
        this.editorCss.refresh();
        this.editorJs.refresh()
    };
    return Editor
})();
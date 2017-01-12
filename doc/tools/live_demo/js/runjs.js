RunJS = (function() {
    var PT = RunJS.prototype;
    var instance;
    var defaultParams = {
        statusLink: editor_path + "/g_status"
    };
    PT.event_stack = [];
    PT.sys_flows = {};
    PT.Events = {
        "resize->[window]": "window_resize",
        "click->.user_login a": "openid_login",
        "keydown->[document]": "shortcuts",
        "click->.captcha": "refresh_captcha",
        "keydown->.enter_forbidden": "enter_forbidden"
    };
    function RunJS() {
        instance = this;
        this.arg = arguments;
        g_utils.initParams.call(this, defaultParams);
        g_utils.binder.call(this);
        this.flow.init(this);
        this.plugins.init();
        $(window).resize();
        return this
    }
    PT.sys_flows.save = function(step) {
        if (isEmpty(step)) {
            step = 1
        }
        switch (step) {
        case 1:
            if (g_status.login) {
                instance.flow.of(instance).save(step + 1)
            } else {
                instance.flow.push.call(instance, this.save, step);
                instance.dialog.get("login/save")
            }
            break;
        case 2:
            if (g_status.hasNoCode) {
                instance.create_project()
            } else {
                instance.flow.of(instance).save(step + 1)
            }
            break;
        case 3:
            if (g_status.isMyCode) {
                instance.flow.of(instance).save(step + 1)
            } else {
                if (g_status.isDemo) {
                    instance.create_project()
                } else {
                    instance.flow.of(instance).fork(1)
                }
            }
            break;
        case 4:
            instance.save();
            instance.flow.invokeStack(instance);
            break
        }
    };
    PT.sys_flows.share = function(step) {
        if (isEmpty(step)) {
            step = 1
        }
        switch (step) {
        case 1:
            if (g_status.login) {
                instance.flow.of(instance).share(step + 1)
            } else {
                instance.flow.push.call(instance, this.share, step);
                instance.dialog.get("login/share")
            }
            break;
        case 2:
            if (g_status.hasNoCode) {
                var doNow = function() {
                    instance.create_project("demo")
                };
                dialog.get("doConfirm2", "你当前没有代码可供分享，创建新代码？", doNothing, doNow)
            } else {
                instance.flow.of(instance).share(step + 1)
            }
            break;
        case 3:
            if (g_status.isDemo) {
                dialog.get("doConfirm4", "当前代码是演示代码，不能进行分享，请选择自己的代码分享", doNothing)
            } else {
                instance.flow.of(instance).share(step + 1)
            }
            break;
        case 4:
            instance.share()
        }
    };
    PT.sys_flows.fork = function(step) {
        if (isEmpty(step)) {
            step = 1
        }
        switch (step) {
        case 1:
            if (g_status.login) {
                instance.flow.of(instance).fork(step + 1)
            } else {
                instance.flow.push.call(instance, this.fork, step);
                instance.dialog.get("login/fork")
            }
            break;
        case 2:
            if (g_status.isDemo) {
                dialog.get("doConfirm4", "当前代码是演示代码，不能Fork", doNothing)
            } else {
                instance.fork()
            }
            break
        }
    };
    PT.before_close = function() {
        if (instance.editor.edited) {
            return confirm("代码尚未保存，确认离开将不会保存当前数据。")
        }
    };
    PT.enter_forbidden = function(cur, event) {
        if (event.keyCode == 13 || event.which == 13) {
            g_utils.stopDefault(event);
            return false
        }
    };
    PT.fork = function() {
        var doNow = function(d, rd) {
            var name = dialog.getField(d, "input", 0);
            if (isEmpty(name.val())) {
                name.focus();
                dialog.errorMsg(d, "代码名称不能为空");
                return false
            }
            var success = function(msg) {
                runjs.initAll(msg.ident);
                rd.close()
            };
            var fail = function(msg) {
                name.focus();
                dialog.errorMsg(d, msg.msg);
                return false
            };
            var callback = function(msg) {
                g_utils.errorHandler(msg, success, fail, true)
            };
            Api.ajax.fork(g_status.project, g_status.version, name.val(), callback);
            return false
        };
        dialog.get("fork", doNothing, doNow)
    };
    PT.save = function() {
        if (!instance.editor.edited) {
            return
        }
        var codes = this.editor.getEditorCode();
        var codeid = g_status.codeid;
        var sign = g_status.sign;
        var success = function(msg) {
            g_status.sign = msg.sign;
            instance.editor.updatePreview("", true);
            instance.editor.removeEditedStatus()
        };
        var fail = function(msg) {
            var donow = function(msg) {
                Api.ajax.update(codeid, codes.html, codes.css, codes.js, sign,
                function(msg) {
                    return g_utils.errorHandler(msg, success)
                },
                1)
            };
            if (msg.error == 2) {
                dialog.get("saveForce", doNothing, donow, "<p>导致保存失败有可能是因为有多个窗口编辑当前代码，强制保存可以忽视各编辑器差异，是否强制保存？</p>")
            }
        };
        var callback = function(msg) {
            g_utils.errorHandler(msg, success, fail)
        };
        Api.ajax.update(codeid, codes.html, codes.css, codes.js, sign, callback)
    };
    PT.checkProxy = function(handler, data) {
        var cur = this;
        var doNow = function() {
            var h = flow.of(instance)[handler];
            if (isFunc(h)) {
                h.call(this, data)
            } else {
                h = instance[handler];
                if (isFunc(h)) {
                    h.call(this, data)
                }
            }
        };
        instance.checkEditedStatus(doNow, doNow)
    };
    PT.uncheckPluginProxy = function(pid, cur) {
        instance.uncheckPlugin(pid, "",
        function() {
            $(cur).html("未启用");
            $(cur).parent().parent().removeClass("checked");
            $(cur).attr("href", "javascript:runjs.checkPluginProxy(" + pid + ",'" + cur + "')")
        })
    };
    PT.checkPluginProxy = function(pid, cur) {
        instance.checkPlugin(pid, "",
        function() {
            $(cur).html("已启用");
            $(cur).parent().parent().addClass("checked");
            $(cur).attr("href", "javascript:runjs.uncheckPluginProxy(" + pid + ",'" + cur + "')")
        })
    };
    PT.uncheckPlugin = function(pid, refresh, cb) {
        var success = function() {
            if (isNotEmpty(refresh)) {
                location.reload()
            } else {
                instance.initAll(g_status.ident)
            }
            if (isFunc(cb)) {
                cb()
            }
        };
        var callback = function(msg) {
            g_utils.errorHandler(msg, success, doNothing)
        };
        Api.ajax.uncheck_plugin(pid, callback)
    };
    PT.checkPlugin = function(pid, refresh, cb) {
        var success = function() {
            if (isNotEmpty(refresh)) {
                location.reload()
            } else {
                instance.initAll(g_status.ident)
            }
            if (isFunc(cb)) {
                cb()
            }
        };
        var callback = function(msg) {
            g_utils.errorHandler(msg, success, doNothing)
        };
        Api.ajax.check_plugin(pid, callback)
    };
    PT.setSysPlugin = function(pid, sys) {
        var success = function() {
            g_utils.initStatus(instance.statusLink + "/" + g_status.ident);
            updateUrl(g_status.host + editor_path + "/" + g_status.ident);
            instance.explorer.initView(true, g_status.ident);
            instance.menu.initView(g_status.ident);
            instance.editor.loadPluginTpl(g_status.ident, "all")
        };
        var callback = function(msg) {
            g_utils.errorHandler(msg, success, doNothing)
        };
        Api.ajax.set_plugin(pid, sys, callback)
    };
    PT.uploadPlugin = function() {
        var doNow = function(d, rd) {
            var form = dialog.getField(d, "form", 0);
            var name = dialog.getField(d, "input", 2);
            if (isEmpty(name.val())) {
                dialog.errorMsg(d, "插件名称不能为空");
                name.focus();
                return false
            }
            var success = function(msg) {
                if (isNotEmpty(msg.ident)) {
                    instance.initAll(msg.ident)
                }
                rd.close()
            };
            var fail = function(msg) {
                dialog.errorMsg(d, msg.msg)
            };
            var suc = function(msg) {
                g_utils.errorHandler(msg, success, fail, true)
            };
            form.ajaxForm({
                success: suc
            }).submit();
            return false
        };
        dialog.get("upload_plugin", doNothing, doNow)
    };
    PT.publish = function(id) {
        var doNow = function(d, rd) {
            var des = dialog.getField(d, "textarea", 0);
            if (isEmpty(des.val())) {
                des.focus();
                dialog.errorMsg(d, "代码描述不能为空");
                return false
            }
            var success = function(msg) {
                instance.initAll(g_status.ident);
                rd.close();
                var goNow = function() {
                    location.href = "/detail/" + g_status.ident
                };
                dialog.get("doConfirm2", doNothing, goNow, "发布成功,查看发布详情？")
            };
            var fail = function(msg) {
                des.focus();
                dialog.errorMsg(d, msg.msg)
            };
            var callback = function(msg) {
                g_utils.errorHandler(msg, success, fail, true)
            };
            Api.ajax.publish(id, des.val(), callback);
            return false
        };
        dialog.get("publish_version", doNothing, doNow)
    };
    PT.share = function() {
        if (g_status.posted) {
            dialog.get("share/" + g_status.ident, doNothing)
        } else {
            var doNow = function(d, rd) {
                instance.publish(g_status.codeid)
            };
            dialog.get("doConfirm2", "分享前请先发布当前代码，马上发布？", doNothing, doNow)
        }
    };
    PT.create_project = function(type) {
        var donow = function(d, rd) {
            var prj_name = dialog.valueOf(d, "input", 0);
            if (isNotEmpty(prj_name)) {
                var editor = instance.editor;
                var codes;
                switch (type) {
                case "demo":
                    codes = editor.getRemoteCode("", "");
                    break;
                case "simple":
                    var html = '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\n\t\t<title>RunJS</title>\n\t</head>\n\t<body>\n\t\t<button onclick="javascript:say_hello();">Hello RunJS!</button>\n\t</body>\n</html>';
                    var css = "button{\n\tborder:1px solid #ccc;\n\tcursor:pointer;\n  display:block;\n  margin:auto;\n  position:relative;\n  top:100px;\n}";
                    var js = 'function say_hello(){\n\t alert("Hello RunJS!");\n}';
                    codes = {
                        html: html,
                        css: css,
                        js: js
                    };
                    break;
                case "blank":
                    codes = {
                        html: "",
                        css: "",
                        js: ""
                    };
                    break;
                case "plugin":
                    codes = editor.loadPlugin("", "PluginName", 0);
                    break;
                default:
                    codes = editor.getEditorCode();
                    break
                }
                var success = function(msg) {
                    editor.removeEditedStatus();
                    instance.initAll(msg.ident);
                    rd.close()
                };
                var fail = function(msg) {
                    dialog.errorMsg(d, msg.msg)
                };
                var callback = function(msg) {
                    g_utils.errorHandler(msg, success, fail, true)
                };
                Api.ajax.add_project(prj_name, codes.html, codes.css, codes.js, callback, true)
            } else {
                dialog.errorMsg(d, "代码名称不能为空")
            }
            return false
        };
        instance.dialog.get("create_project/" + type, doNothing, donow)
    };
    PT.create_sys_plugin = function(sys) {
        var doCreate = function(d, rd) {
            var form = dialog.getField(d, "form", 0);
            var name = dialog.getField(d, "input", 0);
            var js = dialog.getField(d, "input", 3);
            if (isEmpty(name.val())) {
                dialog.onSettingItemClick(d, 0);
                dialog.errorMsg(d, "插件名称不能为空");
                name.focus();
                return false
            } else {
                if (/[\u4e00-\u9fa5]/.test(name.val())) {
                    dialog.onSettingItemClick(d, 0);
                    dialog.errorMsg(d, "插件名称不能包含中文");
                    name.focus();
                    return false
                } else {
                    if (! (/^([a-z]|[A-Z]|_)(.|\n)*/.test(name.val()))) {
                        dialog.onSettingItemClick(d, 0);
                        dialog.errorMsg(d, "插件名称需以字母或下划线开头");
                        name.focus();
                        return false
                    } else {
                        if ($.trim(name.val()).indexOf(" ") > -1) {
                            dialog.onSettingItemClick(d, 0);
                            dialog.errorMsg(d, "插件名称不允许用空格隔开");
                            name.focus();
                            return false
                        }
                    }
                }
            }
            var success = function(msg) {
                if (isNotEmpty(msg.ident)) {
                    instance.initAll(msg.ident, false);
                    var checked = $(d).find(".onEventsList input[type='checkbox']:checked");
                    var name = dialog.getField(d, "#plugin_name", 0);
                    var codes = instance.editor.loadPlugin(msg.ident, name.val(), checked.length);
                    var js = codes.js;
                    checked.each(function(i) {
                        var event = $(this).attr("id");
                        var rg = new RegExp("#onEvent" + i + "#", "ig");
                        js = js.replace(rg, event);
                        var des = $(this).siblings(".onEventsDescription").html();
                        rg = new RegExp("#onEvent" + i + "Description#", "ig");
                        js = js.replace(rg, des)
                    });
                    instance.editor.editorJs.setValue(js)
                }
                rd.close()
            };
            var fail = function(msg) {
                dialog.onSettingItemClick(d, 0);
                dialog.errorMsg(d, msg.msg)
            };
            var suc = function(msg) {
                g_utils.errorHandler(msg, success, fail, true)
            };
            form.ajaxForm({
                success: suc
            }).submit();
            return false
        };
        var goStep = function(step, d) {
            var sum = dialog.getField(d, ".setting_content .setting_list").find("li").length;
            if (step + 1 > sum || step < 0) {
                return
            }
            dialog.onSettingItemClick(d, step)
        };
        var lastStep = function(d, rd) {
            var step = dialog.getField(d, ".setting_content .item_focus").index();
            goStep(step - 1, d);
            return false
        };
        var nextStep = function(d, rd) {
            var step = dialog.getField(d, ".setting_content .item_focus").index();
            goStep(step + 1, d);
            return false
        };
        var type_ = (sys == "user") ? "user": "sys";
        var d = dialog.get("wizards/create_plugin/" + type_, doNothing, doCreate, nextStep, lastStep).dialog;
        $(".setting_list li").click(function() {
            var idx = $(this).index();
            dialog.onSettingItemClick(d, idx)
        });
        var step2 = 1;
        $(".create_plugin").ready(function() {
            var cur = $(".create_plugin");
            var s2 = cur.find(".right_content").eq(step2);
            var ul = s2.find(".onEventsList");
            $.each(plugins.onEvents,
            function(idx, event) {
                var des = plugins.onEventsDescription[idx];
                var checkbox = $('<input type="checkbox"/>').attr({
                    "id": event
                });
                var label = $("<label></label>").attr("for", event).html(event);
                var span = $('<span class="onEventsDescription"></span>').html(des);
                var li = $("<li></li>").attr("title", des).append(checkbox).append(label).append(span);
                ul.append(li)
            })
        })
    };
    PT.loadCode = function(ident) {
        if (ident == g_status.ident) {
            return
        }
        var doNow = function(d) {
            instance.initAll(ident)
        };
        instance.checkEditedStatus(doNow, doNow);
        instance.explorer.removeMenu()
    };
    PT.refresh_captcha = function() {
        $(this).attr("src", "/action/project/captcha?" + new Date().getTime())
    };
    PT.checkEditedStatus = function(doIt, cancelIt) {
        if (instance.editor.edited) {
            var cancel = function(d) {
                if (isFunc(cancelIt)) {
                    instance.editor.removeEditedStatus();
                    cancelIt()
                }
            };
            var doNow = function(d) {
                instance.flow.push.call(instance, doIt);
                instance.flow.of(instance).save(1)
            };
            instance.dialog.get("doConfirm3", "请保存后再继续操作，是否保存当前修改？", doNothing, cancel, doNow)
        } else {
            if (isFunc(doIt)) {
                doIt()
            }
        }
    };
    PT.initAll = function(ident, async) {
        if (isEmpty(ident)) {
            ident = ""
        }
        if (instance.cur_opt == "login") {
            g_utils.initStatus(instance.statusLink + "/" + ident)
        } else {
            g_utils.initStatus(instance.statusLink + "/after_login")
        }
        if (isNotEmpty(ident)) {
            updateUrl(g_status.host + editor_path + "/" + ident)
        }
        if (instance.cur_opt == "login") {
            instance.editor.initView(ident, async)
        }
        instance.explorer.initView(true, ident, async);
        instance.menu.initView(ident, async);
        try {
            instance.plugins.init();
        } catch(e) {
            Console.log(e)
        };
    };
    PT.initStatus = function(ident) {
        g_utils.initStatus(instance.statusLink + "/" + ident)
    };
    PT.openid_login = function() {
        var cur = $(this);
        var openid = cur.attr("openid");
        var url = "/action/openid/before_login?op=" + openid;
        openwindow(url, "loginPage", 800, 600);
        instance.dialog.cur_dialog.close()
    };
    PT.logout = function() {
        Api.ajax.logout(function(msg) {
            return g_utils.errorHandler(msg,
            function(msg) {
                instance.login = false;
                updateUrl(g_status.host + editor_path);
                location.reload()
            })
        })
    };
    PT.addCtrlHotKey = function(hk) {
        if (isEmpty(instance.ctrlHotKey)) {
            instance.ctrlHotKey = {}
        }
        $.each(hk,
        function(key, value) {
            instance.ctrlHotKey[key] = value
        })
    };
    PT.shortcuts = function(cur, event) {
        var keys = CodeMirror.keyNames;
        if (event.ctrlKey) {
            switch (keys[event.keyCode]) {
            case "S":
                instance.flow.of(instance).save(1);
                g_utils.stopDefault(event);
                break;
            default:
                var hk = instance.ctrlHotKey;
                var k = keys[event.keyCode];
                if (isNotEmpty(hk) && isNotEmpty(hk[k]) && isFunc(hk[k].event)) {
                    hk[k].event(hk[k].data);
                    instance.altHotKey = {
                        events: [],
                        data: []
                    };
                    g_utils.stopDefault(event)
                }
                break
            }
            return false
        } else {
            if (event.altKey) {
                var hk = instance.altHotKey;
                var k = keys[event.keyCode];
                switch (k) {
                case "/":
                    break;
                default:
                    if (isNotEmpty(hk) && isNotEmpty(hk[k]) && isFunc(hk[k].event)) {
                        hk[k].event(hk[k].data);
                        instance.altHotKey = {
                            events: [],
                            data: []
                        };
                        $(".setting_menu").remove()
                    }
                    break
                }
            } else {
                switch (keys[event.keyCode]) {
                case "F1":
                    g_utils.stopDefault(event);
                    setTimeout(function() {
                        instance.menu.help()
                    },
                    200);
                    break
                }
                return false
            }
        }
    };
    PT.window_resize = function() {
        var win_height = $(window).height();
        var win_width = $(window).width();
        var editorSets = instance.editor.editorSets;
        if (isEmpty(editorSets)) {
            return
        }
        var firstSetTop = editorSets.eq(0).offset().top;
        var av_height = win_height - firstSetTop;
        instance.editor.target.css({
            height: av_height - 18
        });
        instance.explorer.target.css({
            height: win_height - $(".header").height() - 5
        });
        var ver_left = editorSets.eq(0).width() - 3;
        instance.editor.v_handler.css({
            left: ver_left
        });
        instance.editor.h_handler.each(function(idx) {
            var hor_top = editorSets.eq(idx).find(".editor:eq(0)").height() - 5;
            $(this).css({
                top: hor_top
            })
        })
    };
    return RunJS
})();
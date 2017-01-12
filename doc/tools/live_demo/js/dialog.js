Dialog = (function() {
    var PT = Dialog.prototype;
    var instance;
    PT.defaultParams = {
        viewLink: editor_path + "/dialog",
        ident: ""
    };
    PT.Events = {};
    function Dialog() {
        instance = this;
        this.arg = arguments;
        this.clazz = className(this);
        g_utils.initParams.call(this, this.defaultParams);
        return this
    }
    PT.get = function() {
        if (arguments.length < 1 || !typeOf(arguments[0], "string")) {
            return
        }
        var name = arguments[0].split("/")[0];
        var events = [];
        var content;
        for (var i = 1; i < arguments.length; i++) {
            var cur = arguments[i];
            if (isFunc(cur)) {
                events.push(cur)
            }
            if (isArray(cur)) {
                $.each(cur,
                function(i, k) {
                    if (isFunc(k)) {
                        events.push(k)
                    }
                })
            }
            if (typeOf(cur, "string")) {
                content = cur
            }
        }
        if (isArray(content)) {
            events = content
        }
        var opt = this.option[name];
        if (isNotEmpty(opt)) {
            var html = g_utils.load(this.viewLink + "/" + arguments[0], false);
            if (isEmpty($.trim(html)) && isNotArray(content) && isNotFunc(content)) {
                html = content
            }
            var btns = opt.buttons;
            if (isArray(btns)) {
                $.each(btns,
                function(key, value) {
                    if (isFunc(events[key])) {
                        value.callback = events[key]
                    }
                })
            }
            this.cur_dialog = new $.Zebra_Dialog(html, opt);
            plugins.fireEvent("onDialogLoad", this.cur_dialog);
            return this.cur_dialog
        }
    };
    PT.getField = function(d, type, idx) {
        if (isNotEmpty(d) && isNotEmpty(type)) {
            if (isEmpty(idx) || !typeOf(idx, "number")) {
                idx = 0
            }
            try {
                return $(d).find(type + ":eq(" + idx + ")")
            } catch(e) {
                return
            }
        }
    };
    PT.valueOf = function(d, type, idx) {
        var e = instance.getField(d, type, idx);
        return isNotEmpty(e) ? e.val() : undefined
    };
    PT.setValueOf = function(d, type, idx, value) {
        var e = instance.getField(d, type, idx);
        if (isNotEmpty(e)) {
            e.val(value)
        }
    };
    PT.errorMsg = function(d, msg, sel) {
        if (isEmpty(msg) || isEmpty(d)) {
            return false
        }
        try {
            var em;
            if (isEmpty(sel)) {
                em = d.find(".errorMsg")
            } else {
                em = d.find(sel + " .errorMsg")
            }
            em.html(msg);
            return true
        } catch(e) {
            return false
        }
    };
    PT.onSettingItemClick = function(d, step) {
        var left_ul = dialog.getField(d, ".setting_content .setting_list");
        var right_content = dialog.getField(d, ".setting_right").find(".right_content");
        var arrow = dialog.getField(d, ".list_item_focus");
        var lis = left_ul.find("li").removeClass("item_focus");
        var cur = lis.eq(step).addClass("item_focus");
        right_content.removeClass("setting_on").addClass("setting_off");
        right_content.eq(step).removeClass("setting_off").addClass("setting_on");
        arrow.css("top", (10 + step * 41))
    };
    PT.events = {};
    PT.option = {
        success: {
            "single": true,
            "buttons": false,
            "modal": false,
            "type": "confirmation",
            "auto_close": 1000
        },
        success2: {
            "title": "操作成功",
            "modal": false,
            "type": "confirmation",
            "buttons": [{
                caption: "确认",
                enter: true,
                callback: function(d) {
                    return dialog.action.success_confirm(d)
                }
            }]
        },
        error: {
            "buttons": false,
            "modal": false,
            "type": "error",
            "auto_close": 2000
        },
        jserror: {
            "title": "脚本错误",
            "modal": false,
            "type": "error",
            "buttons": [{
                caption: "取消"
            }]
        },
        error2: {
            "title": "错误提示",
            "modal": false,
            "type": "error",
            "buttons": [{
                caption: "确认",
                callback: function(d) {
                    return dialog.action.error_confirm(d)
                }
            }]
        },
        create_project: {
            "title": "创建新代码",
            "modal": true,
            "type": "question",
            "buttons": [{
                caption: "取消",
                callback: function(d) {
                    if (typeof dialog.action.cancel != "undefined") {
                        return dialog.action.cancel(d)
                    } else {
                        return true
                    }
                }
            },
            {
                caption: "创建",
                enter: true,
                callback: function(d) {
                    return dialog.action.create(d)
                }
            }]
        },
        login: {
            "title": "登录方式",
            "modal": true,
            "width": 460,
            "type": false,
            "buttons": [{
                caption: "取消"
            }]
        },
        fork: {
            "title": "Fork 当前代码",
            "modal": true,
            "type": "question",
            "buttons": [{
                caption: "取消",
                callback: function(d) {
                    if (typeof dialog.action.cancel != "undefined") {
                        return dialog.action.cancel(d)
                    } else {
                        return true
                    }
                }
            },
            {
                caption: "确认",
                enter: true,
                callback: function(d) {
                    return dialog.action.create(d)
                }
            }]
        },
        delete_file: {
            "title": "删除",
            "modal": true,
            "type": "question",
            "buttons": [{
                caption: "取消",
                callback: function(d) {
                    d.close(true)
                }
            },
            {
                caption: "确认删除",
                enter: true,
                callback: function(d) {
                    return dialog.action.delete_(d)
                }
            }]
        },
        delete_code: {
            "title": "删除",
            "modal": true,
            "type": "question",
            "buttons": [{
                caption: "取消",
                callback: function(d) {
                    d.close(true)
                }
            },
            {
                caption: "确认删除",
                enter: true,
                callback: function(d) {
                    return dialog.action.delete_(d)
                }
            }]
        },
        rename: {
            "title": "重命名",
            "modal": true,
            "type": "question",
            "buttons": [{
                caption: "取消"
            },
            {
                caption: "确认",
                enter: true,
                callback: function(d) {
                    return dialog.action.rename(d)
                }
            }]
        },
        rename_catalog: {
            "title": "重命名",
            "modal": true,
            "type": "question",
            "buttons": [{
                caption: "取消"
            },
            {
                caption: "确认",
                enter: true,
                callback: function(d) {
                    return dialog.action.rename(d)
                }
            }]
        },
        f1_help: {
            "title": "帮助",
            "modal": true,
            "type": false,
            "width": 710,
            "single": true,
            "custom_class": "SettingsBody",
            "buttons": [{
                caption: "确认"
            }]
        },
        share: {
            "title": "分享",
            "modal": true,
            "width": 550,
            "type": false,
            "single": true,
            "buttons": [{
                caption: "确认",
                enter: true,
                callback: function(d) {
                    d.close(true)
                }
            }]
        },
        project_setting: {
            "title": "项目管理",
            "modal": true,
            "type": "information",
            "width": 600,
            "buttons": [{
                caption: "取消",
                callback: function(d) {
                    return dialog.action.cancel2(d)
                }
            },
            {
                caption: "确认",
                enter: true,
                callback: function(d) {
                    return dialog.action.doSetting(d)
                }
            }]
        },
        editor_setting: {
            "title": "编辑器设置",
            "modal": true,
            "type": false,
            "width": 710,
            "custom_class": "SettingsBody",
            "buttons": [{
                caption: "确认",
                callback: function(d) {
                    return dialog.action.doSetting(d)
                }
            }]
        },
        version_setting: {
            "title": "版本管理",
            "modal": true,
            "type": "information",
            "width": 600,
            "buttons": [{
                caption: "取消",
                callback: function(d) {
                    return dialog.action.cancel(d)
                }
            },
            {
                caption: "确认",
                enter: true,
                callback: function(d) {
                    return dialog.action.doSetting(d)
                }
            }]
        },
        publish_version: {
            "title": "发布当前代码",
            "modal": true,
            "type": false,
            "width": 400,
            "buttons": [{
                caption: "取消",
                callback: function(d) {
                    d.close(true)
                }
            },
            {
                caption: "发布",
                enter: true,
                callback: function(d) {
                    return dialog.action.publish(d)
                }
            }]
        },
        update_publish: {
            "title": "更新发布信息",
            "modal": true,
            "type": false,
            "width": 400,
            "buttons": [{
                caption: "取消",
                callback: function(d) {
                    d.close(true)
                }
            },
            {
                caption: "更新",
                enter: true,
                callback: function(d) {
                    return dialog.action.publish(d)
                }
            }]
        },
        doConfirm: {
            "title": "确认",
            "modal": true,
            "width": 350,
            "type": "question",
            "buttons": [{
                caption: "取消",
                callback: function(d) {
                    return dialog.action.cancel(d)
                }
            },
            {
                caption: "确认",
                enter: true,
                callback: function(d) {
                    return dialog.action.doIt(d)
                }
            }]
        },
        doConfirm2: {
            "title": "确认",
            "modal": true,
            "width": 300,
            "type": "question",
            "buttons": [{
                caption: "取消",
                callback: function(d) {
                    return dialog.action.cancel(d)
                }
            },
            {
                caption: "确认",
                enter: true,
                callback: function(d) {
                    return dialog.action.doIt(d)
                }
            }]
        },
        doConfirm3: {
            "title": "确认",
            "modal": true,
            "width": 400,
            "type": "question",
            "buttons": [{
                caption: "取消"
            },
            {
                caption: "不保存",
                callback: function(d) {
                    return dialog.action.cancel(d)
                }
            },
            {
                caption: "保存",
                enter: true,
                callback: function(d) {
                    return dialog.action.doIt(d)
                }
            }]
        },
        doConfirm4: {
            "title": "确认",
            "modal": true,
            "width": 300,
            "type": "question",
            "buttons": [{
                caption: "确认"
            }]
        },
        saveForce: {
            "title": "强制保存",
            "modal": true,
            "width": 300,
            "type": "question",
            "buttons": [{
                caption: "取消",
                callback: function(d) {
                    return dialog.action.cancel(d)
                }
            },
            {
                caption: "确认",
                enter: true,
                callback: function(d) {
                    return dialog.action.doIt(d)
                }
            }]
        },
        upload: {
            "title": "资源上传",
            "modal": true,
            "width": 450,
            "type": false,
            "buttons": [{
                caption: "取消",
                callback: function(d) {
                    d.close(true)
                }
            },
            {
                caption: "上传",
                enter: true,
                callback: function(d) {
                    return dialog.action.upload(d)
                }
            }]
        },
        upload_plugin: {
            "title": "插件上传",
            "modal": true,
            "width": 450,
            "type": false,
            "buttons": [{
                caption: "取消",
                callback: function(d) {
                    d.close(true)
                }
            },
            {
                caption: "上传",
                enter: true,
                callback: function(d) {
                    return dialog.action.upload(d)
                }
            }]
        },
        create_sys_plugin: {
            "title": "创建插件",
            "modal": true,
            "type": "question",
            "buttons": [{
                caption: "取消",
                callback: function(d) {
                    d.close(true)
                }
            },
            {
                caption: "创建",
                enter: true,
                callback: function(d) {
                    return dialog.action.upload(d)
                }
            }]
        },
        create_wizard: {
            "title": "项目创建向导",
            "modal": true,
            "width": 450,
            "type": false,
            "buttons": [{
                caption: "取消",
                callback: function(d) {
                    d.close(true)
                }
            }]
        },
        create_catalog: {
            "title": "创建分类",
            "modal": true,
            "type": false,
            "buttons": [{
                caption: "取消",
                callback: function(d) {
                    d.close(true)
                }
            },
            {
                caption: "创建",
                enter: true,
                callback: function(d) {
                    return dialog.action.upload(d)
                }
            }]
        },
        choose_catalog: {
            "title": "选择分类",
            "width": 450,
            "modal": true,
            "type": false,
            "buttons": [{
                caption: "取消",
                callback: function(d) {
                    d.close(true)
                }
            },
            {
                caption: "确定",
                enter: true,
                callback: function(d) {
                    return dialog.action.upload(d)
                }
            }]
        },
        choose_code_type: {
            "title": "代码视图类别",
            "width": 450,
            "modal": true,
            "type": false,
            "buttons": [{
                caption: "取消",
                callback: function(d) {
                    d.close(true)
                }
            },
            {
                caption: "确定",
                enter: true,
                callback: function(d) {
                    return dialog.action.upload(d)
                }
            }]
        },
        view_notify: {
            "title": "查看提醒",
            "modal": true,
            "type": false,
            "width": 710,
            "single": true,
            "custom_class": "SettingsBody",
            "buttons": [{
                caption: "确认"
            },
            {
                caption: "全部标记已阅"
            }]
        },
        wizards: {
            "title": "创建向导",
            "modal": true,
            "type": false,
            "width": 710,
            "single": true,
            "custom_class": "SettingsBody",
            "buttons": [{
                caption: "取消"
            },
            {
                caption: "完成",
                enter: true
            },
            {
                caption: "下一步"
            },
            {
                caption: "上一步"
            }]
        },
        action: {}
    };
    return Dialog
})();
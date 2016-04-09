Explorer = (function() {
    var PT = Explorer.prototype;
    var instance;
    PT.defaultParams = {
        viewLink: editor_path + "/explorer",
        cmenuLink: editor_path + "/context_menu",
        ident: ""
    };
    PT.Events = {
        "click->.fold_control": "fold_view",
        "click->#add_resource": "add_resource",
        "mouseover->.mainproject li.project": function() {
            $(this).find(".rename").show()
        },
        "mouseout->.mainproject li.project": function() {
            $(this).find(".rename").hide()
        },
        "click->.mainresource .title": function() {
            $(this).parent().toggleClass("dropped")
        },
        "click->.mainproject .catalog .title .title_name": function() {
            $(this).parent().parent().toggleClass("dropped")
        },
        "mouseover->.mainresource li.version": function() {
            $(this).find(".rdelete").show()
        },
        "mouseout->.mainresource li.version": function() {
            $(this).find(".rdelete").hide()
        },
        "mouseover->.mainproject li.version": function() {
            $(this).find(".delete").removeClass("nocurrent").addClass("current")
        },
        "mouseout->.mainproject li.version": function() {
            $(this).find(".delete").removeClass("current").addClass("nocurrent")
        }
    };
    function Explorer() {
        instance = this;
        this.arg = arguments;
        this.clazz = className(this);
        g_utils.initParams.call(this, this.defaultParams);
        if (this.show) {
            this.initView.call(this)
        }
        return this
    }
    PT.initView = function(show, ident, async) {
        if (isEmpty(show)) {
            show = this.show
        }
        this.toggle(show);
        if (isEmpty(ident)) {
            ident = this.ident
        }
        g_utils.initView.call(this, ident,
        function(ident, view) {
            $(window).resize()
        },
        async);
        g_utils.binder.call(this)
    };
    PT.create_wizard = function() {
        var d = dialog.get("create_wizard", doNothing);
        var button = d.dialog.find(".wizard_button li");
        var info = d.dialog.find(".wizard_info li");
        var onButton = d.dialog.find(".wizard_button li");
        var onInfo = d.dialog.find(".wizard_info li.on");
        onButton.click(function() {
            d.close()
        });
        button.mouseover(function() {
            $(".wizard_button li").removeClass("on");
            $(this).addClass("on");
            onInfo.removeClass("on");
            var idx = $(this).index();
            info.hide().eq(idx).show()
        })
    };
    PT.add_resource = function() {
        var doNow = function(d, rd) {
            var method = dialog.getField(d, "[name='method']:checked", 0);
            if (method.val() == "file") {
                var form = dialog.getField(d, "form", 0);
                var success = function(msg) {
                    instance.initView(true);
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
                }).submit()
            } else {
                var url = dialog.getField(d, "[name='url']", 0);
                if (isEmpty($.trim(url.val()))) {
                    dialog.errorMsg(d, "上传URL不能为空！");
                    url.focus();
                    return false
                }
                var success = function(msg) {
                    instance.initView(true);
                    rd.close()
                };
                var fail = function(msg) {
                    dialog.errorMsg(d, msg.msg)
                };
                var callback = function(msg) {
                    g_utils.errorHandler(msg, success, fail, true)
                };
                Api.ajax.add_url_file(url.val(), callback)
            }
            return false
        };
        dialog.get("upload", doNothing, doNow)
    };
    PT.update_publish = function(ident, cid, name) {
        if (isNotEmpty(ident) && isNotEmpty(name)) {
            var doNow = function(d, rd) {
                dialog.errorMsg(d, "");
                var des = dialog.getField(d, "textarea", 0);
                if (isEmpty(des)) {
                    dialog.errorMsg(d, "描述信息不能为空");
                    des.focus();
                    return false
                }
                var success = function(msg) {
                    rd.close()
                };
                var fail = function(msg) {
                    dialog.errorMsg(d, msg.msg);
                    des.focus()
                };
                var callback = function(msg) {
                    g_utils.errorHandler(msg, success, fail, true)
                };
                Api.ajax.update_info(cid, name, des.val(), callback);
                return false
            };
            dialog.get("update_publish/" + ident, doNothing, doNow)
        }
    };
    PT.rename_code = function(ident, cid) {
        if (isEmpty(ident)) {
            return false
        }
        var doNow = function(d, rd) {
            var name = dialog.getField(d, "input", 0);
            if (isEmpty(name.val())) {
                dialog.errorMsg(d, "新名称不能为空");
                name.focus();
                return false
            }
            var success = function(msg) {
                $("#code_" + cid + " .title_name").html(name.val());
                $("li[ident='" + ident + "'] .url").html(name.val());
                rd.close()
            };
            var fail = function(msg) {
                dialog.errorMsg(d, msg.msg)
            };
            var callback = function(msg) {
                g_utils.errorHandler(msg, success, fail, true)
            };
            Api.ajax.code_rename(cid, name.val(), callback);
            return false
        };
        dialog.get("rename/" + ident, doNothing, doNow)
    };
    PT.delete_code = function(id) {
        var doNow = function(d, rd) {
            var captcha = dialog.valueOf(d, "input", 0);
            if ($.trim(captcha).length == 0) {
                captcha.focus();
                dialog.errorMsg(d, "验证码不能为空");
                return false
            }
            var success = function(msg) {
                runjs.initAll();
                rd.close()
            };
            var fail = function(msg) {
                dialog.errorMsg(d, msg.msg)
            };
            var callback = function(msg) {
                g_utils.errorHandler(msg, success, fail, true)
            };
            Api.ajax.delete_project(captcha, id, callback);
            return false
        };
        dialog.get("delete_code", doNothing, doNow)
    };
    PT.createCatalog = function(cid, ident) {
        var doNow = function(d, rd) {
            var name = dialog.getField(d, "input", 0);
            if ($.trim(name.val()).length == 0) {
                name.focus();
                dialog.errorMsg(d, "分类名称不能为空");
                return false
            }
            var success;
            var fail = function(msg) {
                dialog.errorMsg(d, msg.msg)
            };
            var callback = function(msg) {
                g_utils.errorHandler(msg, success, fail, true)
            };
            var once = true;
            success = function(msg) {
                runjs.explorer.initView(true);
                rd.close();
                var doConfirm = function(d, rd1) {
                    rd = rd1;
                    Api.ajax.move_to_catalog(cid, msg.id, callback);
                    return false
                };
                if (once) {
                    dialog.get("doConfirm2", doNothing, doConfirm, '<p>是否将当前代码添加到分类"' + msg.name + "\"？</p><p><span class='errorMsg'></span></p>");
                    once = false
                }
            };
            Api.ajax.add_catalog(name.val(), callback);
            return false
        };
        dialog.get("create_catalog", doNothing, doNow)
    };
    PT.moveToCatalog = function(cid, ident) {
        var doNow = function(d, rd) {
            var catalog = dialog.getField(d, "input[type='radio']:checked", 0);
            if (catalog.length == 0) {
                dialog.errorMsg(d, "请选择一个分类");
                return false
            }
            var cat = catalog.attr("id").split("_")[2];
            var success = function(msg) {
                runjs.explorer.initView(true);
                rd.close()
            };
            var fail = function(msg) {
                dialog.errorMsg(d, msg.msg)
            };
            var callback = function(msg) {
                g_utils.errorHandler(msg, success, fail, true)
            };
            Api.ajax.move_to_catalog(cid, cat, callback);
            return false
        };
        dialog.get("choose_catalog", doNothing, doNow)
    };
    PT.delete_resource = function(type, id) {
        if (isEmpty(type) || !typeOf(id, "number")) {
            return
        }
        var doNow = function(d, rd) {
            var captcha = dialog.valueOf(d, "input", 0);
            if ($.trim(captcha).length == 0) {
                dialog.errorMsg(d, "验证码不能为空");
                return false
            }
            var success = function(msg) {
                instance.initView();
                rd.close()
            };
            var fail = function(msg) {
                dialog.errorMsg(d, msg.msg)
            };
            var callback = function(msg) {
                g_utils.errorHandler(msg, success, fail, true)
            };
            Api.ajax.delete_file(captcha, id, callback);
            return false
        };
        dialog.get("delete_file", doNothing, doNow)
    };
    PT.rename_catalog = function(cid, cname) {
        if (isEmpty(cname)) {
            cname = cid.cname;
            cid = cid.cid
        }
        var doNow = function(d, rd) {
            var name = dialog.getField(d, "input", 0);
            if (isEmpty(name.val())) {
                dialog.errorMsg(d, "新名称不能为空");
                name.focus();
                return false
            }
            var success = function(msg) {
                runjs.explorer.initView(true);
                rd.close()
            };
            var fail = function(msg) {
                dialog.errorMsg(d, msg.msg)
            };
            var callback = function(msg) {
                g_utils.errorHandler(msg, success, fail, true)
            };
            Api.ajax.rename_catalog(name.val(), cid, callback);
            return false
        };
        dialog.get("rename_catalog/" + cid, doNothing, doNow)
    };
    PT.delete_catalog = function(cid, cname) {
        if (isEmpty(cname)) {
            cname = cid.cname;
            cid = cid.cid
        }
        var doNow = function(d, rd) {
            var success = function(msg) {
                runjs.explorer.initView(true);
                rd.close()
            };
            var fail = function(msg) {
                dialog.errorMsg(d, msg.msg)
            };
            var callback = function(msg) {
                g_utils.errorHandler(msg, success, fail, true)
            };
            Api.ajax.delete_catalog(cid, callback);
            return false
        };
        dialog.get("doConfirm2", doNothing, doNow, '删除分类不会删除该分类下的代码，确认删除分类"' + cname + '"？')
    };
    PT.showCatalogMenu = function(cur, cid) {
        var clazz = "catalog_menu2_" + cid;
        if ($(".setting_menu").length != 0) {
            var menu = $(".setting_menu").remove();
            if (menu.attr("class").indexOf(clazz) > 0) {
                return
            }
        }
        var menu = instance.loadContextMenu(g_status.ident, "catalog", cid);
        plugins.fireEvent("beforeContextMenuLoad", menu);
        var pos = {
            top: cur.offset().top + 10,
            left: 210
        };
        if (isNotEmpty($.trim(menu))) {
            $(".setting_menu").remove();
            $("body").append(menu);
            $(".setting_menu").css(pos);
            plugins.fireEvent("onContextMenuLoad", menu)
        }
        $(".setting_menu").ready(function() {
            var cur = $(".setting_menu");
            cur.unbind("mouseleave");
            cur.mouseenter(function() {
                cur.mouseleave(function() {
                    cur.remove();
                    plugins.fireEvent("onContextMenuRemove", menu)
                });
                cur.unbind("mouseenter")
            })
        })
    };
    PT.showCodeMenu = function(cur, ident, pid) {
        var clazz = "version_menu_" + pid + "_" + ident;
        if ($(".setting_menu").length != 0) {
            var menu = $(".setting_menu").remove();
            if (menu.attr("class").indexOf(clazz) > 0) {
                return
            }
        }
        var menu = instance.loadContextMenu(ident);
        plugins.fireEvent("beforeContextMenuLoad", menu);
        var pos = {
            top: cur.offset().top + 10,
            left: 210
        };
        if (isNotEmpty($.trim(menu))) {
            $(".setting_menu").remove();
            $("body").append(menu);
            $(".setting_menu").css(pos);
            plugins.fireEvent("onContextMenuLoad", menu)
        }
        $(".setting_menu").ready(function() {
            var cur = $(".setting_menu");
            cur.unbind("mouseleave");
            cur.mouseenter(function() {
                cur.mouseleave(function() {
                    cur.remove();
                    plugins.fireEvent("onContextMenuRemove", menu)
                });
                cur.unbind("mouseenter")
            })
        })
    };
    PT.removeMenu = function() {
        return $(".setting_menu").remove()
    };
    PT.loadContextMenu = function(ident, type, catalog) {
        if (isEmpty(ident)) {
            return
        }
        if (isEmpty(type)) {
            type = "code"
        }
        if (isEmpty(catalog)) {
            catalog = ""
        }
        var menu = g_utils.load(instance.cmenuLink + "/" + type + "/" + ident + "/" + catalog, false);
        return menu
    };
    PT.fold_view = function() {
        var show = $(".core_margin1").length == 1;
        instance.target.toggle();
        instance.core.toggleClass("core_margin1").toggleClass("core_margin");
        if (show) {
            instance.fold.toggleClass("off").toggleClass("on").css({
                left: 215
            })
        } else {
            instance.fold.toggleClass("on").toggleClass("off").css({
                left: 2
            })
        }
        $(window).resize()
    };
    PT.toggle = function(show) {
        if (show) {
            this.target.show();
            this.fold.show();
            this.core.removeClass("core_margin1").addClass("core_margin")
        } else {
            this.target.hide();
            this.fold.hide();
            this.core.removeClass("core_margin").addClass("core_margin1")
        }
    };
    return Explorer
})();
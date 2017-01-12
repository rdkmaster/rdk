var Api = {
    ajax: {
        add_project: function(pro_name, html, css, js, callback) {
            $.post("/action/project/add", {
                "v_code": User.v_code,
                "pro_name": pro_name,
                "html": html,
                "css": css,
                "js": js
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        add_code: function(code_name, html, css, js, callback) {
            $.post("/action/code/add", {
                "v_code": User.v_code,
                "code_name": code_name,
                "html": html,
                "css": css,
                "js": js
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        update: function(id, html, css, js, sign, callback, force) {
            $.post("/action/project/update", {
                "v_code": User.v_code,
                "id": id,
                "css": css,
                "js": js,
                "html": html,
                "sign": sign,
                "force": force
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        update_code: function(id, html, css, js, sign, callback, force) {
            $.post("/action/code/update", {
                "v_code": User.v_code,
                "id": id,
                "css": css,
                "js": js,
                "html": html,
                "sign": sign,
                "force": force
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        new_version: function(id, html, css, js, callback) {
            $.post("/action/project/new_version", {
                "v_code": User.v_code,
                "id": id,
                "css": css,
                "js": js,
                "html": html
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        fork: function(pro_id, ver, pro_name, callback) {
            $.post("/action/project/fork", {
                "v_code": User.v_code,
                "pro_id": pro_id,
                "ver": ver,
                "pro_name": pro_name
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        fork_code: function(id, code_name, callback) {
            $.post("/action/code/fork", {
                "v_code": User.v_code,
                "id": id,
                "code_name": code_name
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        delete_version: function(captcha, pro_id, ver, sign, callback, force) {
            $.post("/action/project/delete_version", {
                "captcha_": captcha,
                "v_code": User.v_code,
                "pro_id": pro_id,
                "ver": ver,
                "sign": sign,
                "force": force
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        delete_code: function(captcha, id, callback) {
            $.post("/action/code/delete", {
                "captcha_": captcha,
                "v_code": User.v_code,
                "id": id
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        delete_project: function(captcha, pro_id, callback) {
            $.post("/action/project/delete_project", {
                "captcha_": captcha,
                "v_code": User.v_code,
                "id": pro_id
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        add_comment: function(code_id, content, callback) {
            $.post("/action/project/add_comment", {
                "v_code": User.v_code,
                "id": code_id,
                "content": content
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        delete_comment: function(comment_id, callback) {
            $.post("/action/project/delete_comment", {
                "v_code": User.v_code,
                "id": comment_id
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        vote: function(code_id, type, callback) {
            $.post("/action/project/vote", {
                "v_code": User.v_code,
                "id": code_id,
                "type": type
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        login: function(name, callback) {
            $.post("/action/ajax/login", {
                "username": name
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        logout: function(callback) {
            $.post("/action/ajax/logout", "uid=" + User.user,
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        getCode: function(id, callback) {
            $.post("/action/api/getCode", {
                "id": id
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        project_rename: function(id, name, callback) {
            $.post("/action/project/rename", {
                "v_code": User.v_code,
                "pro_id": id,
                "name": name
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        code_rename: function(id, name, callback) {
            $.post("/action/project/rename_code", {
                "v_code": User.v_code,
                "code_id": id,
                "name": name
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        code_rename: function(id, name, callback) {
            $.post("/action/code/rename", {
                "v_code": User.v_code,
                "id": id,
                "name": name
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        setting: function(name, value, callback) {
            $.post("/action/api/setting", {
                "v_code": User.v_code,
                "name": name,
                "value": value
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        publish: function(id, description, callback) {
            $.post("/action/project/post", {
                "v_code": User.v_code,
                "id": id,
                "description": description
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        publish_code: function(id, description, callback) {
            $.post("/action/code/post", {
                "v_code": User.v_code,
                "id": id,
                "description": description
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        update_info: function(id, name, description, callback) {
            $.post("/action/project/update_info", {
                "v_code": User.v_code,
                "id": id,
                "name": name,
                "description": description
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        update_code_info: function(id, name, description, callback) {
            $.post("/action/code/update_info", {
                "v_code": User.v_code,
                "id": id,
                "name": name,
                "description": description
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        favor: function(code_id, callback) {
            $.post("/action/project/favor", {
                "v_code": User.v_code,
                "id": code_id
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        un_favor: function(favor_id, callback) {
            $.post("/action/project/un_favor", {
                "v_code": User.v_code,
                "id": favor_id
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        add_url_file: function(url, callback) {
            $.post("/action/file/add_url_file", {
                "v_code": User.v_code,
                "url": url
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        delete_file: function(captcha, id, callback) {
            $.post("/action/file/delete_file", {
                "captcha_": captcha,
                "v_code": User.v_code,
                "id": id
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        add_advice: function(captcha, ident, email, content, callback) {
            $.post("/action/advice/add_advice", {
                "captcha_": captcha,
                "ident": ident,
                "email": email,
                "content": content
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        send_msg: function(receiver, content, callback) {
            $.post("/action/msg/sendMsg", {
                "receiver": receiver,
                "content": content
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        read_msg: function(id, callback) {
            var params = "?";
            $.each(id,
            function(i, cur) {
                params += "id=" + cur;
                if (i < id.length - 1) {
                    params += "&"
                }
            });
            if (params == "?") {
                params += "id=" + id
            }
            $.post("/action/msg/readMsg" + params, params,
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        read_all_msg: function(type, callback) {
            $.post("/action/msg/readAllMsg", {
                "v_code": User.v_code,
                "type": type,
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        add_to_market: function(id, callback) {
            $.post("/action/plugin/add_to_market", {
                "id": id
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        update_to_market: function(id, callback) {
            $.post("/action/plugin/update_to_market", {
                "id": id
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        delete_from_market: function(id, callback) {
            $.post("/action/plugin/delete_from_market", {
                "id": id
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        set_plugin: function(id, sys, callback) {
            $.post("/action/plugin/set_code_plugin", {
                "id": id,
                "sys": sys
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        check_plugin: function(id, callback) {
            $.post("/action/plugin/check", {
                "id": id
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        uncheck_plugin: function(id, callback) {
            $.post("/action/plugin/uncheck", {
                "id": id
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        add_to_square: function(id, callback) {
            $.post("/action/square/add", {
                "id": id
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        update_to_square: function(id, callback) {
            $.post("/action/square/update", {
                "id": id
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        add_catalog: function(name, callback) {
            $.post("/action/catalog/add", {
                "name": name
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        rename_catalog: function(name, id, callback) {
            $.post("/action/catalog/rename", {
                "name": name,
                "id": id
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        delete_catalog: function(id, callback) {
            $.post("/action/catalog/delete", {
                "id": id
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        move_to_catalog: function(code_id, catalog_id, callback) {
            $.post("/action/catalog/move_to", {
                "id": code_id,
                "catalog": catalog_id
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        set_code_type: function(id, code_type, type, callback) {
            $.post("/action/code/set_code_type", {
                "id": id,
                "code": code_type,
                "type": type
            },
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        },
        less_compile: function(less, callback) {
            $.post("/action/ajax/less_compile", less,
            function(msg) {
                if (typeof callback != "undefined") {
                    return callback(msg)
                }
            })
        }
    }
};
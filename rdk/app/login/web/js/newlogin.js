if (!AuthenticateImplement) {
    //提供默认的鉴权实现
    AuthenticateImplement = {
        authenticate: function() {
            console.warn('no authentication implement!!');
            location.href = "/rdk/app/portal/web/index.html";
        },
        checkAuthenticate: function() {
            console.warn('no authentication implement!!');
        }
    }
}

var Login = function () {
    // 暴露的外部接口
    return {
        //main function to initiate the module
        init: function () {
            // 如果记录的用户的信息则显示出来
            getUserInfo();

           $('.login-form').validate({
                errorElement: 'label', //default input error message container
                errorClass: 'help-inline', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                rules: {
                    username: {
                        required: true
                    },
                    password: {
                        required: false
                    },
                    remember: {
                        required: false
                    }
                },

                messages: {
                    username: {
                        required: $.i18n.prop("com_zte_ums_ict_portal_login_required_username")
                    },
                    password: {
                        required: $.i18n.prop("com_zte_ums_ict_portal_login_required_password")
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    $('.alert-error', $('.login-form')).fadeIn(300);
                },

                highlight: function (element) { // hightlight error inputs
                    // $(element).addClass('inputWarningShadow');
                },

                success: function (label) {
                    label.closest('.form-group').removeClass('has-error');
                    label.remove();
                },

                errorPlacement: function (error, element) {
                    // error.addClass('help-small no-left-padding').insertAfter(element.closest('.input-icon'));
                    $('.display-hide.tips').hide();
                    $('.help-inline').css('display','block');
                    $('.requireInfo').text("");
                    $('.requireInfo').append(error);
                    $('.requireInfo').fadeIn(300);
                    error.append('<div class="errorTipClose"></div>')
                },

                submitHandler: function (form) {
                    // 如果点击记住密码,则记住用户的信息
                    saveUserInfo();

                    // $('.inputWarningShadow').removeClass('inputWarningShadow');

                    var params = {};
                    params["username"] =$("#inputUserName").val();
                    var sourcePass = $("#inputPassword").val();
                    var pass = Tools.ict_framework_func1(sourcePass);

                    params["password"] = pass;
                    params["isEncypted"]  = true;

                    AuthenticateImplement.authenticate(params,
                            $("#com_zte_ums_ict_portal_login_userPassword"),
                            $("#nameOrpwdError"),
                            $("#loginConnError"));
                }
            });

            $('.login-form input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('.login-form').validate().form()) {
                         $('.login-form').submit();
                    }
                    return false;
                } else {
                    var tip = $("#nameOrpwdError");
                    if (tip.attr("tipstatus") == "normal") {
                        tip.fadeOut(300);
                    }
                }
            });

            // 设置光标"如果用户名为空则设置用户名输入的位置",否则在"登录按钮"
            setFocus();
        }

    };

    // 如果用户点击了记住"用户名/密码" 则将密码用户名保存在cookie中, 并且7天过期
    function saveUserInfo() {
        var rmbcheck=$("input[name='remember']");
        if (rmbcheck[0].checked|| rmbcheck[0].checked=="checked") {

            var userName = $("#inputUserName").val();
            var passWord = $("#inputPassword").val();
            $.cookie("remember", "true", { expires: 7 });
            $.cookie("inputUserName", userName, { expires: 7 });
            $.cookie("inputPassword", passWord, { expires: 7 });
        }
        else {
            $.cookie("remember", "false", { expires: -1 });
            $.cookie("inputUserName", '', { expires: -1 });
            $.cookie("inputPassword", '', { expires: -1 });
        }
    }

    // 如果用户点击了记住"用户名/密码", 显示在界面中
    function getUserInfo() {
        var remember = $.cookie("remember");
        var userName = $.cookie("inputUserName");
        var passWord = $.cookie("inputPassword");

        if (remember&& userName) {
            $("input[name='remember']").attr("checked","checked");

            $('.checkIconChecked').show();
            $('.checkIconEmpty').hide();

            $("#inputUserName").val(userName);
            $("#inputPassword").val(passWord);
        } else {
            $('.checkIconChecked').hide();
            $('.checkIconEmpty').show();
            $("#inputUserName").val("");
            $("#inputPassword").val("");
        }
    }

    // form初始化时设置光标的位置
    function setFocus() {
        if (!$("#inputUserName").val()) {
            $("#inputUserName").focus();
        } else {
            $("button[type='submit']").focus();
        };
    }

}();

$(document).ready(function(){
    AuthenticateImplement.checkAuthenticate();
    loadProperties();

    $('#inputUserName').focus();
    Login.init();
});

var bufferedLanguage = "";
function getLanguage() {
    if (bufferedLanguage) {
        return bufferedLanguage;
    }

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/rdk/service/app/common/locale",
        async: false,
        success: function(data) {
            if (data && data.result) {
                bufferedLanguage = data.result.replace(/_/g, '-');
            } else {
                bufferedLanguage = "zh-CN"; // 默认值
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            bufferedLanguage = "zh-CN"; // 默认值
        }
    });

    return bufferedLanguage;
};

function loadProperties(){
    $.i18n.properties({//加载资浏览器语言对应的资源文件
        name:'app-vmax-i18n', //资源文件名称
        path:'./i18n/', //资源文件路径
        mode:'map', //用Map的方式使用资源文件中的值
        language : getLanguage(),
        callback: function(data) { //加载成功后设置显示内容
            var i18nItems = $('*[data-i18n]');

            i18nItems.each(function(index, item) {
                if($(item).attr("data-i18n").indexOf("_placeholder") > -1) {
                    $(item).attr('placeholder',$.i18n.prop($(item).attr("data-i18n")));
                } else {
                    $(item).text($.i18n.prop($(item).attr("data-i18n")));
                }
            });
        }
    });
}

function hidetip(id) {
    var tip = $("#"+id);
    // tip.hide();
    tip.fadeOut(300);
    tip.attr("tipstatus", "close");
}
$('#com_zte_ums_ict_portal_login_rememberMe').click(function() {
    $(this).siblings('input[type="checkbox"]').click();
})
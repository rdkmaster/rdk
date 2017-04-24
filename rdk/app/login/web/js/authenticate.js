
var AuthenticateImplement = function() {

    var processLoginResult = function(data,params,errorMsgDom,tipsDom,connMsgDom){
        var ErrResult_LOGIN_SUCCESS = 0;
        var ErrResult_LOGIN_SUCCESS_WARN = 1;
        var ErrResult_LOGIN_SUCCESS_PASSWORD_WARN = 2;
        var ErrResult_LOGIN_SUCCESS_PASSWORD_MUSTCHANGE = 3;
        var ErrResult_LOGIN_FAILURE = 4;
        var ErrResult_LOGIN_SERV_ERROR = -1;

        // 自定义的登录首页.
        data.home = "/rdk/app/portal/web/index.html";

        var toHomePage = function(){
            location.href = data.home;
        }

        var errors = data.errors;

        if(data.result == 1){ // 表示成功
            if( store) {
                store('username',params.username);
            }

            if(errors){
                // TODO 修改密码还没有做;
                if(errors[ErrResult_LOGIN_SUCCESS_PASSWORD_WARN]){
                    changePassword(params, errors);
                }
                else if(errors[ErrResult_LOGIN_SUCCESS_WARN]){
                    window.alert(errors.message,toHomePage);
                }
                else {
                    location.href = data.home;
                }
            } else {
                location.href = data.home;
            }
        } else { // 登陆失败
            if(errors[ErrResult_LOGIN_SUCCESS_PASSWORD_MUSTCHANGE]){
                changePassword(params, errors);
            } else if(errors[ErrResult_LOGIN_FAILURE]){
                if(errorMsgDom) {
                    errorMsgDom.attr("title", errors[ErrResult_LOGIN_FAILURE]);
                    errorMsgDom.html(errors[ErrResult_LOGIN_FAILURE]);
                }

                if(tipsDom) {
                    var tip = tipsDom;
                    if (tip.attr("tipstatus") == "normal") {
                        // tip.show();
                        tip.fadeIn(300);
                    } else if (tip.attr("tipstatus") == "close") {
                        tip.attr("tipstatus", "normal");
                    }
                }

            } else if(errors[ErrResult_LOGIN_SERV_ERROR]){
                if(connMsgDom) {
                    var tip = connMsgDom;

                    if (tip.attr("tipstatus") == "normal") {
                        tip.fadeIn(300);
                        //tip.show();
                    } else if (tip.attr("tipstatus") == "close") {
                        tip.attr("tipstatus", "normal");
                    }
                }

            }
        }
    }

    function changePassword(params, errors) {
        window.alert(errors.message,toHomePage);
    };


    var ict_framework_aes_a1 = "9763853428462486";
    var ict_framework_aes_a2 = "9763853428462486";

    function encrypt(word) {
        var a1 = CryptoJS.enc.Utf8.parse(ict_framework_aes_a1);   
        var a2 = CryptoJS.enc.Utf8.parse(ict_framework_aes_a2);   
        var srcs = CryptoJS.enc.Utf8.parse(word);  
        var encrypted = CryptoJS.AES.encrypt(srcs, a1, { iv: a2,mode:CryptoJS.mode.CBC});  
        return encrypted.toString();  
    }

    return {
        authenticate : function(params,errorMsgDom,tipsDom,connMsgDom){
            params.password = encrypt(password);
            params.isEncypted = true;
            $.post("/web/res/web-common/login",params,function(data){
                processLoginResult(data,params,errorMsgDom,tipsDom,connMsgDom);
            },"json");
        },
        checkAuthenticate: function() {
            console.log('cookie:', document.cookie )
            var http = new window.XMLHttpRequest();
            http.open("GET", "/web/rest/web-common/common?action=getUserName");
            http.setRequestHeader("Content-Type", "application/json; charset=utf-8");

            http.onreadystatechange = function(res) {
                if(http.readyState == 4 && http.status == 200 && http.responseText.length != 0) {
                    console.log( 'res',res)
                    window.location.href = '/rdk/app/portal/web/index.html';
                }
                if (http.status == 404) {
                }
            };
            http.send(null);
        }

    }

}();

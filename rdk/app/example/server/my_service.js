(function() {

    return function(request, script) {
        //服务的第一行代码写在这里！
        log('extra data:', request.extra);
        var lib = require("app/example/server/mylib.js");
        lib.hello(request.toWho);
        //为了演示blockUI的效果，这里故意延迟返回
        sleep(500);
        return i18n('greetings', !!request.crossDomain ? i18n('crossDomain') : i18n('nativeDomain'));
    }

})();

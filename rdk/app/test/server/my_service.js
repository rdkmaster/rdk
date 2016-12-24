(function() {

    return function(request, script) {
        //服务的第一行代码写在这里！
        var lib = require("app/test/server/mylib.js");
        lib.hello('rdk');
        //为了演示blockUI的效果，这里故意延迟返回
        sleep(500);
        return i18n('greetings', script);
    }

})();

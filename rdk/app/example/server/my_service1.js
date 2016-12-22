(function() {

    return function(request, script) {
        //服务的第一行代码写在这里！
        var lib = require("app/example/server/mylib.js");
        lib.hello('rdk');
        //为了演示blockUI的效果，这里故意延迟返回
        rest.get('/rdk/service/app/example/server/my_service1?p={"param":{},"app":"example"}');
        return i18n('greetings', script);
    }
    //var _post = function (request ,script){
    //    log("post test");
    //    log(request);
    //    log(script);
    //    return "post test";
    //}
    //
    //var _del = function (request ,script){
    //    log("delete test");
    //    log(request);
    //    log(script);
    //    return "delete test";
    //}
    //
    //var _put = function (request ,script){
    //    log("put test");
    //    log(request);
    //    log(script);
    //    return "put test";
    //}
    //return {"post":_post,
    //         "delete":_del,
    //         "put":_put}

})();

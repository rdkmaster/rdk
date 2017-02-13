(function() {

    return function(request, script) {
        //服务的第一行代码写在这里！
        //var lib = require("app/example/server/mylib.js");
        //lib.hello('rdk');
        ////为了演示blockUI的效果，这里故意延迟返回
        //sleep(500);
        //return i18n('greetings', script);

        //====================shell测试
        //return Shell.execute("ls","0","-a","-l");
        //return Shell.execute("ls -al",1)

        //====================清除应用缓存
        //return Cache.clear()

        //====================多数据源
        //Data.useDataSource("gp");
        //log(Data.fetch("SELECT * FROM gptest",5000)); //查询gp数据库

        //====================aging cache
        //Cache.aging.put("timer5","A",3,mycallback);
        //function mycallback() {
        //    log("******************aaaaaaa*****************************8");
        //}
        //return Cache.aging.get("timer5");

       //=====================rest service
       //  log(request)
       //  log("===========")
       //  log(request.param1)
       //  log(typeof request.param1)
       //  log("===========")
       //  log(request.param1.a)
       //  log("===========")
       //  log(request.param2)
       //  log("===========")
       //  log(request.param3)
       //  log("===========")
       //  log(request.app)

        //  log(request)
        //  log("===========")
        //  log(request.param1)
        //  log(request.param1.a)
        //  log("===========")
        //  log(request.param2)
        //  log("===========")
        //  log(request.param3)
        //  log("===========")
        // log(script)

        //=============readXML
        // log(File.readXml("app/example/server/test.xml"))
        // return "hello"


        //公共导出csv

        // return  new DataTable(['网元','名字'],['neid','name'],[['30','test1'],['20','test2']]);
    }

})();
//

// (function() {
//
//     function _post(request, script) {
//         //直接将前端传递过来的参数打印到日志中。
//         log(request);   //
//         return "rdk";
//     }
//
//     return {
//         post : _post
//     }
//
// })();

/**
 * Created by 10045812 on 16-8-19.
 * rest服务请求转发，实现在app目录以外的js文件的执行
 */
(function() {
    return function(req) {
        var param = req.param;
        var script = req.script;
        if (!script.match(/\.js$/)) {
            script += '.js';
        }
        var service = require(script);
        return service(param, script);
    }
})();

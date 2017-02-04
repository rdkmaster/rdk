/**
 * Created by 10045812 on 16-8-19.
 * rest服务请求转发，实现在app目录以外的js文件的执行
 */
(function() {
    return function(req) {
        var param;
        var script;
        if (req.hasOwnProperty('p') && req.p.hasOwnProperty('param')) {
            //paging、relay等后端带过来的中继请求
            script = req.p.param.script;
            param = req.p.param.param;
        } else {
            //浏览器带过来的中继请求
            script = req.script;
            param = req.param;
        }
		if (!script.match(/\.js$/)) {
			script += '.js';
		}
		var service = require(script);
        return service(param, script);
    }
})();

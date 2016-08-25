/**
 * Created by 10045812 on 16-8-19.
 * rest服务请求转发，实现在app目录以外的js文件的执行
 */
(function() {
    return function(req) {
		if (!req.script.match(/\.js$/)) {
			req.script += '.js';
		}
		var service = require(req.script);
        return service(req.param, req.script);
    }
})();

/**
 * Created by 10045812 on 16-8-19.
 * rest服务请求转发，实现在app目录以外的js文件的执行
 */
(function() {
    return {
        get: function(req) {
            return _relay(req, 'get');
        },
        post: function(req) {
            return _relay(req, 'post');
        },
        put: function(req) {
            return _relay(req, 'put');
        },
        delete: function(req) {
            return _relay(req, 'delete');
        }
    }

    function _relay(req, method) {
        return !!req.throughtRest ?
            restRelay(req.service, req.param, method) :
            nativeRelay(req.service, req.param);
    }

    function nativeRelay(service, param) {
        log(service, param);
        if (!service.match(/\.js$/)) {
            service += '.js';
        }
        var service = require(service);
        return service(param, service);
    }

    function restRelay(service, param, method) {
        log(method, '-------------------')
        return Rest[method](service, param, {});
    }
})();

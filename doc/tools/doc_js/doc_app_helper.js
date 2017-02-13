define(['rd.core'], function() {
    function commonAjaxConfigProcessor(config) {
        var url = _fixUrl(config.url).trim();
        if (url.match(/.+\.json\s*$/i)) {
            //json静态文件无逻辑
            config.url = url;
        } else {
            //是一个有逻辑的服务
            config.url = '/rdk/service/app/common/relay';
            var key = config.method == 'get' ? 'params' : 'data';
            config[key] = {
                //绝对路径的话，需要根据rdk进程运行路径做调整
                service: url[0] == '/' ? '..' + url : url,
                param: config[key],
                app: 'common'
            }
        }

        return config;
    }

    function _fixUrl(url) {
        if (url.search(/\$svr/) != -1) {
            var svr = window.$svr ? window.$svr : location.pathname;
            url = url.replace(/\$svr\//, svr);
        }
        return url;
    }

    return {
        initDataSourceService: function(DSService) {
            DSService.commonAjaxConfigProcessor = commonAjaxConfigProcessor;
        }
    }
});

define(['rd.core'], function() {
    function commonAjaxConfigProcessor(config) {
        var url = _fixUrl(config.url).trim();

        if (url.match(/.js$/i)) {
            //是一个有逻辑的服务
            config.url = '/rdk/service/app/common/relay';
            var key = config.method == 'get' ? 'params' : 'data';
            var param = config[key];
            config[key] = {
                p: {
                    param: {
                        //绝对路径的话，需要根据rdk进程运行路径做调整
                        script: url[0] == '/' ? '..' + url : url,
                        param: param
                    },
                    app: 'common',
                }
            };
        } else {
            //静态无逻辑
            config.url = url;
        }

        return config;
    }

    function commonDataProcessor(data, dataSource) {
        var result;
        if (data.hasOwnProperty('result') && angular.isString(data.result)) {
            try {
                result = JSON.parse(data.result);
            } catch (e) {
                result = data.result;
            }
        } else {
            result = data;
        }
        return result;
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
            DSService.commonDataProcessor = commonDataProcessor;
        }
    }
});

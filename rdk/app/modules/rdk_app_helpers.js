define(['rd.core'], function() {

    function commonAjaxConfigProcessor(config) {
        var url = _fixUrl(config.url).trim();
        if (!_isRdkService(url)) {
            return config;
        }
        var key = config.method == 'get' ? 'params' : 'data';
        var param = config[key];
        var href = location.href;
        try {
            var app = href.match(/\/app\/(.*)\/web\//)[1];
        } catch(e) {
            app = url.match(/\.js$/i) ? url : url + '.js';
        }
        config.url = '/rdk/service/' + url;
        config[key] = {
            p: {
                param: param,
                app: app,
            }
        };
        return config;
    }

    function commonDataProcessor(data, dataSource) {
        try {
            return _isRdkService(_fixUrl(dataSource.url)) ? JSON.parse(data.result) : data;
        } catch (e) {
            return data.result;
        }
    }

    function _isRdkService(url) {
        url = url.trim();
        return url.substring(0, 4) == 'app/';
    }

    function _fixUrl(url) {
        if (url.search(/\$svr/) != -1) {
            var svr = location.href.match(/\/rdk_server\/(.*)\/web\//)[1] + "/server";
            url = url.replace(/\$svr/, svr);
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

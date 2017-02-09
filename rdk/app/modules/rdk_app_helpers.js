define(['rd.core'], function() {

    return {
        initDataSourceService: function(DSService) {
            console.warn('this helper is deprecated, try "imports.helper.v2.$init(DataSourceService);" instead');
            DSService.commonAjaxConfigProcessor = commonAjaxConfigProcessor;
            DSService.commonDataProcessor = commonDataProcessor;
        },
        v2: {
            $init: function(DSService) {
                DSService.commonAjaxConfigProcessor = commonAjaxConfigProcessorV2;
            }
        }
    }

    function commonAjaxConfigProcessorV2(config) {
        var url = _fixUrl(config.url).trim();
        config.url = '/rdk/service/' + url;
        return config;
    }

    function commonAjaxConfigProcessor(config) {
        var url = _fixUrl(config.url).trim();
        if (!_isRdkService(url)) {
            return config;
        }

        var href = location.href;
        try {
            var app = href.match(/\/app\/(.*)\/web\//)[1];
        } catch(e) {
            app = url.match(/\.js$/i) ? url : url + '.js';
        }
        config.url = '/rdk/service/' + url;

        var key = config.method == 'get' ? 'params' : 'data';
        var param = {
                param: config[key],
                app: app,
            }
        config[key] = config.method == 'get' ? { p: param } : param;
        
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
        return url.match(/^\s*app\//) || url.match(/^\s*\/rdk\/service\/app\//);
    }

    function _fixUrl(url) {
        if (url.search(/\$svr/) != -1) {
            var svr = location.href.match(/\/(rdk_server|rdk)\/(.*)\/web\//)[2] + "/server";
            url = url.replace(/\$svr/, svr);
        }
        url = url.replace(/^\s*\/rdk\/service\//, '');
        return url;
    }
});

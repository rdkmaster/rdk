define(['rd.core'], function() {

    return {
        initDataSourceService: function(DSService) {
            console.warn('this helper is deprecated, try "imports.helper.v2.$init(DataSourceService);" instead');
            DSService.commonAjaxConfigProcessor = commonAjaxConfigProcessor;
            DSService.commonDataProcessor = commonDataProcessor;
        },
        v2: {
            $init: function(DSService, supportCrossDomain) {
                DSService.commonAjaxConfigProcessor = !!supportCrossDomain ? supportCrossDomainProcessor : commonAjaxConfigProcessorV2;
            }
        }
    }

    function commonAjaxConfigProcessorV2(config) {
        var url = _fixUrl(config.url).trim();
        if (_isRdkService(url)) {
            config.url = '/rdk/service/' + url;
        }
        return config;
    }

    function supportCrossDomainProcessor(config) {
        config = commonAjaxConfigProcessorV2(config);
        if (_isCrossDomain(config.url)) {
            var url = config.url;
            config.url = '/rdk/service/app/common/relay';
            var key = config.method == 'get' ? 'params' : 'data';
            config[key] = {
                service: url, param: config[key], app: 'common', throughtRest: true
            }
        }
        return config;
    }

    function _isCrossDomain(url) {
        if (!url) {
            return false;
        }
        url = url.trim();
        if (url.match(/^(http:|https:|ftp:)?\/\/.+/i)) {
            //完整url，支持有协议和无协议的
            return true;
        }
        if (url.match(/^([a-zA-Z0-9][-a-zA-Z0-9_]{0,62}\.)?([a-zA-Z0-9][-a-zA-Z0-9_]{0,62}\.)([a-zA-Z0-9][-a-zA-Z0-9_]{0,62})(:\d{2,5})?\/.+/)) {
            // www.rdkapp.com/aa/bb 的模式
            // www.rdkapp.com:8080/aa/bb 的模式
            return true;
        }
        if (url.match(/^\/[^\/]\w+/)) {
            //绝对路径url
            return false;
        }
        return false;
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
        var param = { param: config[key], app: app };
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

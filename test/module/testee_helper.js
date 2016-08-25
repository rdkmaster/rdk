define(['rd.core'], function() {

    function commonAjaxConfigProcessor(config) {
        var url = _fixUrl(config.url).trim();
        config.url = '/rdk/service/app/common/relay';
        var key = config.method == 'get' ? 'params' : 'data';
        var param = config[key];
        config[key] = {
            p: {
                param: {
					script: url,
					param: param
				},
                app: 'common',
            }
        };
        return config;
    }

    function commonDataProcessor(data, dataSource) {
        try {
            return JSON.parse(data.result);
        } catch (e) {
            return data.result;
        }
    }

    function _fixUrl(url) {
        if (url.search(/\$svr/) != -1) {
            var svr = location.href.match(/\/test\/(.*)\/web\//)[1];
            url = url.replace(/\$svr/, '../test/' + svr + '/server');
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

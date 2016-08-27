define(['rd.core'], function() {

    function commonAjaxConfigProcessor(config) {
        if (!_isService(config.url)) {
            //请求的不是RDK的REST服务
            return config;
        }

        //请求的是RDK的REST服务
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

    function _isService(url) {
        return url.search(/\$svr/) != -1;
    }

    function _fixUrl(url) {
        var svr = location.href.match(/\/test\/(.*)\/web\//)[1];
        return url.replace(/\$svr/, '../test/' + svr + '/server');
    }

    return {
        initDataSourceService: function(DSService) {
            DSService.commonAjaxConfigProcessor = commonAjaxConfigProcessor;
            DSService.commonDataProcessor = commonDataProcessor;
        }
    }
});

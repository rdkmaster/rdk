define(['rd.core'], function() {

    function commonAjaxConfigProcessor(config) {
        var url = _fixUrl(config.url).trim();
        config.url = url;
        return config;
    }

    function _fixUrl(url) {
        if (url.search(/\$svr/) != -1) {
            var match = location.pathname.match(/^(\/.*?\/)web\//);
            return !!match ? url.replace(/\$svr\//, match[1] + 'server/') : url;
        }
        return url;
    }

    return {
        initDataSourceService: function(DSService) {
            DSService.commonAjaxConfigProcessor = commonAjaxConfigProcessor;
        }
    }
});

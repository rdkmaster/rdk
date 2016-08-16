define(['rd.core'], function() {

    function commonAjaxConfigProcessor(config) {
        var url = _fixUrl(config.url).trim();
        config.url = url;
        return config;
    }

    function _fixUrl(url) {
        if (url.search(/\$svr/) != -1) {
            var svr = location.href.match(/\/doc\/client\/demo\/(.+)\/web\//)[1] + "/server";
            url = url.replace(/\$svr/, '/doc/client/demo/' + svr);
        }
        return url;
    }

    return {
        initDataSourceService: function(DSService) {
            DSService.commonAjaxConfigProcessor = commonAjaxConfigProcessor;
        }
    }
});

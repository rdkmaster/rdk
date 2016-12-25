require({
    paths: {
        'rd.demo.Directives': '/doc/tools/doc_js/directives'
    }
});

(function() {
    var downloadDependency = [
        'rd.demo.Directives'
    ];
    var requiredComponents = [ ];
    var ctx = {};

    var controllerDefination = ['$scope', 'DataSourceService', 'EventService', main];
    function main(scope, DataSourceService, EventService) {

    };

    downloadDependency.push({ url: 'blockUI', alias: 'blockUI' });
    define(/*fix-from*/application.getDownloads(downloadDependency)/*fix-to*/, start);
    function start() {
        application.initContext(ctx, arguments, downloadDependency);
        rdk.$injectDependency(application.getComponents(requiredComponents, downloadDependency));
        rdk.$ngModule.controller('RootController', controllerDefination);
        rdk.$ngModule.config(['blockUIConfig', function(blockUIConfig) {
            blockUIConfig.template = '<div class="block-ui-message-container">'
                + application.loadingImage + '</div>';
        }]);
    };
})();
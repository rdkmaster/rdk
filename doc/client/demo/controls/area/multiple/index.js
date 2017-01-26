/*
===============================
    这些代码不重要，可无视
===============================
*/
(function() {
    var downloadDependency = [
        'base/demo',
        'rd.controls.Module'
    ];
    var requiredComponents = [ ];
    var ctx = {};
    var controllerDefination = ['$scope', 'DataSourceService', 'EventService', main];
    function main(scope, DataSourceService, EventService) {
        ctx.helper.initDataSourceService(DataSourceService);

        scope.load = function() {
            rdk.m.loadModule({}, 'demo.html');
        }

        scope.setTitle = function() {
            var dom = $("div[doc_title]");
            if (dom.length == 0) {
                return;
            }
            document.title = $(dom[0]).attr('doc_title');
        }
    };

    require.config({paths:{helper: '/doc/tools/doc_js/doc_app_helper'}});
    downloadDependency.push({ url: 'blockUI', alias: 'blockUI' });
    downloadDependency.push({ url: 'helper', alias: 'helper' });
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
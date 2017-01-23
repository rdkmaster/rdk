/*
===============================
    这些代码不重要，可无视
===============================
*/
(function() {
    var demoUrl = location.search.substring(1);
    var downloadDependency = [
        demoUrl + '/demo.js', 'rd.controls.Module'
    ];
    var requiredComponents = [ ];
    var ctx = {};
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.load = function() {
            rdk.m.loadModule({}, demoUrl + 'demo.html');
        }

        scope.setTitle = function() {
            var dom = $("div[doc_title]");
            document.title = dom.length == 0 ? demoUrl : $(dom[0]).attr('doc_title');
        }
    };

    require.config({paths:{helper: '/rdk/app/modules/rdk_app_helpers'}});
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
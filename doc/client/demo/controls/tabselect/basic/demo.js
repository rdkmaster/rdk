(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'angular', 'rd.controls.TabSelect'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'EventService','EventTypes', main];
    function main(scope, EventService,EventTypes) {
        EventService.register('tabselectData', EventTypes.RESULT, function(event, data) {
                console.log("获取了TabSelect控件的内容!");
                scope.tabselectData = data;
            });

            scope.trackItemByVal = "value";

            scope.selItems = [{
                "label": "江苏省",
                "value": "1"
            }];
    }

    var controllerName = 'DemoController';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.getDownloads(downloadDependency)/*fix-to*/, start);
    function start() {
        application.initContext(ctx, arguments, downloadDependency);
        rdk.$injectDependency(application.getComponents(requiredComponents, downloadDependency));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();
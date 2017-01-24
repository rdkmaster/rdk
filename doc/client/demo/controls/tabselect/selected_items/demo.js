(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'angular', 'rd.controls.TabSelect'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'EventService', 'EventTypes',main];
    function main(scope,EventService,EventTypes ) {
        EventService.register('tabselectData', EventTypes.RESULT, function(event, data) {
                scope.tabselectData = data;
            });

            scope.trackItemByVal = "value";

            scope.selItems = [{
                "label": "浙江省",
                "value": "2"
            }];

            scope.tabSelectChanged = function() {
                alert("捕获到childChange事件！");
            }
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
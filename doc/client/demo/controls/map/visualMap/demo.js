(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Map'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'EventService','EventTypes', main];
    function main(scope,EventService,EventTypes) {
            EventService.register('gis', 'click', function(event, data) {
                if (data.componentType == "markPoint") {
                    alert("您选择了" + data.name + "的markPoint");
                }
            });


            EventService.register('markPoint', 'result', function(event, data) {
                scope.markPointData = data;
                EventService.broadcast('gis', EventTypes.UPDATE_GRAPH);
            });

            scope.setMarkPoint = function() {
                EventService.broadcast('markPoint', EventTypes.START_QUERY);
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
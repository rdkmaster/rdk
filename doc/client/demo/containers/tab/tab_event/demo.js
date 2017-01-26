(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'angular', 'rd.containers.Tab', 'rd.controls.BasicSelector'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService','EventTypes', main];
    function main(scope,EventService,EventTypes ) {
        scope.cityItems = [{
                label: "江苏省"
            }, {
                label: "浙江省"
            }, {
                label: "河南省"
            }, {
                label: "湖北省"
            }];

            scope.selectedItems = [{
                label: "江苏省"
            }];

            EventService.register("tab1", EventTypes.CHANGE, function(event, data) {
                alert("你选择了Index为"+data+"的Tab页");
            });

            scope.rdkSelector = "Selector控件";

            setTimeout(function() {
                EventService.broadcast('tab1', EventTypes.TAB_SELECT, 2);
            }, 200);

            scope.selectedTab1 = function() {
                EventService.broadcast('tab1', EventTypes.TAB_SELECT, 1);
            }

            scope.selectedTab2 = function() {
                EventService.broadcast('tab1', EventTypes.TAB_SELECT, 2);
            }

            scope.selectedTab3 = function() {
                EventService.broadcast('tab1', EventTypes.TAB_SELECT, 3);
            }
    }

    var controllerName = 'DemoController';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.import(imports)/*fix-to*/, start);
    function start() {
        application.initImports(imports, arguments);
        rdk.$injectDependency(application.getComponents(extraModules, imports));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();
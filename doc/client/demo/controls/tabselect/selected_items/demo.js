(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.TabSelect'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService', 'EventTypes',main];
    function main(scope,EventService,EventTypes ) {
        scope.trackItemByVal = "value";
        scope.searchValue = false;
        scope.search  = function(){
            scope.searchValue = !scope.searchValue
        }
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
    define(/*fix-from*/application.import(imports)/*fix-to*/, start);
    function start() {
        application.initImports(imports, arguments);
        rdk.$injectDependency(application.getComponents(extraModules, imports));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();
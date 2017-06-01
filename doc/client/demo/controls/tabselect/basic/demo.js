(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'angular', 'rd.controls.TabSelect'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService','EventTypes', main];
    function main(scope, EventService,EventTypes) {
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
    define(/*fix-from*/application.import(imports)/*fix-to*/, start);
    function start() {
        application.initImports(imports, arguments);
        rdk.$injectDependency(application.getComponents(extraModules, imports));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();
(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.TimePane'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope ) {
        scope.weekStart = {
            value: "2015-01-01",
            selectGranularity: false,
            granularity: "date",
            weekStart :3, // 0（星期日）到6（星期六）
            customTime: [{
                label: "过去1天",
                value: "now-1d"
            }, {
                label: "过去3天",
                value: "now-3d"
            }, {
                label: "当前时间",
                value: "now"
            }]
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
(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Time','css!base/css/demo'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope','EventService','EventTypes', main];
    function main(scope) {
        scope.granularitySet = {
            value: "2015-01-01",
            granularity: "quarter", //quarter hour date week month
            minuteStep:1,
            selectGranularity:true,
            granularityItems: [
                {label: "分", value: "quarter"},
                {label: "时", value: "hour"},
                {label: "天", value: "date"},
                {label: "月", value: "month"}
            ]
        };
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
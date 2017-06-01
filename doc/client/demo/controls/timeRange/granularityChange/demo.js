(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.TimeRange'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope','EventService','EventTypes', main];
    function main(scope ,EventService,EventTypes) {
        scope.granularitySet = {
            value: "2015-01-01",
            granularity: "quarter", //quarter hour date week month
            selectGranularity:[
                {label: "分", value: "quarter"},
                {label: "时", value: "hour"},
                {label: "天", value: "date"},
                {label: "月", value: "month"}
            ]
        };
        EventService.register('rdkTimeSelectStart6', EventTypes.GRANULARITY_CHANGE, function(event, data){
            alert("粒度切换："+data.label);
        });
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
(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.TimeRange'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.showGranularity = {
            value: ['2016-03-04 14:00', '2016-03-10 16:00'],
            selectGranularity: [{
                label: "分",
                value: "quarter"
            }, {
                label: "时",
                value: "hour"
            }, {
                label: "天",
                value: "date"
            }, {
                label: "周",
                value: "week"
            },{
                label: "月",
                value: "month"
            }],
            granularity: "week"
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
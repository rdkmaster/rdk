(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Time'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main($scope) {
        $scope.showGranularity = {
        value: ['now-2h','now'],
        granularity: "quarter",
        startDate:"2016-11-01",
        endDate:"now",
        selectGranularity: true,
        granularityItems: [{
            label: "15分钟",
            value: "quarter"
        }, {
            label: "小时",
            value: "hour"
        }, {
            label: "天",
            value: "date"
        }, {
            label: "月",
            value: "month"
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
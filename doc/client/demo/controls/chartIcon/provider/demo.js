(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.ChartIcon'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.barData=[2,3,4,5,6];
        scope.pieData="35%";
        setInterval(function() {
            var random = Math.round(Math.random() * 10);
            scope.barData.shift();
            scope.barData.push(random);
            scope.pieData=Math.round(Math.random() * 100)+"%";
            scope.$apply();
        }, 1000);
    }

    rdk.$ngModule.config(['ChartIconConfigProvider',function(ChartIconConfigProvider){
        var defaultOption={
            pie:{delimiter: null, fill: ["#000", "#fff"], height: null, radius: 28, width: null},
            donut:{delimiter: null, fill: ["#ff9900", "#fff4dd", "#ffd592"], height: 56, innerRadius: null, radius: 28, width: null},
            line:{delimiter: ",", fill: "#c6d9fd", height: 56, max: null, min: 0, stroke: "#4d89f9", strokeWidth: 1, width: 84},
            bar: {delimiter: ",", fill: ["#9d89f9"], height: 56, max: null, min: 0, padding: 0.1, width: 84}
        };
        ChartIconConfigProvider.setOptions(defaultOption);
    }]);

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
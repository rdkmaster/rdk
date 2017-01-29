(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.ChartIcon'
    ];
    var extraModules = [ ];
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

        scope.pieOption= {
            delimiter: null,
            fill: ["#ff6700", "#fd3"],
            height: null,
            radius: 38,
            width: null
        }

        scope.barOption= {
            delimiter: ",",
            fill: ["#008fd4"],
            height: 42,
            max: null,
            min: 0,
            padding: .1,
            width: 62
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
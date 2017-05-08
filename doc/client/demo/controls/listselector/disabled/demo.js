(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.ListSelector'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope ) {
        scope.frozen=true;
        scope.change=function(){
            scope.disabled = !scope.disabled;
        };

        scope.selectData=[
            "All Frequency",
            "LTETDD",
            "LTEFDD",
            "[1]2120.0(100)",
            "[2]2120.0(100)",
            "[3]2120.0(100)",
            "[4]2120.0(100)",
            "[5]2120.0(100)",
            "[6]2120.0(100)",
            "[7]2120.0(100)",
            "[8]2120.0(100)",
            "[9]2120.0(100)"
        ];
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
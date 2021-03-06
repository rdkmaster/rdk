(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Graph'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope ) {
    scope.graphData = {
        rowDescriptor: ['最高气温', '最低气温'],
        header: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        data: [
            [11, 13, 15, 18, 15, 12, 10],
            [1, 4, 6, 4, 9, 6, 3]
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
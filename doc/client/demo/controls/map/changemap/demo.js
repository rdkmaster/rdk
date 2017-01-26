(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope',  main];
    function main(scope ) {
            scope.mapUrl = '/doc/client/demo/controls/map/changemap/data/sichuan.json';

            scope.mapData = [
                { "name": "四川", "url": "/doc/client/demo/controls/map/changemap/data/sichuan.json" },
                { "name": "吉林", "url": "/doc/client/demo/controls/map/changemap/data/jilin.json" }
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
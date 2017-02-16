(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'angular', 'rd.controls.TabSelect','css!base/css/demo',
        'bootstrap','bootstrap-select','css!rd.styles.Bootstrap'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService','EventTypes', main];
    function main(scope, EventService,EventTypes) {
        scope.colors = [
            {name: 'black', shade: 'dark'},
            {name: 'white', shade: 'light'},
            {name: 'red', shade: 'dark'},
            {name: 'blue', shade: 'dark'},
            {name: 'yellow', shade: 'light'}
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
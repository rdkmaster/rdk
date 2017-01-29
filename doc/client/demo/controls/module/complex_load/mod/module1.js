(function() {
    //这是本控制器的ID，非常重要，不要和已有的控制器重名
    var controllerName = 'NewModuleController1';

    //参考 main.js 中同名变量的说明
    var imports = [ ];
    var extraModules = [ ];

    var controllerDefination = ['$scope', 'DataSourceService', 'EventService', main];
    function main(scope, DataSourceService, EventService) {
        console.log('new-module1 controller is running..........');
        scope.someData = 'some data defined in the new-module1 controller...';
    }

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
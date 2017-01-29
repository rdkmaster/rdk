(function() {
    //这是本控制器的ID，非常重要，不要和已有的控制器重名
    var controllerName = 'SampleModuleController';

    //参考 main.js 中同名变量的说明
    var imports = [ ];
    var extraModules = [ ];

    var controllerDefination = ['$scope', 'DataSourceService', 'EventService', main];
    function main(scope, DataSourceService, EventService) {
        console.log('SampleModule controller is running..........');

        //只有定义在this上的方法才能发布给外部。
        this.hello = function(msg) {
            alert('hello ' + msg);
        }

        //只有定义在this上的属性才能发布给外部。
        this.someData = 'some data defined in the SampleModule controller...'
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
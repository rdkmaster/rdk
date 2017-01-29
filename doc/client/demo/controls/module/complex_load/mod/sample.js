(function() {
    //这是本控制器的ID，非常重要，不要和已有的控制器重名
    var controllerName = 'SampleModuleController';

    //参考 main.js 中同名变量的说明
    var imports = [ 'base/mod/module1', 'base/mod/module2' ];
    var extraModules = [ ];

    var controllerDefination = ['$scope', 'DataSourceService', 'EventService', main];
    function main(scope, DataSourceService, EventService) {
        console.log('SampleModule controller is running..........');
        //只有定义在this上的属性才能发布给外部。
        scope.someData = 'some data defined in the SampleModule controller...';

        //界面是的控件的初始化数据
        scope.moduleUrl = 'module1.html';
        scope.moduleCtrl = 'NewModuleController2';
        scope.initData = 'init data.......';

        scope.load = function() {
            //先销毁才能再加载
            rdk.newModule.destroyModule();
            var initData = {
                myData: scope.initData,
                controller: scope.moduleCtrl
            }
            var url = 'mod/' + scope.moduleUrl;
            rdk.newModule.loadModule(initData, url, scope.moduleCtrl);
        }
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
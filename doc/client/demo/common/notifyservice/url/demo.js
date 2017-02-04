(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.services.NotifyService', 'base/template/sample_module'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'NotifyService', main];
    function main(scope, NotifyService) {
        var moduleID;

        scope.load = function(){
            var sampleUrl = 'template/sample_module.html';
            var initData = {myData: 'load module manually...'};
            var option = {
                position: 'right',
                type: 'url',
                initData: initData
            };
            moduleID = NotifyService.notify({title: 'my first notify', message: sampleUrl}, option);
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
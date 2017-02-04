(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.services.NotifyService'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'NotifyService', main];
    function main(scope, NotifyService) {
        var moduleID;

        scope.load = function(){
            var sampleUrl = '<button>Hello, web! </button><button>Hello, rdk!</button>';
            var option = {
                position: '',
                type: 'html'
            };
            moduleID = NotifyService.notify({title: 'my notify - html', message: sampleUrl}, option);
        };

        scope.destroyHandler = function(){
            rdk[moduleID].child.destroy();
            NotifyService.removeNotify(moduleID);
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
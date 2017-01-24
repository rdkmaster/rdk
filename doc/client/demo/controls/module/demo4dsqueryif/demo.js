(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Module', 'sample_module', 'rd.controls.Table', 'rd.attributes.ds'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', main];
    function main(scope ) {
        rdk.$injectDependency(['rd.controls.Module', 'rd.controls.Table', 'rd.attributes.ds']);

        // 创建主控制器，主控制器所有所有子控制器的共同祖先。
        // 子控制器可以直接访问这个控制器中的方法和属性
        rdk.$ngModule.controller('rdk_ctrl', ['$scope', 'EventService', function(scope, EventService) {
        //按需加载
        scope.load = function() {        
            rdk.mymodule.loadModule({myData: 'load module manually...'});
        }

        scope.destroy = function() {
            rdk.mymodule.destroyModule();
        }

        scope.moduleDestroy = function() {
            alert('The module is destoryed!');
        }
    }

    var controllerName = 'DemoController';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.getDownloads(downloadDependency)/*fix-to*/, start);
    function start() {
        application.initContext(ctx, arguments, downloadDependency);
        rdk.$injectDependency(application.getComponents(requiredComponents, downloadDependency));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();
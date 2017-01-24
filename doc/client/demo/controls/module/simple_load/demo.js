(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Module', 'sample_module'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', main];
    function main(scope ) {
        rdk.$injectDependency(['rd.controls.Module']);

    // 创建主控制器，主控制器所有所有子控制器的共同祖先。
    // 子控制器可以直接访问这个控制器中的方法和属性
    rdk.$ngModule.controller('rdk_ctrl', ['$scope', function(scope) {
        //按需加载
        scope.load = function() {
            //mymodule是rdk_module节点的id属性值。
            //传递给loadModule函数的第一个参数是该模块的initData，
            //这个对象中的所有属性都会被拷贝到新模块的控制器作用域中
            //如果新模块未定义任何控制器，则initData将被无视。
            rdk.mymodule.loadModule({myData: 'load module manually...'});
        }

        scope.destroy = function() {
            rdk.mymodule.destroyModule();
        }

        scope.moduleReady = function() {
            alert('The module is ready!');
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
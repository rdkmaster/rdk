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
        // 注意到module2在定义的时候，没有给initData属性，因此module2在访问data属性的时候，
        // 实际上是使用了这里的data属性。这是因为这个data属性被定义在所有module的父控制器中。
        // 相反的，module1由于通过initData自定义了一个data属性，RDK会优先读取自子控制器中的
        // data属性的值。
        // 这个过程和OOP的继承非常类似。
        scope.data = 'defined in the root controller';

        scope.hello = function() {
            //访问SampleModule中的数据。
            //每个模块都有一个child属性，值是当前模块所绑定的控制器一个实例。
            //如果当前模块未绑定控制器，则child属性的值为null
            console.log(rdk.module1.child.someData);

            //调用SampleModule中的方法
            rdk.module1.child.hello('module1');
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
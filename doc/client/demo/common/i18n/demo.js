(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        { url: 'base/i18n', alias: 'i18n' }
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', main];
    function main(scope) {
        ctx.i18n.$init(scope);
        scope.time = new Date();

        //js中获取时间
        var curTime = ctx.i18n.time.st(scope.time);
        setTimeout(function() {
            alert('在JS中使用国际化\n\n' + curTime);
        }, 0);
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
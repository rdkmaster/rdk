(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.ProgressBar'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope','ProgressbarFactory', main];
    function main(scope,ProgressbarFactory ) {
        scope.progressbar = ProgressbarFactory.createInstance();

        scope.start = function(){
            scope.progressbar.start();
        }

        scope.stop = function(){
            scope.progressbar.complete();
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
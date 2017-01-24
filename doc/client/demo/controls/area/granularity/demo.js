(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'application','rd.controls.AreaSelect', 'rd.controls.ComboSelect'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope',  main];
    function main(scope ) {
        scope.setting={
            defaultData:{
                province:{name:"广东",code:"1"},
                city:{name:"深圳",code:"2"},
                area:{name:"南山区",code:"3"}
            },
            showAll:false
        };
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
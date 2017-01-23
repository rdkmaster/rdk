(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'application','rd.controls.AreaSelect', 'rd.controls.ComboSelect'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope',  main];
    function main(scope ) {
scope.change=function(){
            //其它操作更新地区数据

            scope.test={
                province:{name:"广东",code:"1"},
                city:{name:"深圳",code:"2"},
                area:{name:"南山区",code:"3"}
            };

            rdk.areaID.updateAreaData(scope.test);

        };
        //默认的地区数据
        scope.test={
            province:{name:"四川",code:"1"},
            city:{name:"成都",code:"2"},
            area:{name:"金牛区",code:"3"}
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
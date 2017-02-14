(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Time',
        'rd.controls.TimeSelect'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope ) {
        scope.setting = {
            value: '2017-02-9 13:30',
            granularity: "quarter",
            weekStart:"0",          //属性，周开始设置，类型0~6数字。默认值是0
            startDate:"2017-01-1 13:30", //可选的开始时间，类型字符串/Date对象
            endDate:"now"  //可选的结束时间，类型字符串/Date对象
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
(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.ComboSelect','rd.controls.TimeSelect', 'rd.attributes.theme',
        'rd.controls.Icon','css!base/css/demo'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService','EventTypes','$timeout', main];
    function main(scope,EventService,EventTypes,$timeout) {
        <!-- 导航主题二(软银) -->
        //时间配置
        scope.granularitySet={
            value: 'now',
            granularity: "date",
            selectGranularity:true,
            startDate:"2016-01-1 13:30", //可选的开始时间，类型字符串/Date对象
            //endDate:"now"  //可选的结束时间，类型字符串/Date对象
        };
        $timeout(function(){
            EventService.broadcast('comboID', EventTypes.CHANGE, scope.granularitySet.value);
        },0);
        EventService.register('selectorID', EventTypes.CHANGE, function(event, data){
            scope.comboOpenStatus=false;
            EventService.broadcast('comboID', EventTypes.CHANGE, data);
        });
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
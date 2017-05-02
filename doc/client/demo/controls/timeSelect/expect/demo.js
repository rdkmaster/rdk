(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.ComboSelect','rd.controls.TimeSelect','css!base/css/time-select'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService','EventTypes', main];
    function main(scope,EventService,EventTypes ) {
        //时间配置
        scope.granularitySet={
            value: '2017-02-1',
            granularity: "date",
            selectGranularity:true,
            startDate:"2016-01-1 13:30", //可选的开始时间，类型字符串/Date对象
            endDate:"now+20d",  //可选的结束时间，类型字符串/Date对象
            //expectSelectedDate:[
            //    {
            //        year:'2016',
            //        expectStartDate:{month:'3','day':"5"},
            //        expectEndDate:{month:'3','day':"27"}
            //    },
            //    {
            //        year:'2017',
            //        expectStartDate:{month:'2','day':"14"},
            //        expectEndDate:{month:'3','day':"4"}
            //    }
            //],
            expectSelectedDate:["now","now+10d"]

        };

        EventService.register('timeID', EventTypes.CHANGE, function(event, data){
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
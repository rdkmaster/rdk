(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Graph','css!base/style'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService', main];
    function main(scope, EventService) {
        var option;
        EventService.register('pie', 'graph_update', function(event,data){
           option=data.option;
            rdk.pie.chart.on('click', function (params) {
                for(var i=0;i<option.series[0].data.length;i++){
                    option.series[0].data[i].itemStyle.normal.shadowColor = i==params.dataIndex?option.series[0].data[i].itemStyle.normal.color:null;
                    option.series[0].data[i].itemStyle.normal.shadowBlur = i==params.dataIndex?12.5:0;
                    option.series[0].data[i].selected = i==params.dataIndex?true:false
                }
                rdk.pie.chart.setOption(option)
            })
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
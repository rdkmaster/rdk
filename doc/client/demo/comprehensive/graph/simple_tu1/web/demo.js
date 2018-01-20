(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Graph'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope','EventService', main];
    function main(scope,EventService) {

        EventService.register('line', 'graph_update', function(event,data){
            //如果设置延迟，在离开echart图时关闭tooltip  注意： 定时器的延迟时间一定要大于 tooltip 的延迟时间
            $(document).on('mouseout','#line',function(){
                setTimeout(function(){
                    rdk.line.chart.dispatchAction({
                        type: 'hideTip'
                    })
                },200)
            })
        })
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
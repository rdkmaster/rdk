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
        });

        scope.clickNumber=null;
        scope.showNumber=0;
        scope.showDetail = false;
        EventService.register('pie', 'click', function(event,data){
            scope.showNumber=data.dataIndex;
            scope.clickNumber=null;
            scope.showDetail = data.name=="其它问题";
            if(scope.showDetail){
                scope.clickNumber=0;
                scope.showNumber=null;
            }

            if(data.data.selected=false){
                option.series.selectedMode="";
            }
        });
        scope.numClick=function($event){
            scope.clickNumber=$event.target.getAttribute('data');
            console.log( scope.clickNumber )
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
(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Module','base/template/cellproblems','base/template/statistic','css!base/css/custom', 'rd.controls.Icon'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService', main];
    function main(scope,EventService) {
            /******************************************************
                 将应用的代码逻辑添加在这个匿名函数内部
            ******************************************************/
        function visualizationTableSize(){
            var visualizationTableHeight = $('.visualizationTable').height();
            var sidebarBtnHeight = $('.sidebarBtn').height();
            console.log(visualizationTableHeight)
            $('.sidebarBtn').css({
                "top":(visualizationTableHeight-sidebarBtnHeight)/2+'px',
            });
        }
        $(window).resize(function() {          //当浏览器大小变化时
            visualizationTableSize()
        });
        scope.iconCondition=true;
        var visualizationTableWidth = $('.visualizationTable').width();
        scope.sideBarBtn = function(){
            scope.iconCondition = !scope.iconCondition
            if(scope.iconCondition){
                $('.visualizationTable').css('left',0)
            }else{
                $('.visualizationTable').css('left','-'+visualizationTableWidth+'px')
            }
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
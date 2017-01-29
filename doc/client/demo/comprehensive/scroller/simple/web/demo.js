(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Scroller', 'css!base/css/custom'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.clickItem = function(item){
            console.log(item);
            scope.selectedItem = item;
            for (var i = 0; i < scope.dsScroller.length; i++) {
                if(scope.dsScroller[i].title == scope.selectedItem.title){
                    scope.dsScroller[i].selected = "1"
                }else{
                    scope.dsScroller[i].selected = "0"
                }
            };
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
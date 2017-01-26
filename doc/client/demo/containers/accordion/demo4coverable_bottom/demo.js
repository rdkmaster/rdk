(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'angular', 'rd.containers.Accordion', 'rd.controls.BasicSelector'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.cityItems = [{
            id: 0,
            label: "江苏省"
        }, 
        {
            id: 1,
            label: "浙江省"
        }, 
        {
            id: 2,
            label: "河南省"
        }, 
        {
            id: 3,
            label: "湖北省"
        },{
            id: 4,
            label: "新疆省"
        }, 
        {
            id: 5,
            label: "江西省"
        }, 
        {
            id: 6,
            label: "河北省"
        }, 
        {
            id: 7,
            label: "湖南省"
        }];

        scope.localOpen = true;

        scope.close = function(){
            scope.localOpen = false;
        }

        scope.open = function(){
            scope.localOpen = true;
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
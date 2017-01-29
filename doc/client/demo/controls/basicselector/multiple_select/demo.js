(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.BasicSelector'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope',  main];
    function main(scope ) {
        scope.allItems = [
            { label: "江苏省" }, { label: "浙江省" }, { label: "广东省" },
            { label: "广西省" }, { label: "河北省" }, { label: "河南省" },
            { label: "湖北省" }, { label: "湖南省" }, { label: "新疆省" }
        ];

        scope.selectedItems = [
            { label: "广西省" }, { label: "湖南省" }, { label: "河北省" }
        ];

        scope.isMult = true;

        scope.changMultipleSelect = function() {
            scope.isMult = !scope.isMult;
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
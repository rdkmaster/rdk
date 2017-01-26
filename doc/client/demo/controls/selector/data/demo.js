(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Selector'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope','$timeout',main];
    function main(scope,timeout) {
        scope.groupData = {
            "title1": [{ id: 0, label: "江苏省" }, { id: 1, label: "浙江省" }],
            "title2": [{ id: 2, label: "广东省" }, { id: 3, label: "广西省" }, 
                       { id: 4, label: "河北省" }, { id: 5, label: "河南省" }]
        };

        scope.groupSelectedItems = {
            "title1": [{ id: 0, label: "江苏省" }, { id: 1, label: "浙江省" }],
            "title2": [{ id: 2, label: "广东省" }]
        };

        timeout(function() {
            scope.groupData = {
                "title1": [{ id: 0, label: "江苏省" }, { id: 1, label: "浙江省" }],
                "title2": [{ id: 2, label: "广东省" }, { id: 3, label: "广西省" }]
            };
        }, 3000);
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
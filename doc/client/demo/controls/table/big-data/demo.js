(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Table'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope',main];
    function main($scope) {
        $scope.setting = {
            "columnDefs" :[
                {
                    targets : 0,
                    sortas: "", // 空字符串表示由系统自动判定作为数字排序还是作为字符串排序
                    sortable: true
                }, {
                    targets : 1,
                    sortable: true,
                    sortas: "",
                }, {
                    targets : 2,
                    sortas: "",
                    sortable: true
                }, {
                    targets : 3,
                    sortas: "",
                    sortable: true
                }, {
                    targets : 4,
                    sortas: "",
                    sortable: true
                }, {
                    targets : 5,
                    sortas: "",
                    sortable: true
                }, {
                    targets : 6,
                    sortas: "",
                    sortable: true
                }

            ]
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
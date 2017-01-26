(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Tree'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main($scope ) {
        $scope.treeData = [{
            node: [{
                key: "specialtopic",
                label: "专题",
                open: true,
                icon: "/doc/client/demo/controls/tree/img/u199.png",
            }, {
                node: [],
                key: "specialtopic",
                label: "总览",
                icon: "/doc/client/demo/controls/tree/img/u199.png"
            }],
            key: "e2e",
            label: "端到端定界定位",
            open: true,
            icon: "/doc/client/demo/controls/tree/img/u1110.png",
        }, {
            node: [{
                key: "monitoring",
                label: "监控",
                open: true,
                icon: "/doc/client/demo/controls/tree/img/u199.png",
            }, {
                node: [],
                key: "reasonconfig",
                label: "原因配置",
                icon: "/doc/client/demo/controls/tree/img/u199.png",
            }],
            key: "realtimeMonitor",
            label: "实时监控",
            icon: "/doc/client/demo/controls/tree/img/u1110.png",
        }];
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
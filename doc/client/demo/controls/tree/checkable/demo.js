(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Tree'
    ];
    var requiredComponents = [ ], ctx = {};
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
    define(/*fix-from*/application.getDownloads(downloadDependency)/*fix-to*/, start);
    function start() {
        application.initContext(ctx, arguments, downloadDependency);
        rdk.$injectDependency(application.getComponents(requiredComponents, downloadDependency));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();
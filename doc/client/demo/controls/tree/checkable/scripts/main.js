define('main', ['rd.controls.Tree'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Tree']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function($scope) {
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
    }]);
});

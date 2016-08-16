define('main', ['rd.controls.Tree'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Tree', 'rd.core']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function($scope) {
        $scope.doubleClickHandler = function(event, treeNode) {
            alert("双击选中：" + treeNode.label);
        };

    }]);
});

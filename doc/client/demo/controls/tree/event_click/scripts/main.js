define('main', ['rd.controls.Tree'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Tree', 'rd.core']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope','EventService','EventTypes', function($scope, EventService, EventTypes ) {
        $scope.clickHandler = function(event,treeId,treeNode) {
            alert("单击选中：" + treeNode.label);
        };
        //也可以直接监听
        // EventService.register('testZtree', EventTypes.CLICK, function(event, data){
        //     console.log(data);
        // });

    }]);
});

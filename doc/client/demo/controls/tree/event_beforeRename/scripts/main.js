define('main', ['rd.controls.Tree'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Tree','rd.core']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', function($scope, EventService, EventTypes) {

        $scope.reFun=function(event, treeNode) {
            if (treeNode.newName != 'rdk is great') {
                alert("只能改为：rdk is great");
                return false;
            } else {
                return true;
            }
        }
        //也可以直接监听
        // EventService.register('testZtree', EventTypes.BEFORE_RENAME, function(event, data){
        //     console.log(data);
        // });

    }]);
});

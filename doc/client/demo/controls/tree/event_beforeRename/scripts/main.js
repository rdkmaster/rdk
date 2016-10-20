define('main', ['rd.controls.Tree'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Tree','rd.core']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', function($scope, EventService, EventTypes) {

        $scope.reFun=function(treeId, treeNode, newName, isCancel){
        	if (newName.length == 0) {  
                alert("节点名称不能为空.");  
                return false;  
            }
            return true;
        }

    }]);
});

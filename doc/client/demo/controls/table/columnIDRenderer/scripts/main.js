define('main', ['rd.controls.Table', 'rd.services.Alert'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Table', 'rd.core', 'rd.services.Alert']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', 'Alert', function($scope, EventService, EventTypes, Alert) {

        $scope.setting = {
            "columnDefs" :[
                {
                    title : "编辑列",
                    render : '<a ng-click="appScope.click(item)" href="javascript:void(0)">点击</a>'
                },{
                    title : "编号",
                    targets : 0,
                    override : false,
                    render : function(rowData){
                        $scope.idNum =  rowData.$index +1;
                        return $scope.idNum;
                    }
                }
            ]
        }

        $scope.click = function(item) {
            //弹出选择栏，重填value
            Alert.scope = $scope;
            Alert.confirm("自定义editorRenderer，弹出演示", "提示框");
        }


    }]);
});

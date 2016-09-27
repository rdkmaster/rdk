define('main', ['rd.controls.Table', 'rd.services.Alert'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Table', 'rd.core', 'rd.services.Alert']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', 'Alert', function($scope, EventService, EventTypes, Alert) {

        $scope.checkable = {};

        $scope.setting = {
            "columnDefs": [{
                    targets: 0,
                    override : false,
                    render: '<input type="checkbox" ng-model="appScope.checkable[item.$index]"></input>'
                }, {
                    targets: 2,
                    editable: true,
                    editorRenderer: '<a style="cursor:pointer" ng-click="appScope.click(item)">{{item.salary}}</a>'
                }

            ]
        }

        EventService.register('table', EventTypes.PAGING_DATA_CHANGE, function(event, data) {
            for (var i = 0; i < data.length; i++) {
                $scope.checkable[data[i].$index] = false;
            };
        });

        $scope.click = function(item) {
            //弹出选择栏，重填value
            Alert.scope = $scope;
            Alert.confirm("自定义editorRenderer，弹出演示", "提示框");
        }

        $scope.select_all = function() {
            for (key in $scope.checkable){
                $scope.checkable[key] = $scope.selectAll;
            }
        }

    }]);
});

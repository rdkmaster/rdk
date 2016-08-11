define('main', ['rd.controls.Table', 'rd.services.Alert'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Table', 'rd.core', 'rd.services.Alert']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', 'Alert', function($scope, EventService, EventTypes, Alert) {

        $scope.setting = {
            "columnDefs": [{
                    targets: 0,
                    override : false,
                    render: '<input type="checkbox" id="ckb1" ></input>'
                }, {
                    targets: 2,
                    editable: true,
                    editorRenderer: '<a style="cursor:pointer" ng-click="appScope.click(item)">{{item.salary}}</a>'
                }

            ]
        }

        EventService.register('testID', EventTypes.CHANGE, function(event, data) {
            console.log(data);
        });

        $scope.click = function(item) {
            //弹出选择栏，重填value
            Alert.scope = $scope;
            Alert.confirm("自定义editorRenderer，弹出演示", "提示框");
        }

        $scope.select_all = function() {
            var inputs = document.getElementsByTagName("input");
            for (var i = 1; i < inputs.length; i++) {
                if (inputs[i].getAttribute("type") == "checkbox") {
                    inputs[i].checked = !inputs[i].checked;
                }
            }
        }

    }]);
});

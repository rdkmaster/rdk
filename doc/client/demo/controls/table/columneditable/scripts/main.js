define('main', ['rd.controls.Table'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Table','rd.core']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService','EventTypes',function($scope, EventService, EventTypes) {
        
        $scope.data = {};
        $scope.data.header = ["姓名", "职位", "薪资", "入职日期", "部门", "其他"];
        $scope.data.field = ["name", "position", "salary", "start_date", "office", "extn"];
        $scope.data.data = [
            [
                "Tiger Nixon",
                "System Architect",
                "$320,800",
                "2011/04/25",
                "Edinburgh",
                "5421"
            ],
            [
                "Garrett Winters",
                "Accountant",
                "$170,750",
                "2011/07/25",
                "Tokyo",
                "8422"
            ]
        ];

        $scope.setting = {
            "columnDefs" :[
                {
                    targets : 0,
                    editable : true
                },
                {
                    targets : 2,
                    editable : true
                }

            ]
        }

        EventService.register('testID', EventTypes.CHANGE, function(event, data){
            if($scope.data.data[data.rowIndex][data.columnIndex] == data.oldValue){
                $scope.data.data[data.rowIndex][data.columnIndex] = data.newValue;
            }
            
        });
        
    }]);
});

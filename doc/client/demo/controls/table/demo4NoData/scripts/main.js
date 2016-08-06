define('main', ['rd.controls.Table'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Table','rd.core']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', '$timeout', function($scope, $timeout) {
        
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

        $timeout(function() {

          $scope.data.header = [];//["姓名", "职位", "薪资", "入职日期", "部门", "其他"];
          $scope.data.field = ["name", "position", "salary", "start_date", "office", "extn"];
          $scope.data.data = [
          ];
        }, 1000);

    }]);
});

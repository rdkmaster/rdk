define('main', ['rd.controls.Time'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Time']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function($scope) {
        $scope.limitValue = {
            value : "2015-01-01",
            startDate:"2015-01-01",
            endDate:"2015-01-09"
        }
    }]);
});

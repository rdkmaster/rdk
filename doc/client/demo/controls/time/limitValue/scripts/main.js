define('main', ['rd.controls.Time'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Time']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function(scope) {
        scope.limitValue = {
            value: "now-3d",
            startDate: "now-10d",
            endDate: "now-1d"
        }
    }]);
});
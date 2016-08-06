define('main', ['rd.controls.Bullet'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Bullet']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function($scope) {
        $scope.inputScales = [ 20, 40, 68, 89 ];
    }]);
});

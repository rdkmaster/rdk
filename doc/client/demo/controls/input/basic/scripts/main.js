define('main', ['rd.controls.Input'], function() {

// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.controls.Input']);
// 创建一个控制器
app.controller('myCtrl', ['$scope', '$timeout', function(scope, $timeout) {
    scope.age = 11;
}

]);
});

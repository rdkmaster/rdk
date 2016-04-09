define('main', ['rd.controls.Selector'], function() {
// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.controls.Selector']);
// 创建一个控制器
app.controller('rdk_ctrl', ['$scope', function(scope) {
/******************************************************
 将应用的代码逻辑添加在这个匿名函数内部
******************************************************/
    
    scope.hasErr = false

}]);
});
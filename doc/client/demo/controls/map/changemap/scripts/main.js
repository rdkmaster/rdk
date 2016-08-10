define('main', ['rd.controls.Map'], function() {

// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.controls.Map']);
// 创建一个控制器
app.controller('myCtrl', ['$scope', function(scope) {
/******************************************************
     将应用的代码逻辑添加在这个匿名函数内部
******************************************************/
    scope.mapUrl = '/doc/client/demo/controls/map/changemap/data/sichuan.json';

    scope.mapData = [
        {"name":"四川","url":"/doc/client/demo/controls/map/changemap/data/sichuan.json"},
        {"name":"吉林","url":"/doc/client/demo/controls/map/changemap/data/jilin.json"}
    ]; 
}

]);
});

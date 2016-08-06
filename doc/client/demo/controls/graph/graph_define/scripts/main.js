define('main', ['rd.controls.Graph'], function() {

// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.controls.Graph']);
// 创建一个控制器
app.controller('myCtrl', ['$scope','EventService', function(scope, EventService) {
/******************************************************
     将应用的代码逻辑添加在这个匿名函数内部
******************************************************/
    scope.graphData = {
        rowDescriptor: [],
        header: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [10, 52, 200, 334, 390, 330, 220]
    };
    
}

]);
});

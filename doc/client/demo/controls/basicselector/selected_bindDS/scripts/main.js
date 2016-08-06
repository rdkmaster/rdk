
define('main', ['rd.controls.BasicSelector'], function() {

// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.controls.BasicSelector']);
// 创建一个控制器
 app.controller('myCtrl', ['$scope', 'DataSourceService','EventService', 'EventTypes', 'Utils',
        function(scope, DSService,EventService, EventTypes, Utils) {
/******************************************************
     将应用的代码逻辑添加在这个匿名函数内部
******************************************************/
	//no code here...
}

]);
});

define('main', ['application', 'rd.controls.Graph'], function(application) {

// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.controls.Graph']);
// 创建一个控制器
app.controller('rdk_ctrl', ['$scope', 'DataSourceService', function(scope, DataSourceService) {
application.initDataSourceService(DataSourceService);
/******************************************************
     将应用的代码逻辑添加在这个匿名函数内部
******************************************************/
}

]);
});

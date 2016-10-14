define('main', ['application','rd.controls.AreaSelect', 'rd.controls.ComboSelect'], function (application) {
// 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.AreaSelect', 'rd.controls.ComboSelect']);
// 创建一个控制器
    app.controller('myCtrl', ['$scope', 'DataSourceService', function (scope,DataSourceService) {
        /************************ panel demo test data start ************************/
        application.initDataSourceService(DataSourceService);
        scope.callBackAlert = function(){
            alert(scope.resultObj);
        }
    }]);

});


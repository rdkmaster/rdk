define('main', ['application','rd.controls.ChartIcon'], function (application) {
// 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.ChartIcon']);
// 创建一个控制器
    app.controller('myCtrl', ['$scope', 'DataSourceService', function (scope,DataSourceService) {
        /************************ panel demo test data start ************************/
        application.initDataSourceService(DataSourceService);

    }]);

});


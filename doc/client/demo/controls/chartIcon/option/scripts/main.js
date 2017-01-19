define('main', ['application','rd.controls.ChartIcon'], function (application) {
// 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.ChartIcon']);
// 创建一个控制器
    app.controller('myCtrl', ['$scope', 'DataSourceService', function (scope,DataSourceService) {
        /************************ panel demo test data start ************************/
        application.initDataSourceService(DataSourceService);
        scope.barData=[2,3,4,5,6];
        scope.pieData="35%";
        setInterval(function() {
            var random = Math.round(Math.random() * 10);
            scope.barData.shift();
            scope.barData.push(random);
            scope.pieData=Math.round(Math.random() * 100)+"%";
            scope.$apply();
        }, 1000);

        scope.pieOption= {
            delimiter: null,
            fill: ["#ff6700", "#fd3"],
            height: null,
            radius: 38,
            width: null
        }

        scope.barOption= {
            delimiter: ",",
            fill: ["#008fd4"],
            height: 42,
            max: null,
            min: 0,
            padding: .1,
            width: 62
        }
    }]);

});


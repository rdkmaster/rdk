define('main', ['application','rd.controls.ChartIcon'], function (application) {
// 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.ChartIcon']);
// 创建一个控制器
    app.config(['ChartIconConfigProvider',function(ChartIconConfigProvider){
        var defaultOption={
            pie:{delimiter: null, fill: ["#000", "#fff"], height: null, radius: 28, width: null},
            donut:{delimiter: null, fill: ["#ff9900", "#fff4dd", "#ffd592"], height: 56, innerRadius: null, radius: 28, width: null},
            line:{delimiter: ",", fill: "#c6d9fd", height: 56, max: null, min: 0, stroke: "#4d89f9", strokeWidth: 1, width: 84},
            bar: {delimiter: ",", fill: ["#9d89f9"], height: 56, max: null, min: 0, padding: 0.1, width: 84}
        };
        ChartIconConfigProvider.setOptions(defaultOption);
    }])
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
    }]);

});


define('main', ['application','rd.controls.AreaSelect','rd.controls.Time', 'rd.controls.ComboSelect', 'rd.controls.BasicSelector'], function (application) {
// 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.AreaSelect','rd.controls.Time', 'rd.controls.ComboSelect', 'rd.controls.BasicSelector']);
// 创建一个控制器
    app.controller('rdk_ctrl', ['$scope', 'DataSourceService', 'EventService', 'EventTypes', function (scope, DataSourceService,EventService, EventTypes,$timeout) {
        application.initDataSourceService(DataSourceService);
        /************************ panel demo test data start ************************/
        scope.setting={
            defaultData:{
                province:{name:"四川",code:"1"},
                city:{name:"成都",code:"2"},
                area:{name:"金牛区",code:"3"}
            },
            disabled:true
        };
    }]);

});


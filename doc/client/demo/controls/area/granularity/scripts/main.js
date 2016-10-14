define('main', ['application','rd.controls.AreaSelect', 'rd.controls.ComboSelect'], function (application) {
// 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.AreaSelect', 'rd.controls.ComboSelect']);
// 创建一个控制器
    app.controller('myCtrl', ['$scope', 'DataSourceService', function (scope,DataSourceService) {
        /************************ panel demo test data start ************************/
        application.initDataSourceService(DataSourceService);
        scope.setting={
            defaultData:{
                province:{name:"广东",code:"1"},
                city:{name:"深圳",code:"2"},
                area:{name:"南山区",code:"3"}
            },
            isAll:false
        };

    }]);

});


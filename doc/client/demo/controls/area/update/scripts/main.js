define('main', ['application','rd.controls.AreaSelect', 'rd.controls.ComboSelect'], function (application) {
// 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.AreaSelect', 'rd.controls.ComboSelect']);
// 创建一个控制器
    app.controller('myCtrl', ['$scope', 'DataSourceService','EventService','EventTypes', function (scope,DataSourceService,EventService,EventTypes) {
        /************************ panel demo test data start ************************/
        application.initDataSourceService(DataSourceService);
        scope.change=function(){
            //其它操作更新地区数据
            scope.test={
                province:{name:"广东",code:"1"},
                city:{name:"深圳",code:"2"},
                area:{name:"南山区",code:"3"}
            };
            EventService.broadcast('areaID', EventTypes.UPDATE_RESULT,scope.test);
        };
        //默认的地区数据
        scope.test={
            province:{name:"四川",code:"1"},
            city:{name:"成都",code:"2"},
            area:{name:"金牛区",code:"3"}
        };
    }]);

});
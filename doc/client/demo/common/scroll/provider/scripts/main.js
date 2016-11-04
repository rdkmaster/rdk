define('main', ['application','rd.attributes.Scroll'], function (application) {
// 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.attributes.Scroll']);
// 创建一个控制器
    app.config(['ScrollConfigProvider',function(ScrollConfigProvider){
        ScrollConfigProvider.setOptions(
            {
                wheelSpeed:0.5, //鼠标滚轮移动滚动条的速度
                minScrollbarLength:100, //滚动条最小长度
                maxScrollbarLength:280, //滚动条最大长度
                theme:"test" //主题
            }
        );
    }])
    app.controller('myCtrl', ['$scope', 'DataSourceService', function (scope,DataSourceService) {
        /************************ panel demo test data start ************************/
        application.initDataSourceService(DataSourceService);

    }]);

});


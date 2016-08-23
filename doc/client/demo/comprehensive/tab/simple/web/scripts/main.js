define('main', ['application', 'rd.containers.Tab', 'rd.controls.SingleIndicator'], function(application) {

    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.containers.Tab', 'rd.controls.SingleIndicator']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'DataSourceService', 'EventService', 'EventTypes', function(scope, DataSourceService, EventService, EventTypes) {
            application.initDataSourceService(DataSourceService);
            /******************************************************
                 将应用的代码逻辑添加在这个匿名函数内部
            ******************************************************/
            scope.datas = [
                { "label": "终端", "value": 10, "icon": "fa fa-mobile fa-4x", "point_to": "bottom" },
                { "label": "无线", "value": 10, "icon": "fa fa-wifi fa-3x", "point_to": "right" }
            ];
            //no code here
            EventService.register("tabid", EventTypes.CHANGE, function(event, data) {
                var selectedIndex = data;
                for (var i = 0; i < scope.datas.length; i++) {
                    if (i == selectedIndex) {
                        scope.datas[i].point_to = "bottom";
                    } else {
                        scope.datas[i].point_to = "right";
                    }
                };
            });
        }

    ]);
});

define('main', ['application','rd.services.EventService', 'rd.services.Utils','rd.containers.Tab'], function(application, EventService,Utils) {

// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.containers.Tab','rd.services.Utils']);
// 创建一个控制器
app.controller('myCtrl', ['$scope', '$timeout','DataSourceService', 'EventService', function(scope, $timeout,DataSourceService, EventService) {
    application.initDataSourceService(DataSourceService);
            /******************************************************
                 将应用的代码逻辑添加在这个匿名函数内部
            ******************************************************/
            EventService.register('my_ds', 'result', function(event,data) {           
                var user_data=data.data;
                for(var i=0;i<user_data.length;i++){
                    for(var j=0;j<user_data[i].length;j++){
                        var param='value'+(i+1)+j;
                        scope[param]=user_data[i][j];
                    }
                }
            }) 
        }

    ]);
});

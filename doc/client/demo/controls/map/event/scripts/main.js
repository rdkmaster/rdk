define('main', ['rd.controls.Map'], function() {

    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Map']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService', function(scope, EventService) {
            /******************************************************
                 将应用的代码逻辑添加在这个匿名函数内部
            ******************************************************/


            EventService.register('gis', 'click', function(event, data) {
                alert("您选择了" + data.name);
            });


        }

    ]);
});

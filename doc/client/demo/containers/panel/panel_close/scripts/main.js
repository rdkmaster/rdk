define('main', ['rd.containers.Panel', 'rd.controls.Time', 'rd.containers.Accordion'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.containers.Panel', 'rd.controls.Time', 'rd.containers.Accordion']);
    // 创建一个控制器
    app.controller('rdk_ctrl', ['$scope', 'EventService', 'EventTypes', function(scope, EventService, EventTypes) {
       scope.closeEvent=function(){
       		alert("do something before close");
            EventService.broadcast('panel_close', EventTypes.CLOSE);
       }

    }]);
});

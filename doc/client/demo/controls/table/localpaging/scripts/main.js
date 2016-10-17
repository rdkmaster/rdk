define('main', ['rd.controls.Table'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Table','rd.core']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', function($scope, EventService, EventTypes) {
        EventService.register('table', EventTypes.CHECK, function(event, data){
            var selectedData = data.data;
        });        
    }]);
});

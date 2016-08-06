define('main', [
    'rd.services.DataSourceService', 'rd.services.EventService',
    'rd.services.Utils', 'rd.attributes.ds',
], function() {

// 创建一个RDK的应用
var app = angular.module("rdk_app", [
    'rd.services.DataSourceService', 'rd.services.EventService',
    'rd.services.Utils', 'rd.attributes.ds',
]);
// 创建一个控制器
app.controller('rdk_ctrl', ['$scope', 'EventService', function(scope, EventService) {
/******************************************************
     将应用的代码逻辑添加在这个匿名函数内部
******************************************************/


    EventService.register('disp1', 'type1', callback);
    EventService.register('disp2', 'type2', callback);
    EventService.register('disp3', 'type3', callback);

    var events = [
        {dispatcher: 'disp1', type: 'type1'}, 
        {dispatcher: 'disp2', type: 'type2'}, 
        {dispatcher: 'disp3', type: 'type3'}];
    EventService.onEvents(events, function() {
        alert('onEvents成功！');
    });

    
    scope.shownEvents = {
        type1: false, type2: false, type3: false
    }

    function callback(event, data) {
        scope.shownEvents[event.name] = true;
    }

    scope.broadcast = function(dispatcher, type) {
        EventService.broadcast(dispatcher, type, null);
    }
}

]);
});

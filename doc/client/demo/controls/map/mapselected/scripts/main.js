define('main', ['rd.controls.Map','rd.attributes.modal'], function() {

// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.controls.Map','rd.attributes.modal']);
// 创建一个控制器
app.controller('myCtrl', ['$scope','EventService','EventTypes', function(scope, EventService,EventTypes) {
/******************************************************
     将应用的代码逻辑添加在这个匿名函数内部
******************************************************/
    
     
     EventService.register('gis','click',function(event, data){
     	scope.name =  data.name;
     });

     EventService.register('gis','mapselected',function(event, data){
        scope.name =  data.name;
        scope.setmodal('gisModal','none_modal', {x:data.event.event.zrX, y:data.event.event.zrY});
     });

     scope.setmodal = function(id, modal, position) {
         EventService.broadcast(id, modal, position);
     }

     scope.selectCity = function(){
        EventService.broadcast('gis', "mapSelect",{name : '长春市'});
     };  

     scope.unSelectCity = function(){
        EventService.broadcast('gis', "mapUnSelect",{name : '长春市'});
     };
}

]);
});

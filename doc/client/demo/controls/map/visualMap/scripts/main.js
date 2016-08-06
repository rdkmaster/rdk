define('main', ['rd.controls.Map'], function() {

// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.controls.Map']);
// 创建一个控制器
app.controller('myCtrl', ['$scope','EventService','EventTypes','$timeout', function(scope, EventService,EventTypes, $timeout) {
/******************************************************
     将应用的代码逻辑添加在这个匿名函数内部
******************************************************/
       EventService.register('gis','click',function(event, data){
          if(data.componentType == "markPoint"){
          	 alert("您选择了"+data.name+"的markPoint");
          }        
       });


       EventService.register('markPoint','result',function(event, data){
          scope.markPointData = data; 
          EventService.broadcast('gis', EventTypes.UPDATE_GRAPH);      
       });

       scope.setMarkPoint = function(){
       		EventService.broadcast('markPoint', EventTypes.START_QUERY);
       }
}

]);
});

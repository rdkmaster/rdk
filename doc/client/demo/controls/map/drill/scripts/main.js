define('main', ['rd.controls.Map','rd.attributes.modal'], function() {

// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.controls.Map','rd.attributes.modal']);
// 创建一个控制器
app.controller('myCtrl', ['$scope','EventService','EventTypes', function(scope, EventService,EventTypes) {
/******************************************************
     将应用的代码逻辑添加在这个匿名函数内部
******************************************************/
     scope.mapUrl = '/demo/controls/map/drill/data/china.json';
     
     EventService.register('gis','click',function(event, data){
     	scope.name =  data.name;
        var id = data.rawData.properties.id;
        if(id.length == 2){
            scope.mapUrl = '/demo/controls/map/drill/data/geometryProvince/'+id+'.json';
        }else if (id.length == 4){
            scope.mapUrl = '/demo/controls/map/drill/data/geometryCouties/'+id+'00.json';
        }
        
     });
}

]);
});

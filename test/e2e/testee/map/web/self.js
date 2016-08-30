define('main', ['application', 'blockUI','rd.controls.BasicSelector','rd.controls.Selector',
  'rd.controls.FoldSelector','rd.containers.Accordion','rd.controls.Input','rd.controls.Table',
  'rd.controls.TabSelect','rd.controls.ComboSelect','rd.controls.TabSelector','rd.controls.Graph',
  'rd.containers.Tab','rd.controls.Map'],
function(application) {
// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.core', 'blockUI','rd.controls.BasicSelector','rd.controls.Selector',
  'rd.controls.FoldSelector','rd.containers.Accordion','rd.controls.Input','rd.controls.Table',
  'rd.controls.TabSelect','rd.controls.ComboSelect','rd.controls.TabSelector','rd.controls.Graph',
  'rd.containers.Tab','rd.controls.Map']);
app.config(['blockUIConfig', function(blockUIConfig) {
    // blockUI默认只要有ajax请求在进行，就会自动启动，阻止页面响应鼠标事件
    // 使用下面代码可以阻止自动模式，启用手动模式
    // blockUIConfig.autoBlock=false
    // 然后在需要阻止页面相应鼠标事件的时候，使用下面代码
    // blockUI.start();
    // 在需要继续相应页面相应鼠标事件的时候，使用下面代码
    // blockUI.stop();

    // blockUI的详细用法参考 https://github.com/McNull/angular-block-ui
    blockUIConfig.template = '<div class="block-ui-message-container">\
                                  <img src="images/loding.gif" />\
                              </div>';
}]);

// 创建一个控制器
app.controller('rdk_ctrl', ['$scope', 'DataSourceService', 'blockUI','EventService','EventTypes',
  
function(scope, DSService, blockUI,EventService,EventTypes) {
application.initDataSourceService(DSService);
/************************ 应用的代码逻辑开始 ************************/
//map 点击获取该城市
EventService.register('jilin','click',function(event,data){
  scope.cityname=data.name;
});
scope.mapUrl='../server/jilin.json';
scope.setJS=function(){
  scope.mapUrl='../server/jiangsu.json';
};
scope.setJL=function(){
  scope.mapUrl='../server/jilin.json';
};
//demo jiangsu
EventService.register("jiangsu","click",function(event,data){
  console.log(data);
});

EventService.register("jiangsu",'mapselected',function(event,data){
  scope.city=data.name;
});
EventService.register("jiangsu",'mapunselected',function(event,data){
  scope.city='';
});
scope.select=function(){
  EventService.broadcast("jiangsu",'mapSelect',{name:'淮安市'});
};
scope.unSelect=function(){
  EventService.broadcast("jiangsu",'mapUnSelect',{name:'淮安市'});
};
//demo JiLin
//根据broadcast传播的data
EventService.register('JiLin', 'click', function(event, data) {
  // console.log(data.name);
  scope.pointName=data.name;
});

EventService.register("markPoint",'result',function(event,data){
  // console.log(data);
  scope.markPointData = data;
  EventService.broadcast('JiLin', EventTypes.UPDATE_GRAPH);
  EventService.broadcast('JiLin','click',data[0]);
});
scope.setMarkPoint=function(){
  EventService.broadcast("markPoint",EventTypes.START_QUERY);
};

//demo drill
scope.drillUrl="../server/china.json";

EventService.register("china",'click',function(event,data){
  var id=data.rawData.properties.id;
  scope.currentArea=data.name;
  if(id.length==2){
    scope.drillUrl="../server/geometryProvince/"+id+".json";
  }else if(id.length==4){
    scope.drillUrl="../server/geometryCouties/"+id+"00.json";
  }
});

/************************ 应用的代码逻辑结束 ************************/
}]);

/********************************************************************
          应用如果将代码写在此处，可能会导致双向绑定失效
                需要手工调用 scope.$apply() 函数
          若非有特别的需要，否则请不要将代码放在这个区域
 ********************************************************************/

});

/********************************************************************
                       这个区域不要添加任何代码
 ********************************************************************/

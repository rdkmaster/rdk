define('main', ['application', 'blockUI','rd.controls.BasicSelector','rd.controls.Selector',
  'rd.controls.FoldSelector','rd.containers.Accordion','rd.controls.Input','rd.controls.Table',
  'rd.controls.TabSelect','rd.controls.ComboSelect','rd.controls.TabSelector','rd.controls.Graph',
  'rd.containers.Tab','rd.controls.Map','rd.services.Alert','rd.containers.Panel','rd.controls.FoldSelector'],
function(application) {
// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.core', 'blockUI','rd.controls.BasicSelector','rd.controls.Selector',
  'rd.controls.FoldSelector','rd.containers.Accordion','rd.controls.Input','rd.controls.Table',
  'rd.controls.TabSelect','rd.controls.ComboSelect','rd.controls.TabSelector','rd.controls.Graph',
  'rd.containers.Tab','rd.controls.Map','rd.services.Alert','rd.containers.Panel','rd.controls.FoldSelector']);
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
app.controller('rdk_ctrl', ['$scope','DataSourceService', 'blockUI','EventService','EventTypes',
  
function(scope,DSService, blockUI,EventService,EventTypes) {
application.initDataSourceService(DSService);
/************************ 应用的代码逻辑开始 ************************/
scope.allProvince=[
    { id: 0, label: "江苏省" },
    { id: 1, label: "浙江省" },
    { id: 2, label: "广东省" },
    { id: 3, label: "广西省" },
    { id: 4, label: "河北省" }
];
scope.data=[
    { id: 0, label: "江苏省" },
    { id: 1, label: "浙江省" },
    { id: 2, label: "广东省" },
    { id: 3, label: "广西省" },
    { id: 4, label: "河北省" },
    { id: 5, label: "河南省" },
    { id: 6, label: "湖北省" },
    { id: 7, label: "湖南省" },
    { id: 8, label: "新疆省" },
    { id: 9, label: "四川省" }
];
scope.selectedItems=[
  {id:0,label:'江苏省'},
  {id:1,label:'浙江省'}
];
scope.dataArray=[
  { id: 0, label: "江苏省" },
  { id: 1, label: "浙江省" },
  { id: 2, label: "广东省" },
  { id: 3, label: "广西省" },
  { id: 4, label: "河北省" },
  { id: 5, label: "河南省" },
  { id: 6, label: "湖北省" },
  { id: 7, label: "湖南省" },
  { id: 8, label: "新疆省" },
  { id: 9, label: "四川省" }
];
scope.decrease=function(){
  scope.dataArray.length=scope.dataArray.length-1;
}
scope.changeHandle=function(event,data){
    console.log(data);
    var content=[];
    angular.forEach(data,function(item,index){
      content.push(item.label);
    })
    console.log(content.toString(","));
    alert(content.toString(","));
};
scope.errHandle=function(event,info){
  var code;
  code=info.code;
  if(code==102){
    alert("至少选择2条目");
  }
};
scope.childHandle=function(data,event){
  console.log(data);
  var message=[];
  angular.forEach(data,function(item,index){
    message.push(item.label);
  })
  console.log(message.toString(","));
  alert(message.toString(","));
}
//events 
EventService.register("foldSelectId",EventTypes.OPEN,function(event,data){
  console.log("EventTypes OPEN");
});
EventService.register('foldSelectId',EventTypes.CHANGE,function(event,data){
  console.log("EventTypes CHANGE");
});
EventService.register('foldSelectId','data_change',function(event,data){
  console.log("DATA CHANGE");
});
EventService.broadcast('foldSelectId','data_change',function(event,data){
  console.log("DATA CHANGE");
});
EventService.register('foldSelectId',EventTypes.SELLECT,function(event,data){
  console.log("EventTypes SELLECT");
});
// EventService.broadcast('foldSelectId',EventTypes.SELLECT);
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

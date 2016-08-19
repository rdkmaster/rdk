define('main', ['application', 'utils', 'i18n', 'blockUI',
  'rd.controls.BasicSelector','rd.containers.Tab','rd.controls.TabSelector',
  'rd.controls.FoldSelector', 'rd.containers.Accordion','rd.controls.Time',
  'rd.controls.Graph','rd.controls.ComboSelect','rd.controls.Selector','rd.controls.Table'],
function(application, utils, i18n) {
// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.core', 'blockUI',
  'rd.controls.BasicSelector', 'rd.containers.Accordion','rd.containers.Tab','rd.controls.TabSelector'
  , 'rd.controls.FoldSelector','rd.controls.Time','rd.controls.Graph',
  'rd.controls.ComboSelect','rd.controls.Selector','rd.controls.Table']);
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
app.controller('rdk_ctrl', ['$scope','$timeout','$filter', 'DataSourceService', 'blockUI','EventTypes','EventService',
function(scope,$timeout, $filter,DSService, blockUI,EventTypes,EventService) {
i18n.$init(scope);
application.initDataSourceService(DSService);
/************************ 应用的代码逻辑开始 ************************/
function showSelected(data){
  var array='';
  for(var key in data){
    array+=key+"="+data[key]+";";
  }
  return array;
}
EventService.register("dsTable","select",function(event,data){
  scope.selectedInfo=showSelected(data);
});
EventService.register("wks_table_0","select",function(event,data){
  scope.selectedInfo=showSelected(data);
});
EventService.register("wks_table_1","select",function(event,data){
  scope.selectedInfo=showSelected(data);
});
EventService.register("tab_table_1","select",function(event,data){
  scope.selectedInfo=showSelected(data);
});
EventService.register("tab_table_2","select",function(event,data){
  scope.selectedInfo=showSelected(data);
});
EventService.register("tab_table_3","select",function(event,data){
  scope.selectedInfo=showSelected(data);
});
EventService.register("tab_table_4","select",function(event,data){
  scope.selectedInfo=showSelected(data);
});
//accordion下表格样式设置
scope.tablesetting={
  "scrollX":true
};
scope.changeWidth=function(){
  scope.tablesetting={
    "columnDefs":[
      {targets:"name",width:"40%"}
    ]
  }
};

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

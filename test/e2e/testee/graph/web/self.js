define('main', ['application', 'blockUI','rd.controls.BasicSelector','rd.controls.Selector',
  'rd.controls.FoldSelector','rd.containers.Accordion','rd.controls.Input','rd.controls.Table',
  'rd.controls.TabSelect','rd.controls.ComboSelect','rd.controls.TabSelector','rd.controls.Graph',
  'rd.containers.Tab'],
function(application) {
// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.core', 'blockUI','rd.controls.BasicSelector','rd.controls.Selector',
  'rd.controls.FoldSelector','rd.containers.Accordion','rd.controls.Input','rd.controls.Table',
  'rd.controls.TabSelect','rd.controls.ComboSelect','rd.controls.TabSelector','rd.controls.Graph',
  'rd.containers.Tab']);
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
  scope.graphdata={
      rowDescriptor: ['最高气温', '最低气温','平均气温'],
      header: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      data: [
          [11, 13, 15, 18, 15, 12, 10],
          [1, 4, 6, 4, 9, 6, 3],
          [6,8.5,10.5,11,12,9,6.5]
      ]
  };
  function getHeadAndData(obj){
      return obj.name+" "+obj.seriesName+":"+obj.data;
  };
  //click
  EventService.register("graph",'click',function(event,data){
    scope.showContent=getHeadAndData(data);
  });
  //dblclick
  EventService.register("graph",'dblclick',function(event,data){
    scope.dblclickDat=getHeadAndData(data);
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

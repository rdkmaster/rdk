define('main', ['application', 'blockUI','rd.controls.BasicSelector','rd.controls.Selector',
  'rd.controls.FoldSelector','rd.containers.Accordion','rd.controls.Input','rd.controls.Table',
  'rd.controls.TabSelect','rd.controls.ComboSelect','rd.controls.TabSelector','rd.controls.Graph',
  'rd.containers.Tab','rd.controls.Map','rd.services.Alert','rd.containers.Panel'],
function(application) {
// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.core', 'blockUI','rd.controls.BasicSelector','rd.controls.Selector',
  'rd.controls.FoldSelector','rd.containers.Accordion','rd.controls.Input','rd.controls.Table',
  'rd.controls.TabSelect','rd.controls.ComboSelect','rd.controls.TabSelector','rd.controls.Graph',
  'rd.containers.Tab','rd.controls.Map','rd.services.Alert','rd.containers.Panel']);
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
scope.private="自定义";
//注册close
EventService.register('panel',EventTypes.BEFORE_CLOSE,function(event,data){
  // alert('执行关闭');
});
EventService.broadcast("panel",EventTypes.BEFORE_CLOSE);
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

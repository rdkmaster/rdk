define('main', ['application', 'blockUI','rd.controls.BasicSelector','rd.controls.Selector',
  'rd.controls.FoldSelector','rd.containers.Accordion','rd.controls.Input','rd.controls.Table',
  'rd.controls.TabSelect','rd.controls.ComboSelect','rd.controls.TabSelector','rd.controls.Graph',
  'rd.containers.Tab','rd.controls.Map','rd.services.Alert'],
function(application) {
// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.core', 'blockUI','rd.controls.BasicSelector','rd.controls.Selector',
  'rd.controls.FoldSelector','rd.containers.Accordion','rd.controls.Input','rd.controls.Table',
  'rd.controls.TabSelect','rd.controls.ComboSelect','rd.controls.TabSelector','rd.controls.Graph',
  'rd.containers.Tab','rd.controls.Map','rd.services.Alert']);
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
app.controller('rdk_ctrl', ['$scope', 'Alert','DataSourceService', 'blockUI','EventService','EventTypes',
  
function(scope, Alert,DSService, blockUI,EventService,EventTypes) {
application.initDataSourceService(DSService);
/************************ 应用的代码逻辑开始 ************************/
scope.infoConfirm=function(){
  Alert.scope = scope;
  Alert.confirm();
}
//add message
scope.addMessage=function(){
  Alert.scope = scope;
  Alert.confirm('message');
}
//add title
scope.addTitle=function(){
  Alert.scope = scope;
  Alert.confirm('message','我是窗口');
}
//add btn 
scope.addBtn1=function(){
  Alert.scope = scope;
  Alert.confirm('message','我是窗口',1);
}
scope.addBtn2=function(){
  Alert.scope = scope;
  Alert.confirm('message','我是窗口',2);
}
scope.addBtn4=function(){
  Alert.scope = scope;
  Alert.confirm('message','我是窗口',4);
}
scope.addBtn8=function(){
  Alert.scope = scope;
  Alert.confirm('message','我是窗口',8);
}
scope.addBtn9=function(){
  Alert.scope = scope;
  Alert.confirm('message','我是窗口',9);
}
scope.addBtn10=function(){
  Alert.scope = scope;
  Alert.confirm('message','我是窗口',10);
}
scope.addBtn11=function(){
  Alert.scope = scope;
  Alert.confirm('message','我是窗口',11);
}
scope.addBtn12=function(){
  Alert.scope = scope;
  Alert.confirm('message','我是窗口',12);
}
//err 提示
scope.errConfirm=function(){
  Alert.scope = scope;
  Alert.error('err','出错了',12);
}
scope.normalConfirm=function(){
  Alert.scope = scope;
  Alert.info('info','普通信息提示',12);
}
//warn 
scope.warnConfirm=function(){
  Alert.scope = scope;
  Alert.warn('warn','警告',12);
}
//callback
scope.clickHandle=function(){
  Alert.scope = scope;
  Alert.confirm('信息确认','请注意',12,callback);
}
function callback(value){
  if(value==4){
    scope.message='确定';
  }
  if(value==8){
    scope.message='取消';
  }
}
//noModel
scope.noModel=function(){
  Alert.scope = scope;
  Alert.confirm('信息确认','请注意',12,callback,false);
}
//defaultHandle
scope.defaultHandle=function(){
  Alert.scope = scope;
  Alert.info();
}
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

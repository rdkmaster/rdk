define('main', ['application', 'blockUI',
  'rd.controls.BasicSelector','rd.containers.Tab','rd.controls.TabSelector',
  'rd.controls.FoldSelector', 'rd.containers.Accordion','rd.controls.Time',
  'rd.controls.Graph','rd.controls.ComboSelect','rd.controls.Selector','rd.controls.Table'],
function(application) {
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
  'BasicSelector','RDKConst',
function(scope,$timeout, $filter,DSService, blockUI,EventTypes,EventService,BasicSelector,RDKConst) {
application.initDataSourceService(DSService);
/************************ 应用的代码逻辑开始 ************************/
        //change
        EventService.register('selectorID', EventTypes.CHANGE, function(event, data){
            var str = data[0].label;
            EventService.broadcast('comboID', EventTypes.CHANGE, str);
            scope.str = str;
        });
        //frozen
        scope.allItems = [{
            id: 0,
            label: "江苏省"
        }, {
            id: 1,
            label: "浙江省"
        }, {
            id: 2,
            label: "河南省"
        }, {
            id: 3,
            label: "湖北省"
        }, ];
        scope.selected2string = function(selected, context, index) {
            scope.province = selected[0].label;
            return BasicSelector.selected2string(selected, 'label', '...');
        }
        scope.frBln = true;

        //open
        scope.open = true;
        //title
        scope.title1 = "标题";
        scope.titleChange = function(){
            scope.title1 = "江苏";
        }


/************************ 应用的代码逻辑结束 ************************/
}]).filter('myFilter',function(){
  return function(input){
    if(input==""){
      return 0;
    }else{
      return Number(input);
    }
  }
});

/********************************************************************
          应用如果将代码写在此处，可能会导致双向绑定失效
                需要手工调用 scope.$apply() 函数
          若非有特别的需要，否则请不要将代码放在这个区域
 ********************************************************************/

});

/********************************************************************
                       这个区域不要添加任何代码
 ********************************************************************/

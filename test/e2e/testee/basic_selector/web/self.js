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
app.controller('rdk_ctrl', ['$scope' ,'DataSourceService', 'blockUI','EventService','EventTypes',
  
function(scope,DSService, blockUI,EventService,EventTypes) {
application.initDataSourceService(DSService);
/************************ 应用的代码逻辑开始 ************************/
scope.BasicData=[
      {id:0,label:"南京"},
      {id:1,label:"苏州"},
      {id:2,label:"南通"},
      {id:3,label:"泰州"},
      {id:4,label:"上海"},
      {id:5,label:"广州"}
    ];
    scope.selectedItems=[
      {id:1,label:"苏州"},
      {id:2,label:"南通"}
      ];
    scope.BasicSelect={
      isSearchAble:false,
      isMultiple:true,
      least:'',
      ErrorMsg:function(event,info){
        scope.errorMsg=info.message;
      },
      max_length:3,
      labelField:'label',
      isEditable:true,
      isRestrict:false,
      Restrict:true
    };
    //获取输入的正则表达式
    scope.getRegStr=function(Regstr){
      scope.BasicSelect.Restrict=Regstr;
    };
    scope.validateByfun=function(val){
      if( scope.BasicSelect.isRestrict ){
        if(scope.BasicSelect.Restrict){
           var reg = new RegExp(scope.BasicSelect.Restrict);
           // var reg=new RegExp('^[1-9]\\d{0,2}$');
           return reg.test(val);
        }
      }else{
        return true;
      }
       
    };
    //各种切换功能函数
    scope.toggleLabelField=function(labelField){
      if(labelField==='label'){
        scope.BasicSelect.labelField='id';
      }else{
        scope.BasicSelect.labelField='label'
      }
    };
    scope.toggleSearchable=function(isSearchAble){
      scope.BasicSelect.isSearchAble=!isSearchAble;
    };
    scope.toggleMultiple=function(isMultiple){
      scope.BasicSelect.isMultiple=!isMultiple;
    };
    scope.toggleEditable=function(editable){
        scope.BasicSelect.isEditable=!editable;
    };
    scope.toggleRestrict=function(){
      scope.BasicSelect.isRestrict=!scope.BasicSelect.isRestrict;
    };
    //标签事件change函数
    scope.ChildChange=function(data){
      console.log("childchange data");
      console.log(data);
      var res=[];
      angular.forEach(data,function(item,index){
        res.push(item.label);
      });
      scope.child_changeVal=res.toString(",");
    }
    scope.changehandle=function(event,data){
      console.log("change data");
      console.log(data);
      var res=[];
      angular.forEach(data,function(item,index){
        res.push(item.label);
      });
      scope.changeVal=res.toString(",");
    };
    //获取当前全部选中项
    scope.getSelectedVal=function(selectedItems){
      var showText=[];
      angular.forEach(selectedItems,function(item,index){
        showText.push(item.label);
      });
      scope.showText=showText.toString(",");
    }
    scope.dataProcessor=function(data){
      return data.data;
    };
    //捕获CHANGE事件 CREATE事件
    EventService.register("id_selector",EventTypes.CHANGE,function(event,data){
      console.log("CHANGE");
      console.log(data);
      var rs=[];
      angular.forEach(data,function(item){
        rs.push(item.label);
      });
      scope.rs=rs.toString(",");
    });
    EventService.register("selector",EventTypes.CREATE,function(event,data){
      console.log(data);
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

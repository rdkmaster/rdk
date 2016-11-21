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
function(scope,$timeout, $filter,DSService, blockUI,EventTypes,EventService) {
application.initDataSourceService(DSService);
/************************ 应用的代码逻辑开始 ************************/
 scope.TableData={
    header: ['日期', '城市名','网页响应成功率','网页下载速率','网页响应时延'],
    field: ['clttime', 'cityname','webrspsuccrate','webdownloadrate','webrspdelay'],
    data: [
           [12,"NJ",2,2,2],
           [32,"BJ",42,52,62],
           [4,"SZ",6,7,8,9],
           [1,"SH",4,6,7,8],
           [12,"HZ",5,67,89],
           [32,"YZ",45,6,7],
           [1,"SZ",4,6,7,8],
           [12,4,5,67,89],
           [1,2,4,6,7,8],
           [12,4,5,67,89]
    ],
};
//改变data 验证双向绑定的支持性
scope.change=true;
scope.changData=function(change){
  if(change){
    scope.TableData.data=[
      ['2016-08-26','南京','98%','90%','10%'],
      ['2016-08-27','北京','95%','92%','5']
    ];
    scope.change=false;
  }else{
    scope.TableData.data=[
      [12,"NJ",2,2,2],
      [32,"BJ",42,52,62],
      [4,"SZ",6,7,8,9],
      [1,"SH",4,6,7,8],
      [12,"HZ",5,67,89],
      [32,"YZ",45,6,7],
      [1,"SZ",4,6,7,8],
      [12,4,5,67,89],
      [1,2,4,6,7,8],
      [12,4,5,67,89]
    ];
  }
}
scope.server={
  ds:"dsTable",
  url:"$svr/salary1"
};
scope.Table={
  index:0,
  itemInfo:'',
  pageSize:4,
  searchPattern:''
};
//单击或者单选事件
EventService.register('table_id','select',function(event,item){
    // console.log(item)
    scope.Table.itemInfo="日期="+item.clttime+"城市="+item.cityname+
      "网页响应成功率="+item.webrspsuccrate+"网页下载速率="+
      item.webdownloadrate+"网页响应时延="+item.webrspdelay;
});
//双击事件
EventService.register("table_id",EventTypes.DOUBLE_CLICK,function(event,data){
  var dclick=[];
  console.log(data);
  scope.index=data.index;
  for(var key in data.data){
    dclick.push(key+"="+data.data[key]);
  }
  scope.dclick=dclick.toString();
});
//RESULT事件下使用HIGHLIGHT事件设置
EventService.register("ds_table",EventTypes.RESULT,function(event,data){
  EventService.broadcast("ds_table",EventTypes.HIGHLIGHT,1);
  EventService.register("ds_table",'select',function(event,item){
    scope.selectedInfo="";
    for(var key in item){
      scope.selectedInfo+=key+"="+item[key]+";";
    }
  });
  // EventService.broadcast("dsTable",EventTypes.SELLECT,function(event,data){});
});
//
EventService.register("dsTable",EventTypes.RESULT,function(event,data){
  if(data){
    scope.Query="data created!";
  };
});
scope.query=function(){
  scope.isReady="ready";
}
var eventInfos=[
  {dispatcher:"ds_table",type:"highlight"},
  {dispatcher:"ds_table",type:"select"}
];
EventService.onEvents(eventInfos,function(){
  scope.highlight="highlight event happened!";
});
scope.setting={
  "columnDefs":[
      {
        title : "详情",
        visible : true, 
        width:"20%",
        render:'<a ng-click="appScope.click(item)" href="javascript:void(0)">查看</a>'
      },
      {
        targets:2,  
        width:"20%",
        sortable:true,
        sortas:"string",
        editable:true
      },
      {
        targets:3,
        class:"red",
        editable:true
      }
  ]
};
scope.changeWidth=function(){
  scope.setting.columnDefs.push({targets:0,width:"30%"});
};
scope.click=function(item){
  console.log(item);
};
scope.getSearchPattern=function(searchPattern){
  if(searchPattern==""){
    scope.Table.searchPattern=true;
  }else{
    scope.Table.searchPattern=searchPattern;
  }
};
scope.getPageSize=function(pageSize){
  scope.Table.pageSize=pageSize;
};
//demo4 后端分页

scope.search=function(){
	var condition = {
		"paging":{"currentPage":1,"pageSize":7}
	};
	var ds = DSService.get('ds_salary_3');
	console.log(ds);
	ds.query(condition);
};
scope.query=function(){
  var condition={
    'paging':{"currentPage":1,"pageSize":7}
  };
  var ds=DSService.get('ds_salary_5');
  ds.query(condition);
}
//demo5 add_check_box

EventService.register('add_check', EventTypes.CHECK, function(event, data){
            scope.checkData = data.data;
});
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

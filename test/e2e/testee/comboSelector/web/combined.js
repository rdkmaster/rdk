define('main', ['application', 'blockUI',
  'rd.controls.BasicSelector','rd.containers.Tab','rd.controls.TabSelector',
  'rd.controls.FoldSelector', 'rd.containers.Accordion','rd.controls.Time',
  'rd.controls.Graph','rd.controls.ComboSelect','rd.controls.Selector',
  'rd.controls.Table','rd.containers.Panel','rd.controls.Scroller'],
function(application) {
// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.core', 'blockUI',
  'rd.controls.BasicSelector', 'rd.containers.Accordion','rd.containers.Tab','rd.controls.TabSelector'
  , 'rd.controls.FoldSelector','rd.controls.Time','rd.controls.Graph',
  'rd.controls.ComboSelect','rd.controls.Selector','rd.controls.Table','rd.containers.Panel','rd.controls.Scroller']);
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
        scope.cityItems = [{
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
        }];
        
        scope.table = []
        angular.extend(scope.table,scope.cityItems)

        scope.city = false;

        scope.images=[{src:'/doc/client/demo/controls/scroller/basic/img/img1.png',title:'Pic 1',
                        cityItems:{
                            rowDescriptor: [{
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
                            }],
                            
                        },
                        comId:'comId1',
                        selID: 'selID1'
                       
                    },
                    {src:'/doc/client/demo/controls/scroller/basic/img/img2.jpg',title:'Pic 2',
                    cityItems:{
                            rowDescriptor: [{
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
                            }],
                            
                        },
                        comId:'comId2',
                        selID: 'selID2'
                    },
                    {src:'/doc/client/demo/controls/scroller/basic/img/img3.jpg',title:'Pic 3',
                        cityItems:{
                                rowDescriptor: [{
                                        id: 0,
                                        label: "浙江省"
                                    }, {
                                        id: 1,
                                        label: "江苏省"
                                    }, {
                                        id: 2,
                                        label: "河南省"
                                    }, {
                                        id: 3,
                                        label: "湖北省"
                                }],
                                
                        },
                        comId:'comId3',
                        selID: 'selID3'
                    },
                    {src:'/doc/client/demo/controls/scroller/basic/img/img4.png',title:'Pic 4',
                        cityItems:{
                            rowDescriptor: [{
                                    id: 0,
                                    label: "河南省"
                                }, {
                                    id: 1,
                                    label: "浙江省"
                                }, {
                                    id: 2,
                                    label: "江苏省"
                                }, {
                                    id: 3,
                                    label: "湖北省"
                            }],
                            
                        },
                        comId:'comId4',
                        selID: 'selID4'
                    },
                    {src:'/doc/client/demo/controls/scroller/basic/img/img5.png',title:'Pic 5',
                        cityItems:{
                                rowDescriptor: [{
                                        id: 0,
                                        label: "湖北省"
                                    }, {
                                        id: 1,
                                        label: "浙江省"
                                    }, {
                                        id: 2,
                                        label: "河南省"
                                    }, {
                                        id: 3,
                                        label: "江苏省"
                                }],
                                
                            },
                        comId:'comId5',
                        selID: 'selID5'
                    }
        ]; 

        EventService.register('accordion',EventTypes.CHANGE,function(event,data){
            scope.city = data;
        })
        EventService.register("cityid",EventTypes.CHANGE,function(event,data){
            if(data.length!=0){
                var str = data[0].label;
            }
            EventService.broadcast('comboCity',EventTypes.CHANGE,str);
            scope.str = str;
        })

        EventService.register("strSelect",EventTypes.CHANGE,function(event,data){
            if(data.length!=0){
                var strSelect = data[0].label;
            }
            EventService.broadcast('tab',EventTypes.CHANGE,strSelect);
            scope.strSelect = '江苏省'
        })

        for(var a = 0;a<=scope.images.length;a++){
            (function (idx) {
                EventService.remove('selID'+idx, EventTypes.CHANGE);
                EventService.register('selID'+idx, EventTypes.CHANGE, function(event, data) {
                    if(data.length!=0){
                        var scrollerBasic = data[0].label;
                    }
                    EventService.broadcast('comId'+idx, EventTypes.CHANGE, scrollerBasic);
                    scope.scrollerBasic = scrollerBasic;   
                });
            })(a);
        };


        for(var i = 0;i <= 5;i++){
            (function(b){
                EventService.remove('scrollerTable_'+b, EventTypes.CHANGE);
                EventService.register("scrollerTable_"+b,EventTypes.CHANGE,function(event,data){
                    if(data.length!=0){
                        var basicSelect = data[0].label;
                    }
                    EventService.broadcast('table_'+b,EventTypes.CHANGE,basicSelect);
                    scope.tableStr = basicSelect
                })
            })(i)
        }
        
        scope.panelRDK = false;
        EventService.register('panelRDK',EventTypes.BEFORE_CLOSE,function(event,data){
            scope.panelRDK = true;
        })

        scope.setting = {
            "columnDefs" :[
                {
                    title : "编辑列",
                    render : '<rdk_combo_select id="table_{{item.$index}}">\
                                <rdk_basic_selector multiple_select="false" class="rdk_selector_style" id="scrollerTable_{{item.$index}}" track_item_by="id" data="table" ></rdk_basic_selector>\
                            </rdk_combo_select>'
                }
            ]
        }


        scope.panelfun = function() {
            scope.panelClose = '江苏省'
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

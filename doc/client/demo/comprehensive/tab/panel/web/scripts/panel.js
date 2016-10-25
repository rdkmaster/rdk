define('main', ['application','rd.controls.Scroll','rd.controls.Table', 'rd.containers.Tab', 'rd.containers.Accordion','rd.containers.Panel'],function(application) {
// 创建一个RDK的应用
        var app = angular.module("rdk_app", ['rd.controls.Scroll','rd.controls.Table', 'rd.containers.Tab', 'rd.containers.Accordion','rd.containers.Panel']);
// 创建一个控制器
        app.controller('rdk_ctrl', ['$scope', 'DataSourceService',function(scope, DSService) {
                application.initDataSourceService(DSService);
                /************************ panel demo test data start ************************/
                scope.panelStatus=true;
                scope.clkShowPanel=function(){
                    scope.panelStatus=!scope.panelStatus;
                }
                scope.settingPanel = { //表格设置列宽度和样式类
                    "columnDefs" :[
                        {
                            targets : 0,
                            width : "16%"
                        },{
                            targets : 1,
                            width : "14%",
                            class : "text-align"
                        },{
                            targets : 2,
                            width : "18%",
                            class : "text-align"
                        },{
                            targets : 3,
                            width : "14%"
                        },{
                            targets : 4,
                            width 
                            : "18%"
                        },{
                            targets : 5,
                            width : "19%",
                            class : "col-detail"
                        }
                    ]
                };
                /************************ panel demo test data end ************************/
            }]);
    });

